// Utility functions for color conversion

// Helper to parse OKLCH string: "oklch(0.98 0.04 85)" -> { l: 0.98, c: 0.04, h: 85 }
export function parseOklch(oklchStr: string) {
  const match = oklchStr.match(/oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)/);
  if (!match) return null;
  return {
    l: parseFloat(match[1]),
    c: parseFloat(match[2]),
    h: parseFloat(match[3]),
  };
}

// Convert Hex to RGB
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null;
}

// Convert RGB to Linear RGB
function srgbToLinear(c: number) {
  return c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
}

// Convert Linear RGB to OKLCH
// Based on standard conversion matrices
export function hexToOklch(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "oklch(0 0 0)";

  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);

  // Linear RGB to LMS
  const l_ = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m_ = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s_ = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l__ = Math.cbrt(l_);
  const m__ = Math.cbrt(m_);
  const s__ = Math.cbrt(s_);

  // LMS to OKLab
  const L = 0.2104542553 * l__ + 0.793617785 * m__ - 0.0040720468 * s__;
  const a = 1.9779984951 * l__ - 2.428592205 * m__ + 0.4505937099 * s__;
  const b_ = 0.0259040371 * l__ + 0.7827717662 * m__ - 0.808675766 * s__;

  // OKLab to OKLCH
  const C = Math.sqrt(a * a + b_ * b_);
  const h = (Math.atan2(b_, a) * 180) / Math.PI;

  // Format: oklch(L C H)
  // Rounding for cleaner output
  const L_fixed = parseFloat(L.toFixed(3));
  const C_fixed = parseFloat(C.toFixed(3));
  const h_fixed = parseFloat(((h < 0 ? h + 360 : h)).toFixed(1));

  return `oklch(${L_fixed} ${C_fixed} ${h_fixed})`;
}

// Convert OKLCH to Hex (for the color picker input value)
// This is an approximation for UI display purposes
export function oklchToHex(oklchStr: string): string {
  const oklch = parseOklch(oklchStr);
  if (!oklch) return "#000000";

  const { l: L, c: C, h: h_deg } = oklch;
  const h = (h_deg * Math.PI) / 180;

  const a = C * Math.cos(h);
  const b_ = C * Math.sin(h);

  // OKLab to LMS
  const l__ = L + 0.3963377774 * a + 0.2158037573 * b_;
  const m__ = L - 0.1055613458 * a - 0.0638541728 * b_;
  const s__ = L - 0.0894841775 * a - 1.291485548 * b_;

  const l_ = l__ * l__ * l__;
  const m_ = m__ * m__ * m__;
  const s_ = s__ * s__ * s__;

  // LMS to Linear RGB
  let r = 4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_;
  let g = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_;
  let b = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_;

  // Linear RGB to sRGB
  const linearToSrgb = (c: number) => {
    const val = c > 0.0031308 ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : 12.92 * c;
    return Math.min(Math.max(0, Math.round(val * 255)), 255);
  };

  const rHex = linearToSrgb(r).toString(16).padStart(2, "0");
  const gHex = linearToSrgb(g).toString(16).padStart(2, "0");
  const bHex = linearToSrgb(b).toString(16).padStart(2, "0");

  return `#${rHex}${gHex}${bHex}`;
}
