import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface Report {
  id: string;
  sellerId: string;
  sellerName: string;
  reportedBy: { _id: string; name: string };
  reason: string;
  details: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

interface ReportAnalyticsDashboardProps {
  reports: Report[];
}

const ReportAnalyticsDashboard = ({ reports }: ReportAnalyticsDashboardProps) => {
  // Prepare data for status distribution chart
  const statusData = useMemo(() => {
    const statusCounts = reports.reduce((acc, report) => {
      acc[report.status] = (acc[report.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([status, count]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count
    }));
  }, [reports]);

  // Prepare data for monthly reports chart
  const monthlyData = useMemo(() => {
    const monthCounts = reports.reduce((acc, report) => {
      const date = new Date(report.createdAt);
      const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      
      if (!acc[monthYear]) {
        acc[monthYear] = { total: 0, pending: 0, resolved: 0, dismissed: 0 };
      }
      
      acc[monthYear].total += 1;
      acc[monthYear][report.status] += 1;
      
      return acc;
    }, {} as Record<string, { total: number; pending: number; resolved: number; dismissed: number }>);

    return Object.entries(monthCounts)
      .map(([month, data]) => ({
        month,
        ...data
      }))
      .sort((a, b) => {
        const [monthA, yearA] = a.month.split(' ');
        const [monthB, yearB] = b.month.split(' ');
        return new Date(`${monthA} 20${yearA}`).getTime() - new Date(`${monthB} 20${yearB}`).getTime();
      });
  }, [reports]);

  // Colors for pie chart
  const COLORS = ['#ffd700', '#4CAF50', '#f44336'];

  return (
    <div className="w-full p-4 space-y-8">
      <h2 className="text-2xl font-bold mb-6">Report Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Distribution Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Report Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={(entry: { status: any; count: any; }) => `${entry.status}: ${entry.count}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Reports Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Monthly Report Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pending" fill="#ffd700" name="Pending" />
                <Bar dataKey="resolved" fill="#4CAF50" name="Resolved" />
                <Bar dataKey="dismissed" fill="#f44336" name="Dismissed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalyticsDashboard;