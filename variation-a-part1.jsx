// Variation A — Editorial / Warm Cream
// Serif headlines (Instrument Serif), Geist body, JetBrains Mono accents
// Cream background, espresso ink, burnt orange accent

function VariationA() {
  const theme = {
    bg: '#f8f5ec',
    paper: '#fffdf8',
    ink: '#1f1b16',
    inkSoft: '#44403c',
    muted: '#78716c',
    rule: '#e7e2d6',
    accent: '#9a3412',
    accentSoft: '#c2410c',
    cream: '#f4efe2',
  };

  const serif = "'Instrument Serif', 'Cormorant Garamond', Georgia, serif";
  const sans = "'Geist', -apple-system, BlinkMacSystemFont, sans-serif";
  const mono = "'JetBrains Mono', 'SF Mono', monospace";

  return (
    <div
      style={{
        background: theme.bg,
        color: theme.ink,
        fontFamily: sans,
        minHeight: '100%',
        position: 'relative',
      }}
    >
      <ScrollProgress color={theme.accent} />
      <SectionBeacon
        ids={['hero', 'story', 'problem', 'features', 'workflow', 'usecases', 'security', 'faq']}
        labels={['Intro', 'Story', 'Problem', 'Features', 'Workflow', 'Use cases', 'Security', 'FAQ']}
        accent={theme.accent} ink={theme.ink}
      />
      <VANav theme={theme} serif={serif} sans={sans} mono={mono} />
      <section id="hero"><VAHero theme={theme} serif={serif} sans={sans} mono={mono} /></section>
      <VAMarquee theme={theme} mono={mono} />
      <section id="story"><VAScrollStory theme={theme} serif={serif} mono={mono} /></section>
      <section id="problem"><VAProblem theme={theme} serif={serif} mono={mono} /></section>
      <section id="features"><VAFeatures theme={theme} serif={serif} mono={mono} /></section>
      <section id="workflow"><VAWorkflow theme={theme} serif={serif} mono={mono} /></section>
      <section id="usecases"><VAUseCases theme={theme} serif={serif} mono={mono} /></section>
      <section id="security"><VASecurity theme={theme} serif={serif} mono={mono} /></section>
      <section id="faq"><VAFaq theme={theme} serif={serif} mono={mono} /></section>
      <VAFooter theme={theme} serif={serif} mono={mono} />
    </div>
  );
}

// ───────────────────── NAV ─────────────────────
function VANav({ theme, serif, sans, mono }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [hoverIdx, setHoverIdx] = React.useState(-1);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Product', menu: true },
    { label: 'Workflows', menu: false },
    { label: 'Models', menu: false },
    { label: 'Research', menu: true },
    { label: 'Pricing', menu: false },
  ];

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(248, 245, 236, 0.78)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px) saturate(1.3)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(1.3)' : 'none',
        borderBottom: `1px solid ${scrolled ? theme.rule : 'transparent'}`,
        boxShadow: scrolled ? '0 1px 0 rgba(31,27,22,0.03), 0 8px 24px -16px rgba(31,27,22,0.12)' : 'none',
        transition: 'background .25s ease, border-color .25s ease, box-shadow .25s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '14px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 36,
        }}
      >
        {/* ── Brand lockup ── */}
        <a href="#" style={{
          display: 'flex', alignItems: 'center', gap: 12,
          textDecoration: 'none', color: theme.ink,
        }}>
          <BinderMark theme={theme} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{
              fontFamily: serif,
              fontSize: 22,
              letterSpacing: 0,
              fontWeight: 400,
            }}>
              Binder
            </span>
            <span style={{
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: '0.14em',
              color: theme.inkSoft,
              marginTop: 3,
              textTransform: 'uppercase',
              opacity: 0.72,
            }}>
              AI&nbsp;·&nbsp;Reverse&nbsp;Engineering
            </span>
          </div>
        </a>

        {/* ── Separator ── */}
        <div style={{
          width: 1, height: 22, background: theme.rule, opacity: 0.7,
        }} />

        {/* ── Primary nav ── */}
        <nav style={{
          display: 'flex', gap: 4, flex: 1,
          fontFamily: sans, fontSize: 13.5, fontWeight: 500,
          color: theme.inkSoft,
        }}>
          {links.map((l, i) => (
            <a
              key={l.label}
              href="#"
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(-1)}
              style={{
                position: 'relative',
                padding: '8px 14px',
                borderRadius: 7,
                color: hoverIdx === i ? theme.ink : theme.inkSoft,
                background: hoverIdx === i ? 'rgba(31,27,22,0.04)' : 'transparent',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                transition: 'color .15s ease, background .15s ease',
              }}
            >
              {l.label}
              {l.menu && (
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none" style={{
                  opacity: 0.55,
                  transform: hoverIdx === i ? 'translateY(1px)' : 'translateY(0)',
                  transition: 'transform .15s ease',
                }}>
                  <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </a>
          ))}
        </nav>

        {/* ── Right cluster ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <a href="#" style={{
            fontFamily: sans, fontSize: 13.5, fontWeight: 500,
            color: theme.inkSoft, textDecoration: 'none',
            transition: 'color .15s ease',
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = theme.ink)}
            onMouseLeave={(e) => (e.currentTarget.style.color = theme.inkSoft)}
          >
            Sign in
          </a>
          <VAButton theme={theme}>Request a demo</VAButton>
        </div>
      </div>
    </div>
  );
}

function BinderMark({ theme, size = 32 }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: 8,
      background: `linear-gradient(145deg, #2a241d 0%, ${theme.ink} 55%, #0f0c09 100%)`,
      position: 'relative',
      flexShrink: 0,
      boxShadow: `
        0 0 0 1px rgba(31,27,22,0.85),
        0 1px 0 rgba(255,255,255,0.08) inset,
        0 6px 14px -6px rgba(31,27,22,0.45)
      `,
    }}>
      {/* serif monogram */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'grid', placeItems: 'center',
        fontFamily: 'Instrument Serif, serif',
        fontStyle: 'italic',
        fontSize: size * 0.62,
        color: theme.paper,
        lineHeight: 1,
        letterSpacing: '-0.02em',
        paddingBottom: size * 0.04,
      }}>
        b
      </div>
      {/* amber accent rule — bottom edge */}
      <div style={{
        position: 'absolute',
        left: size * 0.22, right: size * 0.22, bottom: size * 0.18,
        height: 1.5,
        background: theme.accent,
        borderRadius: 1,
        opacity: 0.92,
      }} />
    </div>
  );
}

function VAButton({ theme, children, variant = 'primary', onClick, style }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 18px',
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.18s ease',
    textDecoration: 'none',
    ...style,
  };
  if (variant === 'primary') {
    return (
      <button
        onClick={onClick}
        style={{ ...base, background: theme.ink, color: theme.paper }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = theme.accent;
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = theme.ink;
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {children}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      style={{ ...base, background: 'transparent', color: theme.ink, border: `1px solid ${theme.rule}` }}
      onMouseEnter={(e) => (e.currentTarget.style.background = theme.cream)}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      {children}
    </button>
  );
}

// ───────────────────── HERO ─────────────────────
function VAHero({ theme, serif, sans, mono }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: 720 }}>
      {/* Ambient binary strips — parallax-ish */}
      <div
        style={{
          position: 'absolute',
          top: 120,
          left: 0,
          right: 0,
          pointerEvents: 'none',
          transform: 'rotate(-1.5deg)',
          zIndex: 1,
        }}
      >
        <BinaryStrip speed={80} opacity={0.18} color={theme.muted} density={60} />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: 0,
          right: 0,
          pointerEvents: 'none',
          transform: 'rotate(1deg)',
          zIndex: 1,
        }}
      >
        <BinaryStrip speed={110} opacity={0.12} color={theme.muted} density={60} />
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '88px 48px 72px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: 72,
          alignItems: 'center',
        }}>
          {/* Left copy */}
          <div>
            <Reveal y={12} duration={600}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '6px 14px 6px 8px',
                borderRadius: 999,
                background: theme.paper,
                border: `1px solid ${theme.rule}`,
                fontSize: 12.5,
                color: theme.inkSoft,
                marginBottom: 32,
              }}
            >
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  padding: '3px 8px',
                  borderRadius: 999,
                  background: theme.accent,
                  color: theme.paper,
                }}
              >
                NEW
              </span>
              Multi-sample clustering is live
              <svg width="10" height="10" viewBox="0 0 10 10" style={{ marginLeft: 2 }}>
                <path d="M3 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            </Reveal>

            <Reveal delay={100} y={40} duration={900}>
            <h1
              style={{
                fontFamily: serif,
                fontSize: 'clamp(56px, 6.2vw, 92px)',
                lineHeight: 0.98,
                letterSpacing: '-0.025em',
                fontWeight: 400,
                margin: 0,
                color: theme.ink,
              }}
            >
              From bytes
              <br />
              to{' '}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <em style={{ color: theme.accent, fontStyle: 'italic' }}>clarity,</em>
                <svg
                  style={{ position: 'absolute', left: 0, right: 0, bottom: -8, width: '100%' }}
                  height="14"
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q 50 2, 100 7 T 198 6"
                    stroke={theme.accent}
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              in minutes.
            </h1>
            </Reveal>

            <Reveal delay={260} y={20}>
            <p
              style={{
                fontSize: 19,
                lineHeight: 1.55,
                color: theme.inkSoft,
                marginTop: 32,
                maxWidth: 520,
                textWrap: 'pretty',
              }}
            >
              Binder is the AI analyst for reverse engineers — and anyone trying to understand what a binary actually does. Upload an{' '}
              <code style={{ fontFamily: mono, fontSize: 16, color: theme.accent }}>.exe</code>,{' '}
              <code style={{ fontFamily: mono, fontSize: 16, color: theme.accent }}>.dll</code>, or{' '}
              <code style={{ fontFamily: mono, fontSize: 16, color: theme.accent }}>.elf</code>
              {' '}and ask in plain English. Get answers grounded in the exact bytes.
            </p>
            </Reveal>

            <Reveal delay={400} y={16}>
            <div style={{
              display: 'flex',
              gap: 12,
              marginTop: 40,
              alignItems: 'center',
            }}>
              <VAButton theme={theme}>
                Request a demo
              </VAButton>
              <VAButton theme={theme} variant="ghost">
                Watch a 90-sec walkthrough
              </VAButton>
            </div>
            </Reveal>

            <Reveal delay={520} y={16}>
            <div style={{
              marginTop: 56,
              display: 'flex',
              gap: 36,
              fontSize: 12.5,
              color: theme.muted,
            }}>
              <Stat mono={mono} theme={theme} label="Faster triage, on average">
                <CountUp to={14} duration={1400} format={(n) => `${Math.round(n)}×`} />
              </Stat>
              <Stat mono={mono} theme={theme} label="Samples analyzed to date">
                <CountUp to={2.1} duration={1800} format={(n) => `${n.toFixed(1)}M`} />
              </Stat>
              <Stat mono={mono} theme={theme} label="Type II, in progress">
                <span>SOC&nbsp;2</span>
              </Stat>
            </div>
            </Reveal>
          </div>

          {/* Right — chat demo */}
          <Reveal delay={350} y={30} duration={900} style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: -24,
                left: -24,
                fontFamily: mono,
                fontSize: 10.5,
                letterSpacing: '0.16em',
                color: theme.muted,
              }}
            >
              01 — LIVE ANALYSIS
            </div>
            <ChatDemo variant="editorial" />
            {/* Decorative corner bracket */}
            <div
              style={{
                position: 'absolute',
                bottom: -20,
                right: -20,
                fontFamily: serif,
                fontSize: 140,
                lineHeight: 1,
                color: theme.accent,
                opacity: 0.08,
                fontStyle: 'italic',
                pointerEvents: 'none',
              }}
            >
              ”
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function Stat({ num, label, mono, theme, children }) {
  return (
    <div>
      <div style={{ fontFamily: mono, fontSize: 22, color: theme.ink, fontWeight: 500 }}>
        {children ?? num}
      </div>
      <div style={{ marginTop: 4, textWrap: 'pretty', maxWidth: 140 }}>{label}</div>
    </div>
  );
}

// ───────────────────── MARQUEE ─────────────────────
function VAMarquee({ theme, mono }) {
  const items = [
    'UNIT 42', 'MANDIANT', 'CISA', 'RECORDED FUTURE',
    'CROWDSTRIKE', 'DRAGOS', 'GOOGLE TAG', 'FLARE',
  ];
  return (
    <div
      style={{
        borderTop: `1px solid ${theme.rule}`,
        borderBottom: `1px solid ${theme.rule}`,
        padding: '28px 0',
        overflow: 'hidden',
        background: theme.paper,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 48px',
          display: 'flex',
          alignItems: 'center',
          gap: 40,
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: 10.5,
            letterSpacing: '0.18em',
            color: theme.muted,
            flexShrink: 0,
          }}
        >
          TRUSTED BY TEAMS AT
        </div>
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              gap: 56,
              animation: 'marquee 40s linear infinite',
              width: 'max-content',
            }}
          >
            {[...items, ...items].map((name, i) => (
              <div
                key={i}
                style={{
                  fontFamily: mono,
                  fontSize: 13,
                  letterSpacing: '0.14em',
                  color: theme.inkSoft,
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────── PROBLEM / PROMISE ─────────────────────
function VAProblem({ theme, serif, mono }) {
  return (
    <div style={{ padding: '140px 48px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <Reveal><SectionEyebrow mono={mono} theme={theme} num="02" text="THE PROMISE" /></Reveal>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 80,
          marginTop: 24,
        }}>
          <Reveal y={28} duration={800}><h2
            style={{
              fontFamily: serif,
              fontSize: 'clamp(42px, 4.4vw, 64px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontWeight: 400,
              margin: 0,
              color: theme.ink,
            }}
          >
            Reverse engineering is slow, lonely, and{' '}
            <em style={{ color: theme.accent, fontStyle: 'italic' }}>mentally expensive.</em>{' '}
            We built Binder so it isn't.
          </h2></Reveal>
          <Reveal delay={150} y={20}><div style={{ fontSize: 17, lineHeight: 1.65, color: theme.inkSoft, paddingTop: 12 }}>
            <p style={{ margin: 0, textWrap: 'pretty' }}>
              An analyst can spend hours just getting oriented in a binary before real work
              begins. Stripped symbols, opaque call graphs, encoded strings, packed code — the
              ceremony of reversing is what burns the day.
            </p>
            <p style={{ marginTop: 18, marginBottom: 0, textWrap: 'pretty' }}>
              Binder reads the binary alongside you. It names functions, explains behavior,
              surfaces suspicious logic, and grounds every answer in the exact addresses and
              bytes that support it — so you stay in the driver's seat.
            </p>
          </div></Reveal>
        </div>

        {/* Before/after contrast strip */}
        <Reveal y={40} duration={900}>
        <div
          style={{
            marginTop: 80,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: theme.paper,
            border: `1px solid ${theme.rule}`,
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '40px 40px', borderRight: `1px solid ${theme.rule}` }}>
            <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.16em', color: theme.muted, marginBottom: 16 }}>
              BEFORE
            </div>
            <div style={{ fontFamily: mono, fontSize: 12, color: theme.muted, lineHeight: 1.7 }}>
              <div style={{ color: theme.inkSoft }}>sub_401ab0()</div>
              <div>&nbsp;&nbsp;push rbp</div>
              <div>&nbsp;&nbsp;mov rbp, rsp</div>
              <div>&nbsp;&nbsp;sub rsp, 0x40</div>
              <div>&nbsp;&nbsp;mov rdi, [rbp-0x20]</div>
              <div>&nbsp;&nbsp;call sub_4012a0</div>
              <div>&nbsp;&nbsp;test eax, eax</div>
              <div>&nbsp;&nbsp;jz short loc_401b40</div>
              <div>&nbsp;&nbsp;...</div>
            </div>
            <div
              style={{
                marginTop: 28,
                fontFamily: serif,
                fontStyle: 'italic',
                fontSize: 20,
                color: theme.muted,
                lineHeight: 1.4,
              }}
            >
              "What is this function even doing?"
            </div>
          </div>
          <div style={{ padding: '40px 40px', background: '#fbf8f0' }}>
            <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.16em', color: theme.accent, marginBottom: 16 }}>
              AFTER · BINDER
            </div>
            <div style={{ fontFamily: mono, fontSize: 12, color: theme.inkSoft, lineHeight: 1.7 }}>
              <div><span style={{ color: theme.accent }}>decrypt_and_execute</span>(buf, key)</div>
              <div>&nbsp;&nbsp;<span style={{ color: theme.muted }}>// xor-decrypts buf with 32-byte key @ 0x4010</span></div>
              <div>&nbsp;&nbsp;<span style={{ color: theme.muted }}>// then jumps to the decrypted buffer</span></div>
              <div>&nbsp;&nbsp;call <span style={{ color: theme.accent }}>xor_buffer</span></div>
              <div>&nbsp;&nbsp;test eax, eax</div>
              <div>&nbsp;&nbsp;jz short <span style={{ color: theme.accent }}>integrity_fail</span></div>
              <div>&nbsp;&nbsp;...</div>
            </div>
            <div
              style={{
                marginTop: 28,
                fontFamily: serif,
                fontStyle: 'italic',
                fontSize: 20,
                color: theme.ink,
                lineHeight: 1.4,
              }}
            >
              "Oh. <span style={{ color: theme.accent }}>Now</span> I know what to look for."
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </div>
  );
}

function SectionEyebrow({ mono, theme, num, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
      <span
        style={{
          fontFamily: mono,
          fontSize: 10.5,
          letterSpacing: '0.18em',
          color: theme.accent,
          fontWeight: 500,
        }}
      >
        — {num}
      </span>
      <span
        style={{
          fontFamily: mono,
          fontSize: 10.5,
          letterSpacing: '0.18em',
          color: theme.muted,
        }}
      >
        {text}
      </span>
    </div>
  );
}

// ───────────────────── SCROLLYTELLING (pinned + scrubbed reveal) ─────────────────────
function VAScrollStory({ theme, serif, mono }) {
  const containerRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;
    const compute = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / Math.max(1, scrollable)));
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    compute();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Stanzas — each an array of words. Progress drives word-by-word reveal.
  const stanzas = [
    ['Upload', 'a', 'strange', 'binary.'],
    ['Ask', 'it,', 'in', 'plain', 'English,', 'what', "it's", 'doing.'],
    ['Get', 'an', 'answer', '—', 'with', 'the', 'exact', 'bytes', 'to', 'prove', 'it.'],
  ];
  const flat = [];
  stanzas.forEach((s, si) => s.forEach((w, wi) => flat.push({ w, si, wi, last: wi === s.length - 1 })));
  const totalWords = flat.length;

  // Reveal window: start a little after pin begins, finish before pin ends.
  const revealStart = 0.08;
  const revealEnd = 0.82;
  const wordProgress = (i) => {
    const span = revealEnd - revealStart;
    const per = span / totalWords;
    const wStart = revealStart + i * per;
    const wEnd = wStart + per * 2.2; // overlap so words cascade smoothly
    return Math.max(0, Math.min(1, (progress - wStart) / (wEnd - wStart)));
  };

  return (
    <div
      ref={containerRef}
      style={{ height: '320vh', position: 'relative', background: theme.bg }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 48px',
        }}
      >
        {/* Top scrubber bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: theme.rule }}>
          <div
            style={{
              height: '100%',
              width: `${progress * 100}%`,
              background: theme.accent,
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        {/* Eyebrow label + chapter index */}
        <div style={{ maxWidth: 1120, margin: '0 auto', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 48,
              fontFamily: mono,
              fontSize: 10.5,
              letterSpacing: '0.18em',
              color: theme.muted,
            }}
          >
            <span style={{ color: theme.accent }}>— 01.5</span>
            <span>THE SHAPE OF A SESSION</span>
            <span style={{ flex: 1, height: 1, background: theme.rule }} />
            <span style={{ color: theme.accent, fontVariantNumeric: 'tabular-nums' }}>
              {String(Math.round(progress * 100)).padStart(2, '0')}%
            </span>
          </div>

          {/* Scrubbed text */}
          <div
            style={{
              fontFamily: serif,
              fontSize: 'clamp(40px, 5.4vw, 80px)',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              fontWeight: 400,
              color: theme.ink,
              maxWidth: 1000,
            }}
          >
            {stanzas.map((s, si) => (
              <div key={si} style={{ marginBottom: si < stanzas.length - 1 ? '0.4em' : 0 }}>
                {s.map((word, wi) => {
                  const globalIdx = stanzas.slice(0, si).reduce((a, b) => a + b.length, 0) + wi;
                  const wp = wordProgress(globalIdx);
                  const isAccent =
                    (si === 0 && word === 'strange') ||
                    (si === 1 && word === 'English,') ||
                    (si === 2 && word === 'bytes');
                  return (
                    <span
                      key={wi}
                      style={{
                        display: 'inline-block',
                        opacity: 0.1 + wp * 0.9,
                        transform: `translateY(${(1 - wp) * 14}px)`,
                        filter: `blur(${(1 - wp) * 6}px)`,
                        color: isAccent && wp > 0.6 ? theme.accent : theme.ink,
                        fontStyle: isAccent ? 'italic' : 'normal',
                        marginRight: '0.28em',
                        transition: 'color 0.2s',
                        willChange: 'opacity, transform, filter',
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Footnote — three little citations that light up as stanzas complete */}
          <div
            style={{
              marginTop: 64,
              display: 'flex',
              gap: 32,
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: '0.06em',
              color: theme.muted,
            }}
          >
            {[
              { label: 'stager_x64.elf', done: progress > 0.25 },
              { label: 'cmd.update-status.net:8443', done: progress > 0.55 },
              { label: '.rodata:0x3c10', done: progress > 0.8 },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: c.done ? 1 : 0.35, transition: 'opacity 0.3s' }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 6,
                    background: c.done ? theme.accent : theme.rule,
                    transition: 'background 0.3s',
                  }}
                />
                <span style={{ color: c.done ? theme.inkSoft : theme.muted }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { VariationA, VAScrollStory });
