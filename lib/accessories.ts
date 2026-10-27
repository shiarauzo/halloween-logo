export const ACCESSORIES = [
  "witch",
  "broom",
  "pumpkin",
  "olla",
  "guitar",
  "bow",
] as const;

export type Accessory = (typeof ACCESSORIES)[number];

export const MODES = {
  halloween: {
    label: "Calabaza",
    accessories: [
      { id: "witch", label: "Gorro de bruja" },
      { id: "broom", label: "Escoba" },
      { id: "pumpkin", label: "Calabaza" },
    ],
  },
  criollo: {
    label: "Perú",
    accessories: [
      { id: "olla", label: "Olla de barro" },
      { id: "guitar", label: "Guitarra" },
      { id: "bow", label: "Moño" },
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
  return "Accesorio";
}
