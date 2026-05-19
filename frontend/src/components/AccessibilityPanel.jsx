
import { useAccessibility } from "../context/AccessibilityContext"

export default function AccessibilityPanel() {
  const {
    highContrast, setHighContrast,
    grayscale, setGrayscale,
    textZoom, increaseZoom, decreaseZoom
  } = useAccessibility()

  return (
    <div role="toolbar" aria-label="options d'accessibilité">

    <button
      onClick={()=> setHighContrast(v => !v)}
      aria-pressed={highContrast}
      title="Activer ou désactiver le contraste élevé"
    >
      Contraste {highContrast ? 'OUI' : 'Non'}
    </button>

    <span aria-label='taille du texte'>
      <button onClick={increaseZoom} aria-label="Agrandir le texte" disable={textZoom === 1.5}>
        A+
      </button>

      <button onClick={decreaseZoom} aria-label="Réduire le texte" disable={textZoom === 1}>
        A-
      </button>
    </span>

    <button
      onClick={()=> setGrayscale(v => !v)}
      aria-pressed={grayscale}
      title="Activer ou désactiver le noir et blanc"
    >
      Contraste {grayscale? 'OUI' : 'Non'}
    </button>
    </div>
  )

}