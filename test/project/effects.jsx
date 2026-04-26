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

      // Simplex-ish cheap noise
      vec2 hash(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
              dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
          mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
              dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
          u.y
        );
      }
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = v_uv;
        vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
        vec2 p = (uv - 0.5) * aspect;
        vec2 m = (u_mouse - 0.5) * aspect;

        float t = u_time * 0.04;

        // Flowing field
        vec2 q = p * 1.6 + vec2(t, -t * 0.6);
        float n = fbm(q + fbm(q + vec2(t * 0.8, 0.0)));

        // Pointer "lens": a soft warm halo that follows the cursor.
        float d = length(p - m);
        float halo = smoothstep(0.9, 0.0, d) * u_active;
        float ring = smoothstep(0.36, 0.30, d) - smoothstep(0.30, 0.24, d);
        ring *= u_active * 0.35;

        // Warm palette — cream → amber → espresso
        vec3 cream   = u_dark > 0.5 ? vec3(0.078, 0.071, 0.064) : vec3(0.973, 0.957, 0.925);
        vec3 sand    = u_dark > 0.5 ? vec3(0.141, 0.125, 0.106) : vec3(0.957, 0.929, 0.871);
        vec3 amber   = u_dark > 0.5 ? vec3(0.298, 0.165, 0.075) : vec3(0.835, 0.553, 0.314);
        vec3 ember   = u_dark > 0.5 ? vec3(0.604, 0.255, 0.071) : vec3(0.604, 0.205, 0.071);

        // Start from cream and mix darker based on noise and halo
        vec3 col = cream;
        col = mix(col, sand, smoothstep(-0.3, 0.4, n) * 0.55);
        col = mix(col, amber, halo * (0.25 + 0.4 * smoothstep(0.0, 0.6, n)));
        col += ember * ring * 0.6;

        // Vignette
        float vig = smoothstep(1.3, 0.25, length(p));
        col = mix(cream * 0.97, col, vig);

        // Very subtle grain
        float grain = (fract(sin(dot(uv * u_res, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.012;
        col += grain;

        // Output with gentle opacity so it sits under content
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
