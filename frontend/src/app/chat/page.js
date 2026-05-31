// app/chat/page.js
// This file contains the main chat interface for VEN Chat.
"use client"; // Marks this component as a Client Component in Next.js

import { useState, useEffect, useRef } from 'react'; // React hooks for state and side effects
import { Send, Loader2, Home } from 'lucide-react'; // Icons for the chat interface
import { useRouter } from 'next/navigation'; // For navigating back to the home page (using App Router's useRouter)
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs (install: npm install uuid)

// Define the n8n webhook URL
const N8N_WEBHOOK_URL = "https://jacksparrow69.app.n8n.cloud/webhook/047aea7b-6b1e-4a8b-ad75-af8e8eccaa4c";
// Define a default building ID for now
const DEFAULT_BUILDING_ID = "B2";

export default function ChatPage() {
  const router = useRouter(); // Initialize Next.js router for navigation
  const [messages, setMessages] = useState([]); // State to store chat messages
  const [input, setInput] = useState(''); // State to store the current input message
  const [isLoading, setIsLoading] = useState(false); // State to manage loading indicator
  const [sessionId, setSessionId] = useState(null); // State to store the user's session ID
  const [userId, setUserId] = useState(null); // State to store the user's ID
  const messagesEndRef = useRef(null); // Ref for scrolling to the latest message

  // useEffect to initialize user and session IDs from localStorage on component mount
  useEffect(() => {
    let storedUserId = localStorage.getItem('venchat_user_id'); // Changed key
    let storedSessionId = localStorage.getItem('venchat_session_id'); // Changed key

    if (!storedUserId) {
      storedUserId = uuidv4(); // Generate a new user ID if not found
      localStorage.setItem('venchat_user_id', storedUserId); // Changed key
    }
    if (!storedSessionId) {
      storedSessionId = uuidv4(); // Generate a new session ID if not found
      localStorage.setItem('venchat_session_id', storedSessionId); // Changed key
      // For a new session, you might want to send an initial "Hello" or welcome message from the bot
      // For this example, we'll let the first user message trigger the bot.
    }

    setUserId(storedUserId);
    setSessionId(storedSessionId);

    // Add an initial welcome message from the bot
    setMessages([{
      id: uuidv4(),
      sender: 'bot',
      text: 'Hello! I am VEN Chat. How can I assist you with your building-related questions today?' // Changed name
    }]);
  }, []); // Empty dependency array ensures this runs only once on mount

  // useEffect to scroll to the bottom of the chat window when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to send a message to the n8n webhook
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return; // Prevent sending empty messages or while loading

    const userMessage = { id: uuidv4(), sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Add user message to chat
    setInput(''); // Clear the input field
    setIsLoading(true); // Set loading state to true

    try {
      const payload = {
        user_id: userId,
        session_id: sessionId,
        message: userMessage.text,
        building_id: DEFAULT_BUILDING_ID, // Using the hardcoded default building ID
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Handle HTTP errors (e.g., 404, 500)
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse the JSON response from n8n

      // Add bot's response to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: uuidv4(), sender: 'bot', text: data.response || 'Sorry, I could not get a response.' },
      ]);

      // If n8n indicates a new session is required, update localStorage and state
      if (data.new_session_required) {
        const newSession = uuidv4();
        localStorage.setItem('venchat_session_id', newSession); // Changed key
        setSessionId(newSession);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: uuidv4(), sender: 'bot', text: 'A new session has started.' },
        ]);
      }

    } catch (error) {
      console.error('Error sending message to n8n:', error);
      // Display an error message to the user
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: uuidv4(), sender: 'bot', text: 'Oops! Something went wrong. Please try again later.' },
      ]);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Handle Enter key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Allow Shift+Enter for new line
      e.preventDefault(); // Prevent default Enter behavior (new line)
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter antialiased flex flex-col">
      {/* Header for Chat Page */}
      <header className="py-4 px-4 sm:px-6 lg:px-8 bg-gray-800 shadow-lg flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-blue-400 cursor-pointer" onClick={() => router.push('/')} />
          <span className="text-xl font-bold text-white">VEN Chat</span> {/* Changed from BuildingBot Chat */}
        </div>
        {/* Display User ID and Session ID (for debugging/info) */}
        <div className="text-xs text-gray-400 hidden sm:block">
          User: {userId ? userId.substring(0, 8) : 'Loading...'}... | Session: {sessionId ? sessionId.substring(0, 8) : 'Loading...'}...
        </div>
      </header>

      {/* Chat Messages Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg shadow-md ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-700 text-gray-100 rounded-bl-none'
              }`}
            >
              <p className="text-sm sm:text-base">{msg.text}</p>
            </div>
          </div>
        ))}
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[70%] p-3 rounded-lg shadow-md bg-gray-700 text-gray-100 rounded-bl-none flex items-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
              <span>VEN Chat is typing...</span> {/* Changed from BuildingBot is typing... */}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} /> {/* Scroll target */}
      </main>

      {/* Chat Input Area */}
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center space-x-3 max-w-3xl mx-auto">
          <textarea
            className="flex-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-hidden"
            rows={1} // Start with one row
            placeholder="Type your message..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // Auto-resize textarea based on content
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            style={{ maxHeight: '150px' }} // Max height to prevent excessive resizing
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Custom Scrollbar Styling (Optional, but improves aesthetics) */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937; /* gray-800 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563; /* gray-600 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280; /* gray-500 */
        }
      `}</style>
    </div>
  );
}
