window.render_predreysovoy = function() {
  const el = document.getElementById('screen-predreysovoy');
  if (el.dataset.rendered) return;
  el.dataset.rendered = '1';

  const trips = [
    {
      id: 1,
      route: 'Астана → Павлодар',
      time: '14:00',
      bus: '797 AKR 01',
      driver: 'Сейтов А.Б.',
      status: 'active',
      statusLabel: 'В рейсе',
      statusClass: 'b-blue',
      pipeline: ['done','done','done','done','done','active','wait'],
      blockReason: null,
    },
    {
      id: 2,
      route: 'Астана → Кокшетау',
      time: '16:30',
      bus: '388 BKL 01',
      driver: 'Жаков Е.М.',
      status: 'pending-tech',
      statusLabel: 'Ожидает техосмотр',
      statusClass: 'b-yellow',
      pipeline: ['done','done','active','wait','wait','wait','wait'],
      blockReason: null,
    },
    {
      id: 3,
      route: 'Астана → Костанай',
      time: '19:00',
      bus: '124 VNM 01',
      driver: 'Нуров Б.А.',
      status: 'blocked',
      statusLabel: 'Отстранён — медосмотр',
      statusClass: 'b-red',
      pipeline: ['done','block','wait','wait','wait','wait','wait'],
      blockReason: 'Выявлено повышенное давление (160/100). Водитель отстранён. Назначен Сарсенов М.К.',
    },
    {
      id: 4,
      route: 'Астана → Петропавловск',
      time: '08:00',
      bus: '797 AKR 01',
      driver: 'Сейтов А.Б.',
      status: 'done',
      statusLabel: 'Завершён',
      statusClass: 'b-gray',
      pipeline: ['done','done','done','done','done','done','done'],
      blockReason: null,
    },
  ];

  const pipeLabels = ['Путевой лист','Медосмотр','Техосмотр','Инструктаж','Нач. смены','В рейсе','Послерейс.'];

  const pipeIconDone = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3" stroke="#16A34A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const pipeIconActive = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="3" fill="#3B82F6"/></svg>`;
  const pipeIconWait = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="3" fill="var(--color-border-secondary)"/></svg>`;
  const pipeIconBlock = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="#EF4444" stroke-width="1.4" stroke-linecap="round"/></svg>`;

  function pipeDot(state) {
    const icons = {done: pipeIconDone, active: pipeIconActive, wait: pipeIconWait, block: pipeIconBlock};
    const dots = {
      done: 'background:#DCFCE7;border:1.5px solid #22C55E',
      active: 'background:#DBEAFE;border:1.5px solid #3B82F6',
      wait: 'background:var(--color-background-primary);border:1.5px solid var(--color-border-secondary)',
      block: 'background:#FEE2E2;border:1.5px solid #EF4444',
    };
    return `<div style="width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;z-index:1;${dots[state]}">${icons[state]}</div>`;
  }

  function pipeConnector(state) {
    const colors = {done: '#22C55E', active: '#3B82F6', wait: 'var(--color-border-tertiary)', block: '#EF4444'};
    return `<div style="flex:1;height:1.5px;background:${colors[state]};margin:0 -1px;position:relative;top:-1px"></div>`;
  }

  function buildPipeline(steps) {
    let html = `<div style="display:flex;align-items:center;gap:0;padding:12px 14px 14px;background:var(--color-background-secondary);border-top:0.5px solid var(--color-border-tertiary)">`;
    steps.forEach((state, i) => {
      html += `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;position:relative;${i > 0 ? 'flex:1' : ''}">`;
      if (i > 0) {
        html = html.slice(0, -7);
        html += `style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;position:relative">`;
        html += `<div style="display:flex;align-items:center;width:100%;justify-content:center;position:relative">`;
        html += pipeConnector(steps[i-1] === 'done' ? 'done' : steps[i-1] === 'block' ? 'block' : 'wait');
        html += pipeDot(state);
        html += `<div style="flex:1;height:1.5px;background:var(--color-border-tertiary);visibility:hidden"></div>`;
        html += `</div>`;
      } else {
        html += `<div style="display:flex;align-items:center;width:100%;justify-content:center">`;
        html += pipeDot(state);
        html += `</div>`;
      }
      const labelColors = {done:'#166534', active:'#1E40AF', wait:'var(--color-text-tertiary)', block:'#991B1B'};
      html += `<div style="font-size:10px;color:${labelColors[state]};text-align:center;max-width:60px;line-height:1.3">${pipeLabels[i]}</div>`;
      html += `</div>`;
    });
    html += `</div>`;
    return html;
  }

  function buildSimplePipeline(steps) {
    let html = `<div style="display:flex;align-items:flex-start;gap:2px;padding:12px 14px 14px;background:var(--color-background-secondary);border-top:0.5px solid var(--color-border-tertiary)">`;
    steps.forEach((state, i) => {
      const dotColors = {
        done: 'background:#DCFCE7;border:1.5px solid #22C55E',
        active: 'background:#DBEAFE;border:1.5px solid #3B82F6',
        wait: 'background:var(--color-background-primary);border:1.5px solid var(--color-border-secondary)',
        block: 'background:#FEE2E2;border:1.5px solid #EF4444',
      };
      const icons = {done: pipeIconDone, active: pipeIconActive, wait: pipeIconWait, block: pipeIconBlock};
      const labelColors = {done:'#166534', active:'#1E40AF', wait:'var(--color-text-tertiary)', block:'#991B1B'};
      const lineColors = {done:'#22C55E', active:'#3B82F6', wait:'var(--color-border-tertiary)', block:'#EF4444'};

      html += `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;flex:1;min-width:0">`;
      html += `<div style="display:flex;align-items:center;width:100%">`;
      if (i > 0) html += `<div style="flex:1;height:1.5px;background:${lineColors[steps[i-1] === 'done' ? 'done' : steps[i-1] === 'block' ? 'block' : 'wait']}"></div>`;
      html += `<div style="width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;${dotColors[state]}">${icons[state]}</div>`;
      if (i < steps.length-1) html += `<div style="flex:1;height:1.5px;background:${lineColors[state === 'done' ? 'done' : state === 'block' ? 'block' : 'wait']}"></div>`;
      html += `</div>`;
      html += `<div style="font-size:9px;color:${labelColors[state]};text-align:center;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%">${pipeLabels[i]}</div>`;
      html += `</div>`;
    });
    html += `</div>`;
    return html;
  }

  const tripCards = trips.map(t => `
  <div style="border:0.5px solid var(--color-border-tertiary);border-radius:var(--border-radius-md);overflow:hidden;margin-bottom:10px">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:11px 14px;background:var(--color-background-primary);cursor:pointer" onclick="toggleTrip(${t.id})">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:34px;height:34px;border-radius:var(--border-radius-md);background:${t.status==='blocked'?'#FEE2E2':t.status==='active'?'#DBEAFE':'var(--color-background-secondary)'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="10" rx="2" stroke="${t.status==='blocked'?'#EF4444':t.status==='active'?'#3B82F6':'#6B7280'}" stroke-width="1.4"/><circle cx="5.5" cy="15" r="1.5" fill="${t.status==='blocked'?'#EF4444':t.status==='active'?'#3B82F6':'#6B7280'}"/><circle cx="14.5" cy="15" r="1.5" fill="${t.status==='blocked'?'#EF4444':t.status==='active'?'#3B82F6':'#6B7280'}"/><path d="M2 9h16" stroke="${t.status==='blocked'?'#EF4444':t.status==='active'?'#3B82F6':'#9CA3AF'}" stroke-width="1.2"/></svg>
        </div>
        <div>
          <div style="font-size:13px;font-weight:500;color:var(--color-text-primary)">${t.route}</div>
          <div style="font-size:11px;color:var(--color-text-secondary);margin-top:1px">${t.time} · ${t.bus} · ${t.driver}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        ${t.blockReason ? `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#EF4444" stroke-width="1.3"/><path d="M8 5v4M8 11v.5" stroke="#EF4444" stroke-width="1.3" stroke-linecap="round"/></svg>` : ''}
        <span style="font-size:10px;font-weight:500;padding:2px 8px;border-radius:20px;${
          t.statusClass==='b-green'?'background:#DCFCE7;color:#166534':
          t.statusClass==='b-yellow'?'background:#FEF9C3;color:#854D0E':
          t.statusClass==='b-red'?'background:#FEE2E2;color:#991B1B':
          t.statusClass==='b-blue'?'background:#DBEAFE;color:#1E40AF':
          'background:#F3F4F6;color:#374151'
        }">${t.statusLabel}</span>
        <svg id="arrow-${t.id}" width="13" height="13" viewBox="0 0 16 16" fill="none" style="transition:transform 0.2s"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
      </div>
    </div>
    ${buildSimplePipeline(t.pipeline)}
    <div id="trip-detail-${t.id}" style="display:none">
      ${t.blockReason ? `
      <div style="padding:10px 14px;background:#FEF2F2;border-top:0.5px solid #FECACA;display:flex;align-items:flex-start;gap:8px">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="flex-shrink:0;margin-top:1px"><circle cx="8" cy="8" r="6" stroke="#EF4444" stroke-width="1.3"/><path d="M8 5v4M8 11v.5" stroke="#EF4444" stroke-width="1.3" stroke-linecap="round"/></svg>
        <div style="font-size:12px;color:#991B1B">${t.blockReason}</div>
      </div>` : ''}
      <div style="padding:12px 14px;border-top:0.5px solid var(--color-border-tertiary)">
        <div style="font-size:11px;font-weight:500;color:var(--color-text-secondary);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px">Журнал проверок</div>
        ${tripLogs[t.id] ? tripLogs[t.id].map(log => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:0.5px solid var(--color-border-tertiary)">
          <div style="display:flex;align-items:center;gap:9px">
            <div style="width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:500;background:${log.bg};color:${log.tc};flex-shrink:0">${log.init}</div>
            <div>
              <div style="font-size:12px;font-weight:500;color:var(--color-text-primary)">${log.role} — ${log.name}</div>
              <div style="font-size:11px;color:var(--color-text-secondary)">${log.action}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <div style="font-size:11px;color:var(--color-text-secondary)">${log.time}</div>
            <span style="font-size:10px;font-weight:500;padding:2px 7px;border-radius:20px;${log.ok?'background:#DCFCE7;color:#166534':'background:#FEE2E2;color:#991B1B'}">${log.ok?'✓':'✗'}</span>
          </div>
        </div>`).join('') : '<div style="font-size:12px;color:var(--color-text-secondary);padding:8px 0">Проверки ещё не проводились</div>'}
        <div style="display:flex;gap:6px;margin-top:10px">
          <button onclick="showToast('Путевой лист распечатан')" style="flex:1;font-size:11px;padding:6px 10px;border-radius:6px;border:0.5px solid var(--color-border-secondary);background:var(--color-background-primary);color:var(--color-text-primary);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;font-family:var(--font)">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 6V2h8v4M4 12H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1M4 9h8v5H4V9Z" stroke="currentColor" stroke-width="1.3"/></svg>
            Печать путевого листа
          </button>
          <button onclick="showToast('QR-код скопирован')" style="font-size:11px;padding:6px 10px;border-radius:6px;border:0.5px solid var(--color-border-secondary);background:var(--color-background-primary);color:var(--color-text-primary);cursor:pointer;font-family:var(--font)">QR-код</button>
        </div>
      </div>
    </div>
  </div>`).join('');

  const tripLogs = {
    1: [
      {init:'ДС', role:'Диспетчер', name:'Омарова К.Р.', action:'Путевой лист оформлен, маршрут назначен', time:'08:45', ok:true, bg:'#EFF4FF', tc:'#1E40AF'},
      {init:'МС', role:'Медсестра', name:'Бекова А.Т.', action:'Предрейсовый медосмотр — допущен', time:'09:10', ok:true, bg:'#FDF2F8', tc:'#9D174D'},
      {init:'МХ', role:'Механик', name:'Дюсенов С.А.', action:'Техосмотр пройден, выпуск разрешён', time:'09:25', ok:true, bg:'#FFF7ED', tc:'#9A3412'},
      {init:'ВД', role:'Водитель', name:'Сейтов А.Б.', action:'Автобус принят, исправен', time:'09:30', ok:true, bg:'#F0FDF4', tc:'#166534'},
      {init:'НС', role:'Нач. смены', name:'Алиев Т.Б.', action:'Инструктаж проведён, выпуск утверждён', time:'09:40', ok:true, bg:'#EDE9FE', tc:'#5B21B6'},
    ],
    2: [
      {init:'ДС', role:'Диспетчер', name:'Омарова К.Р.', action:'Путевой лист оформлен', time:'13:20', ok:true, bg:'#EFF4FF', tc:'#1E40AF'},
      {init:'МС', role:'Медсестра', name:'Бекова А.Т.', action:'Предрейсовый медосмотр — допущен', time:'13:45', ok:true, bg:'#FDF2F8', tc:'#9D174D'},
      {init:'МХ', role:'Механик', name:'Дюсенов С.А.', action:'Техосмотр в процессе...', time:'14:00', ok:true, bg:'#FFF7ED', tc:'#9A3412'},
    ],
    3: [
      {init:'ДС', role:'Диспетчер', name:'Омарова К.Р.', action:'Путевой лист оформлен', time:'16:10', ok:true, bg:'#EFF4FF', tc:'#1E40AF'},
      {init:'МС', role:'Медсестра', name:'Бекова А.Т.', action:'Отстранён: АД 160/100, алкоголь отриц.', time:'16:30', ok:false, bg:'#FDF2F8', tc:'#9D174D'},
    ],
    4: [
      {init:'ДС', role:'Диспетчер', name:'Омарова К.Р.', action:'Путевой лист оформлен', time:'06:00', ok:true, bg:'#EFF4FF', tc:'#1E40AF'},
      {init:'МС', role:'Медсестра', name:'Бекова А.Т.', action:'Предрейсовый медосмотр — допущен', time:'06:20', ok:true, bg:'#FDF2F8', tc:'#9D174D'},
      {init:'МХ', role:'Механик', name:'Дюсенов С.А.', action:'Техосмотр пройден, выпуск разрешён', time:'06:35', ok:true, bg:'#FFF7ED', tc:'#9A3412'},
      {init:'ВД', role:'Водитель', name:'Сейтов А.Б.', action:'Автобус принят, исправен', time:'06:40', ok:true, bg:'#F0FDF4', tc:'#166534'},
      {init:'НС', role:'Нач. смены', name:'Алиев Т.Б.', action:'Инструктаж проведён, выпуск утверждён', time:'06:50', ok:true, bg:'#EDE9FE', tc:'#5B21B6'},
      {init:'МС', role:'Медсестра', name:'Бекова А.Т.', action:'Послерейсовый медосмотр — норма', time:'14:15', ok:true, bg:'#FDF2F8', tc:'#9D174D'},
      {init:'МХ', role:'Механик', name:'Дюсенов С.А.', action:'Послерейсовый техосмотр, одометр 148 650', time:'14:20', ok:true, bg:'#FFF7ED', tc:'#9A3412'},
    ],
  };

  el.innerHTML = `
<div style="display:grid;grid-template-columns:1fr 320px;gap:14px;align-items:start">
  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:500;color:var(--color-text-primary)">Рейсы сегодня — предрейсовый статус</div>
      <div style="display:flex;gap:6px">
        <button onclick="openModal('modal-putevoy')" style="font-size:12px;padding:6px 13px;border-radius:6px;border:0.5px solid #1A56DB;background:#1A56DB;color:#fff;cursor:pointer;display:flex;align-items:center;gap:5px;font-family:var(--font)">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
          Создать путевой лист
        </button>
      </div>
    </div>
    ${tripCards}
  </div>

  <div style="display:flex;flex-direction:column;gap:12px">
    <div style="background:var(--color-background-primary);border:0.5px solid var(--color-border-tertiary);border-radius:var(--border-radius-lg);padding:14px 16px">
      <div style="font-size:13px;font-weight:500;margin-bottom:12px">Статус автобусов</div>
      ${[
        {plate:'797 AKR 01', brand:'Yutong', status:'В рейсе', tech:true, med:true, color:'#1A56DB', bg:'#EFF4FF', sb:'b-blue'},
        {plate:'388 BKL 01', brand:'King Long', status:'Техосмотр...', tech:null, med:true, color:'#F59E0B', bg:'#FFFBEB', sb:'b-yellow'},
        {plate:'124 VNM 01', brand:'Higer', status:'Заблокирован', tech:false, med:false, color:'#EF4444', bg:'#FEF2F2', sb:'b-red'},
      ].map(b => `
      <div style="display:flex;align-items:center;gap:9px;padding:9px 0;border-bottom:0.5px solid var(--color-border-tertiary)">
        <div style="width:34px;height:34px;border-radius:var(--border-radius-md);background:${b.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="10" rx="2" stroke="${b.color}" stroke-width="1.4"/><circle cx="5.5" cy="15" r="1.5" fill="${b.color}"/><circle cx="14.5" cy="15" r="1.5" fill="${b.color}"/><path d="M2 9h16" stroke="${b.color}" stroke-width="1.2"/></svg>
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:500;color:var(--color-text-primary)">${b.plate}</div>
          <div style="font-size:11px;color:var(--color-text-secondary)">${b.brand}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px">
          <div style="display:flex;gap:3px">
            <span style="font-size:9px;font-weight:500;padding:1px 5px;border-radius:20px;${b.tech===true?'background:#DCFCE7;color:#166534':b.tech===false?'background:#FEE2E2;color:#991B1B':'background:#FEF9C3;color:#854D0E'}">Тех ${b.tech===true?'✓':b.tech===false?'✗':'...'}</span>
            <span style="font-size:9px;font-weight:500;padding:1px 5px;border-radius:20px;${b.med===true?'background:#DCFCE7;color:#166534':'background:#FEE2E2;color:#991B1B'}">Мед ${b.med?'✓':'✗'}</span>
          </div>
          <span style="font-size:9px;font-weight:500;padding:1px 6px;border-radius:20px;${
            b.sb==='b-blue'?'background:#DBEAFE;color:#1E40AF':
            b.sb==='b-yellow'?'background:#FEF9C3;color:#854D0E':
            'background:#FEE2E2;color:#991B1B'}">${b.status}</span>
        </div>
      </div>`).join('')}
      <div style="padding-top:6px;font-size:11px;color:var(--color-text-secondary)">Последнее обновление: 14:02</div>
    </div>

    <div style="background:var(--color-background-primary);border:0.5px solid var(--color-border-tertiary);border-radius:var(--border-radius-lg);padding:14px 16px">
      <div style="font-size:13px;font-weight:500;margin-bottom:12px">Роли и задачи сейчас</div>
      ${[
        {init:'ДС', name:'Диспетчер', task:'Путевой лист 16:30', done:true, bg:'#EFF4FF', tc:'#1E40AF'},
        {init:'МС', name:'Медсестра', task:'Жаков Е.М. ожидает', done:false, bg:'#FDF2F8', tc:'#9D174D'},
        {init:'МХ', name:'Механик', task:'388 BKL 01 на осмотре', done:false, bg:'#FFF7ED', tc:'#9A3412'},
        {init:'НС', name:'Нач. смены', task:'3 рейса требуют внимания', done:false, bg:'#EDE9FE', tc:'#5B21B6'},
      ].map(r => `
      <div style="display:flex;align-items:center;gap:9px;padding:8px 0;border-bottom:0.5px solid var(--color-border-tertiary)">
        <div style="width:28px;height:28px;border-radius:50%;background:${r.bg};color:${r.tc};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:500;flex-shrink:0">${r.init}</div>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:500;color:var(--color-text-primary)">${r.name}</div>
          <div style="font-size:11px;color:var(--color-text-secondary)">${r.task}</div>
        </div>
        <span style="font-size:9px;font-weight:500;padding:2px 6px;border-radius:20px;${r.done?'background:#DCFCE7;color:#166534':'background:#FEF9C3;color:#854D0E'}">${r.done?'Готово':'Ожидает'}</span>
      </div>`).join('')}
    </div>

    <div style="background:var(--color-background-primary);border:0.5px solid var(--color-border-tertiary);border-radius:var(--border-radius-lg);padding:14px 16px">
      <div style="font-size:13px;font-weight:500;margin-bottom:10px">Итог дня</div>
      ${[
        {label:'Путевых листов выдано', val:'4', color:'#1A56DB'},
        {label:'Допущено к рейсу', val:'3', color:'#16A34A'},
        {label:'Отстранено водителей', val:'1', color:'#EF4444'},
        {label:'Рейсов завершено', val:'1', color:'#6B7280'},
      ].map(s => `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:0.5px solid var(--color-border-tertiary)">
        <div style="font-size:12px;color:var(--color-text-secondary)">${s.label}</div>
        <div style="font-size:14px;font-weight:500;color:${s.color}">${s.val}</div>
      </div>`).join('')}
    </div>
  </div>
</div>

<div class="modal-backdrop" id="modal-putevoy">
  <div style="background:var(--color-background-primary);border-radius:var(--border-radius-lg);border:0.5px solid var(--color-border-tertiary);width:480px;max-height:90vh;overflow-y:auto;padding:22px 24px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
      <div style="font-size:15px;font-weight:500">Создать путевой лист</div>
      <button onclick="closeModal('modal-putevoy')" style="width:28px;height:28px;border-radius:6px;border:none;background:var(--color-background-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--color-text-secondary)">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
      </button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div style="margin-bottom:12px">
        <label style="font-size:12px;font-weight:500;display:block;margin-bottom:5px">Рейс</label>
        <select style="width:100%;padding:7px 10px;border:0.5px solid var(--color-border-secondary);border-radius:8px;font-size:12px;font-family:var(--font);background:var(--color-background-primary);color:var(--color-text-primary);outline:none">
          <option>Астана → Кокшетау · 16:30</option>
          <option>Астана → Костанай · 19:00</option>
        </select>
      </div>
      <div style="margin-bottom:12px">
        <label style="font-size:12px;font-weight:500;display:block;margin-bottom:5px">Водитель</label>
        <select style="width:100%;padding:7px 10px;border:0.5px solid var(--color-border-secondary);border-radius:8px;font-size:12px;font-family:var(--font);background:var(--color-background-primary);color:var(--color-text-primary);outline:none">
          <option>Жаков Е.М.</option>
          <option>Сарсенов М.К.</option>
          <option>Нуров Б.А.</option>
        </select>
      </div>
    </div>
    <div style="background:#EFF4FF;border-radius:8px;padding:10px 12px;font-size:12px;color:#1E40AF;margin-bottom:16px;border-left:3px solid #1A56DB;border-radius:0 8px 8px 0">
      После создания путевого листа медсестра и механик получат уведомления для прохождения предрейсовых проверок.
    </div>
    <div style="display:flex;gap:8px;justify-content:flex-end">
      <button onclick="closeModal('modal-putevoy')" style="font-size:12px;padding:7px 14px;border-radius:8px;border:0.5px solid var(--color-border-secondary);background:transparent;color:var(--color-text-primary);cursor:pointer;font-family:var(--font)">Отмена</button>
      <button onclick="closeModal('modal-putevoy');showToast('Путевой лист создан. Уведомления отправлены.')" style="font-size:12px;padding:7px 14px;border-radius:8px;border:0.5px solid #1A56DB;background:#1A56DB;color:#fff;cursor:pointer;font-family:var(--font)">Создать</button>
    </div>
  </div>
</div>`;

  window.toggleTrip = function(id) {
    const detail = document.getElementById(`trip-detail-${id}`);
    const arrow = document.getElementById(`arrow-${id}`);
    if (!detail) return;
    const isOpen = detail.style.display !== 'none';
    detail.style.display = isOpen ? 'none' : 'block';
    if (arrow) arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
  };
};
