import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, BarChart3, MessageCircle, Star, TrendingUp, Users, Zap } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Transform Your Sales Data with
              <span className="highlight"> AI Intelligence</span>
            </h1>
            <p className="hero-description">
              Dyann AI simplifies sales data analysis, providing powerful analytics and AI assistance 
              to help you make data-driven decisions and grow your business.
            </p>
            <div className="hero-buttons">
              <Link to="/dyann" className="btn btn-primary">
                <Upload size={20} />
                Upload CSV
              </Link>
              <Link to="/dashboard" className="btn btn-secondary">
                <BarChart3 size={20} />
                View Demo
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-graphic">
              <div className="chart-placeholder">
                <BarChart3 size={60} />
                <p>Sales Analytics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <h2 className="section-title">Why Choose Dyann AI?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Upload size={32} />
              </div>
              <h3>Easy CSV Upload</h3>
              <p>Simply upload your sales reports and let our AI analyze the data instantly.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <BarChart3 size={32} />
              </div>
              <h3>Smart Analytics</h3>
              <p>Get comprehensive insights with interactive charts and performance metrics.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <MessageCircle size={32} />
              </div>
              <h3>AI Assistant</h3>
              <p>Ask questions about your data and get intelligent responses powered by AI.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <TrendingUp size={32} />
              </div>
              <h3>Trend Analysis</h3>
              <p>Identify patterns and trends in your sales data for better forecasting.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3>Customer Insights</h3>
              <p>Understand customer behavior and feedback through sentiment analysis.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={32} />
              </div>
              <h3>Real-time Updates</h3>
              <p>Get instant updates and notifications about your sales performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <h2>Ready to Transform Your Sales Analysis?</h2>
          <p>Join thousands of businesses using Dyann AI to make better decisions</p>
          <Link to="/dyann" className="btn btn-primary btn-large">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
