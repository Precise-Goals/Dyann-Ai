import React, { useState, useRef } from "react";

const mockBotReply = async () => {
  // Simulate LLM API call
  return new Promise((res) =>
    setTimeout(() => res("I'm your data assistant! (mock reply)"), 900)
  );
};

export const Assista = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me anything about your data." },
  ]);
  const [listening, setListening] = useState(false);
  const [input, setInput] = useState("");
  const recognitionRef = useRef(null);

  const handleVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported.");
      return;
    }
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    setInput("");
    const reply = await mockBotReply(input);
    setMessages((msgs) => [...msgs, { from: "bot", text: reply }]);
  };

  return (
    <section
      className="card app-abstract-bg"
      style={{ minHeight: 320, maxWidth: 500, margin: "2rem auto" }}
    >
      <h2 style={{ fontWeight: 700, fontSize: "2rem" }}>Assista: Voice AI</h2>
      <div
        style={{
          minHeight: 180,
          margin: "1.5rem 0",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 12px #18181811",
          padding: 16,
          overflowY: "auto",
          maxHeight: 220,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.from === "user" ? "right" : "left",
              margin: "8px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: m.from === "user" ? "#61dafb" : "#181818",
                color: m.from === "user" ? "#181818" : "#fff",
                borderRadius: 12,
                padding: "8px 16px",
                fontWeight: 500,
                maxWidth: 320,
                wordBreak: "break-word",
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or use voice..."
          style={{
            flex: 1,
            borderRadius: 8,
            border: "1px solid #eee",
            padding: 10,
            fontSize: 16,
          }}
        />
        <button
          onClick={handleSend}
          className="bright-accent"
          style={{ fontWeight: 600, fontSize: 18, padding: "0.6rem 1.2rem" }}
        >
          Send
        </button>
        <button
          onClick={handleVoice}
          className="bright-accent"
          style={{
            fontWeight: 600,
            fontSize: 18,
            borderRadius: "50%",
            width: 44,
            height: 44,
            background: listening ? "#61dafb" : "#fff",
            color: listening ? "#fff" : "#61dafb",
            border: "2px solid #61dafb",
          }}
        >
          <span role="img" aria-label="mic">
            🎤
          </span>
        </button>
      </div>
    </section>
  );
};
