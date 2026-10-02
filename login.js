(() => {
  const client = window.itizSupabase;
  const $ = (id) => document.getElementById(id);
  const loginForm = $('loginForm');
  const registerForm = $('registerForm');
  const loginTab = $('loginTab');
  const registerTab = $('registerTab');
  const loginPanel = $('loginPanel');
  const registerPanel = $('registerPanel');
  const logoutButton = $('logoutButton');
  const authMessage = $('authMessage');
  const careerSelect = $('registerCareer');

  const notify = (title, text, icon = 'info') => window.Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'Entendido',
    buttonsStyling: true
  });

  const normalize = (value) => value.trim().replace(/\s+/g, ' ');
  const setBusy = (button, busy, label) => {
    if (busy) {
      button.dataset.originalHtml = button.innerHTML;
      button.disabled = true;
      button.textContent = label;
      return;
    }
    button.disabled = false;
    if (button.dataset.originalHtml) button.innerHTML = button.dataset.originalHtml;
  };

  const clearErrors = (form) => {
    form.querySelectorAll('.field-error').forEach((field) => { field.textContent = ''; });
    form.querySelectorAll('.field-group').forEach((group) => group.classList.remove('invalid'));
  };

  const showFieldError = (inputId, message) => {
    const input = $(inputId);
    const error = $(`${inputId}Error`);
    input?.closest('.field-group')?.classList.add('invalid');
    if (error) error.textContent = message;
  };

  const switchTab = (mode) => {
    const isLogin = mode === 'login';
    loginTab.classList.toggle('is-active', isLogin);
    registerTab.classList.toggle('is-active', !isLogin);
    loginTab.setAttribute('aria-selected', String(isLogin));
    registerTab.setAttribute('aria-selected', String(!isLogin));
    loginPanel.hidden = !isLogin;
    registerPanel.hidden = isLogin;
    authMessage.textContent = '';
  };

  const errorMessage = (error) => {
    const message = String(error?.message || '').toLowerCase();
    if (message.includes('invalid login credentials')) return 'El número de control/correo o la contraseña no son correctos.';
    if (message.includes('email not confirmed')) return 'Confirma tu correo desde el enlace que enviamos antes de iniciar sesión.';
    if (message.includes('user already registered') || message.includes('already been registered')) return 'Ya existe una cuenta registrada con ese correo.';
    if (message.includes('duplicate key') || message.includes('matricula') || message.includes('número de control')) return 'Este número de control ya está registrado.';
    if (message.includes('password should be at least')) return 'La contraseña no cumple con la longitud mínima configurada.';
    if (message.includes('rate limit')) return 'Se alcanzó el límite temporal de intentos. Espera un momento e inténtalo de nuevo.';
    if (message.includes('failed to fetch') || message.includes('network')) return 'No se pudo conectar con Supabase. Revisa tu conexión a internet.';
    if (message.includes('database error saving new user')) return 'No se pudo completar el registro. El número de control quizá ya está registrado o falta configurar el trigger de alumnos en Supabase.';
    return error?.message || 'Ocurrió un error inesperado. Inténtalo de nuevo.';
  };

  const loadCareers = async () => {
    if (!client) throw new Error('La conexión de Supabase no está disponible.');
    const { data, error } = await client.from('carreras').select('id, clave, nombre').order('nombre', { ascending: true });
    if (error) throw error;
    if (!data?.length) throw new Error('No hay carreras disponibles. Verifica que la tabla carreras tenga registros.');
    careerSelect.replaceChildren(new Option('Selecciona una carrera', ''));
    data.forEach((career) => {
      careerSelect.add(new Option(career.clave ? `${career.clave} — ${career.nombre}` : career.nombre, String(career.id)));
    });
  };

  const findEmailByMatricula = async (matricula) => {
    const { data, error } = await client.rpc('get_auth_email_by_matricula', { p_matricula: matricula });
    if (!error) return typeof data === 'string' && data.includes('@') ? data : null;

    console.warn('No se pudo utilizar get_auth_email_by_matricula; se intentará la consulta protegida de respaldo.', error.message);
    const fallback = await client.from('alumnos').select('correo').eq('matricula', matricula).maybeSingle();
    if (fallback.error) {
      throw new Error(`No se pudo resolver el número de control. Ejecuta la función RPC get_auth_email_by_matricula en Supabase. ${fallback.error.message}`);
    }
    return typeof fallback.data?.correo === 'string' ? fallback.data.correo : null;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    clearErrors(loginForm);
    const identifier = normalize($('loginIdentifier').value);
    const password = $('loginPassword').value;
    let valid = true;
    if (!identifier) {
      showFieldError('loginIdentifier', 'Ingresa tu número de control o correo.');
      valid = false;
    }
    if (!password) {
      showFieldError('loginPassword', 'Ingresa tu contraseña.');
      valid = false;
    }
    if (!valid) return;

    const submit = $('loginSubmit');
    setBusy(submit, true, 'Verificando acceso…');
    try {
      const email = identifier.includes('@') ? identifier : await findEmailByMatricula(identifier);
      if (!email) {
        await notify('Cuenta no encontrada', 'No encontramos una cuenta asociada a ese número de control.', 'warning');
        return;
      }
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      authMessage.textContent = 'Acceso correcto. Abriendo tu portal…';
      window.location.assign('index.html');
      return;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      await notify('No pudimos iniciar sesión', errorMessage(error), 'error');
    } finally {
      setBusy(submit, false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    clearErrors(registerForm);
    const matricula = normalize($('registerMatricula').value);
    const fullName = normalize($('registerFullName').value);
    const email = normalize($('registerEmail').value).toLowerCase();
    const careerId = careerSelect.value;
    const careerName = careerSelect.selectedOptions[0]?.textContent?.replace(/^[^—]+—\s*/, '') || '';
    const semester = Number($('registerSemester').value);
    const password = $('registerPassword').value;
    const passwordConfirm = $('registerPasswordConfirm').value;
    let valid = true;

    if (!matricula) { showFieldError('registerMatricula', 'Ingresa tu número de control.'); valid = false; }
    if (fullName.length < 3) { showFieldError('registerFullName', 'Escribe tu nombre completo.'); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showFieldError('registerEmail', 'Escribe un correo institucional válido.'); valid = false; }
    if (!careerId) { showFieldError('registerCareer', 'Selecciona tu carrera.'); valid = false; }
    if (!Number.isInteger(semester) || semester < 1 || semester > 12) { showFieldError('registerSemester', 'Selecciona un semestre válido.'); valid = false; }
    if (password.length < 6) { showFieldError('registerPassword', 'La contraseña debe tener al menos 6 caracteres.'); valid = false; }
    if (password !== passwordConfirm) { showFieldError('registerPasswordConfirm', 'Las contraseñas no coinciden.'); valid = false; }
    if (!valid) return;

    const submit = $('registerSubmit');
    setBusy(submit, true, 'Creando cuenta…');
    try {
      const existingEmail = await findEmailByMatricula(matricula);
      if (existingEmail) {
        await notify('Número de control ya registrado', 'Ya hay una cuenta vinculada a este número de control. Inicia sesión o recupera tu contraseña.', 'warning');
        return;
      }

      const [nombre, ...apellidos] = fullName.split(' ');
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}${window.location.pathname}`,
          data: {
            matricula,
            nombre,
            apellido_paterno: apellidos.shift() || '',
            apellido_materno: apellidos.join(' '),
            nombre_completo: fullName,
            carrera_id: Number(careerId),
            carrera_nombre: careerName,
            semestre_actual: semester
          }
        }
      });
      if (error) throw error;
      if (data.user?.identities?.length === 0) {
        await notify('Correo ya registrado', 'Ya existe una cuenta con ese correo. Inicia sesión o recupera tu contraseña.', 'warning');
        return;
      }

      if (data.session) {
        await window.Swal.fire({
          title: '¡Registro exitoso!',
          text: 'Tu cuenta estudiantil está lista. Te llevaremos a ITIZ+.',
          icon: 'success',
          confirmButtonText: 'Continuar'
        });
        window.location.assign('index.html');
        return;
      }

      registerForm.reset();
      await loadCareers();
      switchTab('login');
      await notify('¡Registro exitoso!', 'Revisa tu correo institucional y confirma tu cuenta antes de iniciar sesión.', 'success');
    } catch (error) {
      console.error('Error al registrar cuenta:', error);
      await notify('No pudimos completar el registro', errorMessage(error), 'error');
    } finally {
      setBusy(submit, false);
    }
  };

  const handleRecovery = async () => {
    clearErrors(loginForm);
    const identifier = normalize($('loginIdentifier').value);
    if (!identifier) {
      showFieldError('loginIdentifier', 'Escribe tu correo o número de control para recuperar el acceso.');
      return;
    }
    try {
      const email = identifier.includes('@') ? identifier : await findEmailByMatricula(identifier);
      if (!email) {
        await notify('Cuenta no encontrada', 'No encontramos una cuenta asociada a ese número de control.', 'warning');
        return;
      }
      const { error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}${window.location.pathname}`
      });
      if (error) throw error;
      await notify('Revisa tu correo', 'Te enviamos un enlace para restablecer tu contraseña.', 'success');
    } catch (error) {
      console.error('Error al solicitar recuperación:', error);
      await notify('No pudimos enviar el enlace', errorMessage(error), 'error');
    }
  };

  const handleLogout = async () => {
    const confirmation = await window.Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Se cerrará tu sesión de ITIZ+ en este dispositivo.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Cerrar sesión',
      cancelButtonText: 'Seguir aquí',
      reverseButtons: true
    });
    if (!confirmation.isConfirmed) return;
    logoutButton.disabled = true;
    try {
      const { error } = await client.auth.signOut();
      if (error) throw error;
      logoutButton.hidden = true;
      await notify('Sesión cerrada', 'Tu cuenta salió de este dispositivo.', 'success');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      await notify('No pudimos cerrar la sesión', errorMessage(error), 'error');
    } finally {
      logoutButton.disabled = false;
    }
  };

  const bindPasswordToggles = () => {
    document.querySelectorAll('[data-toggle-password]').forEach((button) => {
      button.addEventListener('click', () => {
        const input = $(button.dataset.togglePassword);
        if (!input) return;
        const visible = input.type === 'password';
        input.type = visible ? 'text' : 'password';
        button.setAttribute('aria-label', visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
        button.innerHTML = `<i data-lucide="${visible ? 'eye-off' : 'eye'}"></i>`;
        window.lucide?.createIcons();
      });
    });
  };

  const init = async () => {
    if (!client) {
      await notify('Servicio no disponible', 'No se pudo inicializar Supabase. Recarga la página e inténtalo de nuevo.', 'error');
      return;
    }
    loginTab.addEventListener('click', () => switchTab('login'));
    registerTab.addEventListener('click', () => switchTab('register'));
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    $('recoverButton').addEventListener('click', handleRecovery);
    logoutButton.addEventListener('click', handleLogout);
    bindPasswordToggles();

    try {
      await loadCareers();
    } catch (error) {
      console.error('No se pudieron cargar las carreras:', error);
      careerSelect.replaceChildren(new Option('Carreras no disponibles', ''));
      await notify('No se pudieron cargar las carreras', errorMessage(error), 'error');
    }

    const { data, error } = await client.auth.getSession();
    if (error) {
      console.error('No se pudo recuperar la sesión:', error);
      await notify('No se pudo revisar tu sesión', errorMessage(error), 'error');
      return;
    }
    logoutButton.hidden = !data.session;
    client.auth.onAuthStateChange((_event, session) => {
      logoutButton.hidden = !session;
    });
  };

  document.addEventListener('DOMContentLoaded', init);
})();
