window.addEventListener('scroll', function() {
  const cabecalho = document.getElementById('cabecalho-principal');
  if (cabecalho) {
    if (window.scrollY > 60) {
      cabecalho.classList.add('com-scroll');
    } else {
      cabecalho.classList.remove('com-scroll');
    }
  }

  const secaoCategorias = document.querySelector('.secao-categorias');
  if (secaoCategorias) {
    const posicao = secaoCategorias.getBoundingClientRect();
    if (posicao.top < window.innerHeight * 0.75 && posicao.bottom > window.innerHeight * 0.2) {
      secaoCategorias.classList.add('iluminado-scroll');
    }
  }
});

// Função direta para alternar a visibilidade da palavra-passe
function toggleMostrarSenha(btn) {
  const containerInput = btn.closest('.input-com-icone');
  if (!containerInput) return;

  const inputSenha = containerInput.querySelector('input');
  if (!inputSenha) return;

  const eSenha = inputSenha.type === 'password';
  inputSenha.type = eSenha ? 'text' : 'password';

  btn.classList.toggle('senha-visivel', eSenha);
}

document.addEventListener('DOMContentLoaded', function() {
  const modalAuth = document.getElementById('modal-auth');
  const btnFecharModal = document.getElementById('fechar-modal');
  const abasNav = document.getElementById('container-abas');
  const botoesAba = document.querySelectorAll('.aba-btn');
  const conteudosAba = document.querySelectorAll('.conteudo-aba');

  const linkIrRecuperar = document.getElementById('link-ir-recuperar');
  const linkVoltarLogin = document.getElementById('link-voltar-login');

  // Elementos do Perfil e Toast
  const btnEntrarNav = document.getElementById('btn-entrar-nav');
  const btnPerfilNav = document.getElementById('btn-perfil-nav');
  const avatarImgNav = document.getElementById('avatar-img-nav');
  const toastSucesso = document.getElementById('toast-sucesso');
  const toastMensagem = document.getElementById('toast-mensagem');

  // --- 1. FUNÇÃO DE TOAST (MENSAGEM FLUTUANTE) ---
  window.mostrarToast = function(mensagem) {
    if (!toastSucesso) return;
    if (toastMensagem) toastMensagem.innerText = mensagem;
    
    toastSucesso.classList.add('ativo');
    setTimeout(() => {
      toastSucesso.classList.remove('ativo');
    }, 3500);
  };

  // --- 2. ATUALIZAR ESTADO DE AUTENTICAÇÃO DA NAVBAR ---
  function atualizarInterfaceUsuario() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (usuarioLogado) {
      if (btnEntrarNav) btnEntrarNav.style.display = 'none';
      if (btnPerfilNav) {
        btnPerfilNav.style.display = 'flex';
        avatarImgNav.src = usuarioLogado.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(usuarioLogado.nome)}&background=178195&color=fff`;
      }
    } else {
      if (btnEntrarNav) btnEntrarNav.style.display = 'inline-block';
      if (btnPerfilNav) btnPerfilNav.style.display = 'none';
    }
  }

  // Executa na inicialização da página
  atualizarInterfaceUsuario();

  // --- 3. LOGICA DO MODAL ---
  window.abrirModalAuth = function(abaInicial = 'login') {
    if (!modalAuth) return;
    modalAuth.classList.add('ativo');
    document.body.style.overflow = 'hidden';
    trocarAba(abaInicial);
  };

  window.fecharModalAuth = function() {
    if (!modalAuth) return;
    modalAuth.classList.remove('ativo');
    document.body.style.overflow = '';
  };

  function trocarAba(nomeAba) {
    if (nomeAba === 'recuperar') {
      if (abasNav) abasNav.style.display = 'none';
    } else {
      if (abasNav) abasNav.style.display = 'flex';
    }

    botoesAba.forEach(btn => btn.classList.toggle('ativo', btn.dataset.tab === nomeAba));
    conteudosAba.forEach(conteudo => conteudo.classList.toggle('ativo', conteudo.id === `tab-${nomeAba}`));
  }

  botoesAba.forEach(btn => btn.addEventListener('click', () => trocarAba(btn.dataset.tab)));

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

  document.addEventListener('click', function(e) {
    const target = e.target.closest('#btn-entrar-nav, [href="#login"]');
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

  // Alternar visualização da senha (Olho) com Delegação de Eventos
document.addEventListener('click', function(e) {
  const botaoToggle = e.target.closest('.btn-toggle-senha');
  if (!botaoToggle) return;

  e.preventDefault();

  // Encontra a caixa .input-com-icone onde o botão está inserido
  const containerInput = botaoToggle.closest('.input-com-icone');
  if (!containerInput) return;

  const inputSenha = containerInput.querySelector('input');
  if (!inputSenha) return;

  // Alterna o tipo do campo entre 'password' e 'text'
  const eSenha = inputSenha.type === 'password';
  inputSenha.type = eSenha ? 'text' : 'password';

  // Adiciona/remove a classe que alterna o ícone do olho no CSS
  botaoToggle.classList.toggle('senha-visivel', eSenha);
});

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

  // --- 4. FORMULÁRIO DE LOGIN ---
  const formLogin = document.getElementById('form-login');
  const btnLoginSubmit = document.getElementById('btn-login-submit');

  const CREDENCIAIS = {
    cliente: { email: 'cliente@marealta.com', senha: 'Cliente123', nome: 'Marina Silva' },
    admin: { email: 'admin@marealta.com', senha: 'Admin123', nome: 'Administrador Maré Alta' }
  };

  if (formLogin) {
    formLogin.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = document.getElementById('login-email');
      const senha = document.getElementById('login-senha');
      const emailDigitado = email.value.trim().toLowerCase();
      const senhaDigitada = senha.value;

      let usuarioAutenticado = null;

      if (emailDigitado === CREDENCIAIS.admin.email && senhaDigitada === CREDENCIAIS.admin.senha) {
        usuarioAutenticado = {
          nome: CREDENCIAIS.admin.nome,
          email: CREDENCIAIS.admin.email,
          tipo: 'admin',
          foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
        };
        sessionStorage.setItem('tipoUsuario', 'admin');
      } else if (emailDigitado === CREDENCIAIS.cliente.email && senhaDigitada === CREDENCIAIS.cliente.senha) {
        usuarioAutenticado = {
          nome: CREDENCIAIS.cliente.nome,
          email: CREDENCIAIS.cliente.email,
          tipo: 'cliente',
          foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
        };
        sessionStorage.setItem('tipoUsuario', 'cliente');
      }

      if (usuarioAutenticado) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAutenticado));
        fecharModalAuth();
        atualizarInterfaceUsuario();
        mostrarToast(`Bem-vinda(o) de volta, ${usuarioAutenticado.nome.split(' ')[0]}!`);
      } else {
        dispararErroBotao(btnLoginSubmit, [email, senha]);
      }
    });
  }

  // --- 5. FORMULÁRIO DE CADASTRO ---
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

      const novoUsuario = {
        nome: nome.value,
        email: email.value,
        tipo: 'cliente',
        foto: `https://ui-avatars.com/api/?name=${encodeURIComponent(nome.value)}&background=178195&color=fff`
      };

      localStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario));
      sessionStorage.setItem('tipoUsuario', 'cliente');

      fecharModalAuth();
      atualizarInterfaceUsuario();
      mostrarToast('Conta criada com sucesso!');
    });
  }

  // Redirecionamento Coleção
  document.addEventListener('click', function(e) {
    const linkColecao = e.target.closest('.links-navegacao a[href="colecao.html"], .coluna-links-rodape a[href="colecao.html"]');
    if (!linkColecao) return;

    e.preventDefault();
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    window.location.href = (tipoUsuario === 'admin') ? 'colecaoADM.html' : 'colecao.html';
  });
});
