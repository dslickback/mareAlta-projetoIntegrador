document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const produtos = {
        masculino: [
            {cat:"Bermuda", nome:"Shorts Pietro Preto - Curto com Zíper", preco:"R$ 149", antigo:"R$ 199", img:"https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=700&q=85", cores:["black","brown"]},
            {cat:"Bermuda", nome:"Shorts Gabriel Branco - Zíper Lateral", preco:"R$ 139", antigo:"R$ 189", img:"https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=700&q=85", cores:["white","lightgray"]},
            {cat:"Bermuda", nome:"Bermuda Thiago Azul Marinho - Estampa", preco:"R$ 159", antigo:"R$ 219", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&q=85", cores:["navy","white"]},
            {cat:"Bermuda", nome:"Bermuda Enzo Azul - Estampa Folhagem", preco:"R$ 169", antigo:"R$ 229", img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=85", cores:["cyan","navy"]},
            {cat:"Sunga", nome:"Sunga Bernardo Azul Marinho", preco:"R$ 119", antigo:"R$ 159", img:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=700&q=85", cores:["darkblue","black"]},
            {cat:"Bermuda", nome:"Bermuda Vinícius Verde Militar", preco:"R$ 159", antigo:"R$ 219", img:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=700&q=85", cores:["olive","black"]},
            {cat:"Camisa", nome:"Camisa Surf Classic Off White", preco:"R$ 129", antigo:"R$ 179", img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&q=85", cores:["white","beige"]},
            {cat:"Camisa", nome:"Camisa Maré Alta Azul Petróleo", preco:"R$ 139", antigo:"R$ 189", img:"https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=700&q=85", cores:["darkblue","green"]},
            {cat:"Sunga", nome:"Sunga Wave Preta com Detalhes", preco:"R$ 109", antigo:"R$ 149", img:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&q=85", cores:["black","cyan"]},
            {cat:"Kit", nome:"Kit Verão Maré Alta - Bermuda + Camisa", preco:"R$ 249", antigo:"R$ 329", img:"https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=700&q=85", cores:["navy","white"]},
            {cat:"Acessórios", nome:"Boné Wave Bordado", preco:"R$ 89", antigo:"R$ 119", img:"https://images.unsplash.com/photo-1521369909029-2afed882baee?w=700&q=85", cores:["black","white"]},
            {cat:"Acessórios", nome:"Chinelo Maré Alta Classic", preco:"R$ 69", antigo:"R$ 89", img:"https://images.unsplash.com/photo-1603487742131-4160ec999306?w=700&q=85", cores:["black","brown"]}
        ],

        feminino: [
            {cat:"Biquíni", nome:"Biquíni Luna Azul Marinho", preco:"R$ 159", antigo:"R$ 219", img:"https://images.unsplash.com/photo-1506629905607-d9f297d9c4f6?w=700&q=85", cores:["navy","white"]},
            {cat:"Biquíni", nome:"Biquíni Serena Preto com Amarração", preco:"R$ 169", antigo:"R$ 229", img:"https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=700&q=85", cores:["black","beige"]},
            {cat:"Biquíni", nome:"Biquíni Maya Coral Texturizado", preco:"R$ 179", antigo:"R$ 239", img:"https://images.unsplash.com/photo-1543087903-1acb1ec7cebb?w=700&q=85", cores:["pink","red"]},
            {cat:"Maiô", nome:"Maiô Aurora Azul com Recortes", preco:"R$ 199", antigo:"R$ 269", img:"https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=700&q=85", cores:["darkblue","cyan"]},
            {cat:"Maiô", nome:"Maiô Ísis Preto Elegante", preco:"R$ 209", antigo:"R$ 279", img:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&q=85", cores:["black","white"]},
            {cat:"Saída de Praia", nome:"Saída Sofia Bege Leve", preco:"R$ 189", antigo:"R$ 249", img:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700&q=85", cores:["beige","white"]},
            {cat:"Saída de Praia", nome:"Camisa Praia Helena Branca", preco:"R$ 179", antigo:"R$ 239", img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&q=85", cores:["white","beige"]},
            {cat:"Vestido", nome:"Vestido Brisa Azul Estampado", preco:"R$ 219", antigo:"R$ 289", img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=85", cores:["cyan","white"]},
            {cat:"Biquíni", nome:"Biquíni Flora Amarelo Solar", preco:"R$ 159", antigo:"R$ 219", img:"https://images.unsplash.com/photo-1551048632-24e4b26c2c1f?w=700&q=85", cores:["yellow","white"]},
            {cat:"Kit", nome:"Kit Verão Feminino - Biquíni + Saída", preco:"R$ 269", antigo:"R$ 359", img:"https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=85", cores:["beige","pink"]},
            {cat:"Acessórios", nome:"Bolsa Praia Serena em Palha", preco:"R$ 129", antigo:"R$ 169", img:"https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=700&q=85", cores:["beige","brown"]},
            {cat:"Acessórios", nome:"Chapéu Solar Maré Alta", preco:"R$ 99", antigo:"R$ 139", img:"https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=700&q=85", cores:["beige","white"]}
        ]
    };

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
        return cores.map((cor, index) => {
            return `<span class="dot ${cor} ${index === 0 ? "active" : ""}" data-color="${cor}"></span>`;
        }).join("");
    }

    function renderProdutos() {
        const busca = searchInput.value.trim().toLowerCase();

        let filtrados = produtos[generoAtual].filter(produto => {
            const categoriaOK = filtroAtual === "Todos" || produto.cat === filtroAtual;
            const buscaOK = !busca ||
                produto.nome.toLowerCase().includes(busca) ||
                produto.cat.toLowerCase().includes(busca);

            return categoriaOK && buscaOK;
        });

        const limite = mostrandoTodos ? filtrados.length : Math.min(6, filtrados.length);
        const visiveis = filtrados.slice(0, limite);

        grid.innerHTML = visiveis.map(produto => `
            <article class="product-card">
                <div class="image-wrapper">
                    <img src="${produto.img}" alt="${produto.nome}" loading="lazy"
                         onerror="this.src='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&q=80'">
                </div>

                <div class="card-info">
                    <span class="category-label">${produto.cat}</span>
                    <h3 class="product-title">${produto.nome}</h3>

                    <div class="rating">
                        <span class="stars">★★★★★</span>
                        <span class="score">4.9 (120)</span>
                    </div>

                    <div class="card-footer">
                        <div class="price-container">
                            <span class="current-price">${produto.preco}</span>
                            <span class="old-price">${produto.antigo}</span>
                        </div>

                        <div class="color-options">
                            ${criarCores(produto.cores)}
                        </div>
                    </div>
                </div>
            </article>
        `).join("");

        emptyState.classList.toggle("visible", filtrados.length === 0);

        if (filtrados.length > 6) {
            seeMoreBtn.style.display = "inline-block";
            seeMoreBtn.textContent = mostrandoTodos ? "Ver menos" : "Ver mais";
        } else {
            seeMoreBtn.style.display = "none";
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

        heroGender.textContent = configuracoes[generoAtual].titulo;
        heroDescription.textContent = configuracoes[generoAtual].descricao;

        document.title = `Maré Alta - Ala ${configuracoes[generoAtual].titulo} 2026`;

        criarTags();
        renderProdutos();
        atualizarFooter();
    }

    function atualizarFooter() {
        footerCategories.innerHTML = configuracoes[generoAtual].categorias
            .slice(1, 5)
            .map(cat => `<li><a href="#">${cat}</a></li>`)
            .join("");
    }

    genderBtns.forEach(btn => {
        btn.addEventListener("click", () => trocarGenero(btn.dataset.gender));
    });

    seeMoreBtn.addEventListener("click", () => {
        mostrandoTodos = !mostrandoTodos;
        renderProdutos();
    });

    searchInput.addEventListener("input", () => {
        mostrandoTodos = false;
        renderProdutos();
    });

    // Menu hambúrguer
    const menuToggleBtn = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    menuToggleBtn.addEventListener("click", event => {
        event.stopPropagation();
        navMenu.classList.toggle("active");
    });

    document.addEventListener("click", event => {
        if (!navMenu.contains(event.target) && !menuToggleBtn.contains(event.target)) {
            navMenu.classList.remove("active");
        }
    });

    // Inicialização
    criarTags();
    renderProdutos();
    atualizarFooter();
});
