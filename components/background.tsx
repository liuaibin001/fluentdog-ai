export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-subtle" />

      {/* Decorative blobs */}
      <div
        className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full blob-purple opacity-60"
      />
      <div
        className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full blob-blue opacity-50"
      />
      <div
        className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full blob-purple opacity-40"
      />
    </div>
  )
}
