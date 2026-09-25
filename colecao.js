document.addEventListener("DOMContentLoaded", async () => {
    if (typeof lucide !== "undefined" && lucide.createIcons) {
        lucide.createIcons();
    }


    let dadosBanco = JSON.parse(localStorage.getItem("mare_alta_db"));

    if (!dadosBanco) {
        try {
            const response = await fetch("produtos.json");
            const data = await response.json();
            dadosBanco = data.Mare_Alta;
            localStorage.setItem("mare_alta_db", JSON.stringify(dadosBanco));
        } catch (error) {
            console.error("Erro ao carregar o JSON:", error);
            dadosBanco = { Produto: [], Categoria: [] };
        }
    }

    const configuracoes = {
        masculino: {
            titulo: "Masculina",
            descricao: "Bermudas, sungas, camisas e kits para curtir o mar com estilo",
            categorias: ["Todos", "Bermuda", "Sunga", "Camisa", "Kit", "Acessórios"]
        },
        feminino: {
            titulo: "Feminina",
            descricao: "Biquínis, maiôs, saídas e peças leves para viver o verão com estilo",
            categorias: ["Todos", "Biquíni", "Maiô", "Saída de Praia", "Vestido", "Kit", "Acessórios"]
        }
    };

    const grid = document.getElementById("productGrid");
    const filterTags = document.getElementById("filterTags");
    const emptyState = document.getElementById("emptyState");
    const seeMoreBtn = document.getElementById("seeMoreBtn");
    const searchInput = document.getElementById("searchInput");
    const heroGender = document.getElementById("heroGender");
    const heroDescription = document.getElementById("heroDescription");
    const footerCategories = document.getElementById("footerCategories");
    const genderBtns = document.querySelectorAll(".gender-btn");

    let generoAtual = "masculino";
    let filtroAtual = "Todos";
    let mostrandoTodos = false;

    function obterNomeCategoria(codCat) {
        const cat = dadosBanco.Categoria.find(c => c.cod_cat === codCat);
        return cat ? cat.nome_cat : "Geral";
    }

    function criarTags() {
        if (!filterTags) return;
        filterTags.innerHTML = "";

        configuracoes[generoAtual].categorias.forEach(categoria => {
            const button = document.createElement("button");
            button.className = "tag" + (categoria === filtroAtual ? " active" : "");
            button.textContent = categoria;

            button.addEventListener("click", () => {
                filtroAtual = categoria;
                mostrandoTodos = false;
                criarTags();
                renderProdutos();
            });

            filterTags.appendChild(button);
        });
    }

    function criarCores(cores) {
        if (!cores || !Array.isArray(cores)) return "";
        return cores.map((cor, index) => {
            return `<span class="dot ${cor} ${index === 0 ? "active" : ""}" data-color="${cor}"></span>`;
        }).join("");
    }

    function renderProdutos() {
        const busca = searchInput ? searchInput.value.trim().toLowerCase() : "";

        let filtrados = dadosBanco.Produto.filter(produto => {
            const nomeCategoria = obterNomeCategoria(produto.cod_cat);
            const generoOK = produto.genero === generoAtual;
            const categoriaOK = filtroAtual === "Todos" || nomeCategoria === filtroAtual;
            const buscaOK = !busca ||
                produto.nome_prod.toLowerCase().includes(busca) ||
                nomeCategoria.toLowerCase().includes(busca);

            return generoOK && categoriaOK && buscaOK;
        });

        const limite = mostrandoTodos ? filtrados.length : Math.min(6, filtrados.length);
        const visiveis = filtrados.slice(0, limite);

        if (grid) {
            grid.innerHTML = visiveis.map(produto => {
                const nomeCategoria = obterNomeCategoria(produto.cod_cat);
                return `
                <article class="product-card">
                    <div class="image-wrapper">
                        <img src="${produto.img}" alt="${produto.nome_prod}" loading="lazy"
                             onerror="this.src='https://placehold.co/600x800/e2e8f0/1e293b?text=Sem+Imagem'">
                    </div>

                    <div class="card-info">
                        <span class="category-label">${nomeCategoria}</span>
                        <h3 class="product-title">${produto.nome_prod}</h3>

                        <div class="rating">
                            <span class="stars">★★★★★</span>
                            <span class="score">4.9 (120)</span>
                        </div>

                        <div class="card-footer">
                            <div class="price-container">
                                <span class="current-price">${produto.preco_prod}</span>
                                <span class="old-price">${produto.preco_antigo_prod || ""}</span>
                            </div>

                            <div class="color-options">
                                ${criarCores(produto.cores)}
                            </div>
                        </div>
                    </div>
                </article>
                `;
            }).join("");
        }

        if (emptyState) {
            emptyState.classList.toggle("visible", filtrados.length === 0);
        }

        if (seeMoreBtn) {
            if (filtrados.length > 6) {
                seeMoreBtn.style.display = "inline-block";
                seeMoreBtn.textContent = mostrandoTodos ? "Ver menos" : "Ver mais";
            } else {
                seeMoreBtn.style.display = "none";
            }
        }

        ativarCores();
    }

    function ativarCores() {
        document.querySelectorAll(".color-options .dot").forEach(dot => {
            dot.addEventListener("click", event => {
                event.stopPropagation();
                const grupo = dot.parentElement.querySelectorAll(".dot");
                grupo.forEach(item => item.classList.remove("active"));
                dot.classList.add("active");
            });
        });
    }

    function trocarGenero(novoGenero) {
        generoAtual = novoGenero;
        filtroAtual = "Todos";
        mostrandoTodos = false;

        document.body.classList.toggle("feminino", generoAtual === "feminino");
        document.body.classList.toggle("masculino", generoAtual === "masculino");

        genderBtns.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.gender === generoAtual);
        });

        if (heroGender) heroGender.textContent = configuracoes[generoAtual].titulo;
        if (heroDescription) heroDescription.textContent = configuracoes[generoAtual].descricao;

        document.title = `Maré Alta - Ala ${configuracoes[generoAtual].titulo}`;

        criarTags();
        renderProdutos();
        atualizarFooter();
    }

    function atualizarFooter() {
        if (!footerCategories) return;
        footerCategories.innerHTML = configuracoes[generoAtual].categorias
            .slice(1, 5)
            .map(cat => `<li><a href="#">${cat}</a></li>`)
            .join("");
    }

    genderBtns.forEach(btn => {
        btn.addEventListener("click", () => trocarGenero(btn.dataset.gender));
    });

    if (seeMoreBtn) {
        seeMoreBtn.addEventListener("click", () => {
            mostrandoTodos = !mostrandoTodos;
            renderProdutos();
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            mostrandoTodos = false;
            renderProdutos();
        });
    }

    const menuToggleBtn = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggleBtn && navMenu) {
        menuToggleBtn.addEventListener("click", event => {
            event.stopPropagation();
            navMenu.classList.toggle("active");
        });

        document.addEventListener("click", event => {
            if (!navMenu.contains(event.target) && !menuToggleBtn.contains(event.target)) {
                navMenu.classList.remove("active");
            }
        });
    }


    criarTags();
    renderProdutos();
    atualizarFooter();
});
