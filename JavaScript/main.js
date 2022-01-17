'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')
const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const tempClient = {
    nome: "Marcos Maia",
    email: "marcosmaiafidelis777@outlook.com",
    celular: "81998240579",
    cidade: "Recife"
}

// CRUD create read update delete
const createClient = (client) => {
    localStorage.setItem ('db_client', JSON.stringify(client))
}



    // eventos
    document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)
document.getElementById('modalClose')
    .addEventListener('click', closeModal)