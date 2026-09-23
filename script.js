/* ==========================================================
   LÓGICA DO CABEÇALHO E ANIMAÇÕES VIA SCROLL
   ========================================================== */
   window.addEventListener('scroll', function() {
    // Lógica do Cabeçalho
    const cabecalho = document.getElementById('cabecalho-principal');
    if (cabecalho) {
      if (window.scrollY > 60) {
        cabecalho.classList.add('com-scroll');
      } else {
        cabecalho.classList.remove('com-scroll');
      }
    }
  
    // Lógica do Iluminado por Scroll na Segunda Seção (.secao-categorias)
    const secaoCategorias = document.querySelector('.secao-categorias');
    if (secaoCategorias) {
      const posicao = secaoCategorias.getBoundingClientRect();
      // Ativa a luz quando a seção entra visivelmente na tela
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
  
    // Função Auxiliar de Erro
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
  
    // Validação Login
const formLogin = document.getElementById('form-login');
const btnLoginSubmit = document.getElementById('btn-login-submit');

const CREDENCIAIS = {
  cliente: {
    email: 'cliente@marealta.com',
    senha: 'Cliente123'
  },
  admin: {
    email: 'admin@marealta.com',
    senha: 'Admin123'
  }
};

if (formLogin) {
  formLogin.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('login-email');
    const senha = document.getElementById('login-senha');

    const emailDigitado = email.value.trim().toLowerCase();
    const senhaDigitada = senha.value;

    // Administrador
    if (
      emailDigitado === CREDENCIAIS.admin.email &&
      senhaDigitada === CREDENCIAIS.admin.senha
    ) {
      sessionStorage.setItem('tipoUsuario', 'admin');
      fecharModalAuth();
      return;
    }

    // Cliente
    if (
      emailDigitado === CREDENCIAIS.cliente.email &&
      senhaDigitada === CREDENCIAIS.cliente.senha
    ) {
      sessionStorage.setItem('tipoUsuario', 'cliente');
      fecharModalAuth();
      return;
    }

    // Login inválido
    dispararErroBotao(btnLoginSubmit, [email, senha]);
  });
}
    // Validação Cadastro
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
      // Redirecionamento da Coleção
document.addEventListener('click', function(e) {
  const linkColecao = e.target.closest(
    '.links-navegacao a[href="colecao.html"], ' +
    '.coluna-links-rodape a[href="colecao.html"]'
  );

  if (!linkColecao) return;

  e.preventDefault();

  const tipoUsuario = sessionStorage.getItem('tipoUsuario');

  if (tipoUsuario === 'admin') {
    window.location.href = 'colecaoADM.html';
  } else {
    window.location.href = 'colecao.html';
  }
});

  });
