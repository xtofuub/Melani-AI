// Variation A — Melani
// Monochrome base (pure B&W CTAs, zinc scale) + muted blue-violet brand accent.
// Typography: Space Grotesk for brand/UI, Space Mono for the lockup, JetBrains Mono for code.

function createMelaniTheme(dark) {
  if (dark) {
    return {
      mode: 'dark',
      bg: '#09090b',
      // zinc-950
      paper: '#0f0f12',
      panel: '#141418',
      cream: '#1a1a1f',
      ink: '#fafafa',
      // zinc-50
      inkSoft: '#d4d4d8',
      // zinc-300
      muted: '#a1a1aa',
      // zinc-400
      rule: '#27272a',
      // zinc-800
      accent: '#fafafa',
      // white CTA on dark (mirrors black-on-light)
      accentSoft: '#d4d4d8',
      // zinc-300
      success: '#22c55e',
      solid: '#050507',
      solidText: '#fafafa',
      primaryBg: '#fafafa',
      primaryText: '#09090b',
      primaryHover: '#ffffff',
      navGlass: 'rgba(9,9,11,0.72)',
      navHover: 'rgba(250,250,250,0.06)',
      navShadow: '0 1px 0 rgba(255,255,255,0.04), 0 20px 48px -24px rgba(0,0,0,0.9)',
      elevatedShadow: '0 30px 80px -30px rgba(0,0,0,0.85), 0 10px 28px -16px rgba(0,0,0,0.6)',
      cardHoverShadow: '0 24px 40px -24px rgba(0,0,0,0.8)',
      logoFrom: '#27272a',
      logoTo: '#09090b',
      logoRing: 'rgba(250,250,250,0.1)',
      logoInset: 'rgba(255,255,255,0.06)',
      logoShadow: 'rgba(0,0,0,0.8)',
      accentRing: 'rgba(250,250,250,0.08)',
      terminalAccent: '#0062D1',
      terminalWrap: '#0f0f12',
      terminalBorder: '#27272a',
      footerText: 'rgba(250,250,250,0.78)',
      footerTextSoft: 'rgba(250,250,250,0.58)',
      footerTextMuted: 'rgba(250,250,250,0.48)',
      footerBorder: 'rgba(250,250,250,0.08)',
      footerGhostBorder: 'rgba(250,250,250,0.24)',
      footerGhostBorderHover: 'rgba(250,250,250,0.44)',
      footerGhostBgHover: 'rgba(250,250,250,0.06)',
      accentGlow: 'rgba(0,98,209,0.45)',
      accentGlowZero: 'rgba(0,98,209,0)',
      brand: '#0062D1',
      brandRing: 'rgba(0,98,209,0.22)',
      brandSoft: 'rgba(0,98,209,0.14)',
      heroDotGrid: 'rgba(255,255,255,0.03)'
    };
  }
  return {
    mode: 'light',
    bg: '#ffffff',
    // glaze pure white (page)
    paper: '#f7f7f6',
    // subtly tinted — creates section delta
    panel: '#efeeec',
    // nested surface
    cream: '#e8e7e4',
    // deepest cream
    ink: '#000000',
    // pure black for max contrast
    inkSoft: '#1a1a1a',
    muted: '#717171',
    // glaze signature gray
    rule: '#e5e5e5',
    accent: '#000000',
    // monochrome — CTA is black
    accentSoft: '#404040',
    success: '#22c55e',
    solid: '#000000',
    solidText: '#ffffff',
    primaryBg: '#000000',
    primaryText: '#ffffff',
    primaryHover: '#1a1a1a',
    navGlass: 'rgba(255,255,255,0.8)',
    navHover: 'rgba(0,0,0,0.04)',
    navShadow: '0 1px 0 rgba(0,0,0,0.04), 0 8px 24px -16px rgba(0,0,0,0.08)',
    elevatedShadow: '0 30px 80px -30px rgba(0,0,0,0.12), 0 10px 30px -15px rgba(0,0,0,0.06)',
    cardHoverShadow: '0 20px 40px -20px rgba(0,0,0,0.1)',
    logoFrom: '#1a1a1a',
    logoTo: '#000000',
    logoRing: 'rgba(0,0,0,0.9)',
    logoInset: 'rgba(255,255,255,0.06)',
    logoShadow: 'rgba(0,0,0,0.3)',
    accentRing: 'rgba(0,0,0,0.08)',
    terminalAccent: '#000000',
    terminalWrap: '#ffffff',
    terminalBorder: '#e5e5e5',
    footerText: 'rgba(255,255,255,0.78)',
    footerTextSoft: 'rgba(255,255,255,0.58)',
    footerTextMuted: 'rgba(255,255,255,0.48)',
    footerBorder: 'rgba(255,255,255,0.08)',
    footerGhostBorder: 'rgba(255,255,255,0.28)',
    footerGhostBorderHover: 'rgba(255,255,255,0.55)',
    footerGhostBgHover: 'rgba(255,255,255,0.06)',
    accentGlow: 'rgba(0,0,0,0.35)',
    accentGlowZero: 'rgba(0,0,0,0)',
    brand: '#0062D1',
    brandRing: 'rgba(0,98,209,0.16)',
    brandSoft: 'rgba(0,98,209,0.10)',
    heroDotGrid: 'rgba(18,18,18,0.04)'
  };
}
function scrollToId(id) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({
    behavior: reduce ? 'auto' : 'smooth',
    block: 'start'
  });
}
function VariationA() {
  const [dark, setDark] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.__BINDER_TWEAKS__ && typeof window.__BINDER_TWEAKS__.dark === 'boolean') {
      return window.__BINDER_TWEAKS__.dark;
    }
    try {
      const stored = localStorage.getItem('binder-theme');
      if (stored) return stored === 'dark';
    } catch (err) {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const theme = React.useMemo(() => createMelaniTheme(dark), [dark]);

  // Vercel-style: Geist for display + UI, Geist Mono for code/labels.
  const serif = "'Geist', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";
  const sans = "'Geist', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";
  const mono = "'Geist Mono', 'JetBrains Mono', 'SF Mono', monospace";
  const brandMono = "'Geist Mono', 'JetBrains Mono', monospace";
  React.useEffect(() => {
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    document.body.style.background = theme.bg;
    if (window.__BINDER_TWEAKS__) window.__BINDER_TWEAKS__.dark = dark;
    try {
      localStorage.setItem('binder-theme', dark ? 'dark' : 'light');
    } catch (err) {}
  }, [dark, theme.bg]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: theme.bg,
      color: theme.ink,
      fontFamily: sans,
      minHeight: '100%',
      position: 'relative',
      transition: 'background .25s ease, color .25s ease'
    }
  }, /*#__PURE__*/React.createElement(ScrollProgress, {
    color: theme.brand
  }), /*#__PURE__*/React.createElement(SectionBeacon, {
    ids: ['hero', 'story', 'problem', 'workspace', 'features', 'collab', 'workflow', 'usecases', 'security', 'pricing', 'faq'],
    labels: ['Intro', 'Session', 'Promise', 'Workspace', 'Features', 'Collab', 'Workflow', 'Use cases', 'Security', 'Pricing', 'FAQ'],
    accent: theme.brand,
    ink: theme.ink
  }), /*#__PURE__*/React.createElement(VANav, {
    theme: theme,
    serif: serif,
    sans: sans,
    mono: mono,
    brandMono: brandMono,
    isDark: dark,
    onToggleDark: () => setDark(value => !value)
  }), /*#__PURE__*/React.createElement("section", {
    id: "hero"
  }, /*#__PURE__*/React.createElement(VAHero, {
    theme: theme,
    serif: serif,
    sans: sans,
    mono: mono
  })), /*#__PURE__*/React.createElement(VAMarquee, {
    theme: theme,
    mono: mono
  }), /*#__PURE__*/React.createElement("section", {
    id: "story"
  }, /*#__PURE__*/React.createElement(VAScrollStory, {
    theme: theme,
    serif: serif,
    mono: mono
  })), /*#__PURE__*/React.createElement("section", {
    id: "problem"
  }, /*#__PURE__*/React.createElement(VAProblem, {
    theme: theme,
    serif: serif,
    mono: mono
  })), /*#__PURE__*/React.createElement("section", {
    id: "workspace"
  }, /*#__PURE__*/React.createElement(VAWorkspace, {
    theme: theme,
    serif: serif,
    mono: mono,
    brandMono: brandMono
  })), /*#__PURE__*/React.createElement("section", {
    id: "features"
  }, /*#__PURE__*/React.createElement(VAFeatures, {
    theme: theme,
    serif: serif,
    mono: mono
  })), /*#__PURE__*/React.createElement("section", {
    id: "collab"
  }, /*#__PURE__*/React.createElement(VACollab, {
    theme: theme,
    serif: serif,
    mono: mono
  })), /*#__PURE__*/React.createElement("section", {
    id: "workflow"
  }, /*#__PURE__*/React.createElement(VAWorkflow, {
    theme: theme,
    serif: serif,
    mono: mono
  })), /*#__PURE__*/React.createElement("section", {
    id: "usecases"
  }, /*#__PURE__*/React.createElement(VAUseCases, {
    theme: theme,
    serif: serif,
    mono: mono
  })), /*#__PURE__*/React.createElement("section", {
    id: "security"
  }, /*#__PURE__*/React.createElement(VASecurity, {
    theme: theme,
    serif: serif,
    mono: mono
  })), /*#__PURE__*/React.createElement("section", {
    id: "pricing"
  }, /*#__PURE__*/React.createElement(VAPricing, {
    theme: theme,
    serif: serif,
    mono: mono
  })), /*#__PURE__*/React.createElement("section", {
    id: "faq"
  }, /*#__PURE__*/React.createElement(VAFaq, {
    theme: theme,
    serif: serif,
    mono: mono
  })), /*#__PURE__*/React.createElement(VAFooter, {
    theme: theme,
    serif: serif,
    mono: mono,
    brandMono: brandMono
  }));
}

// ───────────────────── NAV ─────────────────────
function VANav({
  theme,
  serif,
  sans,
  mono,
  brandMono,
  isDark,
  onToggleDark
}) {
  const {
    isMobile,
    isTablet
  } = useResponsive();
  const [scrolled, setScrolled] = React.useState(false);
  const [hoverIdx, setHoverIdx] = React.useState(-1);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  React.useEffect(() => {
    if (!isTablet) setMobileOpen(false);
  }, [isTablet]);
  const links = [{
    label: 'Workspace',
    href: '#workspace',
    menu: true
  }, {
    label: 'Features',
    href: '#features',
    menu: false
  }, {
    label: 'Workflow',
    href: '#workflow',
    menu: false
  }, {
    label: 'Security',
    href: '#security',
    menu: true
  }, {
    label: 'Pricing',
    href: '#pricing',
    menu: false
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled || mobileOpen ? theme.navGlass : 'transparent',
      backdropFilter: scrolled || mobileOpen ? 'blur(14px) saturate(1.3)' : 'none',
      WebkitBackdropFilter: scrolled || mobileOpen ? 'blur(14px) saturate(1.3)' : 'none',
      borderBottom: `1px solid ${scrolled || mobileOpen ? theme.rule : 'transparent'}`,
      boxShadow: scrolled ? theme.navShadow : 'none',
      transition: 'background .25s ease, border-color .25s ease, box-shadow .25s ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: isMobile ? '12px 18px' : isTablet ? '13px 28px' : '14px 40px',
      display: 'flex',
      alignItems: 'center',
      gap: isTablet ? 16 : 36
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#hero",
    style: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: theme.ink,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: sans,
      fontSize: isMobile ? 19 : 21,
      letterSpacing: '-0.045em',
      fontWeight: 600,
      lineHeight: 1
    }
  }, "melani"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 5,
      height: 5,
      borderRadius: 999,
      background: theme.brand,
      marginLeft: 3,
      marginBottom: -2,
      alignSelf: 'flex-end'
    }
  })), !isTablet && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 22,
      background: theme.rule,
      opacity: 0.7
    }
  }), !isTablet && /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 4,
      flex: 1,
      fontFamily: sans,
      fontSize: 13.5,
      fontWeight: 500,
      color: theme.inkSoft
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href,
    onMouseEnter: () => setHoverIdx(i),
    onMouseLeave: () => setHoverIdx(-1),
    style: {
      position: 'relative',
      padding: '8px 14px',
      borderRadius: 7,
      color: hoverIdx === i ? theme.ink : theme.inkSoft,
      background: hoverIdx === i ? theme.navHover : 'transparent',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      transition: 'color .15s ease, background .15s ease'
    }
  }, l.label, l.menu && /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "9",
    viewBox: "0 0 10 10",
    fill: "none",
    style: {
      opacity: 0.55,
      transform: hoverIdx === i ? 'translateY(1px)' : 'translateY(0)',
      transition: 'transform .15s ease'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3 3 3-3",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(ThemeToggleButton, {
    theme: theme,
    isDark: isDark,
    onToggle: onToggleDark
  }), !isTablet && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: 4,
      borderRadius: 999,
      border: `1px solid ${theme.rule}`,
      background: theme.paper,
      boxShadow: scrolled ? '0 10px 28px -22px rgba(15, 12, 9, 0.28)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(VAButton, {
    theme: theme,
    variant: "ghost",
    onClick: () => scrollToId('workspace'),
    style: {
      border: 'none',
      background: 'transparent',
      padding: '11px 16px',
      minHeight: 42,
      color: theme.inkSoft
    }
  }, "See workspace"), /*#__PURE__*/React.createElement(VAButton, {
    theme: theme,
    onClick: () => scrollToId('footer-cta'),
    style: {
      padding: '11px 18px',
      minHeight: 42
    }
  }, "Join waitlist")), isTablet && /*#__PURE__*/React.createElement(IconButton, {
    theme: theme,
    title: mobileOpen ? 'Close menu' : 'Open menu',
    onClick: () => setMobileOpen(value => !value)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none"
  }, mobileOpen ? /*#__PURE__*/React.createElement("path", {
    d: "M4 4l10 10M14 4L4 14",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }) : /*#__PURE__*/React.createElement("path", {
    d: "M3.5 5h11M3.5 9h11M3.5 13h11",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }))))), isTablet && /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: mobileOpen ? 360 : 0,
      opacity: mobileOpen ? 1 : 0,
      overflow: 'hidden',
      transition: 'max-height .28s ease, opacity .2s ease',
      borderTop: mobileOpen ? `1px solid ${theme.rule}` : '1px solid transparent'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: isMobile ? '12px 18px 22px' : '16px 28px 24px'
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'grid',
      gap: 6
    }
  }, links.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.label,
    href: link.href,
    onClick: () => setMobileOpen(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 0',
      color: theme.ink,
      textDecoration: 'none',
      borderBottom: `1px solid ${theme.rule}`,
      fontFamily: sans,
      fontSize: isMobile ? 17 : 18,
      fontWeight: 500
    }
  }, link.label, link.menu && /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "9",
    viewBox: "0 0 10 10",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3 3 3-3",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 18,
      flexDirection: isMobile ? 'column' : 'row'
    }
  }, /*#__PURE__*/React.createElement(VAButton, {
    theme: theme,
    onClick: () => {
      setMobileOpen(false);
      scrollToId('footer-cta');
    },
    style: isMobile ? {
      width: '100%',
      justifyContent: 'center'
    } : undefined
  }, "Join waitlist"), /*#__PURE__*/React.createElement(VAButton, {
    theme: theme,
    variant: "ghost",
    onClick: () => {
      setMobileOpen(false);
      scrollToId('workspace');
    },
    style: isMobile ? {
      width: '100%',
      justifyContent: 'center'
    } : undefined
  }, "See live workspace")))));
}
function MelaniMark({
  theme,
  size = 32
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: 8,
      background: `linear-gradient(145deg, ${theme.logoFrom} 0%, ${theme.solid} 55%, ${theme.logoTo} 100%)`,
      position: 'relative',
      flexShrink: 0,
      boxShadow: `
        0 0 0 1px ${theme.logoRing},
        0 1px 0 ${theme.logoInset} inset,
        0 6px 14px -6px ${theme.logoShadow}
      `
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      fontFamily: "'Space Mono', 'JetBrains Mono', monospace",
      fontSize: size * 0.5,
      fontWeight: 700,
      color: theme.solidText,
      lineHeight: 1,
      letterSpacing: '-0.05em',
      paddingBottom: size * 0.04
    }
  }, "b"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: size * 0.22,
      right: size * 0.22,
      bottom: size * 0.18,
      height: 1.5,
      background: theme.brand,
      borderRadius: 1
    }
  }));
}
function VAButton({
  theme,
  children,
  variant = 'primary',
  onClick,
  style
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '10px 18px',
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 500,
    fontFamily: 'inherit',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.18s ease',
    textDecoration: 'none',
    ...style
  };
  if (variant === 'primary') {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onClick,
      style: {
        ...base,
        background: theme.primaryBg,
        color: theme.primaryText
      },
      onMouseEnter: e => {
        e.currentTarget.style.background = theme.primaryHover;
        e.currentTarget.style.transform = 'translateY(-1px)';
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = theme.primaryBg;
        e.currentTarget.style.transform = 'translateY(0)';
      }
    }, children, /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 14 14",
      fill: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5",
      stroke: "currentColor",
      strokeWidth: "1.3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })));
  }
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      ...base,
      background: 'transparent',
      color: theme.ink,
      border: `1px solid ${theme.rule}`
    },
    onMouseEnter: e => e.currentTarget.style.background = theme.cream,
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, children);
}
function IconButton({
  theme,
  title,
  onClick,
  children
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    title: title,
    "aria-label": title,
    onClick: onClick,
    style: {
      width: 42,
      height: 42,
      borderRadius: 999,
      border: `1px solid ${theme.rule}`,
      background: 'transparent',
      color: theme.ink,
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
      transition: 'background .15s ease, transform .15s ease, border-color .15s ease'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = theme.cream;
      e.currentTarget.style.transform = 'translateY(-1px)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'transparent';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, children);
}
function ThemeToggleButton({
  theme,
  isDark,
  onToggle
}) {
  return /*#__PURE__*/React.createElement(IconButton, {
    theme: theme,
    title: isDark ? 'Switch to light mode' : 'Switch to dark mode',
    onClick: onToggle
  }, isDark ? /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "9",
    r: "3.4",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 1.75v2.1M9 14.15v2.1M16.25 9h-2.1M3.85 9h-2.1M14.13 3.87l-1.49 1.49M5.36 12.64l-1.49 1.49M14.13 14.13l-1.49-1.49M5.36 5.36L3.87 3.87",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14.3 10.92A6.15 6.15 0 0 1 7.08 3.7 6.4 6.4 0 1 0 14.3 10.92Z",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}

// ───────────────────── HERO ─────────────────────
function VAHero({
  theme,
  serif,
  sans,
  mono
}) {
  const {
    isMobile,
    isTablet
  } = useResponsive();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      minHeight: isTablet ? 'auto' : 720
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: isMobile ? 170 : 120,
      left: 0,
      right: 0,
      pointerEvents: 'none',
      transform: 'rotate(-1.5deg)',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(BinaryStrip, {
    speed: 80,
    opacity: 0.18,
    color: theme.muted,
    density: 60
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: isMobile ? 40 : 120,
      left: 0,
      right: 0,
      pointerEvents: 'none',
      transform: 'rotate(1deg)',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(BinaryStrip, {
    speed: 110,
    opacity: 0.12,
    color: theme.muted,
    density: 60
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: isMobile ? '56px 24px 56px' : isTablet ? '72px 32px 64px' : '88px 48px 72px',
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: isTablet ? '1fr' : '1.05fr 1fr',
      gap: isMobile ? 44 : isTablet ? 56 : 72,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, {
    y: 12,
    duration: 600
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '6px 14px 6px 8px',
      borderRadius: 999,
      background: theme.paper,
      border: `1px solid ${theme.rule}`,
      fontSize: 12.5,
      color: theme.inkSoft,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: mono,
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.16em',
      padding: '3px 9px',
      borderRadius: 999,
      background: theme.brand,
      color: '#ffffff'
    }
  }, "NEW"), "Multi-sample clustering is live", /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 10 10",
    style: {
      marginLeft: 2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2l3 3-3 3",
    stroke: "currentColor",
    strokeWidth: "1.2",
    fill: "none",
    strokeLinecap: "round"
  })))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100,
    y: 40,
    duration: 900
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: sans,
      fontSize: isMobile ? 'clamp(48px, 13vw, 64px)' : isTablet ? 'clamp(60px, 9vw, 80px)' : 'clamp(52px, 5.8vw, 84px)',
      lineHeight: 1.02,
      letterSpacing: '-0.035em',
      fontWeight: 600,
      margin: 0,
      color: theme.ink
    }
  }, "From bytes", /*#__PURE__*/React.createElement("br", null), "to ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.brand,
      fontFamily: "'Instrument Serif', 'Times New Roman', serif",
      fontStyle: 'italic',
      fontWeight: 400,
      letterSpacing: '-0.02em'
    }
  }, "clarity"), ",", /*#__PURE__*/React.createElement("br", null), "in minutes.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 260,
    y: 20
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: isMobile ? 18 : 19,
      lineHeight: 1.55,
      color: theme.inkSoft,
      marginTop: 32,
      maxWidth: isTablet ? 620 : 520,
      textWrap: 'pretty'
    }
  }, "Melani is a browser-based reverse-engineering workspace with AI built in. Upload an", ' ', /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: mono,
      fontSize: '0.92em',
      color: theme.brand,
      fontWeight: 500
    }
  }, ".exe"), ",", ' ', /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: mono,
      fontSize: '0.92em',
      color: theme.brand,
      fontWeight: 500
    }
  }, ".dll"), ", or", ' ', /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: mono,
      fontSize: '0.92em',
      color: theme.brand,
      fontWeight: 500
    }
  }, ".elf"), ' ', "and inspect disassembly, decompiler output, strings, imports, and AI answers in one dashboard. Every answer points back to the bytes that support it.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 400,
    y: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 40,
      alignItems: 'center',
      flexDirection: isMobile ? 'column' : 'row',
      flexWrap: 'wrap',
      width: isMobile ? '100%' : 'auto'
    }
  }, /*#__PURE__*/React.createElement(VAButton, {
    theme: theme,
    onClick: () => scrollToId('footer-cta'),
    style: isMobile ? {
      width: '100%'
    } : undefined
  }, "Join waitlist"), /*#__PURE__*/React.createElement(VAButton, {
    theme: theme,
    variant: "ghost",
    onClick: () => scrollToId('workspace'),
    style: isMobile ? {
      width: '100%'
    } : undefined
  }, "See live workspace"))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 520,
    y: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: isMobile ? 42 : 56,
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))',
      gap: isMobile ? 18 : 36,
      fontSize: 12.5,
      color: theme.muted
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    mono: mono,
    theme: theme,
    label: "Disassembly, decompiler, strings, imports, and notes in one dashboard."
  }, /*#__PURE__*/React.createElement("span", null, "Full RE workspace")), /*#__PURE__*/React.createElement(Stat, {
    mono: mono,
    theme: theme,
    label: "Every claim links to addresses and bytes."
  }, /*#__PURE__*/React.createElement("span", null, "Cited evidence")), /*#__PURE__*/React.createElement(Stat, {
    mono: mono,
    theme: theme,
    label: "Samples isolated per workspace. Yours stay yours."
  }, /*#__PURE__*/React.createElement("span", null, "Private by default"))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 350,
    y: 30,
    duration: 900,
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: isTablet ? 720 : 'none',
      justifySelf: isTablet ? 'stretch' : 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: isMobile ? -18 : -24,
      left: isMobile ? 0 : -24,
      fontFamily: mono,
      fontSize: 10.5,
      letterSpacing: '0.16em',
      color: theme.muted
    }
  }, "01 \u2014 LIVE ANALYSIS"), /*#__PURE__*/React.createElement(ChatDemo, {
    variant: "editorial",
    theme: theme
  }), /*#__PURE__*/React.createElement("div", {
    style: {
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
      display: isMobile ? 'none' : 'block'
    }
  }, "\u201D")))));
}
function Stat({
  num,
  label,
  mono,
  theme,
  children
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 26,
      color: theme.ink,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1
    }
  }, children ?? num), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 13,
      color: theme.muted,
      lineHeight: 1.4,
      textWrap: 'pretty',
      maxWidth: 150
    }
  }, label));
}

// ───────────────────── MARQUEE ─────────────────────
function VAMarquee({
  theme,
  mono
}) {
  const {
    isMobile
  } = useResponsive();
  const items = ['MALWARE LABS', 'INCIDENT RESPONSE', 'THREAT INTEL', 'VULN RESEARCH', 'CTF TEAMS', 'FIRMWARE TEARDOWN', 'INDIE RESEARCHERS', 'RED TEAMS'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${theme.rule}`,
      borderBottom: `1px solid ${theme.rule}`,
      padding: isMobile ? '22px 0' : '28px 0',
      overflow: 'hidden',
      background: theme.paper
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: isMobile ? '0 24px' : '0 48px',
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? 18 : 40,
      flexDirection: isMobile ? 'column' : 'row'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 10.5,
      letterSpacing: '0.18em',
      color: theme.muted,
      flexShrink: 0,
      alignSelf: isMobile ? 'flex-start' : 'auto'
    }
  }, "BUILT FOR"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'hidden',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 56,
      animation: 'marquee 40s linear infinite',
      width: 'max-content'
    }
  }, [...items, ...items].map((name, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontFamily: mono,
      fontSize: 13,
      letterSpacing: '0.14em',
      color: theme.inkSoft,
      fontWeight: 500,
      whiteSpace: 'nowrap'
    }
  }, name))))));
}

// ───────────────────── PROBLEM / PROMISE ─────────────────────
function VAProblem({
  theme,
  serif,
  mono
}) {
  const {
    isMobile,
    isTablet
  } = useResponsive();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: isMobile ? '92px 24px' : isTablet ? '116px 32px' : '140px 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1120,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionEyebrow, {
    mono: mono,
    theme: theme,
    num: "02",
    text: "THE PROMISE"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
      gap: isTablet ? 30 : 72,
      marginTop: 24,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    y: 28,
    duration: 800
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: serif,
      fontSize: isMobile ? 'clamp(40px, 11vw, 54px)' : isTablet ? 'clamp(44px, 7vw, 62px)' : 'clamp(46px, 4vw, 58px)',
      lineHeight: 1.08,
      letterSpacing: '-0.015em',
      fontWeight: 600,
      margin: 0,
      color: theme.ink
    }
  }, "Reverse engineering is slow, lonely, and mentally expensive.", ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.brand,
      textShadow: `0 0 26px ${theme.brandSoft}`
    }
  }, "We built Melani so it isn't."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 150,
    y: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: isMobile ? 16 : 17,
      lineHeight: 1.72,
      color: theme.inkSoft,
      paddingTop: isTablet ? 0 : 8,
      maxWidth: 540,
      borderLeft: !isMobile ? `1px solid ${theme.rule}` : 'none',
      paddingLeft: !isMobile ? 28 : 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      textWrap: 'pretty'
    }
  }, "An analyst can spend hours just getting oriented before real work begins: stripped symbols, opaque call graphs, encoded strings, packed code, and notes scattered across local tools."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 20,
      marginBottom: 0,
      textWrap: 'pretty'
    }
  }, "Melani puts assembly, decompiler output, strings, imports, comments, and AI chat in the same browser workspace. It surfaces suspicious logic and grounds every answer in exact addresses and bytes."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 20,
      marginBottom: 0,
      textWrap: 'pretty'
    }
  }, "The goal is not to hide the complexity. It is to keep the investigation moving: every rename, hypothesis, and answer stays tied to the evidence underneath it.")))), /*#__PURE__*/React.createElement(Reveal, {
    y: 40,
    duration: 900
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: isMobile ? 56 : 80,
      display: 'grid',
      gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
      background: theme.paper,
      border: `1px solid ${theme.rule}`,
      borderRadius: 16,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: isMobile ? '28px 24px' : '40px 40px',
      borderRight: isTablet ? 'none' : `1px solid ${theme.rule}`,
      borderBottom: isTablet ? `1px solid ${theme.rule}` : 'none',
      borderTop: `2px solid ${theme.rule}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: theme.muted,
      display: 'inline-block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: mono,
      fontSize: 10.5,
      letterSpacing: '0.2em',
      color: theme.muted,
      fontWeight: 600
    }
  }, "BEFORE")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: isMobile ? 11 : 12.5,
      lineHeight: 1.75,
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: theme.inkSoft,
      fontWeight: 600,
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.muted
    }
  }, "sub_401ab0"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.muted
    }
  }, "()")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.muted
    }
  }, "\xA0\xA0push"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.mode === 'dark' ? '#a1a1aa' : '#525252'
    }
  }, "rbp")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.muted
    }
  }, "\xA0\xA0mov"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.mode === 'dark' ? '#a1a1aa' : '#525252'
    }
  }, "rbp, rsp")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.muted
    }
  }, "\xA0\xA0sub"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.mode === 'dark' ? '#a1a1aa' : '#525252'
    }
  }, "rsp, "), /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.mode === 'dark' ? '#71717a' : '#737373'
    }
  }, "0x40")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.muted
    }
  }, "\xA0\xA0mov"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.mode === 'dark' ? '#a1a1aa' : '#525252'
    }
  }, "rdi, [rbp-"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.mode === 'dark' ? '#71717a' : '#737373'
    }
  }, "0x20"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.mode === 'dark' ? '#a1a1aa' : '#525252'
    }
  }, "]")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.muted
    }
  }, "\xA0\xA0call"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.mode === 'dark' ? '#52525b' : '#a3a3a3'
    }
  }, "sub_4012a0")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.muted
    }
  }, "\xA0\xA0test"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.mode === 'dark' ? '#a1a1aa' : '#525252'
    }
  }, "eax, eax")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.muted
    }
  }, "\xA0\xA0jz short"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.mode === 'dark' ? '#52525b' : '#a3a3a3'
    }
  }, "loc_401b40")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: theme.mode === 'dark' ? '#3f3f46' : '#d4d4d4'
    }
  }, "\xA0\xA0...")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      fontFamily: serif,
      fontStyle: 'italic',
      fontSize: isMobile ? 17 : 19,
      color: theme.muted,
      lineHeight: 1.45,
      paddingTop: 24,
      borderTop: `1px solid ${theme.rule}`,
      textWrap: 'pretty'
    }
  }, "\"What is this function even doing?\"")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: isMobile ? '28px 24px' : '40px 40px',
      background: theme.mode === 'dark' ? theme.panel : '#fafafa',
      borderTop: `2px solid ${theme.brand}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: theme.brand,
      display: 'inline-block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: mono,
      fontSize: 10.5,
      letterSpacing: '0.2em',
      color: theme.brand,
      fontWeight: 600
    }
  }, "AFTER \xB7 MELANI")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: isMobile ? 11 : 12.5,
      lineHeight: 1.75,
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.brand
    }
  }, "decrypt_and_execute"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.inkSoft
    }
  }, "(buf, key)")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.muted,
      fontStyle: 'italic'
    }
  }, "\xA0\xA0", '// xor-decrypts buf with 32-byte key @ 0x4010')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.muted,
      fontStyle: 'italic'
    }
  }, "\xA0\xA0", '// then jumps to the decrypted buffer')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.muted
    }
  }, "\xA0\xA0call"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.brand
    }
  }, "xor_buffer")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.muted
    }
  }, "\xA0\xA0test"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.mode === 'dark' ? '#a1a1aa' : '#525252'
    }
  }, "eax, eax")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.muted
    }
  }, "\xA0\xA0jz short"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.brand
    }
  }, "integrity_fail")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: theme.mode === 'dark' ? '#3f3f46' : '#d4d4d4'
    }
  }, "\xA0\xA0...")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      fontFamily: serif,
      fontStyle: 'italic',
      fontSize: isMobile ? 17 : 19,
      color: theme.ink,
      lineHeight: 1.45,
      paddingTop: 24,
      borderTop: `1px solid ${theme.rule}`,
      textWrap: 'pretty'
    }
  }, "\"Oh. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.brand,
      fontStyle: 'normal',
      fontWeight: 700
    }
  }, "Now"), " I know what to look for.\""))))));
}
function SectionEyebrow({
  mono,
  theme,
  num,
  text
}) {
  const {
    isMobile
  } = useResponsive();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? 10 : 12,
      marginBottom: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 18,
      height: 2,
      background: theme.brand,
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: mono,
      fontSize: 11,
      letterSpacing: '0.2em',
      color: theme.brand,
      fontWeight: 600
    }
  }, num), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: mono,
      fontSize: 11,
      letterSpacing: '0.2em',
      color: theme.muted,
      fontWeight: 500
    }
  }, text));
}

// ───────────────────── SCROLLYTELLING (pinned + scrubbed reveal) ─────────────────────
function VAScrollStory({
  theme,
  serif,
  mono
}) {
  const {
    isMobile,
    isTablet
  } = useResponsive();
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
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    window.addEventListener('resize', onScroll);
    compute();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Stanzas — each an array of words. Progress drives word-by-word reveal.
  const stanzas = [['Upload', 'a', 'strange', 'binary.'], ['Ask', 'it,', 'in', 'plain', 'English,', 'what', "it's", 'doing.'], ['Get', 'an', 'answer', '—', 'with', 'the', 'exact', 'bytes', 'to', 'prove', 'it.']];
  const compactRows = [['Upload', 'a', 'strange', 'binary.'], ['Ask', 'it,', 'in', 'plain', 'English,'], ['what', "it's", 'doing.'], ['Get', 'an', 'answer', '—'], ['with', 'the', 'exact', 'bytes'], ['to', 'prove', 'it.']];
  const storyRows = isTablet ? compactRows : stanzas;
  const flat = [];
  stanzas.forEach((s, si) => s.forEach((w, wi) => flat.push({
    w,
    si,
    wi,
    last: wi === s.length - 1
  })));
  const totalWords = flat.length;

  // Reveal window: start a little after pin begins, finish before pin ends.
  const revealStart = 0.08;
  const revealEnd = 0.82;
  const wordProgress = i => {
    const span = revealEnd - revealStart;
    const per = span / totalWords;
    const wStart = revealStart + i * per;
    const wEnd = wStart + per * 2.2; // overlap so words cascade smoothly
    return Math.max(0, Math.min(1, (progress - wStart) / (wEnd - wStart)));
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    style: {
      height: isMobile ? '280vh' : '320vh',
      position: 'relative',
      background: theme.bg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: isMobile ? '0 24px' : isTablet ? '0 32px' : '0 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      background: theme.rule
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${progress * 100}%`,
      background: theme.accent,
      transition: 'width 0.05s linear'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1120,
      margin: '0 auto',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: isMobile ? 30 : 48,
      fontFamily: mono,
      fontSize: isMobile ? 10 : 10.5,
      letterSpacing: '0.18em',
      color: theme.muted,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.accent
    }
  }, "01"), /*#__PURE__*/React.createElement("span", null, "SESSION FLOW"), !isMobile && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: theme.rule
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.accent,
      fontVariantNumeric: 'tabular-nums'
    }
  }, String(Math.round(progress * 100)).padStart(2, '0'), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: serif,
      fontSize: isMobile ? 'clamp(31px, 9vw, 42px)' : isTablet ? 'clamp(34px, 4.2vw, 44px)' : 'clamp(40px, 5.4vw, 80px)',
      lineHeight: isTablet ? 1.08 : 1.12,
      letterSpacing: '-0.02em',
      fontWeight: 600,
      color: theme.ink,
      maxWidth: 1000
    }
  }, storyRows.map((s, si) => /*#__PURE__*/React.createElement("div", {
    key: si,
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      columnGap: '0.28em',
      rowGap: '0.04em',
      marginBottom: si < storyRows.length - 1 ? isTablet ? '0.18em' : '0.4em' : 0,
      whiteSpace: 'normal'
    }
  }, s.map((word, wi) => {
    const globalIdx = storyRows.slice(0, si).reduce((a, b) => a + b.length, 0) + wi;
    const wp = wordProgress(globalIdx);
    const isAccent = si === 0 && word === 'strange' || word === 'English,' || word === 'bytes';
    return /*#__PURE__*/React.createElement("span", {
      key: wi,
      style: {
        display: 'inline-block',
        opacity: 0.1 + wp * 0.9,
        transform: `translateY(${(1 - wp) * 14}px)`,
        filter: `blur(${(1 - wp) * 6}px)`,
        color: isAccent && wp > 0.42 ? theme.brand : theme.ink,
        textShadow: isAccent && wp > 0.42 ? `0 0 22px ${theme.brandSoft}` : 'none',
        transition: 'color 0.2s, text-shadow 0.2s',
        willChange: 'opacity, transform, filter'
      }
    }, word);
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: isMobile ? 40 : 64,
      display: 'flex',
      gap: isMobile ? 14 : 32,
      fontFamily: mono,
      fontSize: 11,
      letterSpacing: '0.06em',
      color: theme.muted,
      flexWrap: 'wrap'
    }
  }, [{
    label: 'stager_x64.elf',
    done: progress > 0.25
  }, {
    label: 'cmd.update-status.net:8443',
    done: progress > 0.55
  }, {
    label: '.rodata:0x3c10',
    done: progress > 0.8
  }].map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      opacity: c.done ? 1 : 0.35,
      transition: 'opacity 0.3s'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 6,
      background: c.done ? theme.accent : theme.rule,
      transition: 'background 0.3s'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.done ? theme.inkSoft : theme.muted
    }
  }, c.label)))))));
}
Object.assign(window, {
  VariationA,
  VAScrollStory
});