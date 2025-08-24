import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Download, Upload, MessageCircle, Bot } from 'lucide-react';
import './Assistant.css';

const Assistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m Dyann AI, your sales data assistant. I can help you analyze your sales data, answer questions, and provide insights. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('sales') && input.includes('trend')) {
      return 'Based on your recent sales data, I can see a positive upward trend. Sales have increased by 12.5% compared to last month, with electronics being your top-performing category at 35% of total sales.';
    } else if (input.includes('customer') || input.includes('feedback')) {
      return 'Your customer satisfaction is excellent! The average rating is 4.6/5.0, with 78% of customers giving 4 or 5-star reviews. Most feedback mentions product quality and fast delivery as key strengths.';
    } else if (input.includes('revenue') || input.includes('profit')) {
      return 'Your total revenue this month is $28,000, which represents a 15% increase from last month. The profit margin is approximately 32%, with electronics and clothing categories contributing the most to your bottom line.';
    } else if (input.includes('forecast') || input.includes('prediction')) {
      return 'Based on current trends and seasonal patterns, I predict your sales will continue growing by 8-12% in the next quarter. The holiday season should boost electronics sales by 20-25%.';
    } else {
      return 'I\'d be happy to help you analyze your sales data! You can ask me about sales trends, customer feedback, revenue analysis, or request forecasts. What specific aspect would you like to explore?';
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording functionality
    if (!isRecording) {
      // Start recording
      console.log('Started recording...');
    } else {
      // Stop recording
      console.log('Stopped recording...');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const exportChat = () => {
    const chatData = messages.map(msg => ({
      timestamp: msg.timestamp.toISOString(),
      type: msg.type,
      content: msg.content
    }));
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dyann-chat-history.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importChat = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedChat = JSON.parse(event.target.result);
          setMessages(importedChat.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })));
        } catch (error) {
          alert('Error importing chat file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="assistant">
      <div className="assistant-container">
        <div className="assistant-header">
          <div className="assistant-title">
            <Bot size={24} />
            <h1>Dyann AI Assistant</h1>
          </div>
          <p>Your intelligent sales data analyst and business advisor</p>
        </div>

        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-avatar">
                  {message.type === 'assistant' ? (
                    <Bot size={20} />
                  ) : (
                    <MessageCircle size={20} />
                  )}
                </div>
                <div className="message-content">
                  <p>{message.content}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message assistant">
                <div className="message-avatar">
                  <Bot size={20} />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your sales data, trends, or business insights..."
                className="chat-input"
                rows="1"
              />
              <div className="chat-actions">
                <button
                  className={`voice-button ${isRecording ? 'recording' : ''}`}
                  onClick={toggleRecording}
                  title={isRecording ? 'Stop Recording' : 'Start Voice Input'}
                >
                  {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                <button
                  className="send-button"
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="chat-tools">
          <div className="tool-section">
            <h4>Chat Tools</h4>
            <div className="tool-buttons">
              <button className="tool-button" onClick={exportChat}>
                <Download size={16} />
                Export Chat
              </button>
              <label className="tool-button">
                <Upload size={16} />
                Import Chat
                <input
                  type="file"
                  accept=".json"
                  onChange={importChat}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>

          <div className="suggestions">
            <h4>Quick Questions</h4>
            <div className="suggestion-chips">
              <button 
                className="suggestion-chip"
                onClick={() => setInputMessage('What are the current sales trends?')}
              >
                Sales Trends
              </button>
              <button 
                className="suggestion-chip"
                onClick={() => setInputMessage('How is customer satisfaction?')}
              >
                Customer Feedback
              </button>
              <button 
                className="suggestion-chip"
                onClick={() => setInputMessage('Revenue analysis for this month')}
              >
                Revenue Analysis
              </button>
              <button 
                className="suggestion-chip"
                onClick={() => setInputMessage('Sales forecast for next quarter')}
              >
                Sales Forecast
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
