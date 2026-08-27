import type { SVGProps } from "react";

/**
 * Flat, currentColor-filled garment illustrations. No background rect is
 * ever drawn, so these compose as true transparent "products" wherever
 * they're placed — on a hanger, on a shop-grid card, anywhere.
 */

type GarmentProps = SVGProps<SVGSVGElement>;

function Shade({ d, opacity = 0.12 }: { d: string; opacity?: number }) {
  return <path d={d} fill="black" fillOpacity={opacity} />;
}

function Sheen({ d, opacity = 0.22 }: { d: string; opacity?: number }) {
  return <path d={d} fill="white" fillOpacity={opacity} />;
}

export function HangerIcon({ className, ...props }: GarmentProps) {
  return (
    <svg
      viewBox="0 0 120 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M56 4 Q60 -4 64 4" />
      <circle cx="60" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <path d="M60 6 L106 34 L14 34 Z" />
      <path d="M30 34 L90 34" opacity={0.5} />
    </svg>
  );
}

export function TeeGarment({ className, ...props }: GarmentProps) {
  return (
    <svg viewBox="0 0 160 220" className={className} fill="currentColor" {...props}>
      <path d="M60 24 C 74 40, 86 40, 100 24 L 130 42 L 152 76 L 120 92 L 112 78 L 116 204 Q 80 216 44 204 L 48 78 L 40 92 L 8 76 L 30 42 Z" />
      <Shade d="M100 24 L130 42 L152 76 L120 92 L112 78 L112 204 Q 116 204 116 204 L116 78 L152 76 L130 42 L100 24Z" opacity={0.1} />
      <Sheen d="M60 24 C 68 34, 76 38, 82 39 L 78 50 C 68 46 58 36 52 28 Z" />
    </svg>
  );
}

export function HoodieGarment({ className, ...props }: GarmentProps) {
  return (
    <svg viewBox="0 0 160 220" className={className} fill="currentColor" {...props}>
      <path d="M62 20 Q80 4 98 20 L100 26 C 108 24 118 30 118 40 L 136 52 L 158 88 L 126 104 L 116 88 L 122 206 Q 80 218 38 206 L 44 88 L 34 104 L 2 88 L 24 52 L 42 40 C 42 30 52 24 60 26 Z" />
      <Shade d="M98 20 Q100 26 100 26 L118 40 L136 52 L158 88 L126 104 L116 88 L122 206 Q126 205 126 205 L122 88 L158 88 L136 52 L118 40 L100 26Z" opacity={0.12} />
      <rect x="60" y="140" width="40" height="30" rx="8" fill="black" fillOpacity={0.14} />
      <path d="M80 26 L80 60" stroke="black" strokeOpacity={0.15} strokeWidth={2} />
      <Sheen d="M62 20 Q72 12 80 12 L76 24 C 70 24 64 26 58 30 Z" />
    </svg>
  );
}

export function SweaterGarment({ className, ...props }: GarmentProps) {
  return (
    <svg viewBox="0 0 160 220" className={className} fill="currentColor" {...props}>
      <path d="M62 26 C 74 40, 86 40, 98 26 L 132 44 L 156 80 L 124 96 L 114 82 L 118 208 Q 80 220 42 208 L 46 82 L 36 96 L 4 80 L 28 44 Z" />
      <Shade d="M98 26 L132 44 L156 80 L124 96 L114 82 L118 208 Q122 207 122 207 L118 82 L156 80 L132 44 L98 26Z" opacity={0.1} />
      <path d="M58 30 Q80 46 102 30" stroke="black" strokeOpacity={0.18} strokeWidth={3} fill="none" />
      <path d="M46 84 L46 92 M114 84 L114 92" stroke="black" strokeOpacity={0.15} strokeWidth={3} />
      <Sheen d="M62 26 C 70 34, 78 38, 84 39 L 80 50 C 70 46 60 38 54 30 Z" />
    </svg>
  );
}

export function JacketGarment({ className, ...props }: GarmentProps) {
  return (
    <svg viewBox="0 0 160 220" className={className} fill="currentColor" {...props}>
      <path d="M80 22 L58 34 L70 46 L60 210 L34 206 L40 90 L30 104 L2 84 L28 46 L58 30 Z" />
      <path d="M80 22 L102 34 L90 46 L100 210 L126 206 L120 90 L130 104 L158 84 L132 46 L102 30 Z" />
      <Shade d="M80 22 L102 34 L90 46 L100 210 L126 206 L120 90 L130 104 L158 84 L132 46 L102 30Z" opacity={0.12} />
      <path d="M80 22 L76 60 M80 22 L84 60" stroke="black" strokeOpacity={0.16} strokeWidth={2} />
      <rect x="46" y="120" width="16" height="12" rx="2" fill="black" fillOpacity={0.14} />
      <rect x="98" y="120" width="16" height="12" rx="2" fill="black" fillOpacity={0.14} />
      <Sheen d="M58 34 C 50 46, 44 60, 40 74 L 32 70 C 36 54 44 40 52 28 Z" />
    </svg>
  );
}

export function DressGarment({ className, ...props }: GarmentProps) {
  return (
    <svg viewBox="0 0 160 220" className={className} fill="currentColor" {...props}>
      <path d="M64 22 L58 40 L70 52 L64 96 Q 40 150 26 208 L 134 208 Q 120 150 96 96 L 90 52 L 102 40 L 96 22 Q 80 12 64 22 Z" />
      <Shade d="M96 22 L102 40 L90 52 L96 96 Q 120 150 134 208 L 100 208 Q 108 150 88 96 L 92 52 L 96 40 L 96 22Z" opacity={0.1} />
      <path d="M64 96 L96 96" stroke="black" strokeOpacity={0.12} strokeWidth={2} />
      <Sheen d="M64 22 C 58 34, 56 46, 60 58 L 50 54 C 48 42 52 30 58 20 Z" />
    </svg>
  );
}

export function SkirtGarment({ className, ...props }: GarmentProps) {
  return (
    <svg viewBox="0 0 160 180" className={className} fill="currentColor" {...props}>
      <path d="M52 18 L108 18 L118 38 Q 140 90 150 150 Q 80 168 10 150 Q 20 90 42 38 Z" />
      <Shade d="M108 18 L118 38 Q 140 90 150 150 Q 130 156 130 156 Q 122 92 100 40 L96 20Z" opacity={0.1} />
      <path d="M52 18 L108 18" stroke="black" strokeOpacity={0.16} strokeWidth={3} />
      <Sheen d="M52 18 C 44 34, 34 60, 26 90 L 16 84 C 24 54 36 30 46 14 Z" />
    </svg>
  );
}

export function TrousersGarment({ className, ...props }: GarmentProps) {
  return (
    <svg viewBox="0 0 160 220" className={className} fill="currentColor" {...props}>
      <path d="M40 16 L120 16 L124 40 L112 40 L118 206 L92 206 L80 78 L68 206 L42 206 L48 40 L36 40 Z" />
      <Shade d="M80 16 L120 16 L124 40 L112 40 L118 206 L92 206 L84 100 L86 40 L82 40Z" opacity={0.1} />
      <path d="M40 16 L120 16" stroke="black" strokeOpacity={0.18} strokeWidth={3} />
      <Sheen d="M40 16 L36 40 L48 40 L44 22 Z" opacity={0.18} />
    </svg>
  );
}

export const GARMENTS = {
  tee: TeeGarment,
  hoodie: HoodieGarment,
  sweater: SweaterGarment,
  jacket: JacketGarment,
  dress: DressGarment,
  skirt: SkirtGarment,
  trousers: TrousersGarment,
} as const;

export type GarmentType = keyof typeof GARMENTS;
