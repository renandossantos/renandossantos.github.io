// Importa o array de livros de outro arquivo
import bookDescription from "./books.js";
// Os livros buscados serão chamados pela const books
const books = bookDescription();

const estante = document.getElementById("estante");
// Botões - Lido / Não lido / Todos
const mostrarLidosButton = document.getElementById("mostrar-lidos");
const mostrarNaoLidosButton = document.getElementById("mostrar-nao-lidos");
const mostrarTodosButton = document.getElementById("mostrar-todos");
const termoBuscado = document.getElementById("termo-buscado");

// Limpa estante antes de filtrar
function displayBooks(filteredBooks) {
  estante.innerHTML = "";

  for (let i = 0; i < filteredBooks.length; i++) {
    let book = filteredBooks[i];

    const newBook = document.createElement("article");
    newBook.className =
      "bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-4 text-center book-item cursor-pointer";

    newBook.innerHTML = `
<a href='${book.link}'>
  <img src='${book.imageUrl}' alt='${
      book.title
    }' class='w-36 object-cover mb-4 rounded book-cover  transition-transform transform hover:scale-105 cursor-pointer' 
    }'>
</a>
<h3 class='text-lg font-semibold text-gray-900 mb-1'>${book.title}</h3>
<p class='text-sm text-gray-600'>${book.author}</p>
<p class='status'>${book.alreadyRead ? "✅ Read" : "❌ Not Read"}</p>

<div class="botoes-card flex flex-row mb-3 mt-3 space-x-4 ">
  <button class="btn-delete bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">
    Apagar
  </button>

  <button class="btn-edit bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded">
    Editar
  </button>
</div>

<div class="janela-edicao hidden fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">

  <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
    <form class="form-edit space-y-4">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Editar Livro</h2>
      
      <div class="flex flex-col space-y-2">
        <label for="edit-book-title" class="text-gray-700 font-medium">Nome do Livro:</label>
        <input type="text" class="edit-book-title px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500">
      </div>
      
      <div class="flex flex-col space-y-2">
        <label for="edit-book-author" class="text-gray-700 font-medium">Autor:</label>
        <input type="text" class="edit-book-author px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500">
      </div>
      
      <div class="flex flex-col space-y-2">
        <p class="text-gray-700 font-medium">Status:</p>
        <div class="flex items-center space-x-4">
          <label class="inline-flex items-center">
            <input type="radio" name="reading-status" value="read" class="form-radio text-green-500 h-5 w-5">
            <span class="ml-2">✅ Read</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" name="reading-status" value="not-read" class="form-radio text-red-500 h-5 w-5">
            <span class="ml-2">❌ Not Read</span>
          </label>
        </div>
      </div>


      
      <div class="flex space-x-4 pt-4">
      <button type='button' class='btn-cancel w-1/2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200'>
      Cancelar
      </button>

        <button type="submit" class="save-btn-edit w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200">
          Salvar Edição
        </button>
      </div>
    </form>
  </div>
</div>
`;
    // BOTAO DELETE
    const btnDelete = newBook.querySelector(".btn-delete");
    btnDelete.addEventListener(
      "click",
      function () {
        newBook.remove();
      },
      false
    );

    // BOTAO EDIT
    const botaoEditar = newBook.querySelector(".btn-edit");
    const abrirJanelaEdicao = newBook.querySelector(".janela-edicao");
    const formEdicao = newBook.querySelector(".form-edit");
    const btnCancel = newBook.querySelector(".btn-cancel");

    botaoEditar.addEventListener(
      "click",
      function () {
        abrirJanelaEdicao.classList.remove("hidden");
        const editTitle = newBook.querySelector(".edit-book-title");
        const editAuthor = newBook.querySelector(".edit-book-author");
        const editStatusRead = newBook.querySelector("input[value='read']");
        const editStatusNotRead = newBook.querySelector(
          "input[value='not-read']"
        );

        editTitle.value = book.title;
        editAuthor.value = book.author;

        if (book.alreadyRead) {
          editStatusRead.checked = true;
        } else {
          editStatusNotRead.checked = true;
        }
      },
      false
    );

    // BOTAO CANCELAR
    btnCancel.addEventListener("click", function () {
      abrirJanelaEdicao.classList.add("hidden");
    });

    formEdicao.addEventListener("submit", function (e) {
      e.preventDefault();

      const editTitle = newBook.querySelector(".edit-book-title").value;
      const editAuthor = newBook.querySelector(".edit-book-author").value;
      const isRead = newBook.querySelector("input[value='read']").checked;

      book.title = editTitle;
      book.author = editAuthor;
      book.alreadyRead = isRead;

      newBook.querySelector("h3").textContent = editTitle;
      newBook.querySelector("p.text-sm").textContent = editAuthor;
      newBook.querySelector("p.status").textContent = isRead
        ? "✅ Read"
        : "❌ Not Read";

      abrirJanelaEdicao.classList.add("hidden");
    });
    estante.appendChild(newBook);
  }
}

// Eventos de clique que disparam as funções de filtro
mostrarLidosButton.addEventListener("click", () => {
  const livrosLidos = books.filter((book) => book.alreadyRead);
  displayBooks(livrosLidos);
});

mostrarNaoLidosButton.addEventListener("click", () => {
  const livrosNaoLidos = books.filter((book) => !book.alreadyRead);
  displayBooks(livrosNaoLidos);
});

mostrarTodosButton.addEventListener("click", () => {
  displayBooks(books);
});

// BARRA DE PESQUISA
termoBuscado.addEventListener("input", (e) => {
  const termo = e.target.value.toLowerCase();

  const livrosFiltrados = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(termo) ||
      book.author.toLowerCase().includes(termo)
    );
  });
  displayBooks(livrosFiltrados);
});

// Exibir todos sem filtro
displayBooks(books);
