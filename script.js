/* =========================
   DARK MODE
========================= */
const darkBtn = document.getElementById("darkModeBtn");
darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        darkBtn.textContent = "☀️";
    } else {
        darkBtn.textContent = "🌙";
    }
});


/* =========================
   FORUM COM LOCALSTORAGE
========================= */
const postsContainer = document.getElementById("posts");

function carregarPosts() {
    const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    postsContainer.innerHTML = "";
    posts.forEach((post, idx) => {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `
            <h4>${post.nome}</h4>
            <p>${post.texto}</p>
            <button onclick="curtir(${idx})">👍 ${post.likes}</button>
        `;
        postsContainer.prepend(div);
    });
}

function criarPost() {
    const nome = document.getElementById("usuario").value.trim();
    const texto = document.getElementById("texto").value.trim();

    if (!nome || !texto) {
        alert("Preencha todos os campos!");
        return;
    }

    const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    posts.push({ nome, texto, likes: 0 });
    localStorage.setItem("forumPosts", JSON.stringify(posts));

    document.getElementById("usuario").value = "";
    document.getElementById("texto").value = "";

    carregarPosts();
}

function curtir(idx) {
    const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    posts[idx].likes++;
    localStorage.setItem("forumPosts", JSON.stringify(posts));
    carregarPosts();
}

// Carrega posts ao iniciar
carregarPosts();

/* =========================
   MODAL DAS PLANTAS
========================= */
const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modalTitulo");
const modalTexto = document.getElementById("modalTexto");

const plantasInfo = {
    "Araucária": "Árvore símbolo do sul do Brasil. Ideal para reflorestamento e conservação ambiental.",
    "Erva-Mate": "Planta tradicional do Sul do Brasil, utilizada para chimarrão e rica em antioxidantes.",
    "Ipê-Amarelo": "Espécie importante para reflorestamento, atraindo polinizadores como abelhas e pássaros.",
    "Jabuticabeira": "Frutífera nativa brasileira, produz frutos ricos em vitamina C e antioxidantes."
};

function mostrarPlanta(nome) {
    modalTitulo.innerText = nome;
    modalTexto.innerText = plantasInfo[nome];
    modal.style.display = "flex";
}

function fecharModal() {
    modal.style.display = "none";
}

window.addEventListener("click", (e) => {
    if (e.target === modal) fecharModal();
});


/* =========================
   PESQUISA DE ARTIGOS
========================= */
const searchInput = document.getElementById("search");
const articleCards = document.querySelectorAll(".article-card");

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    articleCards.forEach(card => {
        const title = card.querySelector("h3").innerText.toLowerCase();
        if (title.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});


/* =========================
   ANIMAÇÃO DE ESTATÍSTICAS
========================= */
const stats = document.querySelectorAll(".stats h2");
stats.forEach(stat => {
    let value = parseInt(stat.innerText);
    stat.innerText = "0";
    let current = 0;
    const increment = Math.ceil(value / 100);
    const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
            stat.innerText = value;
            clearInterval(interval);
        } else {
            stat.innerText = current;
        }
    }, 20);
});


/* =========================
   ALERTA DE BOAS-VINDAS
========================= */
const heroBtn = document.getElementById("btnMensagem");
if (heroBtn) {
    heroBtn.addEventListener("click", () => {
        alert("Bem-vindo ao Banco de Conhecimento Agroecológico! Explore artigos, plantas e cursos.");
    });
}