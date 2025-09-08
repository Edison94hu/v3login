"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { PinInput } from "./pin-input";
import { PasswordStrengthBar } from "./password-strength-bar";
import { Stepper } from "./stepper";
import { toast } from "sonner@2.0.3";

interface ResetPasswordFormProps {
  onBackToLogin: () => void;
}

export function ResetPasswordForm({ onBackToLogin }: ResetPasswordFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    countryCode: "+86",
    phone: "",
    captcha: "",
    verifyCode: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Error states
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = ["验证身份", "设置新密码"];

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

  // Handle step 1 submission
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!validatePhone(formData.phone)) {
      newErrors.phone = "请输入有效的手机号码";
    }
    
    if (!formData.verifyCode || formData.verifyCode.length !== 6) {
      newErrors.verifyCode = "请输入6位验证码";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock verification result
      if (formData.verifyCode !== "123456") {
        setErrors({ verifyCode: "验证码错误或已过期" });
        setIsLoading(false);
        return;
      }

      setErrors({});
      setCurrentStep(1);
    } catch (error) {
      toast.error("验证失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle step 2 submission
  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
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
    <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="font-semibold text-base text-foreground mb-1">忘记密码</h2>
        <p className="text-sm text-muted-foreground">
          登录方式为手机号码，完成验证后即可重置密码
        </p>
      </div>

      <Stepper currentStep={currentStep} steps={steps} />

      {currentStep === 0 ? (
        <form onSubmit={handleStep1Submit} className="space-y-4">
          {/* Phone Input */}
          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-foreground">
              手机号码
            </Label>
            <div className="flex mt-1">
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
                className="rounded-l-none"
                required
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-destructive mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Captcha (Optional) */}
          <div>
            <Label htmlFor="captcha" className="text-sm font-medium text-foreground">
              图形验证码
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="captcha"
                type="text"
                placeholder="请输入图形验证码"
                value={formData.captcha}
                onChange={(e) => setFormData({ ...formData, captcha: e.target.value })}
                className="flex-1"
              />
              <div className="w-30 h-12 bg-muted border border-border rounded-xl flex items-center justify-center text-xs text-muted-foreground">
                验证码图片
              </div>
              <Button type="button" variant="outline" size="icon" className="h-12 w-12">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* SMS Verification Code */}
          <div>
            <Label className="text-sm font-medium text-foreground">
              短信验证码
            </Label>
            <div className="mt-2">
              <PinInput
                length={6}
                value={formData.verifyCode}
                onChange={(value) => setFormData({ ...formData, verifyCode: value })}
                error={!!errors.verifyCode}
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSendCode}
                disabled={isLoading || countdown > 0 || !formData.phone}
              >
                {countdown > 0 ? `重新发送 (${countdown}s)` : "发送验证码"}
              </Button>
            </div>
            {errors.verifyCode && (
              <p className="text-xs text-destructive mt-1">{errors.verifyCode}</p>
            )}
          </div>

          {/* Next Step Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>验证中...</span>
              </div>
            ) : (
              "下一步"
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleStep2Submit} className="space-y-4">
          {/* New Password */}
          <div>
            <Label htmlFor="newPassword" className="text-sm font-medium text-foreground">
              新密码
            </Label>
            <div className="relative mt-1">
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="请输入新密码"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
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
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
              确认新密码
            </Label>
            <div className="relative mt-1">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="请再次输入新密码"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="pr-10"
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

          {/* Reset Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
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
      )}

      {/* Footer Actions */}
      <div className="mt-6 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="outline" onClick={onBackToLogin} className="text-sm">
            返回登录
          </Button>
          <Button type="button" variant="outline" className="text-sm" disabled>
            使用邮箱找回
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground text-center leading-relaxed">
          若手机号不可用，请联系企业管理员或客服
        </div>
      </div>
    </div>
  );
}