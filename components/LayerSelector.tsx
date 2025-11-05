interface LayerSelectorProps {
  layers: {
    hair: string
    eyes: string
    mouth: string
    clothes: string
    accessories: string[]
  }
  selectedLayer: string
  onSelectLayer: (layer: string) => void
}

export default function LayerSelector({ layers, selectedLayer, onSelectLayer }: LayerSelectorProps) {
  const layerOptions = [
    { key: 'hair', label: 'Hair' },
    { key: 'eyes', label: 'Eyes' },
    { key: 'mouth', label: 'Mouth' },
    { key: 'clothes', label: 'Clothes' },
    { key: 'accessories', label: 'Accessories' },
  ]

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Layers</h3>
      <div className="space-y-2">
        {layerOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => onSelectLayer(option.key)}
            className={`w-full text-left p-2 rounded ${
              selectedLayer === option.key ? 'bg-primary text-white' : 'bg-gray-700 text-text-light'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}