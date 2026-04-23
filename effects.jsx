// WebGL hover effect — subtle noise + warm color field that reacts to cursor
// Designed to fit the warm editorial aesthetic: warm cream/orange palette,
// organic movement, very low intensity. Positioned behind hero content.

function WebGLBackdrop({ dark = false }) {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(0);
  const mouseRef = React.useRef({ x: 0.5, y: 0.5, target: { x: 0.5, y: 0.5 }, active: 0, activeTarget: 0 });
  const startTime = React.useRef(performance.now());

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: true, premultipliedAlpha: false, alpha: true });
    if (!gl) return;

    const vs = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2  u_res;
      uniform vec2  u_mouse;
      uniform float u_active;
      uniform float u_dark;

      vec2 hash2(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }
      float vnoise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
              dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
          mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
              dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
          u.y
        );
      }
      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
        for (int i = 0; i < 5; i++) { v += a * vnoise(p); p = rot * p * 2.03; a *= 0.5; }
        return v;
      }
      // Curl of the FBM field — gives divergence-free vector field (streamlines)
      vec2 curl(vec2 p) {
        float e = 0.012;
        float n1 = fbm(p + vec2(0.0, e));
        float n2 = fbm(p - vec2(0.0, e));
        float n3 = fbm(p + vec2(e, 0.0));
        float n4 = fbm(p - vec2(e, 0.0));
        return vec2(n1 - n2, -(n3 - n4)) / (2.0 * e);
      }

      // Hex-cell distance — used to carve a faint hex glyph pattern out of the paper
      float hexGrid(vec2 p) {
        p.x *= 0.8660254;
        vec2 q = vec2(p.x, p.y + mod(floor(p.x), 2.0) * 0.5);
        q = fract(q) - 0.5;
        return 1.0 - max(abs(q.x) * 1.732, abs(q.y) * 2.0);
      }

      void main() {
        vec2 uv = v_uv;
        vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
        vec2 p = (uv - 0.5) * aspect;
        vec2 m = (u_mouse - 0.5) * aspect;

        float t = u_time * 0.12;

        // Palette
        vec3 paper  = vec3(0.976, 0.961, 0.929);
        vec3 cream  = vec3(0.956, 0.933, 0.882);
        vec3 dusk   = vec3(0.894, 0.827, 0.725);
        vec3 amber  = vec3(0.878, 0.584, 0.278);
        vec3 ember  = vec3(0.604, 0.205, 0.071);
        vec3 ink    = vec3(0.168, 0.137, 0.102);
        if (u_dark > 0.5) {
          paper = vec3(0.055, 0.047, 0.039);
          cream = vec3(0.086, 0.071, 0.055);
          dusk  = vec3(0.157, 0.118, 0.086);
          amber = vec3(0.471, 0.259, 0.110);
          ember = vec3(0.855, 0.345, 0.118);
          ink   = vec3(0.012, 0.008, 0.004);
        }

        // --- Base: soft vertical paper gradient ----------------------------
        float vg = smoothstep(-0.8, 0.8, p.y + fbm(p * 0.6 + t * 0.3) * 0.15);
        vec3 col = mix(paper, cream, 0.55 + vg * 0.45);

        // --- Streamline light filaments --------------------------------------
        // For each pixel, step backwards along the curl field, accumulating
        // brightness anywhere the trajectory passes near a "light source"
        // (the cursor, plus a couple of slow-drifting ambient sources).
        vec2 src1 = vec2(sin(t * 0.7) * 0.9, cos(t * 0.55) * 0.55);
        vec2 src2 = vec2(cos(t * 0.4 + 2.1) * 0.85, sin(t * 0.6 + 1.2) * 0.5);
        vec2 pos = p;
        float glow = 0.0;
        float filament = 0.0;
        const int STEPS = 22;
        for (int i = 0; i < STEPS; i++) {
          float fi = float(i);
          vec2 v = curl(pos * 1.4 + vec2(t * 0.4, -t * 0.2));
          v = v / (length(v) + 0.001);
          pos -= v * 0.03;

          float fade = 1.0 - fi / float(STEPS);

          // Cursor source (bright, tight)
          float dc = length(pos - m);
          glow += smoothstep(0.45, 0.0, dc) * 0.065 * u_active * fade;

          // Ambient drifting sources
          float d1 = length(pos - src1);
          float d2 = length(pos - src2);
          glow += smoothstep(0.6, 0.0, d1) * 0.022 * fade;
          glow += smoothstep(0.6, 0.0, d2) * 0.018 * fade;

          // Filament high-frequency detail — bright tendrils
          float f = fbm(pos * 3.5 + vec2(0.0, t));
          filament += smoothstep(0.55, 0.72, f) * 0.06 * fade;
        }

        // --- Hex bytes backdrop (very faint, aligned to flow) ---------------
        vec2 hexP = (p + vec2(t * 0.15, 0.0)) * 18.0;
        float hx = hexGrid(hexP);
        float hexMask = smoothstep(0.88, 0.96, hx) * 0.04;
        // Only show hex subtly in darker / lit zones, fades to nothing in the middle
        hexMask *= smoothstep(0.5, 1.3, length(p)) * 0.9 + 0.2;

        // --- Cursor halo (direct, layered) -----------------------------------
        float md = length(p - m);
        float halo = smoothstep(0.8, 0.0, md) * u_active;
        float core = smoothstep(0.18, 0.0, md) * u_active;

        // --- Composite -------------------------------------------------------
        col = mix(col, dusk, smoothstep(0.2, 0.9, filament) * 0.5);
        col = mix(col, amber, glow * 1.1);
        col += ember * filament * 0.35;
        col += ember * core * 0.4;
        col = mix(col, amber, halo * 0.08);
        col -= hexMask * (u_dark > 0.5 ? vec3(-0.05, -0.03, -0.02) : vec3(0.03, 0.03, 0.025));

        // Vignette
        float vig = smoothstep(1.7, 0.15, length(p));
        col = mix(mix(paper, ink, 0.06), col, vig);

        // Grain
        float grain = fract(sin(dot(uv * u_res, vec2(12.9898, 78.233))) * 43758.5453);
        col += (grain - 0.5) * 0.010;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
      }
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uActive = gl.getUniformLocation(prog, 'u_active');
    const uDark = gl.getUniformLocation(prog, 'u_dark');

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
    const onMove = (e) => {
      const r = container.getBoundingClientRect();
      mouseRef.current.target.x = (e.clientX - r.left) / r.width;
      mouseRef.current.target.y = 1 - (e.clientY - r.top) / r.height;
      mouseRef.current.activeTarget = 1;
    };
    const onLeave = () => { mouseRef.current.activeTarget = 0; };
    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerleave', onLeave);

    const render = () => {
      const t = (performance.now() - startTime.current) / 1000;
      const m = mouseRef.current;
      m.x += (m.target.x - m.x) * 0.08;
      m.y += (m.target.y - m.y) * 0.08;
      m.active += (m.activeTarget - m.active) * 0.06;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, m.x, m.y);
      gl.uniform1f(uActive, m.active);
      gl.uniform1f(uDark, window.__BINDER_TWEAKS__ && window.__BINDER_TWEAKS__.dark ? 1 : 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.75,
      }}
    />
  );
}

// ──────────────────────────────────────────────────────────
// Reveal — wraps children in an intersection-observed fade/rise
// ──────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 32, duration = 700, className, style, as: Tag = 'div' }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    // Honor prefers-reduced-motion
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setShown(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }),
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity ${duration}ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}

// Stagger helper — returns Reveal with auto-incrementing delay per child
function RevealStagger({ children, base = 0, step = 80, y = 24 }) {
  return React.Children.map(children, (child, i) => (
    <Reveal delay={base + i * step} y={y} key={i}>{child}</Reveal>
  ));
}

Object.assign(window, { WebGLBackdrop, Reveal, RevealStagger });
