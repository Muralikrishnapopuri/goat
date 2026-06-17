import { useState, useEffect, useRef } from 'react';
import './App.css';

const MOCK_BOT_RESPONSES = {
  reconciliation: "React Reconciliation compares Virtual DOM elements with the actual DOM nodes utilizing key attributes to optimize operations.",
  fiber: "React Fiber is a complete rewrite of React's core rendering engine to support incremental, chunked-out asynchronous rendering tasks.",
  indexing: "MongoDB Indexes (like compound, text, or partial indexes) avoid complete collection scans to quickly query sorted keys.",
  auth: "JWT Auth issues HttpOnly secure cookies to store access/refresh tokens to prevent CSRF and XSS security vulnerabilities."
};

function App() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "Hello! I am CoreChat Bot. Ask me about MERN concepts like: 'reconciliation', 'fiber', 'indexing', or 'auth'.", timestamp: '10:00 AM' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeRoom, setActiveRoom] = useState('General Chat');

  const viewportRef = useRef(null);

  // KEY PLACEMENT: Auto scroll viewport on new messages (Reference: topics-points.txt)
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const normalizedInput = inputMessage.toLowerCase().trim();
    setInputMessage('');

    // KEY PLACEMENT: Mock bot reply timeout & response selector (Reference: topics-points.txt)
    setIsTyping(true);
    setTimeout(() => {
      let replyText = "Interesting! To learn details, query terms like 'fiber' or 'indexing' to fetch MERN system docs.";
      
      for (const [key, value] of Object.entries(MOCK_BOT_RESPONSES)) {
        if (normalizedInput.includes(key)) {
          replyText = value;
          break;
        }
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200); // 1.2s typing indicator delay
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="brand">
          <span className="logo-icon">💬</span>
          <div>
            <h1>CoreChat</h1>
            <p className="subtitle">MERN Level - Asynchronous Message Streams with Auto-Scroll & Bot Simulation</p>
          </div>
        </div>
      </header>

      <div className="chat-grid card">
        {/* Rooms Sidebar */}
        <aside className="chat-sidebar">
          <h3>Active Rooms</h3>
          <div className="rooms-list">
            {['General Chat', 'React Thread', 'DB Clustering'].map(room => (
              <button
                key={room}
                className={`room-item ${activeRoom === room ? 'active' : ''}`}
                onClick={() => setActiveRoom(room)}
              >
                📁 {room}
              </button>
            ))}
          </div>
        </aside>

        {/* Message Panel */}
        <main className="chat-main-panel">
          <div className="chat-room-info">
            <strong>#{activeRoom}</strong>
            <span className="active-badge">Online</span>
          </div>

          {/* Messages Viewport */}
          <div className="messages-viewport" ref={viewportRef}>
            {messages.map(msg => (
              <div key={msg.id} className={`message-bubble-wrapper ${msg.sender}-wrapper`}>
                <div className="message-bubble">
                  <p>{msg.text}</p>
                  <span className="message-timestamp">{msg.timestamp}</span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message-bubble-wrapper bot-wrapper">
                <div className="message-bubble typing-bubble">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Form Input */}
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              placeholder="Ask about reconciliation, fiber, indexing or auth..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isTyping}
              required
            />
            <button type="submit" className="btn btn-primary" disabled={isTyping}>Send</button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default App;
