document.addEventListener("DOMContentLoaded", () => {
  // --- TRANSIÇÃO DO CABEÇALHO AO ROLAR ---
  const cabecalho = document.getElementById("cabecalho-principal");
  const logoHeader = document.getElementById("header-logo");

  function checarScrollHeader() {
    if (cabecalho) {
      if (window.scrollY > 60) {
        cabecalho.classList.add("com-scroll");
        if (logoHeader) logoHeader.src = "meunome.png";
      } else {
        cabecalho.classList.remove("com-scroll");
        if (logoHeader) logoHeader.src = "seunome.png";
      }
    }
  }

  window.addEventListener("scroll", checarScrollHeader);
  checarScrollHeader();

  // --- LÓGICA DO CARRINHO DE COMPRAS ---
  const itemCheckboxes = document.querySelectorAll(".item-checkbox");
  const selectAllCheckbox = document.getElementById("select-all");
  const totalPriceElement = document.getElementById("total-price");
  const selectedThumbsContainer = document.getElementById("selected-thumbs");

  const placeholderImage =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%23e8e8e8"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23888888" font-size="11" font-family="sans-serif">Sem Imagem</text></svg>';

  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      this.onerror = null;
      this.src = placeholderImage;
    });
  });

  function updateCartSummary() {
    let total = 0;
    if (selectedThumbsContainer) selectedThumbsContainer.innerHTML = "";

    itemCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const card = checkbox.closest(".cart-item-card");
        const price = parseFloat(card.getAttribute("data-price"));

        const activeQtyOption = card.querySelector(".item-qty-dropdown .dropdown-option.active");
        const quantity = activeQtyOption ? parseInt(activeQtyOption.getAttribute("data-value"), 10) : 1;

        const imgElement = card.querySelector(".item-image img");

        total += price * quantity;

        if (selectedThumbsContainer && imgElement) {
          const wrapper = document.createElement("div");
          wrapper.className = "thumb-wrapper";

          const thumb = document.createElement("img");
          thumb.src = imgElement.src;
          thumb.alt = imgElement.alt;
          thumb.addEventListener("error", function () {
            this.onerror = null;
            this.src = placeholderImage;
          });

          wrapper.appendChild(thumb);

          // 1. Badge de Tamanho (Sempre fixa no canto esquerdo)
          const activeSizeOption = card.querySelector(".item-size-dropdown .dropdown-option.active");
          const size = activeSizeOption ? activeSizeOption.getAttribute("data-value") : "G";

          const sizeBadge = document.createElement("span");
          sizeBadge.className = "thumb-badge thumb-badge-size";
          sizeBadge.textContent = size;
          wrapper.appendChild(sizeBadge);

          // 2. Badge de Quantidade (Apenas no canto direito se > 1)
          if (quantity > 1) {
            const qtyBadge = document.createElement("span");
            qtyBadge.className = "thumb-badge thumb-badge-qty";
            qtyBadge.textContent = quantity;
            wrapper.appendChild(qtyBadge);
          }

          selectedThumbsContainer.appendChild(wrapper);
        }
      }
    });

    if (totalPriceElement) {
      totalPriceElement.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
    }

    if (selectAllCheckbox) {
      const allChecked = Array.from(itemCheckboxes).every((cb) => cb.checked);
      selectAllCheckbox.checked = allChecked;
    }
  }

  // Evento no "Selecionar Todos"
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", (e) => {
      itemCheckboxes.forEach((cb) => {
        cb.checked = e.target.checked;
      });
      updateCartSummary();
    });
  }

  // Evento em cada checkbox de item
  itemCheckboxes.forEach((cb) => {
    cb.addEventListener("change", updateCartSummary);
  });

  // --- LÓGICA DOS DROPDOWNS CUSTOMIZADOS ---
  document.querySelectorAll(".custom-dropdown").forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const options = dropdown.querySelectorAll(".dropdown-option");

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".custom-dropdown").forEach((d) => {
        if (d !== dropdown) d.classList.remove("open");
      });
      dropdown.classList.toggle("open");
    });

    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        options.forEach((opt) => opt.classList.remove("active"));
        option.classList.add("active");

        toggle.querySelector("span").textContent = option.textContent;
        dropdown.classList.remove("open");

        // Atualiza o resumo se for o dropdown de quantidade
        if (dropdown.classList.contains("item-qty-dropdown") || dropdown.classList.contains("item-size-dropdown")) {
          updateCartSummary();
        }
      });
    });
  });

  // Fechar dropdowns ao clicar em qualquer lugar fora
  document.addEventListener("click", () => {
    document.querySelectorAll(".custom-dropdown").forEach((d) => {
      d.classList.remove("open");
    });
  });

  // Execução inicial
  updateCartSummary();
});
