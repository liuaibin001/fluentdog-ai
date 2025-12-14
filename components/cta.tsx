import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="mx-auto max-w-4xl rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-12 text-center backdrop-blur">
        <h2 className="mb-4 text-balance text-4xl font-bold md:text-5xl">准备好让爱犬更安心了吗？</h2>
        <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground">
          加入数千位宠物主人，使用 BarkSense AI 科学解决过度吠叫问题
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
            免费试用 14 天
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
            联系销售团队
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">无需信用卡 · 随时取消 · 数据安全保护</p>
      </div>
    </section>
  )
}
