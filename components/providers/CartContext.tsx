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
      icon: "🛒",
    });
  };

  const toggleWishlist = () => {
    setIsFavorite((prev) => {
      const next = !prev;
      localStorage.setItem("helicorp_fav_status", next.toString());
      if (next) {
        toast("Đã lưu AirPods Pro 3 vào danh sách yêu thích!", {
          icon: "❤️",
        });
      } else {
        toast("Đã bỏ yêu thích AirPods Pro 3.", {
          icon: "🤍",
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
