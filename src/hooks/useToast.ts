import { useState, useCallback } from 'react';
import { Toast } from '../components/ToastContainer';

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, duration?: number) => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { id, message, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return {
    toasts,
    addToast,
    removeToast
  };
};
