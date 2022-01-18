'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')
const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const tempClient = {
    nome: "Alice",
    email: "marcosmaiafidelis777@outlook.com",
    celular: "81998240579",
    cidade: "Recife"
}

 const getlocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? []
 const setlocalStorage = (dbClient) => localStorage.setItem("db_client" , JSON.stringify(dbClient))

// CRUD create read update delete
const createClient = (client) => {
    const dbClient = JSON.parse(localStorage.getItem("db_client")) ?? []
    dbClient.push (client)
    setlocalStorage(dbClient)
}

// eventos
    document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)
document.getElementById('modalClose')
    .addEventListener('click', closeModal)