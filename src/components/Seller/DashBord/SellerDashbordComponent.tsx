import React from 'react';
// Material UI imports
import { Box, Grid } from '@mui/material';
// NextUI imports
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { LineChart, Line, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { CircleSlash2, FileText, DollarSign, TrendingUp } from 'lucide-react';

const monthlyData = [
  { month: "SEP", value1: 30, value2: 45 },
  { month: "OCT", value1: 35, value2: 35 },
  { month: "NOV", value1: 25, value2: 20 },
  { month: "DEC", value1: 45, value2: 35 },
  { month: "JAN", value1: 35, value2: 25 },
  { month: "FEB", value1: 40, value2: 35 },
];

const weeklyData = [
  { day: "17", revenue1: 20, revenue2: 15 },
  { day: "18", revenue1: 15, revenue2: 10 },
  { day: "19", revenue1: 12, revenue2: 8 },
  { day: "20", revenue1: 18, revenue2: 12 },
  { day: "21", revenue1: 16, revenue2: 9 },
  { day: "22", revenue1: 12, revenue2: 6 },
  { day: "23", revenue1: 14, revenue2: 11 },
  { day: "24", revenue1: 24, revenue2: 16 },
  { day: "25", revenue1: 18, revenue2: 12 },
];

// Reusable metric card component using NextUI Card
const MetricCard = ({ icon: Icon, title, value, subvalue }: { icon: React.ComponentType<any>, title: string, value: string, subvalue?: string }) => (
  <Card className="w-full">
    <CardBody className="flex flex-row items-center gap-4">
      <div className="p-2 rounded-full bg-default-100">
        <Icon className="w-6 h-6 text-default-600" />
      </div>
      <div>
        <p className="text-sm text-default-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
        {subvalue && <p className="text-sm text-success-500">{subvalue}</p>}
      </div>
    </CardBody>
  </Card>
);

const SellerDashboardComponent = () => {
  return (
    <Box sx={{ p: 3, bgcolor: 'background.default' }}>
      <Grid container spacing={3}>
        {/* Top Row Metrics */}
        <Grid item xs={12} md={4}>
          <MetricCard
            icon={DollarSign}
            title="Earnings"
            value="$350.4"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            icon={DollarSign}
            title="Spend this month"
            value="$642.39"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            icon={TrendingUp}
            title="Sales"
            value="$574.34"
            subvalue="+23% since last month"
          />
        </Grid>

        {/* Middle Row Metrics */}
        {/* <Grid item xs={12} md={4}>
          <Card className="w-full">
            <CardBody>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-default-500">Your Balance</p>
                  <p className="text-xl font-bold">$1,000</p>
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-default-200">
                  <img
                    src="/api/placeholder/32/32"
                    alt="Balance icon"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Grid> */}
        {/* <Grid item xs={12} md={4}>
          <MetricCard
            icon={CircleSlash2}
            title="New Tasks"
            value="154"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            icon={FileText}
            title="Total Projects"
            value="2,935"
          />
        </Grid> */}

        {/* Bottom Row Charts */}
        <Grid item xs={12} md={6}>
          <Card className="w-full">
            <CardHeader>
              <div>
                <p className="text-sm text-default-500">Jan 2024</p>
                <p className="text-xl font-bold">$37.5K</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-default-500">Total Spent</p>
                  <p className="text-sm text-success-500">+12.45%</p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="h-[300px] w-full">
                <LineChart width={500} height={300} data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value1" stroke="#8884d8" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="value2" stroke="#82ca9d" strokeWidth={2} dot={false} />
                </LineChart>
              </div>
            </CardBody>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="w-full">
            <CardHeader>
              <p className="text-xl font-bold">Weekly Revenue</p>
            </CardHeader>
            <CardBody>
              <div className="h-[300px] w-full">
                <BarChart width={500} height={300} data={weeklyData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue1" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="revenue2" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </div>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SellerDashboardComponent;