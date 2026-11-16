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
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EEF3FC] via-[#F8FAFD] to-[#FBF6E8] text-[#1B3B8B] p-6 text-center ${className}`}
      >
        <Building2 className="w-8 h-8 mb-2 opacity-60 text-[#9A6B11]" aria-hidden="true" />
        <span className="text-xs font-medium text-[#55627A] max-w-[220px]">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#EEF3FC]/50 ${className}`}>
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
