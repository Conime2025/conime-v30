import { useState } from "react";
import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar";
import { Footer } from "../components/Footer";
import { Breadcrumb } from "../components/Breadcrumb";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "../components/Router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  UserCircleIcon,
  CameraIcon,
  CalendarIcon,
  MapPinIcon,
  LinkIcon,
  EnvelopeIcon,
  PhoneIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  KeyIcon,
  ShieldCheckIcon,
  EyeIcon,
  LockClosedIcon,
  CogIcon
} from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const { language, t } = useLanguage();
  const { navigate } = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Koni",
    username: "koni_editor",
    email: "koni@conime.com",
    phone: "+62 812-3195-8808",
    bio: language === 'id' 
      ? "Editor senior di Conime yang berdedikasi untuk memberikan konten anime dan manga terbaik untuk para otaku Indonesia."
      : "Senior editor at Conime dedicated to providing the best anime and manga content for Indonesian otaku.",
    location: "Jakarta, Indonesia",
    website: "https://conime.com",
    joinDate: "Januari 2025",
    avatar: null as string | null
  });

  // Password section state
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: '24h'
  });

  const [editForm, setEditForm] = useState(profile);

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handlePasswordSave = () => {
    // In real app, this would call API to change password
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert(language === 'id' ? 'Password baru tidak cocok!' : 'New passwords do not match!');
      return;
    }
    alert(language === 'id' ? 'Password berhasil diubah!' : 'Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordSection(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditForm(prev => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
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
                label: language === 'id' ? 'Profil' : 'Profile', 
                isActive: true 
              }
            ]} 
          />

          {/* Profile Header */}
          <Card className="p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar Section */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                  {profile.avatar ? (
                    <img 
                      src={profile.avatar} 
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="w-20 h-20 text-muted-foreground" />
                  )}
                </div>
                
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-white rounded-full p-2 cursor-pointer transition-colors">
                    <CameraIcon className="w-4 h-4" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleAvatarChange}
                      className="hidden" 
                    />
                  </label>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{language === 'id' ? 'Nama Lengkap' : 'Full Name'}</Label>
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="username">{language === 'id' ? 'Username' : 'Username'}</Label>
                        <Input
                          id="username"
                          value={editForm.username}
                          onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">{language === 'id' ? 'Bio' : 'Bio'}</Label>
                      <Textarea
                        id="bio"
                        value={editForm.bio}
                        onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                        rows={3}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold">{profile.name}</h1>
                      <p className="text-muted-foreground">@{profile.username}</p>
                    </div>
                    
                    <p className="text-lg">{profile.bio}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{language === 'id' ? 'Bergabung' : 'Joined'} {profile.joinDate}</span>
                      </div>
                      
                      {profile.location && (
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{profile.location}</span>
                        </div>
                      )}
                      
                      {profile.website && (
                        <div className="flex items-center gap-1">
                          <LinkIcon className="w-4 h-4" />
                          <a href={profile.website} target="_blank" rel="noopener noreferrer" 
                             className="text-primary hover:underline">
                            {profile.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-6">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} size="sm">
                        <CheckIcon className="w-4 h-4 mr-2" />
                        {language === 'id' ? 'Simpan' : 'Save'}
                      </Button>
                      <Button onClick={handleCancel} variant="outline" size="sm">
                        <XMarkIcon className="w-4 h-4 mr-2" />
                        {language === 'id' ? 'Batal' : 'Cancel'}
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} size="sm">
                      <PencilIcon className="w-4 h-4 mr-2" />
                      {language === 'id' ? 'Edit Profil' : 'Edit Profile'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {language === 'id' ? 'Informasi Kontak' : 'Contact Information'}
              </h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/settings')}
                className="flex items-center gap-2"
              >
                <CogIcon className="w-4 h-4" />
                {language === 'id' ? 'Pengaturan Lengkap' : 'Full Settings'}
              </Button>
            </div>
            
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">{language === 'id' ? 'Email' : 'Email'}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{language === 'id' ? 'Telepon' : 'Phone'}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="location">{language === 'id' ? 'Lokasi' : 'Location'}</Label>
                  <Input
                    id="location"
                    value={editForm.location}
                    onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="website">{language === 'id' ? 'Website' : 'Website'}</Label>
                  <Input
                    id="website"
                    type="url"
                    value={editForm.website}
                    onChange={(e) => setEditForm(prev => ({ ...prev, website: e.target.value }))}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-muted-foreground" />
                  <span>{profile.email}</span>
                </div>
                
                {profile.phone && (
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="w-5 h-5 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <MapPinIcon className="w-5 h-5 text-muted-foreground" />
                  <span>{profile.location}</span>
                </div>
                
                {profile.website && (
                  <div className="flex items-center gap-3">
                    <LinkIcon className="w-5 h-5 text-muted-foreground" />
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" 
                       className="text-primary hover:underline">
                      {profile.website}
                    </a>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Password Management */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <KeyIcon className="w-6 h-6 text-primary" />
                {language === 'id' ? 'Keamanan & Password' : 'Security & Password'}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPasswordSection(!showPasswordSection)}
              >
                {showPasswordSection 
                  ? (language === 'id' ? 'Tutup' : 'Close')
                  : (language === 'id' ? 'Ganti Password' : 'Change Password')
                }
              </Button>
            </div>
            
            {showPasswordSection ? (
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <Label htmlFor="currentPassword">{language === 'id' ? 'Password Saat Ini' : 'Current Password'}</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">{language === 'id' ? 'Password Baru' : 'New Password'}</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">{language === 'id' ? 'Konfirmasi Password Baru' : 'Confirm New Password'}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button onClick={handlePasswordSave} size="sm">
                    <CheckIcon className="w-4 h-4 mr-2" />
                    {language === 'id' ? 'Simpan Password' : 'Save Password'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      setShowPasswordSection(false);
                    }}
                  >
                    <XMarkIcon className="w-4 h-4 mr-2" />
                    {language === 'id' ? 'Batal' : 'Cancel'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">
                      {language === 'id' ? 'Password Aman' : 'Secure Password'}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      {language === 'id' ? 'Password terakhir diubah 30 hari yang lalu' : 'Password last changed 30 days ago'}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <EyeIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{language === 'id' ? 'Notifikasi Login' : 'Login Notifications'}</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={securitySettings.loginNotifications}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, loginNotifications: e.target.checked }))}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <LockClosedIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{language === 'id' ? 'Autentikasi 2 Faktor' : 'Two-Factor Auth'}</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: e.target.checked }))}
                      className="rounded"
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Activity Summary */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {language === 'id' ? 'Aktivitas' : 'Activity'}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">127</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'id' ? 'Artikel' : 'Articles'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1.2k</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'id' ? 'Komentar' : 'Comments'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">8.5k</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'id' ? 'Like' : 'Likes'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3.2k</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'id' ? 'Dibagikan' : 'Shares'}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}