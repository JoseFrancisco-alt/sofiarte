/* =========================================================
   CONTEÚDO — edite aqui.
   Coloque as fotos na pasta img/ e preencha "photos"
   (ex.: ["img/t01-1.jpg", "img/t01-2.jpg"]).
   Lista vazia = mostra o desenho fine line no lugar da foto.
   ========================================================= */
const WHATSAPP = ""; // só números com DDI+DDD, ex.: "5582999999999"

// Fotos tiradas do Instagram @sofiarte_tattoo (out/2026). Trocar pelos originais em alta quando ela mandar.
// r = proporção da foto (largura/altura), w = largura do quadro na parede, y = altura em que ele fica pendurado.
const WORKS = [
  { title: "Fundo do mar",       place: "Braço",     cat: "mar",      art: "turtle",  photos: ["img/w-fundo-do-mar.jpg"],    r: "3/4",  w: 330, y: 0 },
  { title: "Lírios",             place: "Braço",     cat: "vermelho", art: "branch",  photos: ["img/w-lirios-vermelho.jpg"], r: "3/4",  w: 280, y: 60 },
  { title: "Peixe-leão",         place: "Antebraço", cat: "mar",      art: "fish",    photos: ["img/w-peixe-leao.jpg"],      r: "5/6",  w: 300, y: -30 },
  { title: "Sol e lua",          place: "Antebraço", cat: "sol",      art: "branch",  photos: ["img/w-sol-lua.jpg"],         r: "9/16", w: 220, y: 30 },
  { title: "Galho de cerejeira", place: "Ombro",     cat: "flor",     art: "branch",  photos: ["img/w-cerejeira.jpg"],       r: "6/7",  w: 320, y: -10 },
  { title: "Andorinhas",         place: "Ombro",     cat: "vermelho", art: "bird",    photos: ["img/w-andorinhas.jpg"],      r: "3/4",  w: 270, y: 50 },
  { title: "Fluidez",            place: "Braço",     cat: "mar",      art: "fish",    photos: ["img/w-fluidez.jpg"],         r: "3/4",  w: 290, y: -20 },
  { title: "Vaso com flores",    place: "Antebraço", cat: "flor",     art: "vase",    photos: ["img/w-vaso-flores.jpg"],     r: "9/16", w: 220, y: 40 },
  { title: "Sol",                place: "Braço",     cat: "sol",      art: "branch",  photos: ["img/w-sol.jpg"],             r: "3/4",  w: 280, y: -20 },
  { title: "Coluna florida",     place: "Costas",    cat: "flor",     art: "branch",  photos: ["img/w-coluna.jpg"],          r: "3/4",  w: 310, y: 20 },
  { title: "Sonder",             place: "Tornozelo", cat: "vermelho", art: "branch",  photos: ["img/w-sonder.jpg"],          r: "9/16", w: 210, y: -30 },
  { title: "Peixe-anjo",         place: "Antebraço", cat: "mar",      art: "fish",    photos: ["img/w-peixe-anjo.jpg"],      r: "3/4",  w: 290, y: 40 },
  { title: "Flores no braço",    place: "Braço",     cat: "flor",     art: "branch",  photos: ["img/w-flores-braco.jpg"],    r: "9/16", w: 220, y: 0 },
];

// Tatuagem sobre cicatriz (seção "Ressignificar").
const SCARS = [
  { src: "img/r-cicatriz-1.jpg", alt: "Folhas e joaninha tatuadas sobre cicatriz" },
  { src: "img/r-cicatriz-2.jpg", alt: "Lírio e libélulas tatuados sobre cicatriz no antebraço" },
];

// Fotos "no dia" e "cicatrizada" da mesma peça (deixe vazio pra usar o desenho).
const HEALED = [
  { name: "Joaninha",  place: "Perna",       art: "ladybug",   day: "", healed: "" },
  { name: "Borboleta", place: "Panturrilha", art: "butterfly", day: "", healed: "" },
  { name: "Tartaruga", place: "Braço",       art: "turtle",    day: "", healed: "" },
];

const TRIPS = [
  { tag: "Base fixa", city: "Maceió", region: ", AL", dates: "O ano todo", where: "Estúdio", status: "on",   pill: "Agenda aberta" },
  { tag: "Próxima",   city: "[Cidade]", region: "",   dates: "[datas]",    where: "[Estúdio parceiro]", status: "soon", pill: "Lista de espera" },
  { tag: "Já passou", city: "Austin", region: ", TX", dates: "21 a 30 de setembro", where: "EUA", status: "past", pill: "Ver fotos" },
  { tag: "Já passou", city: "Salvador", region: ", BA", dates: "Uma semana de guest spot", where: "Brasil", status: "past", pill: "Ver fotos" },
];

const STAMPS = [
  { code: "BR", name: "Brasil", t: -10, red: true },
  { code: "CH", name: "Suíça",  t: 7 },
  { code: "FR", name: "França", t: -4 },
  { code: "IT", name: "Itália", t: 11 },
  { code: "US", name: "EUA",    t: -7 },
  { code: "JP", name: "Japão",  t: 5 },
];

// size/price vazios = não aparece. available:false = ponto vermelho (reservado).
const FLASHES = [
  { name: "Ramo",      size: "≈ 8 cm",  price: "", available: true,  art: "branch", rot: -1.5, img: "" },
  { name: "Água-viva", size: "≈ 12 cm", price: "", available: true,  art: "jelly",  rot: 1.2,  img: "" },
  { name: "Concha",    size: "≈ 6 cm",  price: "", available: false, art: "shell",  rot: -.8,  img: "" },
];

/* ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
const store = {
  get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, v); } catch {} },
};

/* ---------- desenhos fine line (aparecem enquanto não há foto) ---------- */
const ART = {
  jelly: ["0 0 200 270", `
    <path d="M40 104 C38 44 162 44 160 104 C150 112 140 99 130 108 C120 116 110 101 100 110 C90 101 80 116 70 108 C60 99 50 112 40 104Z"/>
    <path d="M58 94 C64 62 136 62 142 94"/><path d="M76 86 C84 70 116 70 124 86"/>
    <path class="tent" d="M68 112 C62 142 78 162 70 192 C64 216 74 236 68 258"/>
    <path class="tent" d="M88 114 C94 146 82 172 90 202 C96 226 86 244 90 262"/>
    <path class="tent" d="M112 114 C106 144 120 168 112 198 C106 222 116 240 110 258"/>
    <path class="tent" d="M132 112 C140 142 126 166 134 194 C140 216 130 234 136 252"/>
    <path class="tent" d="M100 112 C98 128 104 140 100 156 C97 168 103 176 100 188"/>`],
  turtle: ["0 0 220 200", `
    <path d="M110 50 C150 50 175 80 175 110 C175 140 150 160 110 160 C70 160 45 140 45 110 C45 80 70 50 110 50Z"/>
    <path d="M110 50 C100 40 100 22 110 15 C120 22 120 40 110 50"/>
    <path d="M65 72 C40 52 22 54 16 62 C28 72 44 80 58 84"/><path d="M155 72 C180 52 198 54 204 62 C192 72 176 80 162 84"/>
    <path d="M72 148 C56 164 50 178 56 183 C66 177 76 166 84 156"/><path d="M148 148 C164 164 170 178 164 183 C154 177 144 166 136 156"/>
    <path d="M110 82 L132 94 L132 120 L110 132 L88 120 L88 94Z"/>
    <path d="M110 82 L110 52"/><path d="M132 94 L162 76"/><path d="M132 120 L166 136"/><path d="M110 132 L110 158"/><path d="M88 120 L54 136"/><path d="M88 94 L58 76"/>
    <circle class="dot" cx="106" cy="27" r="1.6"/>`],
  fish: ["0 0 220 200", `
    <path d="M40 100 C70 72 128 70 160 100 C128 130 70 128 40 100Z"/>
    <path d="M160 100 L192 80 L186 100 L192 120Z"/>
    <path d="M68 86 C76 96 76 106 68 116"/>
    <path d="M72 82 L58 28"/><path d="M86 78 L80 18"/><path d="M100 76 L104 14"/><path d="M114 77 L126 20"/><path d="M128 81 L148 32"/>
    <path d="M58 28 C66 50 70 66 72 82"/><path d="M104 14 C100 40 98 60 100 76"/><path d="M148 32 C136 50 130 66 128 81"/>
    <path d="M96 104 C80 132 62 150 40 162"/><path d="M104 106 C94 138 82 162 66 182"/><path d="M110 106 C108 136 104 160 96 186"/>
    <circle class="dot" cx="54" cy="96" r="2"/>`],
  vase: ["0 0 200 270", `
    <path d="M78 262 C58 252 60 214 80 204 L80 194 L120 194 L120 204 C140 214 142 252 122 262Z"/>
    <path d="M70 230 C90 236 110 236 130 230"/><path d="M84 214 L116 214"/>
    <path d="M100 194 C98 150 104 120 100 84"/><path d="M96 194 C80 160 64 140 54 112"/><path d="M104 194 C122 162 136 142 148 116"/>
    <path d="M100 84 C88 70 90 52 100 46 C110 52 112 70 100 84"/><path d="M100 84 C84 82 74 70 76 60 C88 60 98 70 100 84"/><path d="M100 84 C116 82 126 70 124 60 C112 60 102 70 100 84"/>
    <circle cx="54" cy="104" r="9"/><circle cx="54" cy="104" r="3"/><circle cx="148" cy="108" r="9"/><circle cx="148" cy="108" r="3"/>
    <path d="M100 150 C82 146 74 132 76 124 C90 128 98 138 100 150"/><path d="M101 130 C118 124 126 112 124 104 C110 108 102 118 101 130"/>`],
  bird: ["0 0 220 180", `
    <path d="M58 102 C80 82 120 80 140 92 C150 98 150 110 138 114 C115 122 85 120 58 102Z"/>
    <path d="M140 92 C145 76 165 76 168 89 C170 99 160 105 150 103"/><path d="M166 87 L212 79"/>
    <path d="M100 90 C95 52 110 22 140 11 C135 42 125 72 112 88"/><path d="M108 88 C110 62 122 42 140 11"/>
    <path d="M60 102 C40 107 22 122 12 140"/><path d="M60 104 C45 117 35 134 32 152"/><path d="M62 106 C55 124 52 142 56 160"/>
    <circle class="dot" cx="156" cy="88" r="1.8"/><circle class="red" cx="100" cy="150" r="5"/>`],
  butterfly: ["0 0 200 200", `
    <path d="M100 62 L100 152"/>
    <path d="M100 82 C70 30 18 30 28 82 C34 106 70 106 100 96"/><path d="M100 102 C70 106 44 126 54 152 C64 172 92 152 100 116"/>
    <path d="M100 82 C130 30 182 30 172 82 C166 106 130 106 100 96"/><path d="M100 102 C130 106 156 126 146 152 C136 172 108 152 100 116"/>
    <path d="M100 64 C95 46 88 38 78 33"/><path d="M100 64 C105 46 112 38 122 33"/>
    <path d="M100 88 C80 70 54 58 40 62"/><path d="M100 88 C120 70 146 58 160 62"/>
    <path d="M100 108 C82 118 70 132 66 146"/><path d="M100 108 C118 118 130 132 134 146"/>
    <path d="M30 150 C55 160 70 182 72 198"/><path d="M50 166 C42 172 40 180 44 188"/>`],
  ladybug: ["0 0 200 200", `
    <path d="M78 70 C80 50 120 50 122 70"/>
    <path class="red" d="M100 66 C140 66 160 98 160 128 C160 162 134 182 100 182 C66 182 40 162 40 128 C40 98 60 66 100 66Z"/>
    <path d="M100 68 L100 182"/>
    <circle class="dot" cx="72" cy="108" r="8"/><circle class="dot" cx="128" cy="108" r="8"/><circle class="dot" cx="66" cy="146" r="7"/><circle class="dot" cx="134" cy="146" r="7"/><circle class="dot" cx="88" cy="166" r="5"/><circle class="dot" cx="112" cy="166" r="5"/>
    <path d="M88 54 C80 38 72 32 62 30"/><path d="M112 54 C120 38 128 32 138 30"/>
    <path d="M44 110 L22 100"/><path d="M42 136 L18 140"/><path d="M50 162 L30 176"/><path d="M156 110 L178 100"/><path d="M158 136 L182 140"/><path d="M150 162 L170 176"/>`],
  branch: ["0 0 200 270", `
    <path d="M100 262 C96 200 108 140 98 40"/>
    <path d="M100 222 C70 214 56 190 58 172 C78 176 96 198 100 222"/><path d="M101 190 C132 180 146 158 144 140 C122 146 104 168 101 190"/>
    <path d="M100 150 C74 142 64 122 66 106 C84 112 98 130 100 150"/><path d="M100 118 C124 110 134 92 132 76 C114 82 102 100 100 118"/>
    <path d="M98 40 C86 30 88 14 98 8 C108 14 110 30 98 40"/><path d="M98 40 C84 40 76 30 78 22"/><path d="M98 40 C112 40 120 30 118 22"/>
    <path d="M100 222 L79 197"/><path d="M101 190 L125 162"/><path d="M100 150 L80 125"/><path d="M100 118 L118 94"/>
    <circle class="red" cx="98" cy="32" r="3"/>`],
  shell: ["0 0 200 200", `
    <path d="M100 172 L38 92 C56 36 144 36 162 92Z"/>
    <path d="M100 172 L56 64"/><path d="M100 172 L76 48"/><path d="M100 172 L100 44"/><path d="M100 172 L124 48"/><path d="M100 172 L144 64"/>
    <path d="M86 172 L114 172 L108 184 L92 184Z"/>
    <path d="M50 110 C80 100 120 100 150 110"/><path d="M62 132 C86 124 114 124 138 132"/>`],
};

function artSVG(key, extra = "") {
  const [vb, body] = ART[key] || ART.jelly;
  return `<svg class="art draw ${extra}" viewBox="${vb}" aria-hidden="true">${body}</svg>`;
}
function prepDraw(svg) {
  fitStroke(svg);
  $$("path, circle, ellipse, line", svg).forEach((p, i) => {
    let len = 400;
    try { len = Math.ceil(p.getTotalLength()) + 2; } catch {}
    p.style.setProperty("--len", len);
    p.style.setProperty("--d", `${(i * 0.08).toFixed(2)}s`);
  });
}
// traço com espessura constante na tela, qualquer que seja o tamanho do desenho
function fitStroke(svg) {
  const vb = svg.viewBox.baseVal, w = svg.getBoundingClientRect().width;
  if (vb && vb.width && w) svg.style.setProperty("--inv", (vb.width / w).toFixed(3));
}
const fitAll = () => $$("svg.art").forEach(fitStroke);
function mediaHTML(src, art, label) {
  return src ? `<img src="${src}" alt="${label}" loading="lazy">` : artSVG(art);
}

const drawIO = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("drawn"); drawIO.unobserve(en.target); } });
}, { threshold: 0.25 });
function watchDraw(root = document) {
  $$(".draw", root).forEach((svg) => { prepDraw(svg); reduce ? svg.classList.add("drawn") : drawIO.observe(svg); });
}

/* ---------- reveal ---------- */
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); } });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

/* =========================================================
   MONTAGEM DO CONTEÚDO
   ========================================================= */

/* água-viva do hero */
{
  const j = $(".jelly");
  j.innerHTML = ART.jelly[1];
  j.classList.add("art", "draw");
}

/* parede de trabalhos */
const track = $("#wallTrack");
track.innerHTML = WORKS.map((w, i) => `
  <button class="piece" data-i="${i}" data-cat="${w.cat}" data-cursor="ampliar" style="--w:${w.w};--y:${w.y}" aria-label="Ampliar ${w.title}">
    <span class="lamp" aria-hidden="true"></span>
    <span class="swing" data-swing>
      <span class="nail" aria-hidden="true"></span><span class="wire" aria-hidden="true"></span>
      <span class="frame ${i % 2 ? "thin" : ""}" style="display:block"><span class="mat" style="display:block;--r:${w.r}">${mediaHTML(w.photos[0], w.art, w.title)}</span></span>
    </span>
    <span class="plaque"><b>${w.title}</b><span>Fine line</span><small>${w.place}${w.photos.length > 1 ? ` · ${w.photos.length} fotos` : ""}</small></span>
  </button>`).join("");

/* cicatrizadas */
const thumbs = $("#healedThumbs");
thumbs.innerHTML = HEALED.map((h, i) => `
  <button class="thumb" aria-pressed="${i === 0}" data-i="${i}" aria-label="${h.name}, ${h.place}">
    <span class="mat" style="display:block">${h.day ? `<img src="${h.day}" alt="">` : artSVG(h.art, "drawn")}</span>
  </button>`).join("");
function showHealed(i) {
  const h = HEALED[i];
  $("#cmpBefore").innerHTML = h.day ? `<img src="${h.day}" alt="${h.name} no dia da sessão">` : artSVG(h.art, "drawn");
  $("#cmpAfter").innerHTML = h.healed ? `<img src="${h.healed}" alt="${h.name} cicatrizada">` : artSVG(h.art, "drawn");
  $$(".thumb").forEach((t) => t.setAttribute("aria-pressed", +t.dataset.i === i));
  requestAnimationFrame(() => $$("#compare svg.art").forEach(fitStroke));
}
thumbs.addEventListener("click", (e) => { const t = e.target.closest(".thumb"); if (t) showHealed(+t.dataset.i); });
showHealed(0);

/* ressignificar */
$("#scarFrames").innerHTML = SCARS.map((s, i) => `
  <figure class="scar-piece reveal" style="transition-delay:${i * 150}ms">
    <div class="swing" data-swing><span class="nail" aria-hidden="true"></span><span class="wire" aria-hidden="true"></span>
      <div class="frame thin"><div class="mat" style="--r:9/16"><img src="${s.src}" alt="${s.alt}" loading="lazy"></div></div>
    </div>
  </figure>`).join("");
{
  const scar = $("#ressignificar");
  $$(".scar-stroke path", scar).forEach((p) => { const l = Math.ceil(p.getTotalLength()); p.style.strokeDasharray = l; p.style.strokeDashoffset = l; });
  const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { scar.classList.add("go"); io.disconnect(); } }, { threshold: 0.3 });
  reduce ? scar.classList.add("go") : io.observe(scar);
}

/* viagens */
$("#trips").innerHTML = TRIPS.map((t) => `
  <article class="trip reveal ${t.status === "past" ? "past" : ""}">
    <span class="postmark" aria-hidden="true">${t.status === "past" ? "visitado" : t.status === "on" ? "aberto" : "em breve"}</span>
    <span class="kicker-mono">${t.tag}</span>
    <h3 class="city">${t.city}<em>${t.region}</em></h3>
    <span class="dates">${t.dates}</span>
    <div class="foot"><span class="kicker-mono">${t.where}</span>
      ${t.status === "past"
        ? `<a class="pill" href="https://www.instagram.com/sofiarte_tattoo/" target="_blank" rel="noopener">${t.pill} →</a>`
        : `<a class="pill ${t.status === "on" ? "on" : ""}" href="#agendar">${t.pill}</a>`}
    </div>
  </article>`).join("");
$("#stamps").innerHTML = STAMPS.map((s) => `
  <span class="stamp ${s.red ? "red" : ""}" style="--t:${s.t}deg"><b>${s.code}</b><small>${s.name}</small></span>`).join("");

/* flashes */
$("#flashGrid").innerHTML = FLASHES.map((f, i) => {
  const n = String(i + 1).padStart(2, "0");
  const meta = [f.size, f.price].filter(Boolean).join(" · ");
  return `
  <article class="flash reveal ${f.available ? "" : "reserved"}" style="transition-delay:${i * 90}ms" ${f.available ? 'data-cursor="quero esse"' : ""}>
    <div class="sheet" style="--rot:${f.rot}deg"><div class="mat">${mediaHTML(f.img, f.art, `Flash ${f.name}`)}</div><span class="flash-no">Nº ${n}</span></div>
    <div class="flash-meta"><div><h3>${f.name}</h3>${meta ? `<small>${meta}</small>` : ""}</div>${f.available ? "" : '<span class="sticker" title="Reservado"></span>'}</div>
    ${f.available
      ? `<a class="btn" href="#agendar" data-flash="${f.name}">Quero esse <b>→</b></a>`
      : `<span class="btn" aria-disabled="true">Reservado</span>`}
  </article>`;
}).join("") + `
  <a class="flash flash-cta reveal" href="#agendar" style="transition-delay:${FLASHES.length * 90}ms" data-cursor="vamos criar">
    <span class="kicker-mono">Exclusivo</span>
    <strong>Quer um desenho <em>só seu?</em></strong>
    <span class="text">Conte a ideia e ela cria do zero.</span>
  </a>`;

/* hero: título letra por letra */
$$(".ht-line").forEach((line, li) => {
  line.innerHTML = [...line.textContent].map((c, i) => `<span class="ch" style="transition-delay:${(li * 0.18 + i * 0.07).toFixed(2)}s">${c}</span>`).join("");
});

/* manifesto: palavra por palavra */
const manifesto = $("#manifesto-text");
{
  const wrap = (node) => {
    [...node.childNodes].forEach((c) => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(part); return; }
          const s = document.createElement("span"); s.className = "w"; s.textContent = part; frag.append(s);
        });
        c.replaceWith(frag);
      } else if (c.nodeType === 1) wrap(c);
    });
  };
  wrap(manifesto);
  const dot = document.createElement("span"); dot.className = "period"; manifesto.append(dot);
}
const mWords = $$(".w", manifesto);

/* ramo lateral: folhas ao longo do caminho */
const vinePath = $("#vinePath");
const vineLen = vinePath.getTotalLength();
vinePath.style.strokeDasharray = vineLen;
vinePath.style.strokeDashoffset = vineLen;
const leaves = [];
{
  const svg = $("#vine");
  for (let i = 1; i < 14; i++) {
    const t = i / 14, p = vinePath.getPointAtLength(vineLen * t), side = i % 2 ? 1 : -1;
    const leaf = document.createElementNS("http://www.w3.org/2000/svg", "path");
    leaf.setAttribute("d", `M${p.x} ${p.y} C${p.x + 10 * side} ${p.y - 14} ${p.x + 22 * side} ${p.y - 10} ${p.x + 26 * side} ${p.y - 18} C${p.x + 16 * side} ${p.y - 2} ${p.x + 8 * side} ${p.y + 2} ${p.x} ${p.y}`);
    leaf.setAttribute("class", "leaf");
    svg.append(leaf);
    leaves.push({ el: leaf, t });
  }
  const end = vinePath.getPointAtLength(vineLen);
  const berry = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  berry.setAttribute("cx", end.x); berry.setAttribute("cy", end.y - 6); berry.setAttribute("r", 4); berry.setAttribute("class", "berry");
  svg.append(berry);
  leaves.push({ el: berry, t: 0.985 });
}

$$(".title.reveal").forEach((t) => { t.innerHTML = `<span class="ink">${t.innerHTML}</span>`; });
// desenhos da parede são acionados pela luz de cada quadro (ver updateWall)
$$(".piece .draw").forEach((svg) => { prepDraw(svg); svg.classList.remove("draw"); svg.classList.add("draw-wall"); });
watchDraw();
$$(".reveal").forEach((el) => revealIO.observe(el));

/* =========================================================
   PRELOADER + ENTRADA DO HERO
   ========================================================= */
const hero = $(".hero");
(() => {
  const loader = $("#loader");
  const start = () => hero.classList.add("go");
  if (reduce || store.get("sofiaSeen")) { loader.remove(); requestAnimationFrame(start); return; }
  document.body.classList.add("loading");
  const finish = () => {
    loader.classList.add("done");
    document.body.classList.remove("loading");
    setTimeout(start, 250);
    setTimeout(() => loader.remove(), 1300);
    store.set("sofiaSeen", "1");
  };
  (document.fonts?.ready || Promise.resolve()).then(() => setTimeout(finish, 2900));
})();

/* =========================================================
   NAV
   ========================================================= */
const nav = $("#nav"), burger = $("#burger"), navLinks = $("#navLinks");
burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { navLinks.classList.remove("open"); burger.setAttribute("aria-expanded", false); }
});

/* =========================================================
   PAREDE DE TRABALHOS — scroll horizontal + quadros balançando
   ========================================================= */
const wallSection = $("#trabalhos"), wallViewport = $("#wallViewport");
const desktopWall = () => matchMedia("(min-width: 881px)").matches && !reduce;
let wallMax = 0, wallX = 0, lastWallX = 0;

function layoutWall() {
  if (desktopWall()) {
    // escala os quadros pra caber na altura livre da parede
    track.style.setProperty("--k", 1);
    const pieces = $$(".piece:not(.out)", track);
    const tallest = Math.max(...pieces.map((p) => p.offsetHeight + Math.abs(parseFloat(getComputedStyle(p).marginTop))));
    track.style.setProperty("--k", clamp((wallViewport.clientHeight * 0.96) / tallest, 0.45, 1.4).toFixed(3));
    wallMax = Math.max(0, track.scrollWidth - innerWidth);
    wallSection.style.height = `${wallMax + innerHeight}px`;
  } else {
    wallMax = 0;
    wallSection.style.height = "";
    track.style.transform = "";
  }
  updateWall();
}

function updateWall() {
  const pieces = $$(".piece:not(.out)", track);
  let progress;
  if (desktopWall()) {
    const top = wallSection.offsetTop;
    progress = wallMax ? clamp((scrollY - top) / wallMax, 0, 1) : 0;
    wallX = -progress * wallMax;
    track.style.transform = `translate3d(${wallX}px,0,0)`;
  } else {
    const max = wallViewport.scrollWidth - wallViewport.clientWidth;
    progress = max > 0 ? wallViewport.scrollLeft / max : 0;
    wallX = -wallViewport.scrollLeft;
  }
  $("#wallBar").style.transform = `scaleX(${progress})`;
  // luz acende no quadro que está passando pelo meio da tela
  let current = 0;
  pieces.forEach((p, i) => {
    const r = p.getBoundingClientRect();
    const c = r.left + r.width / 2;
    const near = c > innerWidth * 0.08 && c < innerWidth * 0.92;
    p.classList.toggle("lit", near);
    if (near) { const art = $(".draw-wall", p); if (art) { art.classList.add("draw"); art.getBoundingClientRect(); requestAnimationFrame(() => art.classList.add("drawn")); art.classList.remove("draw-wall"); } }
    $(".lamp", p).classList.toggle("lit", near);
    if (c < innerWidth * 0.6) current = i;
  });
  $("#wallCount").textContent = `${String(current + 1).padStart(2, "0")} / ${String(pieces.length).padStart(2, "0")} · clique pra ampliar`;
}
wallViewport.addEventListener("scroll", updateWall, { passive: true });

/* filtros: quantidade de trabalhos em cada um */
$$(".chip").forEach((c) => {
  const n = c.dataset.f === "all" ? WORKS.length : WORKS.filter((w) => w.cat === c.dataset.f).length;
  c.insertAdjacentHTML("beforeend", `<sup>${String(n).padStart(2, "0")}</sup>`);
});

/* filtros */
$("#filters").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  $$(".chip").forEach((c) => c.setAttribute("aria-pressed", c === chip));
  const f = chip.dataset.f;
  $$(".piece", track).forEach((p, i) => {
    const show = f === "all" || p.dataset.cat === f;
    p.classList.toggle("out", !show);
    p.classList.remove("enter");
    if (show && !reduce) { void p.offsetWidth; p.style.animationDelay = `${i * 50}ms`; p.classList.add("enter"); }
  });
  if (desktopWall() && scrollY > wallSection.offsetTop) scrollTo({ top: wallSection.offsetTop, behavior: "instant" });
  wallViewport.scrollLeft = 0;
  layoutWall();
  fitAll();
});

/* física do balanço: cada quadro é um pêndulo preso no prego */
const swings = $$("[data-swing]").map((el) => ({ el, a: 0, v: 0, kick: 0 }));
function kickSwing(el, amount) {
  const s = swings.find((x) => x.el === el);
  if (s) s.v += amount;
}
if (finePointer && !reduce) {
  document.addEventListener("mousemove", (e) => {
    const sw = e.target.closest?.("[data-swing]") || e.target.closest?.(".piece")?.querySelector("[data-swing]");
    if (sw) kickSwing(sw, clamp(e.movementX * 0.05, -0.8, 0.8));
  });
}

/* =========================================================
   CICATRIZADAS — comparador
   ========================================================= */
const compare = $("#compare"), cmpRange = $("#cmpRange");
cmpRange.addEventListener("input", () => compare.style.setProperty("--p", `${cmpRange.value}%`));
const hintIO = new IntersectionObserver(([en]) => {
  if (!en.isIntersecting || reduce) return;
  hintIO.disconnect();
  const keys = [50, 72, 30, 50], t0 = performance.now(), dur = 2200;
  const run = (t) => {
    const p = clamp((t - t0) / dur, 0, 1), seg = p * (keys.length - 1), i = Math.min(Math.floor(seg), keys.length - 2);
    const k = seg - i, e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    const v = keys[i] + (keys[i + 1] - keys[i]) * e;
    compare.style.setProperty("--p", `${v}%`); cmpRange.value = v;
    if (p < 1) requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}, { threshold: 0.6 });
hintIO.observe(compare);

/* =========================================================
   VIAGENS — carimbos + rota
   ========================================================= */
const passport = $("#passport"), routePath = $("#routePath");
{
  const len = routePath.getTotalLength();
  routePath.style.strokeDasharray = `2 7`;
  const svg = routePath.ownerSVGElement;
  const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
  mask.id = "routeMask";
  mask.innerHTML = `<path d="${routePath.getAttribute("d")}" fill="none" stroke="#fff" stroke-width="10" style="stroke-dasharray:${len};stroke-dashoffset:${len}"/>`;
  svg.prepend(mask);
  routePath.setAttribute("mask", "url(#routeMask)");
  const plane = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  plane.setAttribute("r", 4); plane.setAttribute("fill", "#b0362b"); plane.setAttribute("opacity", 0);
  svg.append(plane);

  const io = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return;
    io.disconnect();
    const stamps = $$(".stamp", passport);
    if (reduce) { stamps.forEach((s) => (s.style.opacity = 1)); mask.firstChild.style.strokeDashoffset = 0; return; }
    stamps.forEach((s, i) => setTimeout(() => {
      s.classList.add("hit");
      passport.classList.remove("shake"); void passport.offsetWidth; passport.classList.add("shake");
    }, 300 + i * 260));
    const t0 = performance.now(), dur = 2400, m = mask.firstChild;
    plane.setAttribute("opacity", 1);
    const fly = (t) => {
      const p = clamp((t - t0) / dur, 0, 1), e = 1 - Math.pow(1 - p, 3);
      m.style.strokeDashoffset = len * (1 - e);
      const pt = routePath.getPointAtLength(len * e);
      plane.setAttribute("cx", pt.x); plane.setAttribute("cy", pt.y);
      if (p < 1) requestAnimationFrame(fly);
    };
    requestAnimationFrame(fly);
  }, { threshold: 0.5 });
  io.observe(passport);
}

/* =========================================================
   FLASHES — redesenha ao passar o mouse, escolher manda pro formulário
   ========================================================= */
const flashObs = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); flashObs.unobserve(en.target); } });
}, { threshold: 0.4 });
$$(".flash").forEach((f) => flashObs.observe(f));
if (!reduce) {
  $$(".flash:not(.flash-cta)").forEach((f) => f.addEventListener("mouseenter", () => {
    const svg = $(".art", f);
    if (!svg) return;
    svg.classList.remove("drawn"); void svg.getBoundingClientRect();
    requestAnimationFrame(() => svg.classList.add("drawn"));
  }));
}

/* =========================================================
   FORMULÁRIO → mensagem pronta
   ========================================================= */
const fName = $("#fName"), fIdea = $("#fIdea"), fPlace = $("#fPlace"), fSize = $("#fSize"), fWhere = $("#fWhere"), fFile = $("#fFile");
const msgEl = $("#msg"), note = $("#note");
let chosenFlash = "", prevLines = [];

function buildLines() {
  const name = fName.value.trim();
  const lines = [
    `Oi, Sofia! ${name ? `Aqui é ${name}. ` : ""}Vim pelo seu site e quero fazer uma tattoo ✨`,
    "",
    chosenFlash ? `Flash: ${chosenFlash}` : `Ideia: ${fIdea.value.trim() || "[sua ideia aqui]"}`,
    `Local: ${fPlace.value}`,
    `Tamanho: ${fSize.value}`,
    `Onde: ${fWhere.value}`,
  ];
  if (fFile.files[0]) lines.push("", "Tenho uma foto de referência, mando aqui em seguida.");
  lines.push("", "Pode me passar valor e datas?");
  return lines;
}
function renderMsg() {
  const lines = buildLines();
  msgEl.replaceChildren(...lines.flatMap((l, i) => {
    const s = document.createElement("span");
    s.textContent = l;
    if (prevLines.length && l !== prevLines[i] && l) s.className = "changed";
    return i < lines.length - 1 ? [s, "\n"] : [s];
  }));
  prevLines = lines;
  $("#waBtn").href = waLink(lines.join("\n"));
}
[fName, fIdea, fPlace, fSize, fWhere].forEach((el) => el.addEventListener("input", renderMsg));
fIdea.addEventListener("input", () => { if (chosenFlash) setFlash(""); });
fFile.addEventListener("change", () => {
  const f = fFile.files[0];
  $("#uploadText").innerHTML = f ? `<b>✓ ${f.name.replace(/[<>&]/g, "")}</b> · anexe no WhatsApp depois de enviar` : `<b>Foto de referência</b> · opcional`;
  renderMsg();
});
$("#form").addEventListener("submit", (e) => e.preventDefault());

function setFlash(name) {
  chosenFlash = name;
  $("#flashPick").hidden = !name;
  $("#flashPickName").textContent = name;
  renderMsg();
}
$("#flashClear").addEventListener("click", () => setFlash(""));
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-flash]");
  if (!a) return;
  setFlash(a.dataset.flash);
  note.classList.remove("bump"); void note.offsetWidth; note.classList.add("bump");
});

$("#copyBtn").addEventListener("click", () => {
  const text = buildLines().join("\n"), toast = $("#toast");
  const ok = () => { toast.textContent = "Mensagem copiada"; setTimeout(() => (toast.textContent = ""), 2500); };
  const fb = () => {
    const r = document.createRange(); r.selectNodeContents(msgEl);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    toast.textContent = "Mensagem selecionada, use Ctrl+C";
  };
  try { navigator.clipboard.writeText(text).then(ok, fb); } catch { fb(); }
});
$("#waFooter").href = waLink("Oi, Sofia!");
renderMsg();

/* =========================================================
   LIGHTBOX
   ========================================================= */
const lb = $("#lightbox");
let cur = { work: 0, photo: 0 };
function renderLb() {
  const w = WORKS[cur.work];
  $("#lbMedia").style.setProperty("--r", w.r);
  $("#lbMedia").innerHTML = mediaHTML(w.photos[cur.photo], w.art, w.title);
  watchDraw($("#lbMedia"));
  const total = Math.max(w.photos.length, 1);
  $("#lbCap").innerHTML = `<b>${w.title}</b><span>Fine line · ${w.place}</span><small>${cur.photo + 1} / ${total}</small>`;
}
function stepLb(d) {
  const w = WORKS[cur.work], next = cur.photo + d;
  if (next >= 0 && next < w.photos.length) cur.photo = next;
  else {
    const vis = $$(".piece:not(.out)", track).map((p) => +p.dataset.i), idx = vis.indexOf(cur.work);
    cur.work = vis[(idx + d + vis.length) % vis.length];
    cur.photo = d > 0 ? 0 : Math.max(WORKS[cur.work].photos.length - 1, 0);
  }
  renderLb();
}
track.addEventListener("click", (e) => {
  const p = e.target.closest(".piece");
  if (!p) return;
  cur = { work: +p.dataset.i, photo: 0 };
  renderLb();
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  $("#lbClose").focus();
});
function closeLb() { lb.hidden = true; document.body.style.overflow = ""; }
$("#lbClose").onclick = closeLb;
$("#lbPrev").onclick = () => stepLb(-1);
$("#lbNext").onclick = () => stepLb(1);
lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", (e) => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowRight") stepLb(1);
  if (e.key === "ArrowLeft") stepLb(-1);
});

/* =========================================================
   ASSINATURAS DESENHADAS
   ========================================================= */
const sigIO = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("drawn"); sigIO.unobserve(en.target); } });
}, { threshold: 0.5 });
$$(".sig-draw, .footer-sig").forEach((s) => (reduce ? s.classList.add("drawn") : sigIO.observe(s)));
// ponto vermelho logo depois do "a" da assinatura do rodapé
(document.fonts?.ready || Promise.resolve()).then(() => {
  const sig = $("#footerSig"), b = $("text", sig).getBBox();
  const dot = $("circle", sig);
  dot.setAttribute("cx", (b.x + b.width + 16).toFixed(1));
  dot.setAttribute("cy", "132");
  sig.setAttribute("viewBox", `0 0 ${Math.ceil(b.x + b.width + 40)} 190`);
});

/* =========================================================
   CURSOR — agulha que deixa rastro de traço fino
   ========================================================= */
if (finePointer && !reduce) {
  document.body.classList.add("has-cursor");
  const cv = $("#trail"), ctx = cv.getContext("2d"), needle = $("#needle"), label = $("#needleLabel");
  const pts = [];
  const size = () => { const d = devicePixelRatio || 1; cv.width = innerWidth * d; cv.height = innerHeight * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
  size(); addEventListener("resize", size);
  addEventListener("mousemove", (e) => {
    needle.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    pts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
  });
  document.addEventListener("mouseover", (e) => {
    const lab = e.target.closest("[data-cursor]");
    const hov = e.target.closest("a, button, summary, select, input, textarea, label");
    needle.classList.toggle("label", !!lab);
    needle.classList.toggle("hover", !lab && !!hov);
    label.textContent = lab ? lab.dataset.cursor : "";
  });
  document.addEventListener("mouseleave", () => (pts.length = 0));
  (function draw() {
    const now = performance.now();
    while (pts.length && now - pts[0].t > 650) pts.shift();
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], life = 1 - (now - b.t) / 650;
      ctx.strokeStyle = `rgba(43,35,30,${(life * 0.55).toFixed(3)})`;
      ctx.lineWidth = 0.4 + life * 1.1;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    requestAnimationFrame(draw);
  })();
}

/* =========================================================
   LOOP DE SCROLL (manifesto, ramo, nav, sobre, passos, quadros)
   ========================================================= */
const steps = $("#steps"), stepItems = $$("li", steps), aboutPhoto = $("#aboutPhoto");
let lastY = scrollY, ticking = false;

function onScroll() {
  ticking = false;
  const y = scrollY, vh = innerHeight;

  // nav
  nav.classList.toggle("solid", y > 30);
  nav.classList.toggle("hide", y > lastY && y > 500 && !navLinks.classList.contains("open"));
  lastY = y;

  // ramo lateral
  const docP = clamp(y / (document.documentElement.scrollHeight - vh), 0, 1);
  vinePath.style.strokeDashoffset = vineLen * (1 - docP);
  leaves.forEach((l) => l.el.classList.toggle("on", docP >= l.t));

  // manifesto
  const ms = $("#manifesto"), mr = ms.getBoundingClientRect();
  const mp = clamp(-mr.top / Math.max(1, mr.height - vh) * 1.15, 0, 1);
  const on = Math.round(mp * mWords.length);
  mWords.forEach((w, i) => w.classList.toggle("on", reduce || i < on));
  $(".period", manifesto).classList.toggle("on", reduce || on >= mWords.length);

  // parede
  updateWall();

  // foto do sobre se mexe dentro da moldura
  if (!reduce) {
    const ar = aboutPhoto.parentElement.getBoundingClientRect();
    const ap = clamp((vh - ar.top) / (vh + ar.height), 0, 1);
    aboutPhoto.style.transform = `translate3d(0,${(ap - 0.5) * -14}%,0)`;
  }

  // linha dos passos
  const sr = steps.getBoundingClientRect();
  const sp = clamp((vh * 0.7 - sr.top) / sr.height, 0, 1);
  steps.style.setProperty("--sp", reduce ? 1 : sp);
  stepItems.forEach((li, i) => li.classList.toggle("on", reduce || sp >= (i + 0.2) / stepItems.length));
}
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
addEventListener("resize", () => { layoutWall(); fitAll(); onScroll(); });

/* física dos pêndulos (roda sempre, barata) */
if (!reduce) {
  (function physics() {
    const dx = wallX - lastWallX;
    lastWallX = wallX;
    const push = clamp(dx * 0.035, -1.2, 1.2);
    swings.forEach((s) => {
      if (s.el.closest(".piece")) s.v += push;
      s.v += -0.06 * s.a;   // mola
      s.v *= 0.93;          // atrito
      s.a = clamp(s.a + s.v, -14, 14);
      if (Math.abs(s.a) > 0.01 || Math.abs(s.v) > 0.01) s.el.style.rotate = `${s.a.toFixed(3)}deg`;
    });
    requestAnimationFrame(physics);
  })();
}

(document.fonts?.ready || Promise.resolve()).then(() => { layoutWall(); fitAll(); onScroll(); });
layoutWall();
onScroll();
