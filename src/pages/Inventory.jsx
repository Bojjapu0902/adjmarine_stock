import React, { useState, useMemo, useCallback } from 'react';
import {
  MdAdd, MdFileDownload, MdEdit, MdDelete, MdClose,
  MdRefresh, MdShoppingCart, MdTrendingDown, MdInventory2,
  MdLocationOn, MdCategory, MdCalendarToday, MdPerson,
  MdAttachMoney, MdShowChart, MdInfo, MdSystemUpdateAlt,
  MdCheckCircle,
} from 'react-icons/md';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import StatusBadge from '../components/common/StatusBadge';
import Modal       from '../components/common/Modal';
import {
  categories,
  getStockStatus, getStockPercent, getStockBarClass,
  formatCurrency, formatDate, getDaysUntilExpiry,
  getEnrichedItems, itemUsageData,
} from '../data/mockData';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const URGENCY_CONFIG = {
  critical: { icon: '🔴', label: 'Critical — Reorder Immediately', color: '#EF4444', bg: '#FEF2F2', border: 'rgba(239,68,68,0.2)'  },
  high:     { icon: '🟠', label: 'High — Reorder Soon',            color: '#F59E0B', bg: '#FFFBEB', border: 'rgba(245,158,11,0.2)'  },
  medium:   { icon: '🔵', label: 'Medium — Plan Reorder',          color: '#3B82F6', bg: '#EFF6FF', border: 'rgba(59,130,246,0.2)'  },
  low:      { icon: '🟢', label: 'Healthy Stock Level',            color: '#10B981', bg: '#ECFDF5', border: 'rgba(16,185,129,0.2)'  },
};

const INITIAL_FORM = {
  name: '', category: 'Grains', unit: 'kg',
  currentStock: '', minStock: '', maxStock: '', unitCost: '',
  location: '', expiryDate: '', supplier: '',
};

const STOCK_FORM_INIT = {
  itemId:   '',
  category: '',
  supplier: '',
  unit:     '',
  date:     new Date().toISOString().split('T')[0],
  quantity: '',
  rate:     '',
};

/* ── Inline Sparkline ─────────────────────────────────── */
const Sparkline = ({ data, unit, color = '#4F46E5' }) => {
  if (!data || data.length === 0) return null;
  const maxVal = Math.max(...data, 0.001);
  return (
    <div className="sparkline-row">
      {data.map((val, i) => (
        <div key={i} className="sparkline-bar-wrap">
          <div
            className="sparkline-bar"
            title={`${DAY_LABELS[i]}: ${val} ${unit}`}
            style={{
              height: `${Math.max((val / maxVal) * 44, 4)}px`,
              background: i === data.length - 1 ? color : `${color}55`,
            }}
          />
          <span className="sparkline-day">{DAY_LABELS[i]?.slice(0, 1)}</span>
        </div>
      ))}
    </div>
  );
};

/* ── Item Detail Drawer ───────────────────────────────── */
const ItemDrawer = ({ item, onClose, onEdit }) => {
  const [tab, setTab] = useState('overview');
  if (!item) return null;

  const usage         = itemUsageData[item.id] || {};
  const daysRemaining = item.dailyUsage > 0 ? Math.floor(item.currentStock / item.dailyUsage) : 999;
  const daysToExpiry  = getDaysUntilExpiry(item.expiryDate);
  const stockPct      = getStockPercent(item.currentStock, item.maxStock);
  const barClass      = getStockBarClass(stockPct);
  const urgConf       = URGENCY_CONFIG[item.urgency] || URGENCY_CONFIG.low;
  const { label: stockLabel, type: stockType } = getStockStatus(item.currentStock, item.minStock, item.maxStock);

  const weeklyData = (item.history || []).map((v, i) => ({ day: DAY_LABELS[i], consumed: v }));

  const miniKpis = [
    { label: 'Current Stock',  value: `${item.currentStock} ${item.unit}`, icon: '📦', accent: stockType === 'danger' ? '#EF4444' : stockType === 'warning' ? '#F59E0B' : '#10B981' },
    { label: 'Daily Usage',    value: `${item.dailyUsage} ${item.unit}`,   icon: '📊', accent: '#4F46E5' },
    { label: 'Days of Stock',  value: item.currentStock === 0 ? '0d' : daysRemaining >= 999 ? '∞' : `${daysRemaining}d`, icon: '⏱️', accent: daysRemaining <= 3 ? '#EF4444' : daysRemaining <= 7 ? '#F59E0B' : '#10B981' },
    { label: 'Stock Value',    value: formatCurrency(item.currentStock * item.unitCost), icon: '💰', accent: '#8B5CF6' },
  ];

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="item-drawer">

        {/* Header */}
        <div className="drawer-header">
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-pale)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, flexShrink: 0 }}>
                {item.name.charAt(0)}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>
                  {item.id} · {item.category}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <StatusBadge label={stockLabel} type={stockType} />
              <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: urgConf.bg, color: urgConf.color, border: `1px solid ${urgConf.border}` }}>
                {urgConf.icon} {item.urgency.charAt(0).toUpperCase() + item.urgency.slice(1)}
              </span>
            </div>
          </div>
          <button className="drawer-close-btn" onClick={onClose} title="Close"><MdClose /></button>
        </div>

        {/* Sub-tabs */}
        <div className="drawer-sub-tabs">
          {[{ key: 'overview', label: 'Overview' }, { key: 'usage', label: 'Usage' }, { key: 'details', label: 'Details' }].map((t) => (
            <button key={t.key} className={`drawer-sub-tab ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="drawer-body">

          {/* ══ OVERVIEW ══ */}
          {tab === 'overview' && (
            <>
              <div className="drawer-section">
                <div className="urgency-banner" style={{ background: urgConf.bg, color: urgConf.color, border: `1px solid ${urgConf.border}` }}>
                  <span style={{ fontSize: 20 }}>{urgConf.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{urgConf.label}</div>
                    <div style={{ fontSize: 11.5, opacity: 0.8, marginTop: 2 }}>
                      {item.currentStock === 0 ? 'Out of stock — reorder immediately' : `Stock lasts ${daysRemaining} more day${daysRemaining !== 1 ? 's' : ''} at current rate`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="drawer-section">
                <div className="drawer-section-title">Stock Overview</div>
                <div className="mini-kpi-grid">
                  {miniKpis.map((k) => (
                    <div key={k.label} className="mini-kpi" style={{ '--mini-kpi-accent': k.accent }}>
                      <div className="mini-kpi-icon">{k.icon}</div>
                      <div className="mini-kpi-value">{k.value}</div>
                      <div className="mini-kpi-label">{k.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="drawer-section">
                <div className="drawer-section-title">Stock Level</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{item.currentStock} {item.unit} remaining</span>
                  <span style={{ color: 'var(--text-muted)' }}>{stockPct}% of {item.maxStock} {item.unit}</span>
                </div>
                <div className="stock-bar-bg" style={{ height: 10, borderRadius: 8 }}>
                  <div className={`stock-bar-fill ${barClass}`} style={{ width: `${stockPct}%`, borderRadius: 8 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                  <span>Min: {item.minStock} {item.unit}</span>
                  <span>Reorder point</span>
                  <span>Max: {item.maxStock} {item.unit}</span>
                </div>
              </div>

              <div className="drawer-section">
                <div className="drawer-section-title">Consumed vs Remaining (30-day)</div>
                <div style={{ height: 22, borderRadius: 8, overflow: 'hidden', background: 'var(--border-color)', display: 'flex' }}>
                  <div style={{ width: `${Math.min(item.consumedPct, 100)}%`, background: 'linear-gradient(90deg,#EF4444,#F97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white' }}>
                    {item.consumedPct > 12 ? `${item.consumedPct}%` : ''}
                  </div>
                  <div style={{ flex: 1, background: 'linear-gradient(90deg,#10B981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white' }}>
                    {100 - item.consumedPct > 12 ? `${100 - item.consumedPct}%` : ''}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: '#EF4444' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>Consumed: <strong>{item.totalConsumed} {item.unit}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: '#10B981' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>Remaining: <strong>{item.currentStock} {item.unit}</strong></span>
                  </div>
                </div>
              </div>

              <div className="drawer-section">
                <div className="drawer-section-title">Expiry Status</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, background: daysToExpiry <= 7 ? 'var(--danger-bg)' : daysToExpiry <= 14 ? 'var(--warning-bg)' : 'var(--success-bg)', border: `1px solid ${daysToExpiry <= 7 ? 'rgba(239,68,68,0.15)' : daysToExpiry <= 14 ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)'}` }}>
                  <span style={{ fontSize: 24 }}>{daysToExpiry <= 0 ? '💀' : daysToExpiry <= 7 ? '⚠️' : daysToExpiry <= 14 ? '🕐' : '✅'}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: daysToExpiry <= 7 ? '#991B1B' : daysToExpiry <= 14 ? '#92400E' : '#065F46' }}>
                      {daysToExpiry <= 0 ? 'Expired — remove from stock' : `Expires in ${daysToExpiry} day${daysToExpiry !== 1 ? 's' : ''}`}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>Expiry Date: {formatDate(item.expiryDate)}</div>
                  </div>
                </div>
              </div>

              <div className="drawer-section">
                <div className="drawer-section-title">Quick Actions</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button className="btn-primary-fsp" style={{ fontSize: 12.5, padding: '8px 14px' }} onClick={() => onEdit(item)}>
                    <MdEdit /> Edit Item
                  </button>
                  <button className="btn-secondary-fsp" style={{ fontSize: 12.5, padding: '8px 14px' }}>
                    <MdShoppingCart /> Create PO
                  </button>
                  <button className="btn-secondary-fsp" style={{ fontSize: 12.5, padding: '8px 14px' }}>
                    <MdTrendingDown /> Log Wastage
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ══ USAGE ══ */}
          {tab === 'usage' && (
            <>
              <div className="drawer-section">
                <div className="drawer-section-title">Consumption Metrics</div>
                <div className="mini-kpi-grid">
                  {[
                    { label: 'Per Day',      value: `${item.dailyUsage} ${item.unit}`,   icon: '📅', accent: '#4F46E5' },
                    { label: 'Per Week',     value: `${item.weeklyUsage} ${item.unit}`,  icon: '📆', accent: '#3B82F6' },
                    { label: 'Per Month',    value: `${item.monthlyUsage} ${item.unit}`, icon: '🗓️', accent: '#8B5CF6' },
                    { label: '30-Day Total', value: `${item.totalConsumed} ${item.unit}`,icon: '📉', accent: '#EF4444' },
                  ].map((k) => (
                    <div key={k.label} className="mini-kpi" style={{ '--mini-kpi-accent': k.accent }}>
                      <div className="mini-kpi-icon">{k.icon}</div>
                      <div className="mini-kpi-value" style={{ fontSize: 17 }}>{k.value}</div>
                      <div className="mini-kpi-label">{k.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="drawer-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div className="drawer-section-title" style={{ marginBottom: 0 }}>7-Day Consumption History</div>
                  <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{item.unit}/day</span>
                </div>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={weeklyData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v) => [`${v} ${item.unit}`, 'Consumed']} contentStyle={{ borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 12 }} />
                    <ReferenceLine y={item.dailyUsage} stroke="#4F46E5" strokeDasharray="4 3" label={{ value: 'Avg', position: 'right', fontSize: 10, fill: '#4F46E5' }} />
                    <Bar dataKey="consumed" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, padding: '8px 12px', background: 'var(--primary-pale)', borderRadius: 8, fontSize: 12 }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>📊 Daily avg:</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.dailyUsage} {item.unit}/day · Peak: <strong>{item.peakDay}</strong></span>
                </div>
              </div>

              <div className="drawer-section">
                <div className="drawer-section-title">Stock Runway Projection</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'At current rate',   days: daysRemaining, desc: `${item.dailyUsage} ${item.unit}/day` },
                    { label: '+20% demand surge', days: Math.floor(item.currentStock / (item.dailyUsage * 1.2)), desc: `${(item.dailyUsage * 1.2).toFixed(1)} ${item.unit}/day` },
                    { label: '-20% reduced use',  days: Math.floor(item.currentStock / (item.dailyUsage * 0.8)), desc: `${(item.dailyUsage * 0.8).toFixed(1)} ${item.unit}/day` },
                  ].map((row) => {
                    const col = row.days <= 3 ? '#EF4444' : row.days <= 7 ? '#F59E0B' : row.days <= 14 ? '#3B82F6' : '#10B981';
                    return (
                      <div key={row.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 8, background: 'var(--bg-main)', border: '1px solid var(--border-color)' }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{row.label}</div>
                          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 1 }}>{row.desc}</div>
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: col, minWidth: 52, textAlign: 'right' }}>
                          {item.currentStock === 0 ? '0d' : row.days >= 999 ? '∞' : `${row.days}d`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="drawer-section">
                <div className="drawer-section-title">Cost Analysis</div>
                <div className="info-grid">
                  {[
                    { label: 'Cost per Day',   value: formatCurrency(item.dailyUsage    * item.unitCost) },
                    { label: 'Cost per Week',  value: formatCurrency(item.weeklyUsage   * item.unitCost) },
                    { label: 'Cost per Month', value: formatCurrency(item.monthlyUsage  * item.unitCost) },
                    { label: '30-Day Spend',   value: formatCurrency(item.totalConsumed * item.unitCost) },
                  ].map((c) => (
                    <div key={c.label} className="info-cell">
                      <span className="info-cell-label">{c.label}</span>
                      <span className="info-cell-value" style={{ color: 'var(--primary)' }}>{c.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ══ DETAILS ══ */}
          {tab === 'details' && (
            <>
              <div className="drawer-section">
                <div className="drawer-section-title">Item Information</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[
                    { icon: <MdInventory2 />,   label: 'Item ID',          value: item.id },
                    { icon: <MdCategory />,     label: 'Category',         value: item.category },
                    { icon: <MdInfo />,         label: 'Unit',             value: item.unit },
                    { icon: <MdLocationOn />,   label: 'Storage Location', value: item.location },
                    { icon: <MdPerson />,       label: 'Supplier',         value: item.supplier },
                    { icon: <MdCalendarToday />,label: 'Expiry Date',      value: formatDate(item.expiryDate) },
                    { icon: <MdAttachMoney />,  label: 'Unit Cost',        value: formatCurrency(item.unitCost) },
                    { icon: <MdAttachMoney />,  label: 'Total Value',      value: formatCurrency(item.currentStock * item.unitCost) },
                  ].map(({ icon, label, value }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--primary-pale)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                        {icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)', marginTop: 1 }}>{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="drawer-section">
                <div className="drawer-section-title">Last Restock</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px', background: 'var(--bg-main)', borderRadius: 10, border: '1px solid var(--border-color)' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: 'var(--success-bg)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📦</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>+{usage.restockQty} {item.unit} received</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{usage.lastRestocked ? formatDate(usage.lastRestocked) : 'N/A'} · {item.supplier}</div>
                  </div>
                </div>
              </div>

              <div className="drawer-section">
                <div className="drawer-section-title">Stock Thresholds</div>
                <div className="info-grid">
                  {[
                    { label: 'Min / Reorder Point', value: `${item.minStock} ${item.unit}` },
                    { label: 'Max Capacity',         value: `${item.maxStock} ${item.unit}` },
                    { label: 'Current Level',        value: `${item.currentStock} ${item.unit}` },
                    { label: 'Utilisation',          value: `${stockPct}%` },
                  ].map((c) => (
                    <div key={c.label} className="info-cell">
                      <span className="info-cell-label">{c.label}</span>
                      <span className="info-cell-value">{c.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>
      </aside>
    </>
  );
};


/* ══════════════════════════════════════════════════════
   MAIN INVENTORY PAGE
   ══════════════════════════════════════════════════════ */
const Inventory = () => {
  const enriched = useMemo(() => getEnrichedItems(), []);

  const [items, setItems]               = useState(enriched);
  const [activeTab, setActiveTab]       = useState('items');
  const [search, setSearch]             = useState('');
  const [catFilter, setCatFilter]       = useState('All Categories');
  const [statusFilter, setStatus]       = useState('All');
  const [selectedItem, setSelected]     = useState(null);
  const [showModal, setShowModal]       = useState(false);
  const [editItem, setEditItem]         = useState(null);
  const [form, setForm]                 = useState(INITIAL_FORM);
  const [deleteId, setDeleteId]         = useState(null);

  // ── Update Stock state ─────────────────────────────────
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockForm, setStockForm]           = useState(STOCK_FORM_INIT);
  const [stockSuccess, setStockSuccess]     = useState(false);

  const filteredItems = useMemo(() => items.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch = !search || item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q) || item.supplier.toLowerCase().includes(q);
    const matchCat    = catFilter === 'All Categories' || item.category === catFilter;
    const { label }   = getStockStatus(item.currentStock, item.minStock, item.maxStock);
    const matchStatus = statusFilter === 'All' || label === statusFilter;
    return matchSearch && matchCat && matchStatus;
  }), [items, search, catFilter, statusFilter]);

  const summary = useMemo(() => ({
    total:    items.length,
    inStock:  items.filter((i) => getStockStatus(i.currentStock, i.minStock, i.maxStock).label === 'In Stock').length,
    low:      items.filter((i) => getStockStatus(i.currentStock, i.minStock, i.maxStock).label === 'Low Stock').length,
    out:      items.filter((i) => i.currentStock === 0).length,
    critical: items.filter((i) => i.urgency === 'critical' || i.urgency === 'high').length,
  }), [items]);

  // ── Add / Edit item handlers ────────────────────────────
  const openAdd    = useCallback(() => { setEditItem(null); setForm(INITIAL_FORM); setShowModal(true); }, []);
  const openEdit   = useCallback((item) => { setEditItem(item); setForm({ ...item }); setShowModal(true); }, []);
  const closeModal = useCallback(() => { setShowModal(false); setEditItem(null); }, []);

  const handleSave = () => {
    if (editItem) {
      setItems((prev) => prev.map((i) => i.id === editItem.id ? { ...i, ...form } : i));
    } else {
      const newId = `INV-${String(items.length + 1).padStart(3, '0')}`;
      setItems((prev) => [...prev, { id: newId, ...form, urgency: 'low', history: [0,0,0,0,0,0,0], dailyUsage: 0, weeklyUsage: 0, monthlyUsage: 0, totalConsumed: 0, stockLeftPct: 100, consumedPct: 0, totalValue: 0, daysRemaining: 999, peakDay: 'N/A', lastRestocked: 'N/A', restockQty: 0 }]);
    }
    closeModal();
    setSelected(null);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleteId(null);
    if (selectedItem?.id === id) setSelected(null);
  };

  // ── Update Stock handlers ───────────────────────────────
  const handleStockItemChange = (itemId) => {
    const found = items.find((i) => i.id === itemId);
    if (found) {
      setStockForm((f) => ({
        ...f,
        itemId,
        category: found.category,
        supplier: found.supplier,
        unit:     found.unit,
        rate:     found.unitCost,
      }));
    } else {
      setStockForm((f) => ({ ...f, itemId, category: '', supplier: '', unit: '', rate: '' }));
    }
  };

  const handleStockSave = () => {
    const { itemId, supplier, date, quantity, rate } = stockForm;
    if (!itemId || !quantity || !rate) return;

    const qty     = Number(quantity);
    const newRate = Number(rate);

    setItems((prev) => prev.map((item) => {
      if (item.id !== itemId) return item;
      const newStock = item.currentStock + qty;
      // Recompute urgency based on new stock
      const newDays = item.dailyUsage > 0 ? Math.floor(newStock / item.dailyUsage) : 999;
      const newUrgency = newDays <= 3 ? 'critical' : newDays <= 7 ? 'high' : newDays <= 14 ? 'medium' : 'low';
      return {
        ...item,
        currentStock: newStock,
        unitCost:     newRate,
        supplier:     supplier || item.supplier,
        urgency:      newUrgency,
        daysRemaining: newDays,
        stockLeftPct: Math.min(Math.round((newStock / item.maxStock) * 100), 100),
      };
    }));

    // If drawer is open for this item, refresh selected
    if (selectedItem?.id === itemId) {
      setSelected((prev) => ({
        ...prev,
        currentStock: prev.currentStock + qty,
        unitCost: newRate,
        supplier: supplier || prev.supplier,
      }));
    }

    setStockSuccess(true);
    setTimeout(() => {
      setStockSuccess(false);
      setShowStockModal(false);
      setStockForm(STOCK_FORM_INIT);
    }, 1400);
  };

  const closeStockModal = () => {
    setShowStockModal(false);
    setStockForm(STOCK_FORM_INIT);
    setStockSuccess(false);
  };

  // Selected item's current stock (derived)
  const stockSelectedItem = items.find((i) => i.id === stockForm.itemId);
  const stockTotal = stockForm.quantity && stockForm.rate
    ? (Number(stockForm.quantity) * Number(stockForm.rate)).toFixed(2)
    : null;

  // ── Table columns ───────────────────────────────────────
  const columns = [
    {
      key: 'name', label: 'Item Name',
      render: (v, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--primary-pale)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
            {v.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13.5 }}>{v}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{row.id} · {row.location}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'category', label: 'Category',
      render: (v) => (
        <span style={{ padding: '2px 9px', borderRadius: 20, fontSize: 11.5, background: 'var(--bg-main)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', fontWeight: 600 }}>{v}</span>
      ),
    },
    {
      key: 'currentStock', label: 'Stock Level',
      render: (v, row) => {
        const pct = getStockPercent(v, row.maxStock);
        return (
          <div style={{ minWidth: 110 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
              <strong>{v} {row.unit}</strong>
              <span style={{ color: 'var(--text-muted)' }}>{pct}%</span>
            </div>
            <div className="stock-bar-bg">
              <div className={`stock-bar-fill ${getStockBarClass(pct)}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      },
    },
    {
      key: 'dailyUsage', label: 'Daily Usage',
      render: (v, row) => (
        <div>
          <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--primary)' }}>{v} {row.unit}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>per day</div>
        </div>
      ),
    },
    {
      key: 'daysRemaining', label: 'Days Left',
      render: (v, row) => {
        const color = v <= 3 ? 'var(--danger)' : v <= 7 ? 'var(--warning)' : v <= 14 ? 'var(--info)' : 'var(--success)';
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color }}>{row.currentStock === 0 ? '—' : v >= 999 ? '∞' : `${v}d`}</span>
            <Sparkline data={row.history || []} unit={row.unit} color={v <= 7 ? '#EF4444' : '#4F46E5'} />
          </div>
        );
      },
    },
    {
      key: 'urgency', label: 'Urgency',
      render: (v) => {
        const conf = URGENCY_CONFIG[v] || URGENCY_CONFIG.low;
        return (
          <span style={{ padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: conf.bg, color: conf.color, border: `1px solid ${conf.border}`, whiteSpace: 'nowrap' }}>
            {conf.icon} {v.charAt(0).toUpperCase() + v.slice(1)}
          </span>
        );
      },
    },
    {
      key: 'expiryDate', label: 'Expiry',
      render: (v) => {
        const d = getDaysUntilExpiry(v);
        return (
          <div>
            <div style={{ fontSize: 12.5 }}>{formatDate(v)}</div>
            <div style={{ fontSize: 11, color: d <= 3 ? 'var(--danger)' : d <= 10 ? 'var(--warning)' : 'var(--text-muted)' }}>
              {d < 0 ? 'Expired' : d === 0 ? 'Today!' : `${d}d`}
            </div>
          </div>
        );
      },
    },
    {
      key: 'status', label: 'Status',
      render: (_, row) => {
        const { label, type } = getStockStatus(row.currentStock, row.minStock, row.maxStock);
        return <StatusBadge label={label} type={type} />;
      },
    },
    {
      key: 'actions', label: '',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: 5 }}>
          <button className="btn-icon-sm" onClick={(e) => { e.stopPropagation(); openEdit(row); }} title="Edit"><MdEdit /></button>
          <button className="btn-icon-sm danger" onClick={(e) => { e.stopPropagation(); setDeleteId(row.id); }} title="Delete"><MdDelete /></button>
        </div>
      ),
    },
  ];

  const topConsumers = useMemo(() =>
    [...items].sort((a, b) => (b.dailyUsage * b.unitCost) - (a.dailyUsage * a.unitCost)).slice(0, 8)
      .map((i) => ({ name: i.name.split(' ')[0], dailyCost: +(i.dailyUsage * i.unitCost).toFixed(2), dailyUsage: i.dailyUsage, unit: i.unit })),
    [items]);

  const criticalItems = useMemo(() =>
    items.filter((i) => i.urgency === 'critical' || i.urgency === 'high').sort((a, b) => a.daysRemaining - b.daysRemaining),
    [items]);

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1>Inventory Management</h1>
          <p>Track stock levels, monitor daily usage, and manage your full food item catalog</p>
        </div>
        <div className="page-header-actions">
          <button className="btn-secondary-fsp"><MdFileDownload /> Export CSV</button>
          <button
            className="btn-stock-update"
            onClick={() => setShowStockModal(true)}
            title="Record stock received from supplier"
          >
            <MdSystemUpdateAlt /> Update Stock
          </button>
          <button className="btn-primary-fsp" onClick={openAdd}><MdAdd /> Add Item</button>
        </div>
      </div>

      {/* Summary Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Total Items',   val: summary.total,    color: 'var(--primary)' },
          { label: 'In Stock',      val: summary.inStock,  color: 'var(--success)' },
          { label: 'Low Stock',     val: summary.low,      color: 'var(--warning)' },
          { label: 'Out of Stock',  val: summary.out,      color: 'var(--danger)'  },
          { label: 'Needs Reorder', val: summary.critical, color: '#EF4444'        },
        ].map((s) => (
          <div key={s.label} className="fsp-card" style={{ padding: '14px 18px' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="page-tabs">
        <button className={`page-tab ${activeTab === 'items' ? 'active' : ''}`} onClick={() => setActiveTab('items')}>
          <MdInventory2 /> Items <span className="page-tab-count">{items.length}</span>
        </button>
        <button className={`page-tab ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
          <MdShowChart /> Usage Analytics
          {summary.critical > 0 && (
            <span className="page-tab-count" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}>{summary.critical} urgent</span>
          )}
        </button>
      </div>

      {/* ══ ITEMS TAB ══ */}
      {activeTab === 'items' && (
        <div className="fsp-card">
          {/* Filters */}
          <div className="filter-toolbar">
            <div className="filter-search">
              <svg className="filter-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: 15, height: 15 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search by name, category, supplier…" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select className="filter-select" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select className="filter-select" value={statusFilter} onChange={(e) => setStatus(e.target.value)}>
              {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map((s) => <option key={s}>{s}</option>)}
            </select>
            <button className="btn-icon-sm" title="Reset filters" onClick={() => { setSearch(''); setCatFilter('All Categories'); setStatus('All'); }}>
              <MdRefresh />
            </button>
            <span className="filter-count">{filteredItems.length} of {items.length} items</span>
          </div>

          {/* Hint */}
          {!selectedItem && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--primary-pale)', borderBottom: '1px solid rgba(79,70,229,0.15)', fontSize: 12.5, color: 'var(--primary)', fontWeight: 500 }}>
              <MdInfo style={{ fontSize: 16 }} />
              Click any row to open the full item detail panel — stock, usage, consumption rate, and more.
            </div>
          )}

          {/* Table */}
          <div className="fsp-table-wrap">
            <table className="fsp-table">
              <thead>
                <tr>{columns.map((col) => <th key={col.key}>{col.label}</th>)}</tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr><td colSpan={columns.length} style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>No items match your filters.</td></tr>
                ) : (
                  filteredItems.map((row) => (
                    <tr
                      key={row.id}
                      className={`clickable-row ${selectedItem?.id === row.id ? 'selected' : ''}`}
                      onClick={() => setSelected(selectedItem?.id === row.id ? null : row)}
                      style={{ cursor: 'pointer' }}
                    >
                      {columns.map((col) => <td key={col.key}>{col.render ? col.render(row[col.key], row) : row[col.key]}</td>)}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-light)', fontSize: 12.5, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Showing {filteredItems.length} of {items.length} items</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 12 }}>💡 Click any row to view detailed usage & consumption data</span>
          </div>
        </div>
      )}

      {/* ══ ANALYTICS TAB ══ */}
      {activeTab === 'analytics' && (
        <div>
          {criticalItems.length > 0 && (
            <div className="fsp-card" style={{ marginBottom: 16 }}>
              <div className="fsp-card-header">
                <div>
                  <div className="fsp-card-title" style={{ color: 'var(--danger)' }}>🚨 Items Needing Immediate Attention</div>
                  <div className="fsp-card-subtitle">{criticalItems.length} item{criticalItems.length !== 1 ? 's' : ''} critical or high urgency</div>
                </div>
              </div>
              <div className="fsp-card-body" style={{ padding: '0 0 4px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, padding: '4px 20px 16px' }}>
                  {criticalItems.map((item) => {
                    const conf = URGENCY_CONFIG[item.urgency];
                    return (
                      <div key={item.id} onClick={() => { setActiveTab('items'); setSelected(item); }}
                        style={{ padding: '14px', borderRadius: 10, cursor: 'pointer', background: conf.bg, border: `1px solid ${conf.border}`, transition: 'var(--transition)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 13.5 }}>{item.name}</div>
                            <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{item.category} · {item.id}</div>
                          </div>
                          <span style={{ fontSize: 18, fontWeight: 800, color: conf.color }}>{item.currentStock === 0 ? '⚠️' : `${item.daysRemaining}d`}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-secondary)' }}>
                          <span>Stock: <strong>{item.currentStock} {item.unit}</strong></span>
                          <span>Usage: <strong>{item.dailyUsage} {item.unit}/day</strong></span>
                        </div>
                        <div className="stock-bar-bg" style={{ marginTop: 8 }}>
                          <div className={`stock-bar-fill ${getStockBarClass(item.stockLeftPct)}`} style={{ width: `${item.stockLeftPct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div className="fsp-card">
              <div className="fsp-card-header"><div><div className="fsp-card-title">Top Items by Daily Cost</div><div className="fsp-card-subtitle">Daily usage × unit cost</div></div></div>
              <div className="fsp-card-body">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={topConsumers} layout="vertical" margin={{ left: 0, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v}`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={80} />
                    <Tooltip formatter={(v) => [`₹${v}`, 'Daily Cost']} />
                    <Bar dataKey="dailyCost" fill="#4F46E5" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="fsp-card">
              <div className="fsp-card-header"><div><div className="fsp-card-title">Top Items by Daily Volume</div><div className="fsp-card-subtitle">Units consumed per day</div></div></div>
              <div className="fsp-card-body">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={topConsumers} layout="vertical" margin={{ left: 0, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={80} />
                    <Tooltip formatter={(v, _, p) => [`${v} ${p.payload.unit}`, 'Daily Usage']} />
                    <Bar dataKey="dailyUsage" fill="#10B981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="fsp-card">
            <div className="fsp-card-header"><div><div className="fsp-card-title">All Items — Usage & Stock Summary</div><div className="fsp-card-subtitle">Sorted by days remaining. Click any row to view full details.</div></div></div>
            <div className="fsp-table-wrap">
              <table className="fsp-table">
                <thead><tr><th>Item</th><th>Daily Usage</th><th>Weekly</th><th>Monthly</th><th>Stock Left</th><th>Days Left</th><th>Daily Cost</th><th>Urgency</th></tr></thead>
                <tbody>
                  {[...items].sort((a, b) => a.daysRemaining - b.daysRemaining).map((row) => {
                    const conf = URGENCY_CONFIG[row.urgency];
                    const dc = row.daysRemaining <= 3 ? 'var(--danger)' : row.daysRemaining <= 7 ? 'var(--warning)' : row.daysRemaining <= 14 ? 'var(--info)' : 'var(--success)';
                    return (
                      <tr key={row.id} className="clickable-row" style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('items'); setSelected(row); }}>
                        <td><div style={{ fontWeight: 600 }}>{row.name}</div><div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{row.category}</div></td>
                        <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{row.dailyUsage} {row.unit}</td>
                        <td style={{ color: 'var(--text-secondary)' }}>{row.weeklyUsage} {row.unit}</td>
                        <td style={{ color: 'var(--text-secondary)' }}>{row.monthlyUsage} {row.unit}</td>
                        <td><div style={{ fontWeight: 600 }}>{row.currentStock} {row.unit}</div><div className="stock-bar-bg" style={{ marginTop: 4, width: 80 }}><div className={`stock-bar-fill ${getStockBarClass(row.stockLeftPct)}`} style={{ width: `${row.stockLeftPct}%` }} /></div></td>
                        <td><span style={{ fontSize: 16, fontWeight: 800, color: dc }}>{row.currentStock === 0 ? '—' : row.daysRemaining >= 999 ? '∞' : `${row.daysRemaining}d`}</span></td>
                        <td style={{ fontWeight: 700 }}>{formatCurrency(row.dailyUsage * row.unitCost)}</td>
                        <td><span style={{ padding: '3px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: conf.bg, color: conf.color, border: `1px solid ${conf.border}` }}>{conf.icon} {row.urgency.charAt(0).toUpperCase() + row.urgency.slice(1)}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Item Detail Drawer ── */}
      {selectedItem && (
        <ItemDrawer item={selectedItem} onClose={() => setSelected(null)} onEdit={(item) => { setSelected(null); openEdit(item); }} />
      )}

      {/* ── Add / Edit Modal ── */}
      <Modal show={showModal} onClose={closeModal} title={editItem ? `Edit — ${editItem.name}` : 'Add New Item'} size="lg"
        footer={<><button className="btn-secondary-fsp" onClick={closeModal}>Cancel</button><button className="btn-primary-fsp" onClick={handleSave}>{editItem ? 'Save Changes' : 'Add Item'}</button></>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <label className="fsp-label">Item Name *</label>
            <input className="fsp-input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Basmati Rice" />
          </div>
          <div>
            <label className="fsp-label">Category</label>
            <select className="fsp-select" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
              {categories.filter((c) => c !== 'All Categories').map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="fsp-label">Unit</label>
            <select className="fsp-select" value={form.unit} onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}>
              {['kg', 'g', 'L', 'mL', 'doz', 'pcs', 'ctn', 'bag', 'box'].map((u) => <option key={u}>{u}</option>)}
            </select>
          </div>
          <div><label className="fsp-label">Current Stock</label><input className="fsp-input" type="number" value={form.currentStock} onChange={(e) => setForm((f) => ({ ...f, currentStock: Number(e.target.value) }))} /></div>
          <div><label className="fsp-label">Min Stock (Reorder Point)</label><input className="fsp-input" type="number" value={form.minStock} onChange={(e) => setForm((f) => ({ ...f, minStock: Number(e.target.value) }))} /></div>
          <div><label className="fsp-label">Max Stock Capacity</label><input className="fsp-input" type="number" value={form.maxStock} onChange={(e) => setForm((f) => ({ ...f, maxStock: Number(e.target.value) }))} /></div>
          <div><label className="fsp-label">Unit Cost (₹)</label><input className="fsp-input" type="number" step="0.01" value={form.unitCost} onChange={(e) => setForm((f) => ({ ...f, unitCost: Number(e.target.value) }))} /></div>
          <div><label className="fsp-label">Expiry Date</label><input className="fsp-input" type="date" value={form.expiryDate} onChange={(e) => setForm((f) => ({ ...f, expiryDate: e.target.value }))} /></div>
          <div><label className="fsp-label">Storage Location</label><input className="fsp-input" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} /></div>
          <div style={{ gridColumn: 'span 2' }}><label className="fsp-label">Supplier</label><input className="fsp-input" value={form.supplier} onChange={(e) => setForm((f) => ({ ...f, supplier: e.target.value }))} /></div>
        </div>
      </Modal>

      {/* ── Delete Confirm ── */}
      <Modal show={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete" size="sm"
        footer={<><button className="btn-secondary-fsp" onClick={() => setDeleteId(null)}>Cancel</button><button className="btn-danger-fsp" onClick={() => handleDelete(deleteId)}>Delete Item</button></>}>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, margin: 0 }}>Are you sure you want to delete this inventory item? This action cannot be undone.</p>
      </Modal>

      {/* ════════════════════════════════════════════════════
          UPDATE STOCK MODAL
          ════════════════════════════════════════════════════ */}
      <Modal
        show={showStockModal}
        onClose={closeStockModal}
        title="Update Stock — Record Received Goods"
        size="lg"
        footer={
          stockSuccess ? null : (
            <>
              <button className="btn-secondary-fsp" onClick={closeStockModal}>Cancel</button>
              <button
                className="btn-stock-update"
                onClick={handleStockSave}
                disabled={!stockForm.itemId || !stockForm.quantity || !stockForm.rate}
                style={{ opacity: (!stockForm.itemId || !stockForm.quantity || !stockForm.rate) ? 0.5 : 1 }}
              >
                <MdSystemUpdateAlt /> Confirm Stock Update
              </button>
            </>
          )
        }
      >
        {/* Success state */}
        {stockSuccess ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', gap: 16, textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
              <MdCheckCircle style={{ color: 'var(--success)', fontSize: 36 }} />
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Stock Updated Successfully!</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                +{stockForm.quantity} {stockForm.unit} added to {items.find((i) => i.id === stockForm.itemId)?.name}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Item selector */}
            <div style={{ marginBottom: 20 }}>
              <label className="fsp-label">Select Item *</label>
              <select
                className="fsp-select"
                value={stockForm.itemId}
                onChange={(e) => handleStockItemChange(e.target.value)}
                style={{ width: '100%', fontSize: 14 }}
              >
                <option value="">— Choose an inventory item —</option>
                {[...items].sort((a, b) => a.name.localeCompare(b.name)).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.id}) — Current: {item.currentStock} {item.unit}
                  </option>
                ))}
              </select>
            </div>

            {/* Current stock info banner */}
            {stockSelectedItem && (
              <div style={{ display: 'flex', gap: 10, marginBottom: 20, padding: '12px 16px', background: 'var(--primary-pale)', borderRadius: 10, border: '1px solid rgba(79,70,229,0.15)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 3 }}>Current Stock Level</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.5px' }}>{stockSelectedItem.currentStock} {stockSelectedItem.unit}</div>
                  <div className="stock-bar-bg" style={{ marginTop: 6, height: 6 }}>
                    <div className={`stock-bar-fill ${getStockBarClass(getStockPercent(stockSelectedItem.currentStock, stockSelectedItem.maxStock))}`} style={{ width: `${getStockPercent(stockSelectedItem.currentStock, stockSelectedItem.maxStock)}%` }} />
                  </div>
                </div>
                <div style={{ textAlign: 'right', minWidth: 110 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 3 }}>After Update</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--success)', letterSpacing: '-0.5px' }}>
                    {stockSelectedItem.currentStock + (Number(stockForm.quantity) || 0)} {stockSelectedItem.unit}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                    {stockForm.quantity ? `+${stockForm.quantity} received` : 'enter quantity'}
                  </div>
                </div>
              </div>
            )}

            {/* Form grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px' }}>
              <div>
                <label className="fsp-label">Category</label>
                <input className="fsp-input" value={stockForm.category} readOnly
                  style={{ background: 'var(--bg-main)', color: 'var(--text-muted)', cursor: 'default' }}
                  placeholder="Auto-filled from item" />
              </div>
              <div>
                <label className="fsp-label">Supplier</label>
                <input className="fsp-input" value={stockForm.supplier}
                  onChange={(e) => setStockForm((f) => ({ ...f, supplier: e.target.value }))}
                  placeholder="Supplier name" />
              </div>
              <div>
                <label className="fsp-label">Received Date *</label>
                <input className="fsp-input" type="date" value={stockForm.date}
                  onChange={(e) => setStockForm((f) => ({ ...f, date: e.target.value }))} />
              </div>
              <div>
                <label className="fsp-label">
                  Quantity Received * {stockForm.unit && <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({stockForm.unit})</span>}
                </label>
                <input className="fsp-input" type="number" min="0" step="0.01"
                  value={stockForm.quantity}
                  onChange={(e) => setStockForm((f) => ({ ...f, quantity: e.target.value }))}
                  placeholder="e.g. 50" />
              </div>
              <div>
                <label className="fsp-label">
                  Purchase Rate * {stockForm.unit && <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(₹ per {stockForm.unit})</span>}
                </label>
                <input className="fsp-input" type="number" min="0" step="0.01"
                  value={stockForm.rate}
                  onChange={(e) => setStockForm((f) => ({ ...f, rate: e.target.value }))}
                  placeholder="e.g. 2.50" />
              </div>
              <div>
                <label className="fsp-label">Total Purchase Amount</label>
                <div style={{ height: 42, display: 'flex', alignItems: 'center', padding: '0 14px', background: 'var(--success-bg)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16,185,129,0.2)', fontSize: 15, fontWeight: 800, color: 'var(--success)' }}>
                  {stockTotal ? `₹${Number(stockTotal).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: 13 }}>Enter qty & rate</span>}
                </div>
              </div>
            </div>

            {/* Summary line */}
            {stockForm.itemId && stockForm.quantity && stockForm.rate && (
              <div style={{ marginTop: 18, padding: '12px 16px', background: 'var(--bg-main)', borderRadius: 10, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--text-secondary)' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Summary:</span> Adding <strong style={{ color: 'var(--success)' }}>{stockForm.quantity} {stockForm.unit}</strong> of <strong>{items.find((i) => i.id === stockForm.itemId)?.name}</strong> at <strong>₹{Number(stockForm.rate).toFixed(2)}/{stockForm.unit}</strong> — Total cost <strong style={{ color: 'var(--success)' }}>{Number(stockTotal).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 })}</strong>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Inventory;
