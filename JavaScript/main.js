'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')
const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const tempClient = {
    nome: "Marcos",
    email: "marcosmaiafidelis777@outlook.com",
    celular: "81998240579",
    cidade: "Jaboatão"
}

// CRUD create read update delete
const createClient = (client) => {
    const db_client = JSON.parse(localStorage.getItem('db_client'))
    db_client.push (client)
    localStorage.setItem("db_client", JSON.stringify(client))
}

// eventos
    document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)
document.getElementById('modalClose')
    .addEventListener('click', closeModal)