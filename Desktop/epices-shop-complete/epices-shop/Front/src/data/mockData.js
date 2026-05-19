export const PRODUCTS = [
  { id: 1, name: "Harour (Red Chili)", nameAr: "حرور (فلفل أحمر)", category: "ground", price: 1200, purchasePrice: 800, stock: 15, unit: "kg", image: "🌶️", popular: true, lowStockThreshold: 10 },
  { id: 2, name: "Black Pepper", nameAr: "فلقل أسود", category: "whole", price: 2800, purchasePrice: 1900, stock: 25, unit: "kg", image: "⚫", popular: true, lowStockThreshold: 8 },
  { id: 3, name: "Ras El Hanout", nameAr: "رأس الحانوت", category: "mixes", price: 1500, purchasePrice: 900, stock: 22, unit: "kg", image: "🟤", popular: true, lowStockThreshold: 10 },
  { id: 4, name: "Cumin Powder", nameAr: "كمون بلدي", category: "ground", price: 2500, purchasePrice: 1600, stock: 8, unit: "kg", image: "🟡", popular: true, lowStockThreshold: 10 },
  { id: 5, name: "Saffron (Pure)", nameAr: "زعفران شعرة", category: "whole", price: 45000, purchasePrice: 32000, stock: 0.5, unit: "kg", image: "🟠", popular: true, lowStockThreshold: 1 },
  { id: 6, name: "Turmeric", nameAr: "كركم هندي", category: "ground", price: 950, purchasePrice: 600, stock: 30, unit: "kg", image: "🟡", popular: false, lowStockThreshold: 10 },
  { id: 7, name: "Cinnamon Sticks", nameAr: "قرفة أعواد", category: "whole", price: 2200, purchasePrice: 1400, stock: 4, unit: "kg", image: "🟫", popular: false, lowStockThreshold: 8 },
  { id: 8, name: "Paprika", nameAr: "باپريكا", category: "ground", price: 1100, purchasePrice: 700, stock: 18, unit: "kg", image: "🔴", popular: false, lowStockThreshold: 10 },
  { id: 9, name: "Cumin Seeds", nameAr: "كمون نقي", category: "whole", price: 2400, purchasePrice: 1500, stock: 3, unit: "kg", image: "🟤", popular: false, lowStockThreshold: 8 },
  { id: 10, name: "Ginger Powder", nameAr: "زنجبيل مطحون", category: "ground", price: 1800, purchasePrice: 1100, stock: 12, unit: "kg", image: "🟡", popular: false, lowStockThreshold: 8 },
  { id: 11, name: "Coriander Ground", nameAr: "كزبرة مطحونة", category: "ground", price: 900, purchasePrice: 560, stock: 20, unit: "kg", image: "🟢", popular: false, lowStockThreshold: 10 },
  { id: 12, name: "Mixed Spices", nameAr: "بهارات مشكلة", category: "mixes", price: 1800, purchasePrice: 1100, stock: 14, unit: "kg", image: "🌈", popular: false, lowStockThreshold: 8 },
];

export const SUPPLIERS = [
  { id: 1, name: "El Amine Spices", nameAr: "مستورد الأمين", contact: "+213 555 001", city: "Algiers", debt: 15800, lastDelivery: "2024-05-10" },
  { id: 2, name: "Sahara Herbs Co.", nameAr: "شركة صحراء للأعشاب", contact: "+213 555 002", city: "Oran", debt: 0, lastDelivery: "2024-05-08" },
  { id: 3, name: "Atlas Trading", nameAr: "مؤسسة أطلس للتجارة", contact: "+213 555 003", city: "Constantine", debt: 8200, lastDelivery: "2024-05-01" },
];

export const ORDERS = [
  { id: "TRX-994021", date: "2024-05-14", cashier: "Ahmed Ben", items: [{ productId: 1, qty: 2.5, price: 1200 }, { productId: 3, qty: 1.0, price: 2400 }, { productId: 3, qty: 3.5, price: 1500 }, { productId: 2, qty: 0.5, price: 3500 }], total: 14756, tax: 2356, status: "completed", paymentMethod: "cash" },
  { id: "TRX-994020", date: "2024-05-14", cashier: "Ahmed Ben", items: [{ productId: 4, qty: 1.0, price: 2500 }, { productId: 8, qty: 2.0, price: 1100 }], total: 5434, tax: 868, status: "completed", paymentMethod: "cash" },
  { id: "TRX-994019", date: "2024-05-14", cashier: "Ahmed Ben", items: [{ productId: 5, qty: 0.01, price: 45000 }], total: 535, tax: 85, status: "completed", paymentMethod: "cash" },
];

export const WEEKLY_SALES = [
  { day: "Sun", sales: 45000 },
  { day: "Mon", sales: 72000 },
  { day: "Tue", sales: 58000 },
  { day: "Wed", sales: 91000 },
  { day: "Thu", sales: 83000 },
  { day: "Fri", sales: 124500 },
  { day: "Sat", sales: 67000 },
];

export const EXPENSES = [
  { id: 1, type: "Rent", amount: 30000, month: "May 2024" },
  { id: 2, type: "Salaries", amount: 45000, month: "May 2024" },
  { id: 3, type: "Electricity", amount: 5200, month: "May 2024" },
  { id: 4, type: "Water", amount: 800, month: "May 2024" },
];
