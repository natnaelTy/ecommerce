import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", { message: input });
      console.log(res.data)
      setMessages([...newMessages, { sender: "bot", text: res.data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { sender: "bot", text: "Error: Could not connect" }]);
    }

    setInput("");
  };

  return (
    <div style={{ width: "400px", margin: "auto", fontFamily: "sans-serif" }}>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "80%", padding: "5px" }}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} style={{ width: "18%", padding: "5px" }}>
        Send
      </button>
    </div>
  );
}
