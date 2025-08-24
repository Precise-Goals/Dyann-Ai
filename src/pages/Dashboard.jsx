import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Star, Calendar, BarChart3 } from 'lucide-react';
import AISuggestions from '../components/AISuggestions';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    totalCustomers: 0,
    averageRating: 0,
    growthRate: 0
  });

  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const { currentUser } = useAuth();

  useEffect(() => {
    // Simulate loading data
    loadDashboardData();
    loadUserProfile();
  }, [currentUser]);

  const loadDashboardData = () => {
    // Mock data - in real app, this would come from your database
    const mockSalesData = {
      totalSales: 125000,
      totalCustomers: 2847,
      averageRating: 4.6,
      growthRate: 12.5
    };

    const mockChartData = [
      { month: 'Jan', sales: 15000, customers: 250 },
      { month: 'Feb', sales: 18000, customers: 280 },
      { month: 'Mar', sales: 22000, customers: 320 },
      { month: 'Apr', sales: 19000, customers: 290 },
      { month: 'May', sales: 25000, customers: 380 },
      { month: 'Jun', sales: 28000, customers: 420 }
    ];

    const mockCategoryData = [
      { category: 'Electronics', value: 35, color: '#3B82F6' },
      { category: 'Clothing', value: 25, color: '#10B981' },
      { category: 'Home & Garden', value: 20, color: '#F59E0B' },
      { category: 'Sports', value: 15, color: '#EF4444' },
      { category: 'Books', value: 5, color: '#8B5CF6' }
    ];

    setSalesData(mockSalesData);
    setChartData(mockChartData);
    setCategoryData(mockCategoryData);
  };

  const loadUserProfile = () => {
    // Mock user profile - in real app, this would come from your database
    setUserProfile({
      industry: 'E-commerce',
      role: 'Business Manager',
      experienceLevel: 'Intermediate'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Prepare dashboard data for AI analysis
  const dashboardDataForAI = {
    metrics: salesData,
    chartData: chartData,
    categoryData: categoryData,
    user: currentUser?.email,
    timestamp: new Date().toISOString()
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Sales Dashboard</h1>
          <p>Comprehensive overview of your sales performance and analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">
              <DollarSign size={24} />
            </div>
            <div className="metric-content">
              <h3>Total Sales</h3>
              <p className="metric-value">{formatCurrency(salesData.totalSales)}</p>
              <span className="metric-change positive">
                <TrendingUp size={16} />
                +{salesData.growthRate}% from last month
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Users size={24} />
            </div>
            <div className="metric-content">
              <h3>Total Customers</h3>
              <p className="metric-value">{salesData.totalCustomers.toLocaleString()}</p>
              <span className="metric-change positive">
                <TrendingUp size={16} />
                +8.2% from last month
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Star size={24} />
            </div>
            <div className="metric-content">
              <h3>Average Rating</h3>
              <p className="metric-value">{salesData.averageRating}/5.0</p>
              <span className="metric-change positive">
                <TrendingUp size={16} />
                +0.2 from last month
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Calendar size={24} />
            </div>
            <div className="metric-content">
              <h3>Growth Rate</h3>
              <p className="metric-value">{salesData.growthRate}%</p>
              <span className="metric-change positive">
                <TrendingUp size={16} />
                +2.1% from last month
              </span>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <AISuggestions 
          dashboardData={dashboardDataForAI} 
          userProfile={userProfile}
        />

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-container">
            <h3>Sales Trend</h3>
            <div className="chart-placeholder">
              <BarChart3 size={48} />
              <p>Sales trend chart would be displayed here</p>
              <p>Using Recharts library for interactive visualizations</p>
            </div>
          </div>

          <div className="chart-container">
            <h3>Customer Growth</h3>
            <div className="chart-placeholder">
              <Users size={48} />
              <p>Customer growth chart would be displayed here</p>
              <p>Line chart showing customer acquisition over time</p>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="category-section">
          <h3>Sales by Category</h3>
          <div className="category-chart">
            <div className="chart-placeholder">
              <BarChart3 size={48} />
              <p>Pie chart showing category distribution</p>
              <p>Based on your uploaded CSV data</p>
            </div>
            <div className="category-legend">
              {categoryData.map((category, index) => (
                <div key={index} className="legend-item">
                  <div 
                    className="legend-color" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span>{category.category}</span>
                  <span className="legend-value">{category.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-section">
          <h3>Recent Sales Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">
                <DollarSign size={16} />
              </div>
              <div className="activity-content">
                <p>New sale recorded: $2,450</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">
                <Users size={16} />
              </div>
              <div className="activity-content">
                <p>New customer registered</p>
                <span className="activity-time">4 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">
                <Star size={16} />
              </div>
              <div className="activity-content">
                <p>Customer review submitted: 5 stars</p>
                <span className="activity-time">6 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
