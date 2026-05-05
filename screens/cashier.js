window.render_cashier = function() {
  const el = document.getElementById('screen-cashier');
  if (el.dataset.rendered) return;
  el.dataset.rendered = '1';

  el.innerHTML = `
<style>
.pos{display:grid;grid-template-columns:1fr 320px;gap:0;border:0.5px solid var(--border-tertiary);border-radius:var(--radius-lg);overflow:hidden;background:var(--bg-tertiary);min-height:580px}
.pos-left{display:flex;flex-direction:column}
.pos-right{background:var(--bg-primary);border-left:0.5px solid var(--border-tertiary);display:flex;flex-direction:column}
.pos-topbar{height:46px;background:var(--bg-primary);border-bottom:0.5px solid var(--border-tertiary);display:flex;align-items:center;justify-content:space-between;padding:0 14px;flex-shrink:0}
.pos-dot{width:7px;height:7px;border-radius:50%;background:#22C55E}
.pos-name{font-size:13px;font-weight:500;color:var(--text-primary)}
.pos-shift{font-size:11px;color:var(--text-secondary)}
.pos-clock{font-size:13px;font-weight:500;color:var(--text-primary);font-variant-numeric:tabular-nums}
.pos-body{flex:1;padding:12px;display:flex;flex-direction:column;gap:10px;overflow-y:auto}
.pos-card{background:var(--bg-primary);border:0.5px solid var(--border-tertiary);border-radius:var(--radius-lg);padding:13px}
.pos-step{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.pos-snum{width:22px;height:22px;border-radius:50%;background:#1A56DB;color:#fff;font-size:11px;font-weight:500;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.pos-stitle{font-size:13px;font-weight:500;color:var(--text-primary)}
.pos-smeta{margin-left:auto;font-size:11px;color:var(--text-secondary)}

.trip-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px}
.trip-btn{padding:9px 11px;border-radius:var(--radius-md);border:0.5px solid var(--border-secondary);background:var(--bg-primary);cursor:pointer;text-align:left;transition:all 0.12s;font-family:var(--font)}
.trip-btn:hover{background:#EFF4FF;border-color:#BFDBFE}
.trip-btn.tsel{background:#EFF4FF;border:1.5px solid #1A56DB}
.trip-r{font-size:12px;font-weight:500;color:var(--text-primary)}
.trip-t{font-size:11px;color:var(--text-secondary);margin-top:2px}
.trip-a{font-size:10px;margin-top:3px}
.av-ok{color:#166534}.av-low{color:#854D0E}

.seat-wrap{background:var(--bg-secondary);border-radius:var(--radius-md);padding:11px}
.seat-leg{display:flex;gap:10px;margin-bottom:8px;flex-wrap:wrap}
.sl-item{display:flex;align-items:center;gap:4px;font-size:10px;color:var(--text-secondary)}
.sl-dot{width:12px;height:12px;border-radius:3px}
.bus-cab{display:flex;align-items:center;justify-content:center;background:var(--bg-tertiary);border-radius:5px;padding:5px 0;margin-bottom:5px;font-size:10px;color:var(--text-tertiary);border:0.5px dashed var(--border-secondary);gap:5px}
.sgrid{display:flex;flex-direction:column;gap:3px}
.srow{display:flex;align-items:center;gap:3px}
.srn{width:15px;font-size:9px;color:var(--text-tertiary);text-align:right;flex-shrink:0}
.s{width:27px;height:27px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:500;cursor:pointer;border:0.5px solid transparent;transition:all 0.1s;flex-shrink:0}
.sf{background:#EFF4FF;color:#1E40AF;border-color:#BFDBFE}
.sf:hover{background:#DBEAFE;border-color:#93C5FD}
.st{background:#F3F4F6;color:#9CA3AF;border-color:#E5E7EB;cursor:not-allowed}
.ss{background:#1A56DB;color:#fff;border-color:#1A56DB}
.sw{background:#F0FDF4;color:#166534;border-color:#BBF7D0}
.sw:hover{background:#DCFCE7}
.aisle{width:10px;flex-shrink:0}

.fg2{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.fg{display:flex;flex-direction:column;gap:4px}
.fg.fw{grid-column:1/-1}
.flbl{font-size:11px;font-weight:500;color:var(--text-secondary)}
.finp{padding:7px 10px;border:0.5px solid var(--border-secondary);border-radius:var(--radius-md);font-size:12px;font-family:var(--font);color:var(--text-primary);background:var(--bg-primary);outline:none;width:100%;transition:border-color 0.15s}
.finp:focus{border-color:#1A56DB;box-shadow:0 0 0 3px rgba(26,86,219,0.08)}
.fhint{font-size:10px;color:var(--text-tertiary)}
.consent{display:flex;align-items:flex-start;gap:8px;padding:9px 10px;background:#EFF4FF;border-radius:var(--radius-md);margin-top:8px}
.ccheck{width:16px;height:16px;border-radius:3px;background:#1A56DB;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.ctext{font-size:11px;color:#1E40AF;line-height:1.4}

.pos-rtop{padding:12px 14px;flex:1;overflow-y:auto;border-bottom:0.5px solid var(--border-tertiary)}
.pos-rlabel{font-size:11px;font-weight:500;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px}
.sum-trip{background:var(--bg-secondary);border-radius:var(--radius-md);padding:10px 12px;margin-bottom:10px}
.sum-route{font-size:14px;font-weight:500;color:var(--text-primary)}
.sum-meta{font-size:11px;color:var(--text-secondary);margin-top:2px}
.sum-seat{display:inline-flex;align-items:center;gap:4px;background:#EFF4FF;border:0.5px solid #BFDBFE;border-radius:20px;padding:3px 8px;font-size:11px;font-weight:500;color:#1E40AF;margin-top:5px}
.pax-card{border:0.5px solid var(--border-tertiary);border-radius:var(--radius-md);padding:10px 12px;margin-bottom:10px}
.pax-av{width:28px;height:28px;border-radius:50%;background:#EFF4FF;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:500;color:#1E40AF;flex-shrink:0}
.pax-name{font-size:13px;font-weight:500;color:var(--text-primary)}
.pax-doc{font-size:11px;color:var(--text-secondary);margin-top:1px;font-family:monospace}

.near-trips{display:flex;flex-direction:column;gap:4px;margin-bottom:10px}
.nt-row{display:flex;justify-content:space-between;font-size:11px;padding:6px 8px;border-radius:6px}
.nt-sel{background:#EFF4FF;border:0.5px solid #BFDBFE}
.nt-def{background:var(--bg-secondary)}

.price-sec{padding:11px 14px;border-top:0.5px solid var(--border-tertiary);flex-shrink:0}
.pr-row{display:flex;justify-content:space-between;align-items:center;padding:4px 0}
.pr-lbl{font-size:12px;color:var(--text-secondary)}
.pr-val{font-size:12px;font-weight:500;color:var(--text-primary)}
.pr-div{height:0.5px;background:var(--border-tertiary);margin:6px 0}
.pr-total{display:flex;justify-content:space-between;align-items:center}
.pr-tlbl{font-size:13px;font-weight:500;color:var(--text-primary)}
.pr-tval{font-size:20px;font-weight:500;color:#1A56DB;letter-spacing:-0.5px}

.pay-sec{padding:11px 14px;flex-shrink:0}
.pay-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:9px}
.pay-btn{padding:8px 0;border-radius:var(--radius-md);border:0.5px solid var(--border-secondary);background:var(--bg-primary);cursor:pointer;font-size:12px;font-family:var(--font);color:var(--text-primary);display:flex;align-items:center;justify-content:center;gap:5px;transition:all 0.12s}
.pay-btn:hover{background:var(--bg-secondary)}
.pay-btn.psel{background:#EFF4FF;border-color:#1A56DB;color:#1E40AF}
.pay-btn svg{width:13px;height:13px}

.sell-btn{width:100%;padding:11px 0;border-radius:var(--radius-md);background:#1A56DB;color:#fff;border:none;font-size:14px;font-weight:500;font-family:var(--font);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:background 0.12s}
.sell-btn:hover{background:#1648C0}
.sell-btn svg{width:15px;height:15px}

.quick-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;padding:10px 14px;border-top:0.5px solid var(--border-tertiary);flex-shrink:0}
.qbtn{padding:7px 0;border-radius:var(--radius-md);border:0.5px solid var(--border-secondary);background:var(--bg-primary);cursor:pointer;font-size:11px;font-family:var(--font);color:var(--text-secondary);display:flex;align-items:center;justify-content:center;gap:4px;transition:all 0.12s}
.qbtn:hover{background:var(--bg-secondary);color:var(--text-primary)}
.qbtn svg{width:12px;height:12px;flex-shrink:0}

.toast-pos{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);background:var(--text-primary);color:var(--bg-primary);padding:8px 16px;border-radius:var(--radius-md);font-size:12px;white-space:nowrap;opacity:0;transition:opacity 0.2s;pointer-events:none}
.toast-pos.show{opacity:1}
</style>

<div style="position:relative">
  <div class="pos">
    <div class="pos-left">
      <div class="pos-topbar">
        <div style="display:flex;align-items:center;gap:8px">
          <div class="pos-dot"></div>
          <div>
            <div class="pos-name">Касса №2 — Сарова К.И.</div>
            <div class="pos-shift">Смена с 08:00 · сегодня продано: <span id="c-sold">14</span></div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <button onclick="cNewSale()" style="font-size:11px;padding:5px 10px;border-radius:6px;border:0.5px solid var(--border-secondary);background:var(--bg-secondary);color:var(--text-primary);cursor:pointer;font-family:var(--font)">Новая продажа</button>
          <div class="pos-clock" id="c-clock">--:--</div>
        </div>
      </div>

      <div class="pos-body">
        <div class="pos-card">
          <div class="pos-step">
            <div class="pos-snum" id="sn1">1</div>
            <div class="pos-stitle">Выберите рейс</div>
          </div>
          <div class="trip-grid">
            <div class="trip-btn" onclick="cSelectTrip(this,'Астана → Павлодар','14:00','797 AKR 01',4200,8)">
              <div class="trip-r">Астана → Павлодар</div>
              <div class="trip-t">14:00 · 797 AKR 01</div>
              <div class="trip-a av-ok">8 мест свободно</div>
            </div>
            <div class="trip-btn tsel" onclick="cSelectTrip(this,'Астана → Кокшетау','16:30','388 BKL 01',2500,31)">
              <div class="trip-r">Астана → Кокшетау</div>
              <div class="trip-t">16:30 · 388 BKL 01</div>
              <div class="trip-a av-ok">31 место свободно</div>
            </div>
            <div class="trip-btn" onclick="cSelectTrip(this,'Астана → Костанай','19:00','124 VNM 01',5800,2)">
              <div class="trip-r">Астана → Костанай</div>
              <div class="trip-t">19:00 · 124 VNM 01</div>
              <div class="trip-a av-low">2 места свободно</div>
            </div>
            <div class="trip-btn" onclick="cSelectTrip(this,'Астана → Петропавловск','20:15','797 AKR 01',4800,22)">
              <div class="trip-r">Астана → Петропавловск</div>
              <div class="trip-t">20:15 · 797 AKR 01</div>
              <div class="trip-a av-ok">22 места свободно</div>
            </div>
          </div>
        </div>

        <div class="pos-card">
          <div class="pos-step">
            <div class="pos-snum" id="sn2">2</div>
            <div class="pos-stitle">Выберите место</div>
            <div class="pos-smeta" id="c-trip-meta">Астана → Кокшетау · 16:30</div>
          </div>
          <div class="seat-wrap">
            <div class="seat-leg">
              <div class="sl-item"><div class="sl-dot" style="background:#EFF4FF;border:0.5px solid #BFDBFE"></div>Свободно</div>
              <div class="sl-item"><div class="sl-dot" style="background:#F3F4F6;border:0.5px solid #E5E7EB"></div>Занято</div>
              <div class="sl-item"><div class="sl-dot" style="background:#1A56DB;border:0.5px solid #1A56DB"></div>Выбрано</div>
              <div class="sl-item"><div class="sl-dot" style="background:#F0FDF4;border:0.5px solid #BBF7D0"></div>У окна</div>
            </div>
            <div class="bus-cab">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.2"/><path d="M8 5v3l2 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
              Водитель
            </div>
            <div class="sgrid" id="c-seatgrid"></div>
          </div>
        </div>

        <div class="pos-card">
          <div class="pos-step">
            <div class="pos-snum" id="sn3">3</div>
            <div class="pos-stitle">Данные пассажира</div>
          </div>
          <div class="fg2">
            <div class="fg">
              <div class="flbl">Фамилия</div>
              <input class="finp" placeholder="Иванова" id="c-last" oninput="cUpdatePax()">
            </div>
            <div class="fg">
              <div class="flbl">Имя</div>
              <input class="finp" placeholder="Айгерим" id="c-first" oninput="cUpdatePax()">
            </div>
            <div class="fg">
              <div class="flbl">Отчество</div>
              <input class="finp" placeholder="Маратовна" id="c-mid">
            </div>
            <div class="fg">
              <div class="flbl">Номер документа</div>
              <input class="finp" placeholder="054321890" id="c-doc">
              <div class="fhint">Удостоверение или паспорт (без ИИН)</div>
            </div>
            <div class="fg">
              <div class="flbl">Телефон</div>
              <input class="finp" placeholder="+7 700 000 00 00" id="c-phone">
            </div>
            <div class="fg">
              <div class="flbl">Email (необязательно)</div>
              <input class="finp" placeholder="mail@mail.ru" id="c-email">
            </div>
          </div>
          <div class="consent">
            <div class="ccheck"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            <div class="ctext">Пассажир ознакомлен и согласен с условиями обработки персональных данных. Согласие получено устно и зафиксировано кассиром.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="pos-right">
      <div class="pos-rtop">
        <div class="pos-rlabel">Итог заказа</div>

        <div class="sum-trip">
          <div class="sum-route" id="c-sum-route">Астана → Кокшетау</div>
          <div class="sum-meta" id="c-sum-meta">16:30 · 05.05.2025 · 388 BKL 01</div>
          <div><span class="sum-seat" id="c-sum-seat">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M2 7h12" stroke="currentColor" stroke-width="1.2"/></svg>
            Место 7 — у окна
          </span></div>
        </div>

        <div class="pax-card" id="c-pax-card">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:7px">
            <div class="pax-av" id="c-pax-av">АИ</div>
            <div>
              <div class="pax-name" id="c-pax-name">Ахметова Айгерим И.</div>
              <div class="pax-doc">Уд. №054321890</div>
            </div>
          </div>
          <div style="display:flex;gap:5px">
            <span style="font-size:10px;padding:2px 7px;border-radius:20px;background:#DCFCE7;color:#166534;font-weight:500">Согласие ✓</span>
            <span style="font-size:10px;padding:2px 7px;border-radius:20px;background:#F3F4F6;color:#374151;font-weight:500">Касса</span>
          </div>
        </div>

        <div class="pos-rlabel">Ближайшие рейсы</div>
        <div class="near-trips">
          <div class="nt-row nt-def"><span style="color:var(--text-primary);font-weight:500">→ Павлодар</span><span style="color:var(--text-secondary)">14:00 · 8 мест</span></div>
          <div class="nt-row nt-sel"><span style="color:#1E40AF;font-weight:500">→ Кокшетау</span><span style="color:#1E40AF">16:30 · 31 место</span></div>
          <div class="nt-row nt-def"><span style="color:var(--text-primary);font-weight:500">→ Костанай</span><span style="color:#B45309">19:00 · 2 места</span></div>
          <div class="nt-row nt-def"><span style="color:var(--text-primary);font-weight:500">→ Петропавловск</span><span style="color:var(--text-secondary)">20:15 · 22 места</span></div>
        </div>
      </div>

      <div class="price-sec">
        <div class="pr-row"><div class="pr-lbl" id="c-seat-type">Билет (место у окна)</div><div class="pr-val" id="c-pr-ticket">2 500 ₸</div></div>
        <div class="pr-row"><div class="pr-lbl">Сервисный сбор WayO</div><div class="pr-val" id="c-pr-comm" style="color:#B45309">200 ₸</div></div>
        <div class="pr-div"></div>
        <div class="pr-total"><div class="pr-tlbl">Итого к оплате</div><div class="pr-tval" id="c-pr-total">2 700 ₸</div></div>
      </div>

      <div class="pay-sec">
        <div class="pos-rlabel">Способ оплаты</div>
        <div class="pay-grid">
          <div class="pay-btn psel" onclick="cSetPay(this,'Наличные')">
            <svg viewBox="0 0 16 16" fill="none"><rect x="1" y="4" width="14" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M1 7.5h14" stroke="currentColor" stroke-width="1.2"/></svg>
            Наличные
          </div>
          <div class="pay-btn" onclick="cSetPay(this,'Картой')">
            <svg viewBox="0 0 16 16" fill="none"><rect x="1" y="4" width="14" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2"/><rect x="3" y="9" width="4" height="1.5" rx="0.5" fill="currentColor"/></svg>
            Картой
          </div>
          <div class="pay-btn" onclick="cSetPay(this,'Kaspi QR')">
            <svg viewBox="0 0 16 16" fill="none"><rect x="4" y="1" width="8" height="14" rx="1.5" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="12" r="1" fill="currentColor"/></svg>
            Kaspi QR
          </div>
          <div class="pay-btn" onclick="cSetPay(this,'Перевод')">
            <svg viewBox="0 0 16 16" fill="none"><path d="M8 2v4M8 10v4M2 8h4M10 8h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
            Перевод
          </div>
        </div>
        <button class="sell-btn" onclick="cDoSell()">
          <svg viewBox="0 0 16 16" fill="none"><path d="M2 8l3.5 3.5L14 4" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Продать и распечатать
        </button>
      </div>

      <div class="quick-strip">
        <button class="qbtn" onclick="cToast('QR-сканер активирован')">
          <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="10" y="10" width="1.5" height="1.5" fill="currentColor"/><rect x="12.5" y="10" width="1.5" height="1.5" fill="currentColor"/><rect x="10" y="12.5" width="1.5" height="1.5" fill="currentColor"/><rect x="12.5" y="12.5" width="1.5" height="1.5" fill="currentColor"/></svg>
          Скан QR
        </button>
        <button class="qbtn" onclick="cToast('Введите номер билета для возврата')">
          <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M3 8l3-3M3 8l3 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Возврат
        </button>
        <button class="qbtn" onclick="cToast('Последний билет отправлен на принтер')">
          <svg viewBox="0 0 16 16" fill="none"><path d="M4 6V2h8v4M4 12H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1M4 9h8v5H4V9Z" stroke="currentColor" stroke-width="1.2"/></svg>
          Печать
        </button>
      </div>
    </div>
  </div>

  <div class="toast-pos" id="c-toast"></div>

  <div id="c-success" style="margin-top:12px"></div>
</div>`;

  const TAKEN = [1,4,8,9,13,16,17,20,21,24,25,28,32,33,36];
  let cSelSeat = 7;
  let cSelIsWin = true;
  let cTrip = {route:'Астана → Кокшетау', time:'16:30', bus:'388 BKL 01', price:2500};
  let cPayMethod = 'Наличные';

  function cBuildSeats() {
    const g = document.getElementById('c-seatgrid');
    if (!g) return;
    let h = '';
    for (let r = 1; r <= 9; r++) {
      const nums = [(r-1)*4+1, (r-1)*4+2, 0, (r-1)*4+3, (r-1)*4+4];
      h += `<div class="srow"><div class="srn">${r}</div>`;
      nums.forEach((n, ci) => {
        if (n === 0) { h += `<div class="aisle"></div>`; return; }
        const isWin = ci === 0 || ci === 4;
        const isTaken = TAKEN.includes(n);
        const isSel = n === cSelSeat;
        let cls = isTaken ? 'st' : isSel ? 'ss' : isWin ? 'sw' : 'sf';
        h += `<div class="s ${cls}" onclick="cPickSeat(${n},${isWin?1:0})">${n}</div>`;
      });
      h += `</div>`;
    }
    g.innerHTML = h;
  }

  window.cPickSeat = function(n, isWin) {
    if (TAKEN.includes(n)) return;
    cSelSeat = n;
    cSelIsWin = !!isWin;
    cBuildSeats();
    const ss = document.getElementById('c-sum-seat');
    const st = document.getElementById('c-seat-type');
    if (ss) ss.innerHTML = `<svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M2 7h12" stroke="currentColor" stroke-width="1.2"/></svg> Место ${n}${isWin?' — у окна':''}`;
    if (st) st.textContent = `Билет (место${isWin?' у окна':''})`;
  };

  window.cSelectTrip = function(el, route, time, bus, price, avail) {
    document.querySelectorAll('.trip-btn').forEach(b => b.classList.remove('tsel'));
    el.classList.add('tsel');
    cTrip = {route, time, bus, price};
    const m = document.getElementById('c-trip-meta');
    const sr = document.getElementById('c-sum-route');
    const sm = document.getElementById('c-sum-meta');
    if (m) m.textContent = `${route} · ${time}`;
    if (sr) sr.textContent = route;
    if (sm) sm.textContent = `${time} · 05.05.2025 · ${bus}`;
    cUpdatePrice(price);
    cToast(`Рейс выбран: ${route} · ${time}`);
  };

  function cUpdatePrice(price) {
    const comm = price <= 2000?150:price<=3000?200:price<=4000?250:price<=5000?300:price<=6000?350:price<=7000?400:price<=8000?450:price<=9000?500:550;
    const total = price + comm;
    const t = document.getElementById('c-pr-ticket');
    const c = document.getElementById('c-pr-comm');
    const tv = document.getElementById('c-pr-total');
    if (t) t.textContent = price.toLocaleString('ru-RU') + ' ₸';
    if (c) c.textContent = comm.toLocaleString('ru-RU') + ' ₸';
    if (tv) tv.textContent = total.toLocaleString('ru-RU') + ' ₸';
  }

  window.cUpdatePax = function() {
    const last = document.getElementById('c-last');
    const first = document.getElementById('c-first');
    if (!last || !first) return;
    const ln = last.value.trim();
    const fn = first.value.trim();
    const av = document.getElementById('c-pax-av');
    const nm = document.getElementById('c-pax-name');
    if (av) av.textContent = (ln[0]||'?') + (fn[0]||'?');
    if (nm) nm.textContent = (ln||'Фамилия') + ' ' + (fn||'Имя') + ' И.';
  };

  window.cSetPay = function(el, method) {
    document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('psel'));
    el.classList.add('psel');
    cPayMethod = method;
  };

  window.cDoSell = function() {
    const last = document.getElementById('c-last');
    const first = document.getElementById('c-first');
    const doc = document.getElementById('c-doc');
    const ln = last ? last.value.trim() : '';
    const fn = first ? first.value.trim() : '';
    const dc = doc ? doc.value.trim() : '';
    if (!ln || !fn) { cToast('Введите фамилию и имя пассажира'); return; }
    if (!dc) { cToast('Введите номер документа'); return; }
    const ticketNum = 'WO-' + Math.floor(10000 + Math.random() * 90000);
    const soldEl = document.getElementById('c-sold');
    if (soldEl) soldEl.textContent = parseInt(soldEl.textContent) + 1;
    const success = document.getElementById('c-success');
    if (success) {
      success.innerHTML = `
      <div style="background:#F0FDF4;border:0.5px solid #BBF7D0;border-radius:var(--radius-lg);padding:14px 16px">
        <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:12px">
          <div style="width:32px;height:32px;border-radius:50%;background:#DCFCE7;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="#16A34A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div>
            <div style="font-size:14px;font-weight:500;color:#166534">Билет оформлен и распечатан</div>
            <div style="font-size:12px;color:#166534;margin-top:2px">${ln} ${fn} · ${cTrip.route} · ${cTrip.time} · Место ${cSelSeat}</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding-top:10px;border-top:0.5px solid #BBF7D0">
          <div style="text-align:center">
            <div style="font-size:10px;color:#166534;margin-bottom:2px">Номер билета</div>
            <div style="font-size:12px;font-weight:500;color:#166534">${ticketNum}</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:10px;color:#166534;margin-bottom:2px">Место</div>
            <div style="font-size:12px;font-weight:500;color:#166534">${cSelSeat}${cSelIsWin?' (окно)':''}</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:10px;color:#166534;margin-bottom:2px">Оплата</div>
            <div style="font-size:12px;font-weight:500;color:#166534">${cPayMethod}</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:10px;color:#166534;margin-bottom:2px">Сумма</div>
            <div style="font-size:12px;font-weight:500;color:#166534">${document.getElementById('c-pr-total').textContent}</div>
          </div>
        </div>
        <div style="display:flex;gap:6px;margin-top:10px">
          <button onclick="cToast('Повторная печать выполнена')" style="flex:1;font-size:12px;padding:7px 0;border-radius:6px;border:0.5px solid #BBF7D0;background:var(--bg-primary);color:#166534;cursor:pointer;font-family:var(--font);display:flex;align-items:center;justify-content:center;gap:4px">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 6V2h8v4M4 12H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1M4 9h8v5H4V9Z" stroke="currentColor" stroke-width="1.2"/></svg>
            Повторная печать
          </button>
          <button onclick="cNewSale()" style="flex:1;font-size:12px;padding:7px 0;border-radius:6px;background:#16A34A;color:#fff;border:none;cursor:pointer;font-family:var(--font);display:flex;align-items:center;justify-content:center;gap:4px">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
            Новая продажа
          </button>
        </div>
      </div>`;
      success.scrollIntoView({behavior:'smooth'});
    }
  };

  window.cNewSale = function() {
    const last = document.getElementById('c-last');
    const first = document.getElementById('c-first');
    const mid = document.getElementById('c-mid');
    const doc = document.getElementById('c-doc');
    const phone = document.getElementById('c-phone');
    const email = document.getElementById('c-email');
    [last,first,mid,doc,phone,email].forEach(i => { if(i) i.value = ''; });
    cSelSeat = null;
    cBuildSeats();
    const pn = document.getElementById('c-pax-name');
    const pa = document.getElementById('c-pax-av');
    if(pn) pn.textContent = 'Пассажир';
    if(pa) pa.textContent = '—';
    const ss = document.getElementById('c-sum-seat');
    if(ss) ss.innerHTML = `<svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M2 7h12" stroke="currentColor" stroke-width="1.2"/></svg> Место не выбрано`;
    const succ = document.getElementById('c-success');
    if(succ) succ.innerHTML = '';
    cToast('Форма очищена — новая продажа');
  };

  window.cToast = function(msg) {
    const t = document.getElementById('c-toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  };

  function cClock() {
    const el = document.getElementById('c-clock');
    if (!el) return;
    const n = new Date();
    el.textContent = String(n.getHours()).padStart(2,'0') + ':' + String(n.getMinutes()).padStart(2,'0');
  }

  cBuildSeats();
  cClock();
  if (!window._cClockInt) window._cClockInt = setInterval(cClock, 30000);
};
