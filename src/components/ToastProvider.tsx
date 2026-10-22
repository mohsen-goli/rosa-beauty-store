import { createContext, useContext, type ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";

interface ToastContextValue {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWishlist: (message: string) => void;
  showCart: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  function showSuccess(message: string): void {
    toast.success(message, {
      duration: 2200,
      position: "bottom-right",
      style: {
        background: "#fff",
        color: "#2d2926",
        border: "1px solid #f7e6e8",
        borderRadius: "999px",
        padding: "12px 20px",
        fontSize: "14px",
        fontWeight: 500,
        boxShadow: "0 10px 30px rgba(232, 160, 168, 0.25)",
      },
      iconTheme: {
        primary: "#e8a0a8",
        secondary: "#fff",
      },
    });
  }

  function showError(message: string): void {
    toast.error(message, {
      duration: 2200,
      position: "bottom-right",
      style: {
        background: "#fff",
        color: "#2d2926",
        border: "1px solid #f7e6e8",
        borderRadius: "999px",
        padding: "12px 20px",
        fontSize: "14px",
        fontWeight: 500,
      },
    });
  }

  function showWishlist(message: string): void {
    toast(message, {
      duration: 2200,
      position: "bottom-right",
      icon: "❤️",
      style: {
        background: "#fff",
        color: "#2d2926",
        border: "1px solid #f7e6e8",
        borderRadius: "999px",
        padding: "12px 20px",
        fontSize: "14px",
      },
    });
  }

  function showCart(message: string): void {
    toast(message, {
      duration: 2200,
      position: "bottom-right",
      icon: "🛒",
      style: {
        background: "#fff",
        color: "#2d2926",
        border: "1px solid #f7e6e8",
        borderRadius: "999px",
        padding: "12px 20px",
      },
    });
  }

  const contextValue: ToastContextValue = {
    showSuccess,
    showError,
    showWishlist,
    showCart,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      <Toaster
        position="bottom-right"
        containerStyle={{ zIndex: 9999 }}
        toastOptions={{ duration: 2200 }}
      />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast باید داخل ToastProvider استفاده شود.");
  }

  return context;
}
