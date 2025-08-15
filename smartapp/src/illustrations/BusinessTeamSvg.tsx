import React from 'react';

const BusinessTeamSVG = () => {
  return (
    <div className="w-full max-w-lg animate-float">
      <svg viewBox="0 0 500 400" className="w-full h-auto">
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EBF8FF" />
            <stop offset="100%" stopColor="#F0FDFA" />
          </linearGradient>
          <linearGradient id="personGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="laptopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>
        
        {/* Background */}
        <rect width="500" height="400" fill="url(#bgGradient)" rx="20" />
        
        {/* WhatsApp Chat Bubbles */}
        <g className="animate-bounce-slow">
          <circle cx="400" cy="80" r="30" fill="#25D366" opacity="0.9" />
          <path d="M390 75 l8 0 l0 8 l-8 0 z" fill="white" />
          <circle cx="408" cy="83" r="2" fill="white" />
        </g>
        
        <g className="animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
          <circle cx="450" cy="120" r="25" fill="#25D366" opacity="0.8" />
          <path d="M443 115 l6 0 l0 6 l-6 0 z" fill="white" />
          <circle cx="449" cy="121" r="1.5" fill="white" />
        </g>

        {/* CRM Dashboard */}
        <rect x="50" y="50" width="120" height="80" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="2">
          <animate attributeName="y" values="50;45;50" dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="60" y="65" width="100" height="8" rx="4" fill="#3B82F6" opacity="0.3" />
        <rect x="60" y="80" width="80" height="8" rx="4" fill="#10B981" opacity="0.3" />
        <rect x="60" y="95" width="90" height="8" rx="4" fill="#F59E0B" opacity="0.3" />
        <circle cx="150" cy="115" r="8" fill="#10B981" />
        
        {/* Person 1 - Main presenter */}
        <g className="animate-sway">
          <ellipse cx="200" cy="320" rx="25" ry="8" fill="#E5E7EB" opacity="0.3" />
          <rect x="185" y="250" width="30" height="70" rx="15" fill="url(#personGradient)" />
          <circle cx="200" cy="230" r="18" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
          <rect x="190" y="265" width="20" height="3" rx="1.5" fill="white" opacity="0.9" />
        </g>
        
        {/* Person 2 - Side collaborator */}
        <g className="animate-sway" style={{ animationDelay: '1s' }}>
          <ellipse cx="280" cy="320" rx="20" ry="6" fill="#E5E7EB" opacity="0.3" />
          <rect x="270" y="260" width="25" height="60" rx="12" fill="#10B981" />
          <circle cx="282" cy="245" r="15" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
          <rect x="275" y="270" width="15" height="2" rx="1" fill="white" opacity="0.9" />
        </g>
        
        {/* Laptop */}
        <g className="animate-pulse-slow">
          <rect x="160" y="290" width="80" height="50" rx="4" fill="url(#laptopGradient)" />
          <rect x="165" y="295" width="70" height="40" rx="2" fill="#1E293B" />
          <rect x="170" y="300" width="60" height="30" rx="1" fill="#3B82F6" opacity="0.2" />
          
          {/* Screen content - Dashboard */}
          <rect x="175" y="305" width="15" height="2" rx="1" fill="#3B82F6" opacity="0.6" />
          <rect x="175" y="310" width="20" height="2" rx="1" fill="#10B981" opacity="0.6" />
          <rect x="175" y="315" width="12" height="2" rx="1" fill="#F59E0B" opacity="0.6" />
          <circle cx="215" cy="315" r="8" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
          <path d="M210 315 l10 0 M215 310 l0 10" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
        </g>
        
        {/* Floating Charts */}
        <g className="animate-float-reverse">
          <rect x="320" y="180" width="60" height="40" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
          <path d="M330 210 L340 200 L350 205 L360 195 L370 190" stroke="#10B981" strokeWidth="2" fill="none" />
          <circle cx="330" cy="210" r="2" fill="#10B981" />
          <circle cx="370" cy="190" r="2" fill="#10B981" />
        </g>
        
        {/* Connection Lines */}
        <g className="animate-dash" stroke="#3B82F6" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.4">
          <path d="M170 130 Q200 150 240 130" />
          <path d="M280 200 Q320 220 380 200" />
        </g>
        
        {/* Growth Arrow */}
        <g className="animate-bounce">
          <path d="M350 280 L380 250 L375 255 M380 250 L375 260" stroke="#10B981" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      </svg>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
        }
        @keyframes sway {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          33% { transform: translateX(2px) rotate(1deg); }
          66% { transform: translateX(-2px) rotate(-1deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes dash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 20; }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 4s ease-in-out infinite; }
        .animate-sway { animation: sway 4s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .animate-dash { animation: dash 2s linear infinite; }
      `}</style>
    </div>
  );
};

export default BusinessTeamSVG;