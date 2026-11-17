import { useEffect, useState } from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import SneakerDetail from './pages/SneakerDetail'
import Brands from './pages/Brands'
import BrandDetail from './pages/BrandDetail'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'
import ManageSneakers from './pages/ManageSneakers'
import SneakerForm from './pages/SneakerForm'
import ManageBrands from './pages/ManageBrands'
import BrandForm from './pages/BrandForm'
import ManageCategories from './pages/ManageCategories'

function App() {
  // tab = halaman utama yang aktif di bottom nav
  const [tab, setTab] = useState('home')
  // stack = tumpukan halaman detail, contoh: [{ type: 'sneaker', id: '...' }]
  const [stack, setStack] = useState([])

  const current = stack[stack.length - 1]

  // scroll ke atas tiap ganti halaman
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tab, stack.length])

  const changeTab = (newTab) => {
    setTab(newTab)
    setStack([])
  }

  const openSneaker = (id) => setStack((s) => [...s, { type: 'sneaker', id }])
  const openBrand = (id) => setStack((s) => [...s, { type: 'brand', id }])
  const openManage = () => setStack((s) => [...s, { type: 'manage' }])
  const openForm = (id) => setStack((s) => [...s, { type: 'form', id }])
  const openBrandForm = (id) => setStack((s) => [...s, { type: 'brandForm', id }])
  // pindah antar halaman admin: ganti halaman paling atas, bukan nambah
  const switchAdmin = (type) => setStack((s) => [...s.slice(0, -1), { type }])
  const goBack = () => setStack((s) => s.slice(0, -1))

  const renderPage = () => {
    // kalau ada halaman detail di stack, tampilkan itu
    if (current?.type === 'sneaker') {
      return <SneakerDetail key={current.id} id={current.id} onOpenBrand={openBrand} />
    }
    if (current?.type === 'brand') {
      return <BrandDetail key={current.id} id={current.id} onOpenSneaker={openSneaker} />
    }
    if (current?.type === 'manage') {
      return (
        <ManageSneakers onAdd={() => openForm(null)} onEdit={openForm} onSwitch={switchAdmin} />
      )
    }
    if (current?.type === 'form') {
      return <SneakerForm key={current.id || 'new'} id={current.id} onDone={goBack} />
    }
    if (current?.type === 'manageBrands') {
      return (
        <ManageBrands
          onAdd={() => openBrandForm(null)}
          onEdit={openBrandForm}
          onSwitch={switchAdmin}
        />
      )
    }
    if (current?.type === 'brandForm') {
      return <BrandForm key={current.id || 'new'} id={current.id} onDone={goBack} />
    }
    if (current?.type === 'manageCategories') {
      return <ManageCategories onSwitch={switchAdmin} />
    }

    // kalau tidak, tampilkan halaman sesuai tab
    switch (tab) {
      case 'catalog':
        return <Catalog onOpenSneaker={openSneaker} />
      case 'brands':
        return <Brands onOpenBrand={openBrand} />
      case 'favorites':
        return <Favorites onOpenSneaker={openSneaker} />
      case 'profile':
        return <Profile onOpenManage={openManage} />
      default:
        return <Home onOpenSneaker={openSneaker} onOpenBrand={openBrand} onGoTo={changeTab} />
    }
  }

  return (
    <div className="app">
      <Header onBack={current ? goBack : null} />
      <main className="main">{renderPage()}</main>
      <BottomNav active={tab} onChange={changeTab} />
    </div>
  )
}

export default App