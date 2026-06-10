const cardsChamados = document.querySelector('.cards-chamados');
const resumoChamado = document.querySelector('.dados-resumo');
const resumoPrioridade = document.querySelector('.dados-prioridade');
const resumoPrazo = document.querySelector('.dados-deadline');

window.onload = function() {
    const chamadosSalvos = JSON.parse(localStorage.getItem('chamados'));
    if (chamadosSalvos) {
        const chamadosAbertos = chamadosSalvos.filter(chamado => chamado.status === "Aberto");
        addHTML(chamadosAbertos);
        fillResumo(chamadosAbertos);
    } else {
        cardsChamados.innerHTML = "Nenhum chamado até o momento.";
    }
};

const addHTML = (chamados) => {
    cardsChamados.innerHTML = "";
    chamados.forEach(chamado => {
        cardsChamados.innerHTML += `
            <div class="card-chamado ${chamado.id}">
            <p><strong>ID:</strong> ${chamado.id}</p>
            <p><strong>Solicitante:</strong> ${chamado.solicitante}</p>
            <p><strong>Prioridade:</strong> ${chamado.prioridade}</p>
            <p><strong>Problema:</strong> ${chamado.problema}</p>
            <p><strong>Prazo:</strong> ${chamado.prazo}</p>
            </div>
        `;
    });
};

const fillResumo = (chamados) => {
    const dadosResumo = chamados.reduce((acc, chamado) => {
        acc[chamado.status] = (acc[chamado.status] || 0) + 1;
            return acc
    }, {});

    resumoChamado.innerHTML = `
    <p>Abertos: ${dadosResumo.Aberto || 0}</p>
    <p>Fechados: ${dadosResumo.Fechado || 0}</p>
    <p>Total: ${dadosResumo.Aberto + dadosResumo.Fechado || 0}</p>
    `;

    const dadosPrioridade = chamados.reduce((acc, chamado) => {
        acc[chamado.prioridade] = (acc[chamado.prioridade] || 0) + 1;
            return acc
    }, {});

    resumoPrioridade.innerHTML = `
<<<<<<< HEAD
    <p>Alta: ${dadosPrioridade.alta || 0}</p>
    <p>Média: ${dadosPrioridade.media || 0}</p>
    <p>Baixa: ${dadosPrioridade.baixa || 0}</p>
    `;

    const chamadosClassificados = chamados.filter(chamado => chamado.complexidade !== "a definir" && chamado.prazo !== "a definir");

    const dadosPrazo = chamadosClassificados.reduce((acc, chamado) => {
        acc.emDia = (new Date(chamado.prazo) >= new Date()) ? (acc.emDia || 0) + 1 : acc.emDia || 0;
        acc.atrasados = (new Date(chamado.prazo) < new Date()) ? (acc.atrasados || 0) + 1 : acc.atrasados || 0;
        return acc
    }, {});

    resumoPrazo.innerHTML = `
    <p>Em dia: ${dadosPrazo.emDia || 0}</p>
    <p>Atrasados: ${dadosPrazo.atrasados || 0}</p>
    `;

    
};