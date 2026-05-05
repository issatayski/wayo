window.render_trips = function() {
  const el = document.getElementById('screen-trips');
  if (el.dataset.rendered) return;
  el.dataset.rendered = '1';

  const trips = [
    {id:1, route:'Астана → Павлодар', date:'05.05.2025', dep:'14:00', arr:'18:30', bus:'797 AKR 01', price:'4 200 ₸', sold:37, total:45, status:'active'},
    {id:2, route:'Астана → Кокшетау', date:'05.05.2025', dep:'16:30', arr:'19:00', bus:'388 BKL 01', price:'2 500 ₸', sold:21, total:52, status:'soon'},
    {id:3, route:'Астана → Костанай', date:'05.05.2025', dep:'19:00', arr:'01:00', bus:'124 VNM 01', price:'5 800 ₸', sold:46, total:48, status:'full'},
    {id:4, route:'Астана → Петропавловск', date:'06.05.2025', dep:'08:00', arr:'13:30', bus:'797 AKR 01', price:'4 800 ₸', sold:12, total:45, status:'soon'},
    {id:5, route:'Астана → Павлодар', date:'06.05.2025', dep:'14:00', arr:'18:30', bus:'388 BKL 01', price:'4 200 ₸', sold:0, total:36, status:'soon'},
    {id:6, route:'Астана → Кокшетау', date:'04.05.2025', dep:'10:00', arr:'12:30', bus:'124 VNM 01', price:'2 500 ₸', sold:48, total:48, status:'done'},
  ];

  const statusMap = {
    active: {label:'Активен', cls:'b-green'},
    soon:   {label:'Скоро',   cls:'b-yellow'},
    full:   {label:'Почти полон', cls:'b-red'},
    done:   {label:'Завершён', cls:'b-gray'},
    cancel: {label:'Отменён', cls:'b-red'},
  };

  el.innerHTML = `
<div class="filters">
  <div class="search-wrap">
    <svg viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="4" stroke="currentColor" stroke-width="1.3"/><path d="M11 11l2.5 2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
    <input class="search-input" placeholder="Поиск по маршруту...">
  </div>
  <select class="filter-select">
    <option>Все статусы</option>
    <option>Активен</option>
    <option>Скоро</option>
    <option>Завершён</option>
  </select>
  <select class="filter-select">
    <option>Все даты</option>
    <option>Сегодня</option>
    <option>Завтра</option>
    <option>Эта неделя</option>
  </select>
</div>

<div class="card" style="padding:0;overflow:hidden">
  <div class="tbl-wrap">
    <table>
      <thead>
        <tr>
          <th>Маршрут</th>
          <th>Дата и время</th>
          <th>Автобус</th>
          <th>Цена</th>
          <th>Заполненность</th>
          <th>Статус</th>
          <th style="width:120px"></th>
        </tr>
      </thead>
      <tbody>
        ${trips.map(t => {
          const pct = Math.round(t.sold/t.total*100);
          const barColor = pct>=90?'#EF4444':pct>=60?'#1A56DB':'#22C55E';
          const st = statusMap[t.status];
          return `<tr>
            <td>
              <div class="td-name">${t.route}</div>
            </td>
            <td>
              <div style="font-size:12px">${t.date}</div>
              <div style="font-size:11px;color:var(--text-secondary)">${t.dep} → ${t.arr}</div>
            </td>
            <td><div style="font-size:12px">${t.bus}</div></td>
            <td><div style="font-size:12px;font-weight:500">${t.price}</div></td>
            <td>
              <div class="fill-wrap">
                <div class="fill-track" style="width:64px"><div class="fill-bar" style="width:${pct}%;background:${barColor}"></div></div>
                <div class="fill-txt">${t.sold}/${t.total}</div>
              </div>
            </td>
            <td><span class="badge ${st.cls}">${st.label}</span></td>
            <td>
              <div style="display:flex;gap:5px">
                <button class="btn" style="padding:4px 9px;font-size:11px" onclick="navigate('sales')">Места</button>
                <button class="btn btn-danger" style="padding:4px 9px;font-size:11px" onclick="showToast('Рейс отменён')">Отменить</button>
              </div>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>
</div>

<!-- Modal: Add trip -->
<div class="modal-backdrop" id="modal-add-trip">
  <div class="modal" style="width:500px">
    <div class="modal-hd">
      <div class="modal-title">Создать рейс</div>
      <button class="modal-close" onclick="closeModal('modal-add-trip')">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
      </button>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Откуда</label>
        <select class="form-select">
          <option>Астана</option><option>Павлодар</option><option>Костанай</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Куда</label>
        <select class="form-select">
          <option>Павлодар</option><option>Астана</option><option>Кокшетау</option><option>Костанай</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Дата отправления</label>
        <input class="form-input" type="date">
      </div>
      <div class="form-group">
        <label class="form-label">Время отправления</label>
        <input class="form-input" type="time" value="14:00">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Автобус</label>
        <select class="form-select">
          <option>797 AKR 01 — Yutong (45 мест)</option>
          <option>388 BKL 01 — King Long (36 мест)</option>
          <option>124 VNM 01 — Higer (48 мест)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Базовая цена</label>
        <input class="form-input" placeholder="4 200 ₸">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повторение</label>
      <select class="form-select">
        <option>Однократно</option>
        <option>Ежедневно</option>
        <option>По рабочим дням</option>
        <option>По дням недели...</option>
      </select>
    </div>
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:4px">
      <button class="btn" onclick="closeModal('modal-add-trip')">Отмена</button>
      <button class="btn btn-primary" onclick="closeModal('modal-add-trip');showToast('Рейс создан')">Создать рейс</button>
    </div>
  </div>
</div>`;
};
