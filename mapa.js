(() => {
  const locations = [
    { id: 'entrada', name: 'Acceso peatonal / entrada principal', icon: 'navigation', x: 56, y: 96, category: 'services', kind: 'Punto de acceso', details: ['Inicio de recorridos peatonales'] },
    { id: 'servicios', name: 'Servicios Escolares', icon: 'clipboard-list', x: 53, y: 24, category: 'admin', kind: 'Trámites escolares', details: ['Kárdex y boletas', 'Servicio social', 'Inscripciones y constancias'], hours: 'Lunes a viernes · 9:00 a 17:00' },
    { id: 'edificio-a1', name: 'Edificio A1 · Salones 12–22', icon: 'building-2', x: 12, y: 40, category: 'study', kind: 'Edificio académico', details: ['Salones identificados del 12 al 22'] },
    { id: 'edificio-b1', name: 'Edificio B1 · Salones 10–11', icon: 'building-2', x: 20, y: 14, category: 'study', kind: 'Edificio académico', details: ['Aulas académicas'] },
    { id: 'edificio-b2', name: 'Edificio B2 · Salones 8–9', icon: 'building-2', x: 20, y: 24, category: 'study', kind: 'Edificio académico', details: ['Aulas académicas'] },
    { id: 'edificio-b3', name: 'Edificio B3 · Salones 6–7', icon: 'building-2', x: 20, y: 36, category: 'study', kind: 'Edificio académico', details: ['Aulas académicas'] },
    { id: 'edificio-b8', name: 'Edificio B8 · Salones 4–5', icon: 'building-2', x: 35, y: 24, category: 'study', kind: 'Edificio académico', details: ['Aulas académicas'] },
    { id: 'edificio-b0', name: 'Edificio B0 · Salones 2–3', icon: 'building-2', x: 35, y: 36, category: 'study', kind: 'Edificio académico', details: ['Aulas académicas'] },
    { id: 'edificio-b', name: 'Edificio B · Salones 1–10', icon: 'building-2', x: 29, y: 45, category: 'study', kind: 'Edificio académico', details: ['Salones 1 al 10', 'Laboratorios de Cómputo 1 y 2'] },
    { id: 'lab-b4', name: 'Edificio b4 · Laboratorio', icon: 'flask-conical', x: 20, y: 49, category: 'study', kind: 'Laboratorio', details: ['Consulta disponibilidad con tu coordinación'] },
    { id: 'lab-b5', name: 'Edificio b5 · Salón 1 y cómputo', icon: 'monitor', x: 35, y: 49, category: 'study', kind: 'Laboratorio y aulas', details: ['Salón 1', 'Laboratorio de cómputo'] },
    { id: 'laboratorio-computo', name: 'Laboratorio de Cómputo · Office 1', icon: 'monitor', x: 23, y: 62, category: 'study', kind: 'Laboratorio', details: ['Consulta horarios de acceso en el campus'] },
    { id: 'biblioteca', name: 'Biblioteca · Office 2', icon: 'library', x: 35, y: 62, category: 'study', kind: 'Estudio y consulta', details: ['Espacio de estudio y consulta'] },
    { id: 'coordinaciones', name: 'Coordinaciones de Carrera · e2', icon: 'handshake', x: 53, y: 37, category: 'admin', kind: 'Atención académica', details: ['Orientación académica', 'Coordinaciones de carrera'] },
    { id: 'caja', name: 'Caja / área financiera · e3', icon: 'credit-card', x: 53, y: 51, category: 'admin', kind: 'Pagos y servicios', details: ['Consulta horarios y formas de pago con el área'] },
    { id: 'cafeteria', name: 'Cafetería', icon: 'utensils', x: 58, y: 67, category: 'food', kind: 'Alimentos', details: ['Ubicación referencial en el plano del campus'] },
    { id: 'banos', name: 'Baños', icon: 'bath', x: 54, y: 63, category: 'services', kind: 'Servicios', details: ['Ubicación referencial junto al área central'] },
    { id: 'duela', name: 'Duela deportiva · Área 1', icon: 'dumbbell', x: 15, y: 81, category: 'services', kind: 'Deportes y créditos', details: ['Actividades deportivas y complementarias'] },
    { id: 'actividades', name: 'Áreas de actividades · Áreas 2 y 3', icon: 'drama', x: 39, y: 81, category: 'services', kind: 'Cultura y actividades', details: ['Espacios de actividades complementarias'] },
    { id: 'edificio-f1', name: 'Edificio F1 · Salones 23–30', icon: 'building-2', x: 62, y: 75, category: 'study', kind: 'Edificio académico', details: ['Salones identificados del 23 al 30'] },
    { id: 'estacionamiento', name: 'Estacionamiento', icon: 'car', x: 82, y: 52, category: 'services', kind: 'Acceso vehicular', details: ['Estacionamiento del campus'] }
  ];

  const viewport = document.querySelector('#mapViewport');
  const canvas = document.querySelector('#mapCanvas');
  const markerLayer = document.querySelector('#mapMarkers');
  const routeLine = document.querySelector('#routeLine');
  const routeCard = document.querySelector('#routeCard');
  const search = document.querySelector('#locationSearch');
  const suggestions = document.querySelector('#searchSuggestions');
  const clearSearch = document.querySelector('#clearSearch');
  const originSelect = document.querySelector('#originSelect');
  const destinationSelect = document.querySelector('#destinationSelect');
  const swapButton = document.querySelector('#swapRoute');
  const currentOriginLabel = document.querySelector('#currentOriginLabel');
  const zoomLabel = document.querySelector('#zoomLabel');
  const params = new URLSearchParams(location.search);
  const state = {
    origin: locations.some((place) => place.id === params.get('origen')) ? params.get('origen') : 'entrada',
    destination: locations.some((place) => place.id === params.get('destino')) ? params.get('destino') : '',
    filter: null, zoom: 1, panX: 0, panY: 0, pointer: null
  };

  const getLocation = (id) => locations.find((place) => place.id === id);
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
  const iconMarkup = (icon) => `<i data-lucide="${icon}"></i>`;
  const refreshIcons = () => window.lucide?.createIcons();

  const populateSelects = () => {
    const origin = state.origin;
    const destination = state.destination;
    originSelect.replaceChildren(...locations.map((place) => new Option(place.name, place.id)));
    const destinationLocations = locations.filter((place) => !state.filter || place.category === state.filter);
    if (!destinationLocations.some((place) => place.id === destination)) state.destination = '';
    destinationSelect.replaceChildren(new Option('Selecciona un destino', ''), ...destinationLocations
      .map((place) => new Option(place.name, place.id)));

    originSelect.value = origin;
    destinationSelect.value = state.destination;
    swapButton.disabled = !state.destination;
    currentOriginLabel.textContent = getLocation(state.origin)?.name || 'Acceso peatonal principal';
  };

  const renderMarkers = () => {
    const query = search.value.trim().toLocaleLowerCase('es');
    markerLayer.innerHTML = locations.map((place) => {
      const matchesQuery = !query || `${place.name} ${place.kind} ${place.details.join(' ')}`
        .toLocaleLowerCase('es').includes(query);
      const matchesFilter = !state.filter || place.category === state.filter;
      const isOrigin = place.id === state.origin;
      const isDestination = place.id === state.destination;
      const muted = !(matchesQuery && matchesFilter) && !isOrigin && !isDestination;
      return `<button class="map-marker${isOrigin ? ' is-origin' : ''}${isDestination ? ' is-destination' : ''}${muted ? ' is-muted' : ''}" style="left:${place.x}%;top:${place.y}%" type="button" data-location="${place.id}" aria-label="${escapeHtml(place.name)}${isOrigin ? ', origen' : ''}${isDestination ? ', destino' : ''}" title="${escapeHtml(place.name)}">${iconMarkup(place.icon)}</button>`;
    }).join('');
    refreshIcons();
    markerLayer.querySelectorAll('[data-location]').forEach((marker) => {
      marker.addEventListener('click', () => setDestination(marker.dataset.location));
    });
  };

  const mapRoutePoints = (origin, destination) => [
    `${origin.x * 10},${origin.y * 6.25}`,
    `${destination.x * 10},${destination.y * 6.25}`
  ].join(' ');

  const directionFor = (origin, destination) => {
    const dx = destination.x - origin.x;
    const dy = destination.y - origin.y;
    const horizontal = Math.abs(dx) < 4 ? '' : dx > 0 ? 'a la derecha en el plano' : 'a la izquierda en el plano';
    const vertical = Math.abs(dy) < 4 ? '' : dy > 0 ? 'hacia la parte inferior del plano' : 'hacia la parte superior del plano';
    return [horizontal, vertical].filter(Boolean).join(' y ') || 'a la zona contigua del campus';
  };

  const nearbyReference = (origin, destination) => {
    const middleX = (origin.x + destination.x) / 2;
    const middleY = (origin.y + destination.y) / 2;
    const reference = locations
      .filter((place) => ![origin.id, destination.id].includes(place.id))
      .sort((first, second) => {
        const distance = (place) => (place.x - middleX) ** 2 + (place.y - middleY) ** 2;
        return distance(first) - distance(second);
      })[0];
    return reference ? reference.name : 'los corredores indicados en el plano';
  };

  const isOpenNow = () => {
    const now = new Date();
    const weekday = now.getDay() >= 1 && now.getDay() <= 5;
    const hour = now.getHours() + now.getMinutes() / 60;
    return weekday && hour >= 9 && hour < 17;
  };

  const serviceStatus = (place) => {
    if (!place.hours) return '';
    const open = isOpenNow();
    return `<span class="office-status${open ? '' : ' is-closed'}">${open ? 'Abierto ahora' : 'Cerrado ahora'} · Horario referencial: ${place.hours}</span>`;
  };

  const renderRoute = () => {
    populateSelects();
    const origin = getLocation(state.origin);
    const destination = getLocation(state.destination);
    if (!origin || !destination) {
      routeLine.setAttribute('points', '');
      routeCard.innerHTML = '<div class="route-empty"><span class="route-empty-icon"><i data-lucide="route"></i></span><div><strong>Planea tu recorrido</strong><p>Selecciona un origen y un destino, o elige un marcador en el mapa.</p></div></div>';
      refreshIcons();
      renderMarkers();
      return;
    }

    if (origin.id === destination.id) {
      routeLine.setAttribute('points', '');
      routeCard.innerHTML = `<div class="route-empty"><span class="route-empty-icon"><i data-lucide="map-pin-check"></i></span><div><strong>Ya estás en ${escapeHtml(destination.name)}</strong><p>Elige otro destino para calcular un recorrido.</p></div></div>`;
      refreshIcons();
      renderMarkers();
      return;
    }

    routeLine.setAttribute('points', mapRoutePoints(origin, destination));
    const direction = directionFor(origin, destination);
    const reference = nearbyReference(origin, destination);
    const steps = [
      `Comienza en ${origin.name} y ubica el corredor peatonal que sale de esta área.`,
      `Avanza ${direction}; usa ${reference} como referencia visual en el plano.`,
      `Sigue el corredor hasta llegar a ${destination.name}.`
    ];
    const details = destination.details.map((item) => `<span>${escapeHtml(item)}</span>`).join('');
    const servicesStatus = [origin, destination].filter((place) => place.hours)
      .map((place) => `<div class="endpoint-status"><strong>${escapeHtml(place.name)}</strong>${serviceStatus(place)}</div>`).join('');
    routeCard.innerHTML = `<div class="route-content"><div><div class="route-endpoints"><div class="route-destination"><span class="route-place-icon origin-icon">${iconMarkup(origin.icon)}</span><span><small>ORIGEN</small><strong>${escapeHtml(origin.name)}</strong></span></div><i class="endpoint-arrow" data-lucide="arrow-right"></i><div class="route-destination"><span class="route-place-icon">${iconMarkup(destination.icon)}</span><span><small>DESTINO · ${escapeHtml(destination.kind.toLocaleUpperCase('es'))}</small><strong>${escapeHtml(destination.name)}</strong></span></div></div><div class="location-details">${details}</div>${servicesStatus}</div><ol class="route-steps">${steps.map((step, index) => `<li><span class="step-number">${index + 1}</span>${escapeHtml(step)}</li>`).join('')}</ol></div><p class="route-note">Trazado directo orientativo sobre el plano disponible; no representa pasillos medidos ni distancias verificadas.</p>`;
    refreshIcons();
    renderMarkers();
  };

  function setDestination(id) {
    const place = getLocation(id);
    if (!place) return;
    state.destination = place.id;
    search.value = '';
    clearSearch.hidden = true;
    suggestions.hidden = true;
    renderRoute();
  }

  const clearDestinationSearch = () => {
    search.value = '';
    clearSearch.hidden = true;
    suggestions.hidden = true;
    renderMarkers();
    search.focus();
  };

  const renderSuggestions = () => {
    const query = search.value.trim().toLocaleLowerCase('es');
    clearSearch.hidden = !query;
    if (!query) {
      suggestions.hidden = true;
      renderMarkers();
      return;
    }
    const matches = locations.filter((place) => (!state.filter || place.category === state.filter)
      && `${place.name} ${place.kind} ${place.details.join(' ')}`.toLocaleLowerCase('es').includes(query)).slice(0, 6);
    suggestions.innerHTML = matches.length
      ? matches.map((place) => `<button class="suggestion-option" type="button" role="option" data-suggest="${place.id}"><span>${iconMarkup(place.icon)}</span><span><strong>${escapeHtml(place.name)}</strong><small>${escapeHtml(place.kind)}</small></span></button>`).join('')
      : '<div class="no-suggestions">No encontramos destinos con esos criterios.</div>';
    suggestions.hidden = false;
    suggestions.querySelectorAll('[data-suggest]').forEach((button) => {
      button.addEventListener('click', () => setDestination(button.dataset.suggest));
    });
    refreshIcons();
    renderMarkers();
  };

  const applyTransform = () => {
    const maxX = viewport.clientWidth * (state.zoom - 1) / 2;
    const maxY = viewport.clientHeight * (state.zoom - 1) / 2;
    state.panX = Math.max(-maxX, Math.min(maxX, state.panX));
    state.panY = Math.max(-maxY, Math.min(maxY, state.panY));
    canvas.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;
    zoomLabel.textContent = `${Math.round(state.zoom * 100)}%`;
    document.querySelector('#zoomOut').disabled = state.zoom <= 1;
    document.querySelector('#zoomIn').disabled = state.zoom >= 2.5;
  };

  const resetFilters = () => {
    state.filter = null;
    document.querySelectorAll('[data-filter]').forEach((chip) => {
      chip.classList.remove('is-active');
      chip.setAttribute('aria-pressed', 'false');
    });
  };

  originSelect.addEventListener('change', () => {
    state.origin = originSelect.value;
    if (state.destination === state.origin) state.destination = '';
    renderRoute();
  });
  destinationSelect.addEventListener('change', () => {
    state.destination = destinationSelect.value;
    search.value = '';
    clearSearch.hidden = true;
    suggestions.hidden = true;
    renderRoute();
  });
  swapButton.addEventListener('click', () => {
    if (!state.destination) return;
    [state.origin, state.destination] = [state.destination, state.origin];
    resetFilters();
    renderRoute();
  });

  document.querySelector('#zoomIn').addEventListener('click', () => {
    state.zoom = Math.min(2.5, +(state.zoom + .25).toFixed(2));
    applyTransform();
  });
  document.querySelector('#zoomOut').addEventListener('click', () => {
    state.zoom = Math.max(1, +(state.zoom - .25).toFixed(2));
    if (state.zoom === 1) state.panX = state.panY = 0;
    applyTransform();
  });
  document.querySelector('#zoomReset').addEventListener('click', () => {
    state.zoom = 1;
    state.panX = state.panY = 0;
    applyTransform();
  });

  viewport.addEventListener('pointerdown', (event) => {
    if (event.target.closest('.map-marker')) return;
    state.pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, panX: state.panX, panY: state.panY };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('is-dragging');
  });
  viewport.addEventListener('pointermove', (event) => {
    if (!state.pointer || state.pointer.id !== event.pointerId) return;
    const maxX = viewport.clientWidth * (state.zoom - 1) / 2;
    const maxY = viewport.clientHeight * (state.zoom - 1) / 2;
    state.panX = Math.max(-maxX, Math.min(maxX, state.pointer.panX + event.clientX - state.pointer.x));
    state.panY = Math.max(-maxY, Math.min(maxY, state.pointer.panY + event.clientY - state.pointer.y));
    applyTransform();
  });
  const stopDragging = () => {
    state.pointer = null;
    viewport.classList.remove('is-dragging');
  };
  viewport.addEventListener('pointerup', stopDragging);
  viewport.addEventListener('pointercancel', stopDragging);

  search.addEventListener('input', renderSuggestions);
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') suggestions.hidden = true;
    if (event.key === 'Enter') {
      event.preventDefault();
      suggestions.querySelector('[data-suggest]')?.click();
    }
  });
  clearSearch.addEventListener('click', clearDestinationSearch);
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.map-search-wrap')) suggestions.hidden = true;
  });
  document.querySelectorAll('[data-filter]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const active = chip.classList.contains('is-active');
      document.querySelectorAll('[data-filter]').forEach((item) => {
        item.classList.remove('is-active');
        item.setAttribute('aria-pressed', 'false');
      });
      state.filter = active ? null : chip.dataset.filter;
      if (state.filter) {
        chip.classList.add('is-active');
        chip.setAttribute('aria-pressed', 'true');
      }
      if (state.destination && state.filter && getLocation(state.destination)?.category !== state.filter) {
        state.destination = '';
      }
      renderSuggestions();
      renderRoute();
    });
  });

  populateSelects();
  renderRoute();
  applyTransform();
})();
