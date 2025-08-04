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
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  PaperAirplaneIcon,
  BugAntIcon
} from "@heroicons/react/24/outline";

export default function BugReportPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: '',
    description: '',
    stepsToReproduce: '',
    expectedBehavior: '',
    actualBehavior: '',
    email: '',
    browser: '',
    device: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual bug report submission
    console.log('Bug report:', formData);
    alert(language === 'id' ? 'Laporan bug berhasil dikirim!' : 'Bug report submitted successfully!');
    navigate('/');
  };

  const seoData = {
    title: `${language === 'id' ? 'Laporkan Bug' : 'Report Bug'} - Conime`,
    description: language === 'id' 
      ? 'Laporkan masalah atau bug yang Anda temukan di website Conime. Tim kami akan segera memperbaikinya.'
      : 'Report issues or bugs you found on the Conime website. Our team will fix them promptly.',
    keywords: `${language === 'id' ? 'laporan bug, masalah website, bantuan teknis' : 'bug report, website issues, technical support'}`,
    url: `https://conime.com${language === 'en' ? '/en' : ''}/report-bug`
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      <div className="min-h-screen bg-background">
        <Header />
        <TimeBar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
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
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                    <BugAntIcon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold">
                  {language === 'id' ? 'Laporkan Bug' : 'Report a Bug'}
                </h1>
                <p className="text-muted-foreground">
                  {language === 'id' 
                    ? 'Bantu kami memperbaiki masalah yang Anda temukan'
                    : 'Help us fix issues you encounter'
                  }
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Bug Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      {language === 'id' ? 'Judul Bug *' : 'Bug Title *'}
                    </Label>
                    <Input
                      id="title"
                      placeholder={language === 'id' ? 'Ringkas masalah dalam satu kalimat' : 'Summarize the issue in one sentence'}
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>

                  {/* Category and Priority */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">
                        {language === 'id' ? 'Kategori *' : 'Category *'}
                      </Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'id' ? 'Pilih kategori' : 'Select category'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ui">{language === 'id' ? 'Tampilan/UI' : 'UI/Display'}</SelectItem>
                          <SelectItem value="functionality">{language === 'id' ? 'Fungsionalitas' : 'Functionality'}</SelectItem>
                          <SelectItem value="performance">{language === 'id' ? 'Performa' : 'Performance'}</SelectItem>
                          <SelectItem value="mobile">{language === 'id' ? 'Mobile/Responsif' : 'Mobile/Responsive'}</SelectItem>
                          <SelectItem value="content">{language === 'id' ? 'Konten' : 'Content'}</SelectItem>
                          <SelectItem value="other">{language === 'id' ? 'Lainnya' : 'Other'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">
                        {language === 'id' ? 'Prioritas' : 'Priority'}
                      </Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'id' ? 'Pilih prioritas' : 'Select priority'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">{language === 'id' ? 'Rendah' : 'Low'}</SelectItem>
                          <SelectItem value="medium">{language === 'id' ? 'Sedang' : 'Medium'}</SelectItem>
                          <SelectItem value="high">{language === 'id' ? 'Tinggi' : 'High'}</SelectItem>
                          <SelectItem value="critical">{language === 'id' ? 'Kritis' : 'Critical'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      {language === 'id' ? 'Deskripsi Bug *' : 'Bug Description *'}
                    </Label>
                    <Textarea
                      id="description"
                      placeholder={language === 'id' ? 'Jelaskan masalah secara detail...' : 'Describe the issue in detail...'}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      required
                      rows={4}
                    />
                  </div>

                  {/* Steps to Reproduce */}
                  <div className="space-y-2">
                    <Label htmlFor="stepsToReproduce">
                      {language === 'id' ? 'Langkah untuk Mereproduksi' : 'Steps to Reproduce'}
                    </Label>
                    <Textarea
                      id="stepsToReproduce"
                      placeholder={language === 'id' 
                        ? '1. Buka halaman...\n2. Klik tombol...\n3. Lihat hasilnya...'
                        : '1. Go to page...\n2. Click button...\n3. See the result...'
                      }
                      value={formData.stepsToReproduce}
                      onChange={(e) => setFormData(prev => ({ ...prev, stepsToReproduce: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  {/* Expected vs Actual Behavior */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expectedBehavior">
                        {language === 'id' ? 'Perilaku yang Diharapkan' : 'Expected Behavior'}
                      </Label>
                      <Textarea
                        id="expectedBehavior"
                        placeholder={language === 'id' ? 'Apa yang seharusnya terjadi?' : 'What should happen?'}
                        value={formData.expectedBehavior}
                        onChange={(e) => setFormData(prev => ({ ...prev, expectedBehavior: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="actualBehavior">
                        {language === 'id' ? 'Perilaku Aktual' : 'Actual Behavior'}
                      </Label>
                      <Textarea
                        id="actualBehavior"
                        placeholder={language === 'id' ? 'Apa yang benar-benar terjadi?' : 'What actually happens?'}
                        value={formData.actualBehavior}
                        onChange={(e) => setFormData(prev => ({ ...prev, actualBehavior: e.target.value }))}
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {language === 'id' ? 'Email (Opsional)' : 'Email (Optional)'}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={language === 'id' ? 'Email untuk update status' : 'Email for status updates'}
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  {/* System Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="browser">
                        {language === 'id' ? 'Browser' : 'Browser'}
                      </Label>
                      <Input
                        id="browser"
                        placeholder={language === 'id' ? 'Chrome, Firefox, Safari, dll.' : 'Chrome, Firefox, Safari, etc.'}
                        value={formData.browser}
                        onChange={(e) => setFormData(prev => ({ ...prev, browser: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="device">
                        {language === 'id' ? 'Perangkat' : 'Device'}
                      </Label>
                      <Input
                        id="device"
                        placeholder={language === 'id' ? 'Desktop, Mobile, Tablet' : 'Desktop, Mobile, Tablet'}
                        value={formData.device}
                        onChange={(e) => setFormData(prev => ({ ...prev, device: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full">
                    <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                    {language === 'id' ? 'Kirim Laporan Bug' : 'Submit Bug Report'}
                  </Button>

                  {/* Help Text */}
                  <p className="text-sm text-muted-foreground text-center">
                    {language === 'id' 
                      ? 'Tim kami akan meninjau laporan Anda dan memberikan update jika diperlukan.'
                      : 'Our team will review your report and provide updates if needed.'
                    }
                  </p>
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