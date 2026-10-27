import type { Accessory } from "@/lib/accessories";

type Decoration = {
  svg: string;
};

const witch = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="200" viewBox="0 0 240 200">
  <ellipse cx="120" cy="168" rx="108" ry="22" fill="#1c1917"/>
  <path fill="#1c1917" d="M122 34c10 22 16 52 20 78 6 32 20 50 48 56H54c26-6 40-24 46-56 4-26 10-56 22-78z"/>
  <path fill="#1c1917" d="M118 36c28-16 58-4 54 16-16-4-34-2-48 8 0-10-2-18-6-24z"/>
  <path fill="#c4551a" d="M78 122c22-14 62-14 84 0 6 10-10 20-42 20s-48-10-42-20z"/>
</svg>`;

const pumpkin = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="170" viewBox="0 0 180 170">
  <path fill="#3d6b2e" d="M92 42c4-18 22-24 28-10-8 4-16 12-18 22-4-4-8-8-10-12z"/>
  <ellipse cx="90" cy="102" rx="36" ry="52" fill="#e07a2f"/>
  <ellipse cx="56" cy="106" rx="28" ry="46" fill="#d16822"/>
  <ellipse cx="124" cy="106" rx="28" ry="46" fill="#d16822"/>
  <ellipse cx="34" cy="114" rx="18" ry="34" fill="#c45e1c"/>
  <ellipse cx="146" cy="114" rx="18" ry="34" fill="#c45e1c"/>
  <path d="M90 54v90" stroke="#9a3f0c" stroke-width="3" fill="none" opacity="0.55"/>
  <path d="M66 62c4 26 4 62-2 84" stroke="#9a3f0c" stroke-width="2.5" fill="none" opacity="0.35"/>
  <path d="M114 62c-4 26-4 62 2 84" stroke="#9a3f0c" stroke-width="2.5" fill="none" opacity="0.35"/>
</svg>`;

const broom = `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="300" viewBox="0 0 140 300" fill="none">
  <path d="M98 16 L52 176" stroke="#8d5a32" stroke-width="12" stroke-linecap="round"/>
  <g stroke="#c9a36a" stroke-width="6" stroke-linecap="round">
    <path d="M52 172 C44 210 16 246 6 286"/>
    <path d="M52 172 C46 214 26 252 18 294"/>
    <path d="M52 172 C50 216 42 258 40 298"/>
    <path d="M52 172 C58 214 68 254 74 294"/>
    <path d="M52 172 C66 210 90 244 104 280"/>
    <path d="M52 172 C38 206 8 236 0 268"/>
    <path d="M52 172 C72 204 102 232 118 262"/>
  </g>
  <path d="M30 164c16-10 38-6 46 8 2 8-14 18-28 16-18-2-24-14-18-24z" fill="#1c1917"/>
</svg>`;

const olla = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="220" viewBox="0 0 200 220">
  <path d="M58 108c-24 2-34 24-24 40 8 12 22 8 28-4" fill="none" stroke="#a8643c" stroke-width="11" stroke-linecap="round"/>
  <path d="M142 108c24 2 34 24 24 40-8 12-22 8-28-4" fill="none" stroke="#a8643c" stroke-width="11" stroke-linecap="round"/>
  <path fill="#c4784a" d="M46 112c-8 22-2 58 18 78 22 22 62 22 86 4 24-18 32-52 24-80-8-6-20-2-30 8-10 8-22 12-44 12s-34-4-44-12c-10-10-18-14-10-10z"/>
  <path fill="#a35c34" opacity="0.55" d="M68 132c-6 18 2 42 24 52 6-18 4-40-6-54-6 0-12 0-18 2z"/>
  <path fill="#b86b42" d="M62 112c8 18 68 18 76 0l8-22c-12 14-80 14-92 0z"/>
  <ellipse cx="100" cy="86" rx="50" ry="16" fill="#9a5636"/>
  <ellipse cx="100" cy="84" rx="34" ry="10" fill="#5c3318"/>
</svg>`;

const guitar = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="280" viewBox="0 0 120 280">
  <ellipse cx="60" cy="198" rx="42" ry="50" fill="#8a5a2b"/>
  <ellipse cx="60" cy="150" rx="30" ry="34" fill="#8a5a2b"/>
  <rect x="51" y="40" width="18" height="118" rx="5" fill="#6b4423"/>
  <rect x="44" y="10" width="32" height="34" rx="6" fill="#5c3a1e"/>
  <circle cx="52" cy="20" r="3.2" fill="#f6f3ee"/>
  <circle cx="68" cy="20" r="3.2" fill="#f6f3ee"/>
  <circle cx="52" cy="32" r="3.2" fill="#f6f3ee"/>
  <circle cx="68" cy="32" r="3.2" fill="#f6f3ee"/>
  <ellipse cx="60" cy="186" rx="13" ry="13" fill="#3d2914"/>
  <ellipse cx="60" cy="186" rx="5" ry="5" fill="#1c1917"/>
  <path d="M57 18v150M60 18v150M63 18v150" stroke="#f3e6d4" stroke-width="1.4"/>
  <rect x="46" y="206" width="28" height="6" rx="2" fill="#3d2914"/>
</svg>`;

const bow = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="180" viewBox="0 0 220 180">
  <polygon points="104,96 62,168 88,172" fill="#d91023"/>
  <polygon points="116,96 176,164 146,174" fill="#f7f4ef" stroke="#1c1917" stroke-width="4" stroke-linejoin="round"/>
  <g transform="rotate(-32 72 74)">
    <ellipse cx="72" cy="74" rx="52" ry="32" fill="#d91023"/>
    <ellipse cx="72" cy="74" rx="26" ry="14" fill="#f6f3ee"/>
  </g>
  <g transform="rotate(32 148 74)">
    <ellipse cx="148" cy="74" rx="52" ry="32" fill="#f7f4ef" stroke="#1c1917" stroke-width="4"/>
    <ellipse cx="148" cy="74" rx="26" ry="14" fill="#f6f3ee" stroke="#1c1917" stroke-width="3"/>
  </g>
  <rect x="96" y="64" width="28" height="32" rx="8" fill="#1c1917" transform="rotate(8 110 80)"/>
</svg>`;

const bat = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="140" viewBox="0 0 220 140">
  <path fill="#1c1917" d="M110 78c8-28 22-46 40-58 8 18 6 36-2 50 16-6 34-4 52 6-20 8-36 22-46 40-6-16-16-28-28-36-12 8-22 20-28 36-10-18-26-32-46-40 18-10 36-12 52-6-8-14-10-32-2-50 18 12 32 30 40 58z"/>
  <circle cx="100" cy="88" r="5" fill="#c4551a"/>
  <circle cx="120" cy="88" r="5" fill="#c4551a"/>
</svg>`;

const ghost = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="220" viewBox="0 0 160 220">
  <path fill="#f7f4ef" stroke="#1c1917" stroke-width="8" d="M30 108c0-42 22-74 50-74s50 32 50 74v76l-16-18-17 18-17-18-17 18-17-18-16 18z"/>
  <circle cx="62" cy="108" r="8" fill="#1c1917"/>
  <circle cx="98" cy="108" r="8" fill="#1c1917"/>
  <path d="M68 132c8 10 18 10 26 0" stroke="#1c1917" stroke-width="6" fill="none" stroke-linecap="round"/>
</svg>`;

export const DECORATIONS: Record<Accessory, Decoration> = {
  witch: { svg: witch },
  pumpkin: { svg: pumpkin },
  broom: { svg: broom },
  bat: { svg: bat },
  ghost: { svg: ghost },
  olla: { svg: olla },
  guitar: { svg: guitar },
  bow: { svg: bow },
};
