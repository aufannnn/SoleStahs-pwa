import { BASE_URL } from '../config/api'

// GANTI data di bawah ini pakai data kamu sendiri
const DEVELOPER = {
  nama: 'Aufan Damays Marsuki',
  nim: '21120124140163',
  kelas: 'Praktikum PPB Tugas Akhir',
}

export default function Profile({ onOpenManage }) {
  return (
    <div className="page">
      <section className="profile-head">
        <div className="profile-avatar">{DEVELOPER.nama.charAt(0)}</div>
        <h2 className="page-title">{DEVELOPER.nama}</h2>
        <p className="muted">{DEVELOPER.nim}</p>
        <p className="muted">{DEVELOPER.kelas}</p>
      </section>

      <section className="section">
        <h3 className="section-title">Tentang Aplikasi</h3>
        <p>
          SoleStash adalah aplikasi katalog sneakers berbasis Progressive Web App. Pengguna bisa
          melihat daftar sneakers, mencari dan memfilter produk, melihat brand, serta menyimpan
          sneakers favorit.
        </p>
      </section>

      <section className="section">
        <h3 className="section-title">Info Teknis</h3>
        <table className="spec">
          <tbody>
            <tr>
              <td>Frontend</td>
              <td>React + Vite (PWA)</td>
            </tr>
            <tr>
              <td>Backend</td>
              <td>Express.js + Supabase</td>
            </tr>
            <tr>
              <td>API</td>
              <td className="break">{BASE_URL}</td>
            </tr>
            <tr>
              <td>Versi</td>
              <td>1.0.0</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section">
        <h3 className="section-title">Admin</h3>
        <button className="btn btn-block btn-outline" onClick={onOpenManage}>
          Buka Panel Admin
        </button>
      </section>
    </div>
  )
}