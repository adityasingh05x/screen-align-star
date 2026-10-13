export function HeroArt() {
  const ticks = Array.from({ length: 41 }, (_, i) => i);
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="Geometric technical illustration">
      <defs>
        <pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="var(--color-border)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#g)" />
      {ticks.map((i) => (
        <line key={`t${i}`} x1={i * 10} y1="0" x2={i * 10} y2={i % 5 === 0 ? 10 : 5} stroke="var(--color-muted-foreground)" strokeWidth="0.6" />
      ))}
      {ticks.map((i) => (
        <line key={`l${i}`} x1="0" y1={i * 10} x2={i % 5 === 0 ? 10 : 5} y2={i * 10} stroke="var(--color-muted-foreground)" strokeWidth="0.6" />
      ))}
      <g fill="none" stroke="var(--color-foreground)" strokeWidth="0.8">
        <g className="anim-spin">
          <circle cx="200" cy="200" r="150" strokeDasharray="2 6" opacity="0.6" />
          <line x1="200" y1="40" x2="200" y2="60" stroke="var(--color-primary)" strokeWidth="1.5" />
        </g>
        <circle cx="200" cy="200" r="118" opacity="0.4" />
        <g className="anim-spin-rev">
          <polygon points="200,90 295,145 295,255 200,310 105,255 105,145" />
          <polygon points="200,90 295,255 105,255" opacity="0.5" />
          <polygon points="200,310 105,145 295,145" opacity="0.5" />
        </g>
        <g className="anim-drift">
          <rect x="160" y="160" width="80" height="80" stroke="var(--color-primary)" strokeWidth="1.2" />
          <path d="M160 160 L200 130 L280 130 L240 160 M240 160 L280 130 L280 210 L240 240" opacity="0.7" />
          <circle cx="200" cy="200" r="3" fill="var(--color-primary)" stroke="none" />
        </g>
        <line x1="20" y1="200" x2="380" y2="200" opacity="0.25" />
        <line x1="200" y1="20" x2="200" y2="380" opacity="0.25" />
        <path d="M105 340 H295 M105 334 V346 M295 334 V346" stroke="var(--color-muted-foreground)" />
      </g>
      <rect className="anim-scan" x="20" y="10" width="360" height="1" fill="var(--color-primary)" opacity="0.5" />
      <g fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-muted-foreground)" letterSpacing="1">
        <text x="186" y="358">190.00</text>
        <text x="300" y="140">A.01</text>
        <text x="248" y="252" fill="var(--color-primary)">X:200 Y:200</text>
        <text x="20" y="390">FIG.01 — DIGITAL ARCHITECTURE</text>
      </g>
    </svg>
  );
}

export function InterfacePreview() {
  return (
    <svg viewBox="0 0 480 320" className="h-full w-full" role="img" aria-label="Wireframe preview of this portfolio">
      <g fill="none" stroke="var(--color-line)" strokeWidth="1">
        <rect x="10" y="10" width="460" height="300" />
        <line x1="10" y1="34" x2="470" y2="34" />
        <circle cx="24" cy="22" r="3" /><circle cx="36" cy="22" r="3" /><circle cx="48" cy="22" r="3" />
        <rect x="32" y="56" width="70" height="6" fill="var(--color-line)" stroke="none" />
        <rect x="32" y="80" width="230" height="30" fill="var(--color-foreground)" stroke="none" opacity="0.85" />
        <rect x="32" y="118" width="190" height="30" stroke="var(--color-foreground)" />
        <rect x="32" y="156" width="150" height="30" fill="var(--color-foreground)" stroke="none" opacity="0.85" />
        <rect x="32" y="206" width="200" height="4" fill="var(--color-line)" stroke="none" />
        <rect x="32" y="216" width="170" height="4" fill="var(--color-line)" stroke="none" />
        <rect x="32" y="246" width="90" height="24" fill="var(--color-primary)" stroke="none" />
        <rect x="130" y="246" width="90" height="24" />
        <g className="anim-drift">
          <circle cx="370" cy="160" r="70" strokeDasharray="2 5" />
          <rect x="335" y="125" width="70" height="70" stroke="var(--color-primary)" />
          <line x1="300" y1="160" x2="440" y2="160" />
          <line x1="370" y1="90" x2="370" y2="230" />
        </g>
      </g>
    </svg>
  );
}
