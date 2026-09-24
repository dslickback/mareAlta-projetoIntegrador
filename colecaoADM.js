document.addEventListener("DOMContentLoaded", async () => {
    function renderIcons() {
        if (typeof lucide !== "undefined" && lucide.createIcons) {
            lucide.createIcons();
        }
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
            categorias: ["Todos", "Bermuda", "Sunga", "Kit", "Acessórios"]
        },
        feminino: {
            titulo: "Feminina",
            descricao: "Biquínis, maiôs, saídas e peças leves para viver o verão com estilo",
            categorias: ["Todos", "Biquíni", "Maiô", "Saída de Praia", "Kit", "Acessórios"]
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

    function salvarEAtualizar() {
        localStorage.setItem("mare_alta_db", JSON.stringify(dadosBanco));
        renderProdutos();
    }

    function criarTags() {
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
        const busca = searchInput.value.trim().toLowerCase();

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

        const addCardHTML = `
            <article class="add-product-card" id="openAddModalBtn">
                <div class="add-icon-circle">
                    <i data-lucide="plus"></i>
                </div>
                <span class="add-product-text">Adicionar Peça</span>
            </article>
        `;

        const produtosHTML = visiveis.map(produto => {
            const nomeCategoria = obterNomeCategoria(produto.cod_cat);
            return `
            <article class="product-card">
                <div class="image-wrapper">
                    <img src="${produto.img}" alt="${produto.nome_prod}" loading="lazy" onerror="this.src='https://placehold.co/600x800/e2e8f0/1e293b?text=Sem+Imagem'">
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

        grid.innerHTML = addCardHTML + produtosHTML;

        if (emptyState) {
            emptyState.classList.toggle("visible", filtrados.length === 0 && filtroAtual !== "Todos");
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
        ativarModalLojista();
        renderIcons();
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

    function ativarModalLojista() {
        const openBtn = document.getElementById("openAddModalBtn");
        const modal = document.getElementById("productModal");
        const closeBtn = document.getElementById("closeModalBtn");
        const cancelBtn = document.getElementById("cancelModalBtn");
        const form = document.getElementById("addProductForm");
        const selectCat = document.getElementById("pCat");

        if (!modal || !form) return;

        if (selectCat) {
            selectCat.innerHTML = configuracoes[generoAtual].categorias
                .filter(cat => cat !== "Todos")
                .map(cat => `<option value="${cat}">${cat}</option>`)
                .join("");
        }

        function abrir() { modal.classList.add("active"); }
        function fechar() { modal.classList.remove("active"); form.reset(); }

        if (openBtn) openBtn.addEventListener("click", abrir);
        if (closeBtn) closeBtn.addEventListener("click", fechar);
        if (cancelBtn) cancelBtn.addEventListener("click", fechar);

        form.onsubmit = (e) => {
            e.preventDefault();

            const nomeCatSelecionada = document.getElementById("pCat").value;
            let catObj = dadosBanco.Categoria.find(c => c.nome_cat === nomeCatSelecionada);
            
            if (!catObj) {
                catObj = { cod_cat: Date.now(), nome_cat: nomeCatSelecionada };
                dadosBanco.Categoria.push(catObj);
            }

            const novasCores = Array.from(form.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
            const inputImg = document.getElementById("pImg").value;

            const novoProduto = {
                cod_prod: Date.now(),
                nome_prod: document.getElementById("pNome").value,
                preco_prod: document.getElementById("pPreco").value,
                preco_antigo_prod: document.getElementById("pAntigo").value,
                descricao_prod: "",
                tamanho_prod: "M",
                cor_prod: novasCores[0] || "Preto",
                genero: generoAtual,
                cod_cat: catObj.cod_cat,
                img: inputImg.startsWith("http") || inputImg.startsWith("img/") ? inputImg : `img/${inputImg}`,
                cores: novasCores.length > 0 ? novasCores : ["black"]
            };

            dadosBanco.Produto.unshift(novoProduto);
            fechar();
            salvarEAtualizar();
        };
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

    criarTags();
    renderProdutos();
    atualizarFooter();
});
