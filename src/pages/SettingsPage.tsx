import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar";
import { Footer } from "../components/Footer";
import { Breadcrumb } from "../components/Breadcrumb";
import { useLanguage } from "../hooks/useLanguage";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  CogIcon,
  BellIcon,
  EyeIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  MoonIcon,
  SunIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon
} from "@heroicons/react/24/outline";

export default function SettingsPage() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isDark, setIsDark] = useState(false);
  const [settings, setSettings] = useState({
    // Appearance
    theme: 'dark',
    language: language,
    fontSize: 'medium',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    commentNotifications: true,
    likeNotifications: false,
    
    // Privacy
    profileVisibility: 'public',
    showEmail: false,
    showActivity: true,
    
    // Reading Preferences
    autoplayVideos: true,
    showThumbnails: true,
    infiniteScroll: true,
    
    // Content Preferences
    preferredCategories: ['anime', 'manga'],
    contentQuality: 'high',
    spoilerWarnings: true,
    matureContent: false
  });

  useEffect(() => {
    const storedTheme = localStorage.getItem('darkmode');
    setIsDark(storedTheme === 'true');
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkmode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkmode', 'false');
    }
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    // Save to localStorage or send to backend
    console.log('Settings saved:', settings);
    alert(language === 'id' ? 'Pengaturan berhasil disimpan!' : 'Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
        <TimeBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { 
                label: language === 'id' ? 'Pengaturan' : 'Settings', 
                isActive: true 
              }
            ]} 
          />

          <div className="space-y-8">
            {/* Appearance Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <EyeIcon className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">
                  {language === 'id' ? 'Tampilan' : 'Appearance'}
                </h2>
              </div>

              <div className="space-y-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">
                      {language === 'id' ? 'Tema' : 'Theme'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'id' 
                        ? 'Pilih tema gelap atau terang' 
                        : 'Choose between dark and light theme'
                      }
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <SunIcon className="w-4 h-4" />
                    <Switch 
                      checked={isDark} 
                      onCheckedChange={toggleTheme}
                    />
                    <MoonIcon className="w-4 h-4" />
                  </div>
                </div>

                {/* Language */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">
                      {language === 'id' ? 'Bahasa' : 'Language'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'id' 
                        ? 'Pilih bahasa antarmuka' 
                        : 'Choose interface language'
                      }
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={toggleLanguage}
                    className="min-w-[100px]"
                  >
                    <GlobeAltIcon className="w-4 h-4 mr-2" />
                    {language === 'id' ? 'Indonesia' : 'English'}
                  </Button>
                </div>

                {/* Font Size */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">
                      {language === 'id' ? 'Ukuran Font' : 'Font Size'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'id' 
                        ? 'Sesuaikan ukuran teks untuk kenyamanan membaca' 
                        : 'Adjust text size for comfortable reading'
                      }
                    </p>
                  </div>
                  <Select value={settings.fontSize} onValueChange={(value) => handleSettingChange('fontSize', value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">{language === 'id' ? 'Kecil' : 'Small'}</SelectItem>
                      <SelectItem value="medium">{language === 'id' ? 'Sedang' : 'Medium'}</SelectItem>
                      <SelectItem value="large">{language === 'id' ? 'Besar' : 'Large'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <BellIcon className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">
                  {language === 'id' ? 'Notifikasi' : 'Notifications'}
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">
                      {language === 'id' ? 'Notifikasi Email' : 'Email Notifications'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'id' 
                        ? 'Terima notifikasi melalui email' 
                        : 'Receive notifications via email'
                      }
                    </p>
                  </div>
                  <Switch 
                    checked={settings.emailNotifications} 
                    onCheckedChange={(value) => handleSettingChange('emailNotifications', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">
                      {language === 'id' ? 'Notifikasi Push' : 'Push Notifications'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'id' 
                        ? 'Terima notifikasi push di browser' 
                        : 'Receive push notifications in browser'
                      }
                    </p>
                  </div>
                  <Switch 
                    checked={settings.pushNotifications} 
                    onCheckedChange={(value) => handleSettingChange('pushNotifications', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">
                      {language === 'id' ? 'Notifikasi Komentar' : 'Comment Notifications'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'id' 
                        ? 'Notifikasi ketika ada komentar pada artikel Anda' 
                        : 'Notifications when someone comments on your articles'
                      }
                    </p>
                  </div>
                  <Switch 
                    checked={settings.commentNotifications} 
                    onCheckedChange={(value) => handleSettingChange('commentNotifications', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">
                      {language === 'id' ? 'Notifikasi Like' : 'Like Notifications'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'id' 
                        ? 'Notifikasi ketika artikel Anda disukai' 
                        : 'Notifications when your articles are liked'
                      }
                    </p>
                  </div>
                  <Switch 
                    checked={settings.likeNotifications} 
                    onCheckedChange={(value) => handleSettingChange('likeNotifications', value)}
                  />
                </div>
              </div>
            </Card>

            {/* Privacy Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheckIcon className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">
                  {language === 'id' ? 'Privasi' : 'Privacy'}
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">
                      {language === 'id' ? 'Visibilitas Profil' : 'Profile Visibility'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'id' 
                        ? 'Siapa yang dapat melihat profil Anda' 
                        : 'Who can view your profile'
                      }
                    </p>
                  </div>
                  <Select value={settings.profileVisibility} onValueChange={(value) => handleSettingChange('profileVisibility', value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">{language === 'id' ? 'Publik' : 'Public'}</SelectItem>
                      <SelectItem value="friends">{language === 'id' ? 'Teman' : 'Friends'}</SelectItem>
                      <SelectItem value="private">{language === 'id' ? 'Pribadi' : 'Private'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">
                      {language === 'id' ? 'Tampilkan Email' : 'Show Email'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'id' 
                        ? 'Tampilkan email di profil publik' 
                        : 'Display email in public profile'
                      }
                    </p>
                  </div>
                  <Switch 
                    checked={settings.showEmail} 
                    onCheckedChange={(value) => handleSettingChange('showEmail', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">
                      {language === 'id' ? 'Tampilkan Aktivitas' : 'Show Activity'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'id' 
                        ? 'Tampilkan aktivitas membaca dan komentar' 
                        : 'Display reading and comment activity'
                      }
                    </p>
                  </div>
                  <Switch 
                    checked={settings.showActivity} 
                    onCheckedChange={(value) => handleSettingChange('showActivity', value)}
                  />
                </div>
              </div>
            </Card>

            {/* Reading Preferences */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <CogIcon className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">
                  {language === 'id' ? 'Preferensi Membaca' : 'Reading Preferences'}
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">
                      {language === 'id' ? 'Putar Video Otomatis' : 'Autoplay Videos'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'id' 
                        ? 'Video akan diputar otomatis saat artikel dimuat' 
                        : 'Videos will play automatically when articles load'
                      }
                    </p>
                  </div>
                  <Switch 
                    checked={settings.autoplayVideos} 
                    onCheckedChange={(value) => handleSettingChange('autoplayVideos', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">
                      {language === 'id' ? 'Tampilkan Thumbnail' : 'Show Thumbnails'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'id' 
                        ? 'Tampilkan gambar thumbnail artikel' 
                        : 'Display article thumbnail images'
                      }
                    </p>
                  </div>
                  <Switch 
                    checked={settings.showThumbnails} 
                    onCheckedChange={(value) => handleSettingChange('showThumbnails', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">
                      {language === 'id' ? 'Scroll Tak Terbatas' : 'Infinite Scroll'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === 'id' 
                        ? 'Muat artikel secara otomatis saat scroll' 
                        : 'Load articles automatically while scrolling'
                      }
                    </p>
                  </div>
                  <Switch 
                    checked={settings.infiniteScroll} 
                    onCheckedChange={(value) => handleSettingChange('infiniteScroll', value)}
                  />
                </div>
              </div>
            </Card>

            {/* Content Preferences */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <CogIcon className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">
                  {language === 'id' ? 'Preferensi Konten' : 'Content Preferences'}
                </h2>
              </div>

              <div className="space-y-6">
                {/* Content Quality */}
                <div>
                  <Label className="text-base mb-3 block">
                    {language === 'id' ? 'Kualitas Konten' : 'Content Quality'}
                  </Label>
                  <RadioGroup value={settings.contentQuality} onValueChange={(value) => handleSettingChange('contentQuality', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="quality-high" />
                      <Label htmlFor="quality-high" className="cursor-pointer">
                        {language === 'id' ? 'Tinggi (HD+)' : 'High (HD+)'}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="quality-medium" />
                      <Label htmlFor="quality-medium" className="cursor-pointer">
                        {language === 'id' ? 'Sedang (720p)' : 'Medium (720p)'}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="quality-low" />
                      <Label htmlFor="quality-low" className="cursor-pointer">
                        {language === 'id' ? 'Rendah (480p)' : 'Low (480p)'}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Preferred Categories */}
                <div>
                  <Label className="text-base mb-3 block">
                    {language === 'id' ? 'Kategori Favorit' : 'Preferred Categories'}
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {['anime', 'manga', 'komik', 'film', 'game', 'ulasan'].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={settings.preferredCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            const newCategories = checked
                              ? [...settings.preferredCategories, category]
                              : settings.preferredCategories.filter(c => c !== category);
                            handleSettingChange('preferredCategories', newCategories);
                          }}
                        />
                        <Label htmlFor={`category-${category}`} className="cursor-pointer capitalize">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Warnings */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="spoiler-warnings"
                      checked={settings.spoilerWarnings}
                      onCheckedChange={(checked) => handleSettingChange('spoilerWarnings', checked)}
                    />
                    <Label htmlFor="spoiler-warnings" className="cursor-pointer">
                      {language === 'id' ? 'Peringatan Spoiler' : 'Spoiler Warnings'}
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mature-content"
                      checked={settings.matureContent}
                      onCheckedChange={(checked) => handleSettingChange('matureContent', checked)}
                    />
                    <Label htmlFor="mature-content" className="cursor-pointer">
                      {language === 'id' ? 'Konten Dewasa (18+)' : 'Mature Content (18+)'}
                    </Label>
                  </div>
                </div>
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={saveSettings} size="lg">
                {language === 'id' ? 'Simpan Pengaturan' : 'Save Settings'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}