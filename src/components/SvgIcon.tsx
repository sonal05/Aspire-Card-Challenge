import Image from 'next/image';

interface SvgIconProps {
  name: string;
  className?: string;
  width?: number;
  height?: number;
}

export function SvgIcon({ name, className = '', width = 24, height = 24 }: SvgIconProps) {
  return (
    <Image 
      src={`/assets/${name}.svg`}
      alt={name}
      className={className}
      width={width}
      height={height}
    />
  );
}
