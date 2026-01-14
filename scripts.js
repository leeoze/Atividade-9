const API_URL = 'https://crudcrud.com/api/fa62603b30044730adb493b9ace3c4b2/tarefas';

const form = document.getElementById('formCliente');
const lista = document.getElementById('listaClientes');

/* =========================
   CADASTRAR CLIENTE (POST)
========================= */
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const cliente = {
        nome: nome,
        email: email
    };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    })
    .then(() => {
        form.reset();
        listarClientes();
    })
    .catch(error => console.error('Erro ao cadastrar:', error));
});

/* =========================
   LISTAR CLIENTES (GET)
========================= */
function listarClientes() {
    fetch(API_URL)
        .then(response => response.json())
        .then(clientes => {
            lista.innerHTML = '';

            clientes.forEach(cliente => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${cliente.nome} - ${cliente.email}
                    <button onclick="excluirCliente('${cliente._id}')">Excluir</button>
                `;
                lista.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao listar:', error));
}

/* =========================
   EXCLUIR CLIENTE (DELETE)
========================= */
function excluirCliente(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(() => listarClientes())
    .catch(error => console.error('Erro ao excluir:', error));
}

/* =========================
   CARREGAR LISTA AO INICIAR
========================= */
listarClientes();
