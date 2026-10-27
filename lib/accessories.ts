export const ACCESSORIES = [
  "witch",
  "broom",
  "pumpkin",
  "bat",
  "ghost",
  "olla",
  "guitar",
  "bow",
] as const;

export type Accessory = (typeof ACCESSORIES)[number];

export const MODES = {
  halloween: {
    label: "Pumpkin",
    accessories: [
      { id: "witch", label: "Witch hat" },
      { id: "broom", label: "Broom" },
      { id: "pumpkin", label: "Pumpkin" },
      { id: "bat", label: "Bat" },
      { id: "ghost", label: "Ghost" },
    ],
  },
  criollo: {
    label: "Peru",
    accessories: [
      { id: "olla", label: "Clay pot" },
      { id: "guitar", label: "Guitar" },
      { id: "bow", label: "Bow" },
    ],
  },
} as const;

export type Mode = keyof typeof MODES;

export function isMode(value: string): value is Mode {
  return value === "halloween" || value === "criollo";
}

export function isAccessory(value: string): value is Accessory {
  return (ACCESSORIES as readonly string[]).includes(value);
}

export function defaultAccessory(mode: Mode): Accessory {
  return MODES[mode].accessories[0].id;
}

export function accessoryLabel(accessory: Accessory): string {
  for (const mode of Object.values(MODES)) {
    const match = mode.accessories.find((item) => item.id === accessory);
    if (match) return match.label;
  }
  return "Accessory";
}
