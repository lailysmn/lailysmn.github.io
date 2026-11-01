(function () {
  "use strict";
  var $ = function (s, r) {
    return (r || document).querySelector(s);
  };
  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  };
  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- ikon ---------- */
  var IC = {
    pin: '<path d="M12 21s-6.500-5.600-6.500-11a6.500 6.500 0 0 1 13 0c0 5.400-6.500 11-6.500 11z"/><circle cx="12" cy="10" r="2.400"/>',
    route:
      '<circle cx="6" cy="18" r="2.200"/><circle cx="18" cy="6" r="2.200"/><path d="M8.200 18H14a3.500 3.500 0 0 0 0-7h-4a3.500 3.500 0 0 1 0-7h5.800"/>',
    map: '<path d="M3 6.500l6-2.500 6 2.500 6-2.500v13.500l-6 2.500-6-2.500-6 2.500z"/><path d="M9 4v13.500M15 6.500V20"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    guide:
      '<path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4z"/><path d="M9 9h6M9 13h6"/>',
    tag: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.500"/>',
    tumbler:
      '<path d="M8 3h8l-.8 3H8.800z"/><path d="M8.600 6h6.800l-1 14.200a1 1 0 0 1-1 .8h-2.800a1 1 0 0 1-1-.8z"/>',
    key: '<circle cx="8" cy="15" r="3.500"/><path d="M10.500 12.500L20 3M16 7l3 3M13.500 9.500l2 2"/>',
    bag: '<rect x="4" y="8" width="16" height="12" rx="2.500"/><path d="M9 8V6.500a3 3 0 0 1 6 0V8"/>',
    wallet:
      '<rect x="3" y="6" width="18" height="13" rx="2.500"/><path d="M3 10h18M16 14.500h2"/>',
    box: '<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>',
    volume:
      '<path d="M4 10v4h3.500L12 18V6L7.500 10z"/><path d="M15.500 9a4 4 0 0 1 0 6M18 6.500a7.500 7.500 0 0 1 0 11"/>',
    bell: '<path d="M6 17v-6a6 6 0 0 1 12 0v6l1.500 2h-15z"/><path d="M10 21h4"/>',
    check: '<path d="M5 12.500l4.500 4.500L19 7.500"/>',
    target:
      '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.600 5.600L7 7M17 17l1.400 1.400M5.600 18.400L7 17M17 7l1.400-1.400"/>',
    moon: '<path d="M20 14.500A8 8 0 0 1 9.500 4a8 8 0 1 0 10.500 10.500z"/>',
    alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17v.5"/>',
    trash: '<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>',
    home: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/>',
    briefcase:
      '<rect x="3.500" y="8" width="17" height="11" rx="2"/><path d="M9 8V6h6v2M3.500 13h17"/>',
    coffee:
      '<path d="M5 9h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M16 10h2a2.500 2.500 0 0 1 0 5h-2M8 4v2M12 4v2"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    tright: '<path d="M5 20v-6a4 4 0 0 1 4-4h9M14 5l5 5-5 5"/>',
    tleft: '<path d="M19 20v-6a4 4 0 0 0-4-4H6M10 5L5 10l5 5"/>',
    uturn: '<path d="M8 20V8a4 4 0 0 1 8 0v8M12 12l4 4 4-4"/>',
    flag: '<path d="M6 21V4M6 5h11l-2 4 2 4H6"/>',
    shield: '<path d="M12 3l7 3v5c0 4.500-3 8-7 10-4-2-7-5.500-7-10V6z"/>',
    phone:
      '<rect x="7" y="3" width="10" height="18" rx="2.500"/><path d="M11 18h2"/>',
  };
  function ic(n, s) {
    s = s || 20;
    return (
      '<svg class="ic" width="' +
      s +
      '" height="' +
      s +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      IC[n] +
      "</svg>"
    );
  }
  var TYPES = {
    tumbler: { n: "Tumbler", i: "tumbler" },
    key: { n: "Kunci", i: "key" },
    bag: { n: "Tas", i: "bag" },
    wallet: { n: "Dompet", i: "wallet" },
    other: { n: "Lainnya", i: "box" },
  };

  /* ---------- geometri peta ---------- */
  var XS = [60, 220, 380, 540, 700],
    YS = [60, 175, 290, 405, 510];
  var HN = [
    "Jl. Melati",
    "Jl. Kenanga",
    "Jl. Mawar",
    "Jl. Anggrek",
    "Jl. Dahlia",
  ];
  var VN = [
    "Jl. Cempaka",
    "Jl. Flamboyan",
    "Jl. Seruni",
    "Jl. Teratai",
    "Jl. Kamboja",
  ];
  var M = 1.5; /* meter per unit peta */
  var PLACES = [
    {
      id: "rumah",
      name: "Rumah",
      x: 140,
      y: 457,
      r: 62,
      zone: true,
      i: "home",
    },
    {
      id: "kantor",
      name: "Kantor",
      x: 620,
      y: 118,
      r: 62,
      zone: true,
      i: "briefcase",
    },
    {
      id: "kafe",
      name: "Kafe Senja",
      x: 300,
      y: 232,
      r: 0,
      zone: false,
      i: "coffee",
    },
  ];
  function nearestIdx(a, v) {
    var b = 0,
      d = 1e9;
    a.forEach(function (x, i) {
      var t = Math.abs(x - v);
      if (t < d) {
        d = t;
        b = i;
      }
    });
    return b;
  }
  function placeOf(p) {
    var best = null;
    PLACES.forEach(function (pl) {
      var d = Math.hypot(p.x - pl.x, p.y - pl.y);
      if (d <= 70 && (!best || d < best.d)) best = { d: d, pl: pl };
    });
    if (best) return best.pl.name;
    return (
      "Dekat " + VN[nearestIdx(XS, p.x)] + " dan " + HN[nearestIdx(YS, p.y)]
    );
  }
  function zoneOf(p) {
    for (var i = 0; i < PLACES.length; i++) {
      var pl = PLACES[i];
      if (
        pl.zone &&
        state.zonesOn[pl.id] &&
        Math.hypot(p.x - pl.x, p.y - pl.y) <= pl.r
      )
        return pl;
    }
    return null;
  }
  function fmtM(m) {
    if (m >= 1000) return (m / 1000).toFixed(1).replace(".", ",") + " km";
    if (m < 100) return Math.max(5, Math.round(m / 5) * 5) + " m";
    return Math.round(m / 10) * 10 + " m";
  }
  function bearingName(dx, dy) {
    var a = (Math.atan2(dx, -dy) * 180) / Math.PI;
    if (a < 0) a += 360;
    var n = [
      "utara",
      "timur laut",
      "timur",
      "tenggara",
      "selatan",
      "barat daya",
      "barat",
      "barat laut",
    ];
    return n[Math.round(a / 45) % 8];
  }

  /* ---------- GPS nyata (lokasi HP sungguhan) ---------- */
  function toRad(d) {
    return (d * Math.PI) / 180;
  }
  function haversineM(lat1, lon1, lat2, lon2) {
    var R = 6371000,
      dLat = toRad(lat2 - lat1),
      dLon = toRad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  function bearingReal(lat1, lon1, lat2, lon2) {
    var y = Math.sin(toRad(lon2 - lon1)) * Math.cos(toRad(lat2));
    var x =
      Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
      Math.sin(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.cos(toRad(lon2 - lon1));
    var b = (Math.atan2(y, x) * 180) / Math.PI;
    return (b + 360) % 360;
  }
  function secureOK() {
    return (
      location.protocol === "https:" ||
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1"
    );
  }

  function rng(seed) {
    var s = seed;
    return function () {
      s = (s * 1664525 + 1013904223) % 4294967296;
      return s / 4294967296;
    };
  }
  function buildStatic() {
    var xsE = [-420, -260, -100].concat(XS, [860, 1020, 1180, 1340]);
    var ysE = [-340, -200, -50].concat(YS, [640, 780, 920]);
    var h =
      '<rect x="-900" y="-800" width="2800" height="2200" fill="var(--map-land)"/>';
    h +=
      '<path d="M-500 560C-100 520 150 600 420 556S900 520 1500 570" fill="none" stroke="var(--map-water)" stroke-width="70" stroke-linecap="round"/>';
    for (var c = 0; c < xsE.length - 1; c++) {
      for (var r = 0; r < ysE.length - 1; r++) {
        var x0 = xsE[c] + 9,
          x1 = xsE[c + 1] - 9,
          y0 = ysE[r] + 9,
          y1 = ysE[r + 1] - 9,
          w = x1 - x0,
          hh = y1 - y0;
        var park = (c === 3 && r === 3) || (c === 6 && r === 5);
        var special =
          (c === 3 && r === 6) || (c === 6 && r === 3) || (c === 4 && r === 4);
        if (park) {
          h +=
            '<rect x="' +
            x0 +
            '" y="' +
            y0 +
            '" width="' +
            w +
            '" height="' +
            hh +
            '" rx="10" fill="var(--map-park)"/>';
          if (c === 3 && r === 3)
            h +=
              '<ellipse cx="' +
              (x0 + w / 2) +
              '" cy="' +
              (y0 + hh / 2) +
              '" rx="32" ry="18" fill="var(--map-water)"/>';
          continue;
        }
        h +=
          '<rect x="' +
          x0 +
          '" y="' +
          y0 +
          '" width="' +
          w +
          '" height="' +
          hh +
          '" rx="10" fill="var(--map-block)"/>';
        if (special) continue;
        var rd = rng(c * 97 + r * 31 + 7),
          n = 3 + Math.floor(rd() * 3);
        for (var k = 0; k < n; k++) {
          var bw = 22 + rd() * 26,
            bh = 16 + rd() * 18,
            bx = x0 + 8 + rd() * Math.max(1, w - bw - 16),
            by = y0 + 8 + rd() * Math.max(1, hh - bh - 16);
          h +=
            '<rect x="' +
            bx.toFixed(1) +
            '" y="' +
            by.toFixed(1) +
            '" width="' +
            bw.toFixed(1) +
            '" height="' +
            bh.toFixed(1) +
            '" rx="3" fill="var(--map-bld)"/>';
        }
      }
    }
    function lines(w, col) {
      var s = "";
      ysE.forEach(function (y) {
        var mn = y === YS[2];
        s +=
          '<path d="M-900 ' +
          y +
          'H1900" stroke="' +
          col +
          '" stroke-width="' +
          (w + (mn ? 6 : 0)) +
          '"/>';
      });
      xsE.forEach(function (x) {
        var mn = x === XS[2];
        s +=
          '<path d="M' +
          x +
          ' -900V1500" stroke="' +
          col +
          '" stroke-width="' +
          (w + (mn ? 6 : 0)) +
          '"/>';
      });
      return s;
    }
    h +=
      '<g fill="none">' +
      lines(13, "var(--map-casing)") +
      lines(11, "var(--map-road)") +
      "</g>";
    YS.forEach(function (y, j) {
      h +=
        '<text class="stl" x="632" y="' +
        (y + 3.2) +
        '" text-anchor="middle">' +
        HN[j] +
        "</text>";
    });
    XS.forEach(function (x, i) {
      var y = i % 2 ? 462 : 350;
      h +=
        '<text class="stl" transform="rotate(-90 ' +
        (x + 3.2) +
        " " +
        y +
        ')" x="' +
        (x + 3.2) +
        '" y="' +
        y +
        '" text-anchor="middle">' +
        VN[i] +
        "</text>";
    });
    PLACES.forEach(function (pl) {
      h +=
        '<circle cx="' +
        pl.x +
        '" cy="' +
        pl.y +
        '" r="13" fill="var(--surface)" stroke="var(--line)" stroke-width="1.5"/>';
      h +=
        '<g transform="translate(' +
        (pl.x - 8) +
        " " +
        (pl.y - 8) +
        ') scale(.667)" fill="none" stroke="var(--ink-2)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
        IC[pl.i] +
        "</g>";
      h +=
        '<text class="plc" x="' +
        pl.x +
        '" y="' +
        (pl.y + 27) +
        '" text-anchor="middle">' +
        pl.name +
        "</text>";
    });
    return h;
  }
  var STATIC = buildStatic();

  /* ---------- state ---------- */
  function detectPlatform() {
    return /android/i.test(navigator.userAgent || "") ? "android" : "ios";
  }
  function seedItems() {
    return [
      {
        id: "tumbler",
        name: "Tumbler Sip the Warmth",
        type: "tumbler",
        x: 300,
        y: 232,
        battery: 86,
        seen: "Baru saja",
        online: true,
        net: "Find My",
        acc: 22,
        lost: false,
        hist: [
          { t: "06:40", x: 140, y: 457, l: "Berangkat dari Rumah" },
          { t: "07:25", x: 620, y: 118, l: "Tiba di Kantor" },
          { t: "12:10", x: 300, y: 232, l: "Makan siang di Kafe Senja" },
          { t: "12:55", x: 620, y: 118, l: "Kembali ke Kantor" },
          { t: "15:48", x: 300, y: 232, l: "Kafe Senja (sekarang)" },
        ],
      },
      {
        id: "kunci",
        name: "Kunci Motor",
        type: "key",
        x: 162,
        y: 470,
        battery: 24,
        seen: "3 jam lalu",
        online: false,
        net: "Find Hub",
        acc: 30,
        lost: false,
        hist: [
          { t: "Kemarin 21:10", x: 140, y: 457, l: "Pulang ke Rumah" },
          {
            t: "Kemarin 21:15",
            x: 162,
            y: 470,
            l: "Rumah (terakhir terlihat)",
          },
        ],
      },
      {
        id: "tas",
        name: "Tas Kerja",
        type: "bag",
        x: 626,
        y: 128,
        battery: 54,
        seen: "12 menit lalu",
        online: true,
        net: "Find My",
        acc: 26,
        lost: false,
        hist: [
          { t: "07:25", x: 620, y: 118, l: "Tiba di Kantor" },
          { t: "15:36", x: 626, y: 128, l: "Kantor (terakhir terlihat)" },
        ],
      },
    ];
  }
  var state = {
    view: "perangkat",
    sel: "tumbler",
    items: seedItems(),
    you: { x: 150, y: 446 },
    mode: "walk",
    zonesOn: { rumah: true, kantor: true },
    alertOn: true,
    hist: -1,
    confirmDel: null,
    hs: "A",
    route: null,
    check: {},
    theme: null,
    gps: {
      on: false,
      status: "off",
      watchId: null,
      lat: null,
      lon: null,
      acc: null,
      heading: null,
      speed: null,
      updated: null,
      origin: null,
    },
    add: {
      step: 1,
      type: "tumbler",
      name: "",
      platform: detectPlatform(),
      scan: "idle",
      tag: "",
      pos: null,
    },
  };
  var KEY = "stw-demo-v1";
  function save() {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          items: state.items,
          you: state.you,
          zonesOn: state.zonesOn,
          alertOn: state.alertOn,
          check: state.check,
          theme: state.theme,
          platform: state.add.platform,
          mode: state.mode,
        }),
      );
    } catch (e) {}
  }
  function load() {
    try {
      var d = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!d) return;
      if (Array.isArray(d.items) && d.items.length) state.items = d.items;
      if (d.you) state.you = d.you;
      if (d.zonesOn) state.zonesOn = d.zonesOn;
      if (typeof d.alertOn === "boolean") state.alertOn = d.alertOn;
      if (d.check) state.check = d.check;
      if (d.theme) state.theme = d.theme;
      if (d.platform) state.add.platform = d.platform;
      if (d.mode) state.mode = d.mode;
    } catch (e) {}
  }
  load();
  if (
    !state.items.some(function (i) {
      return i.id === state.sel;
    })
  )
    state.sel = state.items[0] ? state.items[0].id : null;
  function cur() {
    for (var i = 0; i < state.items.length; i++)
      if (state.items[i].id === state.sel) return state.items[i];
    return null;
  }

  /* ---------- rute ---------- */
  var MODES = {
    walk: { n: "Jalan kaki", s: 83 },
    bike: { n: "Motor", s: 367 },
    car: { n: "Mobil", s: 333 },
  };
  function nk(i, j) {
    return i + "," + j;
  }
  function snapToRoad(p) {
    var cx = Math.min(Math.max(p.x, XS[0]), XS[4]),
      cy = Math.min(Math.max(p.y, YS[0]), YS[4]),
      best = null;
    YS.forEach(function (y, j) {
      var d = Math.abs(p.y - y);
      if (!best || d < best.d)
        best = { d: d, pt: { x: cx, y: y }, t: "h", j: j };
    });
    XS.forEach(function (x, i) {
      var d = Math.abs(p.x - x);
      if (d < best.d) best = { d: d, pt: { x: x, y: cy }, t: "v", i: i };
    });
    if (best.t === "h") {
      var i0 = 0;
      while (i0 < 3 && best.pt.x > XS[i0 + 1]) i0++;
      best.a = [i0, best.j];
      best.b = [i0 + 1, best.j];
    } else {
      var j0 = 0;
      while (j0 < 3 && best.pt.y > YS[j0 + 1]) j0++;
      best.a = [best.i, j0];
      best.b = [best.i, j0 + 1];
    }
    return best;
  }
  function findRoute(from, to) {
    var S = snapToRoad(from),
      E = snapToRoad(to);
    var same =
      S.t === E.t &&
      (S.t === "h"
        ? S.j === E.j && S.a[0] === E.a[0]
        : S.i === E.i && S.a[1] === E.a[1]);
    var sE = [nk(S.a[0], S.a[1]), nk(S.b[0], S.b[1])],
      eE = [nk(E.a[0], E.a[1]), nk(E.b[0], E.b[1])];
    function pos(k) {
      if (k === "S") return S.pt;
      if (k === "E") return E.pt;
      var p = k.split(",");
      return { x: XS[+p[0]], y: YS[+p[1]] };
    }
    function nb(k) {
      if (k === "S") return sE.concat(same ? ["E"] : []);
      if (k === "E") return eE.concat(same ? ["S"] : []);
      var p = k.split(","),
        i = +p[0],
        j = +p[1],
        r = [];
      [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ].forEach(function (d) {
        var a = i + d[0],
          b = j + d[1];
        if (a >= 0 && a < 5 && b >= 0 && b < 5) r.push(nk(a, b));
      });
      if (sE.indexOf(k) >= 0) r.push("S");
      if (eE.indexOf(k) >= 0) r.push("E");
      return r;
    }
    var dist = { S: 0 },
      prev = {},
      done = {},
      q = ["S"];
    while (q.length) {
      q.sort(function (a, b) {
        return dist[a] - dist[b];
      });
      var u = q.shift();
      if (done[u]) continue;
      done[u] = 1;
      if (u === "E") break;
      nb(u).forEach(function (v) {
        var pu = pos(u),
          pv = pos(v),
          w = Math.hypot(pu.x - pv.x, pu.y - pv.y);
        if (dist[v] === undefined || dist[u] + w < dist[v]) {
          dist[v] = dist[u] + w;
          prev[v] = u;
          q.push(v);
        }
      });
    }
    var path = ["E"];
    while (path[0] !== "S" && prev[path[0]]) path.unshift(prev[path[0]]);
    var road = path.map(pos);
    var pts = [from].concat(road, [to]),
      clean = [];
    pts.forEach(function (p) {
      var l = clean[clean.length - 1];
      if (!l || Math.hypot(l.x - p.x, l.y - p.y) > 0.5)
        clean.push({ x: p.x, y: p.y });
    });
    var len = 0;
    for (var i = 1; i < clean.length; i++)
      len += Math.hypot(
        clean[i].x - clean[i - 1].x,
        clean[i].y - clean[i - 1].y,
      );
    /* segmen jalan */
    var sg = [];
    for (var k = 1; k < road.length; k++) {
      var a = road[k - 1],
        b = road[k],
        ddx = b.x - a.x,
        ddy = b.y - a.y,
        l = Math.hypot(ddx, ddy);
      if (l < 0.5) continue;
      var dx = Math.abs(ddx) < 0.5 ? 0 : Math.sign(ddx),
        dy = Math.abs(ddy) < 0.5 ? 0 : Math.sign(ddy),
        last = sg[sg.length - 1];
      if (last && last.dx === dx && last.dy === dy) last.len += l;
      else sg.push({ dx: dx, dy: dy, len: l, x: a.x, y: a.y });
    }
    sg.forEach(function (s) {
      s.street = s.dy === 0 ? HN[nearestIdx(YS, s.y)] : VN[nearestIdx(XS, s.x)];
      s.dir =
        s.dx > 0
          ? "timur"
          : s.dx < 0
            ? "barat"
            : s.dy > 0
              ? "selatan"
              : "utara";
    });
    var c0 = Math.hypot(road[0].x - from.x, road[0].y - from.y),
      c1 = Math.hypot(
        to.x - road[road.length - 1].x,
        to.y - road[road.length - 1].y,
      );
    var steps = [];
    sg.forEach(function (s, i) {
      if (i === 0)
        steps.push({
          i: "up",
          t: "Masuk ke " + s.street + ", menuju " + s.dir,
          d: s.len + c0,
        });
      else {
        var p = sg[i - 1],
          cr = p.dx * s.dy - p.dy * s.dx,
          dot = p.dx * s.dx + p.dy * s.dy,
          ico,
          txt;
        if (cr > 0) {
          ico = "tright";
          txt = "Belok kanan ke " + s.street + ", menuju " + s.dir;
        } else if (cr < 0) {
          ico = "tleft";
          txt = "Belok kiri ke " + s.street + ", menuju " + s.dir;
        } else if (dot < 0) {
          ico = "uturn";
          txt = "Putar balik di " + s.street;
        } else {
          ico = "up";
          txt = "Lurus di " + s.street;
        }
        steps.push({ i: ico, t: txt, d: s.len });
      }
    });
    if (!sg.length && c0 > 1)
      steps.push({ i: "up", t: "Jalan menuju lokasi barang", d: c0 });
    var it = cur();
    steps.push({
      i: "flag",
      t:
        "Tiba di " +
        (it ? esc(placeOf(it)) : "tujuan") +
        (c1 > 12 ? ", jalan " + fmtM(c1 * M) + " ke barang" : ""),
      d: c1,
    });
    return { pts: clean, len: len, steps: steps };
  }
  function pointAt(pts, d) {
    var acc = 0;
    for (var i = 1; i < pts.length; i++) {
      var a = pts[i - 1],
        b = pts[i],
        l = Math.hypot(b.x - a.x, b.y - a.y);
      if (acc + l >= d) {
        var t = l ? (d - acc) / l : 0;
        return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
      }
      acc += l;
    }
    var e = pts[pts.length - 1];
    return { x: e.x, y: e.y };
  }
  var nav = { running: false, done: false, prog: 0, origin: null, raf: 0 };
  function navActive() {
    return nav.running || nav.done;
  }
  function recompute() {
    var it = cur();
    state.route = it ? findRoute(state.you, it) : null;
  }
  function stopNav(restore) {
    cancelAnimationFrame(nav.raf);
    if (restore && nav.origin && navActive())
      state.you = { x: nav.origin.x, y: nav.origin.y };
    nav.running = false;
    nav.done = false;
    nav.prog = 0;
    nav.origin = null;
  }

  /* ---------- peta ---------- */
  var MAPS = {};
  function pinSVG(x, y, col, icon, sel, label, id, name) {
    var s = sel ? 1.22 : 1;
    return (
      '<g class="pin" ' +
      (id
        ? 'data-item="' +
          id +
          '" tabindex="0" role="button" aria-label="' +
          esc(name) +
          '"'
        : "") +
      ' transform="translate(' +
      x +
      " " +
      y +
      ") scale(" +
      s +
      ')">' +
      (sel
        ? '<circle class="pulse" r="14" cy="-25.700" fill="' + col + '"/>'
        : "") +
      '<ellipse cy="1" rx="6" ry="2.500" fill="#000" opacity=".25"/>' +
      '<path d="M0 0L-8 -13A15 15 0 1 1 8 -13Z" fill="' +
      col +
      '" stroke="var(--map-route-casing)" stroke-width="2.200" stroke-linejoin="round"/>' +
      '<g transform="translate(-8 -33.500) scale(.667)" fill="none" stroke="#fff" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round">' +
      IC[icon] +
      "</g>" +
      (label
        ? '<text class="plc" y="-46" text-anchor="middle">' +
          esc(label) +
          "</text>"
        : "") +
      "</g>"
    );
  }
  function itemCol(it) {
    return !it.online
      ? "#8A7A6A"
      : it.lost
        ? "var(--crit)"
        : it.type === "tumbler"
          ? "var(--accent)"
          : "var(--sage)";
  }
  function youSVG() {
    return (
      '<g transform="translate(' +
      state.you.x +
      " " +
      state.you.y +
      ')"><circle class="youhalo" r="16" fill="var(--map-route)" opacity=".4"/><circle r="8" fill="var(--map-route)" stroke="#fff" stroke-width="3"/></g>'
    );
  }
  function dynSVG(mode) {
    var h = "",
      sel = cur();
    if (mode === "location") {
      PLACES.forEach(function (pl) {
        if (!pl.zone) return;
        var on = state.zonesOn[pl.id];
        h +=
          '<circle cx="' +
          pl.x +
          '" cy="' +
          pl.y +
          '" r="' +
          pl.r +
          '" fill="var(--sage)" fill-opacity="' +
          (on ? 0.14 : 0.04) +
          '" stroke="var(--sage)" stroke-width="2" stroke-dasharray="6 5" stroke-opacity="' +
          (on ? 0.9 : 0.35) +
          '"/>';
      });
      if (sel && sel.hist && sel.hist.length > 1) {
        h +=
          '<polyline points="' +
          sel.hist
            .map(function (p) {
              return p.x + "," + p.y;
            })
            .join(" ") +
          '" fill="none" stroke="var(--accent)" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round" opacity=".85"/>';
        sel.hist.forEach(function (p, i) {
          h +=
            '<circle cx="' +
            p.x +
            '" cy="' +
            p.y +
            '" r="' +
            (i === state.hist ? 9 : 4.5) +
            '" fill="' +
            (i === state.hist ? "var(--cyan)" : "var(--accent)") +
            '" stroke="var(--map-route-casing)" stroke-width="2"/>';
        });
      }
    }
    if (mode === "route" && state.route && state.route.len > 1) {
      var pl = state.route.pts
        .map(function (p) {
          return p.x.toFixed(1) + "," + p.y.toFixed(1);
        })
        .join(" ");
      h +=
        '<polyline points="' +
        pl +
        '" fill="none" stroke="var(--map-route-casing)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<polyline points="' +
        pl +
        '" fill="none" stroke="var(--map-route)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>';
      if (navActive()) {
        var tp = state.route.pts,
          pp = [tp[0]],
          acc = 0;
        for (var i = 1; i < tp.length; i++) {
          var l = Math.hypot(tp[i].x - tp[i - 1].x, tp[i].y - tp[i - 1].y);
          if (acc + l <= nav.prog) {
            pp.push(tp[i]);
            acc += l;
          } else {
            pp.push(pointAt(tp, nav.prog));
            break;
          }
        }
        h +=
          '<polyline points="' +
          pp
            .map(function (p) {
              return p.x.toFixed(1) + "," + p.y.toFixed(1);
            })
            .join(" ") +
          '" fill="none" stroke="var(--sage)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>';
      }
    }
    if (
      sel &&
      (mode === "devices" || mode === "route" || mode === "location")
    ) {
      h +=
        '<circle cx="' +
        sel.x +
        '" cy="' +
        sel.y +
        '" r="' +
        sel.acc +
        '" fill="' +
        itemCol(sel) +
        '" fill-opacity=".12" stroke="' +
        itemCol(sel) +
        '" stroke-width="1.500" stroke-dasharray="4 4"/>';
    }
    if (mode === "pick") {
      h += youSVG();
      var p = state.add.pos || state.you,
        tp2 = TYPES[state.add.type] || TYPES.other;
      h += pinSVG(
        p.x,
        p.y,
        state.add.type === "tumbler" ? "var(--accent)" : "var(--sage)",
        tp2.i,
        true,
        state.add.name || "Barang baru",
      );
    } else {
      state.items
        .filter(function (i) {
          return i.id !== state.sel;
        })
        .forEach(function (it) {
          h += pinSVG(
            it.x,
            it.y,
            itemCol(it),
            TYPES[it.type].i,
            false,
            "",
            it.id,
            it.name,
          );
        });
      if (sel)
        h += pinSVG(
          sel.x,
          sel.y,
          itemCol(sel),
          TYPES[sel.type].i,
          true,
          sel.name,
          sel.id,
          sel.name,
        );
      h += youSVG();
    }
    return h;
  }
  function applyView(m) {
    var v = m.view,
      W = 800 / v.z,
      H = 560 / v.z;
    m.svg.setAttribute(
      "viewBox",
      (v.cx - W / 2).toFixed(1) +
        " " +
        (v.cy - H / 2).toFixed(1) +
        " " +
        W.toFixed(1) +
        " " +
        H.toFixed(1),
    );
  }
  function tweenView(id, t) {
    var m = MAPS[id];
    if (!m) return;
    cancelAnimationFrame(m.raf);
    if (reduced || !m.ready) {
      m.view = t;
      m.ready = true;
      applyView(m);
      return;
    }
    var f = Object.assign({}, m.view),
      t0 = performance.now(),
      D = 320;
    (function step(now) {
      var k = Math.min(1, (now - t0) / D),
        e = 1 - Math.pow(1 - k, 3);
      m.view = {
        cx: f.cx + (t.cx - f.cx) * e,
        cy: f.cy + (t.cy - f.cy) * e,
        z: f.z + (t.z - f.z) * e,
      };
      applyView(m);
      if (k < 1) m.raf = requestAnimationFrame(step);
    })(t0);
  }
  function fitTarget(m) {
    var it = cur();
    if (m.mode === "route" && state.route && it) {
      var xs = [state.you.x, it.x],
        ys = [state.you.y, it.y],
        w = Math.abs(xs[0] - xs[1]),
        h = Math.abs(ys[0] - ys[1]);
      return {
        cx: (xs[0] + xs[1]) / 2,
        cy: (ys[0] + ys[1]) / 2 - 8,
        z: Math.max(
          0.9,
          Math.min(2, Math.min(800 / (w + 220), 560 / (h + 240))),
        ),
      };
    }
    if (m.mode === "pick") {
      var p = state.add.pos || state.you;
      return { cx: p.x, cy: p.y - 10, z: 1.2 };
    }
    if (it)
      return { cx: it.x, cy: it.y - 10, z: m.mode === "location" ? 1.15 : 1.3 };
    return { cx: 400, cy: 280, z: 1 };
  }
  function fit(id) {
    var m = MAPS[id];
    if (m) tweenView(id, fitTarget(m));
  }
  function drawMap(id) {
    var m = MAPS[id];
    if (m) m.dyn.innerHTML = dynSVG(m.mode);
  }
  function svgPoint(svg, e) {
    var pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    var c = svg.getScreenCTM();
    return c ? pt.matrixTransform(c.inverse()) : null;
  }
  function initMap(id, mode) {
    var card = document.getElementById(id),
      host = $(".map", card);
    host.innerHTML =
      '<svg viewBox="0 0 800 560" preserveAspectRatio="xMidYMid meet" role="group" aria-label="Peta ilustrasi dengan posisi barang"><g>' +
      STATIC +
      '</g><g class="dyn"></g></svg>';
    var svg = $("svg", host),
      m = (MAPS[id] = {
        card: card,
        svg: svg,
        dyn: $(".dyn", svg),
        mode: mode,
        view: { cx: 400, cy: 280, z: 1 },
        raf: 0,
        ready: false,
      });
    $$(".mapctl button", card).forEach(function (b) {
      var k = b.getAttribute("data-zoom");
      b.innerHTML = ic(
        k === "in" ? "plus" : k === "out" ? "minus" : "target",
        20,
      );
    });
    card.addEventListener("click", function (e) {
      var zb = e.target.closest("[data-zoom]");
      if (zb) {
        var k = zb.getAttribute("data-zoom");
        if (k === "fit") return fit(id);
        var z = Math.max(
          0.8,
          Math.min(3, m.view.z * (k === "in" ? 1.35 : 1 / 1.35)),
        );
        tweenView(id, { cx: m.view.cx, cy: m.view.cy, z: z });
        return;
      }
      var pe = e.target.closest("[data-item]");
      if (pe) {
        selectItem(pe.getAttribute("data-item"));
        return;
      }
      if (mode === "route" || mode === "pick") {
        var p = svgPoint(svg, e);
        if (!p) return;
        p = {
          x: Math.max(20, Math.min(780, p.x)),
          y: Math.max(30, Math.min(540, p.y)),
        };
        if (mode === "route") {
          stopNav(false);
          state.you = p;
          recompute();
          save();
          renderRoute();
          drawMap(id);
          fit(id);
        } else {
          state.add.pos = p;
          renderAddAfter();
          drawMap(id);
        }
      }
    });
    card.addEventListener("keydown", function (e) {
      if (
        (e.key === "Enter" || e.key === " ") &&
        e.target.closest &&
        e.target.closest("[data-item]")
      ) {
        e.preventDefault();
        selectItem(e.target.closest("[data-item]").getAttribute("data-item"));
      }
    });
  }

  /* ---------- aksi umum ---------- */
  var toastT;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () {
      t.classList.remove("show");
    }, 2800);
  }
  var AC;
  function beep() {
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      var t = AC.currentTime;
      [0, 0.3, 0.6].forEach(function (o) {
        var os = AC.createOscillator(),
          g = AC.createGain();
        os.type = "sine";
        os.frequency.value = 988;
        g.gain.setValueAtTime(0, t + o);
        g.gain.linearRampToValueAtTime(0.2, t + o + 0.02);
        g.gain.linearRampToValueAtTime(0, t + o + 0.22);
        os.connect(g);
        g.connect(AC.destination);
        os.start(t + o);
        os.stop(t + o + 0.25);
      });
    } catch (e) {}
  }
  function ring(it) {
    if (!it.online) {
      toast(
        it.name + " sedang offline. Bunyi dikirim saat tag terhubung lagi.",
      );
      return;
    }
    beep();
    toast(it.name + " berbunyi. Cari suara dari arah barang.");
  }
  function selectItem(id) {
    if (state.sel !== id) {
      stopNav(true);
    }
    state.sel = id;
    state.hist = -1;
    state.confirmDel = null;
    recompute();
    render();
    fitCurrent();
  }
  function fitCurrent() {
    var map = {
      perangkat: "mc-devices",
      arah: "mc-route",
      lokasi: "mc-location",
    }[state.view];
    if (map) fit(map);
  }

  /* ---------- GPS nyata: hubungkan ke posisi HP ini ---------- */
  function onGpsPos(pos) {
    var c = pos.coords,
      g = state.gps;
    g.status = "aktif";
    g.lat = c.latitude;
    g.lon = c.longitude;
    g.acc = c.accuracy;
    g.heading = c.heading;
    g.speed = c.speed;
    g.updated = new Date();
    if (!g.origin) {
      g.origin = {
        lat: c.latitude,
        lon: c.longitude,
        x: state.you.x,
        y: state.you.y,
      };
    } else {
      var o = g.origin,
        d = haversineM(o.lat, o.lon, c.latitude, c.longitude),
        brg = bearingReal(o.lat, o.lon, c.latitude, c.longitude),
        rad = (brg * Math.PI) / 180;
      var dx = (Math.sin(rad) * d) / M,
        dy = (-Math.cos(rad) * d) / M;
      state.you = {
        x: Math.max(20, Math.min(780, o.x + dx)),
        y: Math.max(30, Math.min(540, o.y + dy)),
      };
    }
    stopNav(false);
    recompute();
    save();
    if (state.view === "lokasi" || state.view === "arah") render();
  }
  function onGpsErr(err) {
    var g = state.gps;
    g.status = "error";
    var msg = "Tidak bisa mengambil lokasi GPS.";
    if (err.code === 1)
      msg =
        'Izin lokasi ditolak. Di iPhone: Pengaturan > Safari > Lokasi (atau tombol "aA" di address bar > Pengaturan Situs) lalu izinkan, dan muat ulang halaman.';
    else if (err.code === 2)
      msg =
        "Sinyal lokasi tidak tersedia saat ini. Coba di luar ruangan atau dekat jendela.";
    else if (err.code === 3) msg = "Permintaan lokasi lewat waktu. Coba lagi.";
    toast(msg);
    if (state.view === "lokasi" || state.view === "arah") render();
  }
  function gpsStart() {
    var g = state.gps;
    if (!("geolocation" in navigator)) {
      toast("Browser ini tidak mendukung GPS.");
      return;
    }
    if (!secureOK()) {
      toast(
        "GPS perlu koneksi HTTPS (atau localhost). Buka situs ini lewat alamat https:// di Safari iPhone agar izin lokasi muncul.",
      );
      return;
    }
    g.on = true;
    g.status = "mencari";
    g.origin = null;
    save();
    if (state.view === "lokasi" || state.view === "arah") render();
    g.watchId = navigator.geolocation.watchPosition(onGpsPos, onGpsErr, {
      enableHighAccuracy: true,
      maximumAge: 3000,
      timeout: 20000,
    });
  }
  function gpsStop() {
    var g = state.gps;
    if (g.watchId != null && navigator.geolocation)
      navigator.geolocation.clearWatch(g.watchId);
    g.watchId = null;
    g.on = false;
    g.status = "off";
    save();
    if (state.view === "lokasi" || state.view === "arah") render();
  }
  function gpsStatusText() {
    var g = state.gps;
    if (g.status === "off") return "Belum aktif";
    if (g.status === "mencari") return "Mencari sinyal GPS...";
    if (g.status === "error") return "Gagal mengambil lokasi";
    if (g.status === "aktif") {
      var t = g.updated ? "baru saja" : "";
      return "Aktif · akurasi ± " + Math.round(g.acc || 0) + " m";
    }
    return "";
  }
  function gpsCardHTML() {
    var g = state.gps,
      on = g.on;
    var h =
      '<div class="card stack"><h2>Lacak dari HP ini (GPS real-time)</h2>';
    // h+='<p>Menyalakan ini membaca GPS HP yang sedang membuka halaman ini sekarang, lalu menggerakkan titik "Posisi saya" di peta secara real-time mengikuti pergerakan Anda yang sebenarnya. Buka situs ini di Safari pada iPhone 11 Anda, lalu aktifkan di sini.</p>';
    // h+='<div class="row-sw"><div><b>'+gpsStatusText()+'</b>'+(on&&g.lat!=null?'<small>Lat '+g.lat.toFixed(6)+', Lon '+g.lon.toFixed(6)+(g.speed?' · '+Math.round(g.speed*3.6)+' km/j':'')+'</small>':'<small>Posisi tidak dibagikan ke pihak lain, hanya dipakai di browser ini.</small>')+'</div><button class="sw" type="button" role="switch" data-act="gps-toggle" aria-checked="'+on+'" aria-label=" dari HP ini"></button></div>';
    // if(!secureOK())h+='<div class="note">'+ic('alert',18)+'<span>Alamat saat ini bukan HTTPS. Di iPhone, Safari hanya mengizinkan akses lokasi lewat https:// atau localhost. Lihat README untuk cara mengaktifkan HTTPS lokal atau deploy gratis.</span></div>';
    // h+='<div class="note info">'+ic('phone',18)+'<span>Ini posisi GPS asli dari browser HP Anda, bukan pairing Bluetooth tag sungguhan. Pelacakan tag Find My/Find Hub tetap lewat aplikasi bawaan iPhone, bukan lewat website.</span></div>';
    // h+='</div>';
    return h;
  }

  /* ---------- render: perangkat ---------- */
  function batHTML(b) {
    return (
      '<span class="bat' +
      (b < 30 ? " low" : "") +
      '"><i><b style="width:' +
      b +
      '%"></b></i>' +
      b +
      "%</span>"
    );
  }
  function statusChip(it) {
    return it.lost
      ? '<span class="chip lost">Hilang</span>'
      : it.online
        ? '<span class="chip on">Online</span>'
        : '<span class="chip">Offline</span>';
  }
  function itemCard(it) {
    var sel = it.id === state.sel,
      z = zoneOf(it),
      h = '<article class="item" data-sel="' + sel + '">';
    h +=
      '<button class="item-head" type="button" data-act="select" data-id="' +
      it.id +
      '" aria-expanded="' +
      sel +
      '"><span class="item-ico' +
      (it.type === "tumbler" ? " tum" : "") +
      '">' +
      ic(TYPES[it.type].i, 24) +
      '</span><span class="item-main"><b>' +
      esc(it.name) +
      "</b><small>" +
      esc(placeOf(it)) +
      " · " +
      esc(it.seen) +
      "</small></span>" +
      statusChip(it) +
      "</button>";
    if (sel) {
      h +=
        '<div class="item-body"><dl class="facts"><div><dt>Terakhir terlihat</dt><dd>' +
        esc(it.seen) +
        "</dd></div><div><dt>Lokasi</dt><dd>" +
        esc(placeOf(it)) +
        "</dd></div><div><dt>Baterai tag</dt><dd>" +
        batHTML(it.battery) +
        "</dd></div><div><dt>Jaringan</dt><dd>" +
        esc(it.net) +
        "</dd></div><div><dt>Akurasi</dt><dd>± " +
        Math.round(it.acc * M) +
        " m</dd></div><div><dt>Zona</dt><dd>" +
        (z ? esc(z.name) : "Di luar Zona Aman") +
        "</dd></div></dl>";
      if (state.alertOn && !z && it.online && !it.lost)
        h +=
          '<div class="note">' +
          ic("alert", 18) +
          "<span>" +
          esc(it.name) +
          " berada di luar Zona Aman. Pengingat tertinggal aktif.</span></div>";
      if (it.lost)
        h +=
          '<div class="note bad">' +
          ic("alert", 18) +
          "<span>Mode Hilang aktif. Anda diberi tahu saat perangkat lain di jaringan menemukan barang ini.</span></div>";
      if (!it.online)
        h +=
          '<div class="note info">' +
          ic("bell", 18) +
          "<span>Tag di luar jangkauan. Posisi di peta adalah lokasi terakhir yang terbaca.</span></div>";
      if (it.battery < 30)
        h +=
          '<div class="note">' +
          ic("alert", 18) +
          "<span>Baterai tag tinggal " +
          it.battery +
          "%. Ganti atau isi ulang segera.</span></div>";
      h +=
        '<div class="actions"><button class="btn primary sm" type="button" data-act="ring">' +
        ic("volume", 18) +
        'Bunyikan</button><button class="btn sm" type="button" data-act="go">' +
        ic("route", 18) +
        'Arah</button><button class="btn sm" type="button" data-act="lost" aria-pressed="' +
        it.lost +
        '">' +
        ic("shield", 18) +
        "Mode Hilang</button>";
      if (state.confirmDel === it.id)
        h +=
          '<button class="btn sm danger" type="button" data-act="del-yes">Ya, hapus</button><button class="btn sm" type="button" data-act="del-no">Batal</button>';
      else
        h +=
          '<button class="btn sm danger" type="button" data-act="del" aria-label="Hapus ' +
          esc(it.name) +
          '">' +
          ic("trash", 18) +
          "</button>";
      h += "</div></div>";
    }
    return h + "</article>";
  }
  function renderDevices() {
    var on = state.items.filter(function (i) {
      return i.online;
    }).length;
    $("#sub-perangkat").textContent =
      state.items.length +
      " barang terlacak · " +
      on +
      " online · " +
      (state.items.length - on) +
      " offline";
    $("#list").innerHTML = state.items.length
      ? state.items.map(itemCard).join("")
      : '<div class="card"><p><b>Belum ada barang.</b> Tambahkan tag pertama Anda untuk melihatnya di peta.</p></div>';
    $("#add-shortcut").innerHTML = ic("plus", 18) + "Tambah barang";
    drawMap("mc-devices");
  }

  /* ---------- render: arah ---------- */
  function radarHTML(it) {
    var dx = (it.x - state.you.x) * M,
      dy = (it.y - state.you.y) * M,
      d = Math.hypot(dx, dy),
      sc = 90 / 30,
      rx = dx * sc,
      ry = dy * sc,
      l = Math.hypot(rx, ry);
    if (l > 84) {
      rx *= 84 / l;
      ry *= 84 / l;
    }
    return (
      '<div class="radar"><svg viewBox="-100 -100 200 200" role="img" aria-label="Radar jarak dekat"><circle class="ring" r="90"/><circle class="ring" r="60"/><circle class="ring" r="30"/><circle class="sweep" r="14"/>' +
      '<text x="0" y="-92" text-anchor="middle" font-size="12" font-weight="800" fill="var(--ink-2)" style="font-family:var(--f-body)">U</text>' +
      '<circle r="7" fill="var(--map-route)" stroke="#fff" stroke-width="3"/><circle cx="' +
      rx.toFixed(1) +
      '" cy="' +
      ry.toFixed(1) +
      '" r="9" fill="' +
      itemCol(it) +
      '" stroke="#fff" stroke-width="3"/></svg>' +
      '<div style="display:grid;gap:8px"><div><span class="big">± ' +
      Math.max(1, Math.round(d)) +
      " m</span><br><small>" +
      (d < 3
        ? "Tepat di dekat Anda"
        : "Arah " + bearingName(dx, dy) + " dari Anda") +
      '</small></div><button class="btn primary sm" type="button" data-act="ring">' +
      ic("volume", 18) +
      "Bunyikan tag</button></div></div>"
    );
  }
  function remainM() {
    var r = state.route;
    if (!r) return 0;
    return (navActive() ? Math.max(0, r.len - nav.prog) : r.len) * M;
  }
  function stepIdx() {
    var r = state.route;
    if (!r || !navActive()) return -1;
    var acc = 0;
    for (var i = 0; i < r.steps.length; i++) {
      acc += r.steps[i].d;
      if (nav.prog < acc - 0.01) return i;
    }
    return r.steps.length - 1;
  }
  function stepsHTML() {
    var r = state.route;
    if (!r) return "";
    var ci = stepIdx();
    return r.steps
      .map(function (s, i) {
        return (
          '<li class="' +
          (i === ci ? "cur" : ci >= 0 && i < ci ? "done" : "") +
          '"><span class="sic">' +
          ic(s.i, 18) +
          "</span><span>" +
          s.t +
          "</span><small>" +
          (s.d > 1 ? fmtM(s.d * M) : "") +
          "</small></li>"
        );
      })
      .join("");
  }
  function etaText() {
    var m = remainM();
    return Math.max(1, Math.round(m / MODES[state.mode].s)) + " mnt";
  }
  function renderRoute() {
    var it = cur(),
      r = state.route,
      box = $("#route-panel");
    if (!it) {
      box.innerHTML =
        '<div class="card"><p>Pilih barang di halaman Perangkat untuk melihat arah.</p></div>';
      return;
    }
    var d = Math.hypot(it.x - state.you.x, it.y - state.you.y) * M,
      near = d <= 30;
    var h =
      '<div class="card stack"><div class="field"><label for="dest">Tujuan</label><select id="dest">' +
      state.items
        .map(function (i) {
          return (
            '<option value="' +
            i.id +
            '"' +
            (i.id === state.sel ? " selected" : "") +
            ">" +
            esc(i.name) +
            "</option>"
          );
        })
        .join("") +
      "</select></div>";
    h +=
      '<div class="rt-from"><span class="dotyou"></span>Posisi saya: ' +
      esc(placeOf(state.you)) +
      (state.gps.on ? ' <span class="chip on">GPS aktif</span>' : "") +
      '<button class="link" type="button" data-act="home">Pindah ke Rumah</button></div>';
    h +=
      '<div class="seg" role="group" aria-label="Moda perjalanan">' +
      Object.keys(MODES)
        .map(function (k) {
          return (
            '<button type="button" data-mode="' +
            k +
            '" aria-pressed="' +
            (state.mode === k) +
            '">' +
            MODES[k].n +
            "</button>"
          );
        })
        .join("") +
      "</div>";
    h +=
      '<div class="rt-sum"><div><b id="rt-dist">' +
      fmtM(remainM()) +
      '</b><small>jarak tersisa</small></div><div><b id="rt-eta">' +
      etaText() +
      "</b><small>" +
      MODES[state.mode].n.toLowerCase() +
      "</small></div></div>";
    h +=
      '<div class="prog" aria-hidden="true"><b id="rt-bar" style="width:' +
      (r && navActive() ? Math.min(100, (nav.prog / r.len) * 100) : 0) +
      '%"></b></div>';
    h += '<div class="actions">';
    if (nav.running)
      h +=
        '<button class="btn" type="button" data-act="nav-stop">Hentikan</button>';
    else if (nav.done)
      h +=
        '<button class="btn primary" type="button" data-act="nav-reset">Ulangi simulasi</button>';
    else
      h +=
        '<button class="btn primary" type="button" data-act="nav-start"' +
        (r && r.len > 1 && !near ? "" : " disabled") +
        ">" +
        ic("route", 18) +
        "Mulai navigasi</button>";
    h +=
      "</div><small>Navigasi di sini simulasi: titik biru bergerak mengikuti rute contoh pada peta ilustrasi.</small></div>";
    h +=
      '<div class="card stack" id="rt-near" ' +
      (near ? "" : "hidden") +
      '><h2>Tag terbaca dari dekat</h2><div id="rt-radar">' +
      (near ? radarHTML(it) : "") +
      "</div><small>Dalam jarak sekitar 30 m, HP bisa menangkap sinyal Bluetooth tag langsung dan membunyikannya.</small></div>";
    h +=
      '<div class="card stack"><h2>Petunjuk arah</h2><ol class="steps" id="rt-steps">' +
      stepsHTML() +
      "</ol></div>";
    h += gpsCardHTML();
    box.innerHTML = h;
    drawMap("mc-route");
  }
  function tickRoute() {
    var it = cur();
    if (!it) return;
    var d = Math.hypot(it.x - state.you.x, it.y - state.you.y) * M,
      near = d <= 30,
      box = $("#rt-near");
    var wasNear = box && !box.hidden;
    if (near !== wasNear) {
      renderRoute();
      return;
    }
    $("#rt-dist").textContent = fmtM(remainM());
    $("#rt-eta").textContent = etaText();
    $("#rt-bar").style.width =
      Math.min(100, (nav.prog / state.route.len) * 100) + "%";
    $("#rt-steps").innerHTML = stepsHTML();
    if (near) $("#rt-radar").innerHTML = radarHTML(it);
    drawMap("mc-route");
  }
  function startNav() {
    var r = state.route;
    if (!r || r.len < 2) return;
    stopNav(false);
    nav.origin = { x: state.you.x, y: state.you.y };
    nav.running = true;
    nav.done = false;
    nav.prog = 0;
    var total = r.len;
    if (reduced) {
      nav.prog = Math.max(0, total - 18);
      state.you = pointAt(r.pts, nav.prog);
      nav.running = false;
      nav.done = true;
      renderRoute();
      return;
    }
    var dur = Math.min(13000, Math.max(5500, total * 20)),
      t0 = performance.now();
    renderRoute();
    (function tick(now) {
      if (!nav.running) return;
      var k = Math.min(1, (now - t0) / dur);
      nav.prog = total * k;
      state.you = pointAt(r.pts, nav.prog);
      if (k < 1) {
        tickRoute();
        nav.raf = requestAnimationFrame(tick);
      } else {
        nav.running = false;
        nav.done = true;
        state.you = pointAt(r.pts, total);
        renderRoute();
        toast("Anda tiba di lokasi barang. Bunyikan tag untuk menemukannya.");
      }
    })(t0);
  }

  /* ---------- render: lokasi ---------- */
  function renderLocation() {
    var it = cur(),
      box = $("#loc-panel"),
      h = "";
    h += gpsCardHTML();
    h +=
      '<div class="card stack"><h2>Barang</h2><div class="chips" role="group" aria-label="Pilih barang">' +
      state.items
        .map(function (i) {
          return (
            '<button class="chipbtn" type="button" data-act="select" data-id="' +
            i.id +
            '" aria-pressed="' +
            (i.id === state.sel) +
            '">' +
            ic(TYPES[i.type].i, 18) +
            esc(i.name) +
            "</button>"
          );
        })
        .join("") +
      "</div>";
    if (it) {
      var z = zoneOf(it);
      h +=
        '<div class="sumline">' +
        statusChip(it) +
        '<span class="chip plain">' +
        esc(placeOf(it)) +
        '</span><span class="chip plain">' +
        (z ? "Di " + esc(z.name) : "Di luar Zona Aman") +
        "</span></div>";
    }
    h += "</div>";
    if (it) {
      h +=
        '<div class="card stack"><h2>Riwayat lokasi</h2><ol class="tl">' +
        (it.hist || [])
          .map(function (p, i) {
            return (
              '<li><button type="button" data-act="hist" data-i="' +
              i +
              '" aria-pressed="' +
              (state.hist === i) +
              '"><span class="tm">' +
              esc(p.t) +
              '</span><span class="dt"></span><span class="tx">' +
              esc(p.l) +
              "</span></button></li>"
            );
          })
          .join("") +
        "</ol><small>Ketuk satu titik untuk menandainya di peta.</small></div>";
    }
    h +=
      '<div class="card stack"><h2>Zona Aman</h2><div>' +
      PLACES.filter(function (p) {
        return p.zone;
      })
        .map(function (p) {
          return (
            '<div class="row-sw"><div><b>' +
            p.name +
            "</b><small>Radius sekitar " +
            Math.round(p.r * M) +
            ' m</small></div><button class="sw" type="button" role="switch" data-act="zone" data-id="' +
            p.id +
            '" aria-checked="' +
            !!state.zonesOn[p.id] +
            '" aria-label="Zona Aman ' +
            p.name +
            '"></button></div>'
          );
        })
        .join("") +
      '<div class="row-sw"><div><b>Pengingat barang tertinggal</b><small>Beri tahu saat barang berada di luar semua Zona Aman aktif</small></div><button class="sw" type="button" role="switch" data-act="alert" aria-checked="' +
      state.alertOn +
      '" aria-label="Pengingat barang tertinggal"></button></div></div></div>';
    box.innerHTML = h;
    drawMap("mc-location");
  }

  /* ---------- render: tambah ---------- */
  var ADDSTEPS = ["Pilih barang", "Pasangkan tag", "Tandai lokasi"];
  function renderAdd() {
    var a = state.add;
    $("#stepper").innerHTML = ADDSTEPS.map(function (s, i) {
      var n = i + 1;
      return (
        '<li class="' +
        (a.step > n ? "ok" : "") +
        '" ' +
        (a.step === n ? 'aria-current="step"' : "") +
        '><span class="n">' +
        (a.step > n ? ic("check", 16) : n) +
        "</span>" +
        s +
        "</li>"
      );
    }).join("");
    var h = "";
    if (a.step === 1) {
      h +=
        '<h2>Barang apa yang ingin di?</h2><div class="types" role="radiogroup" aria-label="Jenis barang">' +
        Object.keys(TYPES)
          .map(function (k) {
            return (
              '<button class="typ" type="button" role="radio" data-act="type" data-k="' +
              k +
              '" aria-checked="' +
              (a.type === k) +
              '">' +
              ic(TYPES[k].i, 26) +
              TYPES[k].n +
              "</button>"
            );
          })
          .join("") +
        "</div>";
      h +=
        '<div class="field"><label for="nameInput">Nama barang</label><input id="nameInput" type="text" maxlength="40" autocomplete="off" placeholder="' +
        esc(defName(a.type)) +
        '" value="' +
        esc(a.name) +
        '"></div>';
      h +=
        '<div class="field"><span class="lbl">HP yang dipakai untuk melacak</span><div class="seg" role="group" aria-label="Jenis HP"><button type="button" data-plat="ios" aria-pressed="' +
        (a.platform === "ios") +
        '">iPhone / iPad</button><button type="button" data-plat="android" aria-pressed="' +
        (a.platform === "android") +
        '">Android</button></div></div>';
      h +=
        '<div class="note info">' +
        ic("phone", 18) +
        "<span>Tag dual-network aktif di satu jaringan sekali waktu: Find My untuk iPhone atau Find Hub untuk Android. Untuk pindah jaringan, tag perlu direset.</span></div>";
      h +=
        '<div class="nav2"><span></span><button class="btn primary" type="button" data-act="next">Lanjut</button></div>';
    }
    if (a.step === 2) {
      var ios = a.platform === "ios",
        net = ios ? "Find My" : "Find Hub";
      h += "<h2>Pasangkan tag ke " + (ios ? "Find My" : "Find Hub") + "</h2>";
      h +=
        '<ol class="how">' +
        (ios
          ? "<li><span>Nyalakan tag: tarik pelindung baterai atau tekan lama sampai berbunyi.</span></li><li><span>Buka aplikasi <b>Lacak (Find My)</b>, pilih tab <b>Barang</b>, lalu <b>Tambah Barang Baru</b> dan <b>Tambah Barang Lainnya</b>. Butuh iOS 14.5 atau lebih baru.</span></li><li><span>Dekatkan tag ke iPhone, ikuti layar, lalu beri nama.</span></li>"
          : "<li><span>Aktifkan Bluetooth dan Lokasi di HP. Butuh Android 9 atau lebih baru.</span></li><li><span>Nyalakan tag di dekat HP, lalu ketuk notifikasi pairing yang muncul, atau buka <b>Find Hub</b> dan tambahkan perangkat.</span></li><li><span>Pilih nama barang dan selesaikan pairing.</span></li>") +
        "</ol>";
      var sc = a.scan;
      h += '<div class="scan' + (sc === "scanning" ? " go" : "") + '">';
      if (sc === "idle")
        h +=
          '<div class="radar-s">' +
          ic("tag", 40) +
          "</div><b>Simulasi pairing</b><small>Dekatkan tag, lalu cari. Di sini hanya contoh alur; pairing sungguhan dilakukan di aplikasi " +
          net +
          '.</small><button class="btn primary" type="button" data-act="scan">Cari tag di sekitar</button>';
      if (sc === "scanning")
        h +=
          '<div class="radar-s">' +
          ic("tag", 40) +
          "</div><b>Mencari tag...</b><small>Pastikan tag menyala dan dekat dengan HP.</small>";
      if (sc === "found")
        h +=
          '<div class="radar-s">' +
          ic("tag", 40) +
          "</div><b>Tag dual " +
          esc(a.tag) +
          ' ditemukan</b><small>Sinyal kuat · baterai 100%</small><button class="btn primary" type="button" data-act="pair">Hubungkan ke ' +
          net +
          "</button>";
      if (sc === "paired")
        h +=
          '<span class="okc">' +
          ic("check", 30) +
          "</span><b>Terhubung ke " +
          net +
          "</b><small>" +
          esc(a.name || defName(a.type)) +
          " siap diberi lokasi.</small>";
      h += "</div>";
      h +=
        '<div class="nav2"><button class="btn" type="button" data-act="back">Kembali</button><button class="btn primary" type="button" data-act="next"' +
        (sc === "paired" ? "" : " disabled") +
        ">Lanjut</button></div>";
    }
    if (a.step === 3) {
      h +=
        "<h2>Di mana barang berada sekarang?</h2><p>Ketuk peta di bawah untuk menandai posisi awal. Setelah itu posisi diperbarui oleh jaringan " +
        (a.platform === "ios" ? "Find My" : "Find Hub") +
        ".</p>";
      h +=
        '<button class="btn sm" type="button" data-act="use-gps">' +
        ic("target", 18) +
        "Pakai lokasi GPS saya sekarang</button>";
    }
    $("#add-panel").innerHTML = h;
    $("#addmap").hidden = a.step !== 3;
    $("#add-after").hidden = a.step !== 3;
    if (a.step === 3) {
      if (!a.pos) a.pos = { x: state.you.x, y: state.you.y };
      renderAddAfter();
      fit("mc-pick");
      drawMap("mc-pick");
    }
  }
  function renderAddAfter() {
    var a = state.add,
      p = a.pos || state.you;
    $("#add-after").innerHTML =
      '<div class="sumline"><span class="chip plain">' +
      esc(placeOf(p)) +
      '</span><span class="chip plain">' +
      esc(a.name || defName(a.type)) +
      '</span></div><div class="nav2"><button class="btn" type="button" data-act="back">Kembali</button><button class="btn primary" type="button" data-act="save-item">' +
      ic("check", 18) +
      "Simpan barang</button></div>";
  }
  function defName(t) {
    return {
      tumbler: "Tumbler baru",
      key: "Kunci baru",
      bag: "Tas baru",
      wallet: "Dompet baru",
      other: "Barang baru",
    }[t];
  }
  var scanT;
  function resetAdd() {
    clearTimeout(scanT);
    state.add = {
      step: 1,
      type: "tumbler",
      name: "",
      platform: state.add.platform,
      scan: "idle",
      tag: "",
      pos: null,
    };
  }

  /* ---------- render: panduan ---------- */
  var HS = {
    A: {
      t: "A · Tutup perak",
      s: 1,
      bad: true,
      lab: "Sinyal terhambat",
      p: "Logam perak meredam Bluetooth. Jangan menaruh tag di dalam atau di bawah tutup logam. Cincin cyan di atas bisa dipakai sebagai lampu status, misalnya menyala saat tag berbunyi (ide untuk versi berikutnya).",
    },
    B: {
      t: "B · Grip hitam bertekstur",
      s: 4,
      bad: false,
      lab: "Sinyal baik, cocok untuk prototipe 1",
      p: "Buat kantong tag di luar badan logam, di bawah sleeve silikon. Tag tidak tertutup logam, mudah diganti, dan tumbler tidak perlu dibongkar. Jauhkan dari dinding dalam yang panas saat minuman hangat.",
    },
    C: {
      t: "C · Dasar hitam",
      s: 4,
      bad: false,
      lab: "Sinyal baik jika dasarnya plastik atau silikon",
      p: "Buat kompartemen tag di dasar dengan penutup plastik atau silikon. Tersembunyi dan terlindung dari benturan. Jika dasar tumbler logam, sediakan jendela plastik di sisi bawah. Cocok untuk prototipe 2.",
    },
  };
  var CHECK = [
    [
      "Siapkan tag dual-network",
      "Pilih tag yang tertulis Find My dan Find Hub, rating IP6/7 atau lebih. Beli 2 atau 3 buah dari merek berbeda untuk dibandingkan.",
    ],
    [
      "Pasangkan dan tes sebelum dipasang",
      "Hubungkan tag ke HP, beri nama, lalu coba Bunyikan. Kalau gagal di luar botol, tidak akan berhasil di dalam botol.",
    ],
    [
      "Ukur tag dan tumbler",
      "Tag bulat berbaterai koin biasanya sekitar 32 × 32 × 8 mm, tetapi ukur tag yang Anda beli dengan jangka sorong.",
    ],
    [
      "Pilih posisi: B untuk prototipe 1, C untuk prototipe 2",
      "Hindari bagian logam. Kantong silikon di grip adalah cara tercepat tanpa membongkar tumbler.",
    ],
    [
      "Pasang dengan aman",
      "Tempelkan kantong atau kompartemen dengan silikon food-grade. Pastikan tag tidak menyentuh area minuman dan tutup baterai tetap bisa dibuka.",
    ],
    [
      "Lindungi dari air dan panas",
      "Baterai koin umumnya tidak cocok untuk suhu tinggi. Letakkan tag di luar dinding yang menahan minuman panas, lalu cek suhu permukaannya.",
    ],
    [
      "Uji sinyal",
      "Taruh tumbler di dalam tas, lalu jauhkan 10 sampai 20 m. Cek apakah tag masih terbaca dan bunyinya terdengar.",
    ],
    [
      "Uji lapangan 1 sampai 2 minggu",
      "Bawa ke kampus, kantor, dan transportasi. Catat seberapa sering lokasinya diperbarui, lalu minta masukan 10 sampai 20 calon pengguna.",
    ],
  ];
  function renderGuide() {
    var s = HS[state.hs];
    $$("#dia .hs").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-hs") === state.hs);
    });
    var m = "";
    for (var i = 0; i < 5; i++)
      m += '<i class="' + (i < s.s ? "f" : "") + '"></i>';
    $("#hs-panel").innerHTML =
      "<h2>" +
      s.t +
      '</h2><div class="meter' +
      (s.bad ? " bad" : "") +
      '" role="img" aria-label="Perkiraan kualitas sinyal ' +
      s.s +
      ' dari 5">' +
      m +
      "</div><b>" +
      s.lab +
      "</b><p>" +
      s.p +
      "</p><small>Penilaian ini perkiraan. Selalu uji dengan tag dan tumbler Anda.</small>";
    var done = CHECK.filter(function (c, i) {
      return state.check[i];
    }).length;
    $("#chk-sum").textContent =
      done + " dari " + CHECK.length + " langkah selesai";
    $("#chk-bar").style.width = (done / CHECK.length) * 100 + "%";
    $("#chk-list").innerHTML = CHECK.map(function (c, i) {
      return (
        '<div class="chk' +
        (state.check[i] ? " done" : "") +
        '"><span class="num">' +
        (i + 1) +
        '</span><label for="c' +
        i +
        '"><b>' +
        c[0] +
        "</b><p>" +
        c[1] +
        '</p></label><input type="checkbox" id="c' +
        i +
        '" data-chk="' +
        i +
        '"' +
        (state.check[i] ? " checked" : "") +
        "></div>"
      );
    }).join("");
  }

  /* ---------- router ---------- */
  var VIEWS = [
    ["perangkat", "Perangkat", "tag"],
    ["arah", "Arah", "route"],
    ["lokasi", "Lokasi", "map"],
    ["tambah", "Tambah", "plus"],
    ["panduan", "Panduan", "guide"],
  ];
  function buildNav() {
    var h = VIEWS.map(function (v) {
      return (
        '<button type="button" data-go="' +
        v[0] +
        '">' +
        ic(v[2], 22) +
        "<span>" +
        v[1] +
        (v[0] === "panduan"
          ? " penempatan"
          : v[0] === "tambah"
            ? " barang"
            : v[0] === "arah"
              ? " &amp; petunjuk"
              : "") +
        "</span></button>"
      );
    }).join("");
    $("#nav-side").innerHTML = h;
    $("#nav-tab").innerHTML = VIEWS.map(function (v) {
      return (
        '<button type="button" data-go="' +
        v[0] +
        '">' +
        ic(v[2], 22) +
        "<span>" +
        v[1] +
        "</span></button>"
      );
    }).join("");
  }
  function showView(v, fromHash) {
    if (
      !VIEWS.some(function (x) {
        return x[0] === v;
      })
    )
      v = "perangkat";
    if (state.view === "arah" && v !== "arah" && navActive()) stopNav(true);
    if (state.view === "tambah" && v !== "tambah") {
      clearTimeout(scanT);
      if (state.add.scan === "scanning") state.add.scan = "idle";
    }
    state.view = v;
    VIEWS.forEach(function (x) {
      $("#v-" + x[0]).hidden = x[0] !== v;
    });
    $$("[data-go]").forEach(function (b) {
      if (b.id === "add-shortcut") return;
      if (b.getAttribute("data-go") === v)
        b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });
    if (!fromHash) {
      try {
        history.replaceState(null, "", "#" + v);
      } catch (e) {
        location.hash = v;
      }
    }
    recompute();
    render();
    var mp = {
      perangkat: "mc-devices",
      arah: "mc-route",
      lokasi: "mc-location",
    }[v];
    if (mp) fit(mp);
    window.scrollTo(0, 0);
  }
  function render() {
    var v = state.view;
    if (v === "perangkat") renderDevices();
    if (v === "arah") renderRoute();
    if (v === "lokasi") renderLocation();
    if (v === "tambah") renderAdd();
    if (v === "panduan") renderGuide();
  }

  /* ---------- tema ---------- */
  function effTheme() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  function paintThemeBtns() {
    var dark = effTheme() === "dark";
    $("#theme-side").innerHTML =
      ic(dark ? "sun" : "moon", 18) + (dark ? "Tema terang" : "Tema gelap");
    $("#theme-top").innerHTML = ic(dark ? "sun" : "moon", 20);
  }
  function toggleTheme() {
    var n = effTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", n);
    state.theme = n;
    save();
    paintThemeBtns();
  }

  /* ---------- event ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target;
    var go = t.closest("[data-go]");
    if (go) {
      showView(go.getAttribute("data-go"));
      return;
    }
    var md = t.closest("[data-mode]");
    if (md) {
      state.mode = md.getAttribute("data-mode");
      save();
      renderRoute();
      return;
    }
    var pl = t.closest("[data-plat]");
    if (pl) {
      state.add.platform = pl.getAttribute("data-plat");
      state.add.scan = "idle";
      save();
      renderAdd();
      return;
    }
    var hs = t.closest("[data-hs]");
    if (hs) {
      state.hs = hs.getAttribute("data-hs");
      renderGuide();
      return;
    }
    var act = t.closest("[data-act]");
    if (!act) return;
    var a = act.getAttribute("data-act"),
      it = cur();
    if (a === "select") {
      selectItem(act.getAttribute("data-id"));
      return;
    }
    if (a === "ring" && it) {
      ring(it);
      return;
    }
    if (a === "go" && it) {
      showView("arah");
      return;
    }
    if (a === "lost" && it) {
      it.lost = !it.lost;
      save();
      toast(
        it.lost
          ? "Mode Hilang aktif untuk " + it.name + "."
          : "Mode Hilang dimatikan.",
      );
      render();
      return;
    }
    if (a === "del") {
      state.confirmDel = state.sel;
      renderDevices();
      return;
    }
    if (a === "del-no") {
      state.confirmDel = null;
      renderDevices();
      return;
    }
    if (a === "del-yes") {
      var nm = it.name;
      state.items = state.items.filter(function (i) {
        return i.id !== state.sel;
      });
      state.sel = state.items[0] ? state.items[0].id : null;
      state.confirmDel = null;
      recompute();
      save();
      render();
      fitCurrent();
      toast(nm + " dihapus dari daftar.");
      return;
    }
    if (a === "gps-toggle") {
      if (state.gps.on) gpsStop();
      else gpsStart();
      return;
    }
    if (a === "use-gps") {
      if (state.gps.on && state.gps.lat != null) {
        state.add.pos = { x: state.you.x, y: state.you.y };
        renderAddAfter();
        drawMap("mc-pick");
        fit("mc-pick");
        toast("Posisi barang memakai lokasi GPS Anda sekarang.");
      } else {
        toast(
          'Aktifkan dulu "Lacak dari HP ini" di halaman Lokasi, lalu kembali ke sini.',
        );
      }
      return;
    }
    if (a === "home") {
      stopNav(false);
      state.you = { x: 150, y: 446 };
      recompute();
      save();
      renderRoute();
      fit("mc-route");
      return;
    }
    if (a === "nav-start") {
      startNav();
      return;
    }
    if (a === "nav-stop") {
      stopNav(false);
      renderRoute();
      return;
    }
    if (a === "nav-reset") {
      stopNav(true);
      recompute();
      renderRoute();
      fit("mc-route");
      return;
    }
    if (a === "hist") {
      var i = +act.getAttribute("data-i");
      state.hist = state.hist === i ? -1 : i;
      renderLocation();
      if (state.hist >= 0 && it) {
        var p = it.hist[state.hist];
        tweenView("mc-location", { cx: p.x, cy: p.y - 10, z: 1.5 });
      }
      return;
    }
    if (a === "zone") {
      var id = act.getAttribute("data-id");
      state.zonesOn[id] = !state.zonesOn[id];
      save();
      renderLocation();
      return;
    }
    if (a === "alert") {
      state.alertOn = !state.alertOn;
      save();
      renderLocation();
      return;
    }
    if (a === "type") {
      state.add.type = act.getAttribute("data-k");
      renderAdd();
      return;
    }
    if (a === "next") {
      state.add.step = Math.min(3, state.add.step + 1);
      renderAdd();
      return;
    }
    if (a === "back") {
      state.add.step = Math.max(1, state.add.step - 1);
      renderAdd();
      return;
    }
    if (a === "scan") {
      state.add.scan = "scanning";
      renderAdd();
      clearTimeout(scanT);
      scanT = setTimeout(function () {
        state.add.tag =
          "SW-" +
          Math.floor(4096 + Math.random() * 61000)
            .toString(16)
            .toUpperCase();
        state.add.scan = "found";
        if (state.view === "tambah" && state.add.step === 2) renderAdd();
      }, 2200);
      return;
    }
    if (a === "pair") {
      state.add.scan = "paired";
      renderAdd();
      return;
    }
    if (a === "save-item") {
      var ad = state.add,
        p2 = ad.pos || state.you,
        nid = "i" + Date.now().toString(36);
      var item = {
        id: nid,
        name: (ad.name || defName(ad.type)).trim(),
        type: ad.type,
        x: p2.x,
        y: p2.y,
        battery: 100,
        seen: "Baru saja",
        online: true,
        net: ad.platform === "ios" ? "Find My" : "Find Hub",
        acc: 20,
        lost: false,
        hist: [{ t: "Sekarang", x: p2.x, y: p2.y, l: placeOf(p2) }],
      };
      state.items.push(item);
      state.sel = nid;
      resetAdd();
      save();
      showView("perangkat");
      toast(item.name + " ditambahkan ke daftar perangkat.");
      return;
    }
    if (a === "reset") {
      stopNav(false);
      gpsStop();
      clearTimeout(scanT);
      try {
        localStorage.removeItem(KEY);
      } catch (x) {}
      state.items = seedItems();
      state.sel = "tumbler";
      state.you = { x: 150, y: 446 };
      state.zonesOn = { rumah: true, kantor: true };
      state.alertOn = true;
      state.check = {};
      state.hist = -1;
      state.confirmDel = null;
      resetAdd();
      recompute();
      render();
      fitCurrent();
      toast("Data contoh dikembalikan.");
      return;
    }
  });
  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.id === "dest") {
      selectItem(t.value);
      return;
    }
    if (t.hasAttribute && t.hasAttribute("data-chk")) {
      state.check[t.getAttribute("data-chk")] = t.checked;
      save();
      renderGuide();
    }
  });
  document.addEventListener("input", function (e) {
    if (e.target.id === "nameInput") {
      state.add.name = e.target.value;
      if ($("#mc-pick")) drawMap("mc-pick");
    }
  });
  $("#theme-side").addEventListener("click", toggleTheme);
  $("#theme-top").addEventListener("click", toggleTheme);
  window.addEventListener("hashchange", function () {
    var h = location.hash.replace("#", "");
    if (h && h !== state.view) showView(h, true);
  });

  /* ---------- mulai ---------- */
  if (state.theme)
    document.documentElement.setAttribute("data-theme", state.theme);
  buildNav();
  paintThemeBtns();
  initMap("mc-devices", "devices");
  initMap("mc-route", "route");
  initMap("mc-location", "location");
  initMap("mc-pick", "pick");
  if (window.matchMedia)
    try {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", paintThemeBtns);
    } catch (e) {}
  showView((location.hash || "").replace("#", "") || "perangkat", true);
})();
