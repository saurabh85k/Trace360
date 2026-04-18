import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import {
  LineChart,
  BarChart,
  PieChart,
  AreaChart,
  Line,
  Bar,
  Pie,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import {
  Package,
  Truck,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Users,
  BarChart2,
  Settings,
  ChevronRight,
  ChevronDown,
  Search,
  Bell,
  Menu,
  Sun,
  Moon,
  Upload,
  Download,
  Filter,
  Plus,
  X,
  Map,
  Navigation,
  LayoutDashboard,
  Clock,
  Star,
  ArrowUp,
  ArrowDown,
  Zap,
} from 'lucide-react'

const ROUTE_PATH_1 = 'M 40,300 C 100,260 160,180 240,140 C 300,110 340,130 380,100'
const ROUTE_PATH_2 = 'M 60,320 C 130,280 200,220 270,180 C 320,150 360,160 400,120'
const ROUTE_PATH_3 = 'M 30,280 C 90,240 150,200 220,170 C 280,145 330,155 390,110'
const ROUTE_PATH_4 = 'M 50,310 C 110,270 180,210 250,165 C 310,130 355,145 395,105'

const KPI_CARDS = [
  { key: 'all', label: 'Total Shipments', value: '1,250', icon: Package, color: 'var(--blue)', wave: '#3B82F6', page: 'shipments-all', filter: 'All' },
  { key: 'transit', label: 'In Transit', value: '320', icon: Truck, color: 'var(--cyan)', wave: '#3B82F6', page: 'shipments-all', filter: 'In Transit' },
  { key: 'delivered', label: 'Delivered', value: '860', icon: CheckCircle2, color: 'var(--green)', wave: '#22C55E', page: 'shipments-all', filter: 'Delivered' },
  { key: 'delayed', label: 'Delayed', value: '45', icon: AlertTriangle, color: 'var(--red)', wave: '#EF4444', page: 'shipments-all', filter: 'Delayed' },
]

const DELIVERY_RANGES = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days']

const DELIVERY_PERFORMANCE_DATA = {
  'Last 7 Days': [
    { day: 'Mon', delivered: 48, delayed: 6 },
    { day: 'Tue', delivered: 55, delayed: 7 },
    { day: 'Wed', delivered: 60, delayed: 5 },
    { day: 'Thu', delivered: 58, delayed: 4 },
    { day: 'Fri', delivered: 66, delayed: 7 },
    { day: 'Sat', delivered: 69, delayed: 5 },
    { day: 'Sun', delivered: 72, delayed: 3 },
  ],
  'Last 30 Days': [
    { day: '1', delivered: 98, delayed: 16 },
    { day: '5', delivered: 124, delayed: 14 },
    { day: '10', delivered: 132, delayed: 12 },
    { day: '15', delivered: 148, delayed: 11 },
    { day: '20', delivered: 161, delayed: 13 },
    { day: '25', delivered: 176, delayed: 10 },
    { day: '30', delivered: 188, delayed: 9 },
  ],
  'Last 90 Days': [
    { day: 'Jan', delivered: 1320, delayed: 186 },
    { day: 'Feb', delivered: 1410, delayed: 164 },
    { day: 'Mar', delivered: 1535, delayed: 142 },
  ],
}

const OVERVIEW_AREA_DATA = [
  { name: 'W1', delivered: 280, delayed: 42 },
  { name: 'W2', delivered: 325, delayed: 38 },
  { name: 'W3', delivered: 352, delayed: 31 },
  { name: 'W4', delivered: 388, delayed: 26 },
]

const STATUS_PIE_DATA = [
  { name: 'Delivered', value: 860, color: '#22C55E' },
  { name: 'In Transit', value: 320, color: '#3B82F6' },
  { name: 'Delayed', value: 45, color: '#EF4444' },
  { name: 'Out for Delivery', value: 25, color: '#F59E0B' },
]

const REPORT_PERIODS = ['7 Days', '30 Days', '90 Days']

const REPORT_KPIS = {
  '7 Days': [
    { label: 'Avg Delivery Time', value: '2.4 hrs', trend: 'up', note: 'vs previous period' },
    { label: 'First-Attempt Success', value: '89%', trend: 'up', note: 'vs previous period' },
    { label: 'Total Distance', value: '12,450 km', trend: 'down', note: 'vs previous period' },
    { label: 'Fleet Efficiency', value: '94%', trend: 'up', note: 'vs previous period' },
  ],
  '30 Days': [
    { label: 'Avg Delivery Time', value: '2.7 hrs', trend: 'down', note: 'vs previous period' },
    { label: 'First-Attempt Success', value: '91%', trend: 'up', note: 'vs previous period' },
    { label: 'Total Distance', value: '44,210 km', trend: 'up', note: 'vs previous period' },
    { label: 'Fleet Efficiency', value: '93%', trend: 'up', note: 'vs previous period' },
  ],
  '90 Days': [
    { label: 'Avg Delivery Time', value: '2.9 hrs', trend: 'up', note: 'vs previous period' },
    { label: 'First-Attempt Success', value: '88%', trend: 'down', note: 'vs previous period' },
    { label: 'Total Distance', value: '128,900 km', trend: 'up', note: 'vs previous period' },
    { label: 'Fleet Efficiency', value: '92%', trend: 'up', note: 'vs previous period' },
  ],
}

const REPORT_LINE_DATA = {
  '7 Days': [
    { day: 'Mon', hours: 2.1 },
    { day: 'Tue', hours: 2.3 },
    { day: 'Wed', hours: 2.5 },
    { day: 'Thu', hours: 2.4 },
    { day: 'Fri', hours: 2.6 },
    { day: 'Sat', hours: 2.3 },
    { day: 'Sun', hours: 2.2 },
  ],
  '30 Days': [
    { day: 'W1', hours: 2.6 },
    { day: 'W2', hours: 2.4 },
    { day: 'W3', hours: 2.7 },
    { day: 'W4', hours: 2.5 },
  ],
  '90 Days': [
    { day: 'Jan', hours: 2.8 },
    { day: 'Feb', hours: 2.6 },
    { day: 'Mar', hours: 2.5 },
  ],
}

const REPORT_BAR_DATA = {
  '7 Days': [
    { driver: 'Alex', onTime: 14, delayed: 1 },
    { driver: 'Sarah', onTime: 12, delayed: 0 },
    { driver: 'Marcus', onTime: 7, delayed: 3 },
    { driver: 'Priya', onTime: 13, delayed: 1 },
    { driver: 'Tom', onTime: 5, delayed: 2 },
    { driver: 'Leila', onTime: 11, delayed: 1 },
  ],
  '30 Days': [
    { driver: 'Alex', onTime: 64, delayed: 3 },
    { driver: 'Sarah', onTime: 59, delayed: 2 },
    { driver: 'Marcus', onTime: 38, delayed: 11 },
    { driver: 'Priya', onTime: 55, delayed: 5 },
    { driver: 'Tom', onTime: 24, delayed: 8 },
    { driver: 'Leila', onTime: 52, delayed: 4 },
  ],
  '90 Days': [
    { driver: 'Alex', onTime: 190, delayed: 10 },
    { driver: 'Sarah', onTime: 172, delayed: 7 },
    { driver: 'Marcus', onTime: 119, delayed: 28 },
    { driver: 'Priya', onTime: 168, delayed: 14 },
    { driver: 'Tom', onTime: 82, delayed: 22 },
    { driver: 'Leila', onTime: 160, delayed: 11 },
  ],
}

const DRIVER_PERFORMANCE_ROWS = {
  '7 Days': [
    { rank: 1, driver: 'Sarah Mills', deliveries: 12, onTime: 100, avgTime: '2.1 hrs', rating: 5, trend: 'up' },
    { rank: 2, driver: 'Alex Carter', deliveries: 14, onTime: 96, avgTime: '2.3 hrs', rating: 4, trend: 'up' },
    { rank: 3, driver: 'Leila Hassan', deliveries: 10, onTime: 90, avgTime: '2.5 hrs', rating: 4, trend: 'up' },
    { rank: 4, driver: 'Priya Nair', deliveries: 11, onTime: 91, avgTime: '2.6 hrs', rating: 4, trend: 'down' },
    { rank: 5, driver: 'Marcus Lee', deliveries: 7, onTime: 71, avgTime: '3.4 hrs', rating: 3, trend: 'down' },
    { rank: 6, driver: 'Tom Rivera', deliveries: 5, onTime: 60, avgTime: '3.8 hrs', rating: 3, trend: 'down' },
  ],
  '30 Days': [
    { rank: 1, driver: 'Alex Carter', deliveries: 64, onTime: 96, avgTime: '2.4 hrs', rating: 5, trend: 'up' },
    { rank: 2, driver: 'Sarah Mills', deliveries: 59, onTime: 100, avgTime: '2.2 hrs', rating: 5, trend: 'up' },
    { rank: 3, driver: 'Priya Nair', deliveries: 55, onTime: 91, avgTime: '2.7 hrs', rating: 4, trend: 'up' },
    { rank: 4, driver: 'Leila Hassan', deliveries: 52, onTime: 90, avgTime: '2.8 hrs', rating: 4, trend: 'up' },
    { rank: 5, driver: 'Marcus Lee', deliveries: 38, onTime: 71, avgTime: '3.5 hrs', rating: 3, trend: 'down' },
    { rank: 6, driver: 'Tom Rivera', deliveries: 24, onTime: 60, avgTime: '3.9 hrs', rating: 3, trend: 'down' },
  ],
  '90 Days': [
    { rank: 1, driver: 'Alex Carter', deliveries: 190, onTime: 96, avgTime: '2.5 hrs', rating: 5, trend: 'up' },
    { rank: 2, driver: 'Sarah Mills', deliveries: 172, onTime: 100, avgTime: '2.3 hrs', rating: 5, trend: 'up' },
    { rank: 3, driver: 'Priya Nair', deliveries: 168, onTime: 91, avgTime: '2.8 hrs', rating: 4, trend: 'up' },
    { rank: 4, driver: 'Leila Hassan', deliveries: 160, onTime: 90, avgTime: '2.9 hrs', rating: 4, trend: 'up' },
    { rank: 5, driver: 'Marcus Lee', deliveries: 119, onTime: 71, avgTime: '3.6 hrs', rating: 3, trend: 'down' },
    { rank: 6, driver: 'Tom Rivera', deliveries: 82, onTime: 60, avgTime: '4.0 hrs', rating: 3, trend: 'down' },
  ],
}

const ROUTE_CARDS = [
  { id: 1, driver: 'Alex Carter', shipment: '#TK652198', status: 'Moving', eta: '4:15 PM', progress: 76, color: '#06B6D4', origin: 'Origin, 4th Ave', dest: 'Senc Mulirarr, CA' },
  { id: 2, driver: 'Sarah Mills', shipment: '#TK874302', status: 'On-Time', eta: '3:45 PM', progress: 62, color: '#22C55E', origin: 'Seattle Hub', dest: 'Bellevue, WA' },
  { id: 3, driver: 'Marcus Lee', shipment: '#TK745609', status: 'Delayed', eta: '5:30 PM', progress: 38, color: '#EF4444', origin: 'Chicago West', dest: 'Evanston, IL' },
  { id: 4, driver: 'Priya Nair', shipment: '#TK985214', status: 'Moving', eta: '2:50 PM', progress: 84, color: '#3B82F6', origin: 'Houston Yard', dest: 'Sugar Land, TX' },
]

const LIVE_TRACKING_PATHS = [
  { id: 1, d: ROUTE_PATH_1 },
  { id: 2, d: ROUTE_PATH_2 },
  { id: 3, d: ROUTE_PATH_3 },
  { id: 4, d: ROUTE_PATH_4 },
]

const AGENTS = [
  { id: 'A1', name: 'Alex Carter', status: 'on-time', location: 'Los Angeles, CA', eta: '4:15 PM', shipment: '#TK652198', deliveries: 12, onTimeRate: 96, x: 480, y: 380, initials: 'AC', destX: 590, destY: 310 },
  { id: 'A2', name: 'Sarah Mills', status: 'on-time', location: 'Seattle, WA', eta: '3:45 PM', shipment: '#TK874302', deliveries: 9, onTimeRate: 100, x: 100, y: 80, initials: 'SM', destX: 10, destY: 20 },
  { id: 'A3', name: 'Marcus Lee', status: 'delayed', location: 'Chicago, IL', eta: '5:30 PM', shipment: '#TK652198', deliveries: 7, onTimeRate: 71, x: 310, y: 200, initials: 'ML', destX: 450, destY: 90 },
  { id: 'A4', name: 'Priya Nair', status: 'on-time', location: 'Houston, TX', eta: '2:50 PM', shipment: '#TK985214', deliveries: 11, onTimeRate: 91, x: 520, y: 420, initials: 'PN', destX: 580, destY: 470 },
  { id: 'A5', name: 'Tom Rivera', status: 'delayed', location: 'Phoenix, AZ', eta: '6:00 PM', shipment: '#TK745609', deliveries: 5, onTimeRate: 60, x: 80, y: 320, initials: 'TR', destX: 10, destY: 390 },
  { id: 'A6', name: 'Dana Kemp', status: 'idle', location: 'Denver, CO', eta: '—', shipment: 'None', deliveries: 0, onTimeRate: 100, x: 260, y: 140, initials: 'DK', destX: 260, destY: 140 },
  { id: 'A7', name: 'Chris Okafor', status: 'on-time', location: 'Miami, FL', eta: '3:10 PM', shipment: '#TK321099', deliveries: 14, onTimeRate: 93, x: 440, y: 440, initials: 'CO', destX: 590, destY: 440 },
  { id: 'A8', name: 'Leila Hassan', status: 'on-time', location: 'New York, NY', eta: '4:40 PM', shipment: '#TK543210', deliveries: 10, onTimeRate: 90, x: 160, y: 260, initials: 'LH', destX: 250, destY: 350 },
]

const SHIPMENTS_SEED = [
  { id: '#TK652198', recipient: 'Alex Carter', status: 'In Transit', location: 'Chicago, IL', eta: '4:15 PM', origin: 'Origin, 4th Ave', dest: 'Senc Mulirarr, CA', sender: 'Metro Medical', driver: 'Alex Carter', weight: '7.1 kg', priority: 'Same-Day' },
  { id: '#TK874302', recipient: 'Sarah Mills', status: 'Delivered', location: 'Seattle, WA', eta: '3:45 PM', origin: 'Portland, OR', dest: 'Seattle, WA', sender: 'BlueSky Retail', driver: 'Sarah Mills', weight: '2.8 kg', priority: 'Express' },
  { id: '#TK985214', recipient: 'Priya Nair', status: 'Out for Delivery', location: 'Houston, TX', eta: '2:50 PM', origin: 'Houston Yard', dest: 'Sugar Land, TX', sender: 'Luma Foods', driver: 'Priya Nair', weight: '4.0 kg', priority: 'Normal' },
  { id: '#TK745609', recipient: 'Tom Rivera', status: 'Delayed', location: 'Phoenix, AZ', eta: '6:00 PM', origin: 'Phoenix Hub', dest: 'Mesa, AZ', sender: 'Coastal Goods', driver: 'Tom Rivera', weight: '5.7 kg', priority: 'Express' },
  { id: '#TK321099', recipient: 'Chris Okafor', status: 'In Transit', location: 'Miami, FL', eta: '3:10 PM', origin: 'Miami Port', dest: 'Coral Gables, FL', sender: 'Urban Cart', driver: 'Chris Okafor', weight: '3.3 kg', priority: 'Normal' },
  { id: '#TK543210', recipient: 'Leila Hassan', status: 'Out for Delivery', location: 'New York, NY', eta: '4:40 PM', origin: 'Queens Depot', dest: 'Brooklyn, NY', sender: 'Northwind Supply', driver: 'Leila Hassan', weight: '2.2 kg', priority: 'Same-Day' },
  { id: '#TK112233', recipient: 'Jordan Hill', status: 'Delivered', location: 'Austin, TX', eta: '1:15 PM', origin: 'Austin Hub', dest: 'Round Rock, TX', sender: 'Peak Apparel', driver: 'Dana Kemp', weight: '1.8 kg', priority: 'Normal' },
  { id: '#TK999001', recipient: 'Alex Carter', status: 'Out for Delivery', location: 'Los Angeles, CA', eta: '5:05 PM', origin: 'Long Beach, CA', dest: 'Downtown LA, CA', sender: 'Vista Home', driver: 'Alex Carter', weight: '6.4 kg', priority: 'Express' },
]

const DRIVERS_ALL = [
  { id: 'DRV-1001', name: 'Alex Carter', status: 'Available', load: 3, initials: 'AC', assigned: ['#TK652198', '#TK999001'] },
  { id: 'DRV-1002', name: 'Sarah Mills', status: 'Busy', load: 2, initials: 'SM', assigned: ['#TK874302'] },
  { id: 'DRV-1003', name: 'Marcus Lee', status: 'Available', load: 1, initials: 'ML', assigned: [] },
  { id: 'DRV-1004', name: 'Priya Nair', status: 'Busy', load: 4, initials: 'PN', assigned: ['#TK985214'] },
  { id: 'DRV-1005', name: 'Tom Rivera', status: 'Available', load: 0, initials: 'TR', assigned: [] },
  { id: 'DRV-1006', name: 'Leila Hassan', status: 'Available', load: 2, initials: 'LH', assigned: ['#TK543210'] },
]

const UNASSIGNED_SHIPMENTS_SEED = [
  { id: '#TK550001', destination: 'Pasadena, CA', priority: 'Normal' },
  { id: '#TK550002', destination: 'Redmond, WA', priority: 'Express' },
  { id: '#TK550003', destination: 'Irving, TX', priority: 'Same-Day' },
  { id: '#TK550004', destination: 'Naperville, IL', priority: 'Normal' },
]

const EXPORT_DRIVER_OPTIONS = DRIVERS_ALL.map((driver) => driver.name)

const NOTIFICATIONS = [
  { id: 1, icon: AlertTriangle, color: 'var(--amber)', title: '#TK745609 Delayed', desc: 'Houston TX — 2hr delay', time: '5m ago' },
  { id: 2, icon: CheckCircle2, color: 'var(--green)', title: '#TK874302 Delivered', desc: 'Seattle WA', time: '12m ago' },
  { id: 3, icon: Package, color: 'var(--blue)', title: 'New shipment assigned', desc: '#TK999001 — Alex Carter', time: '1h ago' },
]

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  'live-tracking': 'Live Tracking',
  'shipments-all': 'All Shipments',
  'shipments-create': 'Create Shipment',
  'shipments-import': 'Import Shipments',
  'drivers-all': 'All Drivers',
  'drivers-add': 'Add Driver',
  'drivers-assignments': 'Driver Assignments',
  'reports-overview': 'Reports Overview',
  'reports-performance': 'Performance Reports',
  'reports-export': 'Export Reports',
  'fleet-map': 'Fleet Map',
  'settings-appearance': 'Appearance',
  'settings-profile': 'Profile',
  'settings-notifications': 'Notifications',
  'settings-integrations': 'Integrations',
  'settings-security': 'Security',
}

const SIDEBAR_GROUPS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' },
  { key: 'live-tracking', label: 'Live Tracking', icon: Navigation, page: 'live-tracking' },
  {
    key: 'shipments',
    label: 'Shipments',
    icon: Package,
    children: [
      { label: 'All Shipments', page: 'shipments-all' },
      { label: 'Create', page: 'shipments-create' },
      { label: 'Import', page: 'shipments-import' },
    ],
  },
  {
    key: 'drivers',
    label: 'Drivers',
    icon: Users,
    children: [
      { label: 'All Drivers', page: 'drivers-all' },
      { label: 'Add Driver', page: 'drivers-add' },
      { label: 'Assignments', page: 'drivers-assignments' },
    ],
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: BarChart2,
    children: [
      { label: 'Overview', page: 'reports-overview' },
      { label: 'Performance', page: 'reports-performance' },
      { label: 'Export', page: 'reports-export' },
    ],
  },
  { key: 'fleet-map', label: 'Fleet Map', icon: Map, page: 'fleet-map' },
  {
    key: 'settings',
    label: 'Settings',
    icon: Settings,
    children: [
      { label: 'Appearance', page: 'settings-appearance' },
      { label: 'Profile', page: 'settings-profile' },
      { label: 'Notifications', page: 'settings-notifications' },
      { label: 'Integrations', page: 'settings-integrations' },
      { label: 'Security', page: 'settings-security' },
    ],
  },
]

const STATUS_META = {
  'Out for Delivery': { bg: 'rgba(245,158,11,0.10)', color: 'var(--amber)' },
  Delivered: { bg: 'rgba(34,197,94,0.10)', color: 'var(--green)' },
  'In Transit': { bg: 'rgba(59,130,246,0.10)', color: 'var(--blue)' },
  Delayed: { bg: 'rgba(239,68,68,0.10)', color: 'var(--red)' },
  Moving: { bg: 'rgba(59,130,246,0.10)', color: 'var(--blue)' },
  'On-Time': { bg: 'rgba(34,197,94,0.10)', color: 'var(--green)' },
  Available: { bg: 'rgba(34,197,94,0.10)', color: 'var(--green)' },
  Busy: { bg: 'rgba(245,158,11,0.10)', color: 'var(--amber)' },
  idle: { bg: 'rgba(148,163,184,0.15)', color: '#94A3B8' },
  'on-time': { bg: 'rgba(34,197,94,0.10)', color: 'var(--green)' },
  delayed: { bg: 'rgba(239,68,68,0.10)', color: 'var(--red)' },
}

const APPEARANCE_SWATCHES = ['#3B82F6', '#06B6D4', '#22C55E', '#F59E0B', '#8B5CF6']
const FONT_SIZES = { Small: '13px', Medium: '15px', Large: '17px' }
const TIMELINE_STEPS = ['Created', 'Picked Up', 'In Transit', 'Delivered']

const CUSTOM_REPORT_COLUMNS = ['Tracking ID', 'Recipient', 'Status', 'Location', 'ETA', 'Driver']
const CUSTOM_REPORT_PREVIEW_ROWS = [
  { 'Tracking ID': '#TK652198', Recipient: 'Alex Carter', Status: 'In Transit', Location: 'Chicago, IL', ETA: '4:15 PM', Driver: 'Alex Carter' },
  { 'Tracking ID': '#TK874302', Recipient: 'Sarah Mills', Status: 'Delivered', Location: 'Seattle, WA', ETA: '3:45 PM', Driver: 'Sarah Mills' },
  { 'Tracking ID': '#TK745609', Recipient: 'Tom Rivera', Status: 'Delayed', Location: 'Phoenix, AZ', ETA: '6:00 PM', Driver: 'Tom Rivera' },
]

const exportCSV = (data, filename) => {
  if (!data.length) return
  const h = Object.keys(data[0]).join(',')
  const r = data.map((row) => Object.values(row).map((v) => `"${v}"`).join(',')).join('\n')
  const b = new Blob([`${h}\n${r}`], { type: 'text/csv' })
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(b), download: filename })
  a.click()
  URL.revokeObjectURL(a.href)
}

const exportJSON = (data, filename) => {
  const b = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(b), download: filename })
  a.click()
  URL.revokeObjectURL(a.href)
}

let nextToastId = 1

const getStatusMeta = (status) => STATUS_META[status] || { bg: 'rgba(148,163,184,0.16)', color: 'var(--text-2)' }
const getAgentColor = (status) => (status === 'on-time' ? '#22C55E' : status === 'delayed' ? '#EF4444' : '#94A3B8')
const getPriorityClass = (priority) => (priority === 'Same-Day' ? 'priority-same-day' : priority === 'Express' ? 'priority-express' : 'priority-normal')
const getPageGroupActive = (page, key) => page === key || page.startsWith(`${key}-`)
const makeInitials = (name) => name.split(' ').map((part) => part[0]).join('').slice(0, 2)

const DashboardTooltip = memo(({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div className="tooltip-title">{label}</div>
      <div className="tooltip-row"><span>Delivered</span><strong>{payload[0]?.value}</strong></div>
      <div className="tooltip-row"><span>Delayed</span><strong>{payload[1]?.value}</strong></div>
    </div>
  )
})

const DeliveryPerformanceChart = memo(({ data }) => (
  <ResponsiveContainer width="100%" height={280}>
    <LineChart data={data}>
      <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
      <XAxis dataKey="day" stroke="#94A3B8" tickLine={false} axisLine={false} />
      <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} />
      <Tooltip content={<DashboardTooltip />} />
      <Legend />
      <Line type="monotone" dataKey="delivered" name="Delivered" stroke="#22C55E" strokeWidth={2.5} dot={{ r: 4 }} />
      <Line type="monotone" dataKey="delayed" name="Delayed" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4 }} />
    </LineChart>
  </ResponsiveContainer>
))

const OverviewAreaChartPanel = memo(() => (
  <ResponsiveContainer width="100%" height={220}>
    <AreaChart data={OVERVIEW_AREA_DATA}>
      <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
      <XAxis dataKey="name" stroke="#94A3B8" tickLine={false} axisLine={false} />
      <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} />
      <Tooltip content={<DashboardTooltip />} />
      <Area type="monotone" dataKey="delivered" stroke="#3B82F6" fill="rgba(59,130,246,0.24)" />
      <Area type="monotone" dataKey="delayed" stroke="#F59E0B" fill="rgba(245,158,11,0.16)" />
    </AreaChart>
  </ResponsiveContainer>
))

const OverviewStatusPie = memo(() => (
  <ResponsiveContainer width="100%" height={220}>
    <PieChart>
      <Pie data={STATUS_PIE_DATA} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={4}>
        {STATUS_PIE_DATA.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
))

const ReportsLinePanel = memo(({ data }) => (
  <ResponsiveContainer width="100%" height={240}>
    <LineChart data={data}>
      <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
      <XAxis dataKey="day" stroke="#94A3B8" tickLine={false} axisLine={false} />
      <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} />
      <Tooltip />
      <Line type="monotone" dataKey="hours" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} />
    </LineChart>
  </ResponsiveContainer>
))

const ReportsBarPanel = memo(({ data }) => (
  <ResponsiveContainer width="100%" height={240}>
    <BarChart data={data}>
      <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
      <XAxis dataKey="driver" stroke="#94A3B8" tickLine={false} axisLine={false} />
      <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} />
      <Tooltip />
      <Legend />
      <Bar dataKey="onTime" fill="#22C55E" radius={[6, 6, 0, 0]} />
      <Bar dataKey="delayed" fill="#EF4444" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
))

function App() {
  const [page, setPage] = useState('dashboard')
  const [darkMode, setDarkMode] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState({
    shipments: false,
    drivers: false,
    reports: false,
    settings: false,
  })
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [sidebarCompact, setSidebarCompact] = useState(false)
  const [deliveryRange, setDeliveryRange] = useState('Last 30 Days')
  const [selectedRoute, setSelectedRoute] = useState(1)
  const [agentFilter, setAgentFilter] = useState('All')
  const [selectedAgent, setSelectedAgent] = useState('A1')
  const [fleetZoom, setFleetZoom] = useState(1)
  const [shipmentsData, setShipmentsData] = useState(SHIPMENTS_SEED)
  const [shipmentFilter, setShipmentFilter] = useState('All')
  const [shipmentSearch, setShipmentSearch] = useState('')
  const [drawerShipment, setDrawerShipment] = useState(null)
  const [toasts, setToasts] = useState([])
  const [csvFile, setCsvFile] = useState(null)
  const [csvRows, setCsvRows] = useState([])
  const [importing, setImporting] = useState(false)
  const [columnMap, setColumnMap] = useState({
    trackingId: '',
    recipient: '',
    origin: '',
    dest: '',
    status: '',
  })
  const [driverCards, setDriverCards] = useState(DRIVERS_ALL)
  const [unassignedShipments, setUnassignedShipments] = useState(UNASSIGNED_SHIPMENTS_SEED)
  const [assignmentMenu, setAssignmentMenu] = useState('')
  const [assignedToday, setAssignedToday] = useState([])
  const [reportsPeriod, setReportsPeriod] = useState('30 Days')
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' })
  const [exportDates, setExportDates] = useState({ from: '2026-04-01', to: '2026-04-18' })
  const [exportStatuses, setExportStatuses] = useState({
    All: true,
    Delivered: false,
    'In Transit': false,
    Delayed: false,
    'Out for Delivery': false,
  })
  const [exportFormat, setExportFormat] = useState('CSV')
  const [selectedDrivers, setSelectedDrivers] = useState([EXPORT_DRIVER_OPTIONS[0], EXPORT_DRIVER_OPTIONS[1]])
  const [driverExportPeriod, setDriverExportPeriod] = useState('30 Days')
  const [customColumns, setCustomColumns] = useState(CUSTOM_REPORT_COLUMNS)
  const [dragIndex, setDragIndex] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [accentColor, setAccentColor] = useState('#3B82F6')
  const [fontSizeLabel, setFontSizeLabel] = useState('Medium')
  const [createShipmentDraft, setCreateShipmentDraft] = useState({
    id: '#TK990112',
    recipient: '',
    origin: '',
    dest: '',
    status: 'Out for Delivery',
    driver: DRIVERS_ALL[0].name,
    priority: 'Normal',
  })
  const [profileDraft, setProfileDraft] = useState({
    name: 'Michael Harris',
    email: 'michael.harris@trace360.io',
    role: 'Admin',
  })

  useEffect(() => {
    document.body.classList.toggle('light', !darkMode)
  }, [darkMode])

  useEffect(() => {
    document.documentElement.style.setProperty('--blue', accentColor)
  }, [accentColor])

  useEffect(() => {
    document.documentElement.style.fontSize = FONT_SIZES[fontSizeLabel]
  }, [fontSizeLabel])

  useEffect(() => {
    if (!searchOpen) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen])

  useEffect(() => {
    if (!toasts.length) return undefined
    const timers = toasts.map((toast) => window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== toast.id))
    }, 3000))
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [toasts])

  const addToast = useCallback((msg, type = 'success') => {
    const id = nextToastId
    nextToastId += 1
    setToasts((current) => [...current, { id, msg, type }])
  }, [])

  const toggleSidebarGroup = useCallback((group) => {
    setSidebarOpen((current) => ({ ...current, [group]: !current[group] }))
  }, [])

  const openPage = useCallback((nextPage) => {
    setPage(nextPage)
    setNotifOpen(false)
  }, [])

  const openShipmentDrawer = useCallback((shipment) => {
    setDrawerShipment(shipment)
  }, [])

  const filteredShipmentRows = useMemo(() => shipmentsData.filter((shipment) => {
    const matchesStatus = shipmentFilter === 'All' || shipment.status === shipmentFilter
    const matchesSearch = shipment.id.toLowerCase().includes(shipmentSearch.toLowerCase()) || shipment.recipient.toLowerCase().includes(shipmentSearch.toLowerCase())
    return matchesStatus && matchesSearch
  }), [shipmentFilter, shipmentSearch, shipmentsData])

  const searchResults = useMemo(() => shipmentsData.filter((shipment) => shipment.id.toLowerCase().includes(shipmentSearch.toLowerCase()) || shipment.recipient.toLowerCase().includes(shipmentSearch.toLowerCase())), [shipmentSearch, shipmentsData])

  const filteredAgents = useMemo(() => AGENTS.filter((agent) => agentFilter === 'All' || (agentFilter === 'On-Time' && agent.status === 'on-time') || (agentFilter === 'Delayed' && agent.status === 'delayed') || (agentFilter === 'Idle' && agent.status === 'idle')), [agentFilter])

  const selectedAgentData = useMemo(() => AGENTS.find((agent) => agent.id === selectedAgent) || AGENTS[0], [selectedAgent])

  const fleetViewBox = useMemo(() => {
    const baseWidth = 600 / fleetZoom
    const baseHeight = 480 / fleetZoom
    const x = Math.max(0, Math.min(600 - baseWidth, selectedAgentData.x - baseWidth / 2))
    const y = Math.max(0, Math.min(480 - baseHeight, selectedAgentData.y - baseHeight / 2))
    return `${x} ${y} ${baseWidth} ${baseHeight}`
  }, [fleetZoom, selectedAgentData])

  const sortedPerformanceRows = useMemo(() => {
    const rows = [...DRIVER_PERFORMANCE_ROWS[reportsPeriod]]
    const { key, direction } = sortConfig
    rows.sort((a, b) => {
      const left = a[key]
      const right = b[key]
      if (left < right) return direction === 'asc' ? -1 : 1
      if (left > right) return direction === 'asc' ? 1 : -1
      return 0
    })
    return rows
  }, [reportsPeriod, sortConfig])

  const shipmentExportRows = useMemo(() => {
    const activeStatuses = Object.entries(exportStatuses).filter(([, checked]) => checked).map(([status]) => status)
    if (!activeStatuses.length || activeStatuses.includes('All')) return shipmentsData
    return shipmentsData.filter((shipment) => activeStatuses.includes(shipment.status))
  }, [exportStatuses, shipmentsData])

  const driverExportRows = useMemo(() => DRIVER_PERFORMANCE_ROWS[driverExportPeriod].filter((row) => selectedDrivers.includes(row.driver)), [driverExportPeriod, selectedDrivers])

  const customPreviewRows = useMemo(() => CUSTOM_REPORT_PREVIEW_ROWS.map((row) => customColumns.reduce((acc, key) => ({ ...acc, [key]: row[key] }), {})), [customColumns])

  const handleKpiClick = useCallback((filter) => {
    setShipmentFilter(filter)
    setPage('shipments-all')
  }, [])

  const handleCreateShipment = useCallback(() => {
    const shipment = {
      ...createShipmentDraft,
      location: createShipmentDraft.origin,
      eta: 'Pending',
      sender: 'Manual Entry',
      weight: '—',
    }
    setShipmentsData((current) => [shipment, ...current])
    setCreateShipmentDraft({
      id: '#TK990112',
      recipient: '',
      origin: '',
      dest: '',
      status: 'Out for Delivery',
      driver: DRIVERS_ALL[0].name,
      priority: 'Normal',
    })
    addToast('Shipment created successfully')
    setPage('shipments-all')
  }, [addToast, createShipmentDraft])

  const parseCsvText = useCallback((text) => {
    const lines = text.split('\n').map((line) => line.trim()).filter(Boolean)
    if (lines.length < 2) return []
    const headers = lines[0].split(',').map((header) => header.trim())
    return lines.slice(1).map((line) => {
      const values = line.split(',').map((value) => value.trim())
      return headers.reduce((acc, header, index) => ({ ...acc, [header]: values[index] || '' }), {})
    })
  }, [])

  const handleCsvFile = useCallback((file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : ''
      const rows = parseCsvText(text)
      setCsvFile(file)
      setCsvRows(rows)
      const headers = rows[0] ? Object.keys(rows[0]) : []
      setColumnMap({
        trackingId: headers[0] || '',
        recipient: headers[1] || '',
        origin: headers[2] || '',
        dest: headers[3] || '',
        status: headers[4] || '',
      })
    }
    reader.readAsText(file)
  }, [parseCsvText])

  const handleImportShipments = useCallback(() => {
    if (!csvRows.length) return
    setImporting(true)
    const mappedRows = csvRows.map((row, index) => ({
      id: row[columnMap.trackingId] || `#CSV${index + 1}`,
      recipient: row[columnMap.recipient] || 'Unknown Recipient',
      origin: row[columnMap.origin] || 'Unknown Origin',
      dest: row[columnMap.dest] || 'Unknown Destination',
      status: row[columnMap.status] || 'In Transit',
      location: row[columnMap.origin] || 'Unknown Origin',
      eta: 'Pending',
      sender: 'CSV Import',
      driver: 'Unassigned',
      weight: '—',
      priority: 'Normal',
    }))
    setShipmentsData((current) => [...mappedRows, ...current])
    setImporting(false)
    setCsvFile(null)
    setCsvRows([])
    addToast(`Imported ${mappedRows.length} shipments`)
  }, [addToast, columnMap, csvRows])

  const assignShipmentToDriver = useCallback((shipmentId, driverName) => {
    setDriverCards((current) => current.map((driver) => (
      driver.name === driverName
        ? { ...driver, load: driver.load + 1, assigned: [...driver.assigned, shipmentId] }
        : driver
    )))
    const shipment = unassignedShipments.find((item) => item.id === shipmentId)
    setUnassignedShipments((current) => current.filter((item) => item.id !== shipmentId))
    setAssignedToday((current) => [...current, { shipmentId, driverName, destination: shipment?.destination || 'Unknown' }])
    setAssignmentMenu('')
    addToast(`Assigned ${shipmentId} to ${driverName}`)
  }, [addToast, unassignedShipments])

  const requestSort = useCallback((key) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }, [])

  const toggleExportStatus = useCallback((status) => {
    setExportStatuses((current) => {
      if (status === 'All') {
        return { All: true, Delivered: false, 'In Transit': false, Delayed: false, 'Out for Delivery': false }
      }
      return { ...current, All: false, [status]: !current[status] }
    })
  }, [])

  const toggleDriverSelection = useCallback((driverName) => {
    setSelectedDrivers((current) => current.includes(driverName) ? current.filter((item) => item !== driverName) : [...current, driverName])
  }, [])

  const handleColumnMouseDown = useCallback((index) => {
    setDragIndex(index)
  }, [])

  const handleColumnMouseEnter = useCallback((index) => {
    if (dragIndex === null || dragIndex === index) return
    setCustomColumns((current) => {
      const next = [...current]
      const [moved] = next.splice(dragIndex, 1)
      next.splice(index, 0, moved)
      return next
    })
    setDragIndex(index)
  }, [dragIndex])

  const closeDrag = useCallback(() => {
    setDragIndex(null)
  }, [])

  useEffect(() => {
    window.addEventListener('mouseup', closeDrag)
    return () => window.removeEventListener('mouseup', closeDrag)
  }, [closeDrag])

  const markDelivered = useCallback(() => {
    if (!drawerShipment) return
    setShipmentsData((current) => current.map((item) => item.id === drawerShipment.id ? { ...item, status: 'Delivered' } : item))
    setDrawerShipment((current) => current ? { ...current, status: 'Delivered' } : current)
    addToast(`Shipment ${drawerShipment.id} marked delivered`)
  }, [addToast, drawerShipment])

  const sidebarClassName = sidebarCompact ? 'sidebar compact' : 'sidebar'
  const pageTitle = PAGE_TITLES[page] || 'Dashboard'

  const renderDashboardPage = () => (
    <div className="page-enter">
      <div className="kpi-grid">
        {KPI_CARDS.map((card) => {
          const Icon = card.icon
          return (
            <button key={card.key} type="button" className="card kpi-card" onClick={() => handleKpiClick(card.filter)}>
              <div className="kpi-head">
                <div className="kpi-icon" style={{ '--kpi-color': card.color }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div className="kpi-label">{card.label}</div>
                  <div className="kpi-number orbitron">{card.value}</div>
                </div>
              </div>
              <svg className="wave-svg" viewBox="0 0 260 60" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 38 C 30 12, 60 12, 90 32 S 150 56, 180 30 S 225 18, 260 38 V 60 H 0 Z" fill={card.wave} opacity="0.26" />
              </svg>
            </button>
          )
        })}
      </div>

      <div className="dashboard-grid">
        <div className="card chart-card">
          <div className="panel-head">
            <div>
              <h3>Delivery Performance</h3>
            </div>
            <select className="select-control" value={deliveryRange} onChange={(event) => setDeliveryRange(event.target.value)}>
              {DELIVERY_RANGES.map((range) => <option key={range}>{range}</option>)}
            </select>
          </div>
          <DeliveryPerformanceChart data={DELIVERY_PERFORMANCE_DATA[deliveryRange]} />
        </div>

        <button type="button" className="card map-preview-card" onClick={() => setPage('fleet-map')}>
          <div className="panel-head">
            <h3>Fleet Snapshot</h3>
            <span className="muted-line">Tap through to the live agent map</span>
          </div>
          <div className="map-preview-grid">
            <svg viewBox="0 0 420 340" className="map-svg">
              <path d={ROUTE_PATH_1} stroke="rgba(59,130,246,0.45)" strokeWidth="3" fill="none" strokeDasharray="6 6" />
            </svg>
            <div className="van-base van-1">
              <Truck size={20} color="#3B82F6" />
            </div>
            <div className="eta-pill eta-pill-top">4:15 PM / ↑ 11 min</div>
            <div className="eta-pill eta-pill-bottom">Cluster 9</div>
            <div className="map-hover">View Fleet Map →</div>
          </div>
        </button>

        <div className="right-stack">
          <div className="card stat-card">
            <div className="muted-line">Active Vehicles</div>
            <div className="orbitron stat-number">18</div>
            <div className="sub-note"><Truck size={14} /> 4 routes currently in motion</div>
          </div>
          <div className="card stat-card">
            <div className="muted-line">On-Time Rate</div>
            <div className="orbitron stat-number">96%</div>
            <div className="sub-note"><Clock size={14} /> Stable over the last 7 days</div>
          </div>
          <div className="card filter-bar-card">
            <div className="panel-head">
              <h3>Quick Filters</h3>
              <Filter size={16} />
            </div>
            <div className="chip-row">
              {['All', 'Delivered', 'In Transit', 'Delayed'].map((item) => (
                <button key={item} type="button" className={shipmentFilter === item ? 'chip active' : 'chip'} onClick={() => setShipmentFilter(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card active-shipment-card">
        <div className="shipment-hero">
          <div className="avatar-lg">AC</div>
          <div className="shipment-hero-copy">
            <div className="muted-line">Active Shipment</div>
            <div className="shipment-id-row"><span>#TK652198</span><span className="shipment-owner">Alex Carter</span></div>
          </div>
          <div className="status-badge" style={{ '--badge-bg': 'rgba(59,130,246,0.10)', '--badge-color': 'var(--blue)' }}>
            <span className="status-dot" /> Moving 9:10
          </div>
          <button type="button" className="link-button" onClick={() => openShipmentDrawer(shipmentsData[0])}>
            View Details <ChevronRight size={15} />
          </button>
        </div>
        <div className="route-line">Origin, 4th Ave <ChevronRight size={14} /> Senc Mulirarr, CA</div>
      </div>

      <div className="card table-card">
        <div className="panel-head">
          <h3>Shipments Table</h3>
          <input className="search-control" placeholder="Search by tracking ID or recipient" value={shipmentSearch} onChange={(event) => setShipmentSearch(event.target.value)} />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Recipient</th>
                <th>Status</th>
                <th>Location</th>
                <th>ETA</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredShipmentRows.map((shipment) => {
                const meta = getStatusMeta(shipment.status)
                return (
                  <tr key={shipment.id} onClick={() => openShipmentDrawer(shipment)}>
                    <td>{shipment.id}</td>
                    <td>{shipment.recipient}</td>
                    <td>
                      <span className="status-badge" style={{ '--badge-bg': meta.bg, '--badge-color': meta.color }}>
                        <span className="status-dot" /> {shipment.status}
                      </span>
                    </td>
                    <td>{shipment.location}</td>
                    <td>{shipment.eta}</td>
                    <td><ChevronRight size={16} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderLiveTrackingPage = () => (
    <div className="page-enter live-layout">
      <div className="card live-sidebar-panel">
        <div className="panel-head">
          <h3>Routes</h3>
          <span className="muted-line">4 active assignments</span>
        </div>
        <div className="route-card-list">
          {ROUTE_CARDS.map((route) => (
            <button key={route.id} type="button" className={selectedRoute === route.id ? 'route-card selected' : 'route-card'} onClick={() => setSelectedRoute(route.id)}>
              <div className="route-card-top">
                <div>
                  <div className="route-name">{route.driver}</div>
                  <div className="route-sub">{route.shipment}</div>
                </div>
                <span className="status-badge" style={{ '--badge-bg': getStatusMeta(route.status).bg, '--badge-color': getStatusMeta(route.status).color }}>
                  <span className="status-dot" /> {route.status}
                </span>
              </div>
              <div className="route-sub">ETA {route.eta}</div>
              <div className="progress-shell"><div className="progress-bar" style={{ width: `${route.progress}%`, background: route.color }} /></div>
            </button>
          ))}
        </div>
      </div>

      <div className="card live-map-panel">
        <div className="live-map-stage">
          <svg viewBox="0 0 500 400" className="live-map-svg">
            <rect x="24" y="44" width="120" height="60" rx="12" className="city-block" />
            <rect x="160" y="120" width="100" height="80" rx="12" className="city-block" />
            <rect x="292" y="86" width="108" height="62" rx="12" className="city-block" />
            <rect x="100" y="260" width="140" height="72" rx="12" className="city-block" />
            <rect x="298" y="248" width="112" height="70" rx="12" className="city-block" />
            {LIVE_TRACKING_PATHS.map((path) => (
              <path
                key={path.id}
                id={`route-${path.id}`}
                d={path.d}
                stroke={selectedRoute === path.id ? '#06B6D4' : 'rgba(59,130,246,0.3)'}
                strokeDasharray="6,4"
                strokeWidth="2"
                fill="none"
                className={selectedRoute === path.id ? 'glow-path' : ''}
              />
            ))}
          </svg>
          {LIVE_TRACKING_PATHS.map((path) => {
            const color = selectedRoute === path.id ? '#06B6D4' : 'rgba(59,130,246,0.45)'
            return (
              <div key={path.id} className={`van-base van-${path.id}`} style={{ opacity: selectedRoute === path.id ? 1 : 0.3 }}>
                <Truck size={20} color={color} />
              </div>
            )
          })}
        </div>

        <div className="card route-strip">
          <div>{ROUTE_CARDS[selectedRoute - 1].shipment}</div>
          <div>{ROUTE_CARDS[selectedRoute - 1].driver}</div>
          <div>{ROUTE_CARDS[selectedRoute - 1].origin} → {ROUTE_CARDS[selectedRoute - 1].dest}</div>
          <div>{ROUTE_CARDS[selectedRoute - 1].eta}</div>
          <div className="timeline-mini"><span className="filled" /><span className="filled" /><span className="filled" /><span /></div>
        </div>
      </div>
    </div>
  )

  const renderFleetMapPage = () => (
    <div className="page-enter fleet-layout">
      <div className="card fleet-sidebar-panel">
        <div className="panel-head">
          <h3>Agents</h3>
          <div className="chip-row">
            {['All', 'On-Time', 'Delayed', 'Idle'].map((filter) => (
              <button key={filter} type="button" className={agentFilter === filter ? 'chip active' : 'chip'} onClick={() => setAgentFilter(filter)}>
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="agent-list">
          {filteredAgents.map((agent) => (
            <button key={agent.id} type="button" className={selectedAgent === agent.id ? 'agent-card selected' : 'agent-card'} onClick={() => setSelectedAgent(agent.id)}>
              <div className="agent-accent" style={{ background: getAgentColor(agent.status) }} />
              <div className="agent-avatar">
                {agent.initials}
                <span className="agent-status-dot" style={{ background: getAgentColor(agent.status) }} />
              </div>
              <div className="agent-copy">
                <div className="agent-top-row">
                  <div>
                    <div className="agent-name">{agent.name}</div>
                    <div className="agent-id">{agent.id}</div>
                  </div>
                  <span className="status-badge" style={{ '--badge-bg': getStatusMeta(agent.status).bg, '--badge-color': getStatusMeta(agent.status).color }}>
                    <span className="status-dot" /> {agent.status}
                  </span>
                </div>
                <div className="agent-meta"><MapPin size={12} /> {agent.location}</div>
                <div className="agent-meta">{agent.shipment === 'None' ? 'No active shipment' : agent.shipment}</div>
                {agent.status !== 'idle' && <div className="eta-chip"><Clock size={12} /> {agent.eta}</div>}
              </div>
            </button>
          ))}
        </div>

        <div className="fleet-summary">
          <span><span className="summary-dot on" /> On-Time: 5</span>
          <span><span className="summary-dot delayed" /> Delayed: 2</span>
          <span><span className="summary-dot idle" /> Idle: 1</span>
          <span>Total: 8</span>
        </div>
      </div>

      <div className="card fleet-map-panel">
        <div className="fleet-controls">
          <button type="button" className="icon-button" onClick={() => setFleetZoom((current) => Math.min(2.4, current + 0.2))}>+</button>
          <button type="button" className="icon-button" onClick={() => setFleetZoom((current) => Math.max(1, current - 0.2))}>−</button>
          <button type="button" className="icon-button" onClick={() => { setFleetZoom(1); setSelectedAgent('A1') }}>⌖</button>
          <div className="card legend-card">
            <div><span className="summary-dot on" /> On-Time</div>
            <div><span className="summary-dot delayed" /> Delayed</div>
            <div><span className="summary-dot idle" /> Idle</div>
          </div>
        </div>
        <div className="fleet-map-stage">
          <svg viewBox={fleetViewBox} className="fleet-map-svg" preserveAspectRatio="xMidYMid meet">
            <line x1="40" y1="80" x2="560" y2="80" className="road-line" />
            <line x1="70" y1="160" x2="560" y2="160" className="road-line" />
            <line x1="30" y1="250" x2="520" y2="250" className="road-line" />
            <line x1="50" y1="360" x2="580" y2="360" className="road-line" />
            <line x1="100" y1="20" x2="100" y2="450" className="road-line" />
            <line x1="220" y1="20" x2="220" y2="450" className="road-line" />
            <line x1="360" y1="20" x2="360" y2="450" className="road-line" />
            <line x1="500" y1="20" x2="500" y2="450" className="road-line" />
            <rect x="42" y="42" width="82" height="50" rx="12" className="map-block" />
            <rect x="180" y="110" width="90" height="56" rx="12" className="map-block" />
            <rect x="300" y="180" width="76" height="60" rx="12" className="map-block" />
            <rect x="430" y="350" width="92" height="62" rx="12" className="map-block" />
            <rect x="120" y="300" width="104" height="66" rx="12" className="map-block" />
            <rect x="470" y="60" width="80" height="58" rx="12" className="map-block" />
            <rect x="250" y="360" width="100" height="56" rx="12" className="map-block" />
            {AGENTS.map((agent) => {
              const matchingFilter = agentFilter === 'All' || (agentFilter === 'On-Time' && agent.status === 'on-time') || (agentFilter === 'Delayed' && agent.status === 'delayed') || (agentFilter === 'Idle' && agent.status === 'idle')
              const selected = selectedAgent === agent.id
              const color = selected ? '#06B6D4' : getAgentColor(agent.status)
              return (
                <g key={agent.id} opacity={matchingFilter ? 1 : 0.2}>
                  {agent.status !== 'idle' && <line x1={agent.x} y1={agent.y} x2={agent.destX} y2={agent.destY} stroke={agent.status === 'on-time' ? '#22C55E' : '#EF4444'} strokeOpacity="0.4" strokeDasharray="8,5" />}
                  {agent.status !== 'idle' && <circle cx={agent.x} cy={agent.y} r={selected ? 28 : 22} stroke={color} fill="none" strokeWidth="2" className="pulse-ring" />}
                  <circle cx={agent.x} cy={agent.y} r={selected ? 18 : 14} fill={color} />
                  <text x={agent.x} y={agent.y + 3} textAnchor="middle" className="agent-svg-text">{agent.initials}</text>
                  {selected && (
                    <g>
                      <rect x={agent.x + 18} y={agent.y - 40} width="160" height="48" rx="12" fill="rgba(255,255,255,0.94)" />
                      <text x={agent.x + 30} y={agent.y - 20} className="agent-tooltip-text">{agent.name} • {agent.eta}</text>
                      <text x={agent.x + 30} y={agent.y - 4} className="agent-tooltip-sub">{agent.shipment}</text>
                    </g>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </div>
  )

  const renderShipmentsImportPage = () => (
    <div className="page-enter">
      <label
        className="card upload-zone"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          handleCsvFile(event.dataTransfer.files[0])
        }}
      >
        <Upload size={34} />
        <div className="upload-title">Drop your CSV file here</div>
        <div className="upload-sub">or click to browse</div>
        <input type="file" accept=".csv" className="hidden-input" onChange={(event) => handleCsvFile(event.target.files?.[0])} />
      </label>

      {csvRows.length > 0 && (
        <div className="card import-preview">
          <div className="panel-head">
            <h3>Preview — First 5 Rows</h3>
            <span className="muted-line">{csvRows.length} rows detected</span>
          </div>
          <div className="mapping-grid">
            {[
              ['Tracking ID', 'trackingId'],
              ['Recipient', 'recipient'],
              ['Origin', 'origin'],
              ['Dest', 'dest'],
              ['Status', 'status'],
            ].map(([label, key]) => (
              <div key={key}>
                <div className="input-label">{label}</div>
                <select className="select-control" value={columnMap[key]} onChange={(event) => setColumnMap((current) => ({ ...current, [key]: event.target.value }))}>
                  {Object.keys(csvRows[0] || {}).map((header) => <option key={header}>{header}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {Object.keys(csvRows[0] || {}).map((header) => <th key={header}>{header}</th>)}
                </tr>
              </thead>
              <tbody>
                {csvRows.slice(0, 5).map((row, index) => (
                  <tr key={`${csvFile?.name || 'csv'}-${index}`}>
                    {Object.values(row).map((value, valueIndex) => <td key={`${index}-${valueIndex}`}>{value}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" className="primary-button" onClick={handleImportShipments}>
            {importing ? 'Importing...' : `Import ${csvRows.length} Shipments`}
          </button>
        </div>
      )}
    </div>
  )

  const renderDriversAssignmentsPage = () => (
    <div className="page-enter assignments-layout">
      <div className="card assignments-left">
        <h3>Unassigned Shipments</h3>
        <div className="assign-list">
          {unassignedShipments.map((shipment) => (
            <div key={shipment.id} className="assign-card">
              <div className="assign-card-top">
                <div>
                  <div className="route-name">{shipment.id}</div>
                  <div className="route-sub">{shipment.destination}</div>
                </div>
                <span className={`priority-badge ${getPriorityClass(shipment.priority)}`}>{shipment.priority}</span>
              </div>
              <button type="button" className="link-button small" onClick={() => setAssignmentMenu(assignmentMenu === shipment.id ? '' : shipment.id)}>
                Assign Driver <ChevronRight size={14} />
              </button>
              {assignmentMenu === shipment.id && (
                <div className="assignment-menu">
                  {driverCards.filter((driver) => driver.status === 'Available').map((driver) => (
                    <button key={driver.id} type="button" className="assignment-option" onClick={() => assignShipmentToDriver(shipment.id, driver.name)}>
                      {driver.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="assignments-right">
        <div className="driver-grid">
          {driverCards.map((driver) => (
            <div key={driver.id} className="card driver-card">
              <div className="driver-head">
                <div className="avatar-lg small">{driver.initials}</div>
                <div>
                  <div className="route-name">{driver.name}</div>
                  <span className="status-badge" style={{ '--badge-bg': getStatusMeta(driver.status).bg, '--badge-color': getStatusMeta(driver.status).color }}>
                    <span className="status-dot" /> {driver.status}
                  </span>
                </div>
              </div>
              <div className="route-sub">Current Load: {driver.load} shipments</div>
              <div className="tag-row">
                {driver.assigned.map((shipmentId) => <span key={shipmentId} className="tiny-tag">{shipmentId}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div className="card assigned-today-card">
          <h3>Assigned Today</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Shipment</th>
                  <th>Driver</th>
                  <th>Destination</th>
                </tr>
              </thead>
              <tbody>
                {assignedToday.map((row) => (
                  <tr key={`${row.shipmentId}-${row.driverName}`}>
                    <td>{row.shipmentId}</td>
                    <td>{row.driverName}</td>
                    <td>{row.destination}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )

  const renderReportsOverviewPage = () => (
    <div className="page-enter overview-grid">
      <div className="card">
        <div className="panel-head"><h3>Monthly Throughput</h3><Zap size={16} /></div>
        <OverviewAreaChartPanel />
      </div>
      <div className="card">
        <div className="panel-head"><h3>Status Split</h3><Filter size={16} /></div>
        <OverviewStatusPie />
      </div>
    </div>
  )

  const renderReportsPerformancePage = () => (
    <div className="page-enter">
      <div className="chip-row reports-periods">
        {REPORT_PERIODS.map((period) => (
          <button key={period} type="button" className={reportsPeriod === period ? 'chip active' : 'chip'} onClick={() => setReportsPeriod(period)}>
            {period}
          </button>
        ))}
      </div>

      <div className="kpi-grid reports-kpis">
        {REPORT_KPIS[reportsPeriod].map((item) => {
          const TrendIcon = item.trend === 'up' ? ArrowUp : ArrowDown
          return (
            <div key={item.label} className="card report-kpi-card">
              <div className="panel-head">
                <div className="kpi-label">{item.label}</div>
                <TrendIcon size={16} color={item.trend === 'up' ? '#22C55E' : '#EF4444'} />
              </div>
              <div className="orbitron report-kpi-value">{item.value}</div>
              <div className="muted-line">{item.note}</div>
            </div>
          )
        })}
      </div>

      <div className="reports-chart-grid">
        <div className="card">
          <h3>Delivery Time Trend</h3>
          <ReportsLinePanel data={REPORT_LINE_DATA[reportsPeriod]} />
        </div>
        <div className="card">
          <h3>On-Time vs Delayed by Driver</h3>
          <ReportsBarPanel data={REPORT_BAR_DATA[reportsPeriod]} />
        </div>
      </div>

      <div className="card">
        <h3>Driver Performance Table</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {[
                  ['Rank', 'rank'],
                  ['Driver', 'driver'],
                  ['Deliveries', 'deliveries'],
                  ['On-Time %', 'onTime'],
                  ['Avg Time', 'avgTime'],
                  ['Rating', 'rating'],
                  ['Trend', 'trend'],
                ].map(([label, key]) => (
                  <th key={key}>
                    <button type="button" className="sort-button" onClick={() => requestSort(key)}>
                      {label}
                      {sortConfig.key === key ? (sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />) : null}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedPerformanceRows.map((row) => (
                <tr key={`${reportsPeriod}-${row.driver}`}>
                  <td>{row.rank}</td>
                  <td>{row.driver}</td>
                  <td>{row.deliveries}</td>
                  <td>{row.onTime}%</td>
                  <td>{row.avgTime}</td>
                  <td>{'★★★★★'.slice(0, row.rating)}{'☆☆☆☆☆'.slice(0, 5 - row.rating)}</td>
                  <td>{row.trend === 'up' ? '↑' : '↓'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderReportsExportPage = () => (
    <div className="page-enter export-grid">
      <div className="card export-card">
        <h3>Shipments Report</h3>
        <div className="inline-grid">
          <input className="input-control" type="date" value={exportDates.from} onChange={(event) => setExportDates((current) => ({ ...current, from: event.target.value }))} />
          <input className="input-control" type="date" value={exportDates.to} onChange={(event) => setExportDates((current) => ({ ...current, to: event.target.value }))} />
        </div>
        <div className="checkbox-list">
          {Object.keys(exportStatuses).map((status) => (
            <label key={status} className="check-row">
              <input type="checkbox" checked={exportStatuses[status]} onChange={() => toggleExportStatus(status)} />
              <span>{status}</span>
            </label>
          ))}
        </div>
        <div className="radio-row">
          {['CSV', 'JSON'].map((format) => (
            <label key={format} className="check-row">
              <input type="radio" name="format" checked={exportFormat === format} onChange={() => setExportFormat(format)} />
              <span>{format}</span>
            </label>
          ))}
        </div>
        <button type="button" className="primary-button" onClick={() => (exportFormat === 'CSV' ? exportCSV(shipmentExportRows, 'shipments-report.csv') : exportJSON(shipmentExportRows, 'shipments-report.json'))}>
          <Download size={16} /> Download Report
        </button>
      </div>

      <div className="card export-card">
        <h3>Driver Performance Report</h3>
        <div className="checkbox-list">
          {EXPORT_DRIVER_OPTIONS.map((driver) => (
            <label key={driver} className="check-row">
              <input type="checkbox" checked={selectedDrivers.includes(driver)} onChange={() => toggleDriverSelection(driver)} />
              <span>{driver}</span>
            </label>
          ))}
        </div>
        <div className="chip-row">
          {REPORT_PERIODS.map((period) => (
            <button key={period} type="button" className={driverExportPeriod === period ? 'chip active' : 'chip'} onClick={() => setDriverExportPeriod(period)}>
              {period}
            </button>
          ))}
        </div>
        <button type="button" className="primary-button" onClick={() => exportCSV(driverExportRows, 'driver-performance.csv')}>
          <Download size={16} /> Download Report
        </button>
      </div>

      <div className="card export-card soon-card">
        <div className="coming-soon">Coming Soon</div>
        <h3>Financial Summary</h3>
        <div className="blurred-copy">
          <div className="orbitron report-kpi-value">$148,320</div>
          <div className="muted-line">Revenue, margin, and payout rollups</div>
        </div>
      </div>

      <div className="card export-card">
        <h3>Custom Report Builder</h3>
        <div className="drag-list">
          {customColumns.map((column, index) => (
            <div
              key={column}
              className={dragIndex === index ? 'drag-item dragging' : 'drag-item'}
              onMouseDown={() => handleColumnMouseDown(index)}
              onMouseEnter={() => handleColumnMouseEnter(index)}
            >
              {column}
            </div>
          ))}
        </div>
        <button type="button" className="primary-button" onClick={() => setPreviewVisible(true)}>
          Generate Preview
        </button>
        {previewVisible && (
          <div className="table-wrap preview-table">
            <table>
              <thead>
                <tr>{customColumns.map((column) => <th key={column}>{column}</th>)}</tr>
              </thead>
              <tbody>
                {customPreviewRows.map((row) => (
                  <tr key={Object.values(row).join('-')}>
                    {customColumns.map((column) => <td key={`${Object.values(row).join('-')}-${column}`}>{row[column]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )

  const renderAppearancePage = () => (
    <div className="page-enter settings-grid">
      <div className="card">
        <h3>Appearance</h3>
        <div className="theme-toggle-grid">
          <button type="button" className={darkMode ? 'theme-option active' : 'theme-option'} onClick={() => setDarkMode(true)}>
            <Moon size={24} />
            <div>Dark Mode</div>
            {darkMode && <CheckCircle2 size={16} />}
          </button>
          <button type="button" className={!darkMode ? 'theme-option active' : 'theme-option'} onClick={() => setDarkMode(false)}>
            <Sun size={24} />
            <div>Light Mode</div>
            {!darkMode && <CheckCircle2 size={16} />}
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Accent Color</h3>
        <div className="swatch-row">
          {APPEARANCE_SWATCHES.map((color) => (
            <button key={color} type="button" className={accentColor === color ? 'swatch active' : 'swatch'} style={{ background: color }} onClick={() => setAccentColor(color)} />
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Sidebar Mode</h3>
        <div className="chip-row">
          <button type="button" className={sidebarCompact ? 'chip' : 'chip active'} onClick={() => setSidebarCompact(false)}>Full (icons + labels)</button>
          <button type="button" className={sidebarCompact ? 'chip active' : 'chip'} onClick={() => setSidebarCompact(true)}>Compact (icons only)</button>
        </div>
      </div>

      <div className="card">
        <h3>Font Size</h3>
        <div className="chip-row">
          {Object.keys(FONT_SIZES).map((size) => (
            <button key={size} type="button" className={fontSizeLabel === size ? 'chip active' : 'chip'} onClick={() => setFontSizeLabel(size)}>
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSimpleCardPage = (title, body, buttonLabel, buttonAction) => (
    <div className="page-enter">
      <div className="card simple-page-card">
        <h3>{title}</h3>
        <p>{body}</p>
        {buttonLabel && <button type="button" className="primary-button" onClick={buttonAction}>{buttonLabel}</button>}
      </div>
    </div>
  )

  const renderShipmentsAllPage = () => (
    <div className="page-enter">
      <div className="card">
        <div className="panel-head">
          <div className="chip-row">
            {['All', 'Delivered', 'In Transit', 'Delayed', 'Out for Delivery'].map((item) => (
              <button key={item} type="button" className={shipmentFilter === item ? 'chip active' : 'chip'} onClick={() => setShipmentFilter(item)}>
                {item}
              </button>
            ))}
          </div>
          <input className="search-control" placeholder="Search shipments" value={shipmentSearch} onChange={(event) => setShipmentSearch(event.target.value)} />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Recipient</th>
                <th>Status</th>
                <th>Origin</th>
                <th>Dest</th>
                <th>Driver</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipmentRows.map((shipment) => {
                const meta = getStatusMeta(shipment.status)
                return (
                  <tr key={shipment.id} onClick={() => openShipmentDrawer(shipment)}>
                    <td>{shipment.id}</td>
                    <td>{shipment.recipient}</td>
                    <td>
                      <span className="status-badge" style={{ '--badge-bg': meta.bg, '--badge-color': meta.color }}>
                        <span className="status-dot" /> {shipment.status}
                      </span>
                    </td>
                    <td>{shipment.origin}</td>
                    <td>{shipment.dest}</td>
                    <td>{shipment.driver}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderDriversAllPage = () => (
    <div className="page-enter">
      <div className="driver-grid">
        {driverCards.map((driver) => (
          <div key={driver.id} className="card driver-card">
            <div className="driver-head">
              <div className="avatar-lg small">{driver.initials}</div>
              <div>
                <div className="route-name">{driver.name}</div>
                <div className="route-sub">{driver.id}</div>
              </div>
            </div>
            <span className="status-badge" style={{ '--badge-bg': getStatusMeta(driver.status).bg, '--badge-color': getStatusMeta(driver.status).color }}>
              <span className="status-dot" /> {driver.status}
            </span>
            <div className="route-sub">Current Load: {driver.load} shipments</div>
            <div className="tag-row">{driver.assigned.map((shipmentId) => <span key={shipmentId} className="tiny-tag">{shipmentId}</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return renderDashboardPage()
      case 'live-tracking':
        return renderLiveTrackingPage()
      case 'fleet-map':
        return renderFleetMapPage()
      case 'shipments-all':
        return renderShipmentsAllPage()
      case 'shipments-create':
        return renderSimpleCardPage('Create Shipment', 'Create a new manual shipment entry for dispatch. The fields below write directly into the in-memory shipment state.', 'Create Shipment', handleCreateShipment)
      case 'shipments-import':
        return renderShipmentsImportPage()
      case 'drivers-all':
        return renderDriversAllPage()
      case 'drivers-add':
        return renderSimpleCardPage('Add Driver', 'Driver creation is available in this SPA shell through the live draft card below.', null, null)
      case 'drivers-assignments':
        return renderDriversAssignmentsPage()
      case 'reports-overview':
        return renderReportsOverviewPage()
      case 'reports-performance':
        return renderReportsPerformancePage()
      case 'reports-export':
        return renderReportsExportPage()
      case 'settings-appearance':
        return renderAppearancePage()
      case 'settings-profile':
        return renderSimpleCardPage('Profile', `${profileDraft.name} • ${profileDraft.email} • ${profileDraft.role}`, null, null)
      case 'settings-notifications':
        return renderSimpleCardPage('Notifications', 'Notification rules and dispatch alerts can be managed here.', null, null)
      case 'settings-integrations':
        return renderSimpleCardPage('Integrations', 'Webhook, ERP, and WMS connectors belong in this section.', null, null)
      case 'settings-security':
        return renderSimpleCardPage('Security', 'Session controls, MFA, and audit settings belong in this section.', null, null)
      default:
        return renderDashboardPage()
    }
  }

  return (
    <div
      className="app-root"
      style={{
        backgroundImage: 'url(/back.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
      }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Exo+2:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * {
          font-family: 'Exo 2', 'Segoe UI', sans-serif !important;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        .orbitron {
          font-family: 'Orbitron', 'Courier New', monospace !important;
        }
        :root {
          --blue: #3B82F6;
          --green: #22C55E;
          --amber: #F59E0B;
          --red: #EF4444;
          --cyan: #06B6D4;
          --bg-card: rgba(10, 14, 26, 0.80);
          --bg-sidebar: rgba(8, 11, 22, 0.94);
          --text-1: #F1F5F9;
          --text-2: #94A3B8;
          --border: rgba(255,255,255,0.07);
        }
        body.light {
          --bg-card: rgba(255,255,255,0.85);
          --bg-sidebar: rgba(235,240,255,0.96);
          --text-1: #0F172A;
          --text-2: #475569;
          --border: rgba(0,0,0,0.08);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes agentPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes van1 { 0% { offset-distance: 0% } 100% { offset-distance: 100% } }
        @keyframes van2 { 0% { offset-distance: 0% } 100% { offset-distance: 100% } }
        @keyframes van3 { 0% { offset-distance: 0% } 100% { offset-distance: 100% } }
        @keyframes van4 { 0% { offset-distance: 0% } 100% { offset-distance: 100% } }
        body, html, #root {
          min-height: 100%;
          background: #040712;
          color: var(--text-1);
        }
        button, input, select {
          color: inherit;
          border: 0;
          outline: none;
          background: none;
        }
        .app-root {
          width: 100%;
          color: var(--text-1);
        }
        .page-enter { animation: fadeIn 120ms ease-out forwards; }
        .card {
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 20px 40px rgba(2, 8, 23, 0.2);
        }
        .card:hover { border-color: rgba(59,130,246,0.25); transition: border-color 200ms; }
        .sidebar {
          background: var(--bg-sidebar);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-right: 1px solid var(--border);
          width: 240px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 24px 16px;
          flex-shrink: 0;
          position: sticky;
          top: 0;
        }
        .sidebar.compact {
          width: 60px;
          padding: 24px 10px;
        }
        .app-main {
          flex: 1;
          min-width: 0;
          padding: 24px;
          background: rgba(1, 6, 18, 0.38);
        }
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        .page-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--text-1);
        }
        .sidebar-logo {
          display: grid;
          gap: 2px;
          margin-bottom: 24px;
        }
        .logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .logo-wordmark {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
        }
        .sidebar.compact .logo-wordmark,
        .sidebar.compact .tagline,
        .sidebar.compact .nav-label,
        .sidebar.compact .nav-arrow,
        .sidebar.compact .sub-nav,
        .sidebar.compact .user-meta {
          display: none;
        }
        .tagline {
          color: #64748B;
          font-size: 10px;
          letter-spacing: 0.08em;
          margin-left: 34px;
        }
        .nav-list {
          display: grid;
          gap: 6px;
          flex: 1;
        }
        .nav-button, .sub-nav-button, .topbar-icons .icon-button, .profile-button {
          cursor: pointer;
          transition: background 160ms ease, color 160ms ease;
        }
        .nav-button {
          width: 100%;
          border-radius: 999px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--text-2);
        }
        .nav-button.active {
          background: rgba(59,130,246,0.24);
          color: #fff;
        }
        .nav-button:hover, .sub-nav-button:hover, .icon-button:hover, .profile-button:hover {
          background: rgba(255,255,255,0.05);
          color: var(--text-1);
        }
        .nav-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sub-nav {
          display: grid;
          gap: 4px;
          margin-top: 6px;
          padding-left: 16px;
        }
        .sub-nav-button {
          width: 100%;
          text-align: left;
          padding: 8px 12px;
          font-size: 13px;
          color: var(--text-2);
          border-radius: 10px;
        }
        .sub-nav-button.active {
          color: #fff;
          background: rgba(59,130,246,0.12);
        }
        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.03);
        }
        .avatar-circle, .avatar-lg, .agent-avatar {
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, var(--blue), var(--cyan));
          position: relative;
          flex-shrink: 0;
        }
        .avatar-circle { width: 38px; height: 38px; }
        .avatar-lg { width: 52px; height: 52px; font-size: 18px; }
        .avatar-lg.small { width: 42px; height: 42px; font-size: 14px; }
        .user-name { font-weight: 600; color: var(--text-1); }
        .user-role { font-size: 12px; color: var(--text-2); }
        .topbar-icons {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .icon-button, .profile-button {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.04);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .notif-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          min-width: 18px;
          height: 18px;
          border-radius: 999px;
          font-size: 10px;
          background: var(--red);
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
        }
        .content-stack {
          display: grid;
          gap: 20px;
        }
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }
        .kpi-card {
          text-align: left;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .kpi-head {
          display: flex;
          align-items: center;
          gap: 14px;
          position: relative;
          z-index: 1;
        }
        .kpi-icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: color-mix(in srgb, var(--kpi-color) 18%, transparent);
          color: var(--kpi-color);
          flex-shrink: 0;
        }
        .kpi-label, .muted-line, .route-sub, .input-label {
          color: var(--text-2);
          font-size: 14px;
        }
        .kpi-number {
          font-size: 42px;
          line-height: 1;
          font-weight: 900;
          margin-top: 6px;
        }
        .wave-svg {
          width: calc(100% + 40px);
          height: 60px;
          margin: 14px -20px -20px;
        }
        .dashboard-grid, .reports-chart-grid, .overview-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 0.8fr;
          gap: 16px;
        }
        .chart-card {
          min-height: 360px;
        }
        .right-stack {
          display: grid;
          gap: 16px;
        }
        .panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 18px;
        }
        h3 {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-1);
        }
        .select-control, .search-control, .input-control {
          border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.04);
          padding: 10px 12px;
          color: var(--text-1);
        }
        .search-control {
          width: 300px;
        }
        .chart-tooltip {
          background: rgba(8, 11, 22, 0.92);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 12px;
          backdrop-filter: blur(18px);
        }
        .tooltip-title {
          font-size: 13px;
          color: #fff;
          margin-bottom: 8px;
        }
        .tooltip-row {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          color: #CBD5E1;
          font-size: 12px;
        }
        .map-preview-card {
          cursor: pointer;
          text-align: left;
          background-color: #080C18;
          background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 24px 24px;
          position: relative;
          overflow: hidden;
        }
        .map-preview-grid {
          height: 300px;
          position: relative;
        }
        .map-svg, .live-map-svg, .fleet-map-svg {
          width: 100%;
          height: 100%;
        }
        .map-hover {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(59,130,246,0.14);
          color: #fff;
          opacity: 0;
          transition: opacity 160ms ease;
          font-weight: 700;
        }
        .map-preview-card:hover .map-hover {
          opacity: 1;
        }
        .eta-pill {
          position: absolute;
          padding: 8px 12px;
          border-radius: 999px;
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.08);
          color: #fff;
          font-size: 12px;
        }
        .eta-pill-top { top: 22px; right: 18px; }
        .eta-pill-bottom { bottom: 20px; left: 18px; background: rgba(245,158,11,0.2); }
        .stat-card {
          display: grid;
          gap: 10px;
        }
        .stat-number, .report-kpi-value {
          font-size: 38px;
          line-height: 1;
          font-weight: 900;
        }
        .sub-note {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-2);
          font-size: 13px;
        }
        .chip-row, .radio-row, .tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .chip {
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.04);
          font-size: 13px;
          cursor: pointer;
          color: var(--text-2);
        }
        .chip.active {
          background: rgba(59,130,246,0.18);
          color: #fff;
          border-color: rgba(59,130,246,0.3);
        }
        .active-shipment-card {
          display: grid;
          gap: 16px;
        }
        .shipment-hero {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .shipment-hero-copy {
          display: grid;
          gap: 4px;
        }
        .shipment-id-row {
          display: flex;
          gap: 18px;
          align-items: center;
          font-size: 20px;
          font-weight: 700;
        }
        .shipment-owner {
          color: var(--text-1);
          font-size: 20px;
          font-weight: 700;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          background: var(--badge-bg);
          color: var(--badge-color);
          font-size: 13px;
          white-space: nowrap;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: currentColor;
        }
        .link-button, .primary-button, .assignment-option {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
        }
        .link-button {
          margin-left: auto;
          color: #fff;
          background: rgba(255,255,255,0.06);
        }
        .link-button.small {
          margin-left: 0;
        }
        .primary-button {
          background: var(--blue);
          color: white;
        }
        .route-line {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--text-2);
        }
        .table-wrap {
          overflow: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          text-align: left;
          padding: 14px 10px;
          border-bottom: 1px solid var(--border);
          font-size: 14px;
        }
        th {
          color: var(--text-2);
          font-weight: 600;
        }
        tr:hover { background: rgba(255,255,255,0.04) !important; cursor: pointer; }
        .live-layout, .fleet-layout, .assignments-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 16px;
        }
        .live-sidebar-panel, .fleet-sidebar-panel {
          min-height: 640px;
        }
        .route-card-list, .assign-list, .agent-list {
          display: grid;
          gap: 12px;
        }
        .route-card, .assign-card, .agent-card {
          width: 100%;
          text-align: left;
          border-radius: 14px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.03);
          padding: 14px;
          position: relative;
          cursor: pointer;
        }
        .route-card.selected, .agent-card.selected {
          border-color: rgba(6,182,212,0.45);
          box-shadow: 0 0 0 1px rgba(6,182,212,0.25) inset;
        }
        .route-card-top, .driver-head, .assign-card-top, .agent-top-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }
        .route-name, .agent-name {
          color: var(--text-1);
          font-weight: 600;
          font-size: 15px;
        }
        .progress-shell {
          width: 100%;
          height: 8px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          margin-top: 12px;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          border-radius: inherit;
        }
        .live-map-panel, .fleet-map-panel {
          min-height: 640px;
          position: relative;
        }
        .live-map-stage, .fleet-map-stage {
          position: relative;
          min-height: 540px;
          background-color: #080C18;
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 30px 30px;
          border-radius: 14px;
          overflow: hidden;
        }
        .city-block, .map-block {
          fill: rgba(71,85,105,0.18);
        }
        .glow-path {
          filter: drop-shadow(0 0 8px rgba(6,182,212,0.55));
        }
        .route-strip {
          margin-top: 16px;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
          align-items: center;
        }
        .timeline-mini {
          display: flex;
          gap: 8px;
        }
        .timeline-mini span {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: transparent;
        }
        .timeline-mini .filled {
          background: var(--blue);
          border-color: var(--blue);
        }
        .van-base {
          position: absolute;
          width: 20px;
          height: 20px;
          animation-duration: 5s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .van-1 { offset-path: path('M 40,300 C 100,260 160,180 240,140 C 300,110 340,130 380,100'); animation-name: van1; animation-delay: 0s; }
        .van-2 { offset-path: path('M 60,320 C 130,280 200,220 270,180 C 320,150 360,160 400,120'); animation-name: van2; animation-delay: 1.25s; }
        .van-3 { offset-path: path('M 30,280 C 90,240 150,200 220,170 C 280,145 330,155 390,110'); animation-name: van3; animation-delay: 2.5s; }
        .van-4 { offset-path: path('M 50,310 C 110,270 180,210 250,165 C 310,130 355,145 395,105'); animation-name: van4; animation-delay: 3.75s; }
        .agent-list {
          overflow: auto;
          max-height: 530px;
          padding-right: 4px;
        }
        .agent-card {
          display: flex;
          gap: 12px;
          overflow: hidden;
        }
        .agent-accent {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
        }
        .agent-avatar {
          width: 36px;
          height: 36px;
          font-size: 12px;
        }
        .agent-status-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: 2px solid #080C18;
          position: absolute;
          right: -1px;
          bottom: -1px;
        }
        .agent-copy {
          flex: 1;
          min-width: 0;
          display: grid;
          gap: 6px;
        }
        .agent-id, .agent-meta {
          color: var(--text-2);
          font-size: 12px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .eta-chip, .tiny-tag, .priority-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-radius: 999px;
          padding: 6px 10px;
          font-size: 11px;
          background: rgba(255,255,255,0.06);
          color: var(--text-1);
        }
        .fleet-summary {
          position: sticky;
          bottom: 0;
          margin-top: 12px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px 14px;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          font-size: 12px;
        }
        .summary-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          display: inline-block;
          margin-right: 6px;
        }
        .summary-dot.on { background: var(--green); }
        .summary-dot.delayed { background: var(--red); }
        .summary-dot.idle { background: #94A3B8; }
        .road-line {
          stroke: #1E293B;
          stroke-width: 1;
        }
        .pulse-ring {
          transform-origin: center;
          animation: agentPulse 1.8s linear infinite;
        }
        .agent-svg-text {
          fill: white;
          font-size: 10px;
          font-weight: 700;
        }
        .agent-tooltip-text {
          fill: #0F172A;
          font-size: 11px;
          font-weight: 700;
        }
        .agent-tooltip-sub {
          fill: #475569;
          font-size: 10px;
        }
        .fleet-controls {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 2;
          display: grid;
          gap: 10px;
        }
        .legend-card {
          padding: 12px;
          font-size: 12px;
          display: grid;
          gap: 8px;
        }
        .upload-zone {
          border: 2px dashed #3B82F6;
          min-height: 250px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          text-align: center;
        }
        .upload-title {
          font-size: 22px;
          font-weight: 700;
        }
        .upload-sub {
          color: var(--blue);
        }
        .hidden-input {
          display: none;
        }
        .import-preview, .simple-page-card {
          display: grid;
          gap: 16px;
        }
        .mapping-grid, .inline-grid, .settings-grid, .export-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        .assignments-right {
          display: grid;
          gap: 16px;
        }
        .driver-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .driver-card {
          display: grid;
          gap: 12px;
        }
        .assigned-today-card, .reports-kpis {
          margin-top: 16px;
        }
        .assignment-menu {
          margin-top: 12px;
          display: grid;
          gap: 8px;
        }
        .assignment-option {
          background: rgba(255,255,255,0.04);
        }
        .priority-normal { background: rgba(59,130,246,0.14); color: var(--blue); }
        .priority-express { background: rgba(245,158,11,0.14); color: var(--amber); }
        .priority-same-day { background: rgba(239,68,68,0.14); color: var(--red); }
        .sort-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: inherit;
          cursor: pointer;
        }
        .checkbox-list {
          display: grid;
          gap: 10px;
          margin: 16px 0;
        }
        .check-row {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--text-1);
        }
        .soon-card {
          position: relative;
          overflow: hidden;
        }
        .coming-soon {
          position: absolute;
          top: 18px;
          right: 18px;
          background: rgba(245,158,11,0.18);
          color: var(--amber);
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          z-index: 1;
        }
        .blurred-copy {
          filter: blur(1.2px);
          opacity: 0.52;
          margin-top: 16px;
        }
        .drag-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 16px 0;
        }
        .drag-item {
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.05);
          cursor: grab;
          user-select: none;
        }
        .drag-item.dragging {
          opacity: 0.5;
        }
        .preview-table {
          margin-top: 16px;
        }
        .theme-toggle-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-top: 16px;
        }
        .theme-option {
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px;
          display: grid;
          gap: 10px;
          justify-items: start;
          cursor: pointer;
          background: rgba(255,255,255,0.04);
        }
        .theme-option.active {
          border-color: rgba(59,130,246,0.5);
          box-shadow: 0 0 0 1px rgba(59,130,246,0.24) inset;
        }
        .swatch-row {
          display: flex;
          gap: 14px;
          margin-top: 16px;
        }
        .swatch {
          width: 32px;
          height: 32px;
          border-radius: 999px;
          border: 2px solid transparent;
          cursor: pointer;
        }
        .swatch.active {
          border-color: white;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.35);
        }
        .drawer-backdrop, .search-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          z-index: 40;
        }
        .drawer-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 420px;
          max-width: 100%;
          height: 100vh;
          z-index: 41;
          transform: translateX(0);
          transition: transform 250ms ease;
          overflow: auto;
        }
        .drawer-content {
          display: grid;
          gap: 18px;
        }
        .drawer-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }
        .timeline-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
        }
        .timeline-step {
          display: grid;
          gap: 8px;
          justify-items: start;
          color: var(--text-2);
          font-size: 12px;
        }
        .timeline-step-dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          border: 1px solid var(--border);
        }
        .timeline-step-dot.filled {
          background: var(--blue);
          border-color: var(--blue);
        }
        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .detail-item {
          padding: 12px;
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
        }
        .detail-label {
          color: var(--text-2);
          font-size: 12px;
          margin-bottom: 6px;
        }
        .drawer-actions {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }
        .drawer-title {
          font-size: 24px;
          font-weight: 800;
        }
        .search-overlay {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 80px 24px 24px;
        }
        .search-card {
          width: min(760px, 100%);
          display: grid;
          gap: 16px;
        }
        .search-input-lg {
          width: 100%;
          height: 48px;
          border-radius: 14px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.08);
          padding: 0 16px;
          font-size: 18px;
        }
        .search-result {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          width: 100%;
          text-align: left;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          cursor: pointer;
        }
        .notif-anchor {
          position: relative;
        }
        .notif-dropdown {
          position: absolute;
          top: 48px;
          right: 0;
          width: 320px;
          z-index: 30;
          display: grid;
          gap: 12px;
        }
        .notif-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .notif-copy {
          flex: 1;
          display: grid;
          gap: 4px;
        }
        .notif-title {
          font-weight: 700;
        }
        .notif-desc, .notif-time {
          color: var(--text-2);
          font-size: 12px;
        }
        .notif-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .toast-stack {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 60;
          display: grid;
          gap: 10px;
        }
        .toast {
          min-width: 260px;
          border-left: 4px solid var(--blue);
          background: rgba(8,11,22,0.9);
          color: #fff;
          border-radius: 12px;
          padding: 12px 14px;
          transform: translateX(0);
        }
        .toast.success { border-left-color: var(--green); }
        .toast.error { border-left-color: var(--red); }
        .toast.info { border-left-color: var(--blue); }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        .field-stack {
          display: grid;
          gap: 8px;
        }
        .simple-page-card p {
          color: var(--text-2);
          line-height: 1.6;
        }
        @media (max-width: 1180px) {
          .kpi-grid,
          .dashboard-grid,
          .driver-grid,
          .reports-chart-grid,
          .overview-grid,
          .export-grid,
          .settings-grid {
            grid-template-columns: 1fr;
          }
          .live-layout,
          .fleet-layout,
          .assignments-layout {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 820px) {
          .app-root {
            flex-direction: column;
          }
          .sidebar, .sidebar.compact {
            width: 100%;
            min-height: auto;
            position: relative;
          }
          .app-main {
            padding: 18px;
          }
          .topbar {
            flex-direction: column;
            align-items: flex-start;
          }
          .search-control {
            width: 100%;
          }
          .route-strip, .drawer-actions, .details-grid, .form-grid, .mapping-grid, .inline-grid, .theme-toggle-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <aside className={sidebarClassName}>
        <div className="sidebar-logo">
          <div className="logo-row">
            <Navigation size={22} color="#3B82F6" />
            {!sidebarCompact && <span className="logo-wordmark orbitron">Trace360</span>}
          </div>
          {!sidebarCompact && <div className="tagline">Track Smarter. Deliver Faster.</div>}
        </div>

        <nav className="nav-list">
          {SIDEBAR_GROUPS.map((item) => {
            const Icon = item.icon
            const active = item.page ? page === item.page : getPageGroupActive(page, item.key)
            return (
              <div key={item.key}>
                <button type="button" className={active ? 'nav-button active' : 'nav-button'} onClick={() => (item.children ? toggleSidebarGroup(item.key) : openPage(item.page))}>
                  <span className="nav-left">
                    <Icon size={18} />
                    <span className="nav-label">{item.label}</span>
                  </span>
                  {item.children && !sidebarCompact && (
                    <span className="nav-arrow">{sidebarOpen[item.key] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
                  )}
                </button>
                {item.children && sidebarOpen[item.key] && !sidebarCompact && (
                  <div className="sub-nav">
                    {item.children.map((child) => (
                      <button key={child.page} type="button" className={page === child.page ? 'sub-nav-button active' : 'sub-nav-button'} onClick={() => openPage(child.page)}>
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="sidebar-user">
          <div className="avatar-circle">M</div>
          {!sidebarCompact && (
            <>
              <div className="user-meta">
                <div className="user-name">Michael H...</div>
                <div className="user-role">Admin</div>
              </div>
              <button type="button" className="profile-button">
                <ChevronRight size={15} />
              </button>
            </>
          )}
        </div>
      </aside>

      <main className="app-main">
        <header className="topbar">
          <div className="page-title">{pageTitle}</div>
          <div className="topbar-icons">
            <button type="button" className="icon-button" onClick={() => setSearchOpen(true)}>
              <Search size={18} />
            </button>
            <button type="button" className="icon-button" onClick={() => setDarkMode((current) => !current)}>
              {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <div className="notif-anchor">
              <button type="button" className="icon-button" onClick={() => setNotifOpen((current) => !current)}>
                <Bell size={18} />
                <span className="notif-badge">3</span>
              </button>
              {notifOpen && (
                <div className="card notif-dropdown">
                  {NOTIFICATIONS.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.id} className="notif-item">
                        <Icon size={18} color={item.color} />
                        <div className="notif-copy">
                          <div className="notif-title">{item.title}</div>
                          <div className="notif-desc">{item.desc}</div>
                          <div className="notif-time">{item.time}</div>
                        </div>
                      </div>
                    )
                  })}
                  <div className="notif-actions">
                    <button type="button" className="chip" onClick={() => addToast('Notifications marked as read', 'info')}>Mark all read</button>
                    <button type="button" className="link-button small" onClick={() => setNotifOpen(false)}>View all →</button>
                  </div>
                </div>
              )}
            </div>
            <button type="button" className="profile-button">
              <Users size={18} />
            </button>
            <button type="button" className="icon-button" onClick={() => setSidebarCompact((current) => !current)}>
              <Menu size={18} />
            </button>
          </div>
        </header>

        <div className="content-stack">
          {page === 'shipments-create' && (
            <div className="card">
              <div className="panel-head"><h3>Create Shipment</h3><Plus size={16} /></div>
              <div className="form-grid">
                {[
                  ['Tracking ID', 'id'],
                  ['Recipient', 'recipient'],
                  ['Origin', 'origin'],
                  ['Destination', 'dest'],
                ].map(([label, key]) => (
                  <div key={key} className="field-stack">
                    <div className="input-label">{label}</div>
                    <input className="input-control" value={createShipmentDraft[key]} onChange={(event) => setCreateShipmentDraft((current) => ({ ...current, [key]: event.target.value }))} />
                  </div>
                ))}
                <div className="field-stack">
                  <div className="input-label">Status</div>
                  <select className="select-control" value={createShipmentDraft.status} onChange={(event) => setCreateShipmentDraft((current) => ({ ...current, status: event.target.value }))}>
                    {['Out for Delivery', 'In Transit', 'Delayed', 'Delivered'].map((status) => <option key={status}>{status}</option>)}
                  </select>
                </div>
                <div className="field-stack">
                  <div className="input-label">Driver</div>
                  <select className="select-control" value={createShipmentDraft.driver} onChange={(event) => setCreateShipmentDraft((current) => ({ ...current, driver: event.target.value }))}>
                    {DRIVERS_ALL.map((driver) => <option key={driver.id}>{driver.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {page === 'drivers-add' && (
            <div className="card">
              <div className="panel-head"><h3>Add Driver</h3><Users size={16} /></div>
              <div className="form-grid">
                <div className="field-stack">
                  <div className="input-label">Name</div>
                  <input className="input-control" value={profileDraft.name} onChange={(event) => setProfileDraft((current) => ({ ...current, name: event.target.value }))} />
                </div>
                <div className="field-stack">
                  <div className="input-label">Email</div>
                  <input className="input-control" value={profileDraft.email} onChange={(event) => setProfileDraft((current) => ({ ...current, email: event.target.value }))} />
                </div>
              </div>
            </div>
          )}

          {renderPage()}
        </div>
      </main>

      {drawerShipment && (
        <>
          <button type="button" className="drawer-backdrop" onClick={() => setDrawerShipment(null)} aria-label="Close shipment details" />
          <div className="card drawer-panel">
            <div className="drawer-content">
              <div className="drawer-head">
                <div>
                  <div className="orbitron drawer-title">{drawerShipment.id}</div>
                  <span className="status-badge" style={{ '--badge-bg': getStatusMeta(drawerShipment.status).bg, '--badge-color': getStatusMeta(drawerShipment.status).color }}>
                    <span className="status-dot" /> {drawerShipment.status}
                  </span>
                </div>
                <button type="button" className="icon-button" onClick={() => setDrawerShipment(null)}>
                  <X size={16} />
                </button>
              </div>

              <div className="timeline-row">
                {TIMELINE_STEPS.map((step, index) => (
                  <div key={step} className="timeline-step">
                    <span className={index < 3 || drawerShipment.status === 'Delivered' ? 'timeline-step-dot filled' : 'timeline-step-dot'} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <div className="details-grid">
                {[
                  ['Sender', drawerShipment.sender],
                  ['Recipient', drawerShipment.recipient],
                  ['Origin', drawerShipment.origin],
                  ['Dest', drawerShipment.dest],
                  ['Driver', drawerShipment.driver],
                  ['Weight', drawerShipment.weight],
                ].map(([label, value]) => (
                  <div key={label} className="detail-item">
                    <div className="detail-label">{label}</div>
                    <div>{value}</div>
                  </div>
                ))}
              </div>

              <div className="drawer-actions">
                <button type="button" className="primary-button" onClick={markDelivered}>Mark Delivered</button>
                <button type="button" className="primary-button" onClick={() => addToast('Driver reassignment requested', 'info')}>Reassign Driver</button>
                <button type="button" className="primary-button" onClick={() => addToast('Issue reported', 'error')}>Report Issue</button>
              </div>
            </div>
          </div>
        </>
      )}

      {searchOpen && (
        <div className="search-overlay">
          <div className="card search-card">
            <div className="panel-head">
              <h3>Search Shipments</h3>
              <button type="button" className="icon-button" onClick={() => setSearchOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <input className="search-input-lg" placeholder="Search tracking ID or recipient" value={shipmentSearch} onChange={(event) => setShipmentSearch(event.target.value)} />
            <div className="agent-list">
              {searchResults.map((shipment) => (
                <button key={shipment.id} type="button" className="search-result" onClick={() => { setSearchOpen(false); openShipmentDrawer(shipment) }}>
                  <div>
                    <div className="route-name">{shipment.id}</div>
                    <div className="route-sub">{shipment.recipient}</div>
                  </div>
                  <span className="status-badge" style={{ '--badge-bg': getStatusMeta(shipment.status).bg, '--badge-color': getStatusMeta(shipment.status).color }}>
                    <span className="status-dot" /> {shipment.status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="toast-stack">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.msg}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
