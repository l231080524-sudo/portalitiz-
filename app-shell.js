(() => {
  const SUPABASE_URL = 'https://hhwsqgohkqwbnthjbxdk.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_u_a3jaAL6pTh8v21tVIcaw_g9aGKW_m';

  window.ITIZ_SUPABASE_CONFIG = { url: SUPABASE_URL, key: SUPABASE_PUBLISHABLE_KEY };
  if (window.supabase?.createClient) {
    window.itizSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  }

  const root = document.documentElement;
  const storedTheme = localStorage.getItem('itiz-theme');
  root.dataset.theme = storedTheme === 'dark' ? 'dark' : 'light';

  const renderIcons = () => window.lucide?.createIcons();
  const applyThemeIcon = () => {
    const icon = document.querySelector('.theme-toggle [data-lucide]');
    if (icon) icon.setAttribute('data-lucide', root.dataset.theme === 'dark' ? 'sun' : 'moon');
    renderIcons();
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('itiz-theme', root.dataset.theme);
      applyThemeIcon();
    });
    document.querySelector('.menu-toggle')?.addEventListener('click', (event) => {
      const button = event.currentTarget;
      const menu = document.querySelector('.mobile-nav');
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      menu.hidden = expanded;
      const icon = button.querySelector('[data-lucide]');
      if (icon) icon.setAttribute('data-lucide', expanded ? 'menu' : 'x');
      renderIcons();
    });

    renderIcons();
    applyThemeIcon();
    const client = window.itizSupabase;
    if (!client) return;

    const accountLink = document.querySelector('.account-link');
    const accountLabel = document.querySelector('[data-account-label]');
    const avatar = document.querySelector('[data-avatar]');
    if (!accountLink || !accountLabel || !avatar) return;

    const renderAccount = (session) => {
      const user = session?.user;
      if (!user) {
        accountLink.href = 'login.html';
        accountLink.setAttribute('aria-label', 'Iniciar sesión');
        accountLabel.textContent = 'Iniciar sesión';
        avatar.textContent = 'IT';
        document.querySelector('.sign-out-button')?.remove();
        return;
      }
      const metadata = user.user_metadata || {};
      const name = metadata.nombre_completo || [metadata.nombre, metadata.apellido_paterno, metadata.apellido_materno].filter(Boolean).join(' ') || user.email;
      const career = metadata.carrera_nombre || 'Estudiante';
      const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
      accountLink.href = 'login.html';
      accountLink.setAttribute('aria-label', `Perfil de ${name}`);
      accountLabel.textContent = `Hola, ${name} (${career})`;
      avatar.textContent = initials;
      if (!document.querySelector('.sign-out-button')) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'sign-out-button icon-button';
        button.setAttribute('aria-label', 'Cerrar sesión');
        button.title = 'Cerrar sesión';
        button.innerHTML = '<i data-lucide="log-out"></i><span>Cerrar sesión</span>';
        button.addEventListener('click', async () => {
          button.disabled = true;
          try {
            const { error } = await client.auth.signOut();
            if (error) throw error;
          } catch (error) {
            if (window.Swal) {
              window.Swal.fire({ title: 'No se pudo cerrar la sesión', text: error.message, icon: 'error', confirmButtonText: 'Entendido' });
            } else {
              console.error('No se pudo cerrar la sesión:', error.message);
            }
            return;
          } finally {
            button.disabled = false;
          }
          renderAccount(null);
          accountLink.href = 'login.html';
        });
        document.querySelector('.nav-actions')?.append(button);
        renderIcons();
      }
    };

    const enrichAccount = async (session) => {
      renderAccount(session);
      const user = session?.user;
      if (!user?.id || (user.user_metadata?.carrera_nombre && user.user_metadata?.nombre_completo)) return;
      const { data: student, error } = await client.from('alumnos')
        .select('nombre, apellido_paterno, apellido_materno, carrera_id')
        .eq('id', user.id)
        .maybeSingle();
      if (error) {
        console.error('No se pudo cargar el perfil del alumno:', error.message);
        return;
      }
      if (!student) return;
      const { data } = await client.auth.getSession();
      if (data.session?.user?.id !== user.id) return;
      const fullName = [student.nombre, student.apellido_paterno, student.apellido_materno].filter(Boolean).join(' ');
      let career = '';
      if (student.carrera_id) {
        const { data: careerData, error: careerError } = await client.from('carreras')
          .select('nombre')
          .eq('id', student.carrera_id)
          .maybeSingle();
        if (careerError) {
          console.error('No se pudo cargar la carrera del alumno:', careerError.message);
        } else {
          career = careerData?.nombre || '';
        }
      }
      const metadata = { ...user.user_metadata };
      if (fullName) metadata.nombre_completo = fullName;
      if (career) metadata.carrera_nombre = career;
      renderAccount({ user: { ...user, user_metadata: metadata } });
    };

    client.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('No se pudo recuperar la sesión de ITIZ+:', error.message);
        return;
      }
      enrichAccount(data.session);
    });
    client.auth.onAuthStateChange((_event, session) => {
      window.setTimeout(() => { enrichAccount(session); }, 0);
    });
  });
})();
