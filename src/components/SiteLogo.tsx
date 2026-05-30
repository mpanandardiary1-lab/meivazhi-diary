interface SiteLogoProps {
  size?: 'sm' | 'md';
  className?: string;
}

const sizeMap = {
  sm: 'w-9 h-9',
  md: 'w-10 h-10',
};

export function SiteLogo({ size = 'md', className = '' }: SiteLogoProps) {
  const dim = sizeMap[size];
  return (
    <img
      src="/logo.svg"
      alt="மெய்வழி புருஷோத்தம அனந்நர் ஆன்மீக நாட்குறிப்பு — Meivazhi Purushothama Ananar spiritual diary digital library logo"
      width={size === 'sm' ? 36 : 40}
      height={size === 'sm' ? 36 : 40}
      className={`${dim} shrink-0 object-contain rounded-xl shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 ${className}`}
      decoding="async"
    />
  );
}
