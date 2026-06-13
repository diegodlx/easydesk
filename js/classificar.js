const cardsChamados = document.querySelector('.cards-chamados');
const modal = document.getElementById('modal-chamado');
const modalContent = document.getElementById('modal-content');
const btnFechar = document.getElementById('btn-fechar');

window.onload = function() {
    const chamadosSalvos = JSON.parse(localStorage.getItem('chamados'));
    if (chamadosSalvos) {
        const chamadosAbertos = chamadosSalvos.filter(chamado => chamado.complexidade === "a definir");
        addHTML(chamadosAbertos);
    } else {
        cardsChamados.innerHTML = "Nenhum chamado para classificar até o momento.";
    }
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
        <p><strong>Descrição:</strong> ${chamadoModal.descricao}</p>
        <label for="complexidade"><strong>Classificar complexidade:</strong></label>
        <select name="complexidade" id="complexidade">
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
        </select>
        <button id="btn-salvar">Salvar</button>
        <button id="btn-fechar">Fechar</button>
        </div>
    `;

    const btnFechar = document.getElementById('btn-fechar');
    const btnSalvar = document.getElementById('btn-salvar');
    const complexidade = document.getElementById('complexidade');

    btnFechar.addEventListener('click', () => {
    modal.close();
    });

    btnSalvar.addEventListener('click', () => {
        salvarChamado(id, complexidade.value);
    });

    modal.showModal();
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.close();
  }
});

const salvarChamado = (id, complexidade) => {
    const chamadosSalvos = JSON.parse(localStorage.getItem('chamados'));
    const indexChamado = chamadosSalvos.findIndex(chamado => chamado.id === id);
    
    let prazoDias = 0;
    if (complexidade === "baixa") {
        prazoDias = 1;
    } else if (complexidade === "media") {
        prazoDias = 3;
    } else if (complexidade === "alta") {
        prazoDias = 7;
    };

    if (indexChamado !== -1) {
        const dataAbertura = new Date(chamadosSalvos[indexChamado].data + "T12:00:00");
        dataAbertura.setDate(dataAbertura.getDate() + prazoDias);
        const prazo = dataAbertura.toISOString().split('T')[0];
        chamadosSalvos[indexChamado].complexidade = complexidade;
        chamadosSalvos[indexChamado].status = "Atendimento";
        chamadosSalvos[indexChamado].prazo = prazo;
        localStorage.setItem('chamados', JSON.stringify(chamadosSalvos));
        modal.close();
        const chamadosAbertos = chamadosSalvos.filter(chamado => chamado.complexidade === "a definir");
        addHTML(chamadosAbertos);
    };
};