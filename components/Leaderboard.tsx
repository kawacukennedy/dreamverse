import { useWorldStore } from '../stores/worldStore'

export default function Leaderboard() {
  const { worlds } = useWorldStore()
  const leaderboard = [...worlds].sort((a, b) => (b.likes + b.visits) - (a.likes + a.visits)).slice(0, 10)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Leaderboard</h1>
      <div className="max-w-md mx-auto">
        <div className="bg-card-background rounded-lg overflow-hidden">
          <div className="bg-primary p-4">
            <h2 className="text-lg font-semibold">Top Creators</h2>
          </div>
          <div className="divide-y divide-gray-700">
            {leaderboard.map((world, index) => (
              <div
                key={world.id}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <span className="font-bold mr-4">{index + 1}</span>
                  <span>{world.title}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span>{world.likes} likes</span>
                  <span>{world.visits} visits</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}