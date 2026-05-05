const cardsChamados = document.querySelector('.cards-chamados');

window.onload = function() {
    const chamadosSalvos = JSON.parse(localStorage.getItem('chamados'));
    if (chamadosSalvos) {
        // console.log(chamadosSalvos);
        // alert('Chamados mostrados no console!');
        addHTML(chamadosSalvos);
    } else {
        // alert('Nenhum chamado encontrado no localStorage!');
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