// ============================================================
// META-API.JS — Módulo de integração com Meta Graph API v19.0
// ============================================================

const Logger = {
    info: (msg, context = {}) => console.info(JSON.stringify({ timestamp: new Date().toISOString(), level: 'INFO', component: 'MetaAPI', message: msg, ...context })),
    warn: (msg, context = {}) => console.warn(JSON.stringify({ timestamp: new Date().toISOString(), level: 'WARN', component: 'MetaAPI', message: msg, ...context })),
    error: (msg, context = {}) => console.error(JSON.stringify({ timestamp: new Date().toISOString(), level: 'ERROR', component: 'MetaAPI', message: msg, ...context }))
};

const MetaAPI = {
    config: {
        baseUrl: 'https://graph.facebook.com/v19.0',
        accessToken: sessionStorage.getItem('meta_access_token') || '',
        igBusinessAccountId: sessionStorage.getItem('meta_ig_account_id') || '',
        appId: sessionStorage.getItem('meta_app_id') || '',
        dataMinima: '2026-01-01',
    },

    isConfigured() {
        return this.config.accessToken !== '' && this.config.igBusinessAccountId !== '' && this.config.appId !== '';
    },

    getHeaders() {
        return {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json'
        };
    },

    async getAllMedia() {
        if (!this.isConfigured()) {
            Logger.warn('API não configurada.');
            return [];
        }

        const allMedia = [];
        let url = `${this.config.baseUrl}/${this.config.igBusinessAccountId}/media`
            + `?fields=id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count`
            + `&limit=100`
            + `&access_token=${this.config.accessToken}`
            + (this.config.appId ? `&app_id=${this.config.appId}` : '');

        let page = 1;
        const dataMinima = this.config.dataMinima;

        try {
            while (url) {
                Logger.info('Buscando página', { page });
                const response = await fetch(url);

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error?.message || 'Erro na API Meta');
                }

                const data = await response.json();
                const medias = data.data || [];

                if (medias.length === 0) break;

                let postAntigoDemais = false;
                for (const media of medias) {
                    const postDate = media.timestamp?.split('T')[0] || '';
                    if (postDate < dataMinima) {
                        postAntigoDemais = true;
                        break;
                    }
                    allMedia.push(media);
                }

                Logger.info('Página processada', { page, count: medias.length, total: allMedia.length });

                if (postAntigoDemais) {
                    Logger.info('Alcançou posts anteriores a 2026. Parando paginação.');
                    break;
                }

                url = data.paging?.next || null;
                page++;
                if (url) await this.sleep(500);
            }
        } catch (error) {
            Logger.error('Erro na paginação', { error: error.message });
        }

        Logger.info('Total de mídias encontradas', { total: allMedia.length });
        return allMedia;
    },

    async getMediaInsights(mediaId, mediaType) {
        if (!this.isConfigured()) return null;

        const metricSets = [
            'reach,impressions,saved,shares',
            'reach,saved,shares',
            'reach,shares',
            'reach,saved',
        ];

        for (const metrics of metricSets) {
            try {
                const url = `${this.config.baseUrl}/${mediaId}/insights?metric=${metrics}&access_token=${this.config.accessToken}` + (this.config.appId ? `&app_id=${this.config.appId}` : '');
                const response = await fetch(url);

                if (!response.ok) {
                    const error = await response.json();
                    if (error.error?.code === 100 || error.error?.code === 3001) continue;
                    continue;
                }

                const data = await response.json();
                const insights = {};
                (data.data || []).forEach(metric => {
                    insights[metric.name] = metric.values?.[0]?.value || 0;
                });

                if (Object.keys(insights).length > 0) return insights;
            } catch (error) {
                continue;
            }
        }
        return null;
    },

    async fetchDashboardData() {
        if (!this.isConfigured()) {
            Logger.info('Usando dados mock (API não configurada).');
            return null;
        }

        try {
            Logger.info('Iniciando busca de posts...');
            const medias = await this.getAllMedia();

            if (!medias || medias.length === 0) {
                Logger.warn('Nenhuma mídia encontrada.');
                return null;
            }

            const postsComInsights = [];
            for (let i = 0; i < medias.length; i++) {
                const media = medias[i];
                if (i > 0) await this.sleep(200);

                if ((i + 1) % 10 === 0 || i === medias.length - 1) {
                    Logger.info('Processando insights', { current: i + 1, total: medias.length });
                }

                const insights = await this.getMediaInsights(media.id, media.media_type);

                const curtidas = media.like_count || 0;
                const comentarios = media.comments_count || 0;
                const salvamentos = insights?.saved || 0;
                const compartilhamentos = insights?.shares || 0;
                const interacoes = curtidas + comentarios + salvamentos + compartilhamentos;

                postsComInsights.push({
                    data: media.timestamp?.split('T')[0] || '',
                    link: media.permalink || '',
                    contasAlcancadas: insights?.reach || Math.max(curtidas * 10, 1),
                    dataHora: media.timestamp || '',
                    tempoPostagem: 0,
                    mediaPlays: insights?.plays || 0,
                    avgReelWatchTime: null,
                    interacoes, curtidas, comentarios, salvamentos, compartilhamentos, seguidores: 0,
                    tipo: media.media_type || 'unknown'
                });
            }

            Logger.info('Processamento concluído com sucesso!', { total: postsComInsights.length });
            return postsComInsights;
        } catch (error) {
            Logger.error('Erro geral', { error: error.message });
            return null;
        }
    },

    configure({ accessToken, igBusinessAccountId, appId, dataMinima }) {
        if (accessToken) this.config.accessToken = accessToken;
        if (igBusinessAccountId) this.config.igBusinessAccountId = igBusinessAccountId;
        if (appId) this.config.appId = appId;
        if (dataMinima) this.config.dataMinima = dataMinima;
        
        sessionStorage.setItem('meta_access_token', this.config.accessToken);
        sessionStorage.setItem('meta_ig_account_id', this.config.igBusinessAccountId);
        sessionStorage.setItem('meta_app_id', this.config.appId);

        Logger.info('Configuração atualizada', { status: this.isConfigured() ? 'ATIVO' : 'INCOMPLETO' });
    },

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};
