export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to DreamVerse</h1>
      <p className="text-center text-text-muted mb-8">
        Create, explore, and share your own 3D mini-worlds
      </p>
      <div className="flex justify-center space-x-4">
        <a href="/explore" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg">
          Explore Worlds
        </a>
        <a href="/create" className="bg-accent hover:bg-secondary text-white px-6 py-3 rounded-lg">
          Create Your World
        </a>
      </div>
    </div>
  )
}