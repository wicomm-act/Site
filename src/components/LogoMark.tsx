export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      className={className}
      aria-hidden
      fill="none"
    >
      <g
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 18 L36 42 L48 18" />
        <path d="M48 18 L60 36 L72 18" />
        <path d="M72 18 L84 42 L108 18" />
        <path d="M36 42 L60 54 L84 42" />
        <path d="M36 42 L60 36 L84 42" />
      </g>
      <g fill="currentColor">
        <circle cx="12" cy="18" r="4.2" />
        <circle cx="48" cy="18" r="4.2" />
        <circle cx="72" cy="18" r="4.2" />
        <circle cx="108" cy="18" r="4.2" />
        <circle cx="36" cy="42" r="4.2" />
        <circle cx="84" cy="42" r="4.2" />
        <circle cx="60" cy="36" r="4.2" />
        <circle cx="60" cy="54" r="4.2" />
      </g>
    </svg>
  );
}
