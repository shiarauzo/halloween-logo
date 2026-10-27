type LogoMarkProps = {
  className?: string;
  size?: number;
};

export function LogoMark({ className, size = 24 }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        fill="#1c1917"
        d="M15 4.5c4.2-1.2 8.4 1 8 4.2-3.2-1-6.2.1-7.4 2.2.1-2.2-.2-4.4-.6-6.4z"
      />
      <path
        fill="#1c1917"
        d="M16.2 6.4c1.6 4.2 2.6 9.2 3.4 13.2.8 4.2 2.8 6.4 6.4 7.2H6c3.6-.8 5.4-3 6.2-7.2.8-4 1.8-9 4-13.2z"
      />
      <ellipse cx="16" cy="26.2" rx="13" ry="3.1" fill="#1c1917" />
      <path
        fill="#c4551a"
        d="M9.2 19.6c3.6-2.2 9.8-2.2 13.6 0 1 1.6-1.6 3.2-6.8 3.2s-7.8-1.6-6.8-3.2z"
      />
    </svg>
  );
}
