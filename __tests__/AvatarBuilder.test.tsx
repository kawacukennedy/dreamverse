import { render, screen, fireEvent } from '@testing-library/react'
import AvatarBuilder from '../components/AvatarBuilder'

describe('AvatarBuilder', () => {
  it('renders avatar builder components', () => {
    render(<AvatarBuilder />)

    expect(screen.getByText('Layers')).toBeInTheDocument()
    expect(screen.getByText('Randomize')).toBeInTheDocument()
    expect(screen.getByText('AI Generate')).toBeInTheDocument()
    expect(screen.getByText('Save Avatar')).toBeInTheDocument()
  })

  it('changes selected layer', () => {
    render(<AvatarBuilder />)

    const hairButton = screen.getByText('Hair')
    fireEvent.click(hairButton)

    // Check if color picker shows for hair
    expect(screen.getByText('Color for hair')).toBeInTheDocument()
  })
})