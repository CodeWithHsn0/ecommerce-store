const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      <div className="mt-4 text-gray-600">Loading category...</div>
    </div>
  )
}

export default Loading

