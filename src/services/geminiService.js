import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Get the Gemini Flash 2.0 model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export class GeminiService {
  static async generateDashboardSuggestions(userData, dashboardMetrics) {
    try {
      const prompt = `
        As an AI assistant for a business dashboard, analyze the following user data and dashboard metrics to provide actionable insights and suggestions:
        
        User Profile:
        - Industry: ${userData.industry || 'Not specified'}
        - Role: ${userData.role || 'Not specified'}
        - Experience Level: ${userData.experienceLevel || 'Not specified'}
        
        Dashboard Metrics:
        ${JSON.stringify(dashboardMetrics, null, 2)}
        
        Please provide:
        1. 3-5 actionable business insights based on the metrics
        2. 2-3 recommendations for improving dashboard performance
        3. 1-2 suggestions for additional metrics to track
        4. A brief summary of key trends
        
        Format your response as JSON with the following structure:
        {
          "insights": ["insight1", "insight2", "insight3"],
          "recommendations": ["rec1", "rec2"],
          "additionalMetrics": ["metric1", "metric2"],
          "trends": "summary of key trends",
          "priority": "high|medium|low"
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON response
      try {
        return JSON.parse(text);
      } catch (parseError) {
        // If JSON parsing fails, return structured text
        return {
          insights: [text],
          recommendations: [],
          additionalMetrics: [],
          trends: "Analysis completed",
          priority: "medium"
        };
      }
    } catch (error) {
      console.error('Error generating suggestions:', error);
      throw new Error('Failed to generate AI suggestions');
    }
  }

  static async generateChartRecommendations(data, chartType) {
    try {
      const prompt = `
        As a data visualization expert, analyze this data and provide recommendations for the best chart type and visualization approach:
        
        Data Structure: ${JSON.stringify(data.slice(0, 5), null, 2)} // First 5 records
        Current Chart Type: ${chartType}
        Data Points: ${data.length}
        
        Please provide:
        1. Recommended chart type for this data
        2. Color scheme suggestions
        3. Layout optimization tips
        4. Interactive features to consider
        
        Format as JSON:
        {
          "recommendedChart": "chart_type",
          "colorScheme": ["color1", "color2", "color3"],
          "layoutTips": ["tip1", "tip2"],
          "interactiveFeatures": ["feature1", "feature2"],
          "reasoning": "explanation"
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch (parseError) {
        return {
          recommendedChart: chartType,
          colorScheme: ["#667eea", "#764ba2", "#f093fb"],
          layoutTips: ["Optimize for mobile viewing"],
          interactiveFeatures: ["Tooltips", "Zoom"],
          reasoning: "Analysis completed"
        };
      }
    } catch (error) {
      console.error('Error generating chart recommendations:', error);
      throw new Error('Failed to generate chart recommendations');
    }
  }

  static async generateBusinessInsights(metrics, timeRange) {
    try {
      const prompt = `
        As a business analyst, provide insights based on these metrics over ${timeRange}:
        
        Metrics: ${JSON.stringify(metrics, null, 2)}
        
        Please provide:
        1. Key performance indicators analysis
        2. Growth trends identification
        3. Potential areas of concern
        4. Strategic recommendations
        
        Format as JSON:
        {
          "kpiAnalysis": "analysis_text",
          "growthTrends": ["trend1", "trend2"],
          "concerns": ["concern1", "concern2"],
          "strategicRecommendations": ["rec1", "rec2"],
          "confidence": "high|medium|low"
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch (parseError) {
        return {
          kpiAnalysis: "Analysis completed",
          growthTrends: ["Positive trend observed"],
          concerns: ["Monitor for changes"],
          strategicRecommendations: ["Continue current strategy"],
          confidence: "medium"
        };
      }
    } catch (error) {
      console.error('Error generating business insights:', error);
      throw new Error('Failed to generate business insights');
    }
  }

  static async generatePredictiveAnalysis(historicalData, forecastPeriod) {
    try {
      const prompt = `
        As a data scientist, perform predictive analysis on this historical data for ${forecastPeriod}:
        
        Historical Data: ${JSON.stringify(historicalData.slice(-10), null, 2)} // Last 10 records
        
        Please provide:
        1. Trend analysis
        2. Seasonal patterns
        3. Forecast values
        4. Confidence intervals
        5. Risk factors
        
        Format as JSON:
        {
          "trend": "increasing|decreasing|stable",
          "seasonalPatterns": "description",
          "forecast": [{"period": "period1", "value": "predicted_value"}],
          "confidenceInterval": {"lower": "value", "upper": "value"},
          "riskFactors": ["risk1", "risk2"],
          "accuracy": "high|medium|low"
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        return JSON.parse(text);
      } catch (parseError) {
        return {
          trend: "stable",
          seasonalPatterns: "No clear seasonal pattern",
          forecast: [{"period": "next_month", "value": "estimated_value"}],
          confidenceInterval: {"lower": "min_value", "upper": "max_value"},
          riskFactors: ["Market volatility"],
          accuracy: "medium"
        };
      }
    } catch (error) {
      console.error('Error generating predictive analysis:', error);
      throw new Error('Failed to generate predictive analysis');
    }
  }
}
