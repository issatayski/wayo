window.render_sitcenter = function() {
  const el = document.getElementById('screen-sitcenter');
  if (el.dataset.rendered) return;
  el.dataset.rendered = '1';

  el.innerHTML = `
<style>
.sc{font-family:var(--font);background:#0A0F1E;border-radius:var(--radius-lg);overflow:hidden;border:0.5px solid #1E2D4A}
.sc-top{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:#0D1525;border-bottom:0.5px solid #1E2D4A}
.sc-title{font-size:13px;font-weight:500;color:#E2E8F0;letter-spacing:0.3px}
.sc-sub{font-size:10px;color:#4A6FA5;margin-top:1px}
.sc-live{display:flex;align-items:center;gap:5px;font-size:11px;color:#22D3EE}
.sc-pulse{width:6px;height:6px;border-radius:50%;background:#22D3EE;animation:scpulse 1.5s infinite}
@keyframes scpulse{0%,100%{opacity:1}50%{opacity:0.3}}
.sc-body{display:grid;grid-template-columns:1fr 230px}
.sc-map{position:relative;overflow:hidden;height:440px;background:#0D1829}
.sc-right{background:#0D1525;border-left:0.5px solid #1E2D4A;display:flex;flex-direction:column}
.sc-rp-hd{padding:10px 12px;border-bottom:0.5px solid #1E2D4A;font-size:10px;font-weight:500;color:#64748B;text-transform:uppercase;letter-spacing:0.6px}
.sc-buslist{flex:1;overflow-y:auto;padding:8px}
.sc-bcard{background:#111827;border:0.5px solid #1E2D4A;border-radius:8px;padding:9px 11px;margin-bottom:6px;cursor:pointer;transition:border-color 0.15s}
.sc-bcard:hover{border-color:#2563EB}
.sc-bcard.sc-sel{border-color:#3B82F6;background:#0F1F3D}
.sc-bhead{display:flex;align-items:center;justify-content:space-between;margin-bottom:5px}
.sc-broute{font-size:12px;font-weight:500}
.sc-bst{font-size:9px;font-weight:500;padding:2px 6px;border-radius:20px}
.sc-stmove{background:#0F3A2F;color:#34D399}
.sc-ststop{background:#3B1F0A;color:#FB923C}
.sc-bmeta{font-size:10px;color:#4A6FA5;margin-bottom:4px}
.sc-bprog{height:3px;background:#1E2D4A;border-radius:2px;overflow:hidden;margin-bottom:4px}
.sc-bbar{height:3px;border-radius:2px;transition:width 0.5s}
.sc-bfoot{display:flex;justify-content:space-between;font-size:10px;color:#4A6FA5}
.sc-spd{color:#22D3EE}
.sc-stats{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:8px}
.sc-stat{background:#111827;border:0.5px solid #1E2D4A;border-radius:6px;padding:7px;text-align:center}
.sc-sval{font-size:17px;font-weight:500;color:#E2E8F0;letter-spacing:-0.5px}
.sc-slbl{font-size:9px;color:#4A6FA5;margin-top:1px;text-transform:uppercase;letter-spacing:0.4px}
.sc-foot{padding:7px 16px;background:#0D1525;border-top:0.5px solid #1E2D4A;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px}
.sc-fitem{font-size:10px;color:#4A6FA5;display:flex;align-items:center;gap:4px}
.sc-fdot{width:8px;height:8px;border-radius:50%}
</style>

<div class="sc">
  <div class="sc-top">
    <div style="display:flex;align-items:center;gap:9px">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="10" rx="2" stroke="#3B82F6" stroke-width="1.4"/><circle cx="5.5" cy="15" r="1.5" fill="#3B82F6"/><circle cx="14.5" cy="15" r="1.5" fill="#3B82F6"/><path d="M2 9h16" stroke="#3B82F6" stroke-width="1.2"/></svg>
      <div>
        <div class="sc-title">WayO — Ситуационный центр</div>
        <div class="sc-sub">Астана · Мониторинг рейсов в реальном времени</div>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:14px">
      <div class="sc-live"><div class="sc-pulse"></div>Live</div>
      <div style="font-size:12px;color:#94A3B8;font-variant-numeric:tabular-nums" id="sc-clock">--:--:--</div>
    </div>
  </div>

  <div class="sc-body">
    <div class="sc-map"><canvas id="sc-canvas" width="640" height="440"></canvas></div>
    <div class="sc-right">
      <div class="sc-rp-hd">Активные рейсы</div>
      <div class="sc-buslist" id="sc-buslist"></div>
      <div class="sc-stats">
        <div class="sc-stat"><div class="sc-sval">4</div><div class="sc-slbl">В пути</div></div>
        <div class="sc-stat"><div class="sc-sval">141</div><div class="sc-slbl">Пассажиров</div></div>
        <div class="sc-stat"><div class="sc-sval">3 840</div><div class="sc-slbl">Км сегодня</div></div>
        <div class="sc-stat"><div class="sc-sval" id="sc-eta">16:30</div><div class="sc-slbl">Ближ. прибытие</div></div>
      </div>
    </div>
  </div>

  <div class="sc-foot">
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <div class="sc-fitem"><div class="sc-fdot" style="background:#34D399"></div>В движении</div>
      <div class="sc-fitem"><div class="sc-fdot" style="background:#FB923C"></div>Остановка</div>
      <div class="sc-fitem"><div class="sc-fdot" style="background:#3B82F6"></div>Астана (отправление)</div>
      <div class="sc-fitem"><div class="sc-fdot" style="background:#94A3B8"></div>Города назначения</div>
    </div>
    <div class="sc-fitem">Нажмите на автобус для подробностей</div>
  </div>
</div>`;

  const canvas = document.getElementById('sc-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 640, H = 440;

  const LON_MIN = 49, LON_MAX = 87, LAT_MIN = 40, LAT_MAX = 56;
  const PX = 38, PY = 28;

  function toXY(lon, lat) {
    return {
      x: PX + (lon - LON_MIN) / (LON_MAX - LON_MIN) * (W - PX * 2),
      y: PY + (1 - (lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * (H - PY * 2),
    };
  }

  const CITIES = [
    {name:'Астана',         lon:71.45,lat:51.18,maj:true},
    {name:'Павлодар',       lon:76.95,lat:52.30,maj:true},
    {name:'Петропавловск',  lon:69.13,lat:54.87,maj:true},
    {name:'Костанай',       lon:63.63,lat:53.22,maj:true},
    {name:'Қарағанды',      lon:73.10,lat:49.80,maj:true},
    {name:'Кокшетау',       lon:69.40,lat:53.28,maj:false},
    {name:'Алматы',         lon:76.95,lat:43.25,maj:true},
    {name:'Шымкент',        lon:69.60,lat:42.32,maj:true},
    {name:'Актобе',         lon:57.21,lat:50.28,maj:true},
    {name:'Атырау',         lon:51.88,lat:47.12,maj:false},
    {name:'Уральск',        lon:51.37,lat:51.22,maj:false},
    {name:'Семей',          lon:80.23,lat:50.43,maj:false},
    {name:'Өскемен',        lon:82.62,lat:49.97,maj:false},
    {name:'Тараз',          lon:71.37,lat:42.90,maj:false},
    {name:'Қызылорда',      lon:65.47,lat:44.85,maj:false},
    {name:'Актау',          lon:51.15,lat:43.65,maj:false},
  ];

  const ASTANA = {lon:71.45, lat:51.18};

  const BUSES = [
    {id:1, num:'797 AKR 01', destName:'Павлодар',       dest:{lon:76.95,lat:52.30}, color:'#34D399', passengers:37, seats:45, speed:87, progress:0.42, status:'move', depart:'14:00', arrive:'18:30'},
    {id:2, num:'388 BKL 01', destName:'Петропавловск',  dest:{lon:69.13,lat:54.87}, color:'#60A5FA', passengers:29, seats:52, speed:91, progress:0.28, status:'move', depart:'13:30', arrive:'19:15'},
    {id:3, num:'124 VNM 01', destName:'Костанай',       dest:{lon:63.63,lat:53.22}, color:'#F472B6', passengers:44, seats:48, speed:0,  progress:0.61, status:'stop', depart:'11:00', arrive:'18:45', stopNote:'Щучинск · плановая'},
    {id:4, num:'501 AKP 01', destName:'Қарағанды',      dest:{lon:73.10,lat:49.80}, color:'#FBBF24', passengers:31, seats:45, speed:78, progress:0.55, status:'move', depart:'12:45', arrive:'16:30'},
  ];

  let scSel = null;
  let scTick = 0;

  function busPos(bus) {
    const o = toXY(ASTANA.lon, ASTANA.lat);
    const d = toXY(bus.dest.lon, bus.dest.lat);
    const cx = (o.x+d.x)/2 + (d.y-o.y)*0.08;
    const cy = (o.y+d.y)/2 - (d.x-o.x)*0.08;
    const t = bus.progress, mt = 1-t;
    return {x: mt*mt*o.x+2*mt*t*cx+t*t*d.x, y: mt*mt*o.y+2*mt*t*cy+t*t*d.y};
  }

  function rrect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y);
    ctx.arcTo(x+w,y,x+w,y+r,r); ctx.lineTo(x+w,y+h-r);
    ctx.arcTo(x+w,y+h,x+w-r,y+h,r); ctx.lineTo(x+r,y+h);
    ctx.arcTo(x,y+h,x,y+h-r,r); ctx.lineTo(x,y+r);
    ctx.arcTo(x,y,x+r,y,r); ctx.closePath();
  }

  const BORDER = [
    [51.4,52.0],[52.0,53.5],[53.5,54.2],[55.0,54.8],[57.5,55.0],[60.0,55.2],
    [63.0,54.5],[65.0,54.0],[67.0,54.2],[69.0,54.9],[70.0,55.1],[72.0,55.4],
    [74.0,55.3],[76.0,54.5],[78.0,53.5],[80.0,52.5],[82.0,51.5],[83.5,50.8],
    [85.0,49.5],[86.5,48.5],[86.0,47.0],[84.0,46.0],[82.0,45.5],[80.0,44.5],
    [78.0,43.5],[76.5,42.5],[74.0,42.0],[72.0,41.5],[70.0,41.5],[68.0,41.0],
    [66.0,41.5],[64.0,43.0],[62.0,44.0],[60.0,44.5],[58.0,45.5],[56.0,46.5],
    [54.0,47.5],[52.0,48.0],[50.0,49.5],[49.5,51.0],[51.0,51.5],[51.4,52.0],
  ];

  function draw() {
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = '#0D1829';
    ctx.fillRect(0,0,W,H);

    // Сетка
    ctx.strokeStyle = 'rgba(30,45,74,0.5)';
    ctx.lineWidth = 0.5;
    for(let lon=50;lon<=86;lon+=5){
      const p=toXY(lon,LAT_MIN),p2=toXY(lon,LAT_MAX);
      ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p2.x,p2.y);ctx.stroke();
      ctx.fillStyle='rgba(74,111,165,0.35)';ctx.font='9px sans-serif';
      ctx.fillText(lon+'°',p.x-6,H-10);
    }
    for(let lat=42;lat<=56;lat+=2){
      const p=toXY(LON_MIN,lat),p2=toXY(LON_MAX,lat);
      ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p2.x,p2.y);ctx.stroke();
      ctx.fillStyle='rgba(74,111,165,0.35)';ctx.font='9px sans-serif';
      ctx.fillText(lat+'°',3,p.y+3);
    }

    // Граница Казахстана
    ctx.beginPath();
    BORDER.forEach(([lon,lat],i)=>{const p=toXY(lon,lat);i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y);});
    ctx.closePath();
    ctx.fillStyle='rgba(16,28,54,0.75)';ctx.fill();
    ctx.strokeStyle='rgba(37,99,235,0.35)';ctx.lineWidth=1.2;ctx.stroke();

    const pulse = 0.5+0.5*Math.sin(scTick*0.08);

    // Маршруты
    BUSES.forEach(bus=>{
      const o=toXY(ASTANA.lon,ASTANA.lat);
      const d=toXY(bus.dest.lon,bus.dest.lat);
      const cx=(o.x+d.x)/2+(d.y-o.y)*0.08;
      const cy=(o.y+d.y)/2-(d.x-o.x)*0.08;
      const isSel=scSel===bus.id;

      // Пунктир — весь маршрут
      ctx.setLineDash([3,4]);
      ctx.beginPath();ctx.moveTo(o.x,o.y);
      ctx.quadraticCurveTo(cx,cy,d.x,d.y);
      ctx.strokeStyle=isSel?bus.color+'50':'rgba(37,99,235,0.12)';
      ctx.lineWidth=isSel?1.5:1;ctx.stroke();
      ctx.setLineDash([]);

      // Сплошная — пройденный путь
      ctx.beginPath();
      for(let t=0;t<=bus.progress;t+=0.015){
        const mt=1-t;
        const px=mt*mt*o.x+2*mt*t*cx+t*t*d.x;
        const py=mt*mt*o.y+2*mt*t*cy+t*t*d.y;
        t<0.001?ctx.moveTo(px,py):ctx.lineTo(px,py);
      }
      ctx.strokeStyle=bus.color+(isSel?'FF':'AA');
      ctx.lineWidth=isSel?2.5:1.8;ctx.stroke();
    });

    // Города
    CITIES.forEach(city=>{
      if(city.name==='Астана')return;
      const p=toXY(city.lon,city.lat);
      const isBusDest=BUSES.some(b=>b.destName===city.name);
      ctx.beginPath();
      ctx.arc(p.x,p.y,city.maj?4:2.5,0,Math.PI*2);
      ctx.fillStyle=isBusDest?'rgba(148,163,184,0.9)':'rgba(74,111,165,0.45)';
      ctx.fill();
      if(city.maj){
        ctx.font='10px sans-serif';
        ctx.fillStyle=isBusDest?'rgba(203,213,225,0.9)':'rgba(100,130,165,0.7)';
        ctx.fillText(city.name,p.x+6,p.y+3);
      }
    });

    // Астана — пульсирующий узел
    const ast=toXY(ASTANA.lon,ASTANA.lat);
    ctx.beginPath();ctx.arc(ast.x,ast.y,16+pulse*6,0,Math.PI*2);
    ctx.fillStyle='rgba(59,130,246,0.07)';ctx.fill();
    ctx.beginPath();ctx.arc(ast.x,ast.y,10+pulse*3,0,Math.PI*2);
    ctx.fillStyle='rgba(59,130,246,0.12)';ctx.fill();
    ctx.beginPath();ctx.arc(ast.x,ast.y,7,0,Math.PI*2);
    ctx.fillStyle='#1D4ED8';ctx.fill();
    ctx.beginPath();ctx.arc(ast.x,ast.y,4,0,Math.PI*2);
    ctx.fillStyle='#3B82F6';ctx.fill();
    ctx.font='bold 11px sans-serif';
    ctx.fillStyle='#93C5FD';
    ctx.fillText('Астана',ast.x+10,ast.y+4);

    // Города назначения — подсветка
    BUSES.forEach(bus=>{
      const dp=toXY(bus.dest.lon,bus.dest.lat);
      ctx.beginPath();ctx.arc(dp.x,dp.y,7,0,Math.PI*2);
      ctx.fillStyle=bus.color+'25';ctx.fill();
      ctx.beginPath();ctx.arc(dp.x,dp.y,4,0,Math.PI*2);
      ctx.fillStyle=bus.color+'AA';ctx.fill();
      ctx.beginPath();ctx.arc(dp.x,dp.y,2.5,0,Math.PI*2);
      ctx.fillStyle=bus.color;ctx.fill();
    });

    // Автобусы
    BUSES.forEach(bus=>{
      const pos=busPos(bus);
      const isSel=scSel===bus.id;
      const isMove=bus.status==='move';

      if(isSel){
        ctx.beginPath();ctx.arc(pos.x,pos.y,18,0,Math.PI*2);
        ctx.fillStyle=bus.color+'18';ctx.fill();
      }
      if(isMove){
        ctx.beginPath();ctx.arc(pos.x,pos.y,10+pulse*4,0,Math.PI*2);
        ctx.fillStyle=bus.color+'12';ctx.fill();
      }

      const sz=isSel?9:7.5;
      const bx=pos.x-sz, by=pos.y-sz*0.7;

      // Тень
      ctx.fillStyle='rgba(0,0,0,0.4)';
      rrect(ctx,bx+1,by+1,sz*2,sz*1.5,2);ctx.fill();

      // Корпус
      ctx.fillStyle=isMove?bus.color:'#FB923C';
      ctx.strokeStyle='#0A0F1E';ctx.lineWidth=1.5;
      rrect(ctx,bx,by,sz*2,sz*1.5,2);ctx.fill();ctx.stroke();

      // Окна
      ctx.fillStyle='rgba(10,15,30,0.7)';
      ctx.fillRect(bx+2,by+2,sz*0.65,sz*0.5);
      ctx.fillRect(bx+sz+1.5,by+2,sz*0.65,sz*0.5);

      // Колёса
      ctx.fillStyle='#0A0F1E';
      ctx.beginPath();ctx.arc(bx+3.5,by+sz*1.5,2,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(bx+sz*2-3.5,by+sz*1.5,2,0,Math.PI*2);ctx.fill();

      // Стрелка направления (если движется)
      if(isMove){
        ctx.fillStyle=bus.color;
        ctx.beginPath();
        ctx.moveTo(bx+sz*2+2,by+sz*0.5);
        ctx.lineTo(bx+sz*2+6,by+sz*0.75);
        ctx.lineTo(bx+sz*2+2,by+sz);
        ctx.closePath();ctx.fill();
      }

      // Метка
      const label=bus.destName;
      ctx.font=isSel?'bold 11px sans-serif':'10px sans-serif';
      const tw=ctx.measureText(label).width;
      const lx=pos.x+16,ly=pos.y-3;
      ctx.fillStyle='rgba(10,15,30,0.88)';
      ctx.fillRect(lx-2,ly-10,tw+8,14);
      ctx.strokeStyle=bus.color+'70';ctx.lineWidth=0.5;
      ctx.strokeRect(lx-2,ly-10,tw+8,14);
      ctx.fillStyle=isSel?bus.color:'#CBD5E1';
      ctx.fillText(label,lx+2,ly);

      // Иконка остановки
      if(!isMove){
        ctx.font='9px sans-serif';
        ctx.fillStyle='#FB923C';
        ctx.fillText('● СТОП',pos.x+14,pos.y+13);
      }
    });
  }

  function buildList() {
    const list=document.getElementById('sc-buslist');
    if(!list)return;
    list.innerHTML=BUSES.map(bus=>{
      const pct=Math.round(bus.progress*100);
      const isMove=bus.status==='move';
      const isSel=scSel===bus.id;
      return `<div class="sc-bcard${isSel?' sc-sel':''}" onclick="scSelectBus(${bus.id})">
        <div class="sc-bhead">
          <div class="sc-broute" style="color:${bus.color}">${bus.destName}</div>
          <span class="sc-bst ${isMove?'sc-stmove':'sc-ststop'}">${isMove?'В пути':'Стоп'}</span>
        </div>
        <div class="sc-bmeta">${bus.num} · ${bus.passengers}/${bus.seats} пасс.</div>
        <div class="sc-bprog"><div class="sc-bbar" style="width:${pct}%;background:${bus.color}"></div></div>
        <div class="sc-bfoot">
          <span>${pct}% пути · ${bus.depart}→${bus.arrive}</span>
          ${isMove?`<span class="sc-spd">${bus.speed} км/ч</span>`:`<span style="color:#FB923C;font-size:9px">${bus.stopNote||'Остановка'}</span>`}
        </div>
      </div>`;
    }).join('');
  }

  window.scSelectBus = function(id) {
    scSel = scSel===id ? null : id;
    buildList();
  };

  canvas.addEventListener('click', e=>{
    const rect=canvas.getBoundingClientRect();
    const mx=(e.clientX-rect.left)*(W/rect.width);
    const my=(e.clientY-rect.top)*(H/rect.height);
    let found=null;
    BUSES.forEach(bus=>{
      const pos=busPos(bus);
      if(Math.sqrt((pos.x-mx)**2+(pos.y-my)**2)<18) found=bus.id;
    });
    if(found!==null){scSel=scSel===found?null:found;buildList();}
  });

  function updateClock() {
    const el=document.getElementById('sc-clock');
    if(!el)return;
    const n=new Date();
    el.textContent=String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0')+':'+String(n.getSeconds()).padStart(2,'0');
  }

  let scAnim=null;
  function animate(){
    scTick++;
    BUSES.forEach(bus=>{if(bus.status==='move'&&bus.progress<0.97)bus.progress+=0.00025;});
    draw();
    if(scTick%30===0)buildList();
    scAnim=requestAnimationFrame(animate);
  }

  // Останавливаем анимацию при навигации на другой экран
  const observer=new MutationObserver(()=>{
    if(!el.classList.contains('active')&&scAnim){
      cancelAnimationFrame(scAnim);scAnim=null;
    } else if(el.classList.contains('active')&&!scAnim){
      animate();
    }
  });
  observer.observe(el,{attributes:true,attributeFilter:['class']});

  updateClock();
  if(!window._scClockInt) window._scClockInt=setInterval(updateClock,1000);
  buildList();
  animate();
};
