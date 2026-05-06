const cardsChamados = document.querySelector('.cards-chamados');

window.onload = function() {
    const chamadosSalvos = JSON.parse(localStorage.getItem('chamados'));
    if (chamadosSalvos) {
        const chamadosAbertos = chamadosSalvos.filter(chamado => chamado.status === "Aberto");
        addHTML(chamadosAbertos);
    } else {
        cardsChamados.innerHTML = "Nenhum chamado até o momento.";
    }
};

const addHTML = (chamados) => {
    cardsChamados.innerHTML = "";
    chamados.forEach(chamado => {
        cardsChamados.innerHTML += `
            <div class="card-chamado">
                <p><strong>Solicitante:</strong> ${chamado.solicitante}</p>
                <p><strong>Prioridade:</strong> ${chamado.prioridade}</p>
                <p><strong>Problema:</strong> ${chamado.problema}</p>
                <p><strong>Descrição:</strong> ${chamado.descricao}</p>
            </div>
        `;
    });
};