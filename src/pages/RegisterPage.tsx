import { useState } from "react";
import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "../components/Router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { 
  EyeIcon, 
  EyeSlashIcon,
  UserPlusIcon,
  LockClosedIcon,
  ArrowLeftIcon,
  UserIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";

export default function RegisterPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert(language === 'id' ? 'Kata sandi tidak cocok' : 'Passwords do not match');
      return;
    }
    
    if (!formData.acceptTerms) {
      alert(language === 'id' ? 'Anda harus menyetujui syarat dan ketentuan' : 'You must accept the terms and conditions');
      return;
    }
    
    // TODO: Implement actual registration logic
    console.log('Registration attempt:', formData);
    alert(language === 'id' ? 'Fitur registrasi sedang dalam pengembangan' : 'Registration feature is under development');
  };

  const seoData = {
    title: `${language === 'id' ? 'Daftar' : 'Register'} - Conime`,
    description: language === 'id' 
      ? 'Daftar akun Conime gratis untuk mengakses fitur eksklusif, menyimpan artikel favorit, dan bergabung dengan komunitas anime.'
      : 'Create a free Conime account to access exclusive features, save favorite articles, and join the anime community.',
    keywords: `${language === 'id' ? 'daftar, registrasi, akun baru conime' : 'register, sign up, new conime account'}`,
    url: `https://conime.com${language === 'en' ? '/en' : ''}/register`
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      <div className="min-h-screen bg-background">
        <Header />
        <TimeBar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            {/* Back Button */}
            <Button 
              onClick={() => navigate('/')} 
              variant="outline" 
              size="sm" 
              className="mb-6"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              {language === 'id' ? 'Kembali' : 'Back'}
            </Button>

            <Card className="shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <UserPlusIcon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold">
                  {language === 'id' ? 'Daftar ke Conime' : 'Join Conime'}
                </h1>
                <p className="text-muted-foreground">
                  {language === 'id' 
                    ? 'Buat akun gratis dan nikmati fitur eksklusif'
                    : 'Create a free account and enjoy exclusive features'
                  }
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {language === 'id' ? 'Nama Lengkap' : 'Full Name'}
                    </Label>
                    <div className="relative">
                      <Input
                        id="name"
                        type="text"
                        placeholder={language === 'id' ? 'Masukkan nama lengkap' : 'Enter your full name'}
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="h-12 pl-12"
                      />
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {language === 'id' ? 'Email' : 'Email'}
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder={language === 'id' ? 'Masukkan email Anda' : 'Enter your email'}
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="h-12 pl-12"
                      />
                      <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      {language === 'id' ? 'Kata Sandi' : 'Password'}
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder={language === 'id' ? 'Buat kata sandi' : 'Create password'}
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        required
                        className="h-12 pl-12 pr-12"
                      />
                      <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      {language === 'id' ? 'Konfirmasi Kata Sandi' : 'Confirm Password'}
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder={language === 'id' ? 'Ulangi kata sandi' : 'Repeat password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                        className="h-12 pl-12 pr-12"
                      />
                      <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start space-x-2">
                    <input 
                      type="checkbox" 
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                      className="rounded border-border mt-1"
                      required
                    />
                    <label htmlFor="acceptTerms" className="text-sm text-muted-foreground">
                      {language === 'id' ? (
                        <>
                          Saya setuju dengan{' '}
                          <button 
                            type="button"
                            onClick={() => navigate('/terms')}
                            className="text-primary hover:underline"
                          >
                            Syarat & Ketentuan
                          </button>
                          {' '}dan{' '}
                          <button 
                            type="button"
                            onClick={() => navigate('/privacy')}
                            className="text-primary hover:underline"
                          >
                            Kebijakan Privasi
                          </button>
                        </>
                      ) : (
                        <>
                          I agree to the{' '}
                          <button 
                            type="button"
                            onClick={() => navigate('/terms')}
                            className="text-primary hover:underline"
                          >
                            Terms & Conditions
                          </button>
                          {' '}and{' '}
                          <button 
                            type="button"
                            onClick={() => navigate('/privacy')}
                            className="text-primary hover:underline"
                          >
                            Privacy Policy
                          </button>
                        </>
                      )}
                    </label>
                  </div>

                  {/* Register Button */}
                  <Button type="submit" className="w-full h-12">
                    <UserPlusIcon className="w-4 h-4 mr-2" />
                    {language === 'id' ? 'Daftar Akun' : 'Create Account'}
                  </Button>

                  {/* Login Link */}
                  <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground">
                      {language === 'id' ? 'Sudah punya akun?' : 'Already have an account?'}{' '}
                      <button 
                        type="button"
                        onClick={() => navigate('/login')}
                        className="text-primary hover:underline font-medium"
                      >
                        {language === 'id' ? 'Masuk sekarang' : 'Login now'}
                      </button>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}