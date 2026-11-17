export default function Header({ title, onBack }) {
  return (
    <header className="header">
      {onBack ? (
        <button className="header-back" onClick={onBack} aria-label="Kembali">
          ←
        </button>
      ) : (
        <span className="header-spacer" />
      )}
      <h1 className="header-logo">{title || 'SOLESTASH'}</h1>
      <span className="header-spacer" />
    </header>
  )
}