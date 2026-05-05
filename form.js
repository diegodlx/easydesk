const form = document.getElementById('chamado-form');

form.addEventListener('submit', function (event) {
  // 1. Previne o envio padrão do formulário (recarregar página)
  event.preventDefault();

  // 2. Captura todos os dados usando o atributo 'name'
  const formData = new FormData(form);

  // 3. Converte FormData para um objeto JavaScript simples
  const dados = Object.fromEntries(formData);

  // 4. Exibe o objeto no console
  console.log(dados);

  if (!conferePreenchimento(dados)) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  } else {
    alert('Dados salvos no console!');
    const dataAbertura = new Date().toISOString().split('T')[0];
    const horaAbertura = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    salvaChamado(dados, dataAbertura, horaAbertura);
  };

  form.reset();
  window.location.href = "index.html";  
});


const conferePreenchimento = (dados) => {
  return true
};

salvaChamado = (dados, data, hora) => {
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
  console.log(chamado);
};

const novoID = (data, hora) => {
  const id = data.replace(/-/g, '') + hora.replace(/:/g, '');
  return id;
};