import React from 'react';

const TechSupportSVG = () => {
  return (
    <div className="w-full max-w-md animate-float">
      <svg viewBox="0 0 400 450" className="w-full h-auto">
        <defs>
          <linearGradient id="supportBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDF4FF" />
            <stop offset="100%" stopColor="#F3E8FF" />
          </linearGradient>
          <linearGradient id="supportGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          <linearGradient id="laptopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="100%" stopColor="#1F2937" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect width="400" height="450" fill="url(#supportBg)" rx="20" />

        {/* Desk */}
        <ellipse cx="200" cy="400" rx="150" ry="20" fill="#E5E7EB" opacity="0.6" />
        <rect x="50" y="380" width="300" height="40" rx="5" fill="#F3F4F6" />

        {/* Support Agent */}
        <g className="animate-sway">
          {/* Body */}
          <rect x="170" y="280" width="60" height="120" rx="30" fill="url(#supportGradient)" />
          
          {/* Head */}
          <circle cx="200" cy="250" r="25" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
          
          {/* Hair */}
          <path d="M180 235 Q200 220 220 235 Q215 225 200 225 Q185 225 180 235" fill="#92400E" />
          
          {/* Eyes */}
          <circle cx="195" cy="248" r="2" fill="#1F2937" />
          <circle cx="205" cy="248" r="2" fill="#1F2937" />
          
          {/* Smile */}
          <path d="M195 255 Q200 260 205 255" stroke="#F59E0B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          
          {/* Arms */}
          <rect x="150" y="300" width="20" height="60" rx="10" fill="url(#supportGradient)" transform="rotate(-15 160 330)" />
          <rect x="230" y="300" width="20" height="60" rx="10" fill="url(#supportGradient)" transform="rotate(15 240 330)" />
          
          {/* Hands */}
          <circle cx="155" cy="365" r="8" fill="#FEF3C7" />
          <circle cx="245" cy="365" r="8" fill="#FEF3C7" />
        </g>

        {/* Headset */}
        <g className="animate-pulse-slow">
          <path d="M175 235 Q200 210 225 235" stroke="#1F2937" strokeWidth="4" fill="none" />
          <circle cx="175" cy="240" r="8" fill="#1F2937" />
          <circle cx="225" cy="240" r="8" fill="#1F2937" />
          <path d="M175 250 L170 265" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
          <circle cx="168" cy="268" r="4" fill="#EF4444" className="animate-pulse" />
        </g>

        {/* Laptop */}
        <g className="animate-typing">
          <rect x="140" y="360" width="120" height="80" rx="5" fill="url(#laptopGradient)" />
          <rect x="145" y="365" width="110" height="70" rx="3" fill="#111827" />
          <rect x="150" y="370" width="100" height="60" rx="2" fill="#1E293B" />
          
          {/* Screen Content */}
          <rect x="155" y="375" width="90" height="50" rx="1" fill="#0F172A" />
          
          {/* Code/Support Interface */}
          <rect x="160" y="380" width="25" height="3" rx="1" fill="#10B981" />
          <rect x="160" y="386" width="35" height="3" rx="1" fill="#3B82F6" />
          <rect x="160" y="392" width="20" height="3" rx="1" fill="#F59E0B" />
          <rect x="160" y="398" width="40" height="3" rx="1" fill="#EF4444" />
          <rect x="160" y="404" width="30" height="3" rx="1" fill="#8B5CF6" />
          
          {/* Terminal Cursor */}
          <rect x="195" y="404" width="2" height="3" fill="#10B981" className="animate-blink" />
        </g>

        {/* Multiple Monitor Setup */}
        <rect x="280" y="280" width="80" height="50" rx="3" fill="url(#laptopGradient)" />
        <rect x="285" y="285" width="70" height="40" rx="2" fill="#111827" />
        
        {/* Monitor Content - Dashboard */}
        <rect x="290" y="290" width="60" height="30" rx="1" fill="#0F172A" />
        <rect x="295" y="295" width="15" height="2" rx="1" fill="#3B82F6" opacity="0.6" />
        <rect x="295" y="299" width="20" height="2" rx="1" fill="#10B981" opacity="0.6" />
        <rect x="295" y="303" width="12" height="2" rx="1" fill="#F59E0B" opacity="0.6" />
        
        {/* Status indicators */}
        <circle cx="330" cy="300" r="3" fill="#10B981" className="animate-pulse" />
        <circle cx="340" cy="300" r="3" fill="#3B82F6" className="animate-pulse" style={{ animationDelay: '0.5s' }} />

        {/* Floating Help Icons */}
        <g className="animate-float-up">
          <circle cx="100" cy="150" r="20" fill="white" stroke="#8B5CF6" strokeWidth="2" filter="url(#glow)" />
          <text x="100" y="158" fontSize="18" textAnchor="middle" fill="#8B5CF6" fontWeight="bold">?</text>
        </g>

        <g className="animate-float-up" style={{ animationDelay: '0.7s' }}>
          <circle cx="320" cy="120" r="18" fill="white" stroke="#10B981" strokeWidth="2" filter="url(#glow)" />
          <path d="M312 115 L320 123 L328 112" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <g className="animate-float-up" style={{ animationDelay: '1.4s' }}>
          <circle cx="80" cy="200" r="16" fill="white" stroke="#EF4444" strokeWidth="2" filter="url(#glow)" />
          <text x="80" y="207" fontSize="14" textAnchor="middle" fill="#EF4444" fontWeight="bold">!</text>
        </g>

        {/* Chat Bubbles */}
        <g className="animate-slide-in">
          <rect x="50" y="80" width="100" height="40" rx="20" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <text x="70" y="95" fontSize="10" fill="#374151">Need help with</text>
          <text x="70" y="108" fontSize="10" fill="#374151">installation?</text>
          <circle cx="135" cy="115" r="3" fill="#8B5CF6" />
        </g>

        <g className="animate-slide-in" style={{ animationDelay: '1s' }}>
          <rect x="250" y="50" width="120" height="50" rx="25" fill="#8B5CF6" />
          <text x="270" y="70" fontSize="10" fill="white">I'm here to help!</text>
          <text x="270" y="83" fontSize="10" fill="white">Let me guide you</text>
          <text x="270" y="96" fontSize="10" fill="white">through the process.</text>
          <circle cx="260" cy="45" r="3" fill="#8B5CF6" />
        </g>

        {/* Notification Badges */}
        <g className="animate-bounce-slow">
          <circle cx="350" cy="200" r="12" fill="#EF4444" />
          <text x="350" y="205" fontSize="10" textAnchor="middle" fill="white" fontWeight="bold">3</text>
        </g>

        <g className="animate-bounce-slow" style={{ animationDelay: '0.8s' }}>
          <circle cx="300" cy="180" r="10" fill="#10B981" />
          <path d="M296 178 L299 182 L304 176" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>

        {/* Connectivity Lines */}
        <g className="animate-pulse" stroke="#8B5CF6" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.4">
          <path d="M200 200 Q250 180 300 200" />
          <path d="M150 220 Q200 240 250 220" />
        </g>
      </svg>

      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes sway {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          33% { transform: translateX(2px) rotate(1deg); }
          66% { transform: translateX(-2px) rotate(-1deg); }
        }
        @keyframes float-up {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes slide-in {
          0% { transform: translateX(-30px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes typing {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-sway { animation: sway 4s ease-in-out infinite; }
        .animate-float-up { animation: float-up 3s ease-in-out infinite; }
        .animate-slide-in { animation: slide-in 0.8s ease-out forwards; }
        .animate-typing { animation: typing 2s ease-in-out infinite; }
        .animate-blink { animation: blink 1s step-end infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default TechSupportSVG;