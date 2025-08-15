import React from 'react';

const ContactSVG = () => {
  return (
    <div className="w-full max-w-md animate-float">
      <svg viewBox="0 0 400 450" className="w-full h-auto">
        <defs>
          <linearGradient id="contactBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="deviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect width="400" height="450" fill="url(#contactBg)" rx="20" />

        {/* Floating Connection Nodes */}
        <g className="animate-float-node">
          <circle cx="80" cy="100" r="8" fill="#3B82F6" opacity="0.8" filter="url(#glow)" />
          <circle cx="320" cy="120" r="6" fill="#10B981" opacity="0.8" filter="url(#glow)" />
          <circle cx="350" cy="200" r="7" fill="#F59E0B" opacity="0.8" filter="url(#glow)" />
          <circle cx="60" cy="250" r="5" fill="#EF4444" opacity="0.8" filter="url(#glow)" />
        </g>

        {/* Connection Lines */}
        <g className="animate-pulse-line" stroke="#3B82F6" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.4">
          <path d="M80 100 Q150 80 200 120" />
          <path d="M320 120 Q280 160 250 200" />
          <path d="M350 200 Q300 250 250 280" />
          <path d="M60 250 Q120 270 180 260" />
        </g>

        {/* Central Hub - Multiple Devices */}
        <g className="animate-central-pulse">
          <circle cx="200" cy="225" r="40" fill="url(#screenGlow)" opacity="0.2" />
          <circle cx="200" cy="225" r="25" fill="url(#screenGlow)" opacity="0.4" />
          <circle cx="200" cy="225" r="15" fill="#3B82F6" />
        </g>

        {/* Laptop */}
        <g className="animate-device-float">
          <rect x="150" y="180" width="100" height="60" rx="5" fill="url(#deviceGradient)" />
          <rect x="155" y="185" width="90" height="50" rx="3" fill="#111827" />
          <rect x="160" y="190" width="80" height="40" rx="2" fill="#1F2937" />
          
          {/* Screen Content */}
          <rect x="165" y="195" width="70" height="30" rx="1" fill="#0F172A" />
          <rect x="170" y="200" width="20" height="3" rx="1" fill="#3B82F6" opacity="0.6" />
          <rect x="170" y="206" width="25" height="3" rx="1" fill="#10B981" opacity="0.6" />
          <rect x="170" y="212" width="15" height="3" rx="1" fill="#F59E0B" opacity="0.6" />
          
          {/* Form elements */}
          <rect x="205" y="200" width="25" height="8" rx="2" fill="#374151" />
          <rect x="205" y="212" width="25" height="8" rx="2" fill="#374151" />
          <rect x="215" y="224" width="12" height="4" rx="2" fill="#3B82F6" className="animate-pulse" />
        </g>

        {/* Smartphone */}
        <g className="animate-device-float" style={{ animationDelay: '0.5s' }}>
          <rect x="280" y="160" width="40" height="70" rx="8" fill="url(#deviceGradient)" />
          <rect x="285" y="165" width="30" height="60" rx="5" fill="#111827" />
          <rect x="288" y="170" width="24" height="45" rx="2" fill="#1F2937" />
          
          {/* Screen Content - Messages */}
          <rect x="290" y="175" width="20" height="35" rx="1" fill="#0F172A" />
          <rect x="292" y="178" width="8" height="4" rx="2" fill="#10B981" />
          <rect x="302" y="185" width="6" height="4" rx="2" fill="#3B82F6" />
          <rect x="292" y="192" width="10" height="4" rx="2" fill="#10B981" />
          <rect x="300" y="199" width="8" height="4" rx="2" fill="#3B82F6" />
          
          {/* Typing indicator */}
          <circle cx="295" cy="208" r="1" fill="#64748B" className="animate-bounce" />
          <circle cx="298" cy="208" r="1" fill="#64748B" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
          <circle cx="301" cy="208" r="1" fill="#64748B" className="animate-bounce" style={{ animationDelay: '0.4s' }} />
        </g>

        {/* Tablet */}
        <g className="animate-device-float" style={{ animationDelay: '1s' }}>
          <rect x="120" y="300" width="60" height="80" rx="6" fill="url(#deviceGradient)" />
          <rect x="125" y="305" width="50" height="70" rx="4" fill="#111827" />
          <rect x="128" y="310" width="44" height="60" rx="2" fill="#1F2937" />
          
          {/* Screen Content - Dashboard */}
          <rect x="130" y="315" width="40" height="50" rx="1" fill="#0F172A" />
          <rect x="135" y="320" width="12" height="2" rx="1" fill="#3B82F6" opacity="0.6" />
          <rect x="135" y="325" width="15" height="2" rx="1" fill="#10B981" opacity="0.6" />
          <rect x="135" y="330" width="8" height="2" rx="1" fill="#F59E0B" opacity="0.6" />
          
          {/* Chart visualization */}
          <rect x="155" y="325" width="3" height="8" rx="1" fill="#3B82F6" />
          <rect x="159" y="320" width="3" height="13" rx="1" fill="#10B981" />
          <rect x="163" y="318" width="3" height="15" rx="1" fill="#F59E0B" />
          
          {/* Status dots */}
          <circle cx="140" cy="350" r="2" fill="#10B981" className="animate-pulse" />
          <circle cx="150" cy="350" r="2" fill="#3B82F6" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
          <circle cx="160" cy="350" r="2" fill="#F59E0B" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
        </g>

        {/* People Connecting */}
        <g className="animate-person-wave">
          <ellipse cx="100" cy="380" rx="15" ry="4" fill="#475569" opacity="0.3" />
          <rect x="90" y="340" width="20" height="40" rx="10" fill="#3B82F6" />
          <circle cx="100" cy="325" r="12" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
          
          {/* Waving hand */}
          <circle cx="115" cy="350" r="4" fill="#FEF3C7" />
          <rect x="112" y="348" width="8" height="2" rx="1" fill="#FEF3C7" transform="rotate(20 116 349)" />
        </g>

        <g className="animate-person-wave" style={{ animationDelay: '1s' }}>
          <ellipse cx="320" cy="380" rx="15" ry="4" fill="#475569" opacity="0.3" />
          <rect x="310" y="340" width="20" height="40" rx="10" fill="#10B981" />
          <circle cx="320" cy="325" r="12" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
          
          {/* Waving hand */}
          <circle cx="305" cy="350" r="4" fill="#FEF3C7" />
          <rect x="300" y="348" width="8" height="2" rx="1" fill="#FEF3C7" transform="rotate(-20 304 349)" />
        </g>

        {/* Message Bubbles Flying */}
        <g className="animate-message-fly">
          <ellipse cx="150" cy="120" rx="25" ry="15" fill="white" stroke="#3B82F6" strokeWidth="2" />
          <text x="150" y="125" fontSize="10" textAnchor="middle" fill="#3B82F6" fontWeight="bold">Hello!</text>
          <circle cx="138" cy="135" r="2" fill="white" />
        </g>

        <g className="animate-message-fly" style={{ animationDelay: '1.5s' }}>
          <ellipse cx="270" cy="90" rx="30" ry="18" fill="white" stroke="#10B981" strokeWidth="2" />
          <text x="270" y="95" fontSize="9" textAnchor="middle" fill="#10B981" fontWeight="bold">Get Started</text>
          <circle cx="290" cy="108" r="2" fill="white" />
        </g>

        <g className="animate-message-fly" style={{ animationDelay: '2.5s' }}>
          <ellipse cx="200" cy="60" rx="35" ry="20" fill="white" stroke="#F59E0B" strokeWidth="2" />
          <text x="200" y="65" fontSize="8" textAnchor="middle" fill="#F59E0B" fontWeight="bold">Contact Us Today</text>
          <circle cx="225" cy="80" r="2" fill="white" />
        </g>

        {/* Email Icons Floating */}
        <g className="animate-email-float">
          <rect x="50" y="150" width="30" height="20" rx="3" fill="white" stroke="#3B82F6" strokeWidth="2" />
          <path d="M55 155 L65 162 L75 155" stroke="#3B82F6" strokeWidth="1.5" fill="none" />
          <circle cx="60" cy="145" r="3" fill="#EF4444" />
        </g>

        <g className="animate-email-float" style={{ animationDelay: '1.2s' }}>
          <rect x="340" y="180" width="25" height="16" rx="2" fill="white" stroke="#10B981" strokeWidth="2" />
          <path d="M344 184 L352.5 189 L361 184" stroke="#10B981" strokeWidth="1" fill="none" />
          <circle cx="350" cy="176" r="2" fill="#EF4444" />
        </g>
      </svg>

      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-node {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-8px) translateX(4px); }
          66% { transform: translateY(8px) translateX(-4px); }
        }
        @keyframes pulse-line {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 20; }
        }
        @keyframes central-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 0.4; }
        }
        @keyframes device-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(1deg); }
        }
        @keyframes person-wave {
          0%, 100% { transform: translateY(0px); }
          25% { transform: translateY(-2px); }
          50% { transform: translateY(0px); }
          75% { transform: translateY(-2px); }
        }
        @keyframes message-fly {
          0% { transform: translateY(20px) translateX(-20px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-20px) translateX(20px); opacity: 0; }
        }
        @keyframes email-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(3deg); }
          66% { transform: translateY(5px) rotate(-3deg); }
        }
        
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-node { animation: float-node 5s ease-in-out infinite; }
        .animate-pulse-line { animation: pulse-line 3s linear infinite; }
        .animate-central-pulse { animation: central-pulse 3s ease-in-out infinite; }
        .animate-device-float { animation: device-float 6s ease-in-out infinite; }
        .animate-person-wave { animation: person-wave 3s ease-in-out infinite; }
        .animate-message-fly { animation: message-fly 4s ease-in-out infinite; }
        .animate-email-float { animation: email-float 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default ContactSVG;