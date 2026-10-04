(function () {
  "use strict";
  var $ = function (s, r) {
      return (r || document).querySelector(s);
    },
    $$ = function (s, r) {
      return Array.prototype.slice.call((r || document).querySelectorAll(s));
    };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  /* ---------- project data ----------
   Add 'shot' (image URL or data URI) to use a real screenshot on the card and detail page.
   Add 'shots', 'mechanics', 'tech', 'ui', 'challenges', 'solutions' to fill more case-study sections.
   Sections with no content stay hidden. */
  var P = [
    {
      slug: "guardian-strike",
      title: "Guardian Strike",
      art: "gs",
      shot: "img/guardian-strike-cover.jpg",
      shotAlt:
        "Guardian Strike title art with the pixel-art heroine in a sunny forest",
      pos: "50% 30%",
      ar: "16/9",
      shots: ["img/guardian-strike.jpg"],
      shotCap:
        "Gameplay screenshot: the player, a skeleton enemy and a companion in the forest level.",
      genre: "2D Action",
      engine: "Unity",
      kind: "Personal project",
      released: "Oct 31, 2025",
      desc: "A 2D action game built in Unity featuring player combat, enemy AI, and interactive gameplay systems.",
      features: [
        "Player movement and combat",
        "Enemy AI with detection",
        "Health and damage",
        "UI update system",
      ],
      stack: ["Unity", "C#"],
      demo: "https://youtu.be/sQqQ-gxFRN0",
      overview:
        "Guardian Strike is a 2D action game developed with Unity and C#. The project focuses on implementing core gameplay mechanics and the interactive systems around them.",
      built: [
        "Player movement and combat system",
        "Enemy AI with detection behavior",
        "Health and damage system",
        "UI update and interaction system",
        "Smooth animations and transitions",
      ],
      mechanics: [
        "Player movement and combat",
        "Enemy detection behavior that reacts to the player",
        "Health and damage rules shared by player and enemies",
      ],
      tech: [
        "Unity physics for movement and collisions",
        "Animation states with smooth transitions",
        "UI wired to live gameplay values",
        "Game logic structured to scale as features are added",
      ],
      ui: "UI elements update with gameplay state and respond to player interaction.",
      learned: [
        "Gameplay system design",
        "Unity physics",
        "Animations and UI integration",
        "Structuring scalable game logic",
      ],
    },
    {
      slug: "super-four-abc-learning-game",
      title: "Super Four / ABC Learning Game",
      art: "abc",
      genre: "Mobile Educational",
      engine: "Unity",
      kind: "Super Four Games LLP",
      released: "",
      desc: "Interactive educational mini-games for mobile, built in Unity at Super Four Games LLP.",
      features: [
        "Interactive sub-games",
        "Level progression",
        "Responsive UI",
        "Animations",
      ],
      stack: ["Unity", "C#", "Unity UI", "DOTween"],
      overview:
        "Mobile educational game work from my role as Unity Game Developer at Super Four Games LLP (Feb 2026 – Sep 2026), covering interactive sub-games, levels, UI systems and animations.",
      built: [
        "Interactive mini-games and sub-games",
        "Level progression",
        "Responsive layouts for mobile screens",
        "UI systems and animations",
      ],
      soon: true,
    },
    {
      slug: "math-game",
      title: "Math Game",
      art: "sub",
      genre: "Math Game",
      engine: "Unity",
      kind: "Published on Google Play",
      released: "",
      desc: "A math game built in Unity and available on Google Play.",
      features: ["Math gameplay", "Interactive UI"],
      stack: ["Unity", "C#", "Unity UI"],
      soon: true,
      play: "https://play.google.com/store/apps/details?id=com.superfour.kids.early.learn.math.games",
      overview:
        "Math Game is a math-focused game built in Unity and available on Google Play. A full case study is coming soon.",
    },
    {
      slug: "mansion-horror-game",
      title: "Mansion Horror Game",
      art: "gs",
      genre: "Horror Adventure",
      engine: "Concept",
      kind: "Game concept",
      released: "",
      shot: "img/mansion-1.jpg",
      shotAlt: "3D abandoned mansion modeled in Blender",
      desc: "A horror adventure concept. Explore an abandoned mansion, uncover a witch's dark history and find your missing girlfriend. The mansion is modeled in Blender.",
      features: [
        "Exploration",
        "Puzzle solving",
        "Survival horror",
        "Story discovery",
      ],
      stack: ["Blender"],
      note: "Concept stage",
      meta: [
        ["Genre", "Horror Adventure"],
        ["Status", "Concept"],
        ["3D environment", "Blender"],
        ["Type", "Second game idea"],
      ],
      overview:
        "You play a protagonist who enters an abandoned mansion with his girlfriend to explore it. While they explore, she suddenly disappears and he is left alone inside. As he searches for her, he discovers the mansion's dark history: a cruel witch who practiced black magic was captured by the mansion's residents and burned alive in one of its rooms. Her spirit stayed trapped in the mansion and became a terrifying supernatural entity. The protagonist must explore, solve puzzles, uncover the truth about the witch, survive her attacks and find his girlfriend before the mansion claims them both.",
      loop: [
        "Explore",
        "Solve puzzles",
        "Discover the past",
        "Survive the witch",
        "Find girlfriend",
        "Escape the mansion",
      ],
      built: [
        "The mansion environment, modeled in Blender",
        "Story, setting and core gameplay loop",
      ],
      shots: ["img/mansion-1.jpg", "img/mansion-2.jpg", "img/mansion-3.jpg"],
      shotCap: "Mansion model in the Blender viewport.",
      status:
        "This is my second game idea. It is at the concept stage, not yet in active development, and has no repository. The mansion environment is the first piece built.",
    },
  ];

  var MODS = [
    ["Gameplay Systems", "Rules and mechanics that drive play"],
    ["Player Controllers", "Movement, combat and character feel"],
    ["Input System", "Touch, keyboard and gamepad input"],
    ["Game State Management", "Menus, play, pause, win and lose"],
    ["Level Progression", "Unlocks, stages and difficulty ramps"],
    ["UI Systems", "HUDs, menus and screens"],
    ["Animations", "Character, UI and feedback motion"],
    ["Save Systems", "Progress and settings persistence"],
    ["Mobile Optimization", "Performance on phones"],
    ["Audio Integration", "Music, effects and mixing"],
    ["Ads / IAP", "Monetization hooks"],
    ["Responsive Layouts", "UI across aspect ratios"],
  ];

  /* ---------- procedural key art ---------- */
  function rng(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function lg(c, x0, y0, x1, y1, st) {
    var g = c.createLinearGradient(x0, y0, x1, y1);
    st.forEach(function (s) {
      g.addColorStop(s[0], s[1]);
    });
    return g;
  }
  function figure(c, x, gy, u, col, eye) {
    c.fillStyle = col;
    c.fillRect(x - 4 * u, gy - 9 * u, 8 * u, 9 * u);
    c.fillRect(x - 5 * u, gy - 20 * u, 10 * u, 12 * u);
    c.beginPath();
    c.arc(x, gy - 23 * u, 3.4 * u, 0, 7);
    c.fill();
    if (eye) {
      c.fillStyle = eye;
      c.fillRect(x - 1 * u, gy - 23.6 * u, 3 * u, 1.2 * u);
    }
  }
  var ART = {
    gs: function (c, w, h, r) {
      var u = h / 100,
        gy = h * 0.84;
      c.fillStyle = lg(c, 0, 0, 0, h, [
        [0, "#17121a"],
        [0.55, "#4a2418"],
        [1, "#4fd98a"],
      ]);
      c.fillRect(0, 0, w, h);
      c.fillStyle = "rgba(255,190,120,.92)";
      c.beginPath();
      c.arc(w * 0.74, h * 0.5, h * 0.15, 0, 7);
      c.fill();
      [
        ["#2d1f24", 0.6, 0.2],
        ["#1c1519", 0.7, 0.22],
        ["#100e11", 0.78, 0.2],
      ].forEach(function (l) {
        c.fillStyle = l[0];
        var x = -10;
        while (x < w) {
          var bw = w * (0.03 + r() * 0.05),
            bh = h * (0.04 + r() * l[2]);
          c.fillRect(x, h * l[1] - bh, bw, h);
          x += bw + w * 0.003;
        }
      });
      c.fillStyle = "#08080a";
      c.fillRect(0, gy, w, h - gy);
      c.fillStyle = "#4fd98a";
      c.fillRect(0, gy, w, 2);
      var ex = w * 0.64;
      var g = lg(c, ex, 0, ex - w * 0.34, 0, [
        [0, "rgba(79,217,138,.42)"],
        [1, "rgba(79,217,138,0)"],
      ]);
      c.fillStyle = g;
      c.beginPath();
      c.moveTo(ex, gy - 23 * u);
      c.lineTo(ex - w * 0.34, gy - 48 * u);
      c.lineTo(ex - w * 0.34, gy);
      c.closePath();
      c.fill();
      figure(c, ex, gy, u * 0.9, "#050506", "#4fd98a");
      var px = w * 0.3;
      figure(c, px, gy, u * 0.95, "#050506");
      c.strokeStyle = "#d6f7e4";
      c.lineWidth = Math.max(2, u * 0.7);
      c.lineCap = "round";
      c.beginPath();
      c.moveTo(px + 5 * u, gy - 14 * u);
      c.lineTo(px + 22 * u, gy - 26 * u);
      c.stroke();
      c.strokeStyle = "rgba(255,255,255,.55)";
      c.lineWidth = 1;
      c.strokeRect(w * 0.03, h * 0.07, w * 0.2, h * 0.045);
      c.fillStyle = "#4fd98a";
      c.fillRect(
        w * 0.03 + 2,
        h * 0.07 + 2,
        (w * 0.2 - 4) * 0.72,
        h * 0.045 - 4,
      );
    },
    abc: function (c, w, h, r) {
      c.fillStyle = lg(c, 0, 0, w, h, [
        [0, "#0b1a1f"],
        [1, "#13262c"],
      ]);
      c.fillRect(0, 0, w, h);
      var cols = ["#4fd98a", "#2fd0c4", "#f3c14b", "#7c93ff"],
        L = "ABCDEFGH",
        s = Math.min(w, h) * 0.2,
        i = 0,
        gx = Math.ceil(w / (s * 1.25)) + 1,
        gy = Math.ceil(h / (s * 1.25)) + 1;
      for (var y = 0; y < gy; y++)
        for (var x = 0; x < gx; x++) {
          var cx = x * s * 1.25 + s * 0.3 + (y % 2) * s * 0.3,
            cy = y * s * 1.25 + s * 0.2,
            rot = (r() - 0.5) * 0.28;
          c.save();
          c.translate(cx + s / 2, cy + s / 2);
          c.rotate(rot);
          c.globalAlpha = 0.35 + r() * 0.65;
          c.fillStyle = cols[(x + y) % 4];
          c.fillRect(-s / 2, -s / 2, s, s);
          c.fillStyle = "#0b0c0e";
          c.font =
            "900 " + s * 0.7 + 'px "Big Shoulders Display",Impact,sans-serif';
          c.textAlign = "center";
          c.textBaseline = "middle";
          c.fillText(L[i++ % 8], 0, s * 0.04);
          c.restore();
        }
      c.globalAlpha = 1;
      c.fillStyle = lg(c, 0, h, 0, 0, [
        [0, "rgba(11,12,14,.85)"],
        [0.6, "rgba(11,12,14,0)"],
      ]);
      c.fillRect(0, 0, w, h);
    },
    exfil: function (c, w, h, r) {
      c.fillStyle = "#08100c";
      c.fillRect(0, 0, w, h);
      for (var i = 0; i < 14; i++) {
        c.fillStyle = "rgba(60,110,80," + (0.06 + r() * 0.1) + ")";
        var bw = w * (0.05 + r() * 0.12),
          bh = h * (0.08 + r() * 0.2);
        c.fillRect(r() * w, r() * h, bw, bh);
      }
      c.strokeStyle = "rgba(88,214,141,.14)";
      c.lineWidth = 1;
      var g = h / 10;
      for (var x = 0; x < w; x += g) {
        c.beginPath();
        c.moveTo(x, 0);
        c.lineTo(x, h);
        c.stroke();
      }
      for (var y = 0; y < h; y += g) {
        c.beginPath();
        c.moveTo(0, y);
        c.lineTo(w, y);
        c.stroke();
      }
      var pts = [
        [0.08, 0.82],
        [0.22, 0.64],
        [0.36, 0.7],
        [0.5, 0.42],
        [0.66, 0.5],
        [0.84, 0.22],
      ];
      pts.forEach(function (p, i) {
        if (i < 2 || i === 3) {
          var cx = p[0] * w + w * 0.06,
            cy = p[1] * h - h * 0.12;
          var cg = lg(c, cx, cy, cx + w * 0.14, cy - h * 0.1, [
            [0, "rgba(79,217,138,.35)"],
            [1, "rgba(79,217,138,0)"],
          ]);
          c.fillStyle = cg;
          c.beginPath();
          c.moveTo(cx, cy);
          c.lineTo(cx + w * 0.14, cy - h * 0.14);
          c.lineTo(cx + w * 0.14, cy + h * 0.04);
          c.fill();
        }
      });
      c.setLineDash([8, 6]);
      c.strokeStyle = "#58d68d";
      c.lineWidth = 2;
      c.beginPath();
      pts.forEach(function (p, i) {
        i ? c.lineTo(p[0] * w, p[1] * h) : c.moveTo(p[0] * w, p[1] * h);
      });
      c.stroke();
      c.setLineDash([]);
      c.fillStyle = "#58d68d";
      pts.forEach(function (p) {
        c.fillRect(p[0] * w - 4, p[1] * h - 4, 8, 8);
      });
      var e = pts[5];
      c.strokeStyle = "#4fd98a";
      c.lineWidth = 2;
      c.beginPath();
      c.arc(e[0] * w, e[1] * h, Math.min(w, h) * 0.07, 0, 7);
      c.stroke();
      c.beginPath();
      c.arc(e[0] * w, e[1] * h, Math.min(w, h) * 0.035, 0, 7);
      c.stroke();
      c.fillStyle = "#4fd98a";
      c.font =
        "700 " + Math.max(10, h * 0.035) + 'px "JetBrains Mono",monospace';
      c.textAlign = "center";
      c.fillText("EXFIL", e[0] * w, e[1] * h - Math.min(w, h) * 0.1);
      for (var k = 0; k < h; k += 4) {
        c.fillStyle = "rgba(0,0,0,.18)";
        c.fillRect(0, k, w, 1);
      }
    },
    sub: function (c, w, h, r) {
      c.fillStyle = lg(c, 0, 0, 0, h, [
        [0, "#0a3a4c"],
        [0.6, "#07202e"],
        [1, "#040d14"],
      ]);
      c.fillRect(0, 0, w, h);
      for (var i = 0; i < 5; i++) {
        c.fillStyle = "rgba(120,210,230,.05)";
        c.beginPath();
        var x = w * (0.1 + i * 0.2);
        c.moveTo(x, 0);
        c.lineTo(x + w * 0.12, 0);
        c.lineTo(x - w * 0.1 + w * 0.05, h);
        c.lineTo(x - w * 0.2, h);
        c.fill();
      }
      var ops = ["7×8", "12+9", "5", "24÷6", "3²", "15−7", "9", "6×4"];
      c.textAlign = "center";
      c.textBaseline = "middle";
      for (var j = 0; j < 10; j++) {
        var bx = w * (0.52 + r() * 0.44),
          by = h * (0.12 + r() * 0.75),
          br = Math.min(w, h) * (0.05 + r() * 0.05);
        c.strokeStyle = "rgba(160,230,245,.6)";
        c.fillStyle = "rgba(120,220,240,.1)";
        c.lineWidth = 1.5;
        c.beginPath();
        c.arc(bx, by, br, 0, 7);
        c.fill();
        c.stroke();
        c.fillStyle = "#e8f8fb";
        c.font = "700 " + br * 0.7 + 'px "JetBrains Mono",monospace';
        c.fillText(ops[j % 8], bx, by);
      }
      for (var q = 0; q < 18; q++) {
        c.fillStyle = "rgba(160,230,245,.35)";
        c.beginPath();
        c.arc(w * (0.12 + r() * 0.3), h * r(), 1 + r() * 3, 0, 7);
        c.fill();
      }
    },
    mem: function (c, w, h, r) {
      var g = c.createRadialGradient(
        w * 0.5,
        h * 0.55,
        0,
        w * 0.5,
        h * 0.55,
        w * 0.7,
      );
      g.addColorStop(0, "#2a2146");
      g.addColorStop(1, "#0c0a14");
      c.fillStyle = g;
      c.fillRect(0, 0, w, h);
      for (var i = 0; i < 26; i++) {
        c.fillStyle = "rgba(190,170,255," + (0.15 + r() * 0.5) + ")";
        c.beginPath();
        c.arc(r() * w, r() * h, 0.8 + r() * 2.2, 0, 7);
        c.fill();
      }
      for (var k = 0; k < 7; k++) {
        var fw = w * (0.1 + r() * 0.1),
          fh = fw * 1.25,
          x = w * (0.1 + r() * 0.75),
          y = h * (0.1 + r() * 0.6),
          rot = (r() - 0.5) * 0.6;
        c.save();
        c.translate(x, y);
        c.rotate(rot);
        c.fillStyle = "rgba(200,185,255," + (0.07 + r() * 0.1) + ")";
        c.fillRect(-fw / 2, -fh / 2, fw, fh);
        c.strokeStyle = "rgba(214,200,255," + (0.4 + r() * 0.4) + ")";
        c.lineWidth = 1.5;
        c.strokeRect(-fw / 2, -fh / 2, fw, fh);
        c.fillStyle = "rgba(214,200,255,.25)";
        c.fillRect(-fw / 2 + fw * 0.1, -fh / 2 + fh * 0.1, fw * 0.8, fh * 0.62);
        c.restore();
      }
      var o = c.createRadialGradient(
        w * 0.5,
        h * 0.55,
        0,
        w * 0.5,
        h * 0.55,
        h * 0.28,
      );
      o.addColorStop(0, "rgba(255,200,160,.95)");
      o.addColorStop(0.35, "rgba(79,217,138,.4)");
      o.addColorStop(1, "rgba(79,217,138,0)");
      c.fillStyle = o;
      c.fillRect(0, 0, w, h);
      c.fillStyle = "#0b0a12";
      c.fillRect(w * 0.485, h * 0.62, w * 0.03, h * 0.4);
    },
    fps: function (c, w, h, r) {
      var vx = w * 0.5,
        vy = h * 0.45;
      c.fillStyle = "#0a0a0c";
      c.fillRect(0, 0, w, h);
      var gl = c.createRadialGradient(vx, vy, 0, vx, vy, h * 0.55);
      gl.addColorStop(0, "rgba(255,150,80,.9)");
      gl.addColorStop(0.25, "rgba(79,217,138,.28)");
      gl.addColorStop(1, "rgba(79,217,138,0)");
      c.fillStyle = gl;
      c.fillRect(0, 0, w, h);
      c.strokeStyle = "rgba(180,190,200,.3)";
      c.lineWidth = 1;
      for (var i = 1; i <= 9; i++) {
        var s = Math.pow(i / 9, 2.2),
          x0 = vx - w * 0.7 * s - w * 0.02,
          x1 = vx + w * 0.7 * s + w * 0.02,
          y0 = vy - h * 0.7 * s - h * 0.02,
          y1 = vy + h * 0.55 * s + h * 0.02;
        c.strokeRect(x0, y0, x1 - x0, y1 - y0);
      }
      [
        [0, 0],
        [w, 0],
        [0, h],
        [w, h],
      ].forEach(function (p) {
        c.beginPath();
        c.moveTo(p[0], p[1]);
        c.lineTo(vx, vy);
        c.stroke();
      });
      var u = h / 100,
        bx = w * 0.72,
        by = h * 0.98;
      c.fillStyle = "#050506";
      c.beginPath();
      c.moveTo(bx - 30 * u, by);
      c.lineTo(bx - 14 * u, by - 34 * u);
      c.lineTo(bx - 5 * u, by - 34 * u);
      c.lineTo(bx - 6 * u, by - 52 * u);
      c.lineTo(bx + 16 * u, by - 52 * u);
      c.lineTo(bx + 16 * u, by - 38 * u);
      c.lineTo(bx + 4 * u, by - 36 * u);
      c.lineTo(bx + 14 * u, by);
      c.closePath();
      c.fill();
      c.fillStyle = "#14161a";
      c.fillRect(bx - 6 * u, by - 70 * u, 5 * u, 24 * u);
      c.beginPath();
      c.arc(bx - 1 * u, by - 46 * u, 10 * u, 0, 7);
      c.fill();
      c.strokeStyle = "#2a2f36";
      c.lineWidth = 1;
      c.stroke();
      c.strokeStyle = "#fff";
      c.lineWidth = 1.5;
      c.beginPath();
      c.arc(vx, vy, 9, 0, 7);
      c.moveTo(vx - 18, vy);
      c.lineTo(vx - 5, vy);
      c.moveTo(vx + 5, vy);
      c.lineTo(vx + 18, vy);
      c.moveTo(vx, vy - 18);
      c.lineTo(vx, vy - 5);
      c.moveTo(vx, vy + 5);
      c.lineTo(vx, vy + 18);
      c.stroke();
      for (var a = 0; a < 6; a++) {
        c.fillStyle = a < 5 ? "#4fd98a" : "#363c46";
        c.beginPath();
        c.arc(w * 0.06 + a * u * 4.4, h * 0.92, u * 1.4, 0, 7);
        c.fill();
      }
    },
  };
  function paint(cv) {
    var k = cv.getAttribute("data-art"),
      f = ART[k];
    if (!f) return;
    var d = Math.min(window.devicePixelRatio || 1, 2),
      b = cv.getBoundingClientRect();
    if (!b.width) return;
    cv.width = Math.round(b.width * d);
    cv.height = Math.round(b.height * d);
    var c = cv.getContext("2d");
    c.setTransform(d, 0, 0, d, 0, 0);
    f(c, b.width, b.height, rng(k.length * 977 + 13));
  }
  function paintAll(root) {
    $$("canvas[data-art]", root).forEach(paint);
  }

  /* ---------- build cards + modules ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m];
    });
  }
  $("#pgrid").innerHTML = P.map(function (p) {
    var img = p.shot
      ? '<img src="' +
        esc(p.shot) +
        '" alt="' +
        esc(p.shotAlt || p.title + " screenshot") +
        '" loading="lazy" style="object-position:' +
        (p.pos || "50% 40%") +
        '">'
      : '<canvas class="art" data-art="' +
        p.art +
        '" role="img" aria-label="Key art for ' +
        esc(p.title) +
        '"></canvas>';
    return (
      '<article class="card' +
      (p.wide ? " wide" : "") +
      ' rv" data-slug="' +
      p.slug +
      '"><div class="img">' +
      img +
      '<div class="tags"><span class="chip">' +
      esc(p.genre) +
      '</span><span class="chip">' +
      esc(p.engine) +
      "</span></div>" +
      '<div class="over"><p class="k">KEY FEATURES</p><ul>' +
      p.features
        .map(function (f) {
          return "<li>" + esc(f) + "</li>";
        })
        .join("") +
      '</ul><span class="go">VIEW MISSION →</span></div></div>' +
      '<div class="info"><p class="gm">' +
      esc(p.kind) +
      (p.released ? " · " + esc(p.released) : "") +
      '</p><h3><a href="#mission-' +
      p.slug +
      '">' +
      esc(p.title) +
      '</a></h3><p class="d">' +
      esc(p.desc) +
      "</p>" +
      '<div class="tech">' +
      p.stack
        .map(function (t) {
          return '<span class="chip">' + esc(t) + "</span>";
        })
        .join("") +
      "</div>" +
      '<div class="acts"><a class="btn sm primary" href="#mission-' +
      p.slug +
      '">View mission <span class="ar">→</span></a>' +
      (p.demo
        ? '<a class="btn sm" href="' +
          esc(p.demo) +
          '" target="_blank" rel="noopener">Watch gameplay ↗</a>'
        : "") +
      (p.play
        ? '<a class="btn sm" href="' +
          esc(p.play) +
          '" target="_blank" rel="noopener">Google Play ↗</a>'
        : "") +
      (p.github
        ? '<a class="btn sm" href="' +
          esc(p.github) +
          '" target="_blank" rel="noopener">GitHub ↗</a>'
        : "") +
      (p.soon
        ? '<span class="mono soon" style="align-self:center">Case study soon</span>'
        : "") +
      (p.note
        ? '<span class="mono soon" style="align-self:center">' +
          esc(p.note) +
          "</span>"
        : "") +
      "</div></div></article>"
    );
  }).join("");
  $("#mods").innerHTML = MODS.map(function (m) {
    return (
      '<div class="mod"><div class="row"><span class="mono" style="color:var(--dim)">MODULE</span><i class="led"></i></div><h3>' +
      m[0] +
      "</h3><p>" +
      m[1] +
      "</p></div>"
    );
  }).join("");

  /* ---------- mission detail ---------- */
  var det = $("#detail"),
    app = $("#app"),
    lastFocus = null;
  function sect(t, body) {
    return body
      ? '<section class="bp"><h2>' +
          t +
          "</h2><div>" +
          body +
          "</div></section>"
      : "";
  }
  function lst(a) {
    return a && a.length
      ? "<ul>" +
          a
            .map(function (x) {
              return "<li>" + esc(x) + "</li>";
            })
            .join("") +
          "</ul>"
      : "";
  }
  function openM(slug, push) {
    var i = P.findIndex(function (p) {
      return p.slug === slug;
    });
    if (i < 0) return;
    var p = P[i],
      n = P[(i + 1) % P.length],
      pr = P[(i + P.length - 1) % P.length];
    lastFocus = document.activeElement;
    var meta = p.meta || [
      ["Genre", p.genre],
      ["Engine", p.engine],
      ["Type", p.kind],
    ];
    if (!p.meta && p.released) meta.push(["Released", p.released]);
    var art = p.shot
      ? '<img src="' +
        esc(p.shot) +
        '" alt="' +
        esc(p.shotAlt || p.title) +
        '" style="object-position:' +
        (p.pos || "50% 40%") +
        '">'
      : '<canvas class="art" data-art="' +
        p.art +
        '" role="img" aria-label="Key art for ' +
        esc(p.title) +
        '"></canvas><span class="mono">Key art</span>';
    var shots =
      p.shots && p.shots.length
        ? '<div class="pgrid" style="gap:12px">' +
          p.shots
            .map(function (s) {
              return (
                '<img src="' +
                esc(s) +
                '" alt="' +
                esc(p.title) +
                ' screenshot" loading="lazy" style="width:100%;border:1px solid var(--line)">'
              );
            })
            .join("") +
          "</div>" +
          (p.shotCap
            ? '<p class="mono" style="color:var(--dim);margin-top:12px">' +
              esc(p.shotCap) +
              "</p>"
            : "")
        : "";
    var loop = p.loop
      ? '<div class="chips" style="align-items:center">' +
        p.loop
          .map(function (x, i) {
            return (
              '<span class="chip">' +
              esc(x) +
              "</span>" +
              (i < p.loop.length - 1
                ? '<span style="color:var(--accent)" aria-hidden="true">→</span>'
                : "")
            );
          })
          .join("") +
        "</div>"
      : "";
    det.innerHTML =
      '<div class="dbar"><div class="wrap"><button class="btn sm" id="dBack" type="button">← All missions</button><span class="mono" style="color:var(--muted)">Mission briefing</span></div></div>' +
      '<div class="wrap"><div class="dhero"><p class="eyebrow in">' +
      esc(p.kind) +
      '</p><h1 id="dTitle" tabindex="-1">' +
      esc(p.title) +
      "</h1>" +
      '<div class="dmeta">' +
      meta
        .map(function (m) {
          return (
            "<div><small>" + m[0] + "</small><b>" + esc(m[1]) + "</b></div>"
          );
        })
        .join("") +
      "</div>" +
      '<div class="dart hud"' +
      (p.ar ? ' style="aspect-ratio:' + p.ar + '"' : "") +
      ">" +
      art +
      "</div>" +
      '<div class="cta" style="margin-top:22px">' +
      (p.play
        ? '<a class="btn primary" href="' +
          esc(p.play) +
          '" target="_blank" rel="noopener">Get it on Google Play ↗</a>'
        : "") +
      (p.demo
        ? '<a class="btn primary" href="' +
          esc(p.demo) +
          '" target="_blank" rel="noopener">Watch gameplay ↗</a>'
        : "") +
      (p.github
        ? '<a class="btn" href="' +
          esc(p.github) +
          '" target="_blank" rel="noopener">GitHub ↗</a>'
        : "") +
      '<a class="btn' +
      (p.demo || p.play ? "" : " primary") +
      '" href="https://github.com/Karthik1811-spec" target="_blank" rel="noopener">GitHub profile ↗</a></div></div>' +
      '<div class="dbody">' +
      sect("Overview", "<p>" + esc(p.overview) + "</p>") +
      sect("Core gameplay loop", loop) +
      sect("What I built", lst(p.built)) +
      sect("Gameplay mechanics", lst(p.mechanics)) +
      sect("Technical implementation", lst(p.tech)) +
      sect("UI / UX", p.ui ? "<p>" + esc(p.ui) + "</p>" : "") +
      sect("Challenges", lst(p.challenges)) +
      sect("Solutions", lst(p.solutions)) +
      sect("What I learned", lst(p.learned)) +
      sect("Screenshots", shots) +
      sect(
        "Technology stack",
        '<div class="chips">' +
          p.stack
            .map(function (t) {
              return '<span class="chip">' + esc(t) + "</span>";
            })
            .join("") +
          "</div>",
      ) +
      (p.status
        ? sect("Status", '<p class="pend">' + esc(p.status) + "</p>")
        : "") +
      (p.soon
        ? sect(
            "Case study",
            '<p class="pend">The full write-up for this project, covering mechanics, implementation, challenges and solutions, is being prepared.</p>',
          )
        : "") +
      "</div>" +
      '<nav class="dnav" aria-label="Missions"><a class="btn" href="#mission-' +
      pr.slug +
      '">← ' +
      esc(pr.title) +
      '</a><a class="btn" href="#mission-' +
      n.slug +
      '">' +
      esc(n.title) +
      " →</a></nav></div>";
    det.hidden = false;
    det.scrollTop = 0;
    app.setAttribute("inert", "");
    document.documentElement.style.overflow = "hidden";
    $("#dBack").addEventListener("click", function () {
      location.hash = "#projects";
    });
    requestAnimationFrame(function () {
      paintAll(det);
      $("#dTitle").focus({ preventScroll: true });
    });
  }
  function closeM() {
    if (det.hidden) return;
    det.hidden = true;
    det.innerHTML = "";
    app.removeAttribute("inert");
    document.documentElement.style.overflow = "";
    if (lastFocus && lastFocus.focus)
      try {
        lastFocus.focus({ preventScroll: true });
      } catch (e) {}
  }
  function route() {
    var h = location.hash.slice(1);
    if (h.indexOf("mission-") === 0) openM(h.slice(8));
    else {
      closeM();
      if (h) {
        var t = document.getElementById(h);
        if (t) t.scrollIntoView();
      }
    }
  }
  window.addEventListener("hashchange", route);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !det.hidden) location.hash = "#projects";
  });

  /* ---------- nav ---------- */
  var mb = $("#menuBtn"),
    nl = $("#navlist");
  mb.addEventListener("click", function () {
    var o = nl.classList.toggle("open");
    mb.setAttribute("aria-expanded", o);
  });
  $$("a", nl).forEach(function (a) {
    a.addEventListener("click", function () {
      nl.classList.remove("open");
      mb.setAttribute("aria-expanded", "false");
    });
  });
  var links = {};
  $$("[data-s]").forEach(function (a) {
    links[a.dataset.s] = a;
  });
  var so = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          Object.keys(links).forEach(function (k) {
            links[k].classList.toggle("on", k === e.target.id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  ["home", "about", "skills", "experience", "projects", "contact"].forEach(
    function (id) {
      var el = document.getElementById(id);
      if (el) so.observe(el);
    },
  );

  /* ---------- progress + reveal + counters ---------- */
  var pg = $("#progress");
  function onScroll() {
    var h = document.documentElement,
      m = h.scrollHeight - h.clientHeight;
    pg.style.transform =
      "scaleX(" + (m > 0 ? Math.min(1, window.scrollY / m) : 0) + ")";
    if (!reduce)
      $$(".card .img canvas").forEach(function (c) {
        var b = c.parentNode.getBoundingClientRect();
        if (b.bottom > 0 && b.top < innerHeight) {
          c.style.translate =
            "0 " +
            (
              ((b.top + b.height / 2 - innerHeight / 2) / innerHeight) *
              -14
            ).toFixed(1) +
            "px";
        }
      });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  function count(el) {
    var to = +el.dataset.to,
      t0 = null;
    if (reduce) {
      el.textContent = to;
      return;
    }
    (function f(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / 1100);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(f);
    })(performance.now());
  }
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            $$(".eyebrow", e.target).forEach(function (x) {
              x.classList.add("in");
            });
            $$(".cnt", e.target).forEach(count);
            ro.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    $$(".rv").forEach(function (el) {
      ro.observe(el);
    });
    setTimeout(function () {
      $$(".rv:not(.in)").forEach(function (el) {
        var b = el.getBoundingClientRect();
        if (b.top < innerHeight) el.classList.add("in");
      });
    }, 1500);
  } else {
    document.documentElement.classList.add("rv-off");
  }

  /* ---------- hero reticle + live cursor ---------- */
  var feat = $("#feat"),
    ret = $("#ret"),
    co = $("#coord");
  if (fine && !reduce) {
    feat.addEventListener("mousemove", function (e) {
      var b = feat.querySelector(".frame").getBoundingClientRect(),
        x = e.clientX - b.left,
        y = e.clientY - b.top;
      ret.style.left = x + "px";
      ret.style.top = y + "px";
      ret.style.transform = "scale(1.15)";
      co.textContent =
        "X " +
        String(Math.round(x)).padStart(3, "0") +
        " · Y " +
        String(Math.round(y)).padStart(3, "0");
    });
    feat.addEventListener("mouseleave", function () {
      ret.style.left = "50%";
      ret.style.top = "50%";
      ret.style.transform = "";
    });
  }
  var lr = $("#liveReticle");
  if (fine && !reduce) {
    var tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      on = false;
    window.addEventListener("mousemove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
      lr.style.opacity = 0.9;
      if (!on) {
        on = true;
        requestAnimationFrame(tick);
      }
    });
    document.addEventListener("mouseleave", function () {
      lr.style.opacity = 0;
    });
    function tick() {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      lr.style.transform = "translate(" + cx + "px," + cy + "px)";
      requestAnimationFrame(tick);
    }
    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest && e.target.closest(".card,.feature");
      var b = e.target.closest && e.target.closest("a,button,input,textarea");
      if (t) {
        lr.style.width = lr.style.height = "64px";
        lr.style.margin = "-32px 0 0 -32px";
        lr.style.background = "rgba(79,217,138,.14)";
      } else if (b) {
        lr.style.width = lr.style.height = "46px";
        lr.style.margin = "-23px 0 0 -23px";
        lr.style.background = "transparent";
      } else {
        lr.style.width = lr.style.height = "34px";
        lr.style.margin = "-17px 0 0 -17px";
        lr.style.background = "transparent";
      }
    });
  }

  /* ---------- mansion wireframe ---------- */
  (function () {
    var cv = $("#wire"),
      c = cv.getContext("2d"),
      a = 0.55,
      vis = true,
      last = performance.now();
    var V = [],
      E = [];
    function v(x, y, z) {
      V.push([x, y, z]);
      return V.length - 1;
    }
    function ln(i, j) {
      E.push([i, j]);
    }
    function loop(ids) {
      for (var i = 0; i < ids.length; i++)
        ln(ids[i], ids[(i + 1) % ids.length]);
    }
    function box(x0, x1, y0, y1, z0, z1) {
      var t = [v(x0, y0, z0), v(x1, y0, z0), v(x1, y0, z1), v(x0, y0, z1)],
        b = [v(x0, y1, z0), v(x1, y1, z0), v(x1, y1, z1), v(x0, y1, z1)];
      loop(t);
      loop(b);
      for (var i = 0; i < 4; i++) ln(t[i], b[i]);
    }
    function winZ(cx, cy, z, w, h) {
      var p = [
        v(cx - w / 2, cy - h / 2, z),
        v(cx + w / 2, cy - h / 2, z),
        v(cx + w / 2, cy + h / 2, z),
        v(cx - w / 2, cy + h / 2, z),
      ];
      loop(p);
      ln(v(cx, cy - h / 2, z), v(cx, cy + h / 2, z));
      ln(v(cx - w / 2, cy, z), v(cx + w / 2, cy, z));
    }
    function winX(x, cy, cz, w, h) {
      var p = [
        v(x, cy - h / 2, cz - w / 2),
        v(x, cy - h / 2, cz + w / 2),
        v(x, cy + h / 2, cz + w / 2),
        v(x, cy + h / 2, cz - w / 2),
      ];
      loop(p);
      ln(v(x, cy - h / 2, cz), v(x, cy + h / 2, cz));
      ln(v(x, cy, cz - w / 2), v(x, cy, cz + w / 2));
    }
    /* plinth + main block + belt course */
    box(-3.25, 3.25, -0.15, 0, -1.85, 1.85);
    box(-3, 3, -2.3, -0.15, -1.6, 1.6);
    loop([
      v(-3.04, -1.2, -1.64),
      v(3.04, -1.2, -1.64),
      v(3.04, -1.2, 1.64),
      v(-3.04, -1.2, 1.64),
    ]);
    /* hip roof with tile lines */
    var e = [
        v(-3.35, -2.3, -1.95),
        v(3.35, -2.3, -1.95),
        v(3.35, -2.3, 1.95),
        v(-3.35, -2.3, 1.95),
      ],
      r0 = v(-1.8, -3.25, 0),
      r1 = v(1.8, -3.25, 0);
    loop(e);
    ln(r0, r1);
    ln(e[0], r0);
    ln(e[3], r0);
    ln(e[1], r1);
    ln(e[2], r1);
    [-1.2, 0, 1.2].forEach(function (x) {
      var q = v(x, -3.25, 0);
      ln(v(x, -2.3, 1.95), q);
      ln(v(x, -2.3, -1.95), q);
    });
    box(-0.55, -0.2, -3.55, -3.25, -0.2, 0.15);
    /* columned portico with gable */
    box(-3.1, 0.3, -0.3, -0.15, 1.6, 3.05);
    [-2.8, -2.1, -1.4, -0.7, 0].forEach(function (x) {
      box(x - 0.11, x + 0.11, -2.15, -0.3, 2.55, 2.77);
    });
    box(-3.15, 0.35, -2.3, -2.15, 1.5, 3.1);
    var g0 = v(-3.15, -2.3, 3.1),
      g1 = v(0.35, -2.3, 3.1),
      g2 = v(-3.15, -2.3, 1.5),
      g3 = v(0.35, -2.3, 1.5),
      k0 = v(-1.4, -3.15, 3.1),
      k1 = v(-1.4, -3.15, 1.5);
    ln(g0, k0);
    ln(g1, k0);
    ln(g2, k1);
    ln(g3, k1);
    ln(k0, k1);
    ln(g0, g1);
    box(-1.9, -0.9, -0.45, -0.3, 3.05, 3.35);
    box(-1.75, -1.05, -0.6, -0.45, 3.35, 3.6);
    /* right gable, pilasters, round window */
    var t0 = v(0.8, -2.3, 1.7),
      t1 = v(2.4, -2.3, 1.7),
      t2 = v(1.6, -3.2, 1.7);
    loop([t0, t1, t2]);
    ln(t2, v(1.6, -2.95, 0.9));
    ln(t0, v(0.8, -2.3, 0.9));
    ln(t1, v(2.4, -2.3, 0.9));
    var rc = [];
    for (var i = 0; i < 10; i++) {
      var th = (i / 10) * Math.PI * 2;
      rc.push(v(1.6 + Math.cos(th) * 0.22, -2.62 + Math.sin(th) * 0.22, 1.7));
    }
    loop(rc);
    box(0.8, 1, -2.3, -0.15, 1.6, 1.82);
    box(2.3, 2.5, -2.3, -0.15, 1.6, 1.82);
    box(2.85, 3.05, -2.3, -0.15, 1.6, 1.82);
    /* right wing */
    box(3, 4.5, -1.9, -0.15, -1, 1);
    var we = [
        v(2.9, -1.9, -1.1),
        v(4.6, -1.9, -1.1),
        v(4.6, -1.9, 1.1),
        v(2.9, -1.9, 1.1),
      ],
      wa = v(3.75, -2.55, -1.1),
      wb = v(3.75, -2.55, 1.1);
    loop(we);
    ln(wa, wb);
    ln(we[0], wa);
    ln(we[1], wa);
    ln(we[2], wb);
    ln(we[3], wb);
    /* windows */
    winZ(1.6, -0.85, 1.65, 0.5, 0.65);
    winZ(1.6, -1.8, 1.65, 0.5, 0.5);
    winZ(0.35, -1.7, 1.62, 0.4, 0.55);
    winZ(0.35, -0.75, 1.62, 0.4, 0.55);
    [-2.4, -1.4, -0.4].forEach(function (x) {
      winZ(x, -0.8, 1.62, 0.4, 0.6);
      winZ(x, -1.75, 1.62, 0.4, 0.55);
    });
    [-2.1, 0, 2.1].forEach(function (x) {
      winZ(x, -0.8, -1.62, 0.45, 0.6);
      winZ(x, -1.8, -1.62, 0.45, 0.55);
    });
    [-0.8, 0.8].forEach(function (z) {
      winX(-3.02, -0.8, z, 0.45, 0.6);
      winX(-3.02, -1.8, z, 0.45, 0.55);
    });
    winX(4.52, -1, 0, 0.6, 0.7);
    /* door */
    loop([
      v(-1.8, -0.3, 1.62),
      v(-1.0, -0.3, 1.62),
      v(-1.0, -1.5, 1.62),
      v(-1.8, -1.5, 1.62),
    ]);
    /* centre model */
    var mn = [1e9, 1e9, 1e9],
      mx = [-1e9, -1e9, -1e9];
    V.forEach(function (p) {
      for (var k = 0; k < 3; k++) {
        mn[k] = Math.min(mn[k], p[k]);
        mx[k] = Math.max(mx[k], p[k]);
      }
    });
    var C = [(mn[0] + mx[0]) / 2, (mn[1] + mx[1]) / 2, (mn[2] + mx[2]) / 2],
      R = 0;
    V = V.map(function (p) {
      var q = [p[0] - C[0], p[1] - C[1], p[2] - C[2]];
      R = Math.max(R, Math.hypot(q[0], q[2]));
      return q;
    });
    var tl = 0.42,
      ct = Math.cos(tl),
      st = Math.sin(tl);
    function draw() {
      var d = Math.min(devicePixelRatio || 1, 2),
        b = cv.getBoundingClientRect();
      if (!b.width) return;
      cv.width = b.width * d;
      cv.height = b.height * d;
      c.setTransform(d, 0, 0, d, 0, 0);
      var w = b.width,
        h = b.height,
        s = (Math.min(w, h * 1.25) * 0.46) / R,
        ca = Math.cos(a),
        sa = Math.sin(a),
        P = V.map(function (p) {
          var x = p[0] * ca + p[2] * sa,
            z = -p[0] * sa + p[2] * ca,
            y = p[1] * ct + z * st,
            zz = -p[1] * st + z * ct,
            f = 1 / (1 - zz * 0.05);
          return [w / 2 + x * s * f, h / 2 + y * s * f, zz / R];
        });
      c.lineWidth = 1.1;
      c.strokeStyle = "#58d68d";
      c.shadowColor = "rgba(88,214,141,.65)";
      c.shadowBlur = 5;
      for (var k = 0; k < E.length; k++) {
        var A = P[E[k][0]],
          B = P[E[k][1]],
          dz = (A[2] + B[2]) / 2;
        c.globalAlpha = Math.max(0.22, Math.min(1, 0.62 + dz * 0.5));
        c.beginPath();
        c.moveTo(A[0], A[1]);
        c.lineTo(B[0], B[1]);
        c.stroke();
      }
      c.shadowBlur = 0;
      c.globalAlpha = 0.2;
      c.lineWidth = 1;
      var gy = h * 0.5 + s * (mx[1] - mn[1]) * 0.5 * ct + 4;
      for (var j = -3; j <= 3; j++) {
        c.beginPath();
        c.moveTo(w * 0.08, gy + j * 7);
        c.lineTo(w * 0.92, gy + j * 7);
        c.stroke();
      }
      c.globalAlpha = 1;
    }
    if ("IntersectionObserver" in window)
      new IntersectionObserver(function (e) {
        vis = e[0].isIntersecting;
      }).observe(cv);
    (function loop(t) {
      var dt = Math.min(50, t - last);
      last = t;
      if (vis && !reduce) {
        a += dt * 0.00045;
        draw();
      }
      requestAnimationFrame(loop);
    })(performance.now());
    draw();
  })();

  /* ---------- contact ---------- */
  function copy(txt, btn) {
    var ok = function () {
      var o = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(function () {
        btn.textContent = o;
      }, 1400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(ok, function () {
        sel(txt, btn);
      });
    } else sel(txt, btn);
  }
  function sel(txt, btn) {
    var r = document.createRange(),
      n = btn.id === "copyMail" ? $("#mail") : $("#stagedTxt");
    r.selectNodeContents(n);
    var s = getSelection();
    s.removeAllRanges();
    s.addRange(r);
    btn.textContent = "Selected, press copy";
  }
  $("#copyMail").addEventListener("click", function () {
    copy($("#mail").textContent, this);
  });
  $("#cf").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target;
    if (!f.checkValidity()) {
      f.reportValidity();
      return;
    }
    var d = new FormData(f),
      body =
        "From: " +
        d.get("name") +
        " <" +
        d.get("email") +
        ">\nSubject: " +
        d.get("subject") +
        "\n\n" +
        d.get("message");
    $("#stagedTxt").textContent = body;
    $("#mailto").href =
      "mailto:dkarthikeyan1811@gmail.com?subject=" +
      encodeURIComponent(d.get("subject")) +
      "&body=" +
      encodeURIComponent(
        d.get("message") + "\n\n" + d.get("name") + " <" + d.get("email") + ">",
      );
    $("#staged").hidden = false;
  });
  $("#copyMsg").addEventListener("click", function () {
    copy($("#stagedTxt").textContent, this);
  });

  /* ---------- boot ---------- */
  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      paintAll(document);
    }, 150);
  });
  function boot() {
    paintAll(document);
    route();
    setTimeout(
      function () {
        $("#loader").classList.add("done");
      },
      reduce ? 0 : 650,
    );
  }
  (document.fonts && document.fonts.ready
    ? document.fonts.ready
    : Promise.resolve()
  ).then(boot);
  setTimeout(function () {
    if (!$("#loader").classList.contains("done")) {
      paintAll(document);
    }
  }, 2200);
})();
