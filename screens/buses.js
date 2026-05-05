window.render_buses = function() {
  const el = document.getElementById('screen-buses');
  if (el.dataset.rendered) return;
  el.dataset.rendered = '1';

  const buses = [
    {id:1, plate:'797 AKR 01', brand:'Yutong ZK6122', year:2019, type:'Сидячий', seats:45, status:'active', typeClass:'b-blue'},
    {id:2, plate:'388 BKL 01', brand:'King Long XMQ6127', year:2021, type:'Спальный', seats:36, status:'active', typeClass:'b-purple'},
    {id:3, plate:'124 VNM 01', brand:'Higer KLQ6129', year:2022, type:'Трансформер', seats:48, status:'inactive', typeClass:'b-green'},
  ];

  let selectedBus = buses[0];

  function seatGrid(type) {
    const rows = type === 'Спальный' ? 9 : 11;
    const cols = type === 'Спальный' ? [[0,1],[3,4]] : [[0,1],[3,4]];
    let html = `<div style="display:flex;align-items:center;justify-content:center;background:var(--bg-tertiary);border-radius:6px;padding:6px 0;margin-bottom:6px;font-size:10px;color:var(--text-tertiary)">Водитель</div>`;
    for (let r=1; r<=rows; r++) {
      html += `<div style="display:flex;align-items:center;gap:4px;margin-bottom:4px">
        <div style="width:14px;font-size:9px;color:var(--text-tertiary);text-align:center">${r}</div>`;
      [0,1].forEach(c => {
        const n = (r-1)*4 + c + 1;
        const isWindow = c===0||c===1;
        const isPremium = r<=2 && c===1;
        const seatColor = isPremium ? '#FEF3C7' : isWindow&&c===0 ? '#F0FDF4' : '#EFF4FF';
        const textColor = isPremium ? '#92400E' : isWindow&&c===0 ? '#166534' : '#1E40AF';
        const borderColor = isPremium ? '#FDE68A' : isWindow&&c===0 ? '#BBF7D0' : '#BFDBFE';
        html += `<div style="width:26px;height:26px;border-radius:4px;background:${seatColor};border:0.5px solid ${borderColor};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:500;color:${textColor};cursor:pointer" title="Место ${n}">${n}</div>`;
      });
      html += `<div style="width:10px"></div>`;
      [2,3].forEach(c => {
        const n = (r-1)*4 + c - 1;
        const isWindow = c===3;
        const isPremium = r<=2 && c===2;
        const seatColor = isPremium ? '#FEF3C7' : isWindow ? '#F0FDF4' : '#EFF4FF';
        const textColor = isPremium ? '#92400E' : isWindow ? '#166534' : '#1E40AF';
        const borderColor = isPremium ? '#FDE68A' : isWindow ? '#BBF7D0' : '#BFDBFE';
        html += `<div style="width:26px;height:26px;border-radius:4px;background:${seatColor};border:0.5px solid ${borderColor};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:500;color:${textColor};cursor:pointer" title="Место ${n}">${n}</div>`;
      });
      html += `</div>`;
    }
    return html;
  }

  function renderDetail(bus) {
    return `
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px;padding-bottom:14px;border-bottom:0.5px solid var(--border-tertiary)">
      <div>
        <div style="font-size:18px;font-weight:500;letter-spacing:-0.3px">${bus.plate}</div>
        <div style="font-size:13px;color:var(--text-secondary);margin-top:3px">${bus.brand} · ${bus.year} · ${bus.seats} мест</div>
        <div style="margin-top:6px"><span class="badge ${bus.typeClass}">${bus.type}</span> ${bus.status==='active'?'<span class="badge b-green" style="margin-left:4px">Активен</span>':'<span class="badge b-gray" style="margin-left:4px">Деактивирован</span>'}</div>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn" onclick="showToast('Редактирование автобуса')">Редактировать</button>
        <button class="btn btn-danger" onclick="showToast('Автобус деактивирован')">Деактивировать</button>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px">
      ${[
        {label:'Гос. номер', val:bus.plate},
        {label:'Тип салона', val:bus.type},
        {label:'Марка / модель', val:bus.brand},
        {label:'Год выпуска', val:bus.year},
      ].map(i=>`
      <div style="background:var(--bg-secondary);border-radius:var(--radius-md);padding:10px 12px">
        <div style="font-size:11px;color:var(--text-secondary);margin-bottom:3px">${i.label}</div>
        <div style="font-size:13px;font-weight:500">${i.val}</div>
      </div>`).join('')}
    </div>

    <div style="font-size:13px;font-weight:500;margin-bottom:10px">Схема мест</div>
    <div style="background:var(--bg-secondary);border-radius:var(--radius-md);padding:14px">
      <div style="display:flex;gap:12px;margin-bottom:10px">
        ${[
          {bg:'#EFF4FF',border:'#BFDBFE',label:'Обычное'},
          {bg:'#F0FDF4',border:'#BBF7D0',label:'У окна'},
          {bg:'#FEF3C7',border:'#FDE68A',label:'Премиум'},
        ].map(l=>`
        <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-secondary)">
          <div style="width:12px;height:12px;border-radius:3px;background:${l.bg};border:0.5px solid ${l.border}"></div>${l.label}
        </div>`).join('')}
      </div>
      ${seatGrid(bus.type)}
      <div style="margin-top:12px;padding-top:12px;border-top:0.5px solid var(--border-secondary)">
        <div style="font-size:12px;font-weight:500;margin-bottom:8px">Цены по типу мест</div>
        ${[
          {bg:'#EFF4FF',border:'#BFDBFE',label:'Обычное место',val:'4 200'},
          {bg:'#F0FDF4',border:'#BBF7D0',label:'Место у окна',val:'4 800'},
          {bg:'#FEF3C7',border:'#FDE68A',label:'Премиум место',val:'5 500'},
        ].map(p=>`
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:7px">
          <div style="display:flex;align-items:center;gap:7px;font-size:12px;color:var(--text-secondary)">
            <div style="width:12px;height:12px;border-radius:3px;background:${p.bg};border:0.5px solid ${p.border}"></div>${p.label}
          </div>
          <input value="${p.val} ₸" style="width:100px;padding:4px 8px;border:0.5px solid var(--border-secondary);border-radius:6px;font-size:12px;text-align:right;font-family:var(--font);outline:none">
        </div>`).join('')}
      </div>
    </div>`;
  }

  el.innerHTML = `
<div style="display:flex;gap:14px">
  <div style="width:270px;background:var(--bg-primary);border:0.5px solid var(--border-tertiary);border-radius:var(--radius-lg);flex-shrink:0;overflow:hidden">
    <div style="padding:10px">
      <div class="search-wrap" style="max-width:100%">
        <svg viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="4" stroke="currentColor" stroke-width="1.3"/><path d="M11 11l2.5 2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        <input class="search-input" placeholder="Поиск по номеру...">
      </div>
    </div>
    <div id="bus-list">
      ${buses.map(b=>`
      <div class="bus-list-item ${b.id===selectedBus.id?'selected':''}" data-bus-id="${b.id}"
        style="padding:12px 14px;border-bottom:0.5px solid var(--border-tertiary);cursor:pointer;display:flex;align-items:center;gap:10px;background:${b.id===selectedBus.id?'#EFF4FF':'transparent'};transition:background 0.1s"
        onmouseover="if(!this.classList.contains('selected'))this.style.background='var(--bg-secondary)'"
        onmouseout="if(!this.classList.contains('selected'))this.style.background='transparent'">
        <div style="width:38px;height:38px;border-radius:var(--radius-md);background:var(--bg-secondary);display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="10" rx="2" stroke="${b.id===selectedBus.id?'#1A56DB':'#6B7280'}" stroke-width="1.4"/><circle cx="5.5" cy="15" r="1.5" fill="${b.id===selectedBus.id?'#1A56DB':'#6B7280'}"/><circle cx="14.5" cy="15" r="1.5" fill="${b.id===selectedBus.id?'#1A56DB':'#6B7280'}"/><path d="M2 9h16" stroke="${b.id===selectedBus.id?'#1A56DB':'#9CA3AF'}" stroke-width="1.2"/></svg>
        </div>
        <div>
          <div style="font-size:12px;font-weight:500;color:${b.id===selectedBus.id?'#1A56DB':'var(--text-primary)'}">${b.plate}</div>
          <div style="font-size:11px;color:var(--text-secondary);margin-top:1px">${b.brand.split(' ')[0]} · ${b.year}</div>
          <span class="badge ${b.typeClass}" style="margin-top:3px;display:inline-block">${b.type}</span>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <div class="card" style="flex:1" id="bus-detail">
    ${renderDetail(selectedBus)}
  </div>
</div>

<!-- Modal: Add bus -->
<div class="modal-backdrop" id="modal-add-bus">
  <div class="modal">
    <div class="modal-hd">
      <div class="modal-title">Добавить автобус</div>
      <button class="modal-close" onclick="closeModal('modal-add-bus')">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
      </button>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Гос. номер</label>
        <input class="form-input" placeholder="797 AKR 01">
      </div>
      <div class="form-group">
        <label class="form-label">Марка и модель</label>
        <input class="form-input" placeholder="Yutong ZK6122">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Год выпуска</label>
        <input class="form-input" type="number" placeholder="2022">
      </div>
      <div class="form-group">
        <label class="form-label">Тип салона</label>
        <select class="form-select">
          <option>Сидячий</option>
          <option>Спальный</option>
          <option>Трансформер</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Количество мест</label>
      <input class="form-input" type="number" placeholder="45">
      <div class="form-hint">Схема мест настраивается после сохранения</div>
    </div>
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:4px">
      <button class="btn" onclick="closeModal('modal-add-bus')">Отмена</button>
      <button class="btn btn-primary" onclick="closeModal('modal-add-bus');showToast('Автобус добавлен')">Сохранить</button>
    </div>
  </div>
</div>`;

  document.querySelectorAll('.bus-list-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = parseInt(item.dataset.busId);
      selectedBus = buses.find(b => b.id === id);
      document.querySelectorAll('.bus-list-item').forEach(i => {
        const isSelected = parseInt(i.dataset.busId) === id;
        i.style.background = isSelected ? '#EFF4FF' : 'transparent';
        i.classList.toggle('selected', isSelected);
      });
      document.getElementById('bus-detail').innerHTML = renderDetail(selectedBus);
    });
  });
};
