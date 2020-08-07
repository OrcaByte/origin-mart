import React from 'react';
import appLogo from '../assets/images/applogo.png';
import medLogo from '../assets/images/med360.jpeg';

export default function AppIcon({ width = 96, height = 'auto' }) {
  return (
    <div style={{ objectFit: 'cover', width, height }}>
      <img src={appLogo} alt="med 360 icon" />
    </div>
  );
}

export function MedIcon({ width = '96px' }) {
  return (
    <div style={{ objectFit: 'cover', width }}>
      <img src={medLogo} alt="med 360 icon" />
    </div>
  );
}
