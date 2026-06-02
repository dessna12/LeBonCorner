import { createContext, useEffect, useState, useContext } from "react";

const AccessibilityContext = createContext(null)

export function AccessibilityProvider({children}) {
  const [highContrast, setHighContrast] = useState(false)
  const [textZoom, setTextZoom] = useState(1)
  const [grayscale, setGrayscale] = useState(false)


  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast)
  }, [highContrast])
  
  useEffect(() => {
    document.body.style.zoom = textZoom
  }, [textZoom])

  useEffect(()=> {
    document.documentElement.style.setProperty('--grayscale', grayscale ? '100%' : '0%')
  })

  function increaseZoom() {
    if(textZoom === 1) setTextZoom(1.25)
    else if(textZoom ===1.25) setTextZoom(1.5)
  }

  function decreaseZoom(){
    if(textZoom === 1.5) setTextZoom(1.25)
    else if(textZoom ===1.25) setTextZoom(1)
  }

  return (
    <AccessibilityContext.Provider value={{
      highContrast, setHighContrast,
      textZoom, setTextZoom,
      increaseZoom,
      decreaseZoom, 
      grayscale, setGrayscale
    }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  return useContext(AccessibilityContext)
}

