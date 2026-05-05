import {
  Package,
  Truck,
  CheckCircle2,
  AlertTriangle,
  LayoutDashboard,
  Navigation,
  Users,
  BarChart2,
  Map,
  Settings,
} from 'lucide-react';

export const ROUTE_PATH_1 = 'M 40,300 C 100,260 160,180 240,140 C 300,110 340,130 380,100';
export const ROUTE_PATH_2 = 'M 60,320 C 130,280 200,220 270,180 C 320,150 360,160 400,120';
export const ROUTE_PATH_3 = 'M 30,280 C 90,240 150,200 220,170 C 280,145 330,155 390,110';
export const ROUTE_PATH_4 = 'M 50,310 C 110,270 180,210 250,165 C 310,130 355,145 395,105';

export const KPI_CARDS = [
  { key: 'all', label: 'Total Shipments', value: '1,250', icon: Package, color: 'var(--blue)', wave: '#3B82F6', page: 'shipments-all', filter: 'All' },
  { key: 'transit', label: 'In Transit', value: '320', icon: Truck, color: 'var(--cyan)', wave: '#3B82F6', page: 'shipments-all', filter: 'In Transit' },
  { key: 'delivered', label: 'Delivered', value: '860', icon: CheckCircle2, color: 'var(--green)', wave: '#22C55E', page: 'shipments-all', filter: 'Delivered' },
  { key: 'delayed', label: 'Delayed', value: '45', icon: AlertTriangle, color: 'var(--red)', wave: '#EF4444', page: 'shipments-all', filter: 'Delayed' },
];

export const DELIVERY_RANGES = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days'];

export const DELIVERY_PERFORMANCE_DATA = {
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
};

export const OVERVIEW_AREA_DATA = [
  { name: 'W1', delivered: 280, delayed: 42 },
  { name: 'W2', delivered: 325, delayed: 38 },
  { name: 'W3', delivered: 352, delayed: 31 },
  { name: 'W4', delivered: 388, delayed: 26 },
];

export const STATUS_PIE_DATA = [
  { name: 'Delivered', value: 860, color: '#22C55E' },
  { name: 'In Transit', value: 320, color: '#3B82F6' },
  { name: 'Delayed', value: 45, color: '#EF4444' },
  { name: 'Out for Delivery', value: 25, color: '#F59E0B' },
];

export const REPORT_PERIODS = ['7 Days', '30 Days', '90 Days'];

export const REPORT_KPIS = {
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
};

export const REPORT_LINE_DATA = {
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
};

export const REPORT_BAR_DATA = {
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
};

export const DRIVER_PERFORMANCE_ROWS = {
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
};

export const ROUTE_CARDS = [
  { id: 1, driver: 'Alex Carter', shipment: '#TK652198', status: 'Moving', eta: '4:15 PM', progress: 76, color: '#06B6D4', origin: 'Origin, 4th Ave', dest: 'Senc Mulirarr, CA' },
  { id: 2, driver: 'Sarah Mills', shipment: '#TK874302', status: 'On-Time', eta: '3:45 PM', progress: 62, color: '#22C55E', origin: 'Seattle Hub', dest: 'Bellevue, WA' },
  { id: 3, driver: 'Marcus Lee', shipment: '#TK745609', status: 'Delayed', eta: '5:30 PM', progress: 38, color: '#EF4444', origin: 'Chicago West', dest: 'Evanston, IL' },
  { id: 4, driver: 'Priya Nair', shipment: '#TK985214', status: 'Moving', eta: '2:50 PM', progress: 84, color: '#3B82F6', origin: 'Houston Yard', dest: 'Sugar Land, TX' },
];

export const LIVE_TRACKING_PATHS = [
  { id: 1, d: ROUTE_PATH_1 },
  { id: 2, d: ROUTE_PATH_2 },
  { id: 3, d: ROUTE_PATH_3 },
  { id: 4, d: ROUTE_PATH_4 },
];

export const AGENTS = [
  { id: 'A1', name: 'Alex Carter', status: 'on-time', location: 'Los Angeles, CA', eta: '4:15 PM', shipment: '#TK652198', deliveries: 12, onTimeRate: 96, x: 480, y: 380, initials: 'AC', destX: 590, destY: 310 },
  { id: 'A2', name: 'Sarah Mills', status: 'on-time', location: 'Seattle, WA', eta: '3:45 PM', shipment: '#TK874302', deliveries: 9, onTimeRate: 100, x: 100, y: 80, initials: 'SM', destX: 10, destY: 20 },
  { id: 'A3', name: 'Marcus Lee', status: 'delayed', location: 'Chicago, IL', eta: '5:30 PM', shipment: '#TK652198', deliveries: 7, onTimeRate: 71, x: 310, y: 200, initials: 'ML', destX: 450, destY: 90 },
  { id: 'A4', name: 'Priya Nair', status: 'on-time', location: 'Houston, TX', eta: '2:50 PM', shipment: '#TK985214', deliveries: 11, onTimeRate: 91, x: 520, y: 420, initials: 'PN', destX: 580, destY: 470 },
  { id: 'A5', name: 'Tom Rivera', status: 'delayed', location: 'Phoenix, AZ', eta: '6:00 PM', shipment: '#TK745609', deliveries: 5, onTimeRate: 60, x: 80, y: 320, initials: 'TR', destX: 10, destY: 390 },
  { id: 'A6', name: 'Dana Kemp', status: 'idle', location: 'Denver, CO', eta: '—', shipment: 'None', deliveries: 0, onTimeRate: 100, x: 260, y: 140, initials: 'DK', destX: 260, destY: 140 },
  { id: 'A7', name: 'Chris Okafor', status: 'on-time', location: 'Miami, FL', eta: '3:10 PM', shipment: '#TK321099', deliveries: 14, onTimeRate: 93, x: 440, y: 440, initials: 'CO', destX: 590, destY: 440 },
  { id: 'A8', name: 'Leila Hassan', status: 'on-time', location: 'New York, NY', eta: '4:40 PM', shipment: '#TK543210', deliveries: 10, onTimeRate: 90, x: 160, y: 260, initials: 'LH', destX: 250, destY: 350 },
];

export const SHIPMENTS_SEED = [
  { id: '#TK652198', recipient: 'Alex Carter', status: 'In Transit', location: 'Chicago, IL', eta: '4:15 PM', origin: 'Origin, 4th Ave', dest: 'Senc Mulirarr, CA', sender: 'Metro Medical', driver: 'Alex Carter', weight: '7.1 kg', priority: 'Same-Day' },
  { id: '#TK874302', recipient: 'Sarah Mills', status: 'Delivered', location: 'Seattle, WA', eta: '3:45 PM', origin: 'Portland, OR', dest: 'Seattle, WA', sender: 'BlueSky Retail', driver: 'Sarah Mills', weight: '2.8 kg', priority: 'Express' },
  { id: '#TK985214', recipient: 'Priya Nair', status: 'Out for Delivery', location: 'Houston, TX', eta: '2:50 PM', origin: 'Houston Yard', dest: 'Sugar Land, TX', sender: 'Luma Foods', driver: 'Priya Nair', weight: '4.0 kg', priority: 'Normal' },
  { id: '#TK745609', recipient: 'Tom Rivera', status: 'Delayed', location: 'Phoenix, AZ', eta: '6:00 PM', origin: 'Phoenix Hub', dest: 'Mesa, AZ', sender: 'Coastal Goods', driver: 'Tom Rivera', weight: '5.7 kg', priority: 'Express' },
  { id: '#TK321099', recipient: 'Chris Okafor', status: 'In Transit', location: 'Miami, FL', eta: '3:10 PM', origin: 'Miami Port', dest: 'Coral Gables, FL', sender: 'Urban Cart', driver: 'Chris Okafor', weight: '3.3 kg', priority: 'Normal' },
  { id: '#TK543210', recipient: 'Leila Hassan', status: 'Out for Delivery', location: 'New York, NY', eta: '4:40 PM', origin: 'Queens Depot', dest: 'Brooklyn, NY', sender: 'Northwind Supply', driver: 'Leila Hassan', weight: '2.2 kg', priority: 'Same-Day' },
  { id: '#TK112233', recipient: 'Jordan Hill', status: 'Delivered', location: 'Austin, TX', eta: '1:15 PM', origin: 'Austin Hub', dest: 'Round Rock, TX', sender: 'Peak Apparel', driver: 'Dana Kemp', weight: '1.8 kg', priority: 'Normal' },
  { id: '#TK999001', recipient: 'Alex Carter', status: 'Out for Delivery', location: 'Los Angeles, CA', eta: '5:05 PM', origin: 'Long Beach, CA', dest: 'Downtown LA, CA', sender: 'Vista Home', driver: 'Alex Carter', weight: '6.4 kg', priority: 'Express' },
];

export const DRIVERS_ALL = [
  { id: 'DRV-1001', name: 'Alex Carter', status: 'Available', load: 3, initials: 'AC', assigned: ['#TK652198', '#TK999001'] },
  { id: 'DRV-1002', name: 'Sarah Mills', status: 'Busy', load: 2, initials: 'SM', assigned: ['#TK874302'] },
  { id: 'DRV-1003', name: 'Marcus Lee', status: 'Available', load: 1, initials: 'ML', assigned: [] },
  { id: 'DRV-1004', name: 'Priya Nair', status: 'Busy', load: 4, initials: 'PN', assigned: ['#TK985214'] },
  { id: 'DRV-1005', name: 'Tom Rivera', status: 'Available', load: 0, initials: 'TR', assigned: [] },
  { id: 'DRV-1006', name: 'Leila Hassan', status: 'Available', load: 2, initials: 'LH', assigned: ['#TK543210'] },
];

export const UNASSIGNED_SHIPMENTS_SEED = [
  { id: '#TK550001', destination: 'Pasadena, CA', priority: 'Normal' },
  { id: '#TK550002', destination: 'Redmond, WA', priority: 'Express' },
  { id: '#TK550003', destination: 'Irving, TX', priority: 'Same-Day' },
  { id: '#TK550004', destination: 'Naperville, IL', priority: 'Normal' },
];

export const EXPORT_DRIVER_OPTIONS = DRIVERS_ALL.map((driver) => driver.name);

export const NOTIFICATIONS = [
  { id: 1, icon: AlertTriangle, color: 'var(--amber)', title: '#TK745609 Delayed', desc: 'Houston TX — 2hr delay', time: '5m ago' },
  { id: 2, icon: CheckCircle2, color: 'var(--green)', title: '#TK874302 Delivered', desc: 'Seattle WA', time: '12m ago' },
  { id: 3, icon: Package, color: 'var(--blue)', title: 'New shipment assigned', desc: '#TK999001 — Alex Carter', time: '1h ago' },
];

export const PAGE_TITLES = {
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
};

export const SIDEBAR_GROUPS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { key: 'shipments', label: 'Shipments', icon: Package, path: '/shipments' },
  { key: 'reports', label: 'Reports', icon: BarChart2, path: '/reports' },
  { key: 'fleet-map', label: 'Fleet Map', icon: Map, path: '/fleet-map' },
  { key: 'about', label: 'About Us', icon: Users, path: '/about' },
  { key: 'contact', label: 'Contact Us', icon: Navigation, path: '/contact' },
  { key: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

export const STATUS_META = {
  'Out for Delivery': { bg: 'rgba(245,158,11,0.10)', color: 'var(--amber)', tailwind: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  Delivered: { bg: 'rgba(34,197,94,0.10)', color: 'var(--green)', tailwind: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  'In Transit': { bg: 'rgba(59,130,246,0.10)', color: 'var(--blue)', tailwind: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  Delayed: { bg: 'rgba(239,68,68,0.10)', color: 'var(--red)', tailwind: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  Moving: { bg: 'rgba(59,130,246,0.10)', color: 'var(--blue)', tailwind: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  'On-Time': { bg: 'rgba(34,197,94,0.10)', color: 'var(--green)', tailwind: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  Available: { bg: 'rgba(34,197,94,0.10)', color: 'var(--green)', tailwind: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  Busy: { bg: 'rgba(245,158,11,0.10)', color: 'var(--amber)', tailwind: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  idle: { bg: 'rgba(148,163,184,0.15)', color: '#94A3B8', tailwind: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400' },
  'on-time': { bg: 'rgba(34,197,94,0.10)', color: 'var(--green)', tailwind: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  delayed: { bg: 'rgba(239,68,68,0.10)', color: 'var(--red)', tailwind: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
};

export const APPEARANCE_SWATCHES = ['#3B82F6', '#06B6D4', '#22C55E', '#F59E0B', '#8B5CF6'];
export const FONT_SIZES = { Small: '13px', Medium: '15px', Large: '17px' };
export const TIMELINE_STEPS = ['Created', 'Picked Up', 'In Transit', 'Delivered'];

export const CUSTOM_REPORT_COLUMNS = ['Tracking ID', 'Recipient', 'Status', 'Location', 'ETA', 'Driver'];
export const CUSTOM_REPORT_PREVIEW_ROWS = [
  { 'Tracking ID': '#TK652198', Recipient: 'Alex Carter', Status: 'In Transit', Location: 'Chicago, IL', ETA: '4:15 PM', Driver: 'Alex Carter' },
  { 'Tracking ID': '#TK874302', Recipient: 'Sarah Mills', Status: 'Delivered', Location: 'Seattle, WA', ETA: '3:45 PM', Driver: 'Sarah Mills' },
  { 'Tracking ID': '#TK745609', Recipient: 'Tom Rivera', Status: 'Delayed', Location: 'Phoenix, AZ', ETA: '6:00 PM', Driver: 'Tom Rivera' },
];
