// Sơ đồ minh hoạ cho phần lý thuyết. Mỗi chủ đề khai báo `dia: { type, ... }`.
(function () {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const box = (it, cls = "", style = "") => {
    const [t, s] = Array.isArray(it) ? it : [it, ""];
    return `<div class="box ${cls}"${style ? ` style="${style}"` : ""}><b>${esc(t)}</b>${s ? `<span>${esc(s)}</span>` : ""}</div>`;
  };
  const tone = (d, i) => (d.tone ? ({ s: "strong", m: "mid", l: "low" })[d.tone[i]] || "" : "");

  const R = {
    matrix(d) {
      return `<div class="mx"><div class="yax">${esc(d.y)}</div>${d.cells.map((c, i) => box(c, tone(d, i))).join("")}<div></div><div class="xax">${esc(d.x)}</div></div>`;
    },
    grid3(d) {
      return `<div class="g3"><div class="yax">${esc(d.y)}</div>${d.cells.map((c, i) => box(c, tone(d, i))).join("")}<div></div><div class="xax">${esc(d.x)}</div></div>`;
    },
    pyramid(d) {
      const n = d.levels.length;
      return `<div class="pyr">${d.levels.map((l, i) => box(l, i === 0 ? "strong" : "", `width:${Math.round(42 + (58 * i) / Math.max(1, n - 1))}%`)).join("")}</div>`;
    },
    funnel(d) {
      const n = d.stages.length;
      return `<div class="funnel">${d.stages.map((l, i) => box(l, i === n - 1 ? "strong" : "", `width:${Math.round(100 - (50 * i) / Math.max(1, n - 1))}%`)).join("")}</div>`;
    },
    steps(d) { return `<div class="steps">${d.steps.map((s) => box(s)).join("")}</div>`; },
    cards(d) { return `<div class="cards">${d.items.map((s, i) => box(s, tone(d, i))).join("")}</div>`; },
    triangle(d) {
      return `<div class="tri"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polygon points="50,14 22,84 78,84"/></svg>
        ${box(d.nodes[0], "top")}<div class="mid">${esc(d.center)}</div>${box(d.nodes[1])}${box(d.nodes[2])}</div>`;
    },
    forces(d) {
      return `<div class="forces">${box(d.top, "t")}${box(d.left, "l")}${box(d.center, "m strong")}${box(d.right, "r")}${box(d.bottom, "b")}</div>`;
    },
    circles(d) {
      // rings: ngoài → trong; phần tử cuối là lõi
      const [o, m, c] = d.rings;
      return `<div class="circles"><div class="ring" style="width:min(340px,92%);aspect-ratio:1">
        <b>${esc(o[0])}</b><span>${esc(o[1])}</span>
        <div class="ring" style="width:68%;aspect-ratio:1;margin-top:8px"><b>${esc(m[0])}</b><span>${esc(m[1])}</span>
          <div class="core" style="width:58%;aspect-ratio:1"><div><b>${esc(c[0])}</b><br><span style="font-size:11.5px">${esc(c[1])}</span></div></div>
        </div></div></div>`;
    },
    canvas(d) {
      const col = (c) => `<div><span class="label">${esc(c.title)}</span>${c.items.map((x) => box(x)).join("")}</div>`;
      return `<div class="canvas2">${col(d.left)}${col(d.right)}</div>`;
    },
    table(d) {
      return `<div class="dwrap"><table class="dtable"><thead><tr>${d.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${d.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    },
    plc() {
      const W = 640, H = 260, x0 = 30, y0 = 220;
      const stages = ["Giới thiệu", "Tăng trưởng", "Bão hoà", "Suy thoái"];
      const xs = [x0, 160, 330, 500, 620];
      return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Đường doanh số và lợi nhuận theo vòng đời sản phẩm">
        <line class="axis" x1="${x0}" y1="${y0}" x2="620" y2="${y0}"/><line class="axis" x1="${x0}" y1="20" x2="${x0}" y2="${y0}"/>
        <line class="sep" x1="${x0}" y1="160" x2="620" y2="160"/>
        ${xs.slice(1, 4).map((x) => `<line class="sep" x1="${x}" y1="20" x2="${x}" y2="${y0}"/>`).join("")}
        <path class="curve" d="M30,215 C110,212 130,190 160,165 S260,60 330,48 S450,50 500,80 S590,150 620,175"/>
        <path class="curve2" d="M30,160 C90,175 120,190 160,170 S260,80 300,78 S420,105 500,140 S590,175 620,185"/>
        <text x="${x0 + 4}" y="155">0</text>
        ${stages.map((s, i) => `<text class="hl" x="${(xs[i] + xs[i + 1]) / 2}" y="242" text-anchor="middle">${s}</text>`).join("")}
      </svg><div class="legend"><span><i></i>Doanh số</span><span><i class="d"></i>Lợi nhuận</span></div></div>`;
    },
    bell() {
      const W = 640, H = 250, y0 = 200, mu = 360, sd = 90, amp = 160;
      const f = (x) => y0 - amp * Math.exp(-0.5 * ((x - mu) / sd) ** 2);
      let d = `M20,${f(20).toFixed(1)}`;
      for (let x = 24; x <= 620; x += 4) d += ` L${x},${f(x).toFixed(1)}`;
      const cuts = [mu - 2 * sd, mu - sd, mu, mu + sd];
      const segs = [["Innovators", "2,5%", 120], ["Early adopters", "13,5%", mu - 1.5 * sd], ["Early majority", "34%", mu - 0.5 * sd], ["Late majority", "34%", mu + 0.5 * sd], ["Laggards", "16%", mu + 1.8 * sd]];
      return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Đường cong lan toả đổi mới của Rogers">
        <path class="area" d="${d} L620,${y0} L20,${y0} Z"/><path class="curve" d="${d}"/>
        <line class="axis" x1="20" y1="${y0}" x2="620" y2="${y0}"/>
        ${cuts.map((x) => `<line class="sep" x1="${x}" y1="${f(x)}" x2="${x}" y2="${y0}"/>`).join("")}
        ${segs.map(([n, p, x], i) => `<text class="hl" x="${x}" y="${i % 2 ? 222 : 238}" text-anchor="middle">${n}</text><text x="${x}" y="${Math.min(f(x) + 30, 188)}" text-anchor="middle">${p}</text>`).join("")}
        <text x="${mu - 1.5 * sd}" y="20" text-anchor="middle">↓ vực thẳm (Moore)</text>
        <line class="sep" x1="${mu - sd}" y1="26" x2="${mu - sd}" y2="${f(mu - sd)}"/>
      </svg></div>`;
    }
  };

  window.renderDiagram = function (d) {
    if (Array.isArray(d)) return d.map(window.renderDiagram).join("");
    if (!d || !R[d.type]) return "";
    return `<figure class="dia" style="margin:0">${d.title ? `<span class="label dia-title">${esc(d.title)}</span>` : ""}${R[d.type](d)}</figure>`;
  };
})();
