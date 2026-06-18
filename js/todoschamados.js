const cardsChamados = document.querySelector('.cards-chamados');
const filtroId = document.getElementById('filtro_id');
const filtroSolicitante = document.getElementById('filtro_solicitante');
const prioridadeSelect = document.getElementById('prioridade');
const complexidadeSelect = document.getElementById('complexidade');
const statusSelect = document.getElementById('status');
const filtrarBtn = document.getElementById('filtrar_btn');
const limparBtn = document.getElementById('limpar_btn');
const navList = document.getElementById("nav");
const modal = document.getElementById('modal-chamado');
const modalContent = document.getElementById('modal-content');


window.onload = function() {
    isSuporte();
    const chamadosSalvos = JSON.parse(localStorage.getItem('chamados'));
    if (chamadosSalvos) {
        addHTML(chamadosSalvos);
    } else {
        cardsChamados.innerHTML = "Nenhum chamado até o momento.";
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

filtrarBtn.addEventListener('click', function(e) {
    const chamadosSalvos = JSON.parse(localStorage.getItem('chamados'));
    const filtradoId = filtroId.value !== "" ? chamadosSalvos.filter(chamado => chamado.id.includes(filtroId.value)) : chamadosSalvos;
    const filtradoSolicitante = filtroSolicitante.value !=="" ? filtradoId.filter(chamado => chamado.solicitante.toLowerCase().includes(filtroSolicitante.value.toLowerCase())) : filtradoId;
    const filtradoPrioridade = prioridadeSelect.value !=="" ? filtradoSolicitante.filter(chamado => chamado.prioridade.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() === prioridadeSelect.value.toLowerCase()) : filtradoSolicitante;
    const filtradoComplexidade = complexidadeSelect.value !=="" ? filtradoPrioridade.filter(chamado => chamado.complexidade.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() === complexidadeSelect.value.toLowerCase()) : filtradoPrioridade;
    const filtradoStatus = statusSelect.value !=="" ? filtradoComplexidade.filter(chamado => chamado.status.toLowerCase() === statusSelect.value.toLowerCase()) : filtradoComplexidade;
    addHTML(filtradoStatus);
});

limparBtn.addEventListener('click', function(e) {
    filtroId.value = "";
    filtroSolicitante.value = "";
    prioridadeSelect.value = "";
    complexidadeSelect.value = "";
    statusSelect.value = "";
    const chamadosSalvos = JSON.parse(localStorage.getItem('chamados'));
    addHTML(chamadosSalvos);
});

const isSuporte = () => {
    const usuario = localStorage.getItem("usuario");
    if (usuario === "Suporte") {
        navList.innerHTML = `
        <li><a href="../html/classificar.html">Não classificados</a></li>
        <li><a href="../html/atendimento.html">Em atendimento</a></li>
        <li><a href="../html/index.html">Logout</a></li>
        `;
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
        <button id="btn-fechar">Fechar</button>
        </div>
    `;

    const btnFechar = document.getElementById('btn-fechar');

    btnFechar.addEventListener('click', () => {
    modal.close();
    });

    modal.showModal()
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.close();
  }
});