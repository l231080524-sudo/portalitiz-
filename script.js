(() => {
  const programs = {
    systems: {
      icon: 'code-2',
      kind: 'Ingeniería · 9 semestres',
      title: 'Sistemas Computacionales',
      description: 'Aprende a diseñar, desarrollar e implementar soluciones de software y tecnología para los desafíos de hoy.',
      info: ['Desarrollo de software', 'Redes y datos', 'Inteligencia artificial', 'Plan, costos y requisitos: consulta la convocatoria vigente']
    },
    mechatronics: {
      icon: 'cpu',
      kind: 'Ingeniería · 9 semestres',
      title: 'Ingeniería Mecatrónica',
      description: 'Integra mecánica, electrónica y programación para crear sistemas automatizados y soluciones inteligentes.',
      info: ['Robótica', 'Control y automatización', 'Diseño de sistemas', 'Plan, costos y requisitos: consulta la convocatoria vigente']
    },
    business: {
      icon: 'chart-no-axes-combined',
      kind: 'Licenciatura · 9 semestres',
      title: 'Gestión Empresarial',
      description: 'Desarrolla las herramientas para gestionar proyectos, impulsar organizaciones y convertir ideas en resultados.',
      info: ['Administración', 'Finanzas', 'Emprendimiento', 'Plan, costos y requisitos: consulta la convocatoria vigente']
    }
  };

  const openDetail = (card) => {
    const program = programs[card.dataset.detail];
    if (!program || !window.Swal) return;
    window.Swal.fire({
      title: program.title,
      iconHtml: `<i data-lucide="${program.icon}"></i>`,
      html: `<p class="program-modal-copy">${program.description}</p><div class="program-modal-tags">${program.info.map((item) => `<span>${item}</span>`).join('')}</div><p class="program-modal-note">Los planes, costos, requisitos y fechas pueden cambiar. Confirma la convocatoria vigente con el Instituto.</p>`,
      confirmButtonText: 'Entendido',
      buttonsStyling: true,
      customClass: { popup: 'itiz-swal-popup', title: 'itiz-swal-title', confirmButton: 'itiz-swal-confirm' },
      didOpen: () => window.lucide?.createIcons()
    });
  };

  document.querySelectorAll('[data-detail]').forEach((card) => {
    card.addEventListener('click', () => openDetail(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openDetail(card);
      }
    });
  });

})();
