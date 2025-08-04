import * as React from "react";
import { CheckCircleIcon, XMarkIcon, ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { cn } from "./utils";

interface ToastProps {
  id?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ id, type = 'info', title, message, duration = 5000, onClose, className, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [isExiting, setIsExiting] = React.useState(false);

    React.useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [duration]);

    const handleClose = () => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    };

    if (!isVisible) return null;

    const getIcon = () => {
      switch (type) {
        case 'success':
          return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
        case 'error':
          return <XMarkIcon className="h-6 w-6 text-red-500" />;
        case 'warning':
          return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />;
        default:
          return <InformationCircleIcon className="h-6 w-6 text-blue-500" />;
      }
    };

    const getStyles = () => {
      switch (type) {
        case 'success':
          return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20';
        case 'error':
          return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20';
        case 'warning':
          return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20';
        default:
          return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-start space-x-3 rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out",
          getStyles(),
          isExiting ? "transform translate-x-full opacity-0" : "transform translate-x-0 opacity-100",
          className
        )}
        {...props}
      >
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="text-sm font-semibold text-foreground mb-1">
              {title}
            </h4>
          )}
          <p className="text-sm text-muted-foreground">
            {message}
          </p>
        </div>

        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          aria-label="Close notification"
        >
          <XMarkIcon className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    );
  }
);

Toast.displayName = "Toast";

// Toast Container for managing multiple toasts
interface ToastContainerProps {
  children: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const ToastContainer: React.FC<ToastContainerProps> = ({ 
  children, 
  position = 'top-right' 
}) => {
  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  return (
    <div className={cn(
      "fixed z-50 max-w-sm w-full space-y-2",
      getPositionStyles()
    )}>
      {children}
    </div>
  );
};

// Toast Hook for easy usage
interface ToastState {
  id: string;
  type: ToastProps['type'];
  title?: string;
  message: string;
  duration?: number;
}

const useToast = () => {
  const [toasts, setToasts] = React.useState<ToastState[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastState, 'id'>) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = React.useCallback((message: string, title?: string) => {
    addToast({ type: 'success', message, title });
  }, [addToast]);

  const showError = React.useCallback((message: string, title?: string) => {
    addToast({ type: 'error', message, title });
  }, [addToast]);

  const showWarning = React.useCallback((message: string, title?: string) => {
    addToast({ type: 'warning', message, title });
  }, [addToast]);

  const showInfo = React.useCallback((message: string, title?: string) => {
    addToast({ type: 'info', message, title });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};

// Professional Alert Dialog for confirmations
interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'info',
  confirmText = 'OK',
  cancelText = 'Batal',
  showCancel = true
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-12 w-12 text-green-500" />;
      case 'error':
        return <XMarkIcon className="h-12 w-12 text-red-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500" />;
      default:
        return <InformationCircleIcon className="h-12 w-12 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-background border rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Content */}
        <div className="p-6 text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            {getIcon()}
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-6">
            {message}
          </p>
          
          {/* Buttons */}
          <div className="flex space-x-3 justify-center">
            {showCancel && (
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-muted-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors"
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={() => {
                onConfirm?.();
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Toast, ToastContainer, useToast, AlertDialog };
export type { ToastProps, AlertDialogProps };