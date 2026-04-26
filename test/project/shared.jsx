// Shared components for Melani landing — chat demo, binary strip, icons

// ──────────────────────────────────────────────────────────
// BinaryStrip — animated horizontal scrolling hex bytes
// ──────────────────────────────────────────────────────────
function BinaryStrip({ speed = 40, opacity = 0.5, color = '#78716c', rows = 1, density = 80 }) {
  const hex = React.useMemo(() => {
    const chars = '0123456789abcdef';
    const out = [];
    for (let r = 0; r < rows; r++) {
      let line = '';
      for (let i = 0; i < density; i++) {
        line += chars[Math.floor(Math.random() * 16)] + chars[Math.floor(Math.random() * 16)];
        if (i % 4 === 3) line += '  ';
        else line += ' ';
      }
      out.push(line);
    }
    return out;
  }, [rows, density]);

  return (
    <div style={{ overflow: 'hidden', width: '100%', opacity, pointerEvents: 'none' }}>
      {hex.map((line, i) => (
        <div
          key={i}
          style={{
            whiteSpace: 'nowrap',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 12,
            color,
            animation: `binstrip-${i % 2} ${speed}s linear infinite`,
            letterSpacing: '0.02em',
          }}
        >
          {line} {line} {line}
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// ChatDemo — animated chat unfolding an analysis conversation
// variant: 'editorial' | 'terminal'
// ──────────────────────────────────────────────────────────
const ANALYSIS_SCRIPT = [
  { from: 'user', text: 'What does this binary do?', delay: 0 },
  {
    from: 'ai',
    text: 'This is a 64-bit ELF compiled with GCC 11.4. The binary implements a small command-and-control client. It connects to a hardcoded C2 host, encrypts outbound traffic with RC4, and spawns a reverse shell on a specific command.',
    cites: ['main+0x1a4', '.rodata:0x3c10', 'sub_401ab0'],
    delay: 600,
  },
  { from: 'user', text: 'Show me the C2 host.', delay: 400 },
  {
    from: 'ai',
    text: 'Hardcoded in .rodata at 0x3c10:',
    code: 'cmd.update-status.net:8443',
    delay: 500,
  },
  { from: 'user', text: 'Rename sub_401ab0 to something descriptive.', delay: 400 },
  {
    from: 'ai',
    text: 'Renamed to decrypt_and_execute. It XORs the payload with the 32-byte key at 0x4010, then jumps to the buffer.',
    delay: 500,
  },
];

function ChatDemo({ variant = 'editorial', autoStart = true, compact = false }) {
  const [shown, setShown] = React.useState(autoStart ? 0 : 0);
  const ref = React.useRef(null);
  const started = React.useRef(false);

  // Intersection observer — start when visible
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            runScript();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const runScript = () => {
    let i = 0;
    const tick = () => {
      if (i >= ANALYSIS_SCRIPT.length) return;
      const step = ANALYSIS_SCRIPT[i];
      setTimeout(() => {
        setShown((s) => i + 1);
        i++;
        tick();
      }, 700 + (step.delay || 0));
    };
    tick();
  };

  const styles = variant === 'editorial' ? editorialChatStyles : terminalChatStyles;

  return (
    <div ref={ref} style={styles.wrap}>
      <div style={styles.header}>
        <div style={styles.headerDot} />
        <div style={styles.headerTitle}>
          <span style={{ opacity: 0.55 }}>analyzing</span>{' '}
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 500 }}>
            stager_x64.elf
          </span>
        </div>
        <div style={styles.headerMeta}>
          <span style={styles.pill}>ELF · 64-bit</span>
          <span style={styles.pill}>412 KB</span>
        </div>
      </div>

      <div style={styles.body}>
        {ANALYSIS_SCRIPT.slice(0, shown).map((msg, i) => (
          <ChatMsg key={i} msg={msg} variant={variant} />
        ))}
        {shown > 0 && shown < ANALYSIS_SCRIPT.length && (
          <div style={{ ...styles.msg, ...styles.typing }}>
            <span style={styles.dot1}>·</span>
            <span style={styles.dot2}>·</span>
            <span style={styles.dot3}>·</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatMsg({ msg, variant }) {
  const styles = variant === 'editorial' ? editorialChatStyles : terminalChatStyles;
  const isUser = msg.from === 'user';
  return (
    <div
      style={{
        ...styles.msg,
        ...(isUser ? styles.msgUser : styles.msgAi),
        animation: 'chat-in .4s cubic-bezier(.2,.8,.2,1) both',
      }}
    >
      {!isUser && <div style={styles.aiLabel}>MELANI</div>}
      <div style={styles.msgText}>
        {msg.text}
        {msg.code && (
          <div style={styles.codeBlock}>
            <span style={{ color: variant === 'editorial' ? '#9a3412' : '#d97706' }}>»</span>{' '}
            {msg.code}
          </div>
        )}
        {msg.cites && (
          <div style={styles.cites}>
            {msg.cites.map((c, j) => (
              <span key={j} style={styles.cite}>
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Editorial chat styles — cream, warm, softer
const editorialChatStyles = {
  wrap: {
    background: '#fffdf8',
    border: '1px solid #e7e2d6',
    borderRadius: 14,
    overflow: 'hidden',
    boxShadow: '0 30px 80px -30px rgba(60, 40, 20, 0.25), 0 10px 30px -15px rgba(60, 40, 20, 0.15)',
    fontFamily: 'Geist, -apple-system, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 18px',
    borderBottom: '1px solid #efeadd',
    background: '#faf7ef',
  },
  headerDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    background: '#9a3412',
    boxShadow: '0 0 0 4px rgba(154,52,18,0.12)',
  },
  headerTitle: { fontSize: 13, color: '#44403c', flex: 1 },
  headerMeta: { display: 'flex', gap: 6 },
  pill: {
    fontSize: 10.5,
    fontFamily: 'JetBrains Mono, monospace',
    padding: '2px 8px',
    borderRadius: 20,
    background: '#f4efe2',
    color: '#78716c',
    letterSpacing: '0.02em',
  },
  body: {
    padding: '24px 22px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    minHeight: 320,
  },
  msg: { maxWidth: '88%', lineHeight: 1.55 },
  msgUser: {
    alignSelf: 'flex-end',
    background: '#292524',
    color: '#fafaf9',
    padding: '10px 14px',
    borderRadius: '16px 16px 4px 16px',
    fontSize: 14,
  },
  msgAi: {
    alignSelf: 'flex-start',
    fontSize: 14.5,
    color: '#292524',
  },
  aiLabel: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 10,
    letterSpacing: '0.18em',
    color: '#9a3412',
    marginBottom: 6,
    fontWeight: 500,
  },
  msgText: {},
  codeBlock: {
    marginTop: 8,
    padding: '10px 14px',
    background: '#faf7ef',
    border: '1px solid #efeadd',
    borderRadius: 8,
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 13,
    color: '#44403c',
  },
  cites: {
    marginTop: 10,
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
  },
  cite: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    padding: '3px 8px',
    borderRadius: 20,
    background: '#f4efe2',
    color: '#78716c',
    border: '1px solid #efeadd',
  },
  typing: {
    alignSelf: 'flex-start',
    color: '#9a3412',
    fontSize: 22,
    lineHeight: 1,
    letterSpacing: 2,
  },
  dot1: { animation: 'blink 1.2s infinite', animationDelay: '0s' },
  dot2: { animation: 'blink 1.2s infinite', animationDelay: '0.2s' },
  dot3: { animation: 'blink 1.2s infinite', animationDelay: '0.4s' },
};

// Terminal chat styles — denser, sharper, document-like
const terminalChatStyles = {
  ...editorialChatStyles,
  wrap: {
    ...editorialChatStyles.wrap,
    background: '#ffffff',
    border: '1px solid #e5e5e5',
    borderRadius: 4,
    boxShadow: '0 40px 80px -30px rgba(0,0,0,0.2), 0 0 0 1px #e5e5e5',
  },
  header: {
    ...editorialChatStyles.header,
    background: '#fafaf9',
    borderBottom: '1px solid #e5e5e5',
    padding: '12px 16px',
  },
  headerDot: {
    ...editorialChatStyles.headerDot,
    background: '#d97706',
    boxShadow: '0 0 0 4px rgba(217,119,6,0.12)',
  },
  aiLabel: {
    ...editorialChatStyles.aiLabel,
    color: '#d97706',
  },
};

// Inject keyframes once
if (typeof document !== 'undefined' && !document.getElementById('binder-shared-keyframes')) {
  const s = document.createElement('style');
  s.id = 'binder-shared-keyframes';
  s.textContent = `
    @keyframes chat-in {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes blink { 0%, 60%, 100% { opacity: 0.3 } 30% { opacity: 1 } }
    @keyframes binstrip-0 {
      from { transform: translateX(0); }
      to   { transform: translateX(-33.33%); }
    }
    @keyframes binstrip-1 {
      from { transform: translateX(-33.33%); }
      to   { transform: translateX(0); }
    }
    @keyframes fade-up {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes pulse-ring {
      0% { box-shadow: 0 0 0 0 rgba(154, 52, 18, 0.35); }
      70% { box-shadow: 0 0 0 14px rgba(154, 52, 18, 0); }
      100% { box-shadow: 0 0 0 0 rgba(154, 52, 18, 0); }
    }
  `;
  document.head.appendChild(s);
}

// ──────────────────────────────────────────────────────────
// useInView hook — trigger once when element enters viewport
// ──────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ──────────────────────────────────────────────────────────
// Cursor glow — soft warm spotlight following the cursor within a container
// ──────────────────────────────────────────────────────────
function CursorGlow({ color = 'rgba(154, 52, 18, 0.08)', size = 500 }) {
  const [pos, setPos] = React.useState({ x: -1000, y: -1000, on: false });
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    const onMove = (e) => {
      const r = parent.getBoundingClientRect();
      setPos({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
    };
    const onLeave = () => setPos((p) => ({ ...p, on: false }));
    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);
    return () => {
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: pos.on
          ? `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 70%)`
          : 'transparent',
        transition: 'background 0.3s',
        zIndex: 0,
      }}
    />
  );
}

Object.assign(window, { BinaryStrip, ChatDemo, useInView, CursorGlow, ANALYSIS_SCRIPT });
