// Icon dibuat pakai SVG langsung biar gak perlu install library
const icons = {
  home: <path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z" />,
  catalog: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </>
  ),
  brands: <path d="M3 12l9-9h9v9l-9 9zM16 8h.01" />,
  favorites: (
    <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z" />
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </>
  ),
}

const menus = [
  { key: 'home', label: 'Home' },
  { key: 'catalog', label: 'Katalog' },
  { key: 'brands', label: 'Brand' },
  { key: 'favorites', label: 'Favorit' },
  { key: 'profile', label: 'Profil' },
]

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav">
      {menus.map((m) => (
        <button
          key={m.key}
          className={`nav-item ${active === m.key ? 'active' : ''}`}
          onClick={() => onChange(m.key)}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          >
            {icons[m.key]}
          </svg>
          <span>{m.label}</span>
        </button>
      ))}
    </nav>
  )
}