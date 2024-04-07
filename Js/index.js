// Array
let participantes = [
  // Objetos
  {
    nome: 'Diego Fernandes',
    email: 'diego@gmail.com',
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: 'Mayk Brito',
    email: 'mayk@gmail.com',
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: null
  },
  {
    nome: 'Ana Souza',
    email: 'ana@gmail.com',
    dataInscricao: new Date(2024, 0, 3, 19, 23),
    dataCheckIn: new Date(2024, 0, 4, 20, 20)
  },
  {
    nome: 'João Silva',
    email: 'joao@gmail.com',
    dataInscricao: new Date(2023, 11, 4, 19, 23),
    dataCheckIn: new Date(2023, 11, 5, 20, 20)
  },
  {
    nome: 'Maria Oliveira',
    email: 'maria@gmail.com',
    dataInscricao: new Date(2023, 10, 5, 19, 23),
    dataCheckIn: new Date(2023, 10, 6, 20, 20)
  },
  {
    nome: 'Pedro Santos',
    email: 'pedro@gmail.com',
    dataInscricao: new Date(2023, 9, 6, 19, 23),
    dataCheckIn: null
  },
  {
    nome: 'Carla Lima',
    email: 'carla@gmail.com',
    dataInscricao: new Date(2023, 8, 7, 19, 23),
    dataCheckIn: new Date(2023, 8, 8, 20, 20)
  },
  {
    nome: 'Lucas Sousa',
    email: 'lucas@gmail.com',
    dataInscricao: new Date(2023, 7, 8, 19, 23),
    dataCheckIn: new Date(2023, 7, 9, 20, 20)
  },
  {
    nome: 'Paula Costa',
    email: 'paula@gmail.com',
    dataInscricao: new Date(2023, 6, 9, 19, 23),
    dataCheckIn: new Date(2023, 6, 10, 20, 20)
  },
  {
    nome: 'Gabriel Almeida',
    email: 'gabriel@gmail.com',
    dataInscricao: new Date(2023, 5, 10, 19, 23),
    dataCheckIn: null
  }
]

// Função para criar um participante novo
const criarNovoParticipante = participante => {
  // Atualizara o meu display do dia atual para oque queremos
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  // Condicional para criar um botão para fazer Check-in do novo participante
  if (participante.dataCheckIn == null) {
    dataCheckIn = `
    <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
      Confirmar check-in
    </button>
    `
  }

  // Retorna a lista atualizada para a função
  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}  
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>
       ${dataInscricao}
      </td>
      <td>
        ${dataCheckIn}
      </td>
    </tr>
  `
}

// Atualiza a nossa lista do HTML com as novas alterações
const atualizarLista = participantes => {
  let output = ''
  // Estrutura de repetição - loop
  for (let participante of participantes) {
    // Faça alguma coisa
    output = output + criarNovoParticipante(participante)
  }

  // Substituir informação do HTML
  document.querySelector('tbody').innerHTML = output
}
// Instancia  o metodo
atualizarLista(participantes)

const adicionarParticipante = event => {
  // Não enviar o formulario quando clicar no submit
  event.preventDefault()

  // Pegar os dados do formulario
  const dadosDoFurmulario = new FormData(event.target)

  // Pega as infomações do participante a partir dos campos preenchidos no formulario de inscrição
  const participante = {
    nome: dadosDoFurmulario.get('nome'),
    email: dadosDoFurmulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // Verificar se o participante já existe na lista de participantes
  const participanteExiste = participantes.find(
    p => p.email == participante.email
  )

  if (participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  // Coloca o participante atual na lista de participantes e atualiza a lista
  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // Limpar formulario
  event.target.querySelector('[name-"nome"]').value = ''
  event.target.querySelector('[name-"email"]').value = ''
}

const fazerCheckIn = event => {
  // Confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if (confirm(mensagemConfirmacao) == false) {
    return
  }

  // Encontrar o participante dentro da lista
  const participante = participantes.find(
    p => p.email == event.target.dataset.email
  )

  // Atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // Atualizar a lista de participantes
  atualizarLista(participantes)
}
