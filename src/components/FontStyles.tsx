import React from 'react';

const InlineStyle = () => {
  return (
    <style>
      {`
        @font-face {
          font-family: 'CustomFont';
          src: url('./fonts/your_font.ttf') format('truetype');
          /* Yazı tipi dosyasının yolunu yukarıdaki satırda güncelleyin */
        }
      `}
    </style>
  );
};

export default InlineStyle;