import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const plans = [
  {
    name: "基础版",
    price: "免费",
    period: "",
    description: "吸引用户尝鲜，了解问题存在",
    popular: false,
    features: ["吠叫次数计数", "24 小时历史记录", "基础监听功能", "社区支持"],
  },
  {
    name: "专业版",
    price: "$10",
    period: "/月",
    description: "持续的安心和专业诊断",
    popular: true,
    features: [
      "所有基础功能",
      "AI 情绪分类（5种类型）",
      "焦虑强度评分（1-10）",
      "情境关联分析",
      "每周专业报告",
      "兽医报告导出",
      "30 天历史记录",
    ],
  },
  {
    name: "教练版",
    price: "$18",
    period: "/月",
    description: "解决问题的明确目标",
    popular: false,
    features: [
      "所有专业版功能",
      "个性化训练课程",
      "循序渐进行为矫正",
      "AI 声音工具库",
      "训练效果实时追踪",
      "优先客服支持",
      "无限历史记录",
    ],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="container mx-auto px-4 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-balance text-4xl font-bold md:text-5xl">选择适合您的计划</h2>
        <p className="text-pretty text-lg text-muted-foreground">从免费试用开始，随时升级到专业功能</p>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`relative border-border/40 bg-card/50 backdrop-blur ${
              plan.popular ? "border-2 border-primary" : ""
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                最受欢迎
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-sm">{plan.description}</CardDescription>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 flex-shrink-0 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.price === "免费" ? "免费开始" : "立即订阅"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        所有付费计划均提供 14 天退款保证 · 随时可以取消订阅
      </p>
    </section>
  )
}
