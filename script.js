const cards = [
  {
    id: 1,
    tag: 'Inscripciones',
    title: 'Fechas de Inscripción',
    subtitle: 'Ciclos 2026–2027',
    desc: 'Dos periodos anuales de registro. Consulta requisitos en Servicios Escolares.',
    icon: '📅',
    bg: 'linear-gradient(135deg, #0d3b6e 0%, #1a5296 100%)',
    tagColor: '#00b96b',
    action: 'Ver fechas',
    details: {
      heading: 'Fechas de Inscripción',
      emoji: '📅',
      sections: [
        {
          title: 'Periodo Agosto–Diciembre 2026',
          items: [
            'Inicio de inscripciones: 1 de agosto de 2026',
            'Cierre de inscripciones: 15 de agosto de 2026',
            'Presenta documentación completa en Servicios Escolares'
          ]
        },
        {
          title: 'Periodo Febrero–Junio 2027',
          items: [
            'Inicio de inscripciones: 10 de febrero de 2027',
            'Cierre de inscripciones: 28 de febrero de 2027',
            'Reinscripciones disponibles en línea y presencial'
          ]
        },
        {
          title: 'Documentación requerida',
          items: [
            'CURP vigente',
            'Certificado de bachillerato o equivalente',
            '3 fotografías tamaño infantil',
            'Comprobante de domicilio',
            'Acta de nacimiento'
          ]
        }
      ]
    }
  },
  {
    id: 2,
    tag: 'Ingeniería',
    title: 'Ing. en Sistemas',
    subtitle: 'Computacionales',
    desc: 'Forma ingenieros capaces de diseñar, desarrollar e implementar sistemas de software.',
    icon: '💻',
    bg: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
    tagColor: '#60a5fa',
    action: 'Conocer carrera',
    details: {
      heading: 'Ing. en Sistemas Computacionales',
      emoji: '💻',
      sections: [
        {
          title: 'Descripción',
          items: ['Duración: 9 semestres', 'Modalidad: Presencial', 'Sede: Campus ITIZ+ — Iztapalapa, CDMX']
        },
        {
          title: 'Áreas de formación',
          items: [
            'Desarrollo de software y aplicaciones web/móvil',
            'Redes y telecomunicaciones (Cisco)',
            'Bases de datos relacionales y NoSQL',
            'Inteligencia Artificial y Machine Learning',
            'Seguridad informática y ciberseguridad'
          ]
        },
        {
          title: 'Campo laboral',
          items: [
            'Desarrollador de software full-stack',
            'Administrador de redes y sistemas',
            'Analista de datos e IA',
            'Consultor en TI',
            'Emprendedor tecnológico'
          ]
        }
      ]
    }
  },
  {
    id: 3,
    tag: 'Ingeniería',
    title: 'Mecatrónica',
    subtitle: 'Automatización & Robótica',
    desc: 'Integra mecánica, electrónica e informática para diseñar sistemas inteligentes.',
    icon: '⚙️',
    bg: 'linear-gradient(135deg, #1a3a2a 0%, #059669 100%)',
    tagColor: '#6ee7b7',
    action: 'Conocer carrera',
    details: {
      heading: 'Ingeniería en Mecatrónica',
      emoji: '⚙️',
      sections: [
        {
          title: 'Descripción',
          items: ['Duración: 9 semestres', 'Modalidad: Presencial', 'Sede: Campus ITIZ+ — Iztapalapa, CDMX']
        },
        {
          title: 'Áreas de formación',
          items: [
            'Diseño y manufactura de sistemas mecánicos',
            'Electrónica analógica y digital',
            'Programación de PLCs y microcontroladores',
            'Robótica industrial y colaborativa',
            'Automatización de procesos industriales'
          ]
        },
        {
          title: 'Campo laboral',
          items: [
            'Ingeniero de automatización industrial',
            'Diseñador de robots y sistemas CNC',
            'Técnico en mantenimiento de plantas',
            'Desarrollador de productos mecatrónicos',
            'Consultor en Industria 4.0'
          ]
        }
      ]
    }
  },
  {
    id: 4,
    tag: 'Créditos',
    title: 'Cursos para Créditos',
    subtitle: 'Culturales y Deportivos',
    desc: 'Actividades extracurriculares obligatorias para completar tu perfil de egreso.',
    icon: '🎓',
    bg: 'linear-gradient(135deg, #3b1f0a 0%, #d97706 100%)',
    tagColor: '#fde68a',
    action: 'Ver oferta',
    details: {
      heading: 'Cursos para Créditos',
      emoji: '🎓',
      sections: [
        {
          title: 'Créditos Culturales',
          items: ['Arte plástico y pintura', 'Fotografía y edición digital', 'Cine y apreciación cinematográfica', 'Música y expresión artística']
        },
        {
          title: 'Créditos Deportivos',
          items: ['Educación Física general', 'Actividades deportivas programadas', 'Se imparten en la duela y canchas del campus']
        },
        {
          title: 'Información general',
          items: [
            'Son obligatorios para titulación',
            'Se imparten en los salones de créditos del campus',
            'Inscripción por semestre con cupo limitado',
            'Horarios matutinos y vespertinos disponibles'
          ]
        }
      ]
    }
  },
  {
    id: 5,
    tag: 'Licenciatura',
    title: 'Gestión Empresarial',
    subtitle: 'Administración & Finanzas',
    desc: 'Prepara líderes con visión estratégica para gestionar empresas e instituciones.',
    icon: '📊',
    bg: 'linear-gradient(135deg, #2d1b4e 0%, #7c3aed 100%)',
    tagColor: '#c4b5fd',
    action: 'Conocer carrera',
    details: {
      heading: 'Lic. en Gestión Empresarial',
      emoji: '📊',
      sections: [
        {
          title: 'Descripción',
          items: ['Duración: 9 semestres', 'Modalidad: Presencial', 'Sede: Campus ITIZ+ — Iztapalapa, CDMX']
        },
        {
          title: 'Áreas de formación',
          items: [
            'Administración de empresas y proyectos',
            'Contabilidad y finanzas corporativas',
            'Mercadotecnia y ventas digitales',
            'Derecho empresarial y laboral',
            'Emprendimiento e innovación'
          ]
        },
        {
          title: 'Campo laboral',
          items: [
            'Gerente o director de empresa',
            'Consultor de negocios y estrategia',
            'Analista financiero',
            'Emprendedor y fundador de startups',
            'Gestor en sector público o privado'
          ]
        }
      ]
    }
  },
  {
    id: 6,
    tag: 'Idiomas',
    title: 'Curso de Inglés',
    subtitle: 'ITIZ+ Language Center',
    desc: 'Desde cero hasta nivel intermedio. Modalidad normal, intensiva, presencial o en línea.',
    icon: '🌐',
    bg: 'linear-gradient(135deg, #0c3547 0%, #0891b2 100%)',
    tagColor: '#67e8f9',
    action: 'Inscribirme',
    details: {
      heading: 'Curso de Inglés ITIZ+',
      emoji: '🌐',
      sections: [
        {
          title: 'Niveles disponibles',
          items: [
            'Desde nivel cero (sin conocimientos previos)',
            'Avance progresivo hasta nivel intermedio (B1)',
            'Nivel intermedio requerido para graduarse',
            'Certificación Cambridge disponible al finalizar'
          ]
        },
        {
          title: 'Modalidades',
          items: [
            'Normal: duración estándar por semestre',
            'Intensivo: acelerado en 2 meses',
            'Presencial: en salones del campus',
            'En línea: plataforma virtual ITIZ+'
          ]
        },
        {
          title: 'Información adicional',
          items: [
            'Grupos reducidos (máx. 20 alumnos)',
            'Materiales incluidos en la cuota',
            'Instructores certificados por Cambridge',
            'Inicio con cada ciclo escolar'
          ]
        }
      ]
    }
  },
  {
    id: 7,
    tag: 'Deportes',
    title: 'Cursos Extras',
    subtitle: 'Deporte, Tecnología & Cultura',
    desc: 'Actividades adicionales abiertas a toda la comunidad ITIZ+. ¡Únete a un equipo!',
    icon: '⚽',
    bg: 'linear-gradient(135deg, #1a2e1a 0%, #16a34a 100%)',
    tagColor: '#86efac',
    action: 'Ver cursos',
    details: {
      heading: 'Cursos y Actividades Extras',
      emoji: '⚽',
      sections: [
        {
          title: 'Deportes de conjunto',
          items: [
            'Fútbol — canchas del campus, martes y jueves',
            'Voleibol — duela cubierta, lunes y miércoles',
            'Básquetbol — canchas exteriores, viernes'
          ]
        },
        {
          title: 'Deportes de combate y alta tecnología',
          items: ['Box — gimnasio polideportivo, martes y jueves', 'Drones — vuelo FPV y programación, sábados']
        },
        {
          title: 'Cómo inscribirse',
          items: [
            'Registro en Servicios Escolares o en línea',
            'Cupo limitado por disciplina',
            'Abierto a todos los alumnos inscritos',
            'Actividad extracurricular sin costo adicional'
          ]
        }
      ]
    }
  }
];

const mapNodes = [
  { id: 'A1', label: 'Salones 22–12', x: 5, y: 38, type: 'classroom', icon: '🏫' },
  { id: 'B1', label: 'Salones 11–10', x: 20, y: 15, type: 'classroom', icon: '🏫' },
  { id: 'B2', label: 'Salones 9–8', x: 20, y: 27, type: 'classroom', icon: '🏫' },
  { id: 'B3', label: 'Salones 7–6', x: 20, y: 38, type: 'classroom', icon: '🏫' },
  { id: 'b4', label: 'Laboratorio', x: 20, y: 50, type: 'lab', icon: '🔬' },
  { id: 'B8', label: 'Salones 5–4', x: 33, y: 24, type: 'classroom', icon: '🏫' },
  { id: 'B0', label: 'Salones 3–2', x: 33, y: 36, type: 'classroom', icon: '🏫' },
  { id: 'b5', label: 'Salón 1 + Cómputo', x: 33, y: 50, type: 'lab', icon: '💻' },
  { id: 'office1', label: 'Cómputo', x: 23, y: 60, type: 'lab', icon: '🖥️' },
  { id: 'office2', label: 'Biblioteca', x: 34, y: 60, type: 'service', icon: '📚' },
  { id: 'e1', label: 'Servicios Escolares', x: 53, y: 24, type: 'service', icon: '📋' },
  { id: 'e2', label: 'Sala de Reuniones', x: 53, y: 36, type: 'admin', icon: '🤝' },
  { id: 'e3', label: 'Financieros', x: 53, y: 50, type: 'admin', icon: '💰' },
  { id: 'area1', label: 'Duela', x: 16, y: 78, type: 'sport', icon: '🏐' },
  { id: 'area2', label: 'Frontón', x: 33, y: 78, type: 'sport', icon: '🎾' },
  { id: 'area3', label: 'Auditorio', x: 47, y: 78, type: 'service', icon: '🎭' },
  { id: 'utilityK', label: 'Piscina', x: 35, y: 90, type: 'sport', icon: '🏊' },
  { id: 'F1', label: 'Salones 23–30', x: 62, y: 70, type: 'classroom', icon: '🏫' },
  { id: 'parking', label: 'Estacionamiento', x: 85, y: 52, type: 'access', icon: '🚗' }
];

const typeColors = {
  admin: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af', pin: '#3b82f6' },
  service: { bg: '#d1fae5', border: '#10b981', text: '#065f46', pin: '#10b981' },
  lab: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e', pin: '#f59e0b' },
  classroom: { bg: '#ede9fe', border: '#8b5cf6', text: '#4c1d95', pin: '#8b5cf6' },
  health: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b', pin: '#ef4444' },
  sport: { bg: '#ffedd5', border: '#f97316', text: '#9a3412', pin: '#f97316' },
  access: { bg: '#f0fdf4', border: '#22c55e', text: '#14532d', pin: '#22c55e' }
};

const typeLabels = {
  admin: 'Administrativo',
  service: 'Servicio',
  lab: 'Laboratorio',
  classroom: 'Salón',
  health: 'Salud',
  sport: 'Deportivo/Recreativo',
  access: 'Acceso'
};

const state = {
  offset: 0,
  visibleCount: 3,
  searchQuery: '',
  selectedNode: null,
  modalCard: null,
  mapZoom: 1,
  mapPan: { x: 0, y: 0 },
  carouselTimer: null,
  panStart: null,
  lastPinchDist: null,
  isDragging: false
};

const $ = (selector) => document.querySelector(selector);

const carouselGrid = $('#carouselGrid');
const carouselDots = $('#carouselDots');
const modalOverlay = $('#modalOverlay');
const modalHeader = $('#modalHeader');
const modalBody = $('#modalBody');
const mapStage = $('#mapStage');
const mapTransform = $('#mapTransform');
const mapPins = $('#mapPins');
const infoPanel = $('#infoPanel');
const mapSearch = $('#mapSearch');
const clearSearch = $('#clearSearch');
const resultCount = $('#resultCount');
const campusMap = $('#campusMap');
const mapFallback = $('#mapFallback');
const zoomLabel = $('#zoomLabel');
const zoomOut = $('#zoomOut');
const zoomIn = $('#zoomIn');
const zoomReset = $('#zoomReset');

function updateVisibleCount() {
  const width = window.innerWidth;
  state.visibleCount = width < 640 ? 1 : width < 1024 ? 2 : 3;
  renderCarousel();
}

function startCarouselInterval() {
  if (state.carouselTimer) {
    clearInterval(state.carouselTimer);
  }
  state.carouselTimer = setInterval(() => {
    state.offset = (state.offset + 1) % cards.length;
    renderCarousel();
  }, 7000);
}

function renderCarousel() {
  const visibleCards = Array.from(
    { length: state.visibleCount },
    (_, index) => cards[(state.offset + index) % cards.length]
  );

  carouselGrid.innerHTML = visibleCards.map((card) => `
    <article class="feature-card" style="--card-bg:${card.bg}; --tag-color:${card.tagColor}" data-card-id="${card.id}" tabindex="0" role="button" aria-label="Abrir ${escapeHtml(card.title)}">
      <span class="card-tag">${escapeHtml(card.tag)}</span>
      <div class="card-main">
        <div class="card-icon">${card.icon}</div>
        <div>
          <div class="card-title">${escapeHtml(card.title)}</div>
          <div class="card-subtitle">${escapeHtml(card.subtitle)}</div>
        </div>
      </div>
      <div class="card-desc">${escapeHtml(card.desc)}</div>
      <div class="card-action">${escapeHtml(card.action)} →</div>
    </article>
  `).join('');

  carouselGrid.querySelectorAll('[data-card-id]').forEach((cardElement) => {
    const card = cards.find((item) => item.id === Number(cardElement.dataset.cardId));
    const open = () => openModal(card);
    cardElement.addEventListener('click', open);
    cardElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });

  carouselDots.innerHTML = cards.map((card, index) => `
    <button class="carousel-dot ${index === state.offset ? 'is-active' : ''}" type="button" data-index="${index}" aria-label="Ir al elemento ${index + 1}" aria-current="${index === state.offset ? 'true' : 'false'}"></button>
  `).join('');

  carouselDots.querySelectorAll('[data-index]').forEach((dot) => {
    dot.addEventListener('click', () => {
      state.offset = Number(dot.dataset.index);
      renderCarousel();
      startCarouselInterval();
    });
  });
}

function nudgeCarousel(direction) {
  state.offset = (state.offset + direction + cards.length) % cards.length;
  renderCarousel();
  startCarouselInterval();
}

function openModal(card) {
  if (!card) return;
  state.modalCard = card;

  modalHeader.style.setProperty('--modal-bg', card.bg);
  modalHeader.style.setProperty('--modal-tag-color', card.tagColor);
  modalHeader.style.setProperty('--modal-tag-border', `${card.tagColor}55`);
  modalHeader.innerHTML = `
    <div class="modal-header-top">
      <div>
        <span class="modal-tag">${escapeHtml(card.tag)}</span>
        <div id="modalTitle" class="modal-title">${card.details.emoji} ${escapeHtml(card.details.heading)}</div>
        <div class="modal-subtitle">${escapeHtml(card.subtitle)}</div>
      </div>
      <button id="modalClose" class="modal-close" type="button" aria-label="Cerrar">×</button>
    </div>
  `;

  modalBody.innerHTML = card.details.sections.map((section) => `
    <div class="modal-section">
      <div class="modal-section-title">${escapeHtml(section.title)}</div>
      <ul class="modal-section-list">
        ${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  modalOverlay.classList.remove('hidden');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  $('#modalClose').addEventListener('click', closeModal);
}

function closeModal() {
  state.modalCard = null;
  modalOverlay.classList.add('hidden');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function renderLegend() {
  $('#legend').innerHTML = Object.entries(typeLabels).map(([type, label]) => {
    const colors = typeColors[type];
    return `<span class="legend-pill" style="--legend-bg:${colors.bg}; --legend-border:${colors.border}; --legend-text:${colors.text}">${escapeHtml(label)}</span>`;
  }).join('');
}

function getFilteredNodes() {
  const query = state.searchQuery.trim().toLowerCase();
  if (!query) return [...mapNodes];
  return mapNodes.filter((node) => node.label.toLowerCase().includes(query));
}

function renderMapPins() {
  const filteredNodes = getFilteredNodes();
  const filteredIds = new Set(filteredNodes.map((node) => node.id));

  mapPins.innerHTML = mapNodes.map((node) => {
    const colors = typeColors[node.type];
    const isFiltered = state.searchQuery !== '' && !filteredIds.has(node.id);
    const isSelected = state.selectedNode === node.id;

    return `
      <button
        class="map-pin-button ${isSelected ? 'is-selected' : ''}"
        type="button"
        title="${escapeHtml(node.label)}"
        aria-label="${escapeHtml(node.label)}"
        data-node-id="${escapeHtml(node.id)}"
        style="left:${node.x}%; top:${node.y}%; opacity:${isFiltered ? 0.12 : 1}; --pin-color:${colors.pin};"
      >
        <div class="pin-content">
          ${isSelected ? `<div class="pin-label" style="background:${colors.pin}">${escapeHtml(node.label)}</div>` : ''}
          <div class="pin-circle">${node.icon}</div>
          <div class="pin-stem"></div>
          <div class="pin-dot"></div>
        </div>
      </button>
    `;
  }).join('');

  mapPins.querySelectorAll('[data-node-id]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const id = button.dataset.nodeId;
      state.selectedNode = state.selectedNode === id ? null : id;
      renderMapPins();
      renderInfoPanel();
    });
  });
}

function renderInfoPanel() {
  const selectedNode = mapNodes.find((node) => node.id === state.selectedNode);

  if (selectedNode) {
    const colors = typeColors[selectedNode.type];
    infoPanel.innerHTML = `
      <div class="info-selected">
        <div class="info-selected-card" style="--selected-bg:${colors.bg}; --selected-border:${colors.border}; --selected-text:${colors.text}">
          <div class="info-selected-icon">${selectedNode.icon}</div>
          <div class="info-selected-type">${escapeHtml(typeLabels[selectedNode.type])}</div>
          <div class="info-selected-label">${escapeHtml(selectedNode.label)}</div>
        </div>
        <div class="info-selected-copy">
          <div class="info-selected-description">Ubicado en el campus ITIZ+. Para más información visita la oficina o consulta el directorio en línea.</div>
          <button id="backFromNode" class="back-button" type="button">← Volver</button>
        </div>
      </div>
    `;
    $('#backFromNode').addEventListener('click', () => {
      state.selectedNode = null;
      renderMapPins();
      renderInfoPanel();
    });
    return;
  }

  const nodes = state.searchQuery ? getFilteredNodes() : mapNodes;
  infoPanel.innerHTML = `
    <div class="info-heading">Ubicaciones del Campus — selecciona un pin o elige aquí</div>
    <div class="info-list">
      ${nodes.map((node) => {
        const colors = typeColors[node.type];
        return `
          <button class="info-item-button" type="button" data-node-id="${escapeHtml(node.id)}">
            <span>${node.icon}</span>
            ${escapeHtml(node.label)}
          </button>
        `;
      }).join('')}
    </div>
  `;

  infoPanel.querySelectorAll('[data-node-id]').forEach((button) => {
    const node = mapNodes.find((item) => item.id === button.dataset.nodeId);
    const colors = typeColors[node.type];
    button.addEventListener('mouseenter', () => button.style.borderColor = colors.border);
    button.addEventListener('mouseleave', () => button.style.borderColor = '');
    button.addEventListener('click', () => {
      state.selectedNode = button.dataset.nodeId;
      renderMapPins();
      renderInfoPanel();
    });
  });
}

function updateSearchUI() {
  const filteredNodes = getFilteredNodes();
  mapSearch.value = state.searchQuery;
  clearSearch.classList.toggle('hidden', !state.searchQuery);
  resultCount.textContent = state.searchQuery
    ? `${filteredNodes.length} resultado${filteredNodes.length !== 1 ? 's' : ''}`
    : `${mapNodes.length} ubicaciones`;
  renderMapPins();
  renderInfoPanel();
}

function clampZoom(zoom) {
  return Math.min(3, Math.max(1, zoom));
}

function clampPan(zoom, px, py) {
  if (!mapStage) return { x: px, y: py };
  const maxX = (mapStage.clientWidth * (zoom - 1)) / 2;
  const maxY = (mapStage.clientHeight * (zoom - 1)) / 2;
  return {
    x: Math.min(maxX, Math.max(-maxX, px)),
    y: Math.min(maxY, Math.max(-maxY, py))
  };
}

function applyMapTransform(withTransition = true) {
  const panX = state.mapPan.x / state.mapZoom;
  const panY = state.mapPan.y / state.mapZoom;
  mapTransform.style.transition = withTransition ? 'transform 0.15s ease' : 'none';
  mapTransform.style.transform = `scale(${state.mapZoom}) translate(${panX}px, ${panY}px)`;
  mapStage.classList.toggle('is-draggable', state.mapZoom > 1);
  mapStage.classList.toggle('is-dragging', state.isDragging);
  zoomLabel.textContent = `Zoom ${Math.round(state.mapZoom * 100)}%`;
  zoomOut.disabled = state.mapZoom <= 1;
  zoomIn.disabled = state.mapZoom >= 3;
  zoomReset.classList.toggle('hidden', state.mapZoom <= 1);
}

function zoomTo(nextZoom) {
  const next = clampZoom(nextZoom);
  state.mapZoom = next;
  if (next === 1) {
    state.mapPan = { x: 0, y: 0 };
  } else {
    state.mapPan = clampPan(next, state.mapPan.x, state.mapPan.y);
  }
  applyMapTransform(true);
}

function onMapWheel(event) {
  event.preventDefault();
  zoomTo(state.mapZoom + (event.deltaY < 0 ? 0.2 : -0.2));
}

function onMouseDown(event) {
  if (state.mapZoom <= 1) return;
  state.isDragging = true;
  state.panStart = {
    mx: event.clientX,
    my: event.clientY,
    px: state.mapPan.x,
    py: state.mapPan.y
  };
  applyMapTransform(false);
}

function onMouseMove(event) {
  if (!state.panStart) return;
  const dx = event.clientX - state.panStart.mx;
  const dy = event.clientY - state.panStart.my;
  state.mapPan = clampPan(
    state.mapZoom,
    state.panStart.px + dx,
    state.panStart.py + dy
  );
  applyMapTransform(false);
}

function stopMousePan() {
  state.panStart = null;
  state.isDragging = false;
  applyMapTransform(true);
}

function distanceBetweenTouches(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.hypot(dx, dy);
}

function onTouchStart(event) {
  if (event.touches.length === 2) {
    state.lastPinchDist = distanceBetweenTouches(event.touches);
  } else if (event.touches.length === 1 && state.mapZoom > 1) {
    const touch = event.touches[0];
    state.panStart = {
      mx: touch.clientX,
      my: touch.clientY,
      px: state.mapPan.x,
      py: state.mapPan.y
    };
  }
}

function onTouchMove(event) {
  if (event.touches.length === 2 && state.lastPinchDist !== null) {
    event.preventDefault();
    const distance = distanceBetweenTouches(event.touches);
    zoomTo(state.mapZoom * (distance / state.lastPinchDist));
    state.lastPinchDist = distance;
  } else if (event.touches.length === 1 && state.panStart) {
    const touch = event.touches[0];
    const dx = touch.clientX - state.panStart.mx;
    const dy = touch.clientY - state.panStart.my;
    state.mapPan = clampPan(
      state.mapZoom,
      state.panStart.px + dx,
      state.panStart.py + dy
    );
    applyMapTransform(false);
  }
}

function stopTouchPan() {
  state.lastPinchDist = null;
  state.panStart = null;
  applyMapTransform(true);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function initModal() {
  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (state.modalCard) closeModal();
    }
  });
}

function initMapImageFallback() {
  campusMap.addEventListener('error', () => {
    campusMap.classList.add('hidden');
    mapFallback.classList.remove('hidden');
  });
}

function init() {
  renderCarousel();
  renderLegend();
  renderMapPins();
  renderInfoPanel();
  applyMapTransform(false);
  initModal();
  initMapImageFallback();
  startCarouselInterval();

  $('#prevCard').addEventListener('click', () => nudgeCarousel(-1));
  $('#nextCard').addEventListener('click', () => nudgeCarousel(1));

  window.addEventListener('resize', updateVisibleCount);

  mapSearch.addEventListener('input', () => {
    state.searchQuery = mapSearch.value;
    updateSearchUI();
  });

  clearSearch.addEventListener('click', () => {
    state.searchQuery = '';
    updateSearchUI();
    mapSearch.focus();
  });

  zoomOut.addEventListener('click', () => zoomTo(state.mapZoom - 0.3));
  zoomIn.addEventListener('click', () => zoomTo(state.mapZoom + 0.3));
  zoomReset.addEventListener('click', () => {
    state.mapZoom = 1;
    state.mapPan = { x: 0, y: 0 };
    applyMapTransform(true);
  });

  mapStage.addEventListener('wheel', onMapWheel, { passive: false });
  mapStage.addEventListener('mousedown', onMouseDown);
  mapStage.addEventListener('mousemove', onMouseMove);
  mapStage.addEventListener('mouseup', stopMousePan);
  mapStage.addEventListener('mouseleave', stopMousePan);
  mapStage.addEventListener('touchstart', onTouchStart, { passive: true });
  mapStage.addEventListener('touchmove', onTouchMove, { passive: false });
  mapStage.addEventListener('touchend', stopTouchPan);
}

document.addEventListener('DOMContentLoaded', init);
