// ============================================================
// CHARTS.JS — Gráficos interativos com Chart.js
// ============================================================

// Configuração global do Chart.js
Chart.defaults.color = '#94A3B8';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.padding = 20;
Chart.defaults.elements.point.radius = 4;
Chart.defaults.elements.point.hoverRadius = 6;
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;

const CHART_COLORS = {
    purple: '#7C3AED',
    purpleLight: '#A78BFA',
    pink: '#EC4899',
    pinkLight: '#F472B6',
    amber: '#F59E0B',
    amberLight: '#FBBF24',
    green: '#34D399',
    greenLight: '#6EE7B7',
    blue: '#60A5FA',
    red: '#F87171',
};

let chartInstances = {};

// ── Utilitário: criar gradiente ──
function createGradient(ctx, color1, color2, vertical = true) {
    const gradient = vertical
        ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
        : ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

// ── Tooltip customizado ──
const tooltipConfig = {
    backgroundColor: '#111128',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    titleFont: { family: "'Inter'", weight: '600', size: 13 },
    bodyFont: { family: "'Inter'", weight: '400', size: 12 },
    padding: 12,
    cornerRadius: 8,
    displayColors: true,
    boxPadding: 4,
};

// ============================================================
// 1. GRÁFICO DE LINHA — Evolução do Alcance e Interações
// ============================================================
function renderLineChart(posts) {
    const ctx = document.getElementById('chart-line');
    if (!ctx) return;

    if (chartInstances['line']) chartInstances['line'].destroy();

    // Agrupar por data
    const porData = {};
    posts.forEach(p => {
        if (!porData[p.data]) {
            porData[p.data] = { alcance: 0, interacoes: 0, posts: 0 };
        }
        porData[p.data].alcance += p.contasAlcancadas;
        porData[p.data].interacoes += p.interacoes;
        porData[p.data].posts++;
    });

    const labels = Object.keys(porData).sort();
    const alcanceData = labels.map(d => porData[d].alcance);
    const interacoesData = labels.map(d => porData[d].interacoes);

    const context = ctx.getContext('2d');
    const gradientAlcance = createGradient(context,
        'rgba(124, 58, 237, 0.3)', 'rgba(124, 58, 237, 0.01)');
    const gradientInteracoes = createGradient(context,
        'rgba(236, 72, 153, 0.2)', 'rgba(236, 72, 153, 0.01)');

    chartInstances['line'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.map(formatarData),
            datasets: [
                {
                    label: 'Alcance',
                    data: alcanceData,
                    borderColor: CHART_COLORS.purple,
                    backgroundColor: gradientAlcance,
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: CHART_COLORS.purple,
                    pointBorderColor: '#0a0a1a',
                    pointBorderWidth: 2,
                },
                {
                    label: 'Interações',
                    data: interacoesData,
                    borderColor: CHART_COLORS.pink,
                    backgroundColor: gradientInteracoes,
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: CHART_COLORS.pink,
                    pointBorderColor: '#0a0a1a',
                    pointBorderWidth: 2,
                }
            ]
        },
        options: {
            plugins: {
                tooltip: tooltipConfig,
                legend: {
                    position: 'top',
                    align: 'end'
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                    ticks: { maxRotation: 0 }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                    ticks: {
                        callback: v => v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v
                    }
                }
            },
            interaction: { mode: 'index', intersect: false }
        }
    });
}

// ============================================================
// 2. GRÁFICO DE BARRAS — Top Posts por Engajamento
// ============================================================
function renderBarChart(posts) {
    const ctx = document.getElementById('chart-bar');
    if (!ctx) return;

    if (chartInstances['bar']) chartInstances['bar'].destroy();

    const top10 = [...posts]
        .sort((a, b) => b.taxaEngajamento - a.taxaEngajamento)
        .slice(0, 10);

    chartInstances['bar'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: top10.map((p, i) => `Post ${getPostId(p)}`),
            datasets: [{
                label: 'Taxa de Engajamento (%)',
                data: top10.map(p => p.taxaEngajamento.toFixed(1)),
                backgroundColor: top10.map((_, i) => {
                    const colors = [
                        CHART_COLORS.purple, CHART_COLORS.pink, CHART_COLORS.amber,
                        CHART_COLORS.green, CHART_COLORS.blue, CHART_COLORS.red,
                        CHART_COLORS.purpleLight, CHART_COLORS.pinkLight,
                        CHART_COLORS.amberLight, CHART_COLORS.greenLight
                    ];
                    return colors[i % colors.length];
                }),
                borderRadius: 6,
                borderSkipped: false,
                maxBarThickness: 40,
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                tooltip: {
                    ...tooltipConfig,
                    callbacks: {
                        label: ctx => `Engajamento: ${ctx.parsed.x}%`
                    }
                },
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                    ticks: { callback: v => v + '%' }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { size: 11 } }
                }
            }
        }
    });
}

// ============================================================
// 3. GRÁFICO DE ROSCA — Distribuição de Interações
// ============================================================
function renderDoughnutChart(posts) {
    const ctx = document.getElementById('chart-doughnut');
    if (!ctx) return;

    if (chartInstances['doughnut']) chartInstances['doughnut'].destroy();

    const totais = {
        curtidas: posts.reduce((s, p) => s + p.curtidas, 0),
        comentarios: posts.reduce((s, p) => s + p.comentarios, 0),
        salvamentos: posts.reduce((s, p) => s + p.salvamentos, 0),
        compartilhamentos: posts.reduce((s, p) => s + p.compartilhamentos, 0),
    };

    chartInstances['doughnut'] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Curtidas', 'Comentários', 'Salvamentos', 'Compartilhamentos'],
            datasets: [{
                data: [totais.curtidas, totais.comentarios, totais.salvamentos, totais.compartilhamentos],
                backgroundColor: [
                    CHART_COLORS.purple,
                    CHART_COLORS.pink,
                    CHART_COLORS.amber,
                    CHART_COLORS.green,
                ],
                borderColor: '#0a0a1a',
                borderWidth: 3,
                hoverOffset: 8,
            }]
        },
        options: {
            cutout: '65%',
            plugins: {
                tooltip: {
                    ...tooltipConfig,
                    callbacks: {
                        label: ctx => {
                            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                            const pct = ((ctx.parsed / total) * 100).toFixed(1);
                            return `${ctx.label}: ${formatarNumero(ctx.parsed)} (${pct}%)`;
                        }
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: { padding: 16, font: { size: 11 } }
                }
            }
        }
    });
}

// ============================================================
// 4. GRÁFICO DE DISPERSÃO — Alcance × Engajamento
// ============================================================
function renderScatterChart(posts) {
    const ctx = document.getElementById('chart-scatter');
    if (!ctx) return;

    if (chartInstances['scatter']) chartInstances['scatter'].destroy();

    const dataPoints = posts.map(p => ({
        x: p.contasAlcancadas,
        y: p.taxaEngajamento,
        label: getPostId(p),
        score: p.scorePerformance
    }));

    chartInstances['scatter'] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Posts',
                data: dataPoints,
                backgroundColor: dataPoints.map(d => {
                    if (d.score > 500) return CHART_COLORS.green;
                    if (d.score > 100) return CHART_COLORS.amber;
                    return CHART_COLORS.purple;
                }),
                borderColor: dataPoints.map(d => {
                    if (d.score > 500) return CHART_COLORS.greenLight;
                    if (d.score > 100) return CHART_COLORS.amberLight;
                    return CHART_COLORS.purpleLight;
                }),
                borderWidth: 1.5,
                pointRadius: dataPoints.map(d => {
                    if (d.score > 500) return 10;
                    if (d.score > 100) return 7;
                    return 5;
                }),
                pointHoverRadius: 12,
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    ...tooltipConfig,
                    callbacks: {
                        title: items => `Post ${items[0].raw.label}`,
                        label: ctx => [
                            `Alcance: ${formatarNumero(ctx.raw.x)}`,
                            `Engajamento: ${ctx.raw.y.toFixed(1)}%`,
                            `Score: ${formatarNumero(ctx.raw.score)}`
                        ]
                    }
                },
                legend: { display: false }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Contas Alcançadas',
                        color: '#64748B',
                        font: { size: 11 }
                    },
                    grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                    ticks: {
                        callback: v => v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Taxa de Engajamento (%)',
                        color: '#64748B',
                        font: { size: 11 }
                    },
                    grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                    ticks: { callback: v => v + '%' }
                }
            }
        }
    });
}

// ============================================================
// Render All Charts
// ============================================================
function renderAllCharts(posts) {
    renderLineChart(posts);
    renderBarChart(posts);
    renderDoughnutChart(posts);
    renderScatterChart(posts);
}
