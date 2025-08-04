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
  UserCircleIcon,
  LockClosedIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";

export default function LoginPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    console.log('Login attempt:', formData);
    alert(language === 'id' ? 'Fitur login sedang dalam pengembangan' : 'Login feature is under development');
  };

  const seoData = {
    title: `${language === 'id' ? 'Masuk' : 'Login'} - Conime`,
    description: language === 'id' 
      ? 'Masuk ke akun Conime Anda untuk mengakses fitur eksklusif, menyimpan artikel favorit, dan berinteraksi dengan komunitas.'
      : 'Login to your Conime account to access exclusive features, save favorite articles, and interact with the community.',
    keywords: `${language === 'id' ? 'login, masuk, akun conime' : 'login, sign in, conime account'}`,
    url: `https://conime.com${language === 'en' ? '/en' : ''}/login`
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
                    <UserCircleIcon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold">
                  {language === 'id' ? 'Masuk ke Conime' : 'Login to Conime'}
                </h1>
                <p className="text-muted-foreground">
                  {language === 'id' 
                    ? 'Masuk untuk mengakses fitur eksklusif'
                    : 'Sign in to access exclusive features'
                  }
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {language === 'id' ? 'Email' : 'Email'}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={language === 'id' ? 'Masukkan email Anda' : 'Enter your email'}
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="h-12"
                    />
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
                        placeholder={language === 'id' ? 'Masukkan kata sandi' : 'Enter your password'}
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        required
                        className="h-12 pr-12"
                      />
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

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded border-border" />
                      <span>{language === 'id' ? 'Ingat saya' : 'Remember me'}</span>
                    </label>
                    <button 
                      type="button"
                      className="text-sm text-primary hover:underline"
                      onClick={() => alert(language === 'id' ? 'Fitur lupa password sedang dalam pengembangan' : 'Forgot password feature is under development')}
                    >
                      {language === 'id' ? 'Lupa kata sandi?' : 'Forgot password?'}
                    </button>
                  </div>

                  {/* Login Button */}
                  <Button type="submit" className="w-full h-12">
                    <LockClosedIcon className="w-4 h-4 mr-2" />
                    {language === 'id' ? 'Masuk' : 'Login'}
                  </Button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-background px-2 text-muted-foreground">
                        {language === 'id' ? 'atau' : 'or'}
                      </span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="space-y-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full h-12"
                      onClick={() => alert(language === 'id' ? 'Login Google sedang dalam pengembangan' : 'Google login is under development')}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      {language === 'id' ? 'Masuk dengan Google' : 'Sign in with Google'}
                    </Button>
                  </div>

                  {/* Register Link */}
                  <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground">
                      {language === 'id' ? 'Belum punya akun?' : "Don't have an account?"}{' '}
                      <button 
                        type="button"
                        onClick={() => navigate('/register')}
                        className="text-primary hover:underline font-medium"
                      >
                        {language === 'id' ? 'Daftar sekarang' : 'Register now'}
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