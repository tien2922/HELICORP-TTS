"use client";
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

interface CartContextType {
  cartCount: number;
  isFavorite: boolean;
  recentlyViewed: string[];
  addToCart: (qty?: number) => void;
  setCartCount: (qty: number) => void;
  toggleWishlist: () => void;
  logViewProduct: (productName: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCountState] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  // Hydrate states from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("helicorp_cart_count");
      const savedFav = localStorage.getItem("helicorp_fav_status");
      const savedViews = localStorage.getItem("helicorp_recent_views");

      if (savedCart) setCartCountState(parseInt(savedCart, 10));
      if (savedFav) setIsFavorite(savedFav === "true");
      if (savedViews) setRecentlyViewed(JSON.parse(savedViews));
    } catch (e) {
      console.error("Error hydrating localStorage", e);
    }
  }, []);

  const setCartCount = (qty: number) => {
    setCartCountState(qty);
    localStorage.setItem("helicorp_cart_count", qty.toString());
  };

  const addToCart = (qty = 1) => {
    setCartCountState((prev) => {
      const next = prev + qty;
      localStorage.setItem("helicorp_cart_count", next.toString());
      return next;
    });
    toast("Đã thêm AirPods Pro 3 vào giỏ hàng!", {
      icon: (
        <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "none", stroke: "#10b981", strokeWidth: 2 }}>
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
        </svg>
      ),
    });
  };

  const toggleWishlist = () => {
    setIsFavorite((prev) => {
      const next = !prev;
      localStorage.setItem("helicorp_fav_status", next.toString());
      if (next) {
        toast("Đã thêm AirPods Pro 3 vào yêu thích!", {
          icon: (
            <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "#ef4444", stroke: "#ef4444", strokeWidth: 2 }}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ),
        });
      } else {
        toast("Đã bỏ yêu thích AirPods Pro 3.", {
          icon: (
            <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "none", stroke: "rgba(255,255,255,0.4)", strokeWidth: 2 }}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ),
        });
      }
      return next;
    });
  };

  const logViewProduct = (productName: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p !== productName);
      const next = [productName, ...filtered].slice(0, 5); // Keep last 5 viewed items
      localStorage.setItem("helicorp_recent_views", JSON.stringify(next));
      return next;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        isFavorite,
        recentlyViewed,
        addToCart,
        setCartCount,
        toggleWishlist,
        logViewProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
