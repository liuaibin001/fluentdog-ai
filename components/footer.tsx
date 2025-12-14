export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/30 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary-foreground"
                >
                  <path d="M12 2a3 3 0 0 0-3 3 3 3 0 0 0 0 6 3 3 0 0 0 3-3" />
                  <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2" />
                  <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2" />
                </svg>
              </div>
              <span className="font-bold">BarkSense AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              用 AI 科技理解宠物，
              <br />
              让爱更有温度。
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">产品</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-foreground">
                  功能
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground">
                  价格
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  下载 App
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  API 文档
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">资源</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  博客
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  帮助中心
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  社区
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  训练指南
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">公司</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  关于我们
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  联系我们
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  隐私政策
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  服务条款
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 BarkSense AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
