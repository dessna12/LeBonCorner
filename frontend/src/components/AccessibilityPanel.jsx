import { useAccessibility } from '../context/AccessibilityContext'

export default function AccessibilityPanel() {
  const {
    highContrast, setHighContrast,
    textZoom, increaseZoom, decreaseZoom, resetZoom,
    grayscale, setGrayscale,
  } = useAccessibility()

  return (
    <div style={styles.panel} role="toolbar" aria-label="Options d'accessibilité">

      <span style={styles.label}>♿ Accessibilité</span>

      <div style={styles.separator} />

      {/* Contraste élevé */}
      <button
        onClick={() => setHighContrast(v => !v)}
        aria-pressed={highContrast}
        style={{ ...styles.btn, ...(highContrast ? styles.btnActive : {}) }}
        title="Contraste élevé"
      >
        ◑ Contraste
      </button>

      <div style={styles.separator} />

      {/* Zoom texte */}
      <div style={styles.group} aria-label="Taille du texte">
        <button onClick={decreaseZoom} style={styles.btnZoom} aria-label="Réduire le texte" disabled={textZoom === 1}>
          A−
        </button>
        <span style={styles.zoomValue}>{Math.round(textZoom * 100)}%</span>
        <button onClick={increaseZoom} style={styles.btnZoom} aria-label="Agrandir le texte" disabled={textZoom === 1.5}>
          A+
        </button>
      </div>

      <div style={styles.separator} />

      {/* Niveaux de gris */}
      <button
        onClick={() => setGrayscale(v => !v)}
        aria-pressed={grayscale}
        style={{ ...styles.btn, ...(grayscale ? styles.btnActive : {}) }}
        title="Niveaux de gris sur les images"
      >
        ◐ Niveaux de gris
      </button>

    </div>
  )
}

const styles = {
  panel: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 16px',
    background: '#fff',
    borderTop: '2px solid #fed7aa',
    borderLeft: '2px solid #fed7aa',
    borderTopLeftRadius: 12,
    boxShadow: '0 -2px 12px rgba(0,0,0,0.08)',
    zIndex: 1000,
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: '#ea580c',
    whiteSpace: 'nowrap',
  },
  separator: {
    width: 1,
    height: 20,
    background: '#e5e7eb',
    flexShrink: 0,
  },
  btn: {
    padding: '4px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: 20,
    background: '#f9fafb',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 500,
    color: '#374151',
    whiteSpace: 'nowrap',
  },
  btnActive: {
    background: '#ea580c',
    color: '#fff',
    borderColor: '#ea580c',
  },
  group: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2,
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: 20,
    padding: '2px 6px',
  },
  btnZoom: {
    padding: '2px 8px',
    border: 'none',
    borderRadius: 16,
    background: 'transparent',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 700,
    color: '#374151',
  },
  zoomValue: {
    fontSize: 11,
    color: '#6b7280',
    minWidth: 34,
    textAlign: 'center',
    fontWeight: 500,
  },
}
