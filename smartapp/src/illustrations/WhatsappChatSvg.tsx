import React from 'react';

const WhatsAppChatSVG = () => {
  return (
    <div className="w-full max-w-sm animate-float">
      <svg viewBox="0 0 300 400" className="w-full h-auto">
        <defs>
          <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1F2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          <linearGradient id="whatsappGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#25D366" />
            <stop offset="100%" stopColor="#128C7E" />
          </linearGradient>
          <linearGradient id="messageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DCF8C6" />
            <stop offset="100%" stopColor="#B8E6B8" />
          </linearGradient>
          <filter id="phoneShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="10" stdDeviation="20" floodColor="#000000" floodOpacity="0.2"/>
          </filter>
        </defs>

        {/* Phone Frame */}
        <rect x="50" y="30" width="200" height="340" rx="25" fill="url(#phoneGradient)" filter="url(#phoneShadow)" />
        <rect x="60" y="40" width="180" height="320" rx="15" fill="#000000" />

        {/* Screen */}
        <rect x="65" y="45" width="170" height="310" rx="10" fill="#E5DDD5" />

        {/* WhatsApp Header */}
        <rect x="65" y="45" width="170" height="50" rx="10" fill="url(#whatsappGreen)" />
        <rect x="65" y="80" width="170" height="15" fill="url(#whatsappGreen)" />
        
        {/* Back Arrow */}
        <path d="M80 65 L85 70 L80 75" stroke="white" strokeWidth="2" fill="none" />
        
        {/* Contact Avatar */}
        <circle cx="110" cy="70" r="15" fill="white" opacity="0.9" />
        <text x="110" y="75" fontSize="12" textAnchor="middle" fill="#25D366" fontWeight="bold">JD</text>
        
        {/* Contact Name */}
        <text x="135" y="68" fontSize="12" fontWeight="bold" fill="white">John Doe</text>
        <text x="135" y="82" fontSize="10" fill="rgba(255,255,255,0.8)">Online</text>
        
        {/* Status Indicators */}
        <circle cx="200" cy="65" r="3" fill="white" className="animate-pulse" />
        <circle cx="210" cy="65" r="3" fill="white" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        <circle cx="220" cy="65" r="3" fill="white" className="animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Chat Messages */}
        <g className="animate-slide-up">
          {/* Incoming Message 1 */}
          <rect x="75" y="120" width="120" height="30" rx="15" fill="white" />
          <text x="85" y="135" fontSize="10" fill="#333">Hi! I'm interested in your</text>
          <text x="85" y="147" fontSize="10" fill="#333">CRM services</text>
          <text x="170" y="147" fontSize="8" fill="#999">10:30</text>
        </g>

        <g className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
          {/* Outgoing Message 1 (Automated) */}
          <rect x="105" y="165" width="120" height="45" rx="15" fill="url(#messageGradient)" />
          <text x="115" y="180" fontSize="10" fill="#333">Hello! Thanks for your interest.</text>
          <text x="115" y="192" fontSize="10" fill="#333">Our team will contact you</text>
          <text x="115" y="204" fontSize="10" fill="#333">within 30 minutes.</text>
          <text x="205" y="204" fontSize="8" fill="#666">10:31</text>
          <path d="M215 200 L220 205 L215 210" stroke="#25D366" strokeWidth="1" fill="none" />
        </g>

        <g className="animate-slide-up" style={{ animationDelay: '1s' }}>
          {/* Incoming Message 2 */}
          <rect x="75" y="225" width="100" height="30" rx="15" fill="white" />
          <text x="85" y="240" fontSize="10" fill="#333">That's great! Can I get</text>
          <text x="85" y="252" fontSize="10" fill="#333">more details?</text>
          <text x="155" y="252" fontSize="8" fill="#999">10:32</text>
        </g>

        <g className="animate-slide-up" style={{ animationDelay: '1.5s' }}>
          {/* Outgoing Message 2 (Automated with options) */}
          <rect x="85" y="270" width="140" height="60" rx="15" fill="url(#messageGradient)" />
          <text x="95" y="285" fontSize="10" fill="#333">Sure! Please select what</text>
          <text x="95" y="297" fontSize="10" fill="#333">you'd like to know about:</text>
          
          <rect x="95" y="305" width="60" height="18" rx="9" fill="white" stroke="#25D366" strokeWidth="1" />
          <text x="125" y="316" fontSize="8" textAnchor="middle" fill="#25D366">Pricing</text>
          
          <rect x="160" y="305" width="60" height="18" rx="9" fill="white" stroke="#25D366" strokeWidth="1" />
          <text x="190" y="316" fontSize="8" textAnchor="middle" fill="#25D366">Features</text>
          
          <text x="205" y="327" fontSize="8" fill="#666">10:33</text>
          <path d="M215 323 L220 328 L215 333" stroke="#25D366" strokeWidth="1" fill="none" />
        </g>

        {/* Typing Indicator */}
        <g className="animate-fade-in" style={{ animationDelay: '2s' }}>
          <rect x="75" y="350" width="60" height="20" rx="10" fill="white" />
          <circle cx="85" cy="360" r="2" fill="#999" className="animate-bounce">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="95" cy="360" r="2" fill="#999" className="animate-bounce" style={{ animationDelay: '0.2s' }}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" begin="0.2s" />
          </circle>
          <circle cx="105" cy="360" r="2" fill="#999" className="animate-bounce" style={{ animationDelay: '0.4s' }}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" begin="0.4s" />
          </circle>
        </g>

        {/* Input Area */}
        <rect x="70" y="375" width="130" height="25" rx="12" fill="white" stroke="#DDD" strokeWidth="1" />
        <text x="80" y="390" fontSize="9" fill="#999">Type a message...</text>
        
        {/* Send Button */}
        <circle cx="215" cy="387" r="12" fill="url(#whatsappGreen)" />
        <path d="M210 387 L220 387 M215 382 L215 392 M218 385 L215 382 L212 385" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Floating Message Indicators */}
        <g className="animate-float-message">
          <circle cx="260" cy="100" r="8" fill="#25D366" opacity="0.8" />
          <text x="260" y="105" fontSize="8" textAnchor="middle" fill="white" fontWeight="bold">!</text>
        </g>
        
        <g className="animate-float-message" style={{ animationDelay: '1s' }}>
          <circle cx="280" cy="150" r="6" fill="#FF6B6B" opacity="0.8" />
          <text x="280" y="154" fontSize="6" textAnchor="middle" fill="white" fontWeight="bold">2</text>
        </g>
      </svg>

      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes float-message {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-5px) translateX(2px); }
          66% { transform: translateY(5px) translateX(-2px); }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-float-message { animation: float-message 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default WhatsAppChatSVG;