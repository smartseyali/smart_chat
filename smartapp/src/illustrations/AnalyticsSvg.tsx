import React from 'react';

const AnalyticsSVG = () => {
  return (
    <div className="w-full max-w-lg animate-float">
      <svg viewBox="0 0 500 400" className="w-full h-auto">
        <defs>
          <linearGradient id="analyticsBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EFF6FF" />
            <stop offset="100%" stopColor="#F0F9FF" />
          </linearGradient>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="growthGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <filter id="chartShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.1"/>
          </filter>
        </defs>

        {/* Background */}
        <rect width="500" height="400" fill="url(#analyticsBg)" rx="20" />

        {/* Main Dashboard Container */}
        <rect x="50" y="50" width="400" height="300" rx="15" fill="white" stroke="#E5E7EB" strokeWidth="2" filter="url(#chartShadow)" />

        {/* Dashboard Header */}
        <rect x="70" y="70" width="360" height="40" rx="8" fill="#F8FAFC" />
        <text x="90" y="88" fontSize="16" fontWeight="bold" fill="#1E293B">Business Analytics Dashboard</text>
        <text x="90" y="105" fontSize="12" fill="#64748B">Real-time performance metrics</text>

        {/* Status Indicators */}
        <circle cx="380" cy="85" r="4" fill="#10B981" className="animate-pulse" />
        <circle cx="395" cy="85" r="4" fill="#3B82F6" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        <circle cx="410" cy="85" r="4" fill="#F59E0B" className="animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Main Chart Area */}
        <rect x="70" y="130" width="200" height="150" rx="8" fill="#FAFAFA" stroke="#E5E7EB" strokeWidth="1" />
        <text x="90" y="150" fontSize="12" fontWeight="semibold" fill="#374151">Revenue Growth</text>

        {/* Animated Growth Chart */}
        <g className="animate-draw-chart">
          <path d="M90 250 L120 230 L150 200 L180 180 L210 160 L240 140" 
                stroke="url(#growthGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
          
          {/* Chart Points */}
          <circle cx="90" cy="250" r="4" fill="#10B981" className="animate-pulse-point" />
          <circle cx="120" cy="230" r="4" fill="#10B981" className="animate-pulse-point" style={{ animationDelay: '0.2s' }} />
          <circle cx="150" cy="200" r="4" fill="#06B6D4" className="animate-pulse-point" style={{ animationDelay: '0.4s' }} />
          <circle cx="180" cy="180" r="4" fill="#06B6D4" className="animate-pulse-point" style={{ animationDelay: '0.6s' }} />
          <circle cx="210" cy="160" r="4" fill="#0EA5E9" className="animate-pulse-point" style={{ animationDelay: '0.8s' }} />
          <circle cx="240" cy="140" r="4" fill="#0EA5E9" className="animate-pulse-point" style={{ animationDelay: '1s' }} />

          {/* Area fill */}
          <path d="M90 250 L120 230 L150 200 L180 180 L210 160 L240 140 L240 270 L90 270 Z" 
                fill="url(#growthGradient)" opacity="0.2" />
        </g>

        {/* Grid Lines */}
        <g stroke="#E5E7EB" strokeWidth="1" opacity="0.5">
          <line x1="90" y1="160" x2="250" y2="160" />
          <line x1="90" y1="190" x2="250" y2="190" />
          <line x1="90" y1="220" x2="250" y2="220" />
          <line x1="90" y1="250" x2="250" y2="250" />
        </g>

        {/* Pie Chart */}
        <g className="animate-spin-slow" style={{ transformOrigin: '350px 180px' }}>
          <circle cx="350" cy="180" r="35" fill="none" stroke="#E5E7EB" strokeWidth="2" />
          
          {/* Pie Segments */}
          <path d="M350 145 A35 35 0 0 1 375 195 L350 180 Z" fill="#3B82F6" />
          <path d="M375 195 A35 35 0 0 1 330 205 L350 180 Z" fill="#10B981" />
          <path d="M330 205 A35 35 0 0 1 345 150 L350 180 Z" fill="#F59E0B" />
          <path d="M345 150 A35 35 0 0 1 350 145 L350 180 Z" fill="#EF4444" />
        </g>

        <text x="350" y="235" fontSize="11" fontWeight="semibold" fill="#374151" textAnchor="middle">Customer Segments</text>

        {/* Bar Chart */}
        <g className="animate-grow-bars">
          <rect x="290" y="250" width="15" height="30" rx="2" fill="#3B82F6" className="animate-bar-grow" />
          <rect x="310" y="235" width="15" height="45" rx="2" fill="#10B981" className="animate-bar-grow" style={{ animationDelay: '0.2s' }} />
          <rect x="330" y="220" width="15" height="60" rx="2" fill="#F59E0B" className="animate-bar-grow" style={{ animationDelay: '0.4s' }} />
          <rect x="350" y="200" width="15" height="80" rx="2" fill="#EF4444" className="animate-bar-grow" style={{ animationDelay: '0.6s' }} />
          <rect x="370" y="185" width="15" height="95" rx="2" fill="#8B5CF6" className="animate-bar-grow" style={{ animationDelay: '0.8s' }} />
        </g>

        {/* Metrics Cards */}
        <g className="animate-slide-up">
          <rect x="70" y="300" width="80" height="40" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <text x="90" y="315" fontSize="18" fontWeight="bold" fill="#10B981">+45%</text>
          <text x="90" y="330" fontSize="10" fill="#64748B">Growth Rate</text>
          <path d="M135 310 L145 305 L140 308" stroke="#10B981" strokeWidth="1.5" fill="none" />
        </g>

        <g className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <rect x="160" y="300" width="80" height="40" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <text x="180" y="315" fontSize="18" fontWeight="bold" fill="#3B82F6">$125K</text>
          <text x="180" y="330" fontSize="10" fill="#64748B">Revenue</text>
          <circle cx="225" cy="315" r="2" fill="#3B82F6" className="animate-pulse" />
        </g>

        <g className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <rect x="250" y="300" width="80" height="40" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <text x="270" y="315" fontSize="18" fontWeight="bold" fill="#F59E0B">89%</text>
          <text x="270" y="330" fontSize="10" fill="#64748B">Satisfaction</text>
          <rect x="315" y="312" width="10" height="6" rx="3" fill="#F59E0B" className="animate-pulse" />
        </g>

        <g className="animate-slide-up" style={{ animationDelay: '0.9s' }}>
          <rect x="340" y="300" width="80" height="40" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <text x="360" y="315" fontSize="16" fontWeight="bold" fill="#EF4444">1.2K</text>
          <text x="360" y="330" fontSize="10" fill="#64748B">New Users</text>
          <path d="M405 308 L415 315 L410 318" stroke="#EF4444" strokeWidth="1.5" fill="none" />
        </g>

        {/* Floating Analytics Icons */}
        <g className="animate-float-icon">
          <circle cx="450" cy="80" r="20" fill="white" stroke="#3B82F6" strokeWidth="2" filter="url(#chartShadow)" />
          <rect x="444" y="74" width="12" height="12" rx="1" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
          <rect x="446" y="82" width="2" height="4" fill="#3B82F6" />
          <rect x="449" y="79" width="2" height="7" fill="#3B82F6" />
          <rect x="452" y="76" width="2" height="10" fill="#3B82F6" />
        </g>

        <g className="animate-float-icon" style={{ animationDelay: '1s' }}>
          <circle cx="30" cy="150" r="18" fill="white" stroke="#10B981" strokeWidth="2" filter="url(#chartShadow)" />
          <path d="M25 150 L30 145 L35 150" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="30" y1="145" x2="30" y2="155" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
        </g>

        <g className="animate-float-icon" style={{ animationDelay: '2s' }}>
          <circle cx="470" cy="250" r="16" fill="white" stroke="#F59E0B" strokeWidth="2" filter="url(#chartShadow)" />
          <circle cx="470" cy="250" r="6" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M470 244 L470 250 L476 250" stroke="#F59E0B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>

        {/* Data Stream Lines */}
        <g className="animate-data-flow" stroke="#3B82F6" strokeWidth="1.5" fill="none" strokeDasharray="4,4" opacity="0.4">
          <path d="M430 100 Q400 120 370 100" />
          <path d="M50 200 Q80 220 110 200" />
          <path d="M450 280 Q420 300 390 280" />
        </g>
      </svg>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes draw-chart {
          0% { stroke-dasharray: 0 300; }
          100% { stroke-dasharray: 300 0; }
        }
        @keyframes pulse-point {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.7; }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bar-grow {
          0% { transform: scaleY(0); transform-origin: bottom; }
          100% { transform: scaleY(1); }
        }
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes float-icon {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-8px) translateX(2px); }
          66% { transform: translateY(4px) translateX(-2px); }
        }
        @keyframes data-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 20; }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-draw-chart { animation: draw-chart 2s ease-out; }
        .animate-pulse-point { animation: pulse-point 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-bar-grow { animation: bar-grow 1s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-float-icon { animation: float-icon 4s ease-in-out infinite; }
        .animate-data-flow { animation: data-flow 3s linear infinite; }
      `}</style>
    </div>
  );
};

export default AnalyticsSVG;