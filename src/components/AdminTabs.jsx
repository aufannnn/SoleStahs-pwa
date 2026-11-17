// Menu kecil di atas halaman admin buat pindah Sneakers / Brand / Kategori
const tabs = [
  { key: 'manage', label: 'Sneakers' },
  { key: 'manageBrands', label: 'Brand' },
  { key: 'manageCategories', label: 'Kategori' },
]

export default function AdminTabs({ active, onChange }) {
  return (
    <div className="admin-tabs">
      {tabs.map((t) => (
        <button
          key={t.key}
          className={`chip ${active === t.key ? 'active' : ''}`}
          onClick={() => active !== t.key && onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}