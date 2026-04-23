// Shared components for Binder landing — chat demo, binary strip, icons

// ──────────────────────────────────────────────────────────
// BinaryStrip — animated horizontal scrolling hex bytes
// ──────────────────────────────────────────────────────────
function BinaryStrip({
  speed = 40,
  opacity = 0.5,
  color = '#78716c',
  rows = 1,
  density = 80
}) {
  const hex = React.useMemo(() => {
    const chars = '0123456789abcdef';
    const out = [];
    for (let r = 0; r < rows; r++) {
      let line = '';
      for (let i = 0; i < density; i++) {
        line += chars[Math.floor(Math.random() * 16)] + chars[Math.floor(Math.random() * 16)];
        if (i % 4 === 3) line += '  ';else line += ' ';
      }
      out.push(line);
    }
    return out;
  }, [rows, density]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden',
      width: '100%',
      opacity,
      pointerEvents: 'none'
    }
  }, hex.map((line, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      whiteSpace: 'nowrap',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 12,
      color,
      animation: `binstrip-${i % 2} ${speed}s linear infinite`,
      letterSpacing: '0.02em'
    }
  }, line, " ", line, " ", line)));
}

// ──────────────────────────────────────────────────────────
// ChatDemo — animated chat unfolding an analysis conversation
// variant: 'editorial' | 'terminal'
// ──────────────────────────────────────────────────────────
const ANALYSIS_SCRIPTS = [{
  file: 'stager_x64.elf',
  type: 'ELF · 64-bit',
  size: '412 KB',
  steps: [{
    from: 'user',
    text: 'What does this binary do?',
    delay: 0
  }, {
    from: 'ai',
    text: 'A 64-bit ELF compiled with GCC 11.4. It implements a small command-and-control client — connects to a hardcoded C2 host, encrypts outbound traffic with RC4, spawns a reverse shell on a specific command.',
    cites: ['main+0x1a4', '.rodata:0x3c10', 'sub_401ab0'],
    delay: 600
  }, {
    from: 'user',
    text: 'Show me the C2 host.',
    delay: 400
  }, {
    from: 'ai',
    text: 'Hardcoded in .rodata at 0x3c10:',
    code: 'cmd.update-status.net:8443',
    delay: 500
  }, {
    from: 'user',
    text: 'Rename sub_401ab0 to something descriptive.',
    delay: 400
  }, {
    from: 'ai',
    text: 'Renamed to decrypt_and_execute. It XORs the payload with the 32-byte key at 0x4010, then jumps to the buffer.',
    delay: 500
  }]
}, {
  file: 'update.dll',
  type: 'PE32+ · DLL',
  size: '284 KB',
  steps: [{
    from: 'user',
    text: 'Is this file malicious?',
    delay: 0
  }, {
    from: 'ai',
    text: 'Yes — this is a Phobos-family ransomware loader. It enumerates local drives, encrypts files with AES-256-CBC, and appends .phobos to each filename.',
    cites: ['CryptGenRandom', '.text:0x2a40', 'sub_10001b20'],
    delay: 550
  }, {
    from: 'user',
    text: 'How does it manage the keys?',
    delay: 450
  }, {
    from: 'ai',
    text: 'Per-file AES keys are generated with CryptGenRandom, then wrapped with a hardcoded RSA-2048 public key:',
    code: 'RSA-2048 pubkey @ .rdata:0x4800',
    delay: 500
  }, {
    from: 'user',
    text: 'Any way to recover files without paying?',
    delay: 450
  }, {
    from: 'ai',
    text: "No implementation flaws in this variant — AES/RSA are used correctly. Don't pay. Restore from backup and scope the blast radius.",
    delay: 500
  }]
}, {
  file: 'firmware.bin',
  type: 'ARM · Linux',
  size: '6.2 MB',
  steps: [{
    from: 'user',
    text: 'Anything unusual about this firmware?',
    delay: 0
  }, {
    from: 'ai',
    text: 'Stock Linux 4.14 for an ARM Cortex-A7 router, plus one extra service: telnetd-utility, listening on port 32764. It accepts an undocumented auth packet.',
    cites: ['init.d/telnetd-utility', 'arm:0x80104c', 'sub_800c20'],
    delay: 600
  }, {
    from: 'user',
    text: 'Show the backdoor trigger.',
    delay: 400
  }, {
    from: 'ai',
    text: 'Magic dword, then XOR key against the next 8 bytes. If it matches the MAC, auth succeeds:',
    code: 'magic=0x6d435344  key=0xDEADBEEF',
    delay: 500
  }, {
    from: 'user',
    text: 'When was this planted?',
    delay: 400
  }, {
    from: 'ai',
    text: 'Compile timestamp is 2023-08 — two years before public firmware first shipped this build. Worth a vendor disclosure.',
    delay: 500
  }]
}];
function ChatDemo({
  variant = 'editorial'
}) {
  const [scriptIdx, setScriptIdx] = React.useState(0);
  const [shown, setShown] = React.useState(0);
  const [visible, setVisible] = React.useState(true); // body opacity for cross-fade
  const ref = React.useRef(null);
  const started = React.useRef(false);
  const script = ANALYSIS_SCRIPTS[scriptIdx];
  const steps = script.steps;

  // Start when scrolled into view
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        setShown(1);
      }
    }), {
      threshold: 0.2
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // Drive the conversation forward + handle end-of-script → fade → next
  React.useEffect(() => {
    if (!started.current || shown === 0) return;
    if (shown < steps.length) {
      const step = steps[shown - 1];
      const nextDelay = 1100 + (step.delay || 0);
      const t = setTimeout(() => setShown(shown + 1), nextDelay);
      return () => clearTimeout(t);
    }

    // Finished current script — pause, fade out, swap, fade in, restart
    const pause = setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(pause);
  }, [shown, scriptIdx]);

  // After fade-out completes, swap script and fade back in
  React.useEffect(() => {
    if (visible) return;
    const t = setTimeout(() => {
      setScriptIdx(i => (i + 1) % ANALYSIS_SCRIPTS.length);
      setShown(0);
      setVisible(true);
      // small breath before the new script starts typing
      setTimeout(() => setShown(1), 450);
    }, 650);
    return () => clearTimeout(t);
  }, [visible]);
  const styles = variant === 'editorial' ? editorialChatStyles : terminalChatStyles;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: styles.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.header
  }, /*#__PURE__*/React.createElement("div", {
    style: styles.headerDot
  }), /*#__PURE__*/React.createElement("div", {
    style: styles.headerTitle
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.55
    }
  }, "analyzing"), ' ', /*#__PURE__*/React.createElement("span", {
    key: script.file,
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      fontWeight: 500,
      animation: 'chat-in .45s cubic-bezier(.2,.8,.2,1) both',
      display: 'inline-block'
    }
  }, script.file)), /*#__PURE__*/React.createElement("div", {
    style: styles.headerMeta
  }, /*#__PURE__*/React.createElement("span", {
    key: script.type + 'a',
    style: {
      ...styles.pill,
      animation: 'chat-in .45s .05s cubic-bezier(.2,.8,.2,1) both'
    }
  }, script.type), /*#__PURE__*/React.createElement("span", {
    key: script.size + 'b',
    style: {
      ...styles.pill,
      animation: 'chat-in .45s .1s cubic-bezier(.2,.8,.2,1) both'
    }
  }, script.size))), /*#__PURE__*/React.createElement("div", {
    key: scriptIdx,
    style: {
      ...styles.body,
      opacity: visible ? 1 : 0,
      transition: 'opacity 500ms cubic-bezier(.2,.7,.2,1)'
    }
  }, steps.slice(0, shown).map((msg, i) => /*#__PURE__*/React.createElement(ChatMsg, {
    key: i,
    msg: msg,
    variant: variant
  })), shown > 0 && shown < steps.length && /*#__PURE__*/React.createElement("div", {
    style: {
      ...styles.msg,
      ...styles.typing
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: styles.dot1
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: styles.dot2
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: styles.dot3
  }, "\xB7"))));
}
function ChatMsg({
  msg,
  variant
}) {
  const styles = variant === 'editorial' ? editorialChatStyles : terminalChatStyles;
  const isUser = msg.from === 'user';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...styles.msg,
      ...(isUser ? styles.msgUser : styles.msgAi),
      animation: 'chat-in .4s cubic-bezier(.2,.8,.2,1) both'
    }
  }, !isUser && /*#__PURE__*/React.createElement("div", {
    style: styles.aiLabel
  }, "BINDER"), /*#__PURE__*/React.createElement("div", {
    style: styles.msgText
  }, msg.text, msg.code && /*#__PURE__*/React.createElement("div", {
    style: styles.codeBlock
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: variant === 'editorial' ? '#9a3412' : '#d97706'
    }
  }, "\xBB"), ' ', msg.code), msg.cites && /*#__PURE__*/React.createElement("div", {
    style: styles.cites
  }, msg.cites.map((c, j) => /*#__PURE__*/React.createElement("span", {
    key: j,
    style: styles.cite
  }, c)))));
}

// Editorial chat styles — cream, warm, softer
const editorialChatStyles = {
  wrap: {
    background: '#fffdf8',
    border: '1px solid #e7e2d6',
    borderRadius: 14,
    overflow: 'hidden',
    boxShadow: '0 30px 80px -30px rgba(60, 40, 20, 0.25), 0 10px 30px -15px rgba(60, 40, 20, 0.15)',
    fontFamily: 'Geist, -apple-system, sans-serif'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 18px',
    borderBottom: '1px solid #efeadd',
    background: '#faf7ef'
  },
  headerDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    background: '#9a3412',
    boxShadow: '0 0 0 4px rgba(154,52,18,0.12)'
  },
  headerTitle: {
    fontSize: 13,
    color: '#44403c',
    flex: 1
  },
  headerMeta: {
    display: 'flex',
    gap: 6
  },
  pill: {
    fontSize: 10.5,
    fontFamily: 'JetBrains Mono, monospace',
    padding: '2px 8px',
    borderRadius: 20,
    background: '#f4efe2',
    color: '#78716c',
    letterSpacing: '0.02em'
  },
  body: {
    padding: '24px 22px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    minHeight: 320
  },
  msg: {
    maxWidth: '88%',
    lineHeight: 1.55
  },
  msgUser: {
    alignSelf: 'flex-end',
    background: '#292524',
    color: '#fafaf9',
    padding: '10px 14px',
    borderRadius: '16px 16px 4px 16px',
    fontSize: 14
  },
  msgAi: {
    alignSelf: 'flex-start',
    fontSize: 14.5,
    color: '#292524'
  },
  aiLabel: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 10,
    letterSpacing: '0.18em',
    color: '#9a3412',
    marginBottom: 6,
    fontWeight: 500
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
    color: '#44403c'
  },
  cites: {
    marginTop: 10,
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap'
  },
  cite: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    padding: '3px 8px',
    borderRadius: 20,
    background: '#f4efe2',
    color: '#78716c',
    border: '1px solid #efeadd'
  },
  typing: {
    alignSelf: 'flex-start',
    color: '#9a3412',
    fontSize: 22,
    lineHeight: 1,
    letterSpacing: 2
  },
  dot1: {
    animation: 'blink 1.2s infinite',
    animationDelay: '0s'
  },
  dot2: {
    animation: 'blink 1.2s infinite',
    animationDelay: '0.2s'
  },
  dot3: {
    animation: 'blink 1.2s infinite',
    animationDelay: '0.4s'
  }
};

// Terminal chat styles — denser, sharper, document-like
const terminalChatStyles = {
  ...editorialChatStyles,
  wrap: {
    ...editorialChatStyles.wrap,
    background: '#ffffff',
    border: '1px solid #e5e5e5',
    borderRadius: 4,
    boxShadow: '0 40px 80px -30px rgba(0,0,0,0.2), 0 0 0 1px #e5e5e5'
  },
  header: {
    ...editorialChatStyles.header,
    background: '#fafaf9',
    borderBottom: '1px solid #e5e5e5',
    padding: '12px 16px'
  },
  headerDot: {
    ...editorialChatStyles.headerDot,
    background: '#d97706',
    boxShadow: '0 0 0 4px rgba(217,119,6,0.12)'
  },
  aiLabel: {
    ...editorialChatStyles.aiLabel,
    color: '#d97706'
  }
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
    const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && setInView(true)), {
      threshold
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ──────────────────────────────────────────────────────────
// Cursor glow — soft warm spotlight following the cursor within a container
// ──────────────────────────────────────────────────────────
function CursorGlow({
  color = 'rgba(154, 52, 18, 0.08)',
  size = 500
}) {
  const [pos, setPos] = React.useState({
    x: -1000,
    y: -1000,
    on: false
  });
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    const onMove = e => {
      const r = parent.getBoundingClientRect();
      setPos({
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        on: true
      });
    };
    const onLeave = () => setPos(p => ({
      ...p,
      on: false
    }));
    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);
    return () => {
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: pos.on ? `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 70%)` : 'transparent',
      transition: 'background 0.3s',
      zIndex: 0
    }
  });
}
Object.assign(window, {
  BinaryStrip,
  ChatDemo,
  useInView,
  CursorGlow,
  ANALYSIS_SCRIPTS
});