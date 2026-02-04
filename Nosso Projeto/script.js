 const form = document.getElementById('form_Agenda');

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
  });