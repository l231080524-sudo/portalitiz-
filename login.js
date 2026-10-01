const SUPABASE_URL = 'https://hhwsqgohkqwbnthjbxdk.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_u_a3jaAL6pTh8v21tVIcaw_g9aGKW_m';

const { createClient } = window.supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const $ = (id) => document.getElementById(id);

const loginTab = $('loginTab');
const registerTab = $('registerTab');
const loginPanel = $('loginPanel');
const registerPanel = $('registerPanel');
const authTitle = $('authTitle');
const authSubtitle = $('authSubtitle');
const loginForm = $('loginForm');
const registerForm = $('registerForm');
const loginMessage = $('loginMessage');
const registerMessage = $('registerMessage');
const logoutButton = $('logoutButton');
const recoverButton = $('recoverButton');
const registerCareer = $('registerCareer');

function setMessage(element, message = '', type = '') {
  element.textContent = message;
  element.className = 'auth-message';
  if (type) element.classList.add(type);
}

function clearErrors(form) {
  form.querySelectorAll('.field-error').forEach((node) => {
    node.textContent = '';
  });
  form.querySelectorAll('.field-group').forEach((group) => {
    group.classList.remove('invalid');
  });
}

function fieldError(inputId, errorId, message) {
  const input = $(inputId);
  const error = $(errorId);
  const group = input?.closest('.field-group');
  if (error) error.textContent = message;
  if (group) group.classList.add('invalid');
}

function setBusy(button, busy, busyText) {
  if (!button) return;
  if (busy) {
    button.dataset.originalText = button.textContent;
    button.textContent = busyText;
    button.disabled = true;
  } else {
    button.textContent = button.dataset.originalText || button.textContent;
    button.disabled = false;
  }
}

function switchTab(mode) {
  const isLogin = mode === 'login';

  loginTab.classList.toggle('active', isLogin);
  registerTab.classList.toggle('active', !isLogin);
  loginTab.setAttribute('aria-selected', String(isLogin));
  registerTab.setAttribute('aria-selected', String(!isLogin));

  loginPanel.hidden = !isLogin;
  registerPanel.hidden = isLogin;
  loginPanel.classList.toggle('active', isLogin);
  registerPanel.classList.toggle('active', !isLogin);

  authTitle.innerHTML = isLogin
    ? 'Bienvenido a ITIZ<span>+</span>'
    : 'Crea tu cuenta en ITIZ<span>+</span>';

  authSubtitle.textContent = isLogin
    ? 'Inicia sesión con tu número de control o correo institucional.'
    : 'Registra tus datos para crear tu cuenta de acceso.';

  setMessage(loginMessage);
  setMessage(registerMessage);
}

function currentAuthPageUrl() {
  return window.location.href.split('#')[0];
}

function normalizeText(value) {
  return value.trim().replace(/\s+/g, ' ');
}

function translateSupabaseError(error) {
  const message = String(error?.message || '').toLowerCase();

  if (message.includes('invalid login credentials')) {
    return 'Número de control/correo o contraseña incorrectos.';
  }
  if (message.includes('email not confirmed')) {
    return 'Tu correo aún no está confirmado. Revisa tu bandeja de entrada.';
  }
  if (message.includes('user already registered')) {
    return 'Ya existe una cuenta con ese correo.';
  }
  if (message.includes('password should be at least')) {
    return 'La contraseña no cumple la longitud mínima configurada en Supabase.';
  }
  if (message.includes('rate limit')) {
    return 'Se alcanzó temporalmente el límite de intentos. Espera un momento y vuelve a intentar.';
  }
  if (message.includes('failed to fetch')) {
    return 'No se pudo conectar con Supabase. Verifica tu conexión a internet.';
  }

  return error?.message || 'Ocurrió un error inesperado.';
}

async function loadCareers() {
  registerCareer.innerHTML = '<option value="">Cargando carreras…</option>';

  const { data, error } = await supabaseClient
    .from('carreras')
    .select('id, clave, nombre')
    .order('nombre', { ascending: true });

  if (error) {
    registerCareer.innerHTML = '<option value="">No se pudieron cargar</option>';
    setMessage(registerMessage, `No se pudieron cargar las carreras: ${translateSupabaseError(error)}`, 'error');
    return;
  }

  if (!data?.length) {
    registerCareer.innerHTML = '<option value="">No hay carreras disponibles</option>';
    return;
  }

  registerCareer.innerHTML = '<option value="">Selecciona una carrera</option>';
  data.forEach((career) => {
    const option = document.createElement('option');
    option.value = String(career.id);
    option.textContent = career.clave ? `${career.clave} — ${career.nombre}` : career.nombre;
    registerCareer.appendChild(option);
  });
}

async function emailFromMatricula(matricula) {
  const { data, error } = await supabaseClient.rpc('get_auth_email_by_matricula', {
    p_matricula: matricula
  });

  if (error) throw error;
  return typeof data === 'string' ? data : null;
}

async function handleLogin(event) {
  event.preventDefault();
  clearErrors(loginForm);
  setMessage(loginMessage);

  const identifier = normalizeText($('loginIdentifier').value);
  const password = $('loginPassword').value;

  let valid = true;

  if (!identifier) {
    fieldError('loginIdentifier', 'loginIdentifierError', 'Ingresa tu número de control o correo.');
    valid = false;
  }

  if (!password) {
    fieldError('loginPassword', 'loginPasswordError', 'Ingresa tu contraseña.');
    valid = false;
  }

  if (!valid) return;

  const submit = $('loginSubmit');
  setBusy(submit, true, 'Entrando…');

  try {
    let email = identifier;

    if (!identifier.includes('@')) {
      email = await emailFromMatricula(identifier);
      if (!email) {
        setMessage(loginMessage, 'No encontramos una cuenta con ese número de control.', 'error');
        return;
      }
    }

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setMessage(loginMessage, translateSupabaseError(error), 'error');
      return;
    }

    setMessage(loginMessage, 'Inicio de sesión correcto. Redirigiendo…', 'success');
    window.location.href = 'index.html';
  } catch (error) {
    console.error(error);
    setMessage(loginMessage, translateSupabaseError(error), 'error');
  } finally {
    setBusy(submit, false);
  }
}

async function handleRegister(event) {
  event.preventDefault();
  clearErrors(registerForm);
  setMessage(registerMessage);

  const nombre = normalizeText($('registerName').value);
  const matricula = normalizeText($('registerMatricula').value);
  const apellidoPaterno = normalizeText($('registerApellidoPaterno').value);
  const apellidoMaterno = normalizeText($('registerApellidoMaterno').value);
  const correo = normalizeText($('registerEmail').value).toLowerCase();
  const carreraId = $('registerCareer').value;
  const semestre = Number($('registerSemester').value);
  const password = $('registerPassword').value;
  const passwordConfirm = $('registerPasswordConfirm').value;

  let valid = true;

  if (nombre.length < 2) {
    fieldError('registerName', 'registerNameError', 'Escribe tu nombre.');
    valid = false;
  }
  if (!matricula) {
    fieldError('registerMatricula', 'registerMatriculaError', 'Ingresa tu número de control.');
    valid = false;
  }
  if (!apellidoPaterno) {
    fieldError('registerApellidoPaterno', 'registerApellidoPaternoError', 'Ingresa tu apellido paterno.');
    valid = false;
  }
  if (!apellidoMaterno) {
    fieldError('registerApellidoMaterno', 'registerApellidoMaternoError', 'Ingresa tu apellido materno.');
    valid = false;
  }
  if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    fieldError('registerEmail', 'registerEmailError', 'Escribe un correo electrónico válido.');
    valid = false;
  }
  if (!carreraId) {
    fieldError('registerCareer', 'registerCareerError', 'Selecciona tu carrera.');
    valid = false;
  }
  if (!Number.isInteger(semestre) || semestre < 1) {
    fieldError('registerSemester', 'registerSemesterError', 'Selecciona tu semestre.');
    valid = false;
  }
  if (password.length < 6) {
    fieldError('registerPassword', 'registerPasswordError', 'La contraseña debe tener al menos 6 caracteres.');
    valid = false;
  }
  if (password !== passwordConfirm) {
    fieldError('registerPasswordConfirm', 'registerPasswordConfirmError', 'Las contraseñas no coinciden.');
    valid = false;
  }

  if (!valid) return;

  const submit = $('registerSubmit');
  setBusy(submit, true, 'Creando cuenta…');

  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email: correo,
      password,
      options: {
        emailRedirectTo: currentAuthPageUrl(),
        data: {
          matricula,
          nombre,
          apellido_paterno: apellidoPaterno,
          apellido_materno: apellidoMaterno,
          carrera_id: Number(carreraId),
          semestre_actual: semestre
        }
      }
    });

    if (error) {
      setMessage(registerMessage, translateSupabaseError(error), 'error');
      return;
    }

    if (data?.session) {
      setMessage(registerMessage, 'Cuenta creada correctamente. Redirigiendo…', 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 900);
    } else {
      setMessage(
        registerMessage,
        'Cuenta creada. Revisa tu correo para confirmar la cuenta y después inicia sesión.',
        'success'
      );
      registerForm.reset();
      await loadCareers();
    }
  } catch (error) {
    console.error(error);
    setMessage(registerMessage, translateSupabaseError(error), 'error');
  } finally {
    setBusy(submit, false);
  }
}

async function handleRecovery() {
  clearErrors(loginForm);
  setMessage(loginMessage);

  const identifier = normalizeText($('loginIdentifier').value);

  if (!identifier) {
    fieldError('loginIdentifier', 'loginIdentifierError', 'Escribe primero tu correo o número de control.');
    return;
  }

  try {
    let email = identifier;

    if (!identifier.includes('@')) {
      email = await emailFromMatricula(identifier);
      if (!email) {
        setMessage(loginMessage, 'No encontramos una cuenta con ese número de control.', 'error');
        return;
      }
    }

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: currentAuthPageUrl()
    });

    if (error) {
      setMessage(loginMessage, translateSupabaseError(error), 'error');
      return;
    }

    setMessage(loginMessage, 'Te enviamos un enlace de recuperación al correo asociado.', 'success');
  } catch (error) {
    console.error(error);
    setMessage(loginMessage, translateSupabaseError(error), 'error');
  }
}

async function handleLogout() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    setMessage(loginMessage, translateSupabaseError(error), 'error');
    return;
  }
  logoutButton.classList.add('hidden');
  setMessage(loginMessage, 'Sesión cerrada correctamente.', 'success');
}

async function refreshSessionState() {
  const { data } = await supabaseClient.auth.getSession();
  logoutButton.classList.toggle('hidden', !data?.session);
}

function bindPasswordToggles() {
  document.querySelectorAll('[data-toggle-password]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = $(button.dataset.togglePassword);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      button.textContent = isPassword ? 'Ocultar' : 'Mostrar';
    });
  });
}

function bindTabs() {
  loginTab.addEventListener('click', () => switchTab('login'));
  registerTab.addEventListener('click', () => switchTab('register'));
}

async function init() {
  bindTabs();
  bindPasswordToggles();
  loginForm.addEventListener('submit', handleLogin);
  registerForm.addEventListener('submit', handleRegister);
  recoverButton.addEventListener('click', handleRecovery);
  logoutButton.addEventListener('click', handleLogout);

  await loadCareers();
  await refreshSessionState();

  supabaseClient.auth.onAuthStateChange((_event, session) => {
    logoutButton.classList.toggle('hidden', !session);
  });
}

document.addEventListener('DOMContentLoaded', init);
