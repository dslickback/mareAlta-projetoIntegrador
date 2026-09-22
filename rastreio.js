/* ==========================================================
   LÓGICA DE NAVEGAÇÃO E SCROLL DO CABEÇALHO
   ========================================================== */
window.addEventListener('scroll', function() {
  const cabecalho = document.getElementById('cabecalho-principal');
  if (cabecalho) {
    if (window.scrollY > 40) {
      cabecalho.classList.add('com-scroll');
    } else {
      cabecalho.classList.remove('com-scroll');
    }
  }

  // Suporte caso a segunda seção da Home esteja presente
  const secaoCategorias = document.querySelector('.secao-categorias');
  if (secaoCategorias) {
    const posicao = secaoCategorias.getBoundingClientRect();
    if (posicao.top < window.innerHeight * 0.75 && posicao.bottom > window.innerHeight * 0.2) {
      secaoCategorias.classList.add('iluminado-scroll');
    } else {
      secaoCategorias.classList.remove('iluminado-scroll');
    }
  }
});

/* ==========================================================
   LÓGICA DO MODAL DE LOGIN / CADASTRO / RECUPERAR SENHA
   ========================================================== */
document.addEventListener('DOMContentLoaded', function() {
  const modalAuth = document.getElementById('modal-auth');
  const btnFecharModal = document.getElementById('fechar-modal');
  const abasNav = document.getElementById('container-abas');
  const botoesAba = document.querySelectorAll('.aba-btn');
  const conteudosAba = document.querySelectorAll('.conteudo-aba');

  const linkIrRecuperar = document.getElementById('link-ir-recuperar');
  const linkVoltarLogin = document.getElementById('link-voltar-login');

  // Abrir Modal
  window.abrirModalAuth = function(abaInicial = 'login') {
    if (!modalAuth) return;
    modalAuth.classList.add('ativo');
    document.body.style.overflow = 'hidden';
    trocarAba(abaInicial);
  };

  // Fechar Modal
  window.fecharModalAuth = function() {
    if (!modalAuth) return;
    modalAuth.classList.remove('ativo');
    document.body.style.overflow = '';
  };

  // Troca de Abas
  function trocarAba(nomeAba) {
    if (nomeAba === 'recuperar') {
      if (abasNav) abasNav.style.display = 'none';
    } else {
      if (abasNav) abasNav.style.display = 'flex';
    }

    botoesAba.forEach(btn => {
      btn.classList.toggle('ativo', btn.dataset.tab === nomeAba);
    });

    conteudosAba.forEach(conteudo => {
      conteudo.classList.toggle('ativo', conteudo.id === `tab-${nomeAba}`);
    });
  }

  botoesAba.forEach(btn => {
    btn.addEventListener('click', () => trocarAba(btn.dataset.tab));
  });

  if (linkIrRecuperar) {
    linkIrRecuperar.addEventListener('click', (e) => {
      e.preventDefault();
      trocarAba('recuperar');
    });
  }

  if (linkVoltarLogin) {
    linkVoltarLogin.addEventListener('click', (e) => {
      e.preventDefault();
      trocarAba('login');
    });
  }

  // Abrir ao clicar em qualquer botão de entrar
  document.addEventListener('click', function(e) {
    const target = e.target.closest('.botao-entrar, [href="#login"]');
    if (target) {
      e.preventDefault();
      abrirModalAuth('login');
    }
  });

  if (btnFecharModal) btnFecharModal.addEventListener('click', fecharModalAuth);

  if (modalAuth) {
    modalAuth.addEventListener('click', function(e) {
      if (e.target === modalAuth) fecharModalAuth();
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalAuth && modalAuth.classList.contains('ativo')) {
      fecharModalAuth();
    }
  });

  // Mostrar / Ocultar Senha
  const botoesToggleSenha = document.querySelectorAll('.btn-toggle-senha');
  botoesToggleSenha.forEach(botao => {
    botao.addEventListener('click', function() {
      const inputSenha = this.parentElement.querySelector('input');
      const modoSenha = inputSenha.type === 'password';

      inputSenha.type = modoSenha ? 'text' : 'password';
      this.classList.toggle('senha-visivel', modoSenha);
    });
  });

  // Função Auxiliar de Erro no Botão
  function dispararErroBotao(botao, camposComErro = []) {
    botao.classList.remove('tremer');
    void botao.offsetWidth;
    botao.classList.add('tremer');

    camposComErro.forEach(campo => {
      if (campo) {
        campo.classList.add('input-erro');
        campo.addEventListener('input', () => campo.classList.remove('input-erro'), { once: true });
      }
    });

    setTimeout(() => {
      botao.classList.remove('tremer');
    }, 450);
  }

  // Validação do Form de Login
  const formLogin = document.getElementById('form-login');
  const btnLoginSubmit = document.getElementById('btn-login-submit');

  if (formLogin) {
    formLogin.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('login-email');
      const senha = document.getElementById('login-senha');

      if (!email.value || !senha.value || senha.value.length < 4) {
        dispararErroBotao(btnLoginSubmit, [email, senha]);
        return;
      }

      fecharModalAuth();
    });
  }

  // Validação do Form de Cadastro
  const formCadastro = document.getElementById('form-cadastro');
  const btnCadastroSubmit = document.getElementById('btn-cadastro-submit');

  if (formCadastro) {
    formCadastro.addEventListener('submit', function(e) {
      e.preventDefault();
      const nome = document.getElementById('cad-nome');
      const email = document.getElementById('cad-email');
      const senha = document.getElementById('cad-senha');
      const confirmar = document.getElementById('cad-confirmar');

      let erros = [];
      if (!nome.value) erros.push(nome);
      if (!email.value) erros.push(email);
      if (!senha.value) erros.push(senha);

      if (senha.value !== confirmar.value || !confirmar.value) {
        erros.push(senha, confirmar);
      }

      if (erros.length > 0) {
        dispararErroBotao(btnCadastroSubmit, erros);
        return;
      }

      fecharModalAuth();
    });
  }
});

// BANCO DE DADOS LOCAL (JSON)
const dadosPedidos = {
  "MA-2026-7102": {
    codigo: "MA-2026-7102",
    status: "A caminho",
    produto: "Bermuda Floral Surf",
    transportadora: "Correios (SEDEX)",
    previsao: "12 de julho de 2026",
    passoAtual: 5, // 1: Pedido, 2: Separação, 3: Enviado, 4: Trânsito, 5: Saiu, 6: Entregue
    historico: [
      { status: "Em trânsito", data: "08 jul - 11:00", local: "Centro de Distribuição — São Paulo, SP" },
      { status: "Coletado pela transportadora", data: "07 jul - 08:30", local: "Armazém MaréAlta — Florianópolis" },
      { status: "Coletado pela transportadora", data: "06 jul - 20:15", local: "MaréAlta" }
    ]
  },
  "MA-2026-8841": {
    codigo: "MA-2026-8841",
    status: "Em trânsito",
    produto: "Biquíni Maré Solar + Saída de Praia",
    transportadora: "Jadlog Express",
    previsao: "18 de julho de 2026",
    passoAtual: 4,
    historico: [
      { status: "Em trânsito", data: "10 jul - 14:20", local: "Unidade de Tratamento — Curitiba, PR" },
      { status: "Pedido Enviado", data: "09 jul - 09:15", local: "Armazém MaréAlta — Florianópolis" }
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const formRastreio = document.getElementById("form-rastreio");
  const inputCodigo = document.getElementById("input-codigo-rastreio");
  const visaoInicial = document.getElementById("visao-inicial");
  const visaoResultado = document.getElementById("visao-resultado");
  const btnVoltar = document.getElementById("btn-voltar-codigos");

  // ROLAGEM DO CABEÇALHO
  window.addEventListener("scroll", () => {
    const header = document.getElementById("cabecalho-principal");
    if (window.scrollY > 40) {
      header.classList.add("com-scroll");
    } else {
      header.classList.remove("com-scroll");
    }
  });

  // SUBMIT DA BUSCA DE RASTREIO
  formRastreio.addEventListener("submit", (e) => {
    e.preventDefault();
    const codigoDig = inputCodigo.value.trim().toUpperCase();

    // Quando você tiver o JSON externo, basta fazer a busca/fetch aqui:
    const pedidoEncontrado = dadosPedidos[codigoDig];

    if (pedidoEncontrado) {
      exibirResultado(pedidoEncontrado);
    } else {
      alert("Código de rastreamento não encontrado. Tente os códigos de teste: MA-2026-7102 ou MA-2026-8841.");
    }
  });

  // VOLTAR PARA VISÃO INICIAL
  btnVoltar.addEventListener("click", () => {
    visaoResultado.classList.add("oculto");
    setTimeout(() => {
      visaoInicial.classList.remove("oculto");
      inputCodigo.value = "";
      inputCodigo.focus();
    }, 200);
  });

  // FUNÇÃO DE PREENCHIMENTO E TRANSIÇÃO
  function exibirResultado(dados) {
    document.getElementById("res-codigo-pedido").innerText = dados.codigo;
    document.getElementById("res-status-tag").innerText = dados.status;
    document.getElementById("res-produtos").innerText = dados.produto;
    document.getElementById("res-transportadora").innerText = dados.transportadora;
    document.getElementById("res-previsao").innerText = dados.previsao;

    // Atualiza Barra e Passos
    const totalEtapas = 6;
    const porcentagem = ((dados.passoAtual - 1) / (totalEtapas - 1)) * 100;
    document.getElementById("res-barra-progresso").style.width = `${porcentagem}%`;

    const itensEtapa = document.querySelectorAll(".etapa-item");
    itensEtapa.forEach((item) => {
      const step = parseInt(item.getAttribute("data-step"));
      item.classList.remove("ativo", "concluido");
      if (step < dados.passoAtual) {
        item.classList.add("concluido");
      } else if (step === dados.passoAtual) {
        item.classList.add("ativo");
      }
    });

    // Atualiza Histórico
    const containerHistorico = document.getElementById("res-historico-lista");
    containerHistorico.innerHTML = "";

    dados.historico.forEach((hist) => {
      const itemEl = document.createElement("div");
      itemEl.className = "item-historico";
      itemEl.innerHTML = `
        <div class="ponto-timeline"></div>
        <div class="status-historico">${hist.status}</div>
        <div class="detalhes-historico">${hist.data} — ${hist.local}</div>
      `;
      containerHistorico.appendChild(itemEl);
    });

    // Transição visual de telas
    visaoInicial.classList.add("oculto");
    setTimeout(() => {
      visaoResultado.classList.remove("oculto");
    }, 200);
  }
});