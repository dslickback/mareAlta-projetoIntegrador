document.addEventListener("DOMContentLoaded", () => {
    // Inicializa ícones Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Toggle do Menu de Navegação (Menu Hambúrguer)
    const menuToggleBtn = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggleBtn && navMenu) {
        menuToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggleBtn.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Alternador de Gênero (Feminino / Masculino)
    const genderBtns = document.querySelectorAll('.gender-btn');
    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Filtros de Categoria
    const filterTags = document.querySelectorAll('.filter-tags .tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
        });
    });

    // Seleção de Cores nos Cards
    const colorSwatches = document.querySelectorAll('.color-options .dot');
    colorSwatches.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = e.target.parentElement;
            const dotsInGroup = parent.querySelectorAll('.dot');
            dotsInGroup.forEach(d => d.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
});
