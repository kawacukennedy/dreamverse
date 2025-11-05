interface ColorPickerProps {
  selectedLayer: string
  color: string
  onChangeColor: (color: string) => void
}

export default function ColorPicker({ selectedLayer, color, onChangeColor }: ColorPickerProps) {
  const colorOptions = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#008000', '#000080', '#800000', '#808000'
  ]

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Color for {selectedLayer}</h3>
      <div className="grid grid-cols-4 gap-2">
        {colorOptions.map((c) => (
          <button
            key={c}
            onClick={() => onChangeColor(c)}
            className={`w-8 h-8 rounded border-2 ${
              color === c ? 'border-white' : 'border-gray-600'
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <input
        type="color"
        value={color}
        onChange={(e) => onChangeColor(e.target.value)}
        className="mt-4 w-full"
      />
    </div>
  )
}