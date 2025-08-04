import { useState } from "react";
import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar";
import { Footer } from "../components/Footer";
import { Breadcrumb } from "../components/Breadcrumb";
import { SEOHead } from "../components/SEOHead";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "../components/Router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  BellIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  UserPlusIcon,
  FireIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'system' | 'article';
  title: { id: string; en: string };
  message: { id: string; en: string };
  time: string;
  isRead: boolean;
  actionUrl?: string;
}

export default function NotificationsPage() {
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
      type: 'follow',
      title: { 
        id: 'Pengikut Baru', 
        en: 'New Follower' 
      },
      message: { 
        id: 'AnimeOtaku2024 mulai mengikuti Anda', 
        en: 'AnimeOtaku2024 started following you' 
      },
      time: '3 jam lalu',
      isRead: true
    },
    {
      id: '5',
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
    },
    {
      id: '6',
      type: 'article',
      title: { 
        id: 'Trending Article', 
        en: 'Trending Article' 
      },
      message: { 
        id: 'Artikel One Piece Anda masuk trending hari ini!', 
        en: 'Your One Piece article is trending today!' 
      },
      time: '2 hari lalu',
      isRead: false
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const readCount = notifications.filter(n => n.isRead).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <HeartIcon className="w-6 h-6 text-red-500" />;
      case 'comment':
        return <ChatBubbleLeftIcon className="w-6 h-6 text-blue-500" />;
      case 'follow':
        return <UserPlusIcon className="w-6 h-6 text-green-500" />;
      case 'article':
        return <FireIcon className="w-6 h-6 text-orange-500" />;
      case 'system':
        return <BellIcon className="w-6 h-6 text-primary" />;
      default:
        return <BellIcon className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'read') return notification.isRead;
    return true;
  });

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
    }
  };

  const toggleReadStatus = (notificationId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: !n.isRead } : n
      )
    );
  };

  const clearNotification = (notificationId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const clearAllRead = () => {
    setNotifications(prev => prev.filter(n => !n.isRead));
  };

  const seoData = {
    title: `${language === 'id' ? 'Notifikasi' : 'Notifications'} - Conime`,
    description: language === 'id' 
      ? 'Lihat semua notifikasi Anda di Conime. Update artikel terbaru, like, komentar, dan pengikut baru.'
      : 'View all your notifications on Conime. Latest article updates, likes, comments, and new followers.',
    keywords: 'notifications, notifikasi, updates, anime news',
    url: `https://conime.id${language === 'en' ? '/en' : ''}/notifications`
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      <div className="min-h-screen bg-background">
        <Header />
        <TimeBar />
        
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { 
                label: language === 'id' ? 'Notifikasi' : 'Notifications', 
                isActive: true 
              }
            ]} 
          />

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <BellIcon className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">
                {language === 'id' ? 'Notifikasi' : 'Notifications'}
              </h1>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-sm">
                  {unreadCount} {language === 'id' ? 'baru' : 'new'}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">
              {language === 'id' 
                ? 'Lihat semua notifikasi dan update terbaru dari aktivitas Anda'
                : 'View all notifications and latest updates from your activities'
              }
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              {language === 'id' ? 'Semua' : 'All'} ({notifications.length})
            </Button>
            <Button
              variant={filter === 'unread' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              {language === 'id' ? 'Belum Dibaca' : 'Unread'} ({unreadCount})
            </Button>
            <Button
              variant={filter === 'read' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('read')}
            >
              {language === 'id' ? 'Sudah Dibaca' : 'Read'} ({readCount})
            </Button>
          </div>

          {/* Action Buttons */}
          {notifications.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  {language === 'id' ? 'Tandai Semua Sudah Dibaca' : 'Mark All as Read'}
                </Button>
              )}
              {readCount > 0 && (
                <Button variant="outline" size="sm" onClick={clearAllRead}>
                  <TrashIcon className="w-4 h-4 mr-2" />
                  {language === 'id' ? 'Hapus Yang Sudah Dibaca' : 'Clear Read Notifications'}
                </Button>
              )}
            </div>
          )}

          {/* Notifications List */}
          <div className="space-y-2">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    notification.isRead 
                      ? 'bg-card' 
                      : 'bg-primary/5 border-primary/20'
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title[language]}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message[language]}
                        </p>
                        
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => toggleReadStatus(notification.id, e)}
                          className="p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
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
                          className="p-2 hover:bg-muted rounded text-muted-foreground hover:text-destructive"
                          title={language === 'id' ? 'Hapus notifikasi' : 'Clear notification'}
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <BellIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {filter === 'all' 
                      ? (language === 'id' ? 'Tidak Ada Notifikasi' : 'No Notifications')
                      : filter === 'unread'
                      ? (language === 'id' ? 'Tidak Ada Notifikasi Belum Dibaca' : 'No Unread Notifications')
                      : (language === 'id' ? 'Tidak Ada Notifikasi Sudah Dibaca' : 'No Read Notifications')
                    }
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {language === 'id' 
                      ? 'Anda akan menerima notifikasi untuk update artikel, like, komentar, dan aktivitas lainnya.'
                      : 'You will receive notifications for article updates, likes, comments, and other activities.'
                    }
                  </p>
                  <Button onClick={() => navigate('/')} variant="outline">
                    {language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}