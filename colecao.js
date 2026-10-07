document.addEventListener("DOMContentLoaded", () => {
  // --- TRANSIÇÃO DO CABEÇALHO ---
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
        const imgElement = card.querySelector(".item-image img");

        total += price;

        if (selectedThumbsContainer) {
          const thumb = document.createElement("img");
          thumb.src = imgElement.src;
          thumb.alt = imgElement.alt;
          thumb.addEventListener("error", function () {
            this.onerror = null;
            this.src = placeholderImage;
          });
          selectedThumbsContainer.appendChild(thumb);
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

  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", (e) => {
      itemCheckboxes.forEach((cb) => {
        cb.checked = e.target.checked;
      });
      updateCartSummary();
    });
  }

  itemCheckboxes.forEach((cb) => {
    cb.addEventListener("change", updateCartSummary);
  });

  updateCartSummary();
});
