window.render_sales = function() {
  const el = document.getElementById('screen-sales');
  if (el.dataset.rendered) return;
  el.dataset.rendered = '1';

  const seats = Array.from({length:45},(_,i)=>{
    const n = i+1;
    const status = [3,7,8,12,15,16,19,21,22,23,25,28,30,31,33,34,37,38,40,41].includes(n)?'sold':[6,14,20,29].includes(n)?'hold':'free';
    return {n, status};
  });

  const passengers = [
    {seat:3,  name:'Нуров Б. А.',      doc:'054321', method:'Онлайн', consent:true,  time:'09:14'},
    {seat:7,  name:'Ахметова М. С.',    doc:'078912', method:'Касса',  consent:true,  time:'09:31'},
    {seat:8,  name:'Сейткали Д. Е.',    doc:'091234', method:'Онлайн', consent:true,  time:'10:02'},
    {seat:12, name:'Байдаулет К. Н.',   doc:'034567', method:'Онлайн', consent:true,  time:'10:18'},
    {seat:15, name:'Жаксыбеков А. Т.',  doc:'056789', method:'Касса',  consent:true,  time:'10:44'},
    {seat:16, name:'Мусина Р. О.',       doc:'067890', method:'Онлайн', consent:true,  time:'11:05'},
    {seat:19, name:'Дюсенов Е. Б.',     doc:'045678', method:'Онлайн', consent:true,  time:'11:22'},
    {seat:21, name:'Карибаев С. Н.',    doc:'023456', method:'Касса',  consent:true,  time:'11:50'},
  ];

  function seatColor(s) {
    if(s==='sold') return {bg:'#1A56DB',text:'#fff',border:'#1A56DB'};
    if(s==='hold') return {bg:'#FEF9C3',text:'#854D0E',border:'#FDE68A'};
    return {bg:'#F0FDF4',text:'#166534',border:'#BBF7D0'};
  }

  let seatGrid = `<div style="display:flex;align-items:center;justify-content:center;background:var(--bg-tertiary);border-radius:6px;padding:5px 0;margin-bottom:6px;font-size:10px;color:var(--text-tertiary);border:0.5px dashed var(--border-secondary)">Водитель</div>`;
  for(let r=0;r<11;r++){
    seatGrid += `<div style="display:flex;align-items:center;gap:4px;margin-bottom:4px">
      <div style="width:14px;font-size:9px;color:var(--text-tertiary);text-align:right">${r+1}</div>`;
    const rowSeats = seats.slice(r*4, r*4+4);
    rowSeats.forEach((s,ci)=>{
      if(ci===2) seatGrid+=`<div style="width:12px"></div>`;
      const c = seatColor(s.status);
      seatGrid+=`<div style="width:26px;height:26px;border-radius:4px;background:${c.bg};border:0.5px solid ${c.border};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:500;color:${c.text};cursor:pointer" title="${s.status==='sold'?'Занято':'Свободно'}">${s.n}</div>`;
    });
    seatGrid+=`</div>`;
  }

  el.innerHTML = `
<div style="display:grid;grid-template-columns:200px 1fr;gap:14px">

  <div style="display:flex;flex-direction:column;gap:10px">
    <div class="card" style="padding:12px 14px">
      <div style="font-size:11px;color:var(--text-secondary);margin-bottom:6px">Выбранный рейс</div>
      <div style="font-size:13px;font-weight:500">Астана → Павлодар</div>
      <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">05.05.2025 · 14:00</div>
      <div style="margin-top:8px">
        <div class="fill-wrap" style="margin-bottom:4px">
          <div class="fill-track" style="width:100%;flex:1"><div class="fill-bar" style="width:82%;background:#1A56DB"></div></div>
          <div class="fill-txt">37/45</div>
        </div>
        <div style="display:flex;gap:6px;margin-top:6px">
          <span class="badge b-blue" style="font-size:10px">37 продано</span>
          <span class="badge b-yellow" style="font-size:10px">4 hold</span>
        </div>
      </div>
    </div>

    <div class="card" style="padding:12px 14px">
      <div style="font-size:12px;font-weight:500;margin-bottom:8px">Схема мест</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">
        ${[{bg:'#1A56DB',text:'#fff',border:'#1A56DB',label:'Занято'},{bg:'#FEF9C3',text:'#854D0E',border:'#FDE68A',label:'Hold'},{bg:'#F0FDF4',text:'#166534',border:'#BBF7D0',label:'Свободно'}].map(l=>`
        <div style="display:flex;align-items:center;gap:4px;font-size:10px;color:var(--text-secondary)">
          <div style="width:12px;height:12px;border-radius:3px;background:${l.bg};border:0.5px solid ${l.border}"></div>${l.label}
        </div>`).join('')}
      </div>
      ${seatGrid}
    </div>
  </div>

  <div style="display:flex;flex-direction:column;gap:12px">
    <div class="filters">
      <div class="search-wrap">
        <svg viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="4" stroke="currentColor" stroke-width="1.3"/><path d="M11 11l2.5 2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        <input class="search-input" placeholder="Поиск по пассажиру или номеру документа...">
      </div>
      <select class="filter-select">
        <option>Все способы</option>
        <option>Онлайн</option>
        <option>Касса</option>
      </select>
    </div>

    <div class="card" style="padding:0;overflow:hidden">
      <div style="padding:14px 18px 12px;border-bottom:0.5px solid var(--border-tertiary);display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:13px;font-weight:500">Список пассажиров</div>
        <button class="btn" onclick="showToast('Ведомость скачана')">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 7l3 3 3-3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          Ведомость
        </button>
      </div>
      <div class="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>Место</th>
              <th>Пассажир</th>
              <th>№ документа</th>
              <th>Согласие</th>
              <th>Способ</th>
              <th>Время</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${passengers.map(p=>`
            <tr>
              <td><div style="width:28px;height:28px;border-radius:6px;background:#EFF4FF;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:500;color:#1A56DB">${p.seat}</div></td>
              <td><div class="td-name">${p.name}</div></td>
              <td><div style="font-size:12px;font-family:monospace;color:var(--text-secondary)">${p.doc}</div></td>
              <td>${p.consent?'<span class="badge b-green">Получено</span>':'<span class="badge b-red">Нет</span>'}</td>
              <td><span class="badge ${p.method==='Онлайн'?'b-blue':'b-gray'}">${p.method}</span></td>
              <td><div style="font-size:12px;color:var(--text-secondary)">${p.time}</div></td>
              <td>
                <button class="btn" style="padding:4px 9px;font-size:11px" onclick="showToast('Билет распечатан')">Билет</button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- Modal: Offline sale -->
<div class="modal-backdrop" id="modal-offline-sale">
  <div class="modal">
    <div class="modal-hd">
      <div class="modal-title">Продажа кассой</div>
      <button class="modal-close" onclick="closeModal('modal-offline-sale')">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
      </button>
    </div>
    <div class="form-group">
      <label class="form-label">Рейс</label>
      <select class="form-select">
        <option>Астана → Павлодар · 05.05 · 14:00</option>
        <option>Астана → Кокшетау · 05.05 · 16:30</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Место</label>
      <select class="form-select">
        ${Array.from({length:8},(_,i)=>`<option>Место ${i+1+20}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">ФИО пассажира</label>
      <input class="form-input" placeholder="Иванов Иван Иванович">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Номер документа</label>
        <input class="form-input" placeholder="054321">
        <div class="form-hint">Удостоверение или паспорт (без ИИН)</div>
      </div>
      <div class="form-group">
        <label class="form-label">Телефон</label>
        <input class="form-input" placeholder="+7 700 000 00 00">
      </div>
    </div>
    <div style="background:#EFF4FF;border-radius:6px;padding:10px 12px;font-size:12px;color:#1E40AF;margin-bottom:14px">
      Пассажир должен подтвердить согласие на обработку персональных данных устно или подписью.
    </div>
    <div style="display:flex;gap:8px;justify-content:flex-end">
      <button class="btn" onclick="closeModal('modal-offline-sale')">Отмена</button>
      <button class="btn btn-primary" onclick="closeModal('modal-offline-sale');showToast('Билет оформлен и распечатан')">Оформить и распечатать</button>
    </div>
  </div>
</div>`;
};
