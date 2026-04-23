// Variation A Part 2 — features, workflow, use cases, security, faq, footer

// ───────────────────── FEATURES (BENTO) ─────────────────────
function VAFeatures({ theme, serif, mono }) {
  return (
    <div style={{ padding: '120px 48px', background: theme.paper, borderTop: `1px solid ${theme.rule}`, borderBottom: `1px solid ${theme.rule}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal><SectionEyebrow mono={mono} theme={theme} num="03" text="WHAT'S IN THE BOX" /></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end', marginTop: 20, marginBottom: 56 }}>
          <Reveal y={28} duration={800}><h2
            style={{
              fontFamily: serif,
              fontSize: 'clamp(40px, 4.2vw, 60px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontWeight: 400,
              margin: 0,
            }}
          >
            A small, sharp set of tools — <em style={{ color: theme.accent, fontStyle: 'italic' }}>not</em> a kitchen sink.
          </h2></Reveal>
          <Reveal delay={150} y={20}><p style={{ fontSize: 16, color: theme.inkSoft, margin: 0, lineHeight: 1.6, textWrap: 'pretty' }}>
            Every capability is designed around one question: does it help an analyst get to the
            right answer, faster, without guessing?
          </p></Reveal>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridAutoRows: '220px',
            gap: 18,
          }}
        >
          <Reveal y={24} delay={0} style={{ gridColumn: 'span 3', gridRow: 'span 2' }}>
            <FeatureCard theme={theme} serif={serif} mono={mono} cols={3} rows={2} inner title="Ground-truth citations" blurb="Every claim links to the exact address, section, or bytes that support it. Click any citation to jump into the disassembly and see for yourself.">
              <CitationGraphic theme={theme} mono={mono} />
            </FeatureCard>
          </Reveal>

          <Reveal y={24} delay={100} style={{ gridColumn: 'span 3' }}>
            <FeatureCard theme={theme} serif={serif} mono={mono} cols={3} rows={1} inner title="Auto-rename & annotate" blurb="Propose names for functions, locals, and structs grounded in real behavior.">
              <RenameGraphic theme={theme} mono={mono} />
            </FeatureCard>
          </Reveal>

          <Reveal y={24} delay={200} style={{ gridColumn: 'span 3' }}>
            <FeatureCard theme={theme} serif={serif} mono={mono} cols={3} rows={1} inner title="YARA assistant" blurb="Draft, refine, and test detection rules against your own corpus.">
              <YaraGraphic theme={theme} mono={mono} />
            </FeatureCard>
          </Reveal>

          <Reveal y={24} delay={280} style={{ gridColumn: 'span 2' }}>
            <FeatureCard theme={theme} serif={serif} mono={mono} cols={2} rows={1} inner title="Multi-sample clustering" blurb="Diff related binaries. Find the shared cores of a malware family.">
              <ClusterGraphic theme={theme} />
            </FeatureCard>
          </Reveal>

          <Reveal y={24} delay={360} style={{ gridColumn: 'span 2' }}>
            <FeatureCard theme={theme} serif={serif} mono={mono} cols={2} rows={1} inner title="Model picker" blurb="Swap between Claude, GPT, and local models per task.">
              <ModelsGraphic theme={theme} mono={mono} />
            </FeatureCard>
          </Reveal>

          <Reveal y={24} delay={440} style={{ gridColumn: 'span 2' }}>
            <FeatureCard theme={theme} serif={serif} mono={mono} cols={2} rows={1} inner title="radare2 & Ghidra bridges" blurb="Drive your existing tools via MCP, from the same conversation.">
              <BridgeGraphic theme={theme} mono={mono} />
            </FeatureCard>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ theme, serif, mono, cols, rows, title, blurb, children, inner }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...(inner ? { height: '100%' } : { gridColumn: `span ${cols}`, gridRow: `span ${rows}` }),
        background: theme.bg,
        border: `1px solid ${theme.rule}`,
        borderRadius: 14,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover ? '0 20px 40px -20px rgba(60,40,20,0.2)' : 'none',
        cursor: 'pointer',
      }}
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
        {children}
      </div>
      <div style={{ marginTop: 20 }}>
        <div style={{ fontFamily: serif, fontSize: 22, letterSpacing: '-0.01em', color: theme.ink }}>
          {title}
        </div>
        <div style={{ marginTop: 6, fontSize: 13.5, color: theme.inkSoft, lineHeight: 1.5, textWrap: 'pretty' }}>
          {blurb}
        </div>
      </div>
    </div>
  );
}

// --- Feature graphics ---
function CitationGraphic({ theme, mono }) {
  return (
    <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignSelf: 'stretch', padding: '12px 0' }}>
      <div style={{ fontFamily: mono, fontSize: 11, color: theme.inkSoft, lineHeight: 1.8 }}>
        <div style={{ color: theme.muted, marginBottom: 8 }}>.rodata:0x3c10</div>
        <div style={{ background: theme.paper, border: `1px solid ${theme.rule}`, padding: '8px 10px', borderRadius: 6 }}>
          <div>63 6d 64 2e 75 70 64 61</div>
          <div>74 65 2d 73 74 61 74 75</div>
          <div>73 2e 6e 65 74 3a 38 34</div>
          <div>34 33 00 00 00 00 00 00</div>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <svg width="100%" height="20" style={{ position: 'absolute', top: 24, left: -16 }}>
          <path d="M0 10 L 40 10" stroke={theme.accent} strokeWidth="1" strokeDasharray="3 2" fill="none" />
          <circle cx="40" cy="10" r="2.5" fill={theme.accent} />
        </svg>
        <div style={{ background: '#fbf8f0', border: `1px solid ${theme.rule}`, padding: 12, borderRadius: 6, marginLeft: 16 }}>
          <div style={{ fontSize: 11, fontFamily: mono, color: theme.accent, letterSpacing: '0.1em', marginBottom: 6 }}>
            CLAIM
          </div>
          <div style={{ fontSize: 12.5, color: theme.ink, lineHeight: 1.5 }}>
            C2 host is hardcoded as <span style={{ fontFamily: mono, fontSize: 11.5 }}>cmd.update-status.net</span> on port <span style={{ fontFamily: mono, fontSize: 11.5 }}>8443</span>.
          </div>
        </div>
      </div>
    </div>
  );
}

function RenameGraphic({ theme, mono }) {
  return (
    <div style={{ fontFamily: mono, fontSize: 12, lineHeight: 1.8, textAlign: 'center' }}>
      <span style={{ color: theme.muted, textDecoration: 'line-through' }}>sub_401ab0</span>
      <span style={{ color: theme.accent, margin: '0 10px' }}>→</span>
      <span style={{ color: theme.ink, background: '#fbf8f0', padding: '2px 6px', borderRadius: 4 }}>
        decrypt_and_execute
      </span>
    </div>
  );
}

function YaraGraphic({ theme, mono }) {
  return (
    <div style={{ fontFamily: mono, fontSize: 11, color: theme.inkSoft, lineHeight: 1.7, textAlign: 'left', width: '100%' }}>
      <div><span style={{ color: theme.accent }}>rule</span> stager_x64 {'{'}</div>
      <div>&nbsp;&nbsp;strings:</div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;$a = <span style={{ color: theme.accent }}>{'"cmd.update"'}</span></div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;$b = {'{ 48 83 ec 40 ... }'}</div>
      <div>&nbsp;&nbsp;condition: all of them</div>
      <div>{'}'}</div>
    </div>
  );
}

function ClusterGraphic({ theme }) {
  return (
    <svg viewBox="0 0 180 90" width="100%" style={{ maxWidth: 180 }}>
      <g fill="none" stroke={theme.rule} strokeWidth="1">
        <line x1="60" y1="45" x2="30" y2="20" />
        <line x1="60" y1="45" x2="30" y2="70" />
        <line x1="60" y1="45" x2="120" y2="30" />
        <line x1="60" y1="45" x2="120" y2="60" />
        <line x1="120" y1="30" x2="155" y2="20" />
        <line x1="120" y1="60" x2="155" y2="70" />
      </g>
      <circle cx="60" cy="45" r="7" fill={theme.accent} />
      <circle cx="30" cy="20" r="4" fill={theme.ink} />
      <circle cx="30" cy="70" r="4" fill={theme.ink} />
      <circle cx="120" cy="30" r="5" fill={theme.accent} opacity="0.6" />
      <circle cx="120" cy="60" r="5" fill={theme.accent} opacity="0.6" />
      <circle cx="155" cy="20" r="3" fill={theme.ink} opacity="0.6" />
      <circle cx="155" cy="70" r="3" fill={theme.ink} opacity="0.6" />
    </svg>
  );
}

function ModelsGraphic({ theme, mono }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      {['claude-opus-4', 'gpt-5-mini', 'local: qwen3-32b'].map((m, i) => (
        <div
          key={m}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 10px',
            background: theme.paper,
            border: `1px solid ${theme.rule}`,
            borderRadius: 6,
            fontFamily: mono,
            fontSize: 11,
            color: theme.inkSoft,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: 6, background: i === 0 ? theme.accent : theme.rule }} />
          {m}
          {i === 0 && <span style={{ marginLeft: 'auto', fontSize: 9.5, color: theme.accent, letterSpacing: '0.1em' }}>ACTIVE</span>}
        </div>
      ))}
    </div>
  );
}

function BridgeGraphic({ theme, mono }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: mono, fontSize: 11 }}>
      <div style={{ padding: '6px 10px', border: `1px solid ${theme.rule}`, borderRadius: 5, background: theme.paper }}>radare2</div>
      <svg width="24" height="12"><path d="M0 6 L 22 6" stroke={theme.accent} strokeWidth="1" strokeDasharray="2 2" /><path d="M18 2 L 22 6 L 18 10" stroke={theme.accent} strokeWidth="1" fill="none" /></svg>
      <div style={{ padding: '6px 10px', background: theme.ink, color: theme.paper, borderRadius: 5 }}>MCP</div>
      <svg width="24" height="12"><path d="M0 6 L 22 6" stroke={theme.accent} strokeWidth="1" strokeDasharray="2 2" /><path d="M18 2 L 22 6 L 18 10" stroke={theme.accent} strokeWidth="1" fill="none" /></svg>
      <div style={{ padding: '6px 10px', border: `1px solid ${theme.rule}`, borderRadius: 5, background: theme.paper }}>Ghidra</div>
    </div>
  );
}

// ───────────────────── WORKFLOW ─────────────────────
function VAWorkflow({ theme, serif, mono }) {
  const steps = [
    {
      n: '01',
      title: 'Upload',
      body: 'Drop a PE, ELF, Mach-O, or raw firmware image. Binder detonates in a sandbox, unpacks if needed, and indexes strings, imports, and control flow.',
      code: 'stager_x64.elf · 412 KB · ELF · 64-bit',
    },
    {
      n: '02',
      title: 'Converse',
      body: "Ask in plain English. Binder answers with evidence — addresses, byte patterns, decoded strings — and keeps context across a whole session.",
      code: '> what\'s the C2?',
    },
    {
      n: '03',
      title: 'Annotate',
      body: 'Accept renames, stash notes, export as IDA / Ghidra / Binary Ninja database, or push back into your team\'s case file.',
      code: 'exported to case #CTI-2847 · 14 annotations',
    },
  ];
  return (
    <div style={{ padding: '140px 48px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <Reveal><SectionEyebrow mono={mono} theme={theme} num="04" text="HOW IT WORKS" /></Reveal>
        <Reveal y={28} duration={800}>
        <h2
          style={{
            fontFamily: serif,
            fontSize: 'clamp(40px, 4.4vw, 60px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            fontWeight: 400,
            margin: '20px 0 64px',
            maxWidth: 780,
          }}
        >
          Three steps between <em style={{ color: theme.accent, fontStyle: 'italic' }}>a strange binary</em> and a
          finished report.
        </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: `1px solid ${theme.rule}` }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120} y={24}>
            <div
              style={{
                padding: '48px 40px',
                borderRight: i < 2 ? `1px solid ${theme.rule}` : 'none',
                position: 'relative',
                height: '100%',
              }}
            >
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', color: theme.accent, marginBottom: 24 }}>
                {s.n}
              </div>
              <div style={{ fontFamily: serif, fontSize: 34, letterSpacing: '-0.01em', color: theme.ink, marginBottom: 14 }}>
                {s.title}
              </div>
              <div style={{ fontSize: 14.5, color: theme.inkSoft, lineHeight: 1.6, marginBottom: 20, textWrap: 'pretty' }}>
                {s.body}
              </div>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: 11.5,
                  color: theme.muted,
                  background: theme.paper,
                  padding: '8px 12px',
                  border: `1px solid ${theme.rule}`,
                  borderRadius: 6,
                  display: 'inline-block',
                }}
              >
                {s.code}
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────────────────── USE CASES ─────────────────────
function VAUseCases({ theme, serif, mono }) {
  const roles = [
    { role: 'Malware Analysts', verb: 'classify, extract, and contain', accent: 'samples you\'ve never seen before' },
    { role: 'Reverse Engineers', verb: 'rename, annotate, and understand', accent: 'stripped binaries in a fraction of the time' },
    { role: 'Vulnerability Researchers', verb: 'surface risky logic in', accent: 'commercial and firmware targets' },
    { role: 'Threat Intel Teams', verb: 'cluster, diff, and attribute', accent: 'incoming IOCs at scale' },
    { role: 'CTF Players', verb: 'unblock yourself on', accent: 'reversing and pwn challenges' },
    { role: 'Incident Responders', verb: 'triage unknown executables from', accent: 'endpoints during an investigation' },
  ];
  return (
    <div style={{ padding: '140px 48px', background: theme.paper, borderTop: `1px solid ${theme.rule}`, borderBottom: `1px solid ${theme.rule}` }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <Reveal><SectionEyebrow mono={mono} theme={theme} num="05" text="WHO IT'S FOR" /></Reveal>
        <Reveal y={28} duration={800}>
        <h2
          style={{
            fontFamily: serif,
            fontSize: 'clamp(40px, 4.4vw, 60px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            fontWeight: 400,
            margin: '20px 0 56px',
            maxWidth: 800,
          }}
        >
          Built for people who already know what they're doing.
        </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          {roles.map((r, i) => (
            <Reveal key={r.role} delay={(i % 2) * 80 + Math.floor(i / 2) * 100} y={20}>
            <div
              style={{
                padding: '28px 8px',
                borderTop: `1px solid ${theme.rule}`,
                borderBottom: i >= roles.length - 2 ? `1px solid ${theme.rule}` : 'none',
                paddingLeft: i % 2 === 1 ? 40 : 0,
                paddingRight: i % 2 === 0 ? 40 : 0,
                borderRight: i % 2 === 0 ? `1px solid ${theme.rule}` : 'none',
              }}
            >
              <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.16em', color: theme.muted, marginBottom: 8 }}>
                0{i + 1}
              </div>
              <div style={{ fontFamily: serif, fontSize: 26, letterSpacing: '-0.01em', color: theme.ink, marginBottom: 6 }}>
                {r.role}
              </div>
              <div style={{ fontSize: 15, color: theme.inkSoft, lineHeight: 1.55, textWrap: 'pretty' }}>
                {r.verb} <em style={{ color: theme.accent, fontFamily: serif, fontSize: 17 }}>{r.accent}</em>.
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────────────────── SECURITY ─────────────────────
function VASecurity({ theme, serif, mono }) {
  return (
    <div style={{ padding: '140px 48px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <Reveal y={24}>
        <div>
          <SectionEyebrow mono={mono} theme={theme} num="06" text="SECURITY & PRIVACY" />
          <h2
            style={{
              fontFamily: serif,
              fontSize: 'clamp(38px, 4vw, 56px)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              fontWeight: 400,
              margin: '20px 0 24px',
            }}
          >
            Your samples stay <em style={{ color: theme.accent, fontStyle: 'italic' }}>yours.</em>
          </h2>
          <p style={{ fontSize: 16.5, color: theme.inkSoft, lineHeight: 1.65, textWrap: 'pretty' }}>
            Uploads are processed in isolated sandboxes, encrypted at rest with per-tenant keys,
            and never used to train models. Deploy Binder in our cloud, in your VPC, or fully
            on-prem alongside your air-gapped tooling.
          </p>
        </div>
        </Reveal>
        <Reveal delay={150} y={30}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: theme.rule, borderRadius: 14, overflow: 'hidden', border: `1px solid ${theme.rule}` }}>
          {[
            ['SOC 2', 'Type II, in progress'],
            ['ISO 27001', 'Under audit'],
            ['Per-tenant keys', 'BYOK supported'],
            ['Zero training', 'On your data, ever'],
            ['VPC / on-prem', 'Terraform ready'],
            ['SSO & SCIM', 'Okta, Azure AD'],
          ].map(([k, v]) => (
            <div key={k} style={{ background: theme.paper, padding: '24px 22px' }}>
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', color: theme.accent, marginBottom: 8 }}>
                ✓ {k.toUpperCase()}
              </div>
              <div style={{ fontSize: 13.5, color: theme.inkSoft }}>{v}</div>
            </div>
          ))}
        </div>
        </Reveal>
      </div>
    </div>
  );
}

// ───────────────────── FAQ ─────────────────────
function VAFaq({ theme, serif, mono }) {
  const faqs = [
    {
      q: 'What formats does Binder support?',
      a: 'PE (.exe/.dll), ELF, Mach-O, most common firmware containers, APKs, and shellcode. Packed samples are unpacked before indexing. If you have a format we don\'t handle yet, tell us — we add them quickly.',
    },
    {
      q: 'Which models does it use?',
      a: 'Binder ships with Anthropic and OpenAI frontier models by default, and supports bring-your-own keys or self-hosted models for sensitive workloads. Different tasks route to different models.',
    },
    {
      q: 'Can it make mistakes?',
      a: 'Yes — language models hallucinate, and Binder is no exception. That\'s why every claim is grounded in a citation you can verify. Think of it as a fast, well-read junior analyst you always double-check.',
    },
    {
      q: 'Does it replace IDA, Ghidra, or Binary Ninja?',
      a: "No. Binder complements them. We ship first-class bridges for IDA and Ghidra, plus an MCP connector for radare2, so Binder's conversation and your disassembler stay in sync.",
    },
    {
      q: 'How is this priced?',
      a: 'Per-seat for individuals and small teams, with volume discounts for researchers. Enterprise plans include VPC deployment and unlimited samples. Academic and CTF licenses are free.',
    },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <div style={{ padding: '140px 48px', background: theme.paper, borderTop: `1px solid ${theme.rule}` }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <Reveal><SectionEyebrow mono={mono} theme={theme} num="07" text="QUESTIONS" /></Reveal>
        <Reveal y={28} duration={800}>
        <h2
          style={{
            fontFamily: serif,
            fontSize: 'clamp(40px, 4.4vw, 60px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            fontWeight: 400,
            margin: '20px 0 56px',
          }}
        >
          Sensible answers to reasonable questions.
        </h2>
        </Reveal>
        <div>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderTop: `1px solid ${theme.rule}`, borderBottom: i === faqs.length - 1 ? `1px solid ${theme.rule}` : 'none' }}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: '100%',
                  padding: '24px 0',
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', color: theme.muted, minWidth: 24 }}>
                  0{i + 1}
                </span>
                <span style={{ fontFamily: serif, fontSize: 24, letterSpacing: '-0.01em', color: theme.ink, flex: 1 }}>
                  {f.q}
                </span>
                <span
                  style={{
                    fontFamily: serif,
                    fontSize: 28,
                    color: theme.accent,
                    transition: 'transform 0.3s',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: open === i ? 200 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease, padding 0.3s',
                }}
              >
                <div style={{ padding: '0 0 28px 48px', fontSize: 16, color: theme.inkSoft, lineHeight: 1.65, textWrap: 'pretty', maxWidth: 680 }}>
                  {f.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────────────────── FOOTER / CTA ─────────────────────
function VAFooter({ theme, serif, mono }) {
  return (
    <div style={{ padding: '0 48px 48px' }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '40px auto 0',
          background: theme.ink,
          color: theme.paper,
          borderRadius: 20,
          padding: '96px 64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Hex backdrop */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.12,
            fontFamily: mono,
            fontSize: 12,
            color: theme.accent,
            lineHeight: 1.8,
            padding: 40,
            pointerEvents: 'none',
            wordBreak: 'break-all',
          }}
        >
          {'7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00 02 00 3e 00 01 00 00 00 b0 12 40 00 00 00 00 00 40 00 00 00 00 00 00 00 d0 41 00 00 00 00 00 00 '.repeat(30)}
        </div>

        <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 80, alignItems: 'end' }}>
          <Reveal y={30} duration={900}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', color: theme.accentSoft, marginBottom: 24 }}>
              — GET STARTED
            </div>
            <div
              style={{
                fontFamily: serif,
                fontSize: 'clamp(44px, 5vw, 72px)',
                lineHeight: 1,
                letterSpacing: '-0.025em',
                fontWeight: 400,
              }}
            >
              Stop staring at <em style={{ color: theme.accentSoft, fontStyle: 'italic' }}>sub_401ab0</em>.
              <br />
              Start asking it questions.
            </div>
          </div>
          <div>
            <p style={{ fontSize: 16, color: 'rgba(250,250,249,0.7)', lineHeight: 1.6, marginBottom: 28, textWrap: 'pretty' }}>
              See Binder against a real sample of yours. We'll walk through the analysis live and
              set you up with a trial account afterwards.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                style={{
                  padding: '14px 24px',
                  borderRadius: 999,
                  background: theme.accent,
                  color: theme.paper,
                  border: 'none',
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Request a demo →
              </button>
            </div>
          </div>
          </Reveal>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '40px auto 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 12.5,
          color: theme.muted,
          fontFamily: mono,
          letterSpacing: '0.05em',
        }}
      >
        <div>© 2026 BINDER RESEARCH, INC.</div>
        <div style={{ display: 'flex', gap: 28 }}>
          <span>PRIVACY</span>
          <span>TERMS</span>
          <span>SECURITY</span>
          <span>STATUS · OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { VAFeatures, VAWorkflow, VAUseCases, VASecurity, VAFaq, VAFooter });
