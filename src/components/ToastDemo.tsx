import { useToast, ToastContainer, AlertDialog } from "./ui/toast";
import { Button } from "./ui/button";
import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

export function ToastDemo() {
  const { language } = useLanguage();
  const { toasts, removeToast, showSuccess, showError, showWarning, showInfo } = useToast();
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="p-6 bg-card rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">
        {language === 'id' ? 'Sistem Notifikasi' : 'Notification System'}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Button 
          onClick={() => showSuccess(
            language === 'id' ? 'Artikel berhasil dibagikan!' : 'Article shared successfully!',
            language === 'id' ? 'Sukses' : 'Success'
          )}
          className="bg-green-600 hover:bg-green-700"
        >
          {language === 'id' ? 'Sukses' : 'Success'}
        </Button>
        
        <Button 
          onClick={() => showError(
            language === 'id' ? 'Gagal memuat artikel. Coba lagi.' : 'Failed to load article. Try again.',
            language === 'id' ? 'Error' : 'Error'
          )}
          className="bg-red-600 hover:bg-red-700"
        >
          Error
        </Button>
        
        <Button 
          onClick={() => showWarning(
            language === 'id' ? 'Koneksi internet tidak stabil.' : 'Internet connection unstable.',
            language === 'id' ? 'Peringatan' : 'Warning'
          )}
          className="bg-yellow-600 hover:bg-yellow-700"
        >
          {language === 'id' ? 'Peringatan' : 'Warning'}
        </Button>
        
        <Button 
          onClick={() => showInfo(
            language === 'id' ? 'Ada pembaruan tersedia untuk website.' : 'Website update available.',
            language === 'id' ? 'Info' : 'Info'
          )}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Info
        </Button>
      </div>

      <Button 
        onClick={() => setShowAlert(true)}
        variant="outline"
        className="mb-4"
      >
        {language === 'id' ? 'Tampilkan Dialog Konfirmasi' : 'Show Confirmation Dialog'}
      </Button>

      {/* Toast Container */}
      <ToastContainer position="top-right">
        {toasts.map((toast) => (
          <toast.Toast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={() => {
          showSuccess(
            language === 'id' ? 'Tindakan dikonfirmasi!' : 'Action confirmed!',
            language === 'id' ? 'Berhasil' : 'Success'
          );
        }}
        title={language === 'id' ? 'Konfirmasi Tindakan' : 'Confirm Action'}
        message={language === 'id' 
          ? 'Apakah Anda yakin ingin melanjutkan tindakan ini? Tindakan ini tidak dapat dibatalkan.'
          : 'Are you sure you want to continue with this action? This action cannot be undone.'
        }
        type="warning"
        confirmText={language === 'id' ? 'Ya, Lanjutkan' : 'Yes, Continue'}
        cancelText={language === 'id' ? 'Batal' : 'Cancel'}
      />
    </div>
  );
}