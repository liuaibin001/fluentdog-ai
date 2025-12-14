export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient mesh */}
      <div className="absolute inset-0 bg-gradient-mesh" />

      {/* Animated gradient orbs */}
      <div
        className="animate-float animate-pulse-glow absolute -left-20 top-0 h-[500px] w-[500px] rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, oklch(0.35 0.12 280 / 0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="animate-float-delayed animate-pulse-glow absolute -right-20 top-1/4 h-[600px] w-[600px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, oklch(0.3 0.1 200 / 0.35) 0%, transparent 70%)",
        }}
      />
      <div
        className="animate-float-slow animate-pulse-glow absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, oklch(0.32 0.11 175 / 0.3) 0%, transparent 70%)",
        }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Noise texture for depth */}
      <div className="bg-noise absolute inset-0" />

      {/* Top gradient fade */}
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background: "linear-gradient(to bottom, oklch(0.13 0.02 270), transparent)",
        }}
      />
    </div>
  )
}
