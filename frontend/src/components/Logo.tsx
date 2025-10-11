import { Link } from "react-router-dom";

const Logo = ({ collapsed = false }: { collapsed?: boolean }) => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <svg
        width={collapsed ? "32" : "180"}
        height={collapsed ? "32" : "50"}
        viewBox="0 0 280 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform group-hover:scale-105"
      >
        {/* Network nodes */}
        <circle cx="25" cy="25" r="6" fill="#ec4899" />
        <circle cx="45" cy="25" r="6" fill="#9333ea" />
        <circle cx="25" cy="45" r="6" fill="#f97316" />
        <circle cx="45" cy="45" r="6" fill="#ec4899" />
        <circle cx="35" cy="35" r="8" fill="url(#brain-gradient)" />

        {/* Connections */}
        <line x1="25" y1="25" x2="35" y2="35" stroke="#ec4899" strokeWidth="2" opacity="0.5" />
        <line x1="45" y1="25" x2="35" y2="35" stroke="#9333ea" strokeWidth="2" opacity="0.5" />
        <line x1="25" y1="45" x2="35" y2="35" stroke="#f97316" strokeWidth="2" opacity="0.5" />
        <line x1="45" y1="45" x2="35" y2="35" stroke="#ec4899" strokeWidth="2" opacity="0.5" />

        {/* Text */}
        {!collapsed && (
          <>
            <text x="75" y="48" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#1f2937">
              Influ<tspan fill="#ec4899">Match</tspan>
            </text>
            <text x="225" y="48" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#f97316">
              .ai
            </text>
          </>
        )}

        <defs>
          <linearGradient id="brain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>
    </Link>
  );
};

export default Logo;
