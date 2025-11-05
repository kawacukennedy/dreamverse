export default function Leaderboard() {
  // Mock data
  const leaderboard = [
    { rank: 1, username: 'Alice', score: 1500 },
    { rank: 2, username: 'Bob', score: 1400 },
    { rank: 3, username: 'Charlie', score: 1300 },
    { rank: 4, username: 'User123', score: 1200 }, // Current user
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Leaderboard</h1>
      <div className="max-w-md mx-auto">
        <div className="bg-card-background rounded-lg overflow-hidden">
          <div className="bg-primary p-4">
            <h2 className="text-lg font-semibold">Top Creators</h2>
          </div>
          <div className="divide-y divide-gray-700">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`p-4 flex items-center justify-between ${
                  entry.username === 'User123' ? 'bg-primary/20' : ''
                }`}
              >
                <div className="flex items-center">
                  <span className="font-bold mr-4">{entry.rank}</span>
                  <span>{entry.username}</span>
                </div>
                <span className="font-semibold">{entry.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}