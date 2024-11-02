import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableColumn, 
  TableRow, 
  TableCell 
} from "@nextui-org/react";
import { Progress } from "@nextui-org/react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// Sample data (same as before)
const auctionTrends = [
  { name: 'Jan', value: 4000, profit: 2400, users: 240 },
  { name: 'Feb', value: 3000, profit: 1800, users: 220 },
  { name: 'Mar', value: 5000, profit: 3200, users: 280 },
  { name: 'Apr', value: 4500, profit: 2800, users: 250 },
  { name: 'May', value: 6000, profit: 3800, users: 290 },
  { name: 'Jun', value: 5500, profit: 3500, users: 300 },
];

const categoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Fashion', value: 300 },
  { name: 'Home & Garden', value: 300 },
  { name: 'Sports', value: 200 },
];

const recentAuctions = [
  { id: 1, item: 'Antique Vase', currentBid: 500, endTime: '2h 15m' },
  { id: 2, item: 'Rare Coin', currentBid: 1200, endTime: '1d 3h' },
  { id: 3, item: 'Signed Jersey', currentBid: 800, endTime: '4h 30m' },
];

const COLORS = ['#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1', '#8B5CF6'];

interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtext, color }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = parseInt(value.replace(/[^0-9]/g, ''));
    const increment = target / 50;
    const timer = setInterval(() => {
      setCount(old => {
        const newValue = old + increment;
        return newValue >= target ? target : newValue;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <Card className="p-4">
      <CardBody>
        <div className="flex flex-col gap-2">
          <span className="text-tiny text-default-500">{title}</span>
          <div className="flex justify-between items-center">
            <span className="text-large font-semibold">
              {value.startsWith('$') ? 
                `$${Math.round(count).toLocaleString()}` : 
                `${Math.round(count)}${value.includes('%') ? '%' : ''}`
              }
            </span>
            <Progress 
              size="sm"
              radius="sm"
              classNames={{
                base: "w-24",
                indicator: color
              }}
              value={100}
            />
          </div>
          <span className="text-tiny text-default-500">{subtext}</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default function EnhancedAuctionDashboard() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categoryData.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Auction Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="animate-pulse bg-success rounded-full w-2 h-2" />
          <span className="text-tiny text-default-500">Live Updates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value="2573"
          subtext="↑ 15% increase"
          color="bg-primary"
        />
        <StatCard
          title="Live Auctions"
          value="45"
          subtext="5 ending soon"
          color="bg-success"
        />
        <StatCard
          title="Total Revenue"
          value="$89012"
          subtext="↑ 12% increase"
          color="bg-secondary"
        />
        <StatCard
          title="Bid Rate"
          value="12%"
          subtext="↑ 2% from last month"
          color="bg-warning"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-0 pt-4 px-4">
            <h4 className="font-bold text-large">Auction Trends</h4>
          </CardHeader>
          <CardBody className="overflow-visible">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={auctionTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#06B6D4" 
                    fill="#06B6D4" 
                    fillOpacity={0.2} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#0EA5E9" 
                    fill="#0EA5E9" 
                    fillOpacity={0.2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-0 pt-4 px-4">
            <h4 className="font-bold text-large">Category Distribution</h4>
          </CardHeader>
          <CardBody className="overflow-visible">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        opacity={index === activeIndex ? 1 : 0.7}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-0 pt-4 px-4">
          <h4 className="font-bold text-large">Recent Auctions</h4>
        </CardHeader>
        <CardBody>
          <Table 
            aria-label="Recent auctions table"
            className="mt-4"
          >
            <TableHeader>
              <TableColumn>ITEM</TableColumn>
              <TableColumn>CURRENT BID</TableColumn>
              <TableColumn>TIME LEFT</TableColumn>
            </TableHeader>
            <TableBody>
              {recentAuctions.map((auction) => (
                <TableRow key={auction.id}>
                  <TableCell>{auction.item}</TableCell>
                  <TableCell>${auction.currentBid}</TableCell>
                  <TableCell>{auction.endTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}