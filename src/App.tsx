import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Shield, CheckCircle, Printer, Cloud, Lock } from "lucide-react";
import { BrandLogo } from "./components/brand-logo";
import { FeatureCard } from "./components/feature-card";
import { LoginForm } from "./components/login-form";
import { ResetPasswordPage } from "./components/reset-password-page";
import { RegisterPage } from "./components/register-page";
import { ThemeSwitch } from "./components/theme-switch";
import { Toaster } from "./components/ui/sonner";

type PageType = "login" | "reset-password" | "register";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<PageType>("login");

  // Derive page from URL path
  const derivedPage: PageType = useMemo(() => {
    const path = location.pathname.toLowerCase();
    if (path === "/" || path === "" || path === "/login") return "login";
    if (path.startsWith("/register")) return "register";
    if (path.startsWith("/reset-password")) return "reset-password";
    // Fallback to login for unknown paths
    return "login";
  }, [location.pathname]);

  // Sync internal page state with URL
  useEffect(() => {
    if (currentPage !== derivedPage) {
      setCurrentPage(derivedPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [derivedPage]);
  const features = [
    {
      icon: Shield,
      title: "安全合规",
      description: "按环保法规留痕与审计"
    },
    {
      icon: CheckCircle,
      title: "标签打印",
      description: "一键出标，自动上传台账"
    },
    {
      icon: Printer,
      title: "打印方式",
      description: "适配 iPad/蓝牙/网络打印"
    },
    {
      icon: Cloud,
      title: "数据上云",
      description: "工业级加密与灾备"
    }
  ];

  if (currentPage === "reset-password") {
    return (
      <>
        <ResetPasswordPage onBackToLogin={() => navigate("/login")} />
        <Toaster />
      </>
    );
  }

  if (currentPage === "register") {
    return (
      <>
        <RegisterPage onBackToLogin={() => navigate("/login")} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>
      <div className="absolute inset-0 opacity-[0.03] bg-gradient-to-br from-transparent via-primary/10 to-transparent"></div>
      
      {/* Theme Switch */}
      <ThemeSwitch />

      {/* Main Container - iPad Landscape 1024x768 */}
      <div className="w-full h-screen max-w-none mx-auto relative">
        {/* Safe Area Container with 12-column grid simulation */}
        <div className="h-full px-16 py-10 pb-20 flex items-center">
          {/* Grid Layout: 7 columns left + 5 columns right */}
          <div className="w-full flex gap-8 items-end">
            
            {/* Left Section - Brand & Features (7/12 columns) */}
            <div className="flex-[7] flex flex-col justify-center space-y-6">
              {/* Brand Section */}
              <BrandLogo />

              {/* Main Title */}
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-foreground leading-tight">
                  危废智能管理平台
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  面向工业企业的一体化危废管理与标签打印平台。让数据在线、流程合规、交付可追溯。
                </p>
              </div>

              {/* Feature Cards Grid - 2x2 */}
              <div className="grid grid-cols-2 gap-5 max-w-lg">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </div>

            {/* Right Section - Login Form (5/12 columns) */}
            <div className="flex-[5] flex items-end justify-center">
              <LoginForm 
                onForgotPassword={() => navigate("/reset-password")}
                onRegister={() => navigate("/register")}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-16 py-6 flex justify-between items-center text-sm text-muted-foreground">
          <div>
            版本 v2.1.3 © 2025 危司通 保留所有权利
          </div>
          <div className="flex items-center gap-1">
            <Lock className="w-4 h-4" />
            <span>安全连接</span>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
