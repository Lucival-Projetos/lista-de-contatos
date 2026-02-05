const form = document.getElementById('form_Agenda');
let listaContatos = [];
const tbody = document.getElementById("tbody");
const totalContatosSpan = document.getElementById("totalContatos");

// carrega os dados na página com o local storage
document.addEventListener("DOMContentLoaded", () => {
  const dadosSalvos = localStorage.getItem("listaContatos");

  if (dadosSalvos) {
    listaContatos = JSON.parse(dadosSalvos);
    listaTabela();
  }
});

// submit do formulário
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const email = document.getElementById('email').value.trim();
  const tipo = document.getElementById('tipo').value;

    
  if (!nome || !telefone || !email || !tipo ) {
    alert('Preencha nome, telefone e tipo do contato.');
    return;
  }

  if (telefone.length < 8) {
    alert('Telefone inválido.');
    return;
  }

   
  alert('Formulário válido!');
  form.reset();

  const contato = {
    Nome: nome,
    Telefone: telefone,
    Email: email,
    Tipo: tipo
  };

  listaContatos.push(contato);

  listaTabela();
  salvar();
  form.reset();
});

// salva a lista de contatos no localStorage
function salvar() {
  localStorage.setItem("listaContatos", JSON.stringify(listaContatos));
}

// lista o array listaContatos em uma tabela dentro do html, com as ações possíveis para cada item da tabela
function listaTabela(){

  tbody.innerHTML = "";
  
  for(let i = 0; i < listaContatos.length; i++){
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${listaContatos[i].Nome}</td>
      <td>${listaContatos[i].Telefone}</td>
      <td>${listaContatos[i].Email}</td>
      <td>${listaContatos[i].Tipo}</td>
    `;

    const td_acoes = document.createElement("td");
    const excluir = document.createElement("button");
    excluir.textContent = "Excluir";

    excluir.addEventListener("click", () => {
      excluirContato(i);
    });

    td_acoes.appendChild(excluir);
    tr.appendChild(td_acoes);

    tbody.appendChild(tr);
  };

  total();
  totalTipo();
}

// realiza a exclusão do item em especifico
function excluirContato(index) {
  let novaLista = [];

  for (let i = 0; i < listaContatos.length; i++) {
    if (i !== index) {
      novaLista.push(listaContatos[i]);
    }
  }

  listaContatos = novaLista;
  salvar();
  listaTabela();
}

// atualiza o valor do total de contatos existentes na tabela, exibido acima da tabela
function total() {
  totalContatosSpan.textContent = listaContatos.length;
}

// atualiza o total de contatos por categoria exibido logo abaixo do total geral
function totalTipo() {
  let pessoal = 0;
  let trabalho = 0;
  let familia = 0;

  for (let i = 0; i < listaContatos.length; i++) {
    if (listaContatos[i].Tipo === "Pessoal") {
      pessoal++;
    } else if (listaContatos[i].Tipo === "Trabalho") {
      trabalho++;
    } else if (listaContatos[i].Tipo === "Família") {
      familia++;
    }
  }

  document.getElementById("totalPessoal").textContent = pessoal;
  document.getElementById("totalTrabalho").textContent = trabalho;
  document.getElementById("totalFamilia").textContent = familia;
}
