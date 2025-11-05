import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 p-8 mt-auto border-t border-gray-700">
      <div className="flex justify-center space-x-6">
        <Link href="/about" className="hover:text-green-400 transition-colors">
          About
        </Link>
        <Link href="/privacy" className="hover:text-green-400 transition-colors">
          Privacy Policy
        </Link>
        <Link href="/contact" className="hover:text-green-400 transition-colors">
          Contact
        </Link>
      </div>
    </footer>
  )
}