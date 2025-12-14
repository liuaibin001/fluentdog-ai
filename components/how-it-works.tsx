export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "设置监听设备",
      description: "将闲置手机或平板放置在家中作为监听端，主手机用于控制和查看数据。",
    },
    {
      number: "02",
      title: "AI 实时分析",
      description: "当检测到吠叫声音时，AI 自动分析情绪类型和焦虑强度，并生成详细报告。",
    },
    {
      number: "03",
      title: "获取训练方案",
      description: "基于分析结果，系统推荐定制化的行为训练课程，循序渐进解决问题。",
    },
    {
      number: "04",
      title: "追踪训练效果",
      description: "实时追踪吠叫频率变化，查看训练效果，随时调整训练策略。",
    },
  ]

  return (
    <section id="how-it-works" className="container mx-auto px-4 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-balance text-4xl font-bold md:text-5xl">只需四步，开始使用</h2>
        <p className="text-pretty text-lg text-muted-foreground">简单设置，智能分析，科学训练</p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border-2 border-primary bg-background text-2xl font-bold text-primary">
                {step.number}
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
