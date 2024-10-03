// fontend for chat model
import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: message }),
      });

      const data = await res.json();
      if (data.error) {
        setResponse('Error: ' + data.error);
      } else {
        setResponse(data.response);
      }
    } catch (error) {
      setResponse('Error: Unable to communicate with the server.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Chat with LLM</h1>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        placeholder="Type your message..."
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      <button onClick={sendMessage} disabled={loading} style={{ padding: '10px 20px' }}>
        {loading ? 'Sending...' : 'Send'}
      </button>

      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd' }}>
        <h3>Response from LLM:</h3>
        <p>{response ? response : 'No response yet'}</p>
      </div>
    </div>
  );
}
