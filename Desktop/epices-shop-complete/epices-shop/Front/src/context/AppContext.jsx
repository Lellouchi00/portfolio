import { createContext, useContext, useState, useCallback } from "react";
import { PRODUCTS, SUPPLIERS, ORDERS, EXPENSES } from "../data/mockData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [products, setProducts] = useState(PRODUCTS);
  const [suppliers] = useState(SUPPLIERS);
  const [orders, setOrders] = useState(ORDERS);
  const [expenses] = useState(EXPENSES);
  const [cart, setCart] = useState([]);
  const [language, setLanguage] = useState("en");
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const addToCart = useCallback((product, qty) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) return prev.map(i => i.productId === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { productId: product.id, product, qty, price: product.price }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(i => i.productId !== productId));
  }, []);

  const updateCartQty = useCallback((productId, qty) => {
    if (qty <= 0) { removeFromCart(productId); return; }
    setCart(prev => prev.map(i => i.productId === productId ? { ...i, qty } : i));
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  const submitOrder = useCallback(() => {
    if (cart.length === 0) return null;
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const tax = Math.round(subtotal * 0.19);
    const total = subtotal + tax;
    const orderId = `TRX-${Math.floor(Math.random() * 90000 + 900000)}`;
    const newOrder = {
      id: orderId, date: new Date().toISOString().split("T")[0],
      cashier: "Ahmed Ben",
      items: cart.map(i => ({ productId: i.productId, qty: i.qty, price: i.price })),
      total, tax, status: "completed", paymentMethod: "cash"
    };
    setOrders(prev => [newOrder, ...prev]);
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(i => i.productId === p.id);
      if (cartItem) return { ...p, stock: Math.max(0, p.stock - cartItem.qty) };
      return p;
    }));
    clearCart();
    return newOrder;
  }, [cart, clearCart]);

  const updateProduct = useCallback((id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showNotification("Product updated successfully");
  }, [showNotification]);

  const addProduct = useCallback((product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts(prev => [...prev, newProduct]);
    showNotification("Product added successfully");
  }, [showNotification]);

  const totalSalesToday = orders
    .filter(o => o.date === new Date().toISOString().split("T")[0] || o.date === "2024-05-14")
    .reduce((s, o) => s + o.total, 0) || 124500;

  const totalProfit = orders.reduce((s, o) => {
    const cost = o.items.reduce((cs, i) => {
      const p = products.find(pr => pr.id === i.productId);
      return cs + (p ? p.purchasePrice * i.qty : 0);
    }, 0);
    return s + (o.total - cost - o.tax);
  }, 0) || 32400;

  const totalDebt = suppliers.reduce((s, sup) => s + sup.debt, 0);

  return (
    <AppContext.Provider value={{
      products, suppliers, orders, expenses, cart,
      language, setLanguage,
      notification, showNotification,
      addToCart, removeFromCart, updateCartQty, clearCart, submitOrder,
      updateProduct, addProduct,
      totalSalesToday, totalProfit, totalDebt,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
