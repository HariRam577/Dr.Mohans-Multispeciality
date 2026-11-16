import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface ClinicalImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}

export function ClinicalImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  eager = true,
}: ClinicalImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EAF5FC] via-[#F7FAFD] to-[#DCE7F1] text-[#1769AA] p-6 text-center ${className}`}
      >
        <Building2 className="w-8 h-8 mb-2 opacity-70 text-[#19B6C9]" aria-hidden="true" />
        <span className="text-xs font-medium text-[#64748B] max-w-[220px]">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#EAF5FC] ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
