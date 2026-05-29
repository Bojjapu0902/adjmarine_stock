// =====================================================
//  FoodStock Pro — Mock Data Layer
// =====================================================

// ── Inventory Items ──────────────────────────────────
export const inventoryItems = [
  { id: 'INV-001', name: 'Basmati Rice',       category: 'Grains',      unit: 'kg',  currentStock: 450,  minStock: 100, maxStock: 600, unitCost: 1.80, location: 'Warehouse A', expiryDate: '2026-12-01', supplier: 'AgroSource Ltd',   status: 'In Stock' },
  { id: 'INV-002', name: 'Olive Oil (Extra)',   category: 'Oils & Fats', unit: 'L',   currentStock: 38,   minStock: 50,  maxStock: 200, unitCost: 8.50, location: 'Cold Room 1',  expiryDate: '2026-09-15', supplier: 'MedOil Imports',   status: 'Low Stock' },
  { id: 'INV-003', name: 'Chicken Breast',      category: 'Meat',        unit: 'kg',  currentStock: 120,  minStock: 80,  maxStock: 250, unitCost: 5.20, location: 'Freezer 1',   expiryDate: '2026-06-10', supplier: 'Prime Poultry Co', status: 'In Stock' },
  { id: 'INV-004', name: 'Roma Tomatoes',       category: 'Produce',     unit: 'kg',  currentStock: 22,   minStock: 30,  maxStock: 120, unitCost: 1.20, location: 'Cold Room 2',  expiryDate: '2026-06-05', supplier: 'Fresh Fields',     status: 'Low Stock' },
  { id: 'INV-005', name: 'All-Purpose Flour',   category: 'Baking',      unit: 'kg',  currentStock: 310,  minStock: 150, maxStock: 500, unitCost: 0.75, location: 'Warehouse B', expiryDate: '2027-03-20', supplier: 'Miller & Sons',    status: 'In Stock' },
  { id: 'INV-006', name: 'Atlantic Salmon',     category: 'Seafood',     unit: 'kg',  currentStock: 0,    minStock: 20,  maxStock: 80,  unitCost: 12.00,location: 'Freezer 2',   expiryDate: '2026-07-01', supplier: 'Ocean Fresh Ltd',  status: 'Out of Stock' },
  { id: 'INV-007', name: 'Whole Milk',          category: 'Dairy',       unit: 'L',   currentStock: 180,  minStock: 100, maxStock: 400, unitCost: 0.95, location: 'Refrigerator A', expiryDate: '2026-06-08', supplier: 'DairyBest Co',  status: 'In Stock' },
  { id: 'INV-008', name: 'Cheddar Cheese',      category: 'Dairy',       unit: 'kg',  currentStock: 14,   minStock: 15,  maxStock: 60,  unitCost: 7.30, location: 'Cold Room 1',  expiryDate: '2026-08-25', supplier: 'DairyBest Co',     status: 'Low Stock' },
  { id: 'INV-009', name: 'Black Pepper',        category: 'Spices',      unit: 'kg',  currentStock: 8.5,  minStock: 5,   maxStock: 25,  unitCost: 15.00,location: 'Dry Store',    expiryDate: '2027-01-10', supplier: 'SpiceWorld',       status: 'In Stock' },
  { id: 'INV-010', name: 'Cooking Sugar',       category: 'Baking',      unit: 'kg',  currentStock: 200,  minStock: 80,  maxStock: 400, unitCost: 0.65, location: 'Warehouse B', expiryDate: '2028-06-01', supplier: 'SweetSupply',      status: 'In Stock' },
  { id: 'INV-011', name: 'Beef Tenderloin',     category: 'Meat',        unit: 'kg',  currentStock: 45,   minStock: 30,  maxStock: 120, unitCost: 22.00,location: 'Freezer 1',   expiryDate: '2026-06-12', supplier: 'Prime Cuts Inc',   status: 'In Stock' },
  { id: 'INV-012', name: 'Broccoli Crowns',     category: 'Produce',     unit: 'kg',  currentStock: 8,    minStock: 20,  maxStock: 80,  unitCost: 2.10, location: 'Cold Room 2',  expiryDate: '2026-06-04', supplier: 'Fresh Fields',     status: 'Low Stock' },
  { id: 'INV-013', name: 'Canola Oil',          category: 'Oils & Fats', unit: 'L',   currentStock: 95,   minStock: 40,  maxStock: 200, unitCost: 2.40, location: 'Dry Store',    expiryDate: '2027-04-30', supplier: 'NaturOil',         status: 'In Stock' },
  { id: 'INV-014', name: 'Eggs (Large)',        category: 'Dairy',       unit: 'doz', currentStock: 72,   minStock: 50,  maxStock: 200, unitCost: 3.20, location: 'Refrigerator A', expiryDate: '2026-06-20', supplier: 'FarmFresh Eggs', status: 'In Stock' },
  { id: 'INV-015', name: 'Pasta (Penne)',       category: 'Grains',      unit: 'kg',  currentStock: 130,  minStock: 60,  maxStock: 300, unitCost: 1.10, location: 'Dry Store',    expiryDate: '2027-09-15', supplier: 'Italian Imports',  status: 'In Stock' },
  { id: 'INV-016', name: 'Garlic (Fresh)',      category: 'Produce',     unit: 'kg',  currentStock: 6,    minStock: 10,  maxStock: 40,  unitCost: 3.50, location: 'Cold Room 2',  expiryDate: '2026-06-30', supplier: 'Fresh Fields',     status: 'Low Stock' },
  { id: 'INV-017', name: 'Soy Sauce',           category: 'Condiments',  unit: 'L',   currentStock: 28,   minStock: 10,  maxStock: 60,  unitCost: 3.80, location: 'Dry Store',    expiryDate: '2027-11-01', supplier: 'Asian Foods Co',   status: 'In Stock' },
  { id: 'INV-018', name: 'Heavy Cream',         category: 'Dairy',       unit: 'L',   currentStock: 42,   minStock: 20,  maxStock: 100, unitCost: 4.20, location: 'Refrigerator A', expiryDate: '2026-06-15', supplier: 'DairyBest Co',  status: 'In Stock' },
  { id: 'INV-019', name: 'Cumin Seeds',         category: 'Spices',      unit: 'kg',  currentStock: 4.2,  minStock: 2,   maxStock: 15,  unitCost: 9.50, location: 'Dry Store',    expiryDate: '2027-02-18', supplier: 'SpiceWorld',       status: 'In Stock' },
  { id: 'INV-020', name: 'Shrimp (Frozen)',     category: 'Seafood',     unit: 'kg',  currentStock: 55,   minStock: 25,  maxStock: 100, unitCost: 9.80, location: 'Freezer 2',   expiryDate: '2026-12-20', supplier: 'Ocean Fresh Ltd',  status: 'In Stock' },
];

// ── Categories ───────────────────────────────────────
export const categories = [
  'All Categories', 'Grains', 'Oils & Fats', 'Meat', 'Produce',
  'Baking', 'Seafood', 'Dairy', 'Spices', 'Condiments'
];

// ── Suppliers ────────────────────────────────────────
export const suppliers = [
  { id: 'SUP-001', name: 'AgroSource Ltd',    category: 'Grains & Cereals',  contact: 'James Patel',   email: 'james@agrosource.com',   phone: '+1-800-555-0101', city: 'Chicago',   country: 'USA',    rating: 4.8, totalOrders: 48, totalSpend: 86400, status: 'Active',   since: '2021-03-15', paymentTerms: 'Net 30' },
  { id: 'SUP-002', name: 'MedOil Imports',    category: 'Oils & Fats',       contact: 'Sofia Greco',   email: 'sofia@medoil.com',       phone: '+1-800-555-0202', city: 'Miami',     country: 'USA',    rating: 4.5, totalOrders: 31, totalSpend: 52000, status: 'Active',   since: '2022-01-10', paymentTerms: 'Net 15' },
  { id: 'SUP-003', name: 'Prime Poultry Co',  category: 'Meat & Poultry',    contact: 'Bob Sharma',    email: 'bob@primepoultry.com',   phone: '+1-800-555-0303', city: 'Dallas',    country: 'USA',    rating: 4.7, totalOrders: 62, totalSpend: 128000,status: 'Active',   since: '2020-08-22', paymentTerms: 'Net 30' },
  { id: 'SUP-004', name: 'Fresh Fields',      category: 'Fresh Produce',     contact: 'Lisa Kim',      email: 'lisa@freshfields.com',   phone: '+1-800-555-0404', city: 'Los Angeles', country: 'USA', rating: 4.2, totalOrders: 95, totalSpend: 34500, status: 'Active',   since: '2021-06-05', paymentTerms: 'Net 7' },
  { id: 'SUP-005', name: 'Miller & Sons',     category: 'Baking & Flour',    contact: 'Tom Miller',    email: 'tom@millersons.com',     phone: '+1-800-555-0505', city: 'Minneapolis','country': 'USA', rating: 4.6, totalOrders: 29, totalSpend: 42000, status: 'Active',   since: '2022-03-18', paymentTerms: 'Net 30' },
  { id: 'SUP-006', name: 'Ocean Fresh Ltd',   category: 'Seafood',           contact: 'Anna Chen',     email: 'anna@oceanfresh.com',    phone: '+1-800-555-0606', city: 'Seattle',   country: 'USA',    rating: 3.9, totalOrders: 18, totalSpend: 68000, status: 'On Hold',  since: '2023-01-30', paymentTerms: 'Net 14' },
  { id: 'SUP-007', name: 'DairyBest Co',      category: 'Dairy Products',    contact: 'Mark Johnson',  email: 'mark@dairybest.com',     phone: '+1-800-555-0707', city: 'Denver',    country: 'USA',    rating: 4.9, totalOrders: 84, totalSpend: 95000, status: 'Active',   since: '2020-05-14', paymentTerms: 'Net 21' },
  { id: 'SUP-008', name: 'SpiceWorld',        category: 'Spices & Herbs',    contact: 'Raj Nair',      email: 'raj@spiceworld.com',     phone: '+1-800-555-0808', city: 'New York',  country: 'USA',    rating: 4.4, totalOrders: 22, totalSpend: 15600, status: 'Active',   since: '2022-09-01', paymentTerms: 'Net 30' },
  { id: 'SUP-009', name: 'Italian Imports',   category: 'Pasta & Grains',    contact: 'Lucia Rossi',   email: 'lucia@italianimports.com',phone: '+1-800-555-0909', city: 'Boston',    country: 'USA',    rating: 4.7, totalOrders: 38, totalSpend: 28000, status: 'Active',   since: '2021-11-20', paymentTerms: 'Net 30' },
  { id: 'SUP-010', name: 'Asian Foods Co',    category: 'Asian Pantry',      contact: 'Wei Zhang',     email: 'wei@asianfoods.com',     phone: '+1-800-555-1010', city: 'San Francisco','country': 'USA', rating: 4.3, totalOrders: 27, totalSpend: 19800, status: 'Inactive', since: '2022-07-12', paymentTerms: 'Net 15' },
];

// ── Purchase Orders ──────────────────────────────────
export const purchaseOrders = [
  { id: 'PO-2024-001', supplier: 'AgroSource Ltd',   date: '2026-05-20', deliveryDate: '2026-05-28', items: 4, totalValue: 2340.00, status: 'Delivered',  paymentStatus: 'Paid',    notes: 'Monthly grain restock' },
  { id: 'PO-2024-002', supplier: 'Prime Poultry Co', date: '2026-05-22', deliveryDate: '2026-05-26', items: 2, totalValue: 1560.00, status: 'Delivered',  paymentStatus: 'Paid',    notes: 'Urgent poultry order' },
  { id: 'PO-2024-003', supplier: 'Fresh Fields',     date: '2026-05-24', deliveryDate: '2026-05-27', items: 6, totalValue: 480.00,  status: 'In Transit', paymentStatus: 'Pending', notes: 'Weekly produce delivery' },
  { id: 'PO-2024-004', supplier: 'DairyBest Co',     date: '2026-05-25', deliveryDate: '2026-05-29', items: 5, totalValue: 1120.00, status: 'Processing', paymentStatus: 'Pending', notes: 'Dairy restock for the week' },
  { id: 'PO-2024-005', supplier: 'Ocean Fresh Ltd',  date: '2026-05-26', deliveryDate: '2026-06-02', items: 3, totalValue: 2800.00, status: 'Approved',   paymentStatus: 'Pending', notes: 'Seafood order — confirm delivery window' },
  { id: 'PO-2024-006', supplier: 'MedOil Imports',   date: '2026-05-26', deliveryDate: '2026-06-05', items: 2, totalValue: 1700.00, status: 'Draft',      paymentStatus: 'Unpaid',  notes: 'Oil restock needed' },
  { id: 'PO-2024-007', supplier: 'Miller & Sons',    date: '2026-05-15', deliveryDate: '2026-05-20', items: 3, totalValue: 890.00,  status: 'Delivered',  paymentStatus: 'Paid',    notes: 'Flour and baking supplies' },
  { id: 'PO-2024-008', supplier: 'SpiceWorld',       date: '2026-05-18', deliveryDate: '2026-05-23', items: 8, totalValue: 540.00,  status: 'Delivered',  paymentStatus: 'Paid',    notes: 'Quarterly spice reorder' },
  { id: 'PO-2024-009', supplier: 'Italian Imports',  date: '2026-05-27', deliveryDate: '2026-06-04', items: 4, totalValue: 720.00,  status: 'Approved',   paymentStatus: 'Pending', notes: 'Pasta varieties for banquet menu' },
  { id: 'PO-2024-010', supplier: 'Prime Cuts Inc',   date: '2026-05-23', deliveryDate: '2026-05-30', items: 2, totalValue: 3300.00, status: 'In Transit', paymentStatus: 'Pending', notes: 'Premium beef for events' },
];

// ── Wastage Log ──────────────────────────────────────
export const wastageLog = [
  { id: 'WST-001', date: '2026-05-27', item: 'Roma Tomatoes',     category: 'Produce',  qty: 8.5,  unit: 'kg',  reason: 'Expired',          costImpact: 10.20, loggedBy: 'Chef Marco',    notes: 'Found during daily check' },
  { id: 'WST-002', date: '2026-05-27', item: 'Heavy Cream',       category: 'Dairy',    qty: 4.0,  unit: 'L',   reason: 'Expired',          costImpact: 16.80, loggedBy: 'Maria S.',      notes: 'Past use-by date' },
  { id: 'WST-003', date: '2026-05-26', item: 'Broccoli Crowns',   category: 'Produce',  qty: 6.0,  unit: 'kg',  reason: 'Spoilage',         costImpact: 12.60, loggedBy: 'Chef Marco',    notes: 'Temperature fluctuation' },
  { id: 'WST-004', date: '2026-05-26', item: 'Beef Tenderloin',   category: 'Meat',     qty: 2.5,  unit: 'kg',  reason: 'Over-preparation', costImpact: 55.00, loggedBy: 'John K.',       notes: 'Over-prep for private event' },
  { id: 'WST-005', date: '2026-05-25', item: 'Whole Milk',        category: 'Dairy',    qty: 10.0, unit: 'L',   reason: 'Expired',          costImpact: 9.50,  loggedBy: 'Maria S.',      notes: 'Small batch expired' },
  { id: 'WST-006', date: '2026-05-25', item: 'Cheddar Cheese',    category: 'Dairy',    qty: 1.2,  unit: 'kg',  reason: 'Mold',             costImpact: 8.76,  loggedBy: 'Chef Marco',    notes: 'Improper wrapping' },
  { id: 'WST-007', date: '2026-05-24', item: 'Chicken Breast',    category: 'Meat',     qty: 4.0,  unit: 'kg',  reason: 'Freezer burn',     costImpact: 20.80, loggedBy: 'John K.',       notes: 'Packaging issue' },
  { id: 'WST-008', date: '2026-05-24', item: 'All-Purpose Flour', category: 'Baking',   qty: 3.0,  unit: 'kg',  reason: 'Contamination',    costImpact: 2.25,  loggedBy: 'Maria S.',      notes: 'Insect found in bag' },
  { id: 'WST-009', date: '2026-05-23', item: 'Garlic (Fresh)',    category: 'Produce',  qty: 2.0,  unit: 'kg',  reason: 'Sprouted',         costImpact: 7.00,  loggedBy: 'Chef Marco',    notes: 'Stored too long' },
  { id: 'WST-010', date: '2026-05-22', item: 'Atlantic Salmon',   category: 'Seafood',  qty: 1.5,  unit: 'kg',  reason: 'Expired',          costImpact: 18.00, loggedBy: 'John K.',       notes: 'Delivery was delayed' },
  { id: 'WST-011', date: '2026-05-21', item: 'Pasta (Penne)',     category: 'Grains',   qty: 5.0,  unit: 'kg',  reason: 'Over-preparation', costImpact: 5.50,  loggedBy: 'Chef Marco',    notes: 'Banquet cancellation' },
  { id: 'WST-012', date: '2026-05-20', item: 'Roma Tomatoes',     category: 'Produce',  qty: 4.0,  unit: 'kg',  reason: 'Spoilage',         costImpact: 4.80,  loggedBy: 'Maria S.',      notes: 'Heat damage' },
];

// ── Dashboard KPI Data ───────────────────────────────
export const kpiData = {
  totalItems:       { value: 20,     trend: +3,   trendType: 'up',      label: 'Total Stock Items',      sub: 'vs last month' },
  lowStockAlerts:   { value: 5,      trend: -2,   trendType: 'down',    label: 'Low Stock Alerts',       sub: 'vs last week' },
  purchaseOrders:   { value: 10,     trend: +4,   trendType: 'up',      label: 'Purchase Orders (MTD)',  sub: 'vs last month' },
  wastageThisMonth: { value: '₹171', trend: -18,  trendType: 'down',    label: 'Wastage This Month',     sub: 'vs last month' },
  totalInventoryValue: { value: '₹48,260', trend: +6, trendType: 'up',  label: 'Total Inventory Value',  sub: 'vs last month' },
  activeSuppliers:  { value: 8,      trend: 0,    trendType: 'neutral', label: 'Active Suppliers',       sub: 'no change' },
};

// ── Stock Level Trend (Last 7 days) ──────────────────
export const stockTrendData = [
  { day: 'Mon', inStock: 14, lowStock: 4, outOfStock: 2 },
  { day: 'Tue', inStock: 15, lowStock: 3, outOfStock: 2 },
  { day: 'Wed', inStock: 13, lowStock: 5, outOfStock: 2 },
  { day: 'Thu', inStock: 16, lowStock: 3, outOfStock: 1 },
  { day: 'Fri', inStock: 14, lowStock: 4, outOfStock: 2 },
  { day: 'Sat', inStock: 12, lowStock: 6, outOfStock: 2 },
  { day: 'Sun', inStock: 13, lowStock: 5, outOfStock: 2 },
];

// ── Category Distribution ────────────────────────────
export const categoryDistribution = [
  { name: 'Dairy',       value: 4, color: '#4F46E5' },
  { name: 'Meat',        value: 3, color: '#10B981' },
  { name: 'Produce',     value: 4, color: '#F59E0B' },
  { name: 'Grains',      value: 3, color: '#3B82F6' },
  { name: 'Seafood',     value: 2, color: '#8B5CF6' },
  { name: 'Baking',      value: 2, color: '#EC4899' },
  { name: 'Spices',      value: 2, color: '#06B6D4' },
];

// ── Monthly Wastage Cost ─────────────────────────────
export const monthlyWastageCost = [
  { month: 'Dec', cost: 210 },
  { month: 'Jan', cost: 185 },
  { month: 'Feb', cost: 230 },
  { month: 'Mar', cost: 195 },
  { month: 'Apr', cost: 168 },
  { month: 'May', cost: 171 },
];

// ── Top Items by Value ───────────────────────────────
export const topItemsByValue = [
  { name: 'Beef Tenderloin', value: 990 },
  { name: 'Atlantic Salmon', value: 660 },
  { name: 'Shrimp (Frozen)', value: 539 },
  { name: 'Chicken Breast',  value: 624 },
  { name: 'Heavy Cream',     value: 176 },
];

// ── PO Status Summary ────────────────────────────────
export const poStatusSummary = [
  { status: 'Draft',      count: 1, color: '#94A3B8' },
  { status: 'Approved',   count: 2, color: '#4F46E5' },
  { status: 'In Transit', count: 2, color: '#3B82F6' },
  { status: 'Processing', count: 1, color: '#F59E0B' },
  { status: 'Delivered',  count: 4, color: '#10B981' },
];

// ── Recent Activity Feed ─────────────────────────────
export const recentActivity = [
  { id: 1, type: 'order',   icon: '📦', title: 'PO-2024-003 dispatched by Fresh Fields',         time: '2 hours ago',   color: '#E0E7FF', textColor: '#4F46E5' },
  { id: 2, type: 'alert',   icon: '⚠️', title: 'Olive Oil stock dropped below minimum threshold', time: '4 hours ago',   color: '#FFFBEB', textColor: '#D97706' },
  { id: 3, type: 'wastage', icon: '🗑️', title: 'Wastage logged: 8.5kg Roma Tomatoes (expired)',  time: '6 hours ago',   color: '#FEF2F2', textColor: '#DC2626' },
  { id: 4, type: 'order',   icon: '✅', title: 'PO-2024-002 delivered & confirmed by John K.',    time: 'Yesterday',     color: '#ECFDF5', textColor: '#059669' },
  { id: 5, type: 'supplier',icon: '🏭', title: 'Ocean Fresh Ltd moved to "On Hold" status',       time: 'Yesterday',     color: '#FEF2F2', textColor: '#DC2626' },
  { id: 6, type: 'stock',   icon: '📊', title: 'Atlantic Salmon restocked to 55kg by warehouse', time: '2 days ago',    color: '#ECFDF5', textColor: '#059669' },
];

// ── Wastage Reason Summary ───────────────────────────
export const wastageByReason = [
  { reason: 'Expired',          count: 5, cost: 54.50 },
  { reason: 'Spoilage',         count: 2, cost: 17.40 },
  { reason: 'Over-preparation', count: 2, cost: 60.50 },
  { reason: 'Freezer burn',     count: 1, cost: 20.80 },
  { reason: 'Contamination',    count: 1, cost: 2.25  },
  { reason: 'Mold',             count: 1, cost: 8.76  },
];

// ── Wastage by Category ──────────────────────────────
export const wastageByCategory = [
  { category: 'Dairy',   cost: 35.06 },
  { category: 'Produce', cost: 34.60 },
  { category: 'Meat',    cost: 75.80 },
  { category: 'Seafood', cost: 18.00 },
  { category: 'Baking',  cost: 7.75  },
  { category: 'Grains',  cost: 5.50  },
];

// ── Utilities ────────────────────────────────────────
export const getStockStatus = (current, min, max) => {
  if (current === 0) return { label: 'Out of Stock', type: 'danger' };
  if (current <= min) return { label: 'Low Stock',   type: 'warning' };
  if (current >= max * 0.9) return { label: 'Overstocked', type: 'info' };
  return { label: 'In Stock', type: 'success' };
};

export const getStockPercent = (current, max) => Math.min(Math.round((current / max) * 100), 100);

export const getStockBarClass = (percent) => {
  if (percent === 0) return 'low';
  if (percent <= 25)  return 'low';
  if (percent <= 55)  return 'medium';
  return 'high';
};

export const getPOStatusType = (status) => {
  const map = {
    'Draft':      'neutral',
    'Approved':   'primary',
    'Processing': 'warning',
    'In Transit': 'info',
    'Delivered':  'success',
    'Cancelled':  'danger',
  };
  return map[status] || 'neutral';
};

export const getSupplierStatusType = (status) => {
  if (status === 'Active')   return 'success';
  if (status === 'On Hold')  return 'warning';
  if (status === 'Inactive') return 'danger';
  return 'neutral';
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value);

export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const getDaysUntilExpiry = (dateStr) => {
  const now  = new Date();
  const exp  = new Date(dateStr);
  const diff = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
  return diff;
};

/* ══════════════════════════════════════════════════════
   INVENTORY USAGE DATA — per-item daily consumption
   ══════════════════════════════════════════════════════ */
export const itemUsageData = {
  'INV-001': { dailyUsage: 18,  history: [15, 20, 18, 22, 17, 19, 16], peakDay: 'Thu', lastRestocked: '2026-05-01', restockQty: 200 },
  'INV-002': { dailyUsage: 4.5, history: [4,  5,  4,  6,  4,  5,  4 ], peakDay: 'Thu', lastRestocked: '2026-04-20', restockQty: 50  },
  'INV-003': { dailyUsage: 12,  history: [10, 13, 12, 14, 11, 12, 10], peakDay: 'Thu', lastRestocked: '2026-05-10', restockQty: 80  },
  'INV-004': { dailyUsage: 8,   history: [7,  9,  8,  10, 8,  7,  6 ], peakDay: 'Thu', lastRestocked: '2026-05-15', restockQty: 60  },
  'INV-005': { dailyUsage: 14,  history: [12, 15, 14, 16, 13, 14, 12], peakDay: 'Thu', lastRestocked: '2026-04-28', restockQty: 150 },
  'INV-006': { dailyUsage: 6,   history: [0,  0,  0,  0,  0,  0,  0 ], peakDay: 'N/A', lastRestocked: '2026-04-01', restockQty: 40  },
  'INV-007': { dailyUsage: 22,  history: [20, 24, 22, 25, 21, 22, 19], peakDay: 'Thu', lastRestocked: '2026-05-12', restockQty: 120 },
  'INV-008': { dailyUsage: 2.5, history: [2,  3,  2,  3,  2,  3,  2 ], peakDay: 'Thu', lastRestocked: '2026-05-05', restockQty: 20  },
  'INV-009': { dailyUsage: 0.4, history: [0.3,0.5,0.4,0.5,0.4,0.4,0.3], peakDay: 'Thu', lastRestocked: '2026-03-15', restockQty: 10 },
  'INV-010': { dailyUsage: 9,   history: [8,  10, 9,  11, 9,  8,  8 ], peakDay: 'Thu', lastRestocked: '2026-04-25', restockQty: 100 },
  'INV-011': { dailyUsage: 7,   history: [6,  8,  7,  9,  7,  6,  6 ], peakDay: 'Thu', lastRestocked: '2026-05-08', restockQty: 60  },
  'INV-012': { dailyUsage: 5,   history: [4,  6,  5,  7,  5,  4,  4 ], peakDay: 'Thu', lastRestocked: '2026-05-14', restockQty: 40  },
  'INV-013': { dailyUsage: 4,   history: [3,  5,  4,  5,  4,  4,  3 ], peakDay: 'Thu', lastRestocked: '2026-04-30', restockQty: 80  },
  'INV-014': { dailyUsage: 8,   history: [7,  9,  8,  10, 8,  7,  7 ], peakDay: 'Thu', lastRestocked: '2026-05-10', restockQty: 60  },
  'INV-015': { dailyUsage: 6,   history: [5,  7,  6,  8,  6,  5,  5 ], peakDay: 'Thu', lastRestocked: '2026-05-02', restockQty: 80  },
  'INV-016': { dailyUsage: 1.5, history: [1,  2,  1.5,2,  1,  1.5,1 ], peakDay: 'Thu', lastRestocked: '2026-05-12', restockQty: 15  },
  'INV-017': { dailyUsage: 1.2, history: [1,  1.5,1.2,1.5,1,  1.2,1 ], peakDay: 'Thu', lastRestocked: '2026-04-15', restockQty: 20  },
  'INV-018': { dailyUsage: 5,   history: [4,  6,  5,  6,  5,  4,  4 ], peakDay: 'Thu', lastRestocked: '2026-05-10', restockQty: 40  },
  'INV-019': { dailyUsage: 0.3, history: [0.2,0.4,0.3,0.4,0.3,0.3,0.2], peakDay: 'Thu', lastRestocked: '2026-03-20', restockQty: 8  },
  'INV-020': { dailyUsage: 8,   history: [7,  9,  8,  10, 8,  7,  7 ], peakDay: 'Thu', lastRestocked: '2026-05-05', restockQty: 50  },
};

/* ══════════════════════════════════════════════════════
   STOCK TRANSACTIONS — IN (received) & OUT (usage)
   ══════════════════════════════════════════════════════ */
export const stockTransactions = [
  // IN — received from supplier
  { id: 'TXN-001', date: '2026-05-29', itemId: 'INV-001', item: 'Basmati Rice',       category: 'Grains',      type: 'IN',  qty: 200,  unit: 'kg',  unitCost: 1.80,  totalCost: 360.00, supplier: 'AgroSource Ltd',   usageType: null,         loggedBy: 'John K.',   notes: 'Monthly grain restock' },
  { id: 'TXN-002', date: '2026-05-28', itemId: 'INV-003', item: 'Chicken Breast',     category: 'Meat',        type: 'IN',  qty: 80,   unit: 'kg',  unitCost: 5.20,  totalCost: 416.00, supplier: 'Prime Poultry Co', usageType: null,         loggedBy: 'Maria S.',  notes: 'Urgent poultry restock' },
  { id: 'TXN-003', date: '2026-05-27', itemId: 'INV-007', item: 'Whole Milk',         category: 'Dairy',       type: 'IN',  qty: 120,  unit: 'L',   unitCost: 0.95,  totalCost: 114.00, supplier: 'DairyBest Co',     usageType: null,         loggedBy: 'John K.',   notes: '' },
  { id: 'TXN-004', date: '2026-05-26', itemId: 'INV-005', item: 'All-Purpose Flour',  category: 'Baking',      type: 'IN',  qty: 150,  unit: 'kg',  unitCost: 0.75,  totalCost: 112.50, supplier: 'Miller & Sons',    usageType: null,         loggedBy: 'Chef Marco',notes: 'Quarterly baking stock' },
  { id: 'TXN-005', date: '2026-05-25', itemId: 'INV-020', item: 'Shrimp (Frozen)',    category: 'Seafood',     type: 'IN',  qty: 50,   unit: 'kg',  unitCost: 9.80,  totalCost: 490.00, supplier: 'Ocean Fresh Ltd',  usageType: null,         loggedBy: 'Maria S.',  notes: 'Banquet prep restock' },
  { id: 'TXN-006', date: '2026-05-24', itemId: 'INV-014', item: 'Eggs (Large)',       category: 'Dairy',       type: 'IN',  qty: 60,   unit: 'doz', unitCost: 3.20,  totalCost: 192.00, supplier: 'FarmFresh Eggs',   usageType: null,         loggedBy: 'John K.',   notes: '' },
  { id: 'TXN-007', date: '2026-05-23', itemId: 'INV-015', item: 'Pasta (Penne)',      category: 'Grains',      type: 'IN',  qty: 80,   unit: 'kg',  unitCost: 1.10,  totalCost: 88.00,  supplier: 'Italian Imports',  usageType: null,         loggedBy: 'Chef Marco',notes: 'Banquet menu pasta' },
  { id: 'TXN-008', date: '2026-05-22', itemId: 'INV-011', item: 'Beef Tenderloin',    category: 'Meat',        type: 'IN',  qty: 60,   unit: 'kg',  unitCost: 22.00, totalCost: 1320.00,supplier: 'Prime Cuts Inc',   usageType: null,         loggedBy: 'Maria S.',  notes: 'Premium event beef' },
  // OUT — kitchen usage / consumption
  { id: 'TXN-009', date: '2026-05-29', itemId: 'INV-001', item: 'Basmati Rice',       category: 'Grains',      type: 'OUT', qty: 18,   unit: 'kg',  unitCost: 1.80,  totalCost: 32.40,  supplier: null,               usageType: 'Kitchen Use',loggedBy: 'Chef Marco',notes: 'Dinner service' },
  { id: 'TXN-010', date: '2026-05-29', itemId: 'INV-007', item: 'Whole Milk',         category: 'Dairy',       type: 'OUT', qty: 22,   unit: 'L',   unitCost: 0.95,  totalCost: 20.90,  supplier: null,               usageType: 'Kitchen Use',loggedBy: 'Chef Marco',notes: 'Breakfast service' },
  { id: 'TXN-011', date: '2026-05-28', itemId: 'INV-003', item: 'Chicken Breast',     category: 'Meat',        type: 'OUT', qty: 14,   unit: 'kg',  unitCost: 5.20,  totalCost: 72.80,  supplier: null,               usageType: 'Event',      loggedBy: 'John K.',   notes: 'Private dinner event' },
  { id: 'TXN-012', date: '2026-05-28', itemId: 'INV-005', item: 'All-Purpose Flour',  category: 'Baking',      type: 'OUT', qty: 14,   unit: 'kg',  unitCost: 0.75,  totalCost: 10.50,  supplier: null,               usageType: 'Kitchen Use',loggedBy: 'Chef Marco',notes: 'Baking for the day' },
  { id: 'TXN-013', date: '2026-05-27', itemId: 'INV-011', item: 'Beef Tenderloin',    category: 'Meat',        type: 'OUT', qty: 7,    unit: 'kg',  unitCost: 22.00, totalCost: 154.00, supplier: null,               usageType: 'Event',      loggedBy: 'Chef Marco',notes: 'Gala dinner' },
  { id: 'TXN-014', date: '2026-05-27', itemId: 'INV-010', item: 'Cooking Sugar',      category: 'Baking',      type: 'OUT', qty: 9,    unit: 'kg',  unitCost: 0.65,  totalCost: 5.85,   supplier: null,               usageType: 'Kitchen Use',loggedBy: 'Maria S.',  notes: '' },
  { id: 'TXN-015', date: '2026-05-26', itemId: 'INV-014', item: 'Eggs (Large)',       category: 'Dairy',       type: 'OUT', qty: 8,    unit: 'doz', unitCost: 3.20,  totalCost: 25.60,  supplier: null,               usageType: 'Kitchen Use',loggedBy: 'Chef Marco',notes: 'Breakfast buffet' },
  { id: 'TXN-016', date: '2026-05-26', itemId: 'INV-009', item: 'Black Pepper',       category: 'Spices',      type: 'OUT', qty: 0.4,  unit: 'kg',  unitCost: 15.00, totalCost: 6.00,   supplier: null,               usageType: 'Kitchen Use',loggedBy: 'Chef Marco',notes: '' },
  { id: 'TXN-017', date: '2026-05-25', itemId: 'INV-015', item: 'Pasta (Penne)',      category: 'Grains',      type: 'OUT', qty: 6,    unit: 'kg',  unitCost: 1.10,  totalCost: 6.60,   supplier: null,               usageType: 'Kitchen Use',loggedBy: 'Maria S.',  notes: 'Lunch service' },
  { id: 'TXN-018', date: '2026-05-24', itemId: 'INV-018', item: 'Heavy Cream',        category: 'Dairy',       type: 'OUT', qty: 5,    unit: 'L',   unitCost: 4.20,  totalCost: 21.00,  supplier: null,               usageType: 'Daily Consumption', loggedBy: 'Chef Marco', notes: 'Sauce prep' },
  { id: 'TXN-019', date: '2026-05-24', itemId: 'INV-020', item: 'Shrimp (Frozen)',    category: 'Seafood',     type: 'OUT', qty: 8,    unit: 'kg',  unitCost: 9.80,  totalCost: 78.40,  supplier: null,               usageType: 'Event',      loggedBy: 'John K.',   notes: 'Seafood night' },
  { id: 'TXN-020', date: '2026-05-23', itemId: 'INV-013', item: 'Canola Oil',         category: 'Oils & Fats', type: 'OUT', qty: 4,    unit: 'L',   unitCost: 2.40,  totalCost: 9.60,   supplier: null,               usageType: 'Kitchen Use',loggedBy: 'Chef Marco',notes: 'Frying station' },
];

/* ══════════════════════════════════════════════════════
   getEnrichedItems — merges inventoryItems + itemUsageData
   ══════════════════════════════════════════════════════ */
export const getUrgencyType = (daysRemaining) => {
  if (daysRemaining <= 3)  return 'critical';
  if (daysRemaining <= 7)  return 'high';
  if (daysRemaining <= 14) return 'medium';
  return 'low';
};

export const getUrgencyLabel = (urgency, daysRemaining, currentStock) => {
  if (currentStock === 0)    return 'Out of Stock';
  if (urgency === 'critical') return `Critical — ${daysRemaining}d left`;
  if (urgency === 'high')     return `High — ${daysRemaining}d left`;
  if (urgency === 'medium')   return `Medium — ${daysRemaining}d left`;
  return 'Healthy';
};

export const getEnrichedItems = () =>
  inventoryItems.map((item) => {
    const usage        = itemUsageData[item.id] || {};
    const dailyUsage   = usage.dailyUsage  || 0;
    const history      = usage.history     || [0, 0, 0, 0, 0, 0, 0];
    const peakDay      = usage.peakDay     || 'N/A';
    const lastRestocked= usage.lastRestocked || 'N/A';
    const restockQty   = usage.restockQty  || 0;

    const daysRemaining  = dailyUsage > 0 ? Math.floor(item.currentStock / dailyUsage) : 999;
    const weeklyUsage    = +(dailyUsage * 7).toFixed(2);
    const monthlyUsage   = +(dailyUsage * 30).toFixed(2);
    const totalConsumed  = +(dailyUsage * 30).toFixed(2);
    const stockLeftPct   = Math.min(Math.round((item.currentStock / item.maxStock) * 100), 100);
    const consumedPct    = Math.min(Math.round((totalConsumed / (item.maxStock)) * 100), 100);
    const totalValue     = +(item.currentStock * item.unitCost).toFixed(2);
    const urgency        = getUrgencyType(daysRemaining);

    return {
      ...item,
      dailyUsage,
      weeklyUsage,
      monthlyUsage,
      totalConsumed,
      history,
      peakDay,
      lastRestocked,
      restockQty,
      daysRemaining,
      stockLeftPct,
      consumedPct,
      totalValue,
      urgency,
    };
  });
