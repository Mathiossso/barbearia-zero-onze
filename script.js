// Banco de imagens baseado no serviço selecionado
const imagensServicos = {
    degrade: "https://unsplash.com",
    barba: "https://unsplash.com",
    combo: "https://unsplash.com"
};

// Seleção de elementos da tela
const selectServico = document.getElementById('servico');
const previewFoto = document.getElementById('previewFoto');
const formBarbearia = document.getElementById('formBarbearia');
const listaAgendados = document.getElementById('listaAgendados');
const inputData = document.getElementById('data');

// 1. Bloqueia a seleção de datas passadas no calendário
const hoje = new Date().toISOString().split('T')[0];
inputData.setAttribute('min', hoje);

// 2. Evento para mudar a foto dinamicamente ao selecionar o serviço
selectServico.addEventListener('change', (evento) => {
    const servicoSelecionado = evento.target.value;

    if (imagensServicos[servicoSelecionado]) {
        // Altera o HTML interno para exibir a tag de imagem correspondente
        previewFoto.innerHTML = `<img src="${imagensServicos[servicoSelecionado]}" alt="Prévia do Serviço">`;
    } else {
        // Volta para o texto padrão se nada estiver selecionado
        previewFoto.innerHTML = `<p class="placeholder-texto">Selecione um serviço para ver o estilo</p>`;
    }
});

// 3. Evento de envio do formulário de agendamento
formBarbearia.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Impede a página de atualizar

    // Coleta dos dados digitados
    const nome = document.getElementById('nome').value;
    const servicoTexto = selectServico.options[selectServico.selectedIndex].text;
    const data = inputData.value;
    const hora = document.getElementById('hora').value;

    // Formata a data americana (AAAA-MM-DD) para padrão brasileiro (DD/MM/AAAA)
    const dataBR = data.split('-').reverse().join('/');

    // Limpa a mensagem de "Nenhum horário agendado" se for o primeiro item
    if (listaAgendados.classList.contains('lista-vazia')) {
        listaAgendados.innerHTML = '';
        listaAgendados.classList.remove('lista-vazia');
    }

    // Cria o card visual do novo agendamento
    const cardNovo = document.createElement('div');
    cardNovo.classList.add('item-reserva');
    cardNovo.innerHTML = `
        <h4>${nome}</h4>
        <p><strong>Serviço:</strong> ${servicoTexto}</p>
        <p><strong>Data/Hora:</strong> ${dataBR} às ${hora}h</p>
    `;

    // Adiciona o agendamento na barra lateral
    listaAgendados.appendChild(cardNovo);

    // Mensagem amigável de sucesso
    alert(`Ótima escolha, ${nome}! Seu horário para o dia ${dataBR} às ${hora}h foi reservado.`);

    // Reseta o formulário e a foto para novos agendamentos
    formBarbearia.reset();
    previewFoto.innerHTML = `<p class="placeholder-texto">Selecione um serviço para ver o estilo</p>`;
});
