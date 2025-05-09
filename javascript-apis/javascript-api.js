let output = document.querySelector("#output");

fetch("https://randomuser.me/api/?results=50")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    console.log("Response:", response);
    return response.json();
  })
  .then((data) => {
    console.log("Data:", data);
    mostrarUsers(data.results);
  })
  .catch((error) => {
    console.error("Erro na requisição:", error);
    output.textContent = "Falha ao carregar dados. Tente carregar a página.";
  });

function mostrarUsers(users) {
  output.innerHTML = ""; // Limpa o conteúdo anterior

  console.log("Todos os usuários:", users); // CONSOLE.LOG USERS
  const mulheres = users.filter((user) => user.gender === "female");
  console.log("Mulheres:", mulheres);

  mulheres.map((user) => {
    const {
      name: { first, last },
      picture: { large },
      location: { country, state, city },
    } = user;

    output.innerHTML += `
    <article class="card">
        <h4>${city}, ${state}</h4>
        <img src="${large}" alt="${first} ${last}">
        <h2>${first}</h2>
        <h3>${last}</h3>
        <h6>${country}</h6>
    </article>
    `;
  });
}
