const cardsChamados = document.querySelector('.cards-chamados');
const guardarBtn = document.getElementById('guardar-btn');
const mostrarBtn = document.getElementById('mostrar-btn');
const limparBtn = document.getElementById('limpar-btn');


// guardarBtn.addEventListener('click', function() {
//     localStorage.setItem('chamados', JSON.stringify(chamados));
//     alert('Chamados guardados no localStorage!');
// });

// mostrarBtn.addEventListener('click', function() {
//     const chamadosSalvos = JSON.parse(localStorage.getItem('chamados'));
//     if (chamadosSalvos) {
//         console.log(chamadosSalvos);
//         alert('Chamados mostrados no console!');
//         addHTML(chamadosSalvos);
//     } else {
//         alert('Nenhum chamado encontrado no localStorage!');
//         cardsChamados.innerHTML = "";
//     }
// });

limparBtn.addEventListener('click', function() {
    localStorage.removeItem('chamados');
    console.log(chamados);
    location.reload();
});

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