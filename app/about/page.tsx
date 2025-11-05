export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">About DreamVerse</h1>

      <div className="prose prose-lg mx-auto">
        <p className="text-xl mb-6">
          DreamVerse is an immersive social universe where teens can create, explore, and share their own 3D mini-worlds.
          Built with cutting-edge web technologies, it provides a platform for creative expression and social interaction.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-6">
          To empower young creators with tools that spark imagination and foster community. We believe that everyone
          has a unique story to tell, and DreamVerse provides the canvas to bring those stories to life in three dimensions.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Intuitive 3D world editor with drag-and-drop objects</li>
          <li>Customizable avatars with extensive personalization options</li>
          <li>Offline-first experience with local data persistence</li>
          <li>Shareable world links for easy collaboration</li>
          <li>Responsive design that works on all devices</li>
          <li>Community-driven content and leaderboards</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Technology</h2>
        <p className="mb-6">
          Built with modern web technologies including Next.js, TypeScript, Three.js, and TailwindCSS.
          DreamVerse is designed to be fast, accessible, and scalable.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>
          Have questions or feedback? We&apos;d love to hear from you at{' '}
          <a href="mailto:hello@dreamverse.app" className="text-primary hover:text-primary-hover">
            hello@dreamverse.app
          </a>
        </p>
      </div>
    </div>
  )
}