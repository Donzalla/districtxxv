import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems]       = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Add item — if same product + size exists, increment quantity
  const addItem = useCallback((product, size, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === size);
      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.size === size
            ? { ...i, quantity: Math.min(i.quantity + quantity, 10) }
            : i
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url || null,
        size,
        quantity,
      }];
    });
    setDrawerOpen(true);
  }, []);

  // Update quantity
  const updateQuantity = useCallback((id, size, quantity) => {
    if (quantity < 1) return;
    setItems(prev =>
      prev.map(i => i.id === id && i.size === size ? { ...i, quantity: Math.min(quantity, 10) } : i)
    );
  }, []);

  // Remove item
  const removeItem = useCallback((id, size) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size)));
  }, []);

  // Clear cart
  const clearCart = useCallback(() => setItems([]), []);

  const totalItems    = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal      = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, drawerOpen, setDrawerOpen,
      addItem, updateQuantity, removeItem, clearCart,
      totalItems, subtotal,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};