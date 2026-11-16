import {
  Activity,
  Apple,
  Brain,
  Droplets,
  Eye,
  FlaskConical,
  Footprints,
  HeartPulse,
  ShieldPlus,
  Stethoscope,
  UserCheck,
  Waves,
  type LucideIcon,
} from 'lucide-react';

export const SPECIALITY_ICON_MAP: Record<string, LucideIcon> = {
  'diabetes-endocrinology': Activity,
  cardiology: HeartPulse,
  gastroenterology: Stethoscope,
  'eye-care': Eye,
  'diabetic-foot-care': Footprints,
  podiatry: ShieldPlus,
  nephrology: Droplets,
  neurology: Brain,
  'vascular-surgery': Waves,
  'general-medicine': UserCheck,
  'nutrition-dietetics': Apple,
  'laboratory-diagnostics': FlaskConical,
};

interface SpecialityIconBadgeProps {
  slug: string;
  tone?: 'navy' | 'ice' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
}

export function SpecialityIconBadge({
  slug,
  tone = 'ice',
  size = 'md',
}: SpecialityIconBadgeProps) {
  const Icon = SPECIALITY_ICON_MAP[slug] ?? Stethoscope;
  const sizeClasses =
    size === 'sm'
      ? 'w-8 h-8 rounded-lg'
      : size === 'lg'
        ? 'w-11 h-11 rounded-xl'
        : 'w-9 h-9 rounded-xl';
  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-[18px] h-[18px]';
  const toneClasses =
    tone === 'navy'
      ? 'bg-[#102A5E] text-[#19B6C9] border border-[#19B6C9]/35'
      : tone === 'cyan'
        ? 'bg-[#19B6C9]/15 text-[#19B6C9] border border-[#19B6C9]/40'
        : 'bg-[#EAF5FC] text-[#1769AA] border border-[#DCE7F1]';

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${sizeClasses} ${toneClasses}`}
      aria-hidden="true"
    >
      <Icon className={iconSize} />
    </span>
  );
}

export function BrandCrestIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="11" fill="#102A5E" />
      <rect x="1.5" y="1.5" width="37" height="37" rx="9.5" stroke="#19B6C9" strokeWidth="1.5" />
      <path
        d="M16.5 9.5H23.5V16.5H30.5V23.5H23.5V30.5H16.5V23.5H9.5V16.5H16.5V9.5Z"
        fill="#FFFFFF"
      />
      <circle cx="20" cy="20" r="2.6" fill="#19B6C9" />
    </svg>
  );
}
