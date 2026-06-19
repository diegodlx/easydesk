const cardsChamados = document.querySelector('.cards-chamados');
const resumoChamado = document.querySelector('.dados-resumo');
const resumoPrioridade = document.querySelector('.dados-prioridade');
const resumoPrazo = document.querySelector('.dados-deadline');
const modal = document.getElementById('modal-chamado');
const modalContent = document.getElementById('modal-content');
const confirmaModal = document.getElementById('modal-confirma');
const btnConfirma = document.getElementById('btn-confirma');
const btnCancela = document.getElementById('btn-cancela');

window.onload = function() {
    const chamadosSalvos = JSON.parse(localStorage.getItem('chamados'));
    if (chamadosSalvos) {
        const chamadosAtendimento = chamadosSalvos.filter(chamado => chamado.status === "Atendimento");
        addHTML(chamadosAtendimento);
        fillResumo(chamadosSalvos, chamadosAtendimento);
    } else {
        cardsChamados.innerHTML = "Nenhum chamado até o momento.";
    }
};

const fillResumo = (chamadosTotal, chamadosAbertos) => {
    
    const dadosResumo = chamadosTotal.reduce((acc, chamado) => {
        acc[chamado.status] = (acc[chamado.status] || 0) + 1;
            return acc
    }, {});

    resumoChamado.innerHTML = `
    <p>Abertos: ${dadosResumo.Aberto || 0}</p>
    <p>Atendimento: ${(dadosResumo.Atendimento) || 0}</p>
    <p>Fechados: ${dadosResumo.Fechado || 0}</p>
    `;

    const dadosPrioridade = chamadosAbertos.reduce((acc, chamado) => {
        acc[chamado.prioridade] = (acc[chamado.prioridade] || 0) + 1;
            return acc
    }, {});

    resumoPrioridade.innerHTML = `
    <p>Alta: ${dadosPrioridade.alta || 0}</p>
    <p>Média: ${dadosPrioridade.media || 0}</p>
    <p>Baixa: ${dadosPrioridade.baixa || 0}</p>
    `;

    const dadosPrazo = chamadosAbertos.filter(chamado => chamado.status === "Atendimento").reduce((acc, chamado) => {
        acc.emDia = (new Date(chamado.prazo) >= new Date()) ? (acc.emDia || 0) + 1 : acc.emDia || 0;
        acc.atrasados = (new Date(chamado.prazo) < new Date()) ? (acc.atrasados || 0) + 1 : acc.atrasados || 0;
        return acc
    }, {});

    resumoPrazo.innerHTML = `
    <p>Em dia: ${dadosPrazo.emDia || 0}</p>
    <p>Atrasados: ${dadosPrazo.atrasados || 0}</p>
    `;
};

const addHTML = (chamados) => {
    cardsChamados.innerHTML = "";
    chamados.forEach(chamado => {
        cardsChamados.innerHTML += `
            <div class="card-chamado" id="${chamado.id}">
            <p><strong>ID:</strong> ${chamado.id}</p>
            <p><strong>Solicitante:</strong> ${chamado.solicitante}</p>
            <p><strong>Prioridade:</strong> ${chamado.prioridade}</p>
            <p><strong>Problema:</strong> ${chamado.problema}</p>
            <p><strong>Prazo:</strong> ${chamado.prazo}</p>
            </div>
        `;
    });
};

cardsChamados.addEventListener("click", (e) => {
    const id = e.target.closest(".card-chamado").id;
    const chamadosSalvos = JSON.parse(localStorage.getItem('chamados'));
    const chamadoModal = chamadosSalvos.filter(chamado => chamado.id === id)[0];
    modalContent.innerHTML = `
        <div class="modal" id="${id}">
        <h3>Detalhes do chamado</h3>
        <p><strong>ID:</strong> ${chamadoModal.id}</p>
        <p><strong>Solicitante:</strong> ${chamadoModal.solicitante}</p>
        <p><strong>Abertura:</strong> ${chamadoModal.data}</p>
        <p><strong>Problema:</strong> ${chamadoModal.problema}</p>
        <p><strong>Prioridade:</strong> ${chamadoModal.prioridade}</p>
        <p><strong>Complexidade:</strong> ${chamadoModal.complexidade}</p>
        <p><strong>Prazo:</strong> ${chamadoModal.prazo}</p>
        <p><strong>Descrição:</strong> ${chamadoModal.descricao}</p>
        <button id="btn-cancelar">Cancelar chamado</button>
        <button id="btn-fechar">Fechar</button>
        </div>
    `;

    const btnFechar = document.getElementById('btn-fechar');
    const btnCancelar = document.getElementById('btn-cancelar');

    btnFechar.addEventListener('click', () => {
    modal.close();
    });

    btnCancelar.addEventListener('click', () => {
        localStorage.setItem('idChamado', id);
        confirmaModal.showModal();
    });

    modal.showModal()
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.close();
  }
});

btnCancela.addEventListener('click', () => {
    localStorage.removeItem('idChamado');
    confirmaModal.close();
});

btnConfirma.addEventListener('click', () => {
    confirmaModal.close();
    cancelarChamado();
});

const cancelarChamado = (id) => {
    id = localStorage.getItem('idChamado');
    localStorage.removeItem('idChamado');
    const chamadosSalvos = JSON.parse(localStorage.getItem('chamados'));
    const indexChamado = chamadosSalvos.findIndex(chamado => chamado.id === id);

    if (indexChamado !== -1) {
        chamadosSalvos[indexChamado].status = "Cancelado";
        localStorage.setItem('chamados', JSON.stringify(chamadosSalvos));
        modal.close();
        const chamadosAtendimento = chamadosSalvos.filter(chamado => chamado.status === "Atendimento");
        fillResumo(chamadosSalvos, chamadosAtendimento);
        addHTML(chamadosAtendimento);
    };
};