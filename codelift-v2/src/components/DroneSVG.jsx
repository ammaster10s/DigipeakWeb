import React from 'react';

const DroneSVG = ({ isFlying, rotate, z, size = 120 }) => (
    <div
        className="relative transition-all duration-700 ease-in-out"
        style={{ transform: `rotate(${rotate}deg) scale(${1 + (z / 200)})` }}
    >
        <svg width={size} height={size} viewBox="0 0 120 120">
            <path d="M40 40L80 80M80 40L40 80" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
            <rect x="45" y="45" width="30" height="30" rx="8" fill="#334155" />
            <rect x="52" y="52" width="16" height="10" rx="2" fill="#60a5fa" />
            {[{ x: 40, y: 40 }, { x: 80, y: 40 }, { x: 40, y: 80 }, { x: 80, y: 80 }].map((m, i) => (
                <g key={i}>
                    <circle cx={m.x} cy={m.y} r="8" fill="#1e293b" />
                    <ellipse cx={m.x} cy={m.y} rx="15" ry="3" fill="#94a3b8">
                        {isFlying && (
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from={`0 ${m.x} ${m.y}`}
                                to={`360 ${m.x} ${m.y}`}
                                dur="0.4s"
                                repeatCount="indefinite"
                            />
                        )}
                    </ellipse>
                </g>
            ))}
        </svg>
    </div>
);

export default DroneSVG;
