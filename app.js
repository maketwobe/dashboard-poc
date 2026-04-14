// ============================================================
// APP.JS — Ranking de Performance e Orquestração
// ============================================================

const AppLogger = {
    info: (msg, context = {}) => console.info(JSON.stringify({ timestamp: new Date().toISOString(), level: 'INFO', component: 'App', message: msg, ...context })),
    error: (msg, context = {}) => console.error(JSON.stringify({ timestamp: new Date().toISOString(), level: 'ERROR', component: 'App', message: msg, ...context }))
};

document.addEventListener('DOMContentLoaded', () => {
    checkConfigurationAndInit();
});

let cachedPosts = null;

function checkConfigurationAndInit() {
    if (!MetaAPI.isConfigured()) {
        showConfigModal();
    } else {
        initDashboard();
    }
}

function showConfigModal() {
    const modal = document.getElementById('config-modal');
    if (modal) {
        modal.style.display = 'flex';
        
        document.getElementById('save-credentials').addEventListener('click', () => {
            const token = document.getElementById('input-token').value.trim();
            const igId = document.getElementById('input-ig-id').value.trim();
            
            if (token && igId) {
                MetaAPI.configure({ accessToken: token, igBusinessAccountId: igId });
                modal.style.display = 'none';
                initDashboard();
            } else {
                alert('Por favor, preencha ambos os campos.');
            }
        });
    } else {
        AppLogger.error('Modal de configuração não encontrado no DOM');
    }
}

async function initDashboard() {
    const badge = document.getElementById('ranking-badge');
    const tbody = document.getElementById('ranking-tbody');
    if (badge) badge.textContent = '⏳ Buscando dados...';
    if (tbody) tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:3rem; color:#94A3B8;">
        <div style="font-size:1.5rem; margin-bottom:0.5rem;">⏳</div>
        Carregando dados da API...<br>
        <small style="color:#64748B;">Pode levar alguns minutos</small>
    </td></tr>`;

    try {
        const apiData = await MetaAPI.fetchDashboardData();

        if (!apiData || apiData.length === 0) {
            if (tbody) tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:3rem; color:#FBBF24;">
                <div style="font-size:1.5rem; margin-bottom:0.5rem;">📭</div>
                Nenhum post encontrado.
            </td></tr>`;
            if (badge) badge.textContent = '0 posts';
            return;
        }

        cachedPosts = apiData.map(post => ({
            ...post,
            taxaEngajamento: calcularTaxaEngajamento(post),
            taxaSalvamento: calcularTaxaSalvamento(post),
            scorePerformance: calcularScorePerformance(post),
        })).sort((a, b) => new Date(a.data) - new Date(b.data));

        AppLogger.info('Dados carregados e sanitizados', { postCount: cachedPosts.length });

        setupDatePicker();
        renderRankingTable(cachedPosts);
        
        if (typeof renderAllCharts === 'function') {
            renderAllCharts(cachedPosts);
        } else {
            AppLogger.error('Função renderAllCharts não encontrada. charts.js foi importado?');
        }

    } catch (error) {
        AppLogger.error('Erro ao carregar dados', { error: error.message });
        if (tbody) tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:3rem; color:#F87171;">
            <div style="font-size:1.5rem; margin-bottom:0.5rem;">❌</div>
            Erro crítico: ${error.message}
        </td></tr>`;
        if (badge) badge.textContent = '❌ Erro';
    }
}

function setupDatePicker() {
    const dateStart = document.getElementById('date-start');
    const dateEnd = document.getElementById('date-end');
    const btnFiltrar = document.getElementById('btn-filtrar');
    const btnLimpar = document.getElementById('btn-limpar');

    if (!dateStart || !dateEnd || !cachedPosts) return;

    const newBtnFiltrar = btnFiltrar.cloneNode(true);
    const newBtnLimpar = btnLimpar.cloneNode(true);
    btnFiltrar.parentNode.replaceChild(newBtnFiltrar, btnFiltrar);
    btnLimpar.parentNode.replaceChild(newBtnLimpar, btnLimpar);

    const newDateStart = dateStart.cloneNode(true);
    const newDateEnd = dateEnd.cloneNode(true);
    dateStart.parentNode.replaceChild(newDateStart, dateStart);
    dateEnd.parentNode.replaceChild(newDateEnd, dateEnd);

    function aplicarFiltro() {
        const inicio = newDateStart.value;
        const fim = newDateEnd.value;

        if (!inicio && !fim) {
            renderRankingTable(cachedPosts);
            if (typeof renderAllCharts === 'function') renderAllCharts(cachedPosts);
            return;
        }

        const filtrados = cachedPosts.filter(post => {
            if (!post.data) return false;
            if (inicio && post.data < inicio) return false;
            if (fim && post.data > fim) return false;
            return true;
        });

        newBtnFiltrar.classList.add('filters__btn--active');
        newBtnLimpar.classList.remove('filters__btn--active');
        renderRankingTable(filtrados);
        if (typeof renderAllCharts === 'function') renderAllCharts(filtrados);
    }

    newBtnFiltrar.addEventListener('click', aplicarFiltro);

    newBtnLimpar.addEventListener('click', () => {
        newDateStart.value = '';
        newDateEnd.value = '';
        newBtnLimpar.classList.add('filters__btn--active');
        newBtnFiltrar.classList.remove('filters__btn--active');
        renderRankingTable(cachedPosts);
        if (typeof renderAllCharts === 'function') renderAllCharts(cachedPosts);
    });

    newDateStart.addEventListener('change', () => {
        if (newDateStart.value && newDateEnd.value) aplicarFiltro();
    });
    newDateEnd.addEventListener('change', () => {
        if (newDateStart.value && newDateEnd.value) aplicarFiltro();
    });
}

function renderRankingTable(posts) {
    const tbody = document.getElementById('ranking-tbody');
    if (!tbody) return;

    const sorted = [...posts].sort((a, b) => b.scorePerformance - a.scorePerformance);

    const badge = document.getElementById('ranking-badge');
    if (badge) badge.textContent = `${sorted.length} posts · API`;

    if (sorted.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:2rem; color:#94A3B8;">Nenhum post encontrado.</td></tr>`;
        return;
    }

    const maxScore = sorted[0].scorePerformance || 1;

    tbody.innerHTML = sorted.map((post, i) => {
        const rank = i + 1;
        const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-default';
        const scoreClass = post.scorePerformance > 500 ? 'score-high'
            : post.scorePerformance > 100 ? 'score-medium'
                : 'score-low';
        const barWidth = Math.max((post.scorePerformance / maxScore) * 100, 2);

        return `
      <tr>
        <td><span class="rank-number ${rankClass}">${rank}</span></td>
        <td><a href="${post.link}" target="_blank" rel="noopener" class="post-link">${formatarData(post.data)} ${getPostId(post)}</a></td>
        <td>${formatarNumero(post.contasAlcancadas)}</td>
        <td>${formatarNumero(post.interacoes)}</td>
        <td>${formatarPorcentagem(post.taxaEngajamento)}</td>
        <td>${formatarNumero(post.salvamentos)}</td>
        <td>${formatarNumero(post.compartilhamentos)}</td>
        <td>
          <div class="metric-bar">
            <div class="metric-bar__fill" style="width: ${barWidth}%"></div>
            <span class="metric-bar__value score-badge ${scoreClass}">${formatarNumero(post.scorePerformance)}</span>
          </div>
        </td>
      </tr>
    `;
    }).join('');
}
