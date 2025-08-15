import React from 'react';

const CRMDashboardSVG = () => {
  return (
    <div className="w-full max-w-md animate-float">
      <svg viewBox="0 0 400 500" className="w-full h-auto">
        <defs>
          <linearGradient id="dashboardBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.1"/>
          </filter>
        </defs>

        {/* Dashboard Container */}
        <rect x="20" y="20" width="360" height="460" rx="20" fill="url(#dashboardBg)" stroke="#E2E8F0" strokeWidth="2" filter="url(#shadow)" />
        
        {/* Header */}
        <rect x="40" y="40" width="320" height="60" rx="10" fill="url(#cardGradient)" stroke="#E2E8F0" strokeWidth="1" />
        <text x="60" y="65" fontSize="18" fontWeight="bold" fill="#1E293B">CRM Dashboard</text>
        <text x="60" y="85" fontSize="12" fill="#64748B">Customer Relationship Management</text>
        
        {/* Profile Icons */}
        <circle cx="300" cy="60" r="15" fill="url(#primaryGradient)" />
        <circle cx="330" cy="60" r="15" fill="#10B981" />
        
        {/* Stats Cards Row */}
        <g className="animate-slide-up">
          <rect x="40" y="120" width="90" height="70" rx="8" fill="url(#cardGradient)" stroke="#E2E8F0" strokeWidth="1" />
          <text x="60" y="145" fontSize="24" fontWeight="bold" fill="#3B82F6">245</text>
          <text x="60" y="165" fontSize="12" fill="#64748B">Total Leads</text>
          <path d="M100 175 L120 165 L110 170" stroke="#10B981" strokeWidth="2" fill="none" />
        </g>
        
        <g className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <rect x="150" y="120" width="90" height="70" rx="8" fill="url(#cardGradient)" stroke="#E2E8F0" strokeWidth="1" />
          <text x="170" y="145" fontSize="24" fontWeight="bold" fill="#10B981">89%</text>
          <text x="170" y="165" fontSize="12" fill="#64748B">Conversion</text>
          <circle cx="210" cy="175" r="3" fill="#10B981" className="animate-pulse" />
        </g>
        
        <g className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <rect x="260" y="120" width="100" height="70" rx="8" fill="url(#cardGradient)" stroke="#E2E8F0" strokeWidth="1" />
          <text x="280" y="145" fontSize="22" fontWeight="bold" fill="#F59E0B">$128K</text>
          <text x="280" y="165" fontSize="12" fill="#64748B">Revenue</text>
          <rect x="320" y="170" width="20" height="6" rx="3" fill="#F59E0B" className="animate-pulse" />
        </g>
        
        {/* Sales Pipeline */}
        <rect x="40" y="210" width="320" height="120" rx="10" fill="url(#cardGradient)" stroke="#E2E8F0" strokeWidth="1" />
        <text x="60" y="235" fontSize="16" fontWeight="semibold" fill="#1E293B">Sales Pipeline</text>
        
        {/* Pipeline Stages */}
        <g className="animate-slide-right">
          <rect x="60" y="250" width="80" height="8" rx="4" fill="#3B82F6" opacity="0.3" />
          <rect x="60" y="250" width="60" height="8" rx="4" fill="#3B82F6" />
          <text x="60" y="275" fontSize="11" fill="#64748B">Prospects (75%)</text>
        </g>
        
        <g className="animate-slide-right" style={{ animationDelay: '0.3s' }}>
          <rect x="60" y="285" width="80" height="8" rx="4" fill="#10B981" opacity="0.3" />
          <rect x="60" y="285" width="45" height="8" rx="4" fill="#10B981" />
          <text x="60" y="310" fontSize="11" fill="#64748B">Qualified (56%)</text>
        </g>
        
        <g className="animate-slide-right" style={{ animationDelay: '0.6s' }}>
          <rect x="190" y="250" width="80" height="8" rx="4" fill="#F59E0B" opacity="0.3" />
          <rect x="190" y="250" width="35" height="8" rx="4" fill="#F59E0B" />
          <text x="190" y="275" fontSize="11" fill="#64748B">Proposal (44%)</text>
        </g>
        
        <g className="animate-slide-right" style={{ animationDelay: '0.9s' }}>
          <rect x="190" y="285" width="80" height="8" rx="4" fill="#EF4444" opacity="0.3" />
          <rect x="190" y="285" width="25" height="8" rx="4" fill="#EF4444" />
          <text x="190" y="310" fontSize="11" fill="#64748B">Closing (31%)</text>
        </g>
        
        {/* Chart Area */}
        <rect x="300" y="250" width="50" height="70" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
        
        {/* Animated Chart Bars */}
        <rect x="310" y="300" width="8" height="20" rx="2" fill="#3B82F6" className="animate-grow-up" />
        <rect x="322" y="290" width="8" height="30" rx="2" fill="#10B981" className="animate-grow-up" style={{ animationDelay: '0.5s' }} />
        <rect x="334" y="280" width="8" height="40" rx="2" fill="#F59E0B" className="animate-grow-up" style={{ animationDelay: '1s' }} />
        
        {/* Customer List */}
        <rect x="40" y="350" width="320" height="100" rx="10" fill="url(#cardGradient)" stroke="#E2E8F0" strokeWidth="1" />
        <text x="60" y="375" fontSize="16" fontWeight="semibold" fill="#1E293B">Recent Customers</text>
        
        {/* Customer Rows */}
        <g className="animate-fade-in">
          <circle cx="70" cy="395" r="12" fill="#3B82F6" />
          <text x="90" y="400" fontSize="12" fontWeight="medium" fill="#1E293B">John Smith</text>
          <text x="280" y="400" fontSize="11" fill="#10B981">Active</text>
          <circle cx="320" cy="395" r="3" fill="#10B981" className="animate-pulse" />
        </g>
        
        <g className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <circle cx="70" cy="415" r="12" fill="#10B981" />
          <text x="90" y="420" fontSize="12" fontWeight="medium" fill="#1E293B">Sarah Johnson</text>
          <text x="280" y="420" fontSize="11" fill="#F59E0B">Pending</text>
          <circle cx="320" cy="415" r="3" fill="#F59E0B" className="animate-pulse" />
        </g>
        
        <g className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <circle cx="70" cy="435" r="12" fill="#F59E0B" />
          <text x="90" y="440" fontSize="12" fontWeight="medium" fill="#1E293B">Mike Wilson</text>
          <text x="280" y="440" fontSize="11" fill="#EF4444">Follow-up</text>
          <circle cx="320" cy="435" r="3" fill="#EF4444" className="animate-pulse" />
        </g>
      </svg>

      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-right {
          0% { transform: translateX(-20px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes grow-up {
          0% { transform: scaleY(0); transform-origin: bottom; }
          100% { transform: scaleY(1); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-slide-right { animation: slide-right 0.8s ease-out forwards; }
        .animate-grow-up { animation: grow-up 1s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default CRMDashboardSVG;