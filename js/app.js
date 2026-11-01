// Marketing Quiz Lab — logic ứng dụng
const GROUPS = [
  { id: "strategy", name: "Chiến lược & phân tích môi trường" },
  { id: "customer", name: "Khách hàng & marketing mix" },
  { id: "brand", name: "Truyền thông & thương hiệu" },
  { id: "digital", name: "Digital marketing" },
  { id: "pricing", name: "Định giá" },
  { id: "metric", name: "Vòng đời & đo lường" }
];
const LV = { 1: "Nền tảng", 2: "Áp dụng", 3: "Phản biện" };
const ROUND = 10, MIX_SIZE = 15, REVIEW_MAX = 20;
const KEYS = ["A", "B", "C", "D", "E", "F", "G"];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const hash = (s) => { let h = 5381; for (const c of s) h = ((h << 5) + h + c.codePointAt(0)) | 0; return (h >>> 0).toString(36); };
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} }
};

// Chuẩn hoá dữ liệu
const ALL = [...TOPICS, ...CASES];
CASES.forEach((c, i) => { c.group = "case"; c.isCase = true; c.code ||= "CASE " + String(i + 1).padStart(2, "0"); });
const QMAP = new Map();
ALL.forEach((t) => t.questions.forEach((q) => {
  q.t ||= "single"; q.lv ||= 1; q.topic = t;
  q.id = t.id + ":" + hash(q.q);
  QMAP.set(q.id, q);
}));
const TOTAL_Q = QMAP.size;

const best = {
  get(id) { return Number(store.get("mq2-best:" + id)) || 0; },
  set(id, pct) { if (pct > this.get(id)) store.set("mq2-best:" + id, pct); }
};
const wrong = {
  load() { try { return new Set(JSON.parse(store.get("mq-wrong") || "[]").filter((id) => QMAP.has(id))); } catch { return new Set(); } },
  save(s) { store.set("mq-wrong", JSON.stringify([...s])); },
  mark(id, ok) { const s = this.load(); ok ? s.delete(id) : s.add(id); this.save(s); }
};

const MIX = { id: "tong-hop", code: "MIX", title: "Thử thách tổng hợp", en: `${MIX_SIZE} câu ngẫu nhiên từ mọi chủ đề`, group: null, special: true };
const REVIEW = { id: "on-cau-sai", code: "REVIEW", title: "Ôn lại câu sai", en: "Những câu bạn từng trả lời sai", group: null, special: true };

// Giao diện sáng / tối
const themeSaved = store.get("mq-theme");
if (themeSaved) document.documentElement.dataset.theme = themeSaved;
$("#theme").addEventListener("click", () => {
  const cur = document.documentElement.dataset.theme;
  const dark = cur ? cur === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = dark ? "light" : "dark";
  store.set("mq-theme", dark ? "light" : "dark");
});

let state = null;
let levelFilter = 0;

function setGroup(g) { if (g) document.body.dataset.group = g; else document.body.removeAttribute("data-group"); }
function view(html) { $("#view").innerHTML = html; }

// ---------- Trang chủ ----------
function renderHome() {
  state = null; setGroup(null);
  $("#mast").hidden = false;
  const tried = TOPICS.filter((t) => best.get(t.id) > 0).length;
  const nWrong = wrong.load().size;
  $("#stats").innerHTML = `
    <div><b>${TOPICS.length}</b><span>chủ đề</span></div>
    <div><b>${CASES.length}</b><span>case study</span></div>
    <div><b>${TOTAL_Q}</b><span>câu hỏi</span></div>
    <div><b>${tried}/${TOPICS.length}</b><span>chủ đề đã thử</span></div>`;
  const card = (t) => {
    const b = best.get(t.id);
    const n = t.questions.length;
    return `<button class="topic" data-go="${t.id}" data-group="${t.group}">
      <span class="code">${esc(t.code)}</span><h3>${esc(t.title)}</h3><span class="en">${esc(t.en)}</span>
      <span class="row"><span class="pill">${n} câu</span>${b ? `<span class="pill ok">Kỷ lục ${b}%</span>` : ""}</span></button>`;
  };
  const mixBest = best.get(MIX.id);
  view(`
    <div class="modes">
      <button class="mode" data-go="${MIX.id}"><span><span class="label" style="color:inherit;opacity:.6">Chế độ ôn luyện</span><h3>${MIX.title}</h3><p>${MIX.en}${mixBest ? ` · Kỷ lục ${mixBest}%` : ""}</p></span><span class="go">Bắt đầu →</span></button>
      <button class="mode alt" data-go="${REVIEW.id}" ${nWrong ? "" : "disabled"}><span><span class="label">Sổ lỗi sai</span><h3>${REVIEW.title}</h3><p>${nWrong ? `${nWrong} câu đang chờ ôn. Trả lời đúng thì câu được gỡ khỏi sổ.` : "Chưa có câu nào. Câu bạn trả lời sai sẽ được lưu ở đây."}</p></span><span class="go">${nWrong ? "Ôn ngay →" : "Trống"}</span></button>
    </div>
    <section class="group" data-group="case"><div class="group-head"><i></i><span class="label">Case study tình huống · nối nhiều mô hình</span></div>
      <div class="shelf">${CASES.map(card).join("")}</div></section>
    ${GROUPS.map((g) => `<section class="group" data-group="${g.id}"><div class="group-head"><i></i><span class="label">${esc(g.name)}</span></div>
      <div class="shelf">${TOPICS.filter((t) => t.group === g.id).map(card).join("")}</div></section>`).join("")}`);
  $$("[data-go]").forEach((el) => el.addEventListener("click", () => { location.hash = el.dataset.go; }));
  foot("Kỷ lục và sổ lỗi sai chỉ lưu trên trình duyệt của bạn. Nội dung tổng hợp từ tài liệu gốc của từng tác giả và giáo trình marketing phổ biến.");
}

// ---------- Trang chủ đề ----------
function renderTopic(t) {
  state = null; setGroup(t.group);
  $("#mast").hidden = true;
  const counts = { 0: t.questions.length, 1: 0, 2: 0, 3: 0 };
  t.questions.forEach((q) => counts[q.lv]++);
  if (!counts[levelFilter]) levelFilter = 0;
  const pool = t.questions.filter((q) => !levelFilter || q.lv === levelFilter);
  const b = best.get(t.id);
  const theory = t.isCase
    ? `<div class="context">${t.context.map((p) => `<p>${esc(p)}</p>`).join("")}${t.facts ? `<ul class="facts">${t.facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}</div>
       <div class="row">${t.models.map((m) => `<span class="pill acc">${esc(m)}</span>`).join("")}</div>`
    : `<p>${esc(t.summary)}</p>${renderDiagram(t.dia)}<ul>${t.keys.map((k) => `<li>${esc(k)}</li>`).join("")}</ul>`;
  const setup = t.isCase
    ? `<div class="actions start"><button class="btn" id="all">Bắt đầu case (${t.questions.length} câu)</button>${b ? `<span class="pill ok" style="align-self:center">Kỷ lục ${b}%</span>` : ""}</div>`
    : `<span class="label">Chọn cấp độ</span>
       <div class="chips">${[0, 1, 2, 3].filter((l) => counts[l]).map((l) => `<button class="chip" data-lv="${l}" aria-pressed="${l === levelFilter}">${l ? LV[l] : "Tất cả"}<small>${counts[l]}</small></button>`).join("")}</div>
       <div class="actions start">
         ${pool.length > ROUND ? `<button class="btn" id="round">Luyện ${ROUND} câu ngẫu nhiên</button>` : ""}
         <button class="btn ${pool.length > ROUND ? "ghost" : ""}" id="all">Làm toàn bộ ${pool.length} câu</button>
         ${b ? `<span class="pill ok" style="align-self:center">Kỷ lục ${b}%</span>` : ""}
       </div>`;
  view(`
    <div class="topbar"><button class="back" id="back">← Tất cả chủ đề</button><span class="label">${esc(t.en)}</span></div>
    <div class="hero"><span class="code">${esc(t.code)}</span><h1>${esc(t.title)}</h1></div>
    <section class="theory"><span class="label">${t.isCase ? "Bối cảnh" : "Thẻ lý thuyết"}</span>${theory}</section>
    <section class="setup">${setup}</section>`);
  $("#back").addEventListener("click", () => { location.hash = ""; });
  $$(".chip").forEach((c) => c.addEventListener("click", () => { levelFilter = Number(c.dataset.lv); renderTopic(t); }));
  const ordered = (qs) => (t.isCase ? qs : qs.slice().sort((a, b) => a.lv - b.lv));
  $("#round")?.addEventListener("click", () => startRound(t, ordered(shuffle(pool).slice(0, ROUND))));
  $("#all").addEventListener("click", () => startRound(t, t.isCase ? t.questions : ordered(shuffle(pool))));
  foot(t.isCase ? "Case study được hư cấu để luyện tập, số liệu chỉ mang tính minh hoạ." : "Câu hỏi được sắp từ dễ đến khó trong mỗi lượt. Thứ tự đáp án được xáo lại mỗi lần.");
  window.scrollTo(0, 0);
}

// ---------- Lượt chơi ----------
function prep(q) {
  const p = { q };
  if (q.t === "order") {
    let items = shuffle(q.items);
    for (let k = 0; k < 5 && items.every((x, i) => x === q.items[i]); k++) items = shuffle(q.items);
    p.items = items;
  } else {
    p.opts = shuffle([...(Array.isArray(q.a) ? q.a : [q.a]), ...q.w]);
  }
  return p;
}

function startRound(topic, qs) {
  if (!qs.length) return;
  state = { topic, list: qs.map(prep), i: 0, res: [], sel: new Set(), seq: [] };
  $("#mast").hidden = true;
  renderQ();
  window.scrollTo(0, 0);
}

function startSpecial(id) {
  if (id === MIX.id) {
    startRound(MIX, shuffle(TOPICS.flatMap((t) => t.questions)).slice(0, MIX_SIZE).sort((a, b) => a.lv - b.lv));
  } else {
    const ids = [...wrong.load()];
    if (!ids.length) return renderHome();
    startRound(REVIEW, shuffle(ids.map((i) => QMAP.get(i))).slice(0, REVIEW_MAX));
  }
}

function correctCount() { return state.res.filter((r) => r && r.ok).length; }

function header() {
  const t = state.topic;
  const track = `<div class="track" aria-hidden="true">${state.list.map((_, k) => {
    const r = state.res[k];
    return `<span class="${r ? (r.ok ? "ok" : "no") : k === state.i ? "now" : ""}"></span>`;
  }).join("")}</div>`;
  const ctx = t.isCase ? `<details class="ctx" ${state.i === 0 && !state.res.length ? "open" : ""}><summary>Bối cảnh case</summary><div class="context">${t.context.map((p) => `<p>${esc(p)}</p>`).join("")}${t.facts ? `<ul class="facts">${t.facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}</div></details>` : "";
  return `
    <div class="topbar"><button class="back" id="back">← ${t.special ? "Tất cả chủ đề" : "Thẻ lý thuyết"}</button><span class="label">${esc(t.code)} · ${esc(t.title)}</span></div>
    ${ctx}${track}`;
}

function answerText(q) {
  if (q.t === "order") return q.items.join(" → ");
  if (q.t === "multi") return q.a.join("; ");
  return q.a;
}

function renderQ() {
  const { list, i } = state;
  const { q } = list[i];
  const p = list[i];
  setGroup(state.topic.group || q.topic.group);
  const r = state.res[i];
  const done = !!r;
  const tagTopic = state.topic.special ? `<span class="tag">${esc(q.topic.code)}</span>` : "";
  let body = "", hint = "";
  if (q.t === "single") {
    body = `<div class="opts">${p.opts.map((o, k) => {
      let cls = "";
      if (done && o === q.a) cls = "right"; else if (done && o === r.pick) cls = "wrong";
      return `<button class="opt ${cls}" data-o="${esc(o)}" ${done ? "disabled" : ""}><span class="key">${KEYS[k]}</span><span>${esc(o)}</span></button>`;
    }).join("")}</div>`;
  } else if (q.t === "multi") {
    hint = `<p class="hint">Chọn tất cả đáp án đúng (${q.a.length} đáp án), rồi bấm Kiểm tra.</p>`;
    body = `<div class="opts multi">${p.opts.map((o, k) => {
      const isA = q.a.includes(o);
      let cls = "";
      if (done) { const picked = r.pick.includes(o); cls = isA ? (picked ? "right" : "missed") : picked ? "wrong" : ""; }
      else if (state.sel.has(o)) cls = "sel";
      return `<button class="opt ${cls}" data-o="${esc(o)}" aria-pressed="${state.sel.has(o)}" ${done ? "disabled" : ""}><span class="key">${KEYS[k]}</span><span>${esc(o)}</span></button>`;
    }).join("")}</div>`;
  } else if (q.t === "order") {
    hint = `<p class="hint">Bấm lần lượt các mục theo đúng thứ tự. Bấm vào mục đã chọn để bỏ ra.</p>`;
    if (done) {
      body = `<div class="opts">${r.pick.map((o, k) => `<button class="opt ${o === q.items[k] ? "right" : "wrong"}" disabled><span class="key">${k + 1}</span><span>${esc(o)}</span></button>`).join("")}</div>`;
    } else {
      const left = p.items.filter((x) => !state.seq.includes(x));
      body = `<div class="seq">${state.seq.map((o, k) => `<button class="opt sel" data-rm="${esc(o)}"><span class="key">${k + 1}</span><span>${esc(o)}</span></button>`).join("")}</div>
        <div class="opts">${left.map((o, k) => `<button class="opt" data-o="${esc(o)}"><span class="key">${KEYS[k]}</span><span>${esc(o)}</span></button>`).join("")}</div>`;
    }
  }
  const canCheck = q.t === "multi" ? state.sel.size > 0 : q.t === "order" ? state.seq.length === q.items.length : false;
  const check = !done && q.t !== "single" ? `<div class="actions">${q.t === "order" ? `<button class="btn ghost" id="reset" ${state.seq.length ? "" : "disabled"}>Xếp lại</button>` : ""}<button class="btn" id="check" ${canCheck ? "" : "disabled"}>Kiểm tra</button></div>` : "";
  const explain = done ? `<div class="explain ${r.ok ? "ok" : "no"}"><strong>${r.ok ? "Chính xác!" : q.t === "single" ? "Chưa đúng. Đáp án: " + esc(q.a) : "Chưa đúng."}</strong>
      ${!r.ok && q.t === "order" ? `<span class="label">Thứ tự đúng</span><ol>${q.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>` : ""}
      ${!r.ok && q.t === "multi" ? `<p>Đáp án đúng: ${esc(q.a.join("; "))}.</p>` : ""}
      <p>${esc(q.e)}</p></div>
      <div class="actions"><button class="btn" id="next">${i + 1 < list.length ? "Câu tiếp theo →" : "Xem kết quả"}</button></div>` : "";
  view(`${header()}
    <article class="card">
      <div class="qhead"><div class="qmeta"><span class="num">Câu ${String(i + 1).padStart(2, "0")} / ${list.length}</span><span class="tag lv">${LV[q.lv]}</span>${tagTopic}</div><span class="score">Đúng ${correctCount()}</span></div>
      <h2 class="q">${esc(q.q)}</h2>${hint}
      ${body}${check}${explain}
    </article>`);
  $("#back").addEventListener("click", leave);
  if (!done) {
    $$(".opts .opt").forEach((b) => b.addEventListener("click", () => choose(b.dataset.o)));
    $$(".seq .opt").forEach((b) => b.addEventListener("click", () => { state.seq = state.seq.filter((x) => x !== b.dataset.rm); renderQ(); }));
    $("#check")?.addEventListener("click", submit);
    $("#reset")?.addEventListener("click", () => { state.seq = []; renderQ(); });
  }
  const nx = $("#next");
  if (nx) { nx.addEventListener("click", next); nx.focus({ preventScroll: true }); }
  foot("Phím tắt: A–G để chọn, Enter để kiểm tra hoặc sang câu tiếp.");
}

function choose(o) {
  const { q } = state.list[state.i];
  if (q.t === "single") return record(o === q.a, o);
  if (q.t === "multi") { state.sel.has(o) ? state.sel.delete(o) : state.sel.add(o); }
  if (q.t === "order") state.seq.push(o);
  renderQ();
}

function submit() {
  const { q } = state.list[state.i];
  if (q.t === "multi") {
    const pick = [...state.sel];
    const ok = pick.length === q.a.length && pick.every((x) => q.a.includes(x));
    record(ok, pick);
  } else if (q.t === "order" && state.seq.length === q.items.length) {
    record(state.seq.every((x, k) => x === q.items[k]), state.seq.slice());
  }
}

function record(ok, pick) {
  const { q } = state.list[state.i];
  state.res[state.i] = { ok, pick };
  wrong.mark(q.id, ok);
  renderQ();
}

function next() {
  state.sel = new Set(); state.seq = [];
  if (state.i + 1 < state.list.length) { state.i++; renderQ(); window.scrollTo({ top: 0, behavior: "smooth" }); }
  else renderResult();
}

function leave() {
  const t = state.topic;
  state = null;
  if (t.special) location.hash = "";
  else renderTopic(t);
}

function verdict(r) {
  if (r === 1) return "Nắm vững như giảng viên. Bạn hiểu cả nguồn gốc lẫn cách áp dụng.";
  if (r >= .8) return "Rất chắc tay. Chỉ còn vài chi tiết cần ôn lại.";
  if (r >= .5) return "Nền tảng ổn. Đọc lại phần giải thích để lấp chỗ hổng.";
  return "Nên mở thẻ lý thuyết và thử lại một lượt nữa.";
}

function renderResult() {
  const { topic, list, res } = state;
  const c = correctCount();
  const pct = Math.round((c / list.length) * 100);
  if (topic !== REVIEW) best.set(topic.id, pct);
  if (topic.special) setGroup(null);
  const by = [1, 2, 3].map((l) => {
    const idx = list.map((p, k) => (p.q.lv === l ? k : -1)).filter((k) => k >= 0);
    return idx.length ? `<span class="pill">${LV[l]}: ${idx.filter((k) => res[k].ok).length}/${idx.length}</span>` : "";
  }).join("");
  const left = wrong.load().size;
  view(`${header()}
    <article class="card result">
      <span class="label">Kết quả · ${pct}%</span>
      <div class="big">${c}<small> / ${list.length}</small></div>
      <p class="verdict">${verdict(c / list.length)}</p>
      <div class="bylv">${by}${left ? `<span class="pill acc">Sổ lỗi sai: ${left} câu</span>` : ""}</div>
      <ul class="review">${list.map(({ q }, k) => {
        const r = res[k];
        const pick = Array.isArray(r.pick) ? r.pick.join(q.t === "order" ? " → " : "; ") : r.pick;
        return `<li><span class="mark ${r.ok ? "ok" : "no"}">${r.ok ? "✓" : "✗"}</span><span>${esc(q.q)}<br><span class="ans">${r.ok ? esc(answerText(q)) : `Bạn chọn: ${esc(pick)} · Đáp án: ${esc(answerText(q))}`}</span></span></li>`;
      }).join("")}</ul>
      <div class="actions">
        <button class="btn ghost" id="lib">${topic.special ? "Về trang chủ" : "Về thẻ lý thuyết"}</button>
        ${topic === REVIEW && !left ? "" : `<button class="btn" id="again">${topic === REVIEW ? "Ôn tiếp" : "Làm lượt mới"}</button>`}
      </div>
    </article>`);
  $("#back").addEventListener("click", leave);
  $("#lib").addEventListener("click", leave);
  $("#again")?.addEventListener("click", () => {
    if (topic.special) startSpecial(topic.id);
    else renderTopic(topic);
  });
  window.scrollTo(0, 0);
}

function foot(text) { $("#foot").textContent = text; }

function route() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (id === MIX.id || id === REVIEW.id) return startSpecial(id);
  const t = ALL.find((x) => x.id === id);
  if (t) { levelFilter = 0; renderTopic(t); } else renderHome();
}

document.addEventListener("keydown", (e) => {
  if (!state || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.target.closest && e.target.closest("summary")) return;
  if (e.key === "Enter") {
    const b = $("#next") || $("#check");
    if (b && !b.disabled && document.activeElement !== b) { e.preventDefault(); b.click(); }
    return;
  }
  const k = KEYS.indexOf(e.key.toUpperCase());
  const btns = $$(".opts .opt:not(:disabled)");
  if (k >= 0 && btns[k]) btns[k].click();
});
window.addEventListener("hashchange", route);
route();
