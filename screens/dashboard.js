window.render_dashboard = function() {
  const el = document.getElementById('screen-dashboard');
  if (el.dataset.rendered) return;
  el.dataset.rendered = '1';
  el.innerHTML = `
<div class="metrics">
  <div class="mc">
    <div class="mc-accent" style="background:#1A56DB"></div>
    <div class="mc-label">Продано сегодня</div>
    <div class="mc-val">47</div>
    <div class="mc-footer"><span class="mc-delta up">↑ 12</span><span class="neutral" style="font-size:11px">vs вчера</span></div>
  </div>
  <div class="mc">
    <div class="mc-accent" style="background:#7C3AED"></div>
    <div class="mc-label">Выручка сегодня</div>
    <div class="mc-val">184 500 ₸</div>
    <div class="mc-footer"><span class="mc-delta up">↑ 8%</span><span class="neutral" style="font-size:11px">vs вчера</span></div>
  </div>
  <div class="mc">
    <div class="mc-accent" style="background:#059669"></div>
    <div class="mc-label">Рейсов сегодня</div>
    <div class="mc-val">6</div>
    <div class="mc-footer"><span class="neutral" style="font-size:11px">3 активных · 3 скоро</span></div>
  </div>
  <div class="mc">
    <div class="mc-accent" style="background:#F59E0B"></div>
    <div class="mc-label">Комиссия WayO</div>
    <div class="mc-val">12 350 ₸</div>
    <div class="mc-footer"><span class="neutral" style="font-size:11px">за сегодня</span></div>
  </div>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
  <div class="card">
    <div class="card-hd">
      <div class="card-title">Продажи за неделю</div>
      <div class="card-link" onclick="navigate('reports')">Подробнее →</div>
    </div>
    <div style="height:110px;display:flex;align-items:flex-end;gap:6px;padding:0 2px" id="dash-chart"></div>
  </div>
  <div class="card">
    <div class="card-hd">
      <div class="card-title">Ближайшие рейсы</div>
      <div class="card-link" onclick="navigate('trips')">Все рейсы →</div>
    </div>
    <div>
      ${[
        {route:'Астана → Павлодар', time:'14:00 · Yutong · 45 мест', badge:'b-green', label:'Активен', fill:82, cur:37, max:45, color:'#1A56DB'},
        {route:'Астана → Кокшетау', time:'16:30 · King Long · 52 места', badge:'b-yellow', label:'Скоро', fill:40, cur:21, max:52, color:'#F59E0B'},
        {route:'Астана → Костанай', time:'19:00 · Higer · 48 мест', badge:'b-red', label:'Почти полон', fill:96, cur:46, max:48, color:'#EF4444'},
      ].map(t => `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-bottom:0.5px solid var(--border-tertiary)">
        <div>
          <div style="font-size:12px;font-weight:500">${t.route}</div>
          <div style="font-size:11px;color:var(--text-secondary);margin-top:1px">${t.time}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
          <span class="badge ${t.badge}">${t.label}</span>
          <div class="fill-wrap">
            <div class="fill-track"><div class="fill-bar" style="width:${t.fill}%;background:${t.color}"></div></div>
            <div class="fill-txt">${t.cur}/${t.max}</div>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>

<div style="display:grid;grid-template-columns:1fr 380px;gap:12px">
  <div class="card">
    <div class="card-hd">
      <div class="card-title">Последние продажи</div>
      <div class="card-link" onclick="navigate('sales')">Все продажи →</div>
    </div>
    <div>
      ${[
        {init:'НБ', name:'Нуров Б. А.', route:'Астана → Павлодар · место 12', amt:'4 200 ₸', method:'Онлайн', mb:'b-blue'},
        {init:'СД', name:'Сейткали Д. Е.', route:'Астана → Костанай · место 3', amt:'5 800 ₸', method:'Онлайн', mb:'b-blue'},
        {init:'АМ', name:'Ахметова М. С.', route:'Астана → Кокшетау · место 7', amt:'2 500 ₸', method:'Касса', mb:'b-gray'},
        {init:'БК', name:'Байдаулет К. Н.', route:'Астана → Павлодар · место 28', amt:'4 200 ₸', method:'Онлайн', mb:'b-blue'},
      ].map(s => `
      <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:0.5px solid var(--border-tertiary)">
        <div style="width:30px;height:30px;border-radius:50%;background:var(--bg-secondary);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:500;color:var(--text-secondary);flex-shrink:0">${s.init}</div>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:500">${s.name}</div>
          <div style="font-size:11px;color:var(--text-secondary)">${s.route}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:12px;font-weight:500">${s.amt}</div>
          <div style="margin-top:2px"><span class="badge ${s.mb}">${s.method}</span></div>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <div style="display:flex;flex-direction:column;gap:12px">
    <div class="card">
      <div class="card-title" style="margin-bottom:12px">Финансы сегодня</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:6px;background:var(--bg-secondary)">
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-secondary)">
            <div style="width:8px;height:8px;border-radius:50%;background:#1A56DB"></div>Выручка брутто
          </div>
          <div style="font-size:13px;font-weight:500">196 850 ₸</div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:6px;background:var(--bg-secondary)">
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-secondary)">
            <div style="width:8px;height:8px;border-radius:50%;background:#F59E0B"></div>Комиссия WayO
          </div>
          <div style="font-size:13px;font-weight:500;color:#B45309">− 12 350 ₸</div>
        </div>
        <div style="height:0.5px;background:var(--border-tertiary);margin:2px 0"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px">
          <div style="font-size:12px;font-weight:500">Выручка нетто</div>
          <div style="font-size:15px;font-weight:500;color:#1A56DB">184 500 ₸</div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:10px">Быстрые действия</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${[
          {icon:'#1A56DB', bg:'#EFF4FF', label:'Создать рейс', action:"navigate('trips')"},
          {icon:'#16A34A', bg:'#F0FDF4', label:'Продать кассой', action:"navigate('sales')"},
          {icon:'#D97706', bg:'#FFFBEB', label:'Скачать отчёт', action:"navigate('reports')"},
        ].map(q => `
        <div onclick="${q.action}" style="display:flex;align-items:center;gap:9px;padding:9px 10px;border-radius:6px;border:0.5px solid var(--border-tertiary);background:var(--bg-primary);cursor:pointer;font-size:12px;transition:background 0.1s" onmouseover="this.style.background='var(--bg-secondary)'" onmouseout="this.style.background='var(--bg-primary)'">
          <div style="width:26px;height:26px;border-radius:6px;background:${q.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="${q.icon}" stroke-width="1.6" stroke-linecap="round"/></svg>
          </div>
          ${q.label}
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>`;

  const bars = [{v:28,d:'Пн'},{v:42,d:'Вт'},{v:35,d:'Ср'},{v:58,d:'Чт'},{v:47,d:'Пт'},{v:71,d:'Сб'},{v:47,d:'Вс'}];
  const max = Math.max(...bars.map(b=>b.v));
  document.getElementById('dash-chart').innerHTML = bars.map((b,i)=>{
    const h = Math.round((b.v/max)*90);
    const isToday = i===6;
    const color = isToday ? '#1A56DB' : '#BFDBFE';
    return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
      <div style="width:100%;height:${h}px;background:${color};border-radius:3px 3px 0 0;position:relative">
        ${isToday?`<div style="position:absolute;top:-16px;left:50%;transform:translateX(-50%);font-size:9px;color:var(--text-secondary);white-space:nowrap">${b.v}</div>`:''}
      </div>
      <span style="font-size:10px;color:var(--text-tertiary)">${b.d}</span>
    </div>`;
  }).join('');
};
