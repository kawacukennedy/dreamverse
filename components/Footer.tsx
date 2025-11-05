import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-background-dark text-text-muted p-4 mt-auto">
      <div className="flex justify-center space-x-6">
        <Link href="/about" className="hover:text-accent">
          About
        </Link>
        <Link href="/privacy" className="hover:text-accent">
          Privacy Policy
        </Link>
        <Link href="/contact" className="hover:text-accent">
          Contact
        </Link>
      </div>
    </footer>
  )
}