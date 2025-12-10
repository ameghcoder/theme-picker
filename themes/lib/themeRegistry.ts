export type PreviewColorNameTypes =
  | "background"
  | "foreground"
  | "accent"
  | "accent-foreground"
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground";

export interface ThemeRegistryTypes {
  id: string;
  title: string;
  creator?: string;
  previewColor?: {
    value: string;
    name: PreviewColorNameTypes;
  }[];
  borderRadius?: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadow?: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export const themesRegistry: ThemeRegistryTypes[] = [
  {
    id: "dark-luxury",
    title: "Luxury Dark",
    creator: "Yashraj",
    previewColor: [
      { name: "background", value: "oklch(0.98 0 0)" },
      { name: "foreground", value: "oklch(0.22 0 0)" },
      { name: "accent", value: "oklch(0.88 0.11 80)" },
      { name: "accent-foreground", value: "oklch(0.16 0 0)" },
      { name: "primary", value: "oklch(0.82 0.12 85)" },
      { name: "primary-foreground", value: "oklch(0.16 0 0)" },
      { name: "secondary", value: "oklch(0.90 0 0)" },
      { name: "secondary-foreground", value: "oklch(0.24 0 0)" },
    ],
    borderRadius: { sm: "0.375rem", md: "0.5rem", lg: "0.75rem", xl: "1rem" },
    shadow: { sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)", md: "0 4px 6px -1px rgb(0 0 0 / 0.1)", lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)", xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)" },
  },
  {
    id: "obsidian-royale",
    title: "Obsidian Royale",
    creator: "Yashraj",
    previewColor: [
      { name: "background", value: "oklch(0.98 0.04 85)" },
      { name: "foreground", value: "oklch(0.20 0 0)" },
      { name: "accent", value: "oklch(0.86 0.12 80)" },
      { name: "accent-foreground", value: "oklch(0.14 0 0)" },
      { name: "primary", value: "oklch(0.78 0.14 85)" },
      { name: "primary-foreground", value: "oklch(0.12 0 0)" },
      { name: "secondary", value: "oklch(0.90 0.02 85)" },
      { name: "secondary-foreground", value: "oklch(0.24 0 0)" },
    ],
    borderRadius: { sm: "0.25rem", md: "0.5rem", lg: "0.875rem", xl: "1.25rem" },
    shadow: { sm: "0 1px 3px 0 rgb(0 0 0 / 0.1)", md: "0 4px 8px -2px rgb(0 0 0 / 0.15)", lg: "0 12px 20px -4px rgb(0 0 0 / 0.2)", xl: "0 24px 32px -8px rgb(0 0 0 / 0.25)" },
  },
  {
    id: "platinum-frost",
    title: "Platinum Frost",
    creator: "Yashraj",
    previewColor: [
      { name: "background", value: "oklch(0.985 0.04 260)" },
      { name: "foreground", value: "oklch(0.22 0 0)" },
      { name: "accent", value: "oklch(0.90 0.04 255)" },
      { name: "accent-foreground", value: "oklch(0.14 0 0)" },
      { name: "primary", value: "oklch(0.88 0.05 240)" },
      { name: "primary-foreground", value: "oklch(0.14 0 0)" },
      { name: "secondary", value: "oklch(0.94 0.02 260)" },
      { name: "secondary-foreground", value: "oklch(0.26 0 0)" },
    ],
    borderRadius: { sm: "0.5rem", md: "0.75rem", lg: "1rem", xl: "1.5rem" },
    shadow: { sm: "0 1px 2px 0 rgb(0 0 0 / 0.03)", md: "0 4px 6px -1px rgb(0 0 0 / 0.05)", lg: "0 10px 15px -3px rgb(0 0 0 / 0.08)", xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)" },
  },
  {
    id: "velvet-noir",
    title: "Velvet Noir",
    creator: "Yashraj",
    previewColor: [
      { name: "background", value: "oklch(0.98 0.035 20)" },
      { name: "foreground", value: "oklch(0.22 0 0)" },
      { name: "accent", value: "oklch(0.58 0.18 25)" },
      { name: "accent-foreground", value: "oklch(0.12 0 0)" },
      { name: "primary", value: "oklch(0.60 0.20 20)" },
      { name: "primary-foreground", value: "oklch(0.12 0 0)" },
      { name: "secondary", value: "oklch(0.90 0.02 20)" },
      { name: "secondary-foreground", value: "oklch(0.24 0 0)" },
    ],
    borderRadius: { sm: "0.375rem", md: "0.625rem", lg: "1rem", xl: "1.5rem" },
    shadow: { sm: "0 2px 4px 0 rgb(0 0 0 / 0.08)", md: "0 6px 10px -2px rgb(0 0 0 / 0.12)", lg: "0 14px 20px -4px rgb(0 0 0 / 0.15)", xl: "0 25px 35px -8px rgb(0 0 0 / 0.2)" },
  },
  {
    id: "graphite-prime",
    title: "Graphite Prime",
    creator: "Yashraj",
    previewColor: [
      { name: "background", value: "oklch(0.985 0.03 240)" },
      { name: "foreground", value: "oklch(0.20 0 0)" },
      { name: "accent", value: "oklch(0.40 0.07 220)" },
      { name: "accent-foreground", value: "oklch(0.95 0.01 240)" },
      { name: "primary", value: "oklch(0.36 0.06 240)" },
      { name: "primary-foreground", value: "oklch(0.12 0 0)" },
      { name: "secondary", value: "oklch(0.90 0.02 240)" },
      { name: "secondary-foreground", value: "oklch(0.24 0 0)" },
    ],
    borderRadius: { sm: "0.25rem", md: "0.5rem", lg: "0.75rem", xl: "1rem" },
    shadow: { sm: "0 1px 3px 0 rgb(0 0 0 / 0.12)", md: "0 4px 8px -2px rgb(0 0 0 / 0.18)", lg: "0 12px 18px -4px rgb(0 0 0 / 0.22)", xl: "0 24px 30px -8px rgb(0 0 0 / 0.28)" },
  },
  {
    id: "midnight-sapphire",
    title: "Midnight Sapphire",
    creator: "Yashraj",
    previewColor: [
      { name: "background", value: "oklch(0.985 0.035 240)" },
      { name: "foreground", value: "oklch(0.22 0 0)" },
      { name: "accent", value: "oklch(0.60 0.16 230)" },
      { name: "accent-foreground", value: "oklch(0.12 0 0)" },
      { name: "primary", value: "oklch(0.62 0.18 240)" },
      { name: "primary-foreground", value: "oklch(0.12 0 0)" },
      { name: "secondary", value: "oklch(0.90 0.02 240)" },
      { name: "secondary-foreground", value: "oklch(0.24 0 0)" },
    ],
    borderRadius: { sm: "0.5rem", md: "0.75rem", lg: "1.125rem", xl: "1.75rem" },
    shadow: { sm: "0 1px 2px 0 rgb(59 130 246 / 0.1)", md: "0 4px 6px -1px rgb(59 130 246 / 0.15)", lg: "0 10px 15px -3px rgb(59 130 246 / 0.2)", xl: "0 20px 25px -5px rgb(59 130 246 / 0.25)" },
  },
  {
    id: "ivory-gold",
    title: "Ivory Gold",
    creator: "Yashraj",
    previewColor: [
      { name: "background", value: "oklch(0.99 0.04 85)" },
      { name: "foreground", value: "oklch(0.20 0 0)" },
      { name: "accent", value: "oklch(0.82 0.10 80)" },
      { name: "accent-foreground", value: "oklch(0.14 0 0)" },
      { name: "primary", value: "oklch(0.78 0.12 85)" },
      { name: "primary-foreground", value: "oklch(0.14 0 0)" },
      { name: "secondary", value: "oklch(0.92 0.02 85)" },
      { name: "secondary-foreground", value: "oklch(0.24 0 0)" },
    ],
    borderRadius: { sm: "0.5rem", md: "0.875rem", lg: "1.25rem", xl: "2rem" },
    shadow: { sm: "0 1px 2px 0 rgb(217 119 6 / 0.08)", md: "0 4px 6px -1px rgb(217 119 6 / 0.12)", lg: "0 10px 15px -3px rgb(217 119 6 / 0.15)", xl: "0 20px 25px -5px rgb(217 119 6 / 0.2)" },
  },
  {
    id: "cyber-violet",
    title: "Cyber Violet",
    creator: "Yashraj",
    previewColor: [
      { name: "background", value: "oklch(0.985 0.03 300)" },
      { name: "foreground", value: "oklch(0.22 0 0)" },
      { name: "accent", value: "oklch(0.62 0.16 290)" },
      { name: "accent-foreground", value: "oklch(0.10 0 0)" },
      { name: "primary", value: "oklch(0.66 0.20 300)" },
      { name: "primary-foreground", value: "oklch(0.10 0 0)" },
      { name: "secondary", value: "oklch(0.90 0.02 300)" },
      { name: "secondary-foreground", value: "oklch(0.24 0 0)" },
    ],
    borderRadius: { sm: "0.375rem", md: "0.75rem", lg: "1.25rem", xl: "2rem" },
    shadow: { sm: "0 1px 3px 0 rgb(139 92 246 / 0.1)", md: "0 4px 8px -2px rgb(139 92 246 / 0.15)", lg: "0 12px 20px -4px rgb(139 92 246 / 0.2)", xl: "0 24px 32px -8px rgb(139 92 246 / 0.25)" },
  },
  {
    id: "emerald-aura",
    title: "Emerald Aura",
    creator: "Yashraj",
    previewColor: [
      { name: "background", value: "oklch(0.985 0.04 140)" },
      { name: "foreground", value: "oklch(0.22 0 0)" },
      { name: "accent", value: "oklch(0.60 0.16 140)" },
      { name: "accent-foreground", value: "oklch(0.12 0 0)" },
      { name: "primary", value: "oklch(0.64 0.20 140)" },
      { name: "primary-foreground", value: "oklch(0.12 0 0)" },
      { name: "secondary", value: "oklch(0.92 0.02 140)" },
      { name: "secondary-foreground", value: "oklch(0.24 0 0)" },
    ],
    borderRadius: { sm: "0.5rem", md: "0.875rem", lg: "1.375rem", xl: "2rem" },
    shadow: { sm: "0 1px 2px 0 rgb(16 185 129 / 0.1)", md: "0 4px 6px -1px rgb(16 185 129 / 0.15)", lg: "0 10px 15px -3px rgb(16 185 129 / 0.2)", xl: "0 20px 25px -5px rgb(16 185 129 / 0.25)" },
  },
  {
    id: "carbon-blaze",
    title: "Carbon Blaze",
    creator: "Yashraj",
    previewColor: [
      { name: "background", value: "oklch(0.985 0.035 40)" },
      { name: "foreground", value: "oklch(0.20 0 0)" },
      { name: "accent", value: "oklch(0.62 0.16 35)" },
      { name: "accent-foreground", value: "oklch(0.10 0 0)" },
      { name: "primary", value: "oklch(0.66 0.18 40)" },
      { name: "primary-foreground", value: "oklch(0.10 0 0)" },
      { name: "secondary", value: "oklch(0.90 0.02 40)" },
      { name: "secondary-foreground", value: "oklch(0.24 0 0)" },
    ],
    borderRadius: { sm: "0.375rem", md: "0.625rem", lg: "1rem", xl: "1.5rem" },
    shadow: { sm: "0 1px 3px 0 rgb(249 115 22 / 0.1)", md: "0 4px 8px -2px rgb(249 115 22 / 0.15)", lg: "0 12px 20px -4px rgb(249 115 22 / 0.2)", xl: "0 24px 32px -8px rgb(249 115 22 / 0.25)" },
  },
  {
    id: "lunar-mist",
    title: "Lunar Mist",
    creator: "Yashraj",
    previewColor: [
      { name: "background", value: "oklch(0.99 0.03 210)" },
      { name: "foreground", value: "oklch(0.22 0 0)" },
      { name: "accent", value: "oklch(0.64 0.12 200)" },
      { name: "accent-foreground", value: "oklch(0.12 0 0)" },
      { name: "primary", value: "oklch(0.66 0.14 210)" },
      { name: "primary-foreground", value: "oklch(0.12 0 0)" },
      { name: "secondary", value: "oklch(0.92 0.02 210)" },
      { name: "secondary-foreground", value: "oklch(0.24 0 0)" },
    ],
    borderRadius: { sm: "0.5rem", md: "0.75rem", lg: "1.125rem", xl: "1.75rem" },
    shadow: { sm: "0 1px 2px 0 rgb(0 0 0 / 0.04)", md: "0 4px 6px -1px rgb(0 0 0 / 0.06)", lg: "0 10px 15px -3px rgb(0 0 0 / 0.08)", xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)" },
  },
];
