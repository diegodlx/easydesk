const form = document.getElementById('chamado-form');
const modal = document.getElementById('confirmacao');
const btnFechar = document.getElementById('fechar-dialog');

form.addEventListener('submit', function async (event) {
  event.preventDefault();

  const formData = new FormData(form);

  const dados = Object.fromEntries(formData);

  if (!conferePreenchimento(dados)) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  } else {
    const dataAbertura = new Date().toISOString().split('T')[0];
    const horaAbertura = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    salvaChamado(dados, dataAbertura, horaAbertura);
    confirmacao();
  };

 
});


const conferePreenchimento = (dados) => {
  return true
};

const salvaChamado = (dados, data, hora) => {
  const chamado = {
    solicitante: dados.solicitante,
    prioridade: dados.prioridade,
    problema: dados.problema,
    descricao: dados.descricao,
    data: data,
    hora: hora,
    id: novoID(data, hora),
    status: "Aberto",
    prazo: "a definir",
    complexidade: "a definir"
  };
  const chamadosSalvos = JSON.parse(localStorage.getItem('chamados')) || [];
  chamadosSalvos.push(chamado);
  localStorage.setItem('chamados', JSON.stringify(chamadosSalvos));
};

const novoID = (data, hora) => {
  const id = data.replace(/-/g, '') + hora.replace(/:/g, '');
  return id;
};

const confirmacao = async () => {
  modal.showModal();
  btnFechar.onclick = () => {
    modal.close();
    form.reset();
    window.location.href = "resumo.html"; 
  };
  modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.close();
    form.reset();
    window.location.href = "resumo.html"; 
  }
});
};