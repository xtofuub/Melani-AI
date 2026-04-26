// WebGL backdrop — lightweight, 30fps cap, 0.5× DPR resolution

function WebGLBackdrop() {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(0);
  const lastFrame = React.useRef(0);
  const mouseRef = React.useRef({
    x: 0.5,
    y: 0.5,
    tx: 0.5,
    ty: 0.5,
    active: 0,
    ta: 0
  });
  const startTime = React.useRef(performance.now());
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', {
      antialias: false,
      premultipliedAlpha: false
    });
    if (!gl) return;
    gl.getExtension('OES_standard_derivatives');
    const vs = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() { v_uv = a_pos * 0.5 + 0.5; gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;

    // Smooth warm gradient mesh — domain-warped FBM, no hard edges
    const fs = `
      #extension GL_OES_standard_derivatives : enable
      precision highp float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2  u_mouse;
      uniform float u_active;
      uniform vec2  u_res;

      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
                   mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
      }
      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 4; i++) { v += a*noise(p); p *= 2.03; a *= 0.5; }
        return v;
      }

      // Anti-aliased contour using fwidth — stays crisp at any resolution
      float aaContour(float n, float level) {
        float d = abs(n - level);
        float w = fwidth(n) * 1.2;
        return 1.0 - smoothstep(0.0, w, d);
      }

      void main() {
        float aspect = u_res.x / u_res.y;
        vec2 p = (v_uv - 0.5) * vec2(aspect, 1.0);
        vec2 m = (u_mouse - 0.5) * vec2(aspect, 1.0);
        float t = u_time * 0.05;

        // Domain-warped FBM — organic, flowing, never the same twice
        vec2 q = vec2(fbm(p * 1.1 + vec2(t, 0.0)),
                      fbm(p * 1.1 + vec2(5.2, -t)));
        float n = fbm(p * 1.3 + q * 0.9 + vec2(t * 0.3, t * 0.2));

        // Cursor influence — warps field toward cursor
        float md = length(p - m);
        float pull = smoothstep(0.6, 0.0, md) * u_active * 0.15;
        n += pull;

        // 5 anti-aliased contour lines
        float lines = 0.0;
        lines += aaContour(n, 0.28);
        lines += aaContour(n, 0.40);
        lines += aaContour(n, 0.52);
        lines += aaContour(n, 0.64);
        lines += aaContour(n, 0.76);

        // Palette
        vec3 paper = vec3(0.976, 0.961, 0.929);
        vec3 edge  = vec3(0.878, 0.831, 0.725);
        vec3 amber = vec3(0.796, 0.467, 0.188);

        // Soft base wash tinted by field — smooth gradient, no banding
        vec3 col = mix(paper, paper * 0.97, n * 0.5);

        // Cursor halo — warm wash
        float halo = smoothstep(0.55, 0.0, md) * u_active;
        col = mix(col, amber, halo * 0.08);

        // Contour lines — faint, warmer near cursor
        float boost = smoothstep(0.5, 0.0, md) * u_active;
        vec3 lineColor = mix(edge, amber, 0.1 + boost * 0.5);
        col = mix(col, lineColor, clamp(lines, 0.0, 1.0) * (0.32 + boost * 0.25));

        // Very soft vignette
        col *= 1.0 - smoothstep(0.7, 1.3, length(p)) * 0.07;

        gl_FragColor = vec4(col, 1.0);
      }
    `;
    const mkShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uActive = gl.getUniformLocation(prog, 'u_active');
    const uRes = gl.getUniformLocation(prog, 'u_res');

    // Low-res canvas: 0.5× DPR so GPU barely notices it
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(2, Math.floor(rect.width * dpr));
      canvas.height = Math.max(2, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    const container = canvas.parentElement;
    const onMove = e => {
      const r = container.getBoundingClientRect();
      const m = mouseRef.current;
      m.tx = (e.clientX - r.left) / r.width;
      m.ty = 1 - (e.clientY - r.top) / r.height;
      m.ta = 1;
    };
    const onLeave = () => {
      mouseRef.current.ta = 0;
    };
    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerleave', onLeave);
    const render = ts => {
      rafRef.current = requestAnimationFrame(render);
      // Run full 60fps — smoothness > throttling for this shader
      lastFrame.current = ts;
      const t = (performance.now() - startTime.current) / 1000;
      const m = mouseRef.current;
      const k = 0.1;
      m.x += (m.tx - m.x) * k;
      m.y += (m.ty - m.y) * k;
      m.active += (m.ta - m.active) * 0.07;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, m.x, m.y);
      gl.uniform1f(uActive, m.active);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    rafRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerleave', onLeave);
    };
  }, []);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      imageRendering: 'auto' // GPU upscales the low-res canvas smoothly
    }
  });
}

// ──────────────────────────────────────────────────────────
// Reveal — intersection-observed fade + rise
// ──────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  y = 32,
  duration = 700,
  className,
  style,
  as: Tag = 'div'
}) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) {
        setShown(true);
        io.disconnect();
      }
    }), {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    className: className,
    style: {
      ...style,
      opacity: shown ? 1 : 0,
      transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity ${duration}ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      willChange: 'opacity, transform'
    }
  }, children);
}
function RevealStagger({
  children,
  base = 0,
  step = 80,
  y = 24
}) {
  return React.Children.map(children, (child, i) => /*#__PURE__*/React.createElement(Reveal, {
    delay: base + i * step,
    y: y,
    key: i
  }, child));
}

// ──────────────────────────────────────────────────────────
// ScrollProgress — thin amber bar pinned to top of viewport
// ──────────────────────────────────────────────────────────
function ScrollProgress({
  color = '#0062D1'
}) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, d.scrollTop / max)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      zIndex: 100,
      pointerEvents: 'none',
      background: 'transparent'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${p * 100}%`,
      background: `linear-gradient(90deg, transparent, ${color} 35%, ${color})`,
      transition: 'width 80ms linear',
      boxShadow: `0 0 8px ${color}55`
    }
  }));
}

// ──────────────────────────────────────────────────────────
// CountUp — animates a numeric target when the element enters view
// Accepts a `format(n)` fn so we can render 2.1M, 14×, etc.
// ──────────────────────────────────────────────────────────
function CountUp({
  to,
  duration = 1600,
  format = n => String(Math.round(n)),
  style,
  children
}) {
  const ref = React.useRef(null);
  const [val, setVal] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current || started) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(to);
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setStarted(true);
          io.disconnect();
          const t0 = performance.now();
          const tick = t => {
            const k = Math.min(1, (t - t0) / duration);
            const e = 1 - Math.pow(1 - k, 3); // easeOutCubic
            setVal(to * e);
            if (k < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, {
      threshold: 0.4
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration, started]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: style
  }, children ? children(val, format(val)) : format(val));
}

// ──────────────────────────────────────────────────────────
// WordScrub — reveals children words one by one as element enters view
// ──────────────────────────────────────────────────────────
function WordScrub({
  text,
  as: Tag = 'span',
  step = 55,
  base = 0,
  style
}) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      });
    }, {
      threshold: 0.25
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const words = typeof text === 'string' ? text.split(' ') : [];
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    style: style
  }, words.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-block',
      opacity: shown ? 1 : 0,
      filter: shown ? 'blur(0)' : 'blur(6px)',
      transform: shown ? 'translateY(0)' : 'translateY(14px)',
      transition: `opacity 650ms cubic-bezier(.2,.7,.2,1) ${base + i * step}ms,
                       transform 650ms cubic-bezier(.2,.7,.2,1) ${base + i * step}ms,
                       filter 650ms cubic-bezier(.2,.7,.2,1) ${base + i * step}ms`,
      willChange: 'opacity, transform, filter'
    }
  }, w, i < words.length - 1 ? '\u00A0' : '')));
}

// ──────────────────────────────────────────────────────────
// AmbientGlyphs — fixed-position floating hex bytes, pointer-parallax
// Very subtle — adds depth without noise
// ──────────────────────────────────────────────────────────
function AmbientGlyphs({
  count = 28,
  color = '#b8a77e'
}) {
  const wrapRef = React.useRef(null);
  const mouseRef = React.useRef({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0
  });
  const glyphs = React.useMemo(() => {
    const hex = '0123456789abcdef';
    const rnd = n => Math.floor(Math.random() * n);
    return Array.from({
      length: count
    }, (_, i) => ({
      id: i,
      ch: Array.from({
        length: 2 + rnd(3)
      }, () => hex[rnd(16)]).join(''),
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: 0.3 + Math.random() * 0.8,
      // depth factor
      size: 10 + Math.random() * 7,
      drift: (Math.random() - 0.5) * 20,
      dur: 14 + Math.random() * 18,
      delay: -Math.random() * 20
    }));
  }, [count]);
  React.useEffect(() => {
    const onMove = e => {
      const m = mouseRef.current;
      m.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      m.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, {
      passive: true
    });
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.06;
      m.y += (m.ty - m.y) * 0.06;
      if (wrapRef.current) {
        wrapRef.current.style.setProperty('--mx', m.x.toFixed(3));
        wrapRef.current.style.setProperty('--my', m.y.toFixed(3));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        @keyframes ambientDrift {
          0%   { transform: translate3d(calc(var(--mx, 0) * var(--pz) * -12px), calc(var(--my, 0) * var(--pz) * -12px), 0); opacity: 0; }
          15%  { opacity: var(--popacity, 0.22); }
          50%  { transform: translate3d(calc(var(--mx, 0) * var(--pz) * -12px + var(--drift, 0px)), calc(var(--my, 0) * var(--pz) * -12px - 18px), 0); }
          85%  { opacity: var(--popacity, 0.22); }
          100% { transform: translate3d(calc(var(--mx, 0) * var(--pz) * -12px), calc(var(--my, 0) * var(--pz) * -12px - 36px), 0); opacity: 0; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    "aria-hidden": true,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    }
  }, glyphs.map(g => /*#__PURE__*/React.createElement("span", {
    key: g.id,
    style: {
      position: 'absolute',
      left: `${g.x}%`,
      top: `${g.y}%`,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: g.size,
      color,
      letterSpacing: '0.08em',
      opacity: 0,
      willChange: 'transform, opacity',
      '--pz': g.z,
      '--drift': `${g.drift}px`,
      '--popacity': (0.14 + g.z * 0.14).toFixed(3),
      animation: `ambientDrift ${g.dur}s linear ${g.delay}s infinite`
    }
  }, g.ch))));
}

// ──────────────────────────────────────────────────────────
// MagneticWrap — child element drifts subtly toward cursor
// ──────────────────────────────────────────────────────────
function MagneticWrap({
  children,
  strength = 0.35,
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = e => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onLeave = () => {
      el.style.transform = 'translate(0,0)';
    };
    const parent = el.parentElement;
    if (!parent) return;
    parent.addEventListener('pointermove', onMove);
    parent.addEventListener('pointerleave', onLeave);
    return () => {
      parent.removeEventListener('pointermove', onMove);
      parent.removeEventListener('pointerleave', onLeave);
    };
  }, [strength]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-block',
      transition: 'transform 220ms cubic-bezier(.2,.7,.2,1)',
      willChange: 'transform',
      ...style
    }
  }, children);
}

// ──────────────────────────────────────────────────────────
// SectionBeacon — fixed right-side dots; highlights as sections cross viewport
// ──────────────────────────────────────────────────────────
function SectionBeacon({
  ids,
  labels,
  accent = '#0062D1',
  ink = '#000000'
}) {
  const [active, setActive] = React.useState(0);
  const [visible, setVisible] = React.useState(() => typeof window === 'undefined' ? true : window.innerWidth >= 1180);
  React.useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.45;
      let best = 0,
        bestDist = Infinity;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top - mid);
        if (r.top <= mid + 200 && d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);
  React.useEffect(() => {
    const onResize = () => setVisible(window.innerWidth >= 1180);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  if (!visible) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 22,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 40,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      pointerEvents: 'auto'
    }
  }, ids.map((id, i) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: `#${id}`,
    onClick: e => {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    },
    title: labels?.[i] || '',
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: active === i ? accent : 'transparent',
      border: `1.5px solid ${active === i ? accent : ink + '55'}`,
      transition: 'all .25s ease',
      transform: active === i ? 'scale(1.25)' : 'scale(1)',
      display: 'block'
    }
  })));
}
Object.assign(window, {
  WebGLBackdrop,
  Reveal,
  RevealStagger,
  ScrollProgress,
  CountUp,
  WordScrub,
  AmbientGlyphs,
  MagneticWrap,
  SectionBeacon
});