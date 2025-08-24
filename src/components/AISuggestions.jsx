import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { GeminiService } from '../services/geminiService';
import './AISuggestions.css';

export default function AISuggestions({ dashboardData, userProfile }) {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('insights');
  const { currentUser } = useAuth();

  useEffect(() => {
    if (dashboardData && currentUser) {
      generateSuggestions();
    }
  }, [dashboardData, currentUser]);

  const generateSuggestions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userData = {
        industry: userProfile?.industry || 'Technology',
        role: userProfile?.role || 'Manager',
        experienceLevel: userProfile?.experienceLevel || 'Intermediate'
      };

      const result = await GeminiService.generateDashboardSuggestions(userData, dashboardData);
      setSuggestions(result);
    } catch (err) {
      setError('Failed to generate AI suggestions. Please try again.');
      console.error('AI Suggestions Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="ai-suggestions-container">
        <div className="ai-suggestions-card">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Generating AI insights...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ai-suggestions-container">
        <div className="ai-suggestions-card">
          <div className="error-message">
            <p>{error}</p>
            <button onClick={generateSuggestions} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!suggestions) {
    return null;
  }

  return (
    <div className="ai-suggestions-container">
      <div className="ai-suggestions-card">
        <div className="ai-header">
          <h3>🤖 AI Insights</h3>
          <div className="priority-badge" style={{ backgroundColor: getPriorityColor(suggestions.priority) }}>
            {suggestions.priority} Priority
          </div>
        </div>

        <div className="ai-tabs">
          <button 
            className={`tab-btn ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            Insights
          </button>
          <button 
            className={`tab-btn ${activeTab === 'recommendations' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommendations')}
          >
            Recommendations
          </button>
          <button 
            className={`tab-btn ${activeTab === 'metrics' ? 'active' : ''}`}
            onClick={() => setActiveTab('metrics')}
          >
            New Metrics
          </button>
          <button 
            className={`tab-btn ${activeTab === 'trends' ? 'active' : ''}`}
            onClick={() => setActiveTab('trends')}
          >
            Trends
          </button>
        </div>

        <div className="ai-content">
          {activeTab === 'insights' && (
            <div className="insights-section">
              <h4>Key Insights</h4>
              <ul className="insights-list">
                {suggestions.insights?.map((insight, index) => (
                  <li key={index} className="insight-item">
                    <span className="insight-icon">💡</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="recommendations-section">
              <h4>Actionable Recommendations</h4>
              <ul className="recommendations-list">
                {suggestions.recommendations?.map((rec, index) => (
                  <li key={index} className="recommendation-item">
                    <span className="rec-icon">🎯</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="metrics-section">
              <h4>Suggested New Metrics</h4>
              <ul className="metrics-list">
                {suggestions.additionalMetrics?.map((metric, index) => (
                  <li key={index} className="metric-item">
                    <span className="metric-icon">📊</span>
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="trends-section">
              <h4>Trend Analysis</h4>
              <div className="trend-content">
                <span className="trend-icon">📈</span>
                <p>{suggestions.trends}</p>
              </div>
            </div>
          )}
        </div>

        <div className="ai-footer">
          <button onClick={generateSuggestions} className="refresh-btn">
            🔄 Refresh Insights
          </button>
          <small>Powered by Gemini Flash 2.0</small>
        </div>
      </div>
    </div>
  );
}
