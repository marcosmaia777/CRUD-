'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')
const closeModal = () =>{
    clearFields()
    document.getElementById('modal').classList.remove('active')
} 

const getlocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? []
 const setlocalStorage = (dbClient) => localStorage.setItem("db_client" , JSON.stringify(dbClient))

// CRUD create read update delete
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index,1)
    setlocalStorage(dbClient)
}

const updateClient = (index , client) => {
    const dbClient = readClient()
    dbClient [index] = client
    setlocalStorage(dbClient)
}

const readClient = () => getlocalStorage() //ler

const createClient = (client) => {  //Criar
    const dbClient = getlocalStorage()
    dbClient.push (client)
    setlocalStorage(dbClient)
}

//Obrigatoriedade de preencher todos os campos
const isValiFields = () => {  
    return document.getElementById('form').reportValidity() // reportValidity retorna se todos os requisistos do html estiver verdadeiro
}

// fechar janela
const clearFields = () =>{  
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => fields.value = "")
}
//interação com o layout 
const saveClient = () => {
    if (isValiFields()) {  //verifica se os campos são válidos
        const client = { //novo cliente
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            celular: document.getElementById("celular").value,
            cidade: document.getElementById("cidade").value
        }
        createClient(client) //Criação de novo cliente, envia p localStorage
        closeModal()
    }
}

const creatRow = (client) => {  //tabela
    const newRow = document.createElement('tr')
    newRow.innerHTML =  `
        td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="botao-editar" id="botaoEditar">Editar</button>
            <button type="button" class="botao-excluir" id="botaoEcluir">Excluir</button>
        </td>
    
    `
}

const updateTable = () => {
    const dbClient = readClient()
    dbClient.forEach(creatRow)
}

    // eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click' , saveClient)