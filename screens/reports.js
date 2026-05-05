window.render_reports = function() {
  const el = document.getElementById('screen-reports');
  if (el.dataset.rendered) return;
  el.dataset.rendered = '1';

  const rows = [
    {date:'05.05.2025', route:'Астана → Павлодар', dep:'14:00', online:31, offline:6, total:37, gross:'155 400 ₸', commission:'11 100 ₸', net:'144 300 ₸'},
    {date:'05.05.2025', route:'Астана → Кокшетау', dep:'16:30', online:18, offline:3, total:21, gross:'52 500 ₸', commission:'4 200 ₸', net:'48 300 ₸'},
    {date:'04.05.2025', route:'Астана → Павлодар', dep:'14:00', online:40, offline:5, total:45, gross:'189 000 ₸', commission:'13 500 ₸', net:'175 500 ₸'},
    {date:'04.05.2025', route:'Астана → Костанай', dep:'19:00', online:38, offline:8, total:46, gross:'266 800 ₸', commission:'18 400 ₸', net:'248 400 ₸'},
    {date:'03.05.2025', route:'Астана → Кокшетау', dep:'10:00', online:28, offline:4, total:32, gross:'80 000 ₸', commission:'6 400 ₸', net:'73 600 ₸'},
  ];

  el.innerHTML = `
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px">
  ${[
    {accent:'#1A56DB', label:'Билетов за период', val:'181', sub:'за 7 дней'},
    {accent:'#7C3AED', label:'Выручка брутто', val:'1 240 500 ₸', sub:'за 7 дней'},
    {accent:'#F59E0B', label:'Комиссия WayO', val:'74 100 ₸', sub:'за 7 дней'},
    {accent:'#059669', label:'Выручка нетто', val:'1 166 400 ₸', sub:'к выплате'},
  ].map(m=>`
  <div class="mc">
    <div class="mc-accent" style="background:${m.accent}"></div>
    <div class="mc-label">${m.label}</div>
    <div class="mc-val" style="font-size:18px">${m.val}</div>
    <div class="mc-footer"><span class="neutral" style="font-size:11px">${m.sub}</span></div>
  </div>`).join('')}
</div>

<div class="filters">
  <select class="filter-select">
    <option>За 7 дней</option>
    <option>За 30 дней</option>
    <option>Этот месяц</option>
    <option>Произвольный период</option>
  </select>
  <select class="filter-select">
    <option>Все маршруты</option>
    <option>Астана → Павлодар</option>
    <option>Астана → Кокшетау</option>
    <option>Астана → Костанай</option>
  </select>
  <select class="filter-select">
    <option>Все способы</option>
    <option>Онлайн</option>
    <option>Касса</option>
  </select>
</div>

<div class="card" style="padding:0;overflow:hidden">
  <div style="padding:14px 18px 12px;border-bottom:0.5px solid var(--border-tertiary)">
    <div style="font-size:13px;font-weight:500">Ведомость продаж</div>
  </div>
  <div class="tbl-wrap">
    <table>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Маршрут</th>
          <th>Отпр.</th>
          <th>Онлайн</th>
          <th>Касса</th>
          <th>Итого</th>
          <th>Брутто</th>
          <th>Комиссия</th>
          <th>Нетто</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(r=>`
        <tr>
          <td style="font-size:12px">${r.date}</td>
          <td><div class="td-name" style="font-size:12px">${r.route}</div></td>
          <td style="font-size:12px">${r.dep}</td>
          <td><span class="badge b-blue">${r.online}</span></td>
          <td><span class="badge b-gray">${r.offline}</span></td>
          <td><div style="font-size:12px;font-weight:500">${r.total}</div></td>
          <td style="font-size:12px">${r.gross}</td>
          <td style="font-size:12px;color:#B45309">${r.commission}</td>
          <td style="font-size:12px;font-weight:500;color:#1A56DB">${r.net}</td>
        </tr>`).join('')}
        <tr style="background:var(--bg-secondary)">
          <td colspan="5" style="font-size:12px;font-weight:500">Итого</td>
          <td style="font-size:12px;font-weight:500">181</td>
          <td style="font-size:12px;font-weight:500">1 240 500 ₸</td>
          <td style="font-size:12px;font-weight:500;color:#B45309">74 100 ₸</td>
          <td style="font-size:12px;font-weight:500;color:#1A56DB">1 166 400 ₸</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`;
};

window.render_staff = function() {
  const el = document.getElementById('screen-staff');
  if (el.dataset.rendered) return;
  el.dataset.rendered = '1';

  el.innerHTML = `
<div class="filters">
  <div class="search-wrap">
    <svg viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="4" stroke="currentColor" stroke-width="1.3"/><path d="M11 11l2.5 2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
    <input class="search-input" placeholder="Поиск по имени...">
  </div>
  <button class="btn btn-primary" onclick="showToast('Форма добавления сотрудника')">
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
    Добавить
  </button>
</div>
<div class="card" style="padding:0;overflow:hidden">
  <div class="tbl-wrap">
    <table>
      <thead>
        <tr><th>Сотрудник</th><th>Роль</th><th>Email</th><th>Последний вход</th><th>Статус</th><th></th></tr>
      </thead>
      <tbody>
        ${[
          {init:'АА', name:'Айдос Асанов', role:'Администратор', email:'a.asanov@vokzal.kz', last:'Сегодня, 09:12', active:true},
          {init:'КС', name:'Камила Сарова', role:'Кассир', email:'k.sarova@vokzal.kz', last:'Сегодня, 08:55', active:true},
          {init:'БЕ', name:'Берик Есенов', role:'Кассир', email:'b.esenov@vokzal.kz', last:'Вчера, 18:30', active:true},
          {init:'МА', name:'Мадина Абдрахман', role:'Кассир', email:'m.abdrakman@vokzal.kz', last:'03.05.2025', active:false},
        ].map(s=>`
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:8px">
              <div style="width:30px;height:30px;border-radius:50%;background:var(--bg-secondary);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:500;color:var(--text-secondary)">${s.init}</div>
              <div class="td-name">${s.name}</div>
            </div>
          </td>
          <td><span class="badge ${s.role==='Администратор'?'b-purple':'b-gray'}">${s.role}</span></td>
          <td style="font-size:12px;color:var(--text-secondary)">${s.email}</td>
          <td style="font-size:12px;color:var(--text-secondary)">${s.last}</td>
          <td><span class="badge ${s.active?'b-green':'b-gray'}">${s.active?'Активен':'Неактивен'}</span></td>
          <td>
            <div style="display:flex;gap:5px">
              <button class="btn" style="padding:4px 9px;font-size:11px" onclick="showToast('Редактирование сотрудника')">Изменить</button>
              <button class="btn btn-danger" style="padding:4px 9px;font-size:11px" onclick="showToast('Доступ отозван')">Удалить</button>
            </div>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>`;
};

window.render_settings = function() {
  const el = document.getElementById('screen-settings');
  if (el.dataset.rendered) return;
  el.dataset.rendered = '1';

  el.innerHTML = `
<div style="max-width:600px;display:flex;flex-direction:column;gap:14px">
  <div class="card">
    <div class="card-title" style="margin-bottom:14px">Профиль компании</div>
    <div class="form-group">
      <label class="form-label">Название компании</label>
      <input class="form-input" value="ТОО «Автовокзал Астана»">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">БИН</label>
        <input class="form-input" value="180340012345">
      </div>
      <div class="form-group">
        <label class="form-label">Телефон</label>
        <input class="form-input" value="+7 (7172) 12-34-56">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Адрес автовокзала</label>
      <input class="form-input" value="г. Астана, ул. Бейбітшілік, 10">
    </div>
    <div style="display:flex;justify-content:flex-end">
      <button class="btn btn-primary" onclick="showToast('Данные сохранены')">Сохранить</button>
    </div>
  </div>

  <div class="card">
    <div class="card-title" style="margin-bottom:14px">Реквизиты для выплат</div>
    <div class="form-group">
      <label class="form-label">Банк</label>
      <select class="form-select">
        <option>Kaspi Bank</option>
        <option>Halyk Bank</option>
        <option>Freedom Bank</option>
      </select>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">IBAN</label>
        <input class="form-input" value="KZ12 5598 7654 3210 0001">
      </div>
      <div class="form-group">
        <label class="form-label">БИК</label>
        <input class="form-input" value="CASPKZKA">
      </div>
    </div>
    <div style="background:#EFF4FF;border-radius:6px;padding:10px 12px;font-size:12px;color:#1E40AF;margin-bottom:12px">
      Выплаты производятся еженедельно по пятницам за вычетом комиссии WayO.
    </div>
    <div style="display:flex;justify-content:flex-end">
      <button class="btn btn-primary" onclick="showToast('Реквизиты сохранены')">Сохранить</button>
    </div>
  </div>
</div>`;
};
