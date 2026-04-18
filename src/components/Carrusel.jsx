// components/Carrusel.jsx
// Carrusel horizontal con flechas de navegación.
// Recibe `children` como slides; el scroll es nativo con scrollBy.

import { useRef, useState, useEffect, useCallback } from 'react'

const SCROLL_AMOUNT = 300 // px por click de flecha

function Carrusel({ children }) {
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft]   = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Actualiza el estado de los botones según posición de scroll
  const updateButtons = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateButtons()
    el.addEventListener('scroll', updateButtons, { passive: true })
    window.addEventListener('resize', updateButtons)
    return () => {
      el.removeEventListener('scroll', updateButtons)
      window.removeEventListener('resize', updateButtons)
    }
  }, [updateButtons])

  const scrollLeft  = () => trackRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' })
  const scrollRight = () => trackRef.current?.scrollBy({ left:  SCROLL_AMOUNT, behavior: 'smooth' })

  return (
    <div className="carrusel">
      <button
        className="carrusel-btn carrusel-btn--left"
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        aria-label="Anterior"
      >
        &#8592;
      </button>

      <div className="carrusel-track" ref={trackRef}>
        {children}
      </div>

      <button
        className="carrusel-btn carrusel-btn--right"
        onClick={scrollRight}
        disabled={!canScrollRight}
        aria-label="Siguiente"
      >
        &#8594;
      </button>
    </div>
  )
}

export default Carrusel
