"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { toast } from "sonner@2.0.3";

interface LoginFormProps {
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

export function LoginForm({ onForgotPassword, onRegister }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
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

  const handleDeactivateAccount = async () => {
    setShowDeactivateDialog(false);
    try {
      // Simulate account deactivation
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("账号已成功注销");
    } catch (error) {
      toast.error("注销失败，请稍后重试");
    }
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
          <button 
            type="button" 
            onClick={onForgotPassword}
            className="text-sm text-primary hover:underline"
          >
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
          <Button 
            type="button" 
            variant="outline" 
            className="text-sm"
            onClick={onRegister}
          >
            立即注册
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="text-sm text-destructive hover:text-destructive border-destructive/20 hover:border-destructive/30 hover:bg-destructive/5"
            onClick={() => setShowDeactivateDialog(true)}
          >
            注销账号
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

      {/* Deactivate Account Confirmation Dialog */}
      <AlertDialog open={showDeactivateDialog} onOpenChange={setShowDeactivateDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-shrink-0 w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <AlertDialogTitle className="text-lg">注销账号确认</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
              注销账号后，以下信息将被永久删除且无法恢复：
            </AlertDialogDescription>
            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-destructive rounded-full"></div>
                <span>所有个人账号设置和偏好配置</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-destructive rounded-full"></div>
                <span>危废管理记录和历史数据</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-destructive rounded-full"></div>
                <span>已保存的标签模板和打印配置</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-destructive rounded-full"></div>
                <span>企业合规档案和审计记录</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <div className="text-xs text-muted-foreground">
                <strong>注意：</strong>注销后如需重新使用服务，需要重新注册并重新提交企业资质认证。
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeactivateAccount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              确认注销
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}