'use client'
import { Network, Terminal, History, Activity, DollarSign, Users, ShoppingCart, UserPlus } from 'lucide-react';
import { StatCard } from './components/stat-card';
import { RecentSales } from './components/recent-sales';
import { MetricCard } from './components/metric-card';


export const runtime = 'edge';

const recentSales = [
  {
    customer: {
      name: "Olivia Martin",
      email: "olivia.martin@email.com"
    },
    amount: 1999.00
  },
  {
    customer: {
      name: "Jackson Lee",
      email: "jackson.lee@email.com"
    },
    amount: 39.00
  },
  {
    customer: {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com"
    },
    amount: 299.00
  },
  {
    customer: {
      name: "William Kim",
      email: "will@email.com"
    },
    amount: 99.00
  },
  {
    customer: {
      name: "Sofia Davis",
      email: "sofia.davis@email.com"
    },
    amount: 39.00
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      
      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          icon={DollarSign}
          trend={{
            value: "20.1%",
            timeframe: "from last month",
            isPositive: true
          }}
        />
        <StatCard
          title="Subscriptions"
          value="2,350"
          icon={Users}
          trend={{
            value: "180.1%",
            timeframe: "from last month",
            isPositive: true
          }}
        />
        <StatCard
          title="Sales"
          value="12,234"
          icon={ShoppingCart}
          trend={{
            value: "19%",
            timeframe: "from last month",
            isPositive: true
          }}
        />
        <StatCard
          title="Active Users"
          value="573"
          icon={UserPlus}
          trend={{
            value: "201",
            timeframe: "since last hour",
            isPositive: true
          }}
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Sales */}
        <div className="col-span-4">
          <RecentSales 
            sales={recentSales}
            description="You made 265 sales this month"
          />
        </div>

        {/* Metrics */}
        <div className="col-span-3 space-y-6">
          <MetricCard
            title="Active Tunnels"
            value="4"
            icon={Network}
            description="+2 from last hour"
          />
          <MetricCard
            title="Terminal Sessions"
            value="2"
            icon={Terminal}
            description="Active now"
          />
          <MetricCard
            title="Data Transfer"
            value="1.2 GB"
            icon={Activity}
            description="Last 24 hours"
          />
        </div>
      </div>
    </div>
  );
}
