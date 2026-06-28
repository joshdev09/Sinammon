import React from 'react';

interface TextProps {
  children: React.ReactNode;
  font?: 'dm';
  size?: string;
}

export default function Text({ children, font = 'dm', size = '16px' }: TextProps) {
  
  const fontStyles = {
    dm: 'dm-sans-uniquifier' //Main
  };

  const selectedFontClass = fontStyles[font];

  return (
    <div className={selectedFontClass} style={{ fontSize: size }}>
      {children}
    </div>
  );
}