// ============================================================
// DATA.JS — Dados mock extraídos da planilha real + sanitização
// ============================================================

const POSTS_DATA = [
    {
        data: "2026-03-03",
        link: "https://www.instagram.com/reel/1",
        contasAlcancadas: 4173,
        dataHora: "2026-03-03T12:00:00-03:00",
        tempoPostagem: 9,
        mediaPlays: 7657,
        avgReelWatchTime: null,
        interacoes: 87,
        curtidas: 58,
        comentarios: 1,
        salvamentos: 17,
        compartilhamentos: 11,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-03-03",
        link: "https://www.instagram.com/reel/2",
        contasAlcancadas: 1553,
        dataHora: "2026-03-03T18:01:57-03:00",
        tempoPostagem: 5,
        mediaPlays: 2731,
        avgReelWatchTime: null,
        interacoes: 166,
        curtidas: 128,
        comentarios: 6,
        salvamentos: 0,
        compartilhamentos: 6,
        seguidores: 76454,
        tipo: "Reel"
    },
    {
        data: "2026-03-03",
        link: "https://www.instagram.com/reel/3",
        contasAlcancadas: 451,
        dataHora: "2026-03-03T08:54:06-03:00",
        tempoPostagem: 1,
        mediaPlays: 681,
        avgReelWatchTime: 12,
        interacoes: 5,
        curtidas: 2,
        comentarios: 0,
        salvamentos: 0,
        compartilhamentos: 1,
        seguidores: 76454,
        tipo: "Reel"
    },
    {
        data: "2026-03-02",
        link: "https://www.instagram.com/reel/4",
        contasAlcancadas: 336,
        dataHora: "2026-03-02T15:53:08-03:00",
        tempoPostagem: 2,
        mediaPlays: 427,
        avgReelWatchTime: 7,
        interacoes: 7,
        curtidas: 0,
        comentarios: 0,
        salvamentos: 0,
        compartilhamentos: 4,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-03-02",
        link: "https://www.instagram.com/reel/5",
        contasAlcancadas: 501,
        dataHora: "2026-03-02T12:00:20-03:00",
        tempoPostagem: 2,
        mediaPlays: 1075,
        avgReelWatchTime: 32,
        interacoes: 20,
        curtidas: 4,
        comentarios: 1,
        salvamentos: 1,
        compartilhamentos: 4,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-03-02",
        link: "https://www.instagram.com/reel/6",
        contasAlcancadas: 1076,
        dataHora: "2026-03-02T10:30:21-03:00",
        tempoPostagem: 5,
        mediaPlays: 3053,
        avgReelWatchTime: 43,
        interacoes: 57,
        curtidas: 37,
        comentarios: 0,
        salvamentos: 0,
        compartilhamentos: 4,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-03-02",
        link: "https://www.instagram.com/reel/7",
        contasAlcancadas: 1902,
        dataHora: "2026-03-02T15:50:31-03:00",
        tempoPostagem: 5,
        mediaPlays: 3025,
        avgReelWatchTime: 25,
        interacoes: 75,
        curtidas: 2,
        comentarios: 0,
        salvamentos: 1,
        compartilhamentos: 0,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-03-05",
        link: "https://www.instagram.com/reel/8",
        contasAlcancadas: 2689,
        dataHora: "2026-03-05T18:18:03-03:00",
        tempoPostagem: 3,
        mediaPlays: 7978,
        avgReelWatchTime: 225,
        interacoes: 207,
        curtidas: 12,
        comentarios: 0,
        salvamentos: 1,
        compartilhamentos: 0,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-03-05",
        link: "https://www.instagram.com/reel/9",
        contasAlcancadas: 501,
        dataHora: "2026-03-05T12:10:00-03:00",
        tempoPostagem: 4,
        mediaPlays: 632,
        avgReelWatchTime: 12,
        interacoes: 11,
        curtidas: 9,
        comentarios: 0,
        salvamentos: 0,
        compartilhamentos: 0,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-03-04",
        link: "https://www.instagram.com/reel/10",
        contasAlcancadas: 3050,
        dataHora: "2026-03-04T17:02:10-03:00",
        tempoPostagem: 5,
        mediaPlays: 6380,
        avgReelWatchTime: 120,
        interacoes: 77,
        curtidas: 9,
        comentarios: 12,
        salvamentos: 0,
        compartilhamentos: 25,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-03-04",
        link: "https://www.instagram.com/reel/11",
        contasAlcancadas: 748,
        dataHora: "2026-03-04T08:03:27-03:00",
        tempoPostagem: 5,
        mediaPlays: 1120,
        avgReelWatchTime: 46,
        interacoes: 13,
        curtidas: 10,
        comentarios: 0,
        salvamentos: 0,
        compartilhamentos: 0,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-03-04",
        link: "https://www.instagram.com/reel/12",
        contasAlcancadas: 844,
        dataHora: "2026-03-04T06:54:58-03:00",
        tempoPostagem: 3,
        mediaPlays: 1399,
        avgReelWatchTime: null,
        interacoes: 102,
        curtidas: 13,
        comentarios: 70,
        salvamentos: 31,
        compartilhamentos: 15,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-03-06",
        link: "https://www.instagram.com/reel/13",
        contasAlcancadas: 895,
        dataHora: "2026-03-06T17:53:17-03:00",
        tempoPostagem: 2,
        mediaPlays: 1199,
        avgReelWatchTime: null,
        interacoes: 15,
        curtidas: 16,
        comentarios: 0,
        salvamentos: 0,
        compartilhamentos: 6,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-03-06",
        link: "https://www.instagram.com/reel/14",
        contasAlcancadas: 1036,
        dataHora: "2026-03-06T09:00:02-03:00",
        tempoPostagem: 2,
        mediaPlays: 2007,
        avgReelWatchTime: 127,
        interacoes: 92,
        curtidas: 24,
        comentarios: 3,
        salvamentos: 0,
        compartilhamentos: 4,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-03-07",
        link: "https://www.instagram.com/reel/15",
        contasAlcancadas: 3216,
        dataHora: "2026-03-07T15:29:20-03:00",
        tempoPostagem: 10,
        mediaPlays: 4396,
        avgReelWatchTime: null,
        interacoes: 309,
        curtidas: 160,
        comentarios: 1,
        salvamentos: 70,
        compartilhamentos: 31,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-03-07",
        link: "https://www.instagram.com/reel/16",
        contasAlcancadas: 2567,
        dataHora: "2026-03-07T18:38:03-03:00",
        tempoPostagem: 11,
        mediaPlays: 4170,
        avgReelWatchTime: 2032,
        interacoes: 1332,
        curtidas: 113,
        comentarios: 3,
        salvamentos: 312,
        compartilhamentos: 115,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-03-08",
        link: "https://www.instagram.com/reel/17",
        contasAlcancadas: 2164,
        dataHora: "2026-03-08T18:00:00-03:00",
        tempoPostagem: 10,
        mediaPlays: 3210,
        avgReelWatchTime: 121,
        interacoes: 82,
        curtidas: 12,
        comentarios: 13,
        salvamentos: 0,
        compartilhamentos: 0,
        seguidores: 76454,
        tipo: "Reel"
    },
    {
        data: "2026-02-20",
        link: "https://www.instagram.com/reel/18",
        contasAlcancadas: 1628,
        dataHora: "2026-02-20T17:56:45-03:00",
        tempoPostagem: 13,
        mediaPlays: 3526,
        avgReelWatchTime: 63,
        interacoes: 29,
        curtidas: 10,
        comentarios: 3,
        salvamentos: 0,
        compartilhamentos: 13,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-02-22",
        link: "https://www.instagram.com/reel/19",
        contasAlcancadas: 563,
        dataHora: "2026-02-22T20:53:06-03:00",
        tempoPostagem: 6,
        mediaPlays: 686,
        avgReelWatchTime: 23,
        interacoes: 47,
        curtidas: 36,
        comentarios: 1,
        salvamentos: 0,
        compartilhamentos: 3,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-02-21",
        link: "https://www.instagram.com/reel/20",
        contasAlcancadas: 1039,
        dataHora: "2026-02-21T08:09:00-03:00",
        tempoPostagem: 10,
        mediaPlays: 1883,
        avgReelWatchTime: 47,
        interacoes: 53,
        curtidas: 38,
        comentarios: 5,
        salvamentos: 0,
        compartilhamentos: 3,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-02-21",
        link: "https://www.instagram.com/reel/21",
        contasAlcancadas: 1043,
        dataHora: "2026-02-21T13:51:08-03:00",
        tempoPostagem: 15,
        mediaPlays: 1374,
        avgReelWatchTime: null,
        interacoes: 68,
        curtidas: 14,
        comentarios: 0,
        salvamentos: 0,
        compartilhamentos: 0,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-02-22",
        link: "https://www.instagram.com/reel/22",
        contasAlcancadas: 2510,
        dataHora: "2026-02-22T17:51:23-03:00",
        tempoPostagem: 18,
        mediaPlays: 5515,
        avgReelWatchTime: 115,
        interacoes: 68,
        curtidas: 24,
        comentarios: 0,
        salvamentos: 0,
        compartilhamentos: 1,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-02-22",
        link: "https://www.instagram.com/reel/23",
        contasAlcancadas: 820,
        dataHora: "2026-02-22T14:58:41-03:00",
        tempoPostagem: 20,
        mediaPlays: 1025,
        avgReelWatchTime: 21,
        interacoes: 10,
        curtidas: 9,
        comentarios: 0,
        salvamentos: 1,
        compartilhamentos: 0,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-02-26",
        link: "https://www.instagram.com/reel/24",
        contasAlcancadas: 945,
        dataHora: "2026-02-26T15:30:15-03:00",
        tempoPostagem: 19,
        mediaPlays: 1337,
        avgReelWatchTime: null,
        interacoes: 42,
        curtidas: 32,
        comentarios: 9,
        salvamentos: 1,
        compartilhamentos: 0,
        seguidores: 76494,
        tipo: "Reel"
    },
    {
        data: "2026-02-27",
        link: "https://www.instagram.com/reel/25",
        contasAlcancadas: 3278,
        dataHora: "2026-02-27T17:08:21-03:00",
        tempoPostagem: 22,
        mediaPlays: 2017,
        avgReelWatchTime: null,
        interacoes: 41,
        curtidas: 35,
        comentarios: 5,
        salvamentos: 0,
        compartilhamentos: 0,
        seguidores: 76493,
        tipo: "Reel"
    },
    {
        data: "2026-02-28",
        link: "https://www.instagram.com/reel/26",
        contasAlcancadas: 3,
        dataHora: "2026-02-28T17:58:20-03:00",
        tempoPostagem: 0,
        mediaPlays: null,
        avgReelWatchTime: null,
        interacoes: 1,
        curtidas: 0,
        comentarios: 0,
        salvamentos: 0,
        compartilhamentos: 0,
        seguidores: 76493,
        tipo: "Reel"
    }
];

// ============================================================
// FUNÇÕES DE SANITIZAÇÃO E MÉTRICAS DERIVADAS
// ============================================================

function sanitize(value, fallback = 0) {
    if (value === null || value === undefined || isNaN(value)) return fallback;
    return Number(value);
}

function calcularTaxaEngajamento(post) {
    const alcance = sanitize(post.contasAlcancadas);
    if (alcance === 0) return 0;
    const engajamento = sanitize(post.curtidas) + sanitize(post.comentarios) +
        sanitize(post.salvamentos) + sanitize(post.compartilhamentos);
    return (engajamento / alcance) * 100;
}

function calcularTaxaSalvamento(post) {
    const alcance = sanitize(post.contasAlcancadas);
    if (alcance === 0) return 0;
    return (sanitize(post.salvamentos) / alcance) * 100;
}

function calcularScorePerformance(post) {
    // Pesos: Salvamentos(3x) + Compartilhamentos(2.5x) + Comentários(2x) + Curtidas(1x)
    const score = sanitize(post.salvamentos) * 3 +
        sanitize(post.compartilhamentos) * 2.5 +
        sanitize(post.comentarios) * 2 +
        sanitize(post.curtidas) * 1;
    return score;
}

function getPostsEnriquecidos() {
    return POSTS_DATA
        .filter(p => sanitize(p.contasAlcancadas) > 0)
        .map(post => ({
            ...post,
            taxaEngajamento: calcularTaxaEngajamento(post),
            taxaSalvamento: calcularTaxaSalvamento(post),
            scorePerformance: calcularScorePerformance(post),
            contasAlcancadas: sanitize(post.contasAlcancadas),
            mediaPlays: sanitize(post.mediaPlays),
            interacoes: sanitize(post.interacoes),
            curtidas: sanitize(post.curtidas),
            comentarios: sanitize(post.comentarios),
            salvamentos: sanitize(post.salvamentos),
            compartilhamentos: sanitize(post.compartilhamentos),
            seguidores: sanitize(post.seguidores),
            tempoPostagem: sanitize(post.tempoPostagem)
        }))
        .sort((a, b) => new Date(a.data) - new Date(b.data));
}

function filtrarPorPeriodo(posts, dias) {
    if (!dias || dias === 'todos') return posts;
    const agora = new Date('2026-03-08');
    const limite = new Date(agora);
    limite.setDate(limite.getDate() - dias);
    return posts.filter(p => new Date(p.data) >= limite);
}

function calcularKPIs(posts) {
    if (posts.length === 0) {
        return {
            totalAlcance: 0,
            mediaEngajamento: 0,
            totalSalvamentos: 0,
            totalCompartilhamentos: 0,
            melhorPost: null,
            totalPosts: 0,
            totalInteracoes: 0,
            totalCurtidas: 0,
            totalComentarios: 0,
            mediaAlcancePorPost: 0
        };
    }

    const totalAlcance = posts.reduce((s, p) => s + p.contasAlcancadas, 0);
    const mediaEngajamento = posts.reduce((s, p) => s + p.taxaEngajamento, 0) / posts.length;
    const totalSalvamentos = posts.reduce((s, p) => s + p.salvamentos, 0);
    const totalCompartilhamentos = posts.reduce((s, p) => s + p.compartilhamentos, 0);
    const totalInteracoes = posts.reduce((s, p) => s + p.interacoes, 0);
    const totalCurtidas = posts.reduce((s, p) => s + p.curtidas, 0);
    const totalComentarios = posts.reduce((s, p) => s + p.comentarios, 0);
    const melhorPost = [...posts].sort((a, b) => b.scorePerformance - a.scorePerformance)[0];

    return {
        totalAlcance,
        mediaEngajamento,
        totalSalvamentos,
        totalCompartilhamentos,
        melhorPost,
        totalPosts: posts.length,
        totalInteracoes,
        totalCurtidas,
        totalComentarios,
        mediaAlcancePorPost: totalAlcance / posts.length
    };
}

function formatarNumero(num) {
    return new Intl.NumberFormat('pt-BR').format(Math.round(num));
}

function formatarPorcentagem(num) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    }).format(num) + '%';
}

function formatarData(dataStr) {
    const d = new Date(dataStr + 'T00:00:00');
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short'
    }).format(d);
}

function getPostId(post) {
    const match = post.link.match(/\/(\d+)$/);
    return match ? `#${match[1]}` : `Post`;
}
