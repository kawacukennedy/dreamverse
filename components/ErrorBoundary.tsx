'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background-dark">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong</h1>
            <p className="text-text-muted mb-4">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary px-4 py-2 rounded text-white"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-text-muted">Error Details</summary>
                <pre className="text-xs bg-gray-800 p-2 rounded mt-2 overflow-auto">
                  {this.state.error?.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary