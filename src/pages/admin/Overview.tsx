import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Package, Users, DollarSign, Activity, Eye, ShoppingCart, CreditCard, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const data = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 18 },
  { name: 'Wed', revenue: 5000, orders: 35 },
  { name: 'Thu', revenue: 2780, orders: 15 },
  { name: 'Fri', revenue: 6890, orders: 48 },
  { name: 'Sat', revenue: 8390, orders: 67 },
  { name: 'Sun', revenue: 7490, orders: 55 },
];

const trafficData = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Organic', value: 300 },
  { name: 'Referral', value: 200 },
];

const trafficColors = ['#000000', '#444444', '#888888', '#CCCCCC'];

export function Overview() {
  const stats = [
    { name: 'Total Revenue', value: '$37,550', change: '+12.5%', trend: 'up', icon: DollarSign },
    { name: 'Active Orders', value: '262', change: '+4.2%', trend: 'up', icon: Package },
    { name: 'Customers', value: '1,490', change: '+8.1%', trend: 'up', icon: Users },
    { name: 'Conversion Rate', value: '3.2%', change: '-0.4%', trend: 'down', icon: Activity },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Dashboard Overview</h1>
          <p className="text-black/50 text-sm font-medium mt-2">Welcome back. Here's what's happening today.</p>
        </div>
        <div className="flex bg-white px-6 py-3 rounded-2xl shadow-sm border border-black/5 space-x-6">
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold text-black/40 tracking-widest">Today's Sales</p>
            <p className="text-xl font-black">$4,290</p>
          </div>
          <div className="w-[1px] bg-black/10"></div>
          <div className="text-center">
             <p className="text-[10px] uppercase font-bold text-black/40 tracking-widest">Active Users</p>
             <p className="text-xl font-black tracking-tighter">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2 animate-pulse"></span>
                124
             </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
             <div key={stat.name} className="p-6 bg-white rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-black/5 rounded-2xl">
                  <Icon className="w-5 h-5 text-black" />
                </div>
                <div className={cn(
                  "flex items-center space-x-1 text-[10px] font-bold px-2 py-1 rounded-full",
                  stat.trend === 'up' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                )}>
                  <span>{stat.change}</span>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-1">{stat.name}</p>
              <h3 className="text-2xl font-black">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      {/* Analytics Funnel & Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2 bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-8">Conversion Funnel</h3>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 h-full pb-8">
            <div className="flex-1 w-full flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
                <Eye className="w-8 h-8" />
              </div>
              <p className="text-2xl font-black">12,490</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Product Views</p>
            </div>
            <ChevronRight className="w-8 h-8 text-black/20 hidden md:block" />
            
            <div className="flex-1 w-full flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <p className="text-2xl font-black">3,842</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">AddToCart</p>
              <p className="text-[10px] font-bold text-black mt-2 bg-black/5 px-2 py-1 rounded-full">30.7%</p>
            </div>
            <ChevronRight className="w-8 h-8 text-black/20 hidden md:block" />

            <div className="flex-1 w-full flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center mb-4">
                <CreditCard className="w-8 h-8" />
              </div>
              <p className="text-2xl font-black">1,240</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Checkout Initiated</p>
              <p className="text-[10px] font-bold text-black mt-2 bg-black/5 px-2 py-1 rounded-full">32.2%</p>
            </div>
            <ChevronRight className="w-8 h-8 text-black/20 hidden md:block" />

            <div className="flex-1 w-full flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center mb-4">
                <Package className="w-8 h-8" />
              </div>
              <p className="text-2xl font-black">400</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Purchased</p>
              <p className="text-[10px] font-bold text-black mt-2 bg-black/5 px-2 py-1 rounded-full">32.2%</p>
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-white p-8 rounded-3xl border border-black/5 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Traffic Sources</h3>
          <p className="text-[10px] text-black/40 uppercase tracking-widest font-bold mb-8">Sessions by channel</p>
          <div className="flex-1 flex justify-center items-center min-h-[200px]">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={trafficColors[index % trafficColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderRadius: '12px', border: 'none', color: '#fff' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {trafficData.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: trafficColors[index] }}></div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-black/60">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2 bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-8">Revenue Analytics</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A0A0A0' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A0A0A0' }} dx={-10} tickFormatter={(val) => '$' + val} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderRadius: '12px', border: 'none', color: '#fff' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#000" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#000' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-1 bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-8">Orders Volume</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A0A0A0' }} dy={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderRadius: '12px', border: 'none', color: '#fff' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                  cursor={{ fill: '#F5F5F5' }}
                />
                <Bar dataKey="orders" fill="#000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Insights & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-[#111] to-[#333] p-8 rounded-3xl text-white shadow-lg">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-6">Gemini Insights</h3>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-xl border border-white/5">
              <p className="text-sm">Revenue is up 12% week over week. Consider increasing ad spend on the "Essential Tee" campaign.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/5">
              <p className="text-sm">Inventory for "Oxford Shirt" is running critically low (12 items left). Reorder recommended in the next 48 hours.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-black/5 last:border-0 last:pb-0">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#F5F5F5] rounded-full flex items-center justify-center text-[10px] font-bold">
                    #{1040 + i}
                  </div>
                  <div>
                    <p className="text-sm font-bold">Alex Johnson</p>
                    <p className="text-[10px] text-black/40">2 items • $145.00</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-blue-50 text-blue-600 text-[9px] uppercase tracking-widest font-bold rounded-full">
                  Processing
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
