window.render_predreysovoy = function() {
  const el = document.getElementById('screen-predreysovoy');
  if (el.dataset.rendered) return;
  el.dataset.rendered = '1';

  const trips = [
    { id:1, route:'Астана → Павлодар',      time:'14:00', bus:'797 AKR 01', driver:'Сейтов А.Б.',  status:'active',       statusLabel:'В рейсе',              statusClass:'b-blue',   pipeline:['done','done','done','done','done','active','wait'], blockReason:null },
    { id:2, route:'Астана → Кокшетау',      time:'16:30', bus:'388 BKL 01', driver:'Жаков Е.М.',   status:'pending-tech', statusLabel:'Ожидает техосмотр',    statusClass:'b-yellow', pipeline:['done','done','active','wait','wait','wait','wait'], blockReason:null },
    { id:3, route:'Астана → Костанай',      time:'19:00', bus:'124 VNM 01', driver:'Нуров Б.А.',   status:'blocked',      statusLabel:'Отстранён — медосмотр', statusClass:'b-red',    pipeline:['done','block','wait','wait','wait','wait','wait'], blockReason:'Выявлено повышенное давление (160/100). Водитель отстранён. Назначен Сарсенов М.К.' },
    { id:4, route:'Астана → Петропавловск', time:'08:00', bus:'797 AKR 01', driver:'Сейтов А.Б.',  status:'done',         statusLabel:'Завершён',              statusClass:'b-gray',   pipeline:['done','done','done','done','done','done','done'],  blockReason:null },
  ];

  const pipeLabels = ['Путевой лист','Медосмотр','Техосмотр','Инструктаж','Нач. смены','В рейсе','Послерейс.'];

  const tripLogs = {
    1: [
      {init:'ДС', role:'Диспетчер',  name:'Омарова К.Р.', action:'Путевой лист оформлен, маршрут назначен',  time:'08:45', ok:true,  bg:'#EFF4FF', tc:'#1E40AF'},
      {init:'МС', role:'Медсестра',  name:'Бекова А.Т.',  action:'Предрейсовый медосмотр — допущен',         time:'09:10', ok:true,  bg:'#FDF2F8', tc:'#9D174D'},
      {init:'МХ', role:'Механик',    name:'Дюсенов С.А.', action:'Техосмотр пройден, выпуск разрешён',       time:'09:25', ok:true,  bg:'#FFF7ED', tc:'#9A3412'},
      {init:'ВД', role:'Водитель',   name:'Сейтов А.Б.',  action:'Автобус принят, исправен',                 time:'09:30', ok:true,  bg:'#F0FDF4', tc:'#166534'},
      {init:'НС', role:'Нач. смены', name:'Алиев Т.Б.',   action:'Инструктаж проведён, выпуск утверждён',   time:'09:40', ok:true,  bg:'#EDE9FE', tc:'#5B21B6'},
    ],
    2: [
      {init:'ДС', role:'Диспетчер', name:'Омарова К.Р.', action:'Путевой лист оформлен',            time:'13:20', ok:true, bg:'#EFF4FF', tc:'#1E40AF'},
      {init:'МС', role:'Медсестра', name:'Бекова А.Т.',  action:'Предрейсовый медосмотр — допущен', time:'13:45', ok:true, bg:'#FDF2F8', tc:'#9D174D'},
      {init:'МХ', role:'Механик',   name:'Дюсенов С.А.', action:'Техосмотр в процессе…',            time:'14:00', ok:true, bg:'#FFF7ED', tc:'#9A3412'},
    ],
    3: [
      {init:'ДС', role:'Диспетчер', name:'Омарова К.Р.', action:'Путевой лист оформлен',                   time:'16:10', ok:true,  bg:'#EFF4FF', tc:'#1E40AF'},
      {init:'МС', role:'Медсестра', name:'Бекова А.Т.',  action:'Отстранён: АД 160/100, алкоголь отриц.',  time:'16:30', ok:false, bg:'#FDF2F8', tc:'#9D174D'},
    ],
    4: [
      {init:'ДС', role:'Диспетчер',  name:'Омарова К.Р.', action:'Путевой лист оформлен',                     time:'06:00', ok:true, bg:'#EFF4FF', tc:'#1E40AF'},
      {init:'МС', role:'Медсестра',  name:'Бекова А.Т.',  action:'Предрейсовый медосмотр — допущен',          time:'06:20', ok:true, bg:'#FDF2F8', tc:'#9D174D'},
      {init:'МХ', role:'Механик',    name:'Дюсенов С.А.', action:'Техосмотр пройден, выпуск разрешён',        time:'06:35', ok:true, bg:'#FFF7ED', tc:'#9A3412'},
      {init:'ВД', role:'Водитель',   name:'Сейтов А.Б.',  action:'Автобус принят, исправен',                  time:'06:40', ok:true, bg:'#F0FDF4', tc:'#166534'},
      {init:'НС', role:'Нач. смены', name:'Алиев Т.Б.',   action:'Инструктаж проведён, выпуск утверждён',    time:'06:50', ok:true, bg:'#EDE9FE', tc:'#5B21B6'},
      {init:'МС', role:'Медсестра',  name:'Бекова А.Т.',  action:'Послерейсовый медосмотр — норма',           time:'14:15', ok:true, bg:'#FDF2F8', tc:'#9D174D'},
      {init:'МХ', role:'Механик',    name:'Дюсенов С.А.', action:'Послерейсовый техосмотр, одометр 148 650', time:'14:20', ok:true, bg:'#FFF7ED', tc:'#9A3412'},
    ],
  };

  function badgeStyle(cls) {
    if (cls==='b-blue')   return 'background:#DBEAFE;color:#1E40AF';
    if (cls==='b-yellow') return 'background:#FEF9C3;color:#854D0E';
    if (cls==='b-red')    return 'background:#FEE2E2;color:#991B1B';
    if (cls==='b-green')  return 'background:#DCFCE7;color:#166534';
    return 'background:#F3F4F6;color:#374151';
  }

  function buildPipeline(steps) {
    const dotCss = {
      done:   'background:#DCFCE7;border:1.5px solid #22C55E',
      active: 'background:#DBEAFE;border:1.5px solid #3B82F6',
      wait:   'background:var(--color-background-primary);border:1.5px solid var(--color-border-secondary)',
      block:  'background:#FEE2E2;border:1.5px solid #EF4444',
    };
    const icons = {
      done:   '<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3" stroke="#16A34A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      active: '<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="3" fill="#3B82F6"/></svg>',
      wait:   '<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="3" fill="var(--color-border-secondary)"/></svg>',
      block:  '<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="#EF4444" stroke-width="1.4" stroke-linecap="round"/></svg>',
    };
    const lc = { done:'#166534', active:'#1E40AF', wait:'var(--color-text-tertiary)', block:'#991B1B' };
    const line = { done:'#22C55E', active:'#93C5FD', wait:'var(--color-border-tertiary)', block:'#FECACA' };

    let h = '<div style="display:flex;align-items:flex-start;padding:10px 14px 12px;background:var(--color-background-secondary);border-top:0.5px solid var(--color-border-tertiary)">';
    steps.forEach((s, i) => {
      const prev = i > 0 ? steps[i-1] : null;
      const prevLine = prev ? line[prev==='done'?'done':prev==='block'?'block':'wait'] : null;
      const nextLine = i < steps.length-1 ? line[s==='done'?'done':s==='block'?'block':'wait'] : null;
      h += `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;flex:1;min-width:0">`;
      h += `<div style="display:flex;align-items:center;width:100%">`;
      if (prevLine) h += `<div style="flex:1;height:1.5px;background:${prevLine}"></div>`;
      h += `<div style="width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;${dotCss[s]}">${icons[s]}</div>`;
      if (nextLine) h += `<div style="flex:1;height:1.5px;background:${nextLine}"></div>`;
      h += `</div>`;
      h += `<div style="font-size:9px;color:${lc[s]};text-align:center;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:54px">${pipeLabels[i]}</div>`;
      h += `</div>`;
    });
    h += '</div>';
    return h;
  }

  function buildLogs(id) {
    const logs = tripLogs[id];
    if (!logs || !logs.length) return '<div style="font-size:12px;color:var(--color-text-secondary);padding:8px 0">Проверки ещё не проводились</div>';
    return logs.map(l => `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:0.5px solid var(--color-border-tertiary)">
        <div style="display:flex;align-items:center;gap:9px">
          <div style="width:28px;height:28px;border-radius:50%;background:${l.bg};color:${l.tc};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:500;flex-shrink:0">${l.init}</div>
          <div>
            <div style="font-size:12px;font-weight:500;color:var(--color-text-primary)">${l.role} — ${l.name}</div>
            <div style="font-size:11px;color:var(--color-text-secondary)">${l.action}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
          <div style="font-size:11px;color:var(--color-text-secondary)">${l.time}</div>
          <span style="font-size:10px;font-weight:500;padding:2px 7px;border-radius:20px;${l.ok?'background:#DCFCE7;color:#166534':'background:#FEE2E2;color:#991B1B'}">${l.ok?'✓':'✗'}</span>
        </div>
      </div>`).join('');
  }

  function busStroke(status) {
    if (status==='active') return {s:'#3B82F6',bg:'#EFF4FF'};
    if (status==='blocked') return {s:'#EF4444',bg:'#FEF2F2'};
    return {s:'#6B7280',bg:'var(--color-background-secondary)'};
  }

  const tripCards = trips.map(t => {
    const bc = busStroke(t.status);
    return `
    <div style="border:0.5px solid var(--color-border-tertiary);border-radius:var(--border-radius-md);overflow:hidden;margin-bottom:10px">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:11px 14px;background:var(--color-background-primary);cursor:pointer" onclick="wayo_toggle(${t.id})">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:34px;height:34px;border-radius:var(--border-radius-md);background:${bc.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="10" rx="2" stroke="${bc.s}" stroke-width="1.4"/><circle cx="5.5" cy="15" r="1.5" fill="${bc.s}"/><circle cx="14.5" cy="15" r="1.5" fill="${bc.s}"/><path d="M2 9h16" stroke="${bc.s}" stroke-width="1.2"/></svg>
          </div>
          <div>
            <div style="font-size:13px;font-weight:500;color:var(--color-text-primary)">${t.route}</div>
            <div style="font-size:11px;color:var(--color-text-secondary);margin-top:1px">${t.time} · ${t.bus} · ${t.driver}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:7px">
          ${t.blockReason ? '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#EF4444" stroke-width="1.3"/><path d="M8 5v3.5M8 10.5v.5" stroke="#EF4444" stroke-width="1.3" stroke-linecap="round"/></svg>' : ''}
          <span style="font-size:10px;font-weight:500;padding:2px 8px;border-radius:20px;${badgeStyle(t.statusClass)}">${t.statusLabel}</span>
          <svg id="wa-${t.id}" width="13" height="13" viewBox="0 0 16 16" fill="none" style="transition:transform 0.2s;flex-shrink:0"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        </div>
      </div>
      ${buildPipeline(t.pipeline)}
      <div id="wd-${t.id}" style="display:none;border-top:0.5px solid var(--color-border-tertiary)">
        ${t.blockReason ? `<div style="padding:10px 14px;background:#FEF2F2;border-bottom:0.5px solid #FECACA;display:flex;gap:8px;align-items:flex-start"><svg width="13" height="13" viewBox="0 0 16 16" fill="none" style="flex-shrink:0;margin-top:1px"><circle cx="8" cy="8" r="6" stroke="#EF4444" stroke-width="1.3"/><path d="M8 5v3.5M8 10.5v.5" stroke="#EF4444" stroke-width="1.3" stroke-linecap="round"/></svg><span style="font-size:12px;color:#991B1B">${t.blockReason}</span></div>` : ''}
        <div style="padding:12px 14px">
          <div style="font-size:11px;font-weight:500;color:var(--color-text-secondary);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px">Журнал проверок</div>
          ${buildLogs(t.id)}
          <div style="display:flex;gap:6px;margin-top:10px">
            <button onclick="showToast('Путевой лист распечатан')" style="flex:1;font-size:11px;padding:6px 0;border-radius:6px;border:0.5px solid var(--color-border-secondary);background:var(--color-background-primary);color:var(--color-text-primary);cursor:pointer;font-family:var(--font)">Печать путевого листа</button>
            <button onclick="showToast('QR-код скопирован')" style="font-size:11px;padding:6px 12px;border-radius:6px;border:0.5px solid var(--color-border-secondary);background:var(--color-background-primary);color:var(--color-text-primary);cursor:pointer;font-family:var(--font)">QR</button>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');

  const buses = [
    {plate:'797 AKR 01', brand:'Yutong',    tech:true,  med:true,  statusLabel:'В рейсе',     sb:'b-blue',   s:'#3B82F6', bg:'#EFF4FF'},
    {plate:'388 BKL 01', brand:'King Long', tech:null,  med:true,  statusLabel:'Техосмотр…',  sb:'b-yellow', s:'#F59E0B', bg:'#FFFBEB'},
    {plate:'124 VNM 01', brand:'Higer',     tech:false, med:false, statusLabel:'Заблокирован',sb:'b-red',    s:'#EF4444', bg:'#FEF2F2'},
  ];

  el.innerHTML = `
<div style="display:grid;grid-template-columns:1fr 290px;gap:14px;align-items:start">
  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:13px;font-weight:500;color:var(--color-text-primary)">Рейсы сегодня — предрейсовый статус</div>
      <button onclick="openModal('modal-putevoy')" style="font-size:12px;padding:6px 13px;border-radius:6px;background:#1A56DB;color:#fff;border:none;cursor:pointer;display:flex;align-items:center;gap:5px;font-family:var(--font)">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
        Новый путевой лист
      </button>
    </div>
    ${tripCards}
  </div>

  <div style="display:flex;flex-direction:column;gap:12px">
    <div style="background:var(--color-background-primary);border:0.5px solid var(--color-border-tertiary);border-radius:var(--border-radius-lg);padding:14px 16px">
      <div style="font-size:13px;font-weight:500;margin-bottom:12px;color:var(--color-text-primary)">Статус автобусов</div>
      ${buses.map(b => `
      <div style="display:flex;align-items:center;gap:8px;padding:9px 0;border-bottom:0.5px solid var(--color-border-tertiary)">
        <div style="width:32px;height:32px;border-radius:var(--border-radius-md);background:${b.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="10" rx="2" stroke="${b.s}" stroke-width="1.4"/><circle cx="5.5" cy="15" r="1.5" fill="${b.s}"/><circle cx="14.5" cy="15" r="1.5" fill="${b.s}"/><path d="M2 9h16" stroke="${b.s}" stroke-width="1.2"/></svg>
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:500;color:var(--color-text-primary)">${b.plate}</div>
          <div style="font-size:10px;color:var(--color-text-secondary)">${b.brand}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px">
          <div style="display:flex;gap:3px">
            <span style="font-size:9px;font-weight:500;padding:1px 5px;border-radius:20px;${b.tech===true?'background:#DCFCE7;color:#166534':b.tech===false?'background:#FEE2E2;color:#991B1B':'background:#FEF9C3;color:#854D0E'}">Тех ${b.tech===true?'✓':b.tech===false?'✗':'…'}</span>
            <span style="font-size:9px;font-weight:500;padding:1px 5px;border-radius:20px;${b.med?'background:#DCFCE7;color:#166534':'background:#FEE2E2;color:#991B1B'}">Мед ${b.med?'✓':'✗'}</span>
          </div>
          <span style="font-size:9px;font-weight:500;padding:1px 6px;border-radius:20px;${badgeStyle(b.sb)}">${b.statusLabel}</span>
        </div>
      </div>`).join('')}
      <div style="padding-top:8px;font-size:10px;color:var(--color-text-tertiary)">Обновлено: 14:02</div>
    </div>

    <div style="background:var(--color-background-primary);border:0.5px solid var(--color-border-tertiary);border-radius:var(--border-radius-lg);padding:14px 16px">
      <div style="font-size:13px;font-weight:500;margin-bottom:10px;color:var(--color-text-primary)">Задачи сейчас</div>
      ${[
        {init:'ДС', name:'Диспетчер',  task:'Путевой лист 16:30',       done:true,  bg:'#EFF4FF', tc:'#1E40AF'},
        {init:'МС', name:'Медсестра',  task:'Жаков Е.М. ожидает',       done:false, bg:'#FDF2F8', tc:'#9D174D'},
        {init:'МХ', name:'Механик',    task:'388 BKL 01 на осмотре',    done:false, bg:'#FFF7ED', tc:'#9A3412'},
        {init:'НС', name:'Нач. смены', task:'3 рейса — внимание',       done:false, bg:'#EDE9FE', tc:'#5B21B6'},
      ].map(r => `
      <div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:0.5px solid var(--color-border-tertiary)">
        <div style="width:26px;height:26px;border-radius:50%;background:${r.bg};color:${r.tc};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:500;flex-shrink:0">${r.init}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:500;color:var(--color-text-primary)">${r.name}</div>
          <div style="font-size:11px;color:var(--color-text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.task}</div>
        </div>
        <span style="font-size:9px;font-weight:500;padding:2px 6px;border-radius:20px;flex-shrink:0;${r.done?'background:#DCFCE7;color:#166534':'background:#FEF9C3;color:#854D0E'}">${r.done?'Готово':'Ожидает'}</span>
      </div>`).join('')}
    </div>

    <div style="background:var(--color-background-primary);border:0.5px solid var(--color-border-tertiary);border-radius:var(--border-radius-lg);padding:14px 16px">
      <div style="font-size:13px;font-weight:500;margin-bottom:10px;color:var(--color-text-primary)">Итог дня</div>
      ${[
        {label:'Путевых листов',    val:'4', color:'#1A56DB'},
        {label:'Допущено к рейсу', val:'3', color:'#16A34A'},
        {label:'Отстранено',       val:'1', color:'#EF4444'},
        {label:'Завершено рейсов', val:'1', color:'#6B7280'},
      ].map(s => `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:0.5px solid var(--color-border-tertiary)">
        <div style="font-size:12px;color:var(--color-text-secondary)">${s.label}</div>
        <div style="font-size:15px;font-weight:500;color:${s.color}">${s.val}</div>
      </div>`).join('')}
    </div>
  </div>
</div>

<div class="modal-backdrop" id="modal-putevoy">
  <div style="background:var(--color-background-primary);border-radius:var(--border-radius-lg);border:0.5px solid var(--color-border-tertiary);width:460px;padding:22px 24px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
      <div style="font-size:15px;font-weight:500;color:var(--color-text-primary)">Создать путевой лист</div>
      <button onclick="closeModal('modal-putevoy')" style="width:28px;height:28px;border-radius:6px;border:none;background:var(--color-background-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--color-text-secondary)">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
      </button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
      <div>
        <label style="font-size:12px;font-weight:500;display:block;margin-bottom:5px;color:var(--color-text-primary)">Рейс</label>
        <select style="width:100%;padding:7px 10px;border:0.5px solid var(--color-border-secondary);border-radius:8px;font-size:12px;font-family:var(--font);background:var(--color-background-primary);color:var(--color-text-primary);outline:none">
          <option>Астана → Кокшетау · 16:30</option>
          <option>Астана → Костанай · 19:00</option>
        </select>
      </div>
      <div>
        <label style="font-size:12px;font-weight:500;display:block;margin-bottom:5px;color:var(--color-text-primary)">Водитель</label>
        <select style="width:100%;padding:7px 10px;border:0.5px solid var(--color-border-secondary);border-radius:8px;font-size:12px;font-family:var(--font);background:var(--color-background-primary);color:var(--color-text-primary);outline:none">
          <option>Жаков Е.М.</option>
          <option>Сарсенов М.К.</option>
          <option>Нуров Б.А.</option>
        </select>
      </div>
    </div>
    <div style="background:#EFF4FF;border-left:3px solid #1A56DB;border-radius:0 8px 8px 0;padding:10px 12px;font-size:12px;color:#1E40AF;margin-bottom:16px">
      После создания медсестра и механик получат задачи на предрейсовые проверки.
    </div>
    <div style="display:flex;gap:8px;justify-content:flex-end">
      <button onclick="closeModal('modal-putevoy')" style="font-size:12px;padding:7px 14px;border-radius:8px;border:0.5px solid var(--color-border-secondary);background:transparent;color:var(--color-text-primary);cursor:pointer;font-family:var(--font)">Отмена</button>
      <button onclick="closeModal('modal-putevoy');showToast('Путевой лист создан. Уведомления отправлены.')" style="font-size:12px;padding:7px 14px;border-radius:8px;background:#1A56DB;color:#fff;border:none;cursor:pointer;font-family:var(--font)">Создать</button>
    </div>
  </div>
</div>`;

  window.wayo_toggle = function(id) {
    const d = document.getElementById('wd-' + id);
    const a = document.getElementById('wa-' + id);
    if (!d) return;
    const open = d.style.display !== 'none';
    d.style.display = open ? 'none' : 'block';
    if (a) a.style.transform = open ? '' : 'rotate(180deg)';
  };
};
