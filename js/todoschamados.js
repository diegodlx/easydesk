const cardsChamados = document.querySelector('.cards-chamados');
const filtroId = document.getElementById('filtro_id');
const filtroSolicitante = document.getElementById('filtro_solicitante');
const prioridadeSelect = document.getElementById('prioridade');
const complexidadeSelect = document.getElementById('complexidade');
const statusSelect = document.getElementById('status');
const filtrarBtn = document.getElementById('filtrar_btn');
const limparBtn = document.getElementById('limpar_btn');


window.onload = function() {
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