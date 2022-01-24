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
    const dbClient = readClient()    //ok
    dbClient.splice(index,1)
    setlocalStorage(dbClient)
}

const updateClient = (index , client) => {
    const dbClient = readClient()
    dbClient [index] = client           //ok
    setlocalStorage(dbClient)
}

const readClient = () => getlocalStorage() //ler    //ok

const createClient = (client) => {  //Criar
    const dbClient = getlocalStorage()          //ok
    dbClient.push (client)
    setlocalStorage(dbClient)
}

//Obrigatoriedade de preencher todos os campos
const isValiFields = () => {                    //ok
    return document.getElementById('form').reportValidity() // reportValidity retorna se todos os requisistos do html estiver verdadeiro
}

// fechar janela
const clearFields = () =>{  
    const fields = document.querySelectorAll('.modal-field')            
    fields.forEach(field => fields.value = "")
    document.getElementById("nome").dataset.index = "new"           //ok
}
//interação com o layout 
const saveClient = () => {
    if (isValiFields()) {  //verifica se os campos são válidos
        const client = { //novo cliente
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            celular: document.getElementById("celular").value,
            cidade: document.getElementById("cidade").value         //ok
        }
        const index = document.getElementById("nome").dataset.index
        if(index == 'new') {
            createClient(client) //Criação de novo cliente, envia p localStorage
            updateTable()
            closeModal()
        } else{
            updateClient(index, client)
            updateTable()
            closeModal()
        }
        
    }
}

const creatRow = (client , index) => {  //tabela        //ok
    const newRow = document.createElement('tr')
    newRow.innerHTML =  `
        <td>${client.nome}</td>
        <td>${client.email}</td>            
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="botao-editar" id="edit-${index}">Editar</button>
            <button type="button" class="botao-excluir" id="delete-${index}">Excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()                        //ok
    dbClient.forEach(creatRow)
}

const fillFields = (client) => {
    document.getElementById("nome").value = client.nome
    document.getElementById("email").value = client.email           //ok
    document.getElementById("celular").value = client.celular
    document.getElementById("cidade").value = client.cidade
    document.getElementById("nome").dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient() [index]
    client.index = index 
    fillFields(client)                  //ok
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action,index] = event.target.id.split('-')
        
        if(action == "edit"){
            editClient(index)
        }else{
            const client = readClient() [index]
            const response  = confirm(`Deseja realmente excluir ${client.nome}?`)
            if(response){
                deleteClient(index)
                updateTable()
            

            }
        }
            
    }
}


updateTable()

    // eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click' , saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)

document.getElementById("cancelar")
    addEventListener('click' , closeModal)