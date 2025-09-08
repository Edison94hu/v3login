"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { PinInput } from "./pin-input";
import { PasswordStrengthBar } from "./password-strength-bar";
import { BrandLogo } from "./brand-logo";
import { ThemeSwitch } from "./theme-switch";
import { toast } from "sonner@2.0.3";

interface ResetPasswordPageProps {
  onBackToLogin: () => void;
}

export function ResetPasswordPage({ onBackToLogin }: ResetPasswordPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    countryCode: "+86",
    phone: "",
    verifyCode: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Error states
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validate phone number
  const validatePhone = (phone: string) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  // Validate password
  const validatePassword = (password: string) => {
    return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
  };

  // Send verification code
  const handleSendCode = async () => {
    if (!validatePhone(formData.phone)) {
      setErrors({ phone: "请输入有效的手机号码" });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Start countdown
      let timeLeft = 60;
      setCountdown(timeLeft);
      const timer = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);
        if (timeLeft === 0) {
          clearInterval(timer);
        }
      }, 1000);

      toast.success("验证码已发送");
      setErrors({});
    } catch (error) {
      toast.error("发送验证码失败，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle verification code completion
  const handleVerifyCodeComplete = (code: string) => {
    if (code === "123456") {
      setIsPhoneVerified(true);
      toast.success("手机验证成功");
      setErrors({});
    } else {
      setErrors({ verifyCode: "验证码错误" });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    // Validate phone
    if (!validatePhone(formData.phone)) {
      newErrors.phone = "请输入有效的手机号码";
    }
    
    // Validate verification code
    if (!formData.verifyCode || formData.verifyCode.length !== 6) {
      newErrors.verifyCode = "请输入6位验证码";
    } else if (formData.verifyCode !== "123456" && !isPhoneVerified) {
      newErrors.verifyCode = "验证码错误或已过期";
    }
    
    // Validate password
    if (!validatePassword(formData.newPassword)) {
      newErrors.newPassword = "密码至少8位，需包含字母与数字";
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "两次输入的密码不一致";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("密码已重置，请使用新密码登录");
      
      // Return to login after success
      setTimeout(() => {
        onBackToLogin();
      }, 2000);
    } catch (error) {
      toast.error("重置密码失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>
      <div className="absolute inset-0 opacity-[0.03] bg-gradient-to-br from-transparent via-primary/10 to-transparent"></div>
      
      {/* Theme Switch */}
      <ThemeSwitch />

      {/* Main Container */}
      <div className="w-full h-screen max-w-none mx-auto relative">
        <div className="h-full px-16 py-10 pb-20 flex items-center">
          <div className="w-full flex gap-8 items-center">
            
            {/* Left Section - Brand (6/12 columns) */}
            <div className="flex-[6] flex flex-col justify-center space-y-6">
              <BrandLogo />
              
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-foreground leading-tight">
                  重置密码
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  通过手机验证码重置您的账号密码，确保账户安全。
                </p>
              </div>
              
              {/* Security Features */}
              <div className="space-y-3 max-w-md">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">手机号码安全验证</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">密码强度智能检测</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">数据传输加密保护</span>
                </div>
              </div>
            </div>

            {/* Right Section - Form (6/12 columns) */}
            <div className="flex-[6] flex items-center justify-center">
              <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-lg">
                
                {/* Header */}
                <div className="mb-6">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onBackToLogin}
                    className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    返回登录
                  </Button>
                  <h2 className="font-semibold text-xl text-foreground mb-2">重置您的密码</h2>
                  <p className="text-sm text-muted-foreground">
                    请填写以下信息完成密码重置
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Phone Input */}
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-foreground mb-2 block">
                      手机号码
                    </Label>
                    <div className="flex">
                      <Select 
                        value={formData.countryCode} 
                        onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                      >
                        <SelectTrigger className="w-20 rounded-r-none border-r-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+86">+86</SelectItem>
                          <SelectItem value="+1">+1</SelectItem>
                          <SelectItem value="+44">+44</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="请输入手机号码"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="rounded-l-none h-10"
                        required
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* SMS Verification Code */}
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                      短信验证码
                    </Label>
                    <div className="space-y-3">
                      <PinInput
                        length={6}
                        value={formData.verifyCode}
                        onChange={(value) => setFormData({ ...formData, verifyCode: value })}
                        onComplete={handleVerifyCodeComplete}
                        error={!!errors.verifyCode}
                        disabled={isLoading}
                      />
                      <div className="flex items-center justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleSendCode}
                          disabled={isLoading || countdown > 0 || !formData.phone}
                          className="h-8"
                        >
                          {countdown > 0 ? `重新发送 (${countdown}s)` : "发送验证码"}
                        </Button>
                        {isPhoneVerified && (
                          <span className="text-xs text-accent-ok">✓ 验证成功</span>
                        )}
                      </div>
                    </div>
                    {errors.verifyCode && (
                      <p className="text-xs text-destructive mt-1">{errors.verifyCode}</p>
                    )}
                  </div>

                  {/* New Password */}
                  <div>
                    <Label htmlFor="newPassword" className="text-sm font-medium text-foreground mb-2 block">
                      新密码
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="请输入新密码"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        className="pr-10 h-10"
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
                    <div className="mt-2">
                      <PasswordStrengthBar password={formData.newPassword} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      至少8位，需包含字母与数字
                    </p>
                    {errors.newPassword && (
                      <p className="text-xs text-destructive mt-1">{errors.newPassword}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground mb-2 block">
                      确认新密码
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="请再次输入新密码"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="pr-10 h-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>重置中...</span>
                      </div>
                    ) : (
                      "重置密码"
                    )}
                  </Button>
                </form>
                
                {/* Help Text */}
                <div className="mt-6 text-xs text-muted-foreground text-center leading-relaxed">
                  若手机号不可用，请联系企业管理员或客服
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-16 py-6 flex justify-between items-center text-sm text-muted-foreground">
          <div>
            版本 v2.1.3 © 2025 危司通 保留所有权利
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-accent-ok"></div>
            <span>安全连接</span>
          </div>
        </div>
      </div>
    </div>
  );
}