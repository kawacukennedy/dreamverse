import Link from 'next/link'
import { User } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-card-background border-b border-gray-700">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          DreamVerse
        </Link>
      </div>
      <nav className="flex space-x-6">
        <Link href="/explore" className="text-text-light hover:text-accent">
          Explore
        </Link>
        <Link href="/create" className="text-text-light hover:text-accent">
          Create
        </Link>
        <Link href="/profile" className="text-text-light hover:text-accent">
          Profile
        </Link>
        <Link href="/leaderboard" className="text-text-light hover:text-accent">
          Leaderboard
        </Link>
        <Link href="/settings" className="text-text-light hover:text-accent">
          Settings
        </Link>
      </nav>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <User size={20} />
        </div>
      </div>
    </header>
  )
}