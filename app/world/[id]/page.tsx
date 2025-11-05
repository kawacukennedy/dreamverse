import WorldViewer from '../../../components/WorldViewer'

interface PageProps {
  params: { id: string }
}

export default function WorldPage({ params }: PageProps) {
  return <WorldViewer worldId={params.id} />
}