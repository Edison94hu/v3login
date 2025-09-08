"use client";

import { useState } from "react";
import { ArrowLeft, User, Lock, Eye, EyeOff, Phone, MessageSquare, Building, FileText, Shield, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { PasswordStrengthBar } from "./password-strength-bar";
import { ThemeSwitch } from "./theme-switch";
import { toast } from "sonner@2.0.3";

interface RegisterPageProps {
  onBackToLogin: () => void;
}

export function RegisterPage({ onBackToLogin }: RegisterPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    countryCode: "+86",
    phone: "",
    smsCode: "",
    companyName: "",
    uscc: "",
    permitNo: ""
  });

  // Error states
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation functions
  const validateUsername = (username: string) => {
    const usernameRegex = /^[A-Za-z0-9_]{4,20}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':",.<>/?]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateSMSCode = (code: string) => {
    const codeRegex = /^\d{6}$/;
    return codeRegex.test(code);
  };

  const validateUSCC = (uscc: string) => {
    const usccRegex = /^[0-9A-Z]{18}$/;
    return usccRegex.test(uscc);
  };

  const validatePermitNo = (permitNo: string) => {
    const permitRegex = /^[A-Z0-9\-]{10,25}$/;
    return permitRegex.test(permitNo);
  };

  // Send verification code
  const handleSendCode = async () => {
    if (!validatePhone(formData.phone)) {
      setErrors({ ...errors, phone: "请输入有效的大陆手机号码" });
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
      setErrors({ ...errors, phone: "" });
    } catch (error) {
      toast.error("发送验证码失败，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    // Validate username
    if (!validateUsername(formData.username)) {
      newErrors.username = "仅支持字母、数字或下划线，长度4-20位";
    }
    
    // Validate password
    if (!validatePassword(formData.password)) {
      newErrors.password = "至少8位，需包含字母与数字";
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "两次输入密码不一致";
    }
    
    // Validate phone
    if (!validatePhone(formData.phone)) {
      newErrors.phone = "请输入有效的大陆手机号码";
    }
    
    // Validate SMS code
    if (!validateSMSCode(formData.smsCode)) {
      newErrors.smsCode = "请输入6位数字验证码";
    }
    
    // Validate company name
    if (!formData.companyName || formData.companyName.length < 2 || formData.companyName.length > 60) {
      newErrors.companyName = "企业名称长度应为2-60位";
    }
    
    // Validate USCC
    if (!validateUSCC(formData.uscc)) {
      newErrors.uscc = "格式应为18位大写字母或数字";
    }
    
    // Validate permit number (optional field)
    if (formData.permitNo && !validatePermitNo(formData.permitNo)) {
      newErrors.permitNo = "格式应为10-25位大写字母、数字或横线";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("注册成功，正在为您登录...");
      
      // Return to login after success
      setTimeout(() => {
        onBackToLogin();
      }, 2000);
    } catch (error) {
      toast.error("注册失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>
      <div className="absolute inset-0 opacity-[0.03] bg-gradient-to-br from-transparent via-primary/10 to-transparent"></div>
      
      {/* Theme Switch */}
      <ThemeSwitch />

      {/* Main Container */}
      <div className="w-full min-h-screen max-w-none mx-auto relative">
        <div className="px-16 py-10 max-w-4xl mx-auto">
          
          {/* Top Bar - Back Button */}
          <div className="mb-8">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onBackToLogin}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回登录
            </Button>
          </div>

          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">注册新账号</h1>
            <p className="text-lg text-muted-foreground">开始您的危废管理之旅</p>
          </div>

          {/* Main Form Card */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Section A: Basic Information */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full"></div>
                <div className="pl-6">
                  <h3 className="text-xl font-semibold text-foreground mb-6">基本信息</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Username */}
                    <div className="md:col-span-2">
                      <Label htmlFor="username" className="text-foreground mb-2 block">
                        用户名
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="username"
                          type="text"
                          placeholder="建议使用英文字母或数字"
                          value={formData.username}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                      {errors.username && (
                        <p className="text-xs text-warning-main mt-1">{errors.username}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <Label htmlFor="password" className="text-foreground mb-2 block">
                        登录密码
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="请设置登录密码"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="pl-10 pr-10 h-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="mt-2">
                        <PasswordStrengthBar password={formData.password} />
                      </div>
                      {errors.password && (
                        <p className="text-xs text-warning-main mt-1">{errors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <Label htmlFor="confirmPassword" className="text-foreground mb-2 block">
                        确认密码
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="请再次输入密码"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="pl-10 pr-10 h-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-xs text-warning-main mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section B: Contact Verification */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-ok rounded-full"></div>
                <div className="pl-6">
                  <h3 className="text-xl font-semibold text-foreground mb-6">联系方式验证</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone" className="text-foreground mb-2 block">
                        手机号码
                      </Label>
                      <div className="flex">
                        <Select 
                          value={formData.countryCode} 
                          onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                        >
                          <SelectTrigger className="w-20 rounded-r-none border-r-0 h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+86">+86</SelectItem>
                            <SelectItem value="+1">+1</SelectItem>
                            <SelectItem value="+44">+44</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="relative flex-1">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="请输入11位手机号码"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="rounded-l-none pl-10 h-12"
                            required
                          />
                        </div>
                      </div>
                      {errors.phone && (
                        <p className="text-xs text-warning-main mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Send Code Button */}
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleSendCode}
                        disabled={isLoading || countdown > 0 || !formData.phone}
                        className="h-12 px-6"
                      >
                        {countdown > 0 ? `重新发送 (${countdown}s)` : "发送验证码"}
                      </Button>
                    </div>

                    {/* SMS Code */}
                    <div className="md:col-span-2">
                      <Label htmlFor="smsCode" className="text-foreground mb-2 block">
                        短信验证码
                      </Label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="smsCode"
                          type="text"
                          placeholder="请输入6位数字验证码"
                          value={formData.smsCode}
                          onChange={(e) => setFormData({ ...formData, smsCode: e.target.value })}
                          className="pl-10 h-12"
                          maxLength={6}
                          required
                        />
                      </div>
                      {errors.smsCode && (
                        <p className="text-xs text-warning-main mt-1">{errors.smsCode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section C: Company Information */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{ backgroundColor: 'var(--primary-main)' }}></div>
                <div className="pl-6">
                  <h3 className="text-xl font-semibold text-foreground mb-6">企业资质信息</h3>
                  <div className="space-y-6">
                    {/* Company Name */}
                    <div>
                      <Label htmlFor="companyName" className="text-foreground mb-2 block">
                        企业名称（完整工商注册名称）
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="companyName"
                          type="text"
                          placeholder="请输入完整的企业名称（与营业执照一致）"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                      {errors.companyName && (
                        <p className="text-xs text-warning-main mt-1">{errors.companyName}</p>
                      )}
                    </div>

                    {/* USCC */}
                    <div>
                      <Label htmlFor="uscc" className="text-foreground mb-2 block">
                        统一社会信用代码
                      </Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="uscc"
                          type="text"
                          placeholder="请输入完整的18位代码"
                          value={formData.uscc}
                          onChange={(e) => setFormData({ ...formData, uscc: e.target.value.toUpperCase() })}
                          className="pl-10 h-12"
                          maxLength={18}
                          required
                        />
                      </div>
                      {errors.uscc && (
                        <p className="text-xs text-warning-main mt-1">{errors.uscc}</p>
                      )}
                    </div>

                    {/* Permit Number */}
                    <div>
                      <Label htmlFor="permitNo" className="text-foreground mb-2 block">
                        排污许可证编号（选填）
                      </Label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="permitNo"
                          type="text"
                          placeholder="请输入完整的许可证编号"
                          value={formData.permitNo}
                          onChange={(e) => setFormData({ ...formData, permitNo: e.target.value.toUpperCase() })}
                          className="pl-10 h-12"
                        />
                      </div>
                      {errors.permitNo && (
                        <p className="text-xs text-warning-main mt-1">{errors.permitNo}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>注册中...</span>
                    </div>
                  ) : (
                    "立即注册"
                  )}
                </Button>
              </div>

              {/* Legal & Compliance */}
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground text-center">
                  注册即表示您同意{" "}
                  <button type="button" className="text-primary hover:underline">
                    用户协议
                  </button>
                  {" "}和{" "}
                  <button type="button" className="text-primary hover:underline">
                    隐私政策
                  </button>
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>您的信息将被安全加密处理，符合相关法规要求</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}