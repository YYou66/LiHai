import { useState, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import FloatingNav from '@/components/FloatingNav'
import HeroIntro from '@/components/HeroIntro'
import InspirationGrid from '@/components/InspirationGrid'
import AboutSection from '@/components/AboutSection'
import DetailPage from '@/components/DetailPage'
import PageTransition from '@/components/PageTransition'
import CustomCursor from '@/components/CustomCursor'
import { COLLECTIONS } from '@/data/collections'
import type { Category } from '@/data/collections'

function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL')
  const location = useLocation()

  const handleCategoryChange = useCallback((c: Category) => {
    setActiveCategory(c)
    if (typeof window !== 'undefined') {
      const el = document.getElementById('archive')
      if (el && location.hash !== '#archive') {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [location.hash])

  return (
    <>
      <HeroIntro />
      <InspirationGrid
        items={COLLECTIONS}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <AboutSection />
    </>
  )
}

export default function App() {
  return (
    <div className="grain-bg min-h-screen relative text-ink-900">
      <CustomCursor />
      <FloatingNav />
      <main className="relative z-[2]">
        <Routes>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/item/:id"
            element={
              <PageTransition>
                <DetailPage />
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <div className="min-h-screen flex items-center justify-center px-6">
                  <div className="text-center">
                    <div className="font-editorial text-2xl text-stonewarm-500 mb-6">
                      404 · 这里什么也没有。
                    </div>
                    <a
                      href="/"
                      data-cursor="link"
                      className="font-label text-ink-900 underline underline-offset-4"
                    >
                      ← BACK TO INDEX
                    </a>
                  </div>
                </div>
              </PageTransition>
            }
          />
        </Routes>
      </main>
    </div>
  )
}
