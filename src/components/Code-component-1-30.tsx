"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="font-semibold text-base text-foreground mb-1">欢迎回来</h2>
        <p className="text-sm text-muted-foreground">登录您的账号以继续</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Phone Input */}
        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-foreground">
            手机号码
          </Label>
          <div className="flex mt-1">
            <div className="flex items-center px-3 bg-muted border border-border rounded-l-xl">
              <span className="text-sm text-muted-foreground">+86</span>
            </div>
            <Input
              id="phone"
              type="tel"
              placeholder="请输入手机号码"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="rounded-l-none border-l-0 focus:border-l focus:border-primary"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <Label htmlFor="password" className="text-sm font-medium text-foreground">
            密码
          </Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="请输入密码"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="remember"
              checked={rememberMe}
              onCheckedChange={setRememberMe}
            />
            <Label htmlFor="remember" className="text-sm text-muted-foreground">
              记住我
            </Label>
          </div>
          <button type="button" className="text-sm text-primary hover:underline">
            忘记密码？
          </button>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>登录中...</span>
            </div>
          ) : (
            "登录"
          )}
        </Button>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="outline" className="text-sm">
            立即注册
          </Button>
          <Button type="button" variant="outline" className="text-sm">
            停用账号
          </Button>
        </div>

        {/* Compliance Notice */}
        <div className="text-xs text-muted-foreground text-center leading-relaxed">
          登录即代表您同意
          <button type="button" className="text-primary hover:underline mx-1">
            隐私政策
          </button>
          与
          <button type="button" className="text-primary hover:underline mx-1">
            服务条款
          </button>
        </div>
      </form>
    </div>
  );
}