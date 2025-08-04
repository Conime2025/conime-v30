import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "./Router";
import { 
  BellIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  UserPlusIcon,
  FireIcon,
  CheckIcon,
  XMarkIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";
import { ToastNotification, NewsletterNotification, AlertNotification } from "./NotificationSystem";

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'system' | 'article';
  title: { id: string; en: string };
  message: { id: string; en: string };
  time: string;
  isRead: boolean;
  actionUrl?: string;
}

// Props for the bell notification popup
interface BellNotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLElement>;
}

// Props for the notification system popups
interface SystemNotificationPopupProps {
  toastNotifications: ToastNotification[];
  newsletterNotification: NewsletterNotification | null;
  alertNotification: AlertNotification | null;
  onRemoveToast: (id: string) => void;
  onCloseNewsletter: () => void;
  onCloseAlert: () => void;
}

// Bell Notification Popup Component
export function BellNotificationPopup({ isOpen, onClose, anchorRef }: BellNotificationPopupProps) {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'article',
      title: { 
        id: 'Artikel Baru!', 
        en: 'New Article!' 
      },
      message: { 
        id: 'Chainsaw Man: Film Arc Reze akan tayang 2024 telah dipublikasi', 
        en: 'Chainsaw Man: Reze Arc Movie Coming 2024 has been published' 
      },
      time: '5 menit lalu',
      isRead: false,
      actionUrl: '/anime/chainsaw-man-reze-arc-movie-2024'
    },
    {
      id: '2',
      type: 'like',
      title: { 
        id: 'Artikel Disukai', 
        en: 'Article Liked' 
      },
      message: { 
        id: 'Artikel Anda tentang Jujutsu Kaisen mendapat 10 like baru', 
        en: 'Your Jujutsu Kaisen article got 10 new likes' 
      },
      time: '1 jam lalu',
      isRead: false
    },
    {
      id: '3',
      type: 'comment',
      title: { 
        id: 'Komentar Baru', 
        en: 'New Comment' 
      },
      message: { 
        id: 'Seseorang mengomentari artikel Demon Slayer Anda', 
        en: 'Someone commented on your Demon Slayer article' 
      },
      time: '2 jam lalu',
      isRead: true
    },
    {
      id: '4',
      type: 'system',
      title: { 
        id: 'Pembaruan Sistem', 
        en: 'System Update' 
      },
      message: { 
        id: 'Fitur dark mode telah diperbarui dengan tampilan baru', 
        en: 'Dark mode feature has been updated with new look' 
      },
      time: '1 hari lalu',
      isRead: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <HeartIcon className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <ChatBubbleLeftIcon className="w-5 h-5 text-blue-500" />;
      case 'follow':
        return <UserPlusIcon className="w-5 h-5 text-green-500" />;
      case 'article':
        return <FireIcon className="w-5 h-5 text-orange-500" />;
      case 'system':
        return <BellIcon className="w-5 h-5 text-primary" />;
      default:
        return <BellIcon className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );

    // Navigate if there's an action URL
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      onClose();
    }
  };

  // Toggle read/unread status
  const toggleReadStatus = (notificationId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: !n.isRead } : n
      )
    );
  };

  const toggleAllReadStatus = () => {
    const hasUnread = notifications.some(n => !n.isRead);
    if (hasUnread) {
      // Mark all as read
      setNotifications(prev => 
        prev.map(n => ({ ...n, isRead: true }))
      );
    } else {
      // Mark all as unread
      setNotifications(prev => 
        prev.map(n => ({ ...n, isRead: false }))
      );
    }
  };

  const clearNotification = (notificationId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="fixed top-16 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]">
        <Card className="bg-card border shadow-xl max-h-[80vh] overflow-hidden">
          <CardHeader className="pb-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BellIcon className="w-5 h-5 text-primary" />
                <h3 className="font-medium text-base">
                  {language === 'id' ? 'Notifikasi' : 'Notifications'}
                </h3>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAllReadStatus}
                className="text-xs"
              >
                {unreadCount > 0 
                  ? (language === 'id' ? 'Tandai Semua Sudah Dibaca' : 'Mark All Read')
                  : (language === 'id' ? 'Tandai Semua Belum Dibaca' : 'Mark All Unread')
                }
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="space-y-0">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`
                        p-4 border-b border-border last:border-b-0 cursor-pointer transition-colors group
                        ${notification.isRead 
                          ? 'bg-background hover:bg-muted/30' 
                          : 'bg-primary/5 hover:bg-primary/10'
                        }
                      `}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title[language]}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
                            {notification.message[language]}
                          </p>
                          
                          <p className="text-xs text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {/* Toggle Read/Unread */}
                          <button
                            onClick={(e) => toggleReadStatus(notification.id, e)}
                            className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                            title={notification.isRead 
                              ? (language === 'id' ? 'Tandai belum dibaca' : 'Mark as unread')
                              : (language === 'id' ? 'Tandai sudah dibaca' : 'Mark as read')
                            }
                          >
                            {notification.isRead ? (
                              <BellIcon className="w-4 h-4" />
                            ) : (
                              <CheckIcon className="w-4 h-4" />
                            )}
                          </button>
                          
                          <button
                            onClick={(e) => clearNotification(notification.id, e)}
                            className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-destructive"
                            title={language === 'id' ? 'Hapus notifikasi' : 'Clear notification'}
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <BellIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <h4 className="font-medium mb-1">
                    {language === 'id' ? 'Tidak Ada Notifikasi' : 'No Notifications'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === 'id' 
                      ? 'Anda akan menerima notifikasi di sini'
                      : 'You will receive notifications here'
                    }
                  </p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    navigate('/notifications');
                    onClose();
                  }}
                >
                  {language === 'id' ? 'Lihat Semua Notifikasi' : 'View All Notifications'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// Main System Notification Popup Component (for newsletter, toast, alert)
export function NotificationPopup({ 
  toastNotifications, 
  newsletterNotification, 
  alertNotification,
  onRemoveToast,
  onCloseNewsletter,
  onCloseAlert
}: SystemNotificationPopupProps) {
  const { language } = useLanguage();

  return (
    <>
      {/* Toast Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
        {toastNotifications.map((toast) => (
          <Card key={toast.id} className="bg-card border shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  toast.type === 'success' ? 'bg-green-500' :
                  toast.type === 'error' ? 'bg-red-500' :
                  toast.type === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{toast.title}</h4>
                  <p className="text-sm text-muted-foreground">{toast.message}</p>
                </div>
                <button
                  onClick={() => onRemoveToast(toast.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Newsletter Notification Popup - Enhanced Design */}
      {newsletterNotification && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
            onClick={onCloseNewsletter}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
            <Card className="bg-gradient-to-br from-card via-card to-card/95 border-2 border-primary/20 shadow-2xl max-w-md w-full transform scale-100 animate-in zoom-in-95 duration-300">
              {/* Success Header with Animation */}
              <CardHeader className="text-center pb-2 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-green-500/5 to-primary/10 rounded-t-lg"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                
                {/* Animated Success Icon */}
                <div className="relative mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-ping opacity-20"></div>
                  <EnvelopeIcon className="w-8 h-8 text-white relative z-10" />
                  {/* Checkmark overlay */}
                  <div className="absolute top-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-primary bg-clip-text text-transparent">
                  {newsletterNotification.title}
                </h3>
                
                {/* Success indicator */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {language === 'id' ? 'Berhasil!' : 'Success!'}
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </CardHeader>
              
              <CardContent className="text-center space-y-6 relative">
                {/* Main Message */}
                <div className="space-y-3">
                  <p className="text-lg leading-relaxed">
                    {newsletterNotification.message}
                  </p>
                  
                  {/* Extra engaging content */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <FireIcon className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-primary">
                        {language === 'id' ? 'Yang Anda Dapatkan:' : 'What You Get:'}
                      </span>
                    </div>
                    <div className="text-sm space-y-1 text-left">
                      <div className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{language === 'id' ? 'Update anime & manga terbaru' : 'Latest anime & manga updates'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{language === 'id' ? 'Review eksklusif dari tim editor' : 'Exclusive reviews from editor team'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{language === 'id' ? 'Rekomendasi personal sesuai selera' : 'Personal recommendations based on taste'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  {newsletterNotification.action && (
                    <Button 
                      onClick={newsletterNotification.action.onClick}
                      className="w-full bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white font-semibold py-3 text-base shadow-lg transform transition-all hover:scale-105"
                    >
                      <EnvelopeIcon className="w-5 h-5 mr-2" />
                      {newsletterNotification.action.label}
                    </Button>
                  )}
                  
                  <Button 
                    onClick={onCloseNewsletter} 
                    variant="ghost"
                    className="w-full text-muted-foreground hover:text-primary"
                  >
                    {language === 'id' ? 'Tutup' : 'Close'}
                  </Button>
                </div>
                
                {/* Footer note */}
                <p className="text-xs text-muted-foreground">
                  {language === 'id' 
                    ? '📧 Email konfirmasi telah dikirim. Periksa inbox Anda!'
                    : '📧 Confirmation email sent. Check your inbox!'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Alert Notification Popup */}
      {alertNotification && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onCloseAlert}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Card className="bg-card border shadow-xl max-w-md w-full">
              <CardHeader className="text-center">
                <div className={`mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center ${
                  alertNotification.type === 'success' ? 'bg-green-100 dark:bg-green-900' :
                  alertNotification.type === 'error' ? 'bg-red-100 dark:bg-red-900' :
                  alertNotification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900' :
                  'bg-blue-100 dark:bg-blue-900'
                }`}>
                  <BellIcon className={`w-6 h-6 ${
                    alertNotification.type === 'success' ? 'text-green-600 dark:text-green-400' :
                    alertNotification.type === 'error' ? 'text-red-600 dark:text-red-400' :
                    alertNotification.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-blue-600 dark:text-blue-400'
                  }`} />
                </div>
                <h3 className="text-xl font-semibold">{alertNotification.title}</h3>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  {alertNotification.message}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={onCloseAlert} variant="outline">
                    {language === 'id' ? 'Tutup' : 'Close'}
                  </Button>
                  {alertNotification.action && (
                    <Button onClick={alertNotification.action.onClick}>
                      {alertNotification.action.label}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
}

// Default export for the system notifications
export default NotificationPopup;