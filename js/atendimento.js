const cardsChamados = document.querySelector('.cards-chamados');
const modal = document.getElementById('modal-chamado');
const modalContent = document.getElementById('modal-content');

window.onload = function() {
    const chamadosSalvos = JSON.parse(localStorage.getItem('chamados'));
        const chamadosAtendimento = chamadosSalvos.filter(chamado => chamado.status === "Atendimento");
        addHTML(chamadosAtendimento);
};

const addHTML = (chamados) => {
    cardsChamados.innerHTML = "";
    if (chamados.length > 0) {
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
    } else {
        cardsChamados.innerHTML = "Nenhum chamado até o momento.";
    };
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
        <button id="btn-concluir">Concluir atendimento</button>
        <button id="btn-fechar">Fechar</button>
        </div>
    `;

    const btnFechar = document.getElementById('btn-fechar');
    const btnConcluir = document.getElementById('btn-concluir');

    btnFechar.addEventListener('click', () => {
    modal.close();
    });

    btnConcluir.addEventListener('click', () => {
        concluirChamado(id);
    });

    modal.showModal()
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.close();
  }
});

const concluirChamado = (id) => {
    const chamadosSalvos = JSON.parse(localStorage.getItem('chamados'));
    const indexChamado = chamadosSalvos.findIndex(chamado => chamado.id === id);

    if (indexChamado !== -1) {
        chamadosSalvos[indexChamado].status = "Fechado";
        localStorage.setItem('chamados', JSON.stringify(chamadosSalvos));
        modal.close();
        const chamadosAtendimento = chamadosSalvos.filter(chamado => chamado.status === "Atendimento");
        addHTML(chamadosAtendimento);
    };
};