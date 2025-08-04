import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { NotificationPopup } from './NotificationPopup';

// Toast notification interface
interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

// Newsletter notification interface
interface NewsletterAction {
  label: string;
  onClick: () => void;
}

interface NewsletterNotification {
  id: string;
  title: string;
  message: string;
  action?: NewsletterAction;
}

// Alert notification interface (custom styled alert replacement)
interface AlertNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Context interface
interface NotificationContextType {
  // Toast notifications
  showToast: (type: ToastNotification['type'], title: string, message: string, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  
  // Newsletter notifications (popup style)
  showNewsletter: (title: string, message: string, action?: NewsletterAction) => void;
  
  // Alert notifications (replaces browser alerts)
  showAlert: (type: AlertNotification['type'], title: string, message: string, action?: AlertNotification['action']) => void;
  
  // Notification state
  toastNotifications: ToastNotification[];
  newsletterNotification: NewsletterNotification | null;
  alertNotification: AlertNotification | null;
  
  // Control functions
  removeToast: (id: string) => void;
  closeNewsletter: () => void;
  closeAlert: () => void;
}

// Create context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider component
interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [toastNotifications, setToastNotifications] = useState<ToastNotification[]>([]);
  const [newsletterNotification, setNewsletterNotification] = useState<NewsletterNotification | null>(null);
  const [alertNotification, setAlertNotification] = useState<AlertNotification | null>(null);

  // Generate unique IDs
  const generateId = useCallback(() => {
    return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Toast notification functions
  const showToast = useCallback((
    type: ToastNotification['type'], 
    title: string, 
    message: string, 
    duration: number = 5000
  ) => {
    const id = generateId();
    const notification: ToastNotification = {
      id,
      type,
      title,
      message,
      duration
    };

    setToastNotifications(prev => [...prev, notification]);

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [generateId]);

  // Convenient toast methods
  const success = useCallback((message: string, duration?: number) => {
    showToast('success', 'Berhasil', message, duration);
  }, [showToast]);

  const error = useCallback((message: string, duration?: number) => {
    showToast('error', 'Error', message, duration);
  }, [showToast]);

  const warning = useCallback((message: string, duration?: number) => {
    showToast('warning', 'Peringatan', message, duration);
  }, [showToast]);

  const info = useCallback((message: string, duration?: number) => {
    showToast('info', 'Info', message, duration);
  }, [showToast]);

  // Newsletter notification
  const showNewsletter = useCallback((title: string, message: string, action?: NewsletterAction) => {
    const id = generateId();
    setNewsletterNotification({
      id,
      title,
      message,
      action
    });
  }, [generateId]);

  // Alert notification (replaces browser alert)
  const showAlert = useCallback((
    type: AlertNotification['type'], 
    title: string, 
    message: string, 
    action?: AlertNotification['action']
  ) => {
    const id = generateId();
    setAlertNotification({
      id,
      type,
      title,
      message,
      action
    });
  }, [generateId]);

  // Remove functions
  const removeToast = useCallback((id: string) => {
    setToastNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const closeNewsletter = useCallback(() => {
    setNewsletterNotification(null);
  }, []);

  const closeAlert = useCallback(() => {
    setAlertNotification(null);
  }, []);

  const value: NotificationContextType = {
    showToast,
    success,
    error,
    warning,
    info,
    showNewsletter,
    showAlert,
    toastNotifications,
    newsletterNotification,
    alertNotification,
    removeToast,
    closeNewsletter,
    closeAlert
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      {/* Render notifications */}
      <NotificationPopup 
        toastNotifications={toastNotifications}
        newsletterNotification={newsletterNotification}
        alertNotification={alertNotification}
        onRemoveToast={removeToast}
        onCloseNewsletter={closeNewsletter}
        onCloseAlert={closeAlert}
      />
    </NotificationContext.Provider>
  );
}

// Hook to use notifications
export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

// Hook alias for easier usage
export function useAlert() {
  const { success, error, warning, info, showAlert } = useNotification();
  return { success, error, warning, info, showAlert };
}

// Hook for newsletter-specific notifications
export function useNewsletter() {
  const { showNewsletter, closeNewsletter, newsletterNotification } = useNotification();
  return { showNewsletter, closeNewsletter, newsletterNotification };
}

// Export types for external use
export type { ToastNotification, NewsletterNotification, AlertNotification, NewsletterAction };