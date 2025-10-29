import React from 'react';
import { Z_INDEX } from '../data/constants';

const StarBackground = () => {
  return (
    <div
      className="fixed inset-0"
      style={{ pointerEvents: 'none', zIndex: Z_INDEX.background + 5 }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="transparent" />
        
        {/* Scattered stars - top section */}
        <circle cx="3%" cy="2%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="12%" cy="7%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="23%" cy="4%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="31%" cy="9%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="42%" cy="3%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="57%" cy="8%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="68%" cy="2%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="79%" cy="6%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="88%" cy="3%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="97%" cy="7%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="8%" cy="12%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="19%" cy="15%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="37%" cy="14%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="52%" cy="11%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="73%" cy="13%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="93%" cy="16%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        
        {/* Scattered stars - middle section */}
        <circle cx="5%" cy="28%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="14%" cy="36%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="27%" cy="42%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="38%" cy="31%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="49%" cy="47%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="61%" cy="33%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="72%" cy="44%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="83%" cy="29%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="94%" cy="39%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="3%" cy="51%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="21%" cy="53%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="33%" cy="58%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="46%" cy="62%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="59%" cy="56%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="77%" cy="61%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="89%" cy="54%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        
        {/* Scattered stars - bottom section */}
        <circle cx="7%" cy="73%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="18%" cy="81%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="29%" cy="76%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="41%" cy="84%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="53%" cy="79%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="64%" cy="87%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="76%" cy="82%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="87%" cy="89%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="96%" cy="78%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="11%" cy="93%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="24%" cy="91%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="36%" cy="97%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="48%" cy="94%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="62%" cy="96%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="73%" cy="92%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
        <circle cx="85%" cy="98%" r="0.5" fill="white" filter="drop-shadow(0 0 1px white)" />
      </svg>
    </div>
  );
};

export default StarBackground;