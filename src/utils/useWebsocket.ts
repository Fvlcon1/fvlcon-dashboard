import { useEffect, useRef, useState } from 'react';
import { UseWebSocketReturn, WebSocketMessage } from './@types';

const useWebSocket = (url: string, callback?: (message: any) => void): UseWebSocketReturn => {
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const websocketRef = useRef<WebSocket | null>(null);
  const keepAliveInterval = 5 * 60 * 1000;

  useEffect(() => {
    const connectWebSocket = () => {
      const websocket = new WebSocket(url);
      websocketRef.current = websocket;

      websocket.onopen = () => {
        console.log('Connected to WebSocket');
      };

      websocket.onmessage = (event) => {
        const message: WebSocketMessage = JSON.parse(event.data);
        callback && callback(message);
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      websocket.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };

      websocket.onclose = (event) => {
        console.log(`WebSocket connection closed: ${event.reason}`);
        setTimeout(connectWebSocket, 1000); 
      };
    };

    connectWebSocket();

    const keepAlive = setInterval(() => {
      if (websocketRef.current?.readyState === WebSocket.OPEN) {
        websocketRef.current.send(JSON.stringify({ action: 'ping' }));
      }
    }, keepAliveInterval);

    return () => {
      clearInterval(keepAlive);
      websocketRef.current?.close();
    };
  }, [url]);

  const sendMessage = (message: WebSocketMessage) => {
    if (websocketRef.current?.readyState === WebSocket.OPEN) {
      websocketRef.current.send(JSON.stringify(message));
    } else {
      console.log('WebSocket is not open');
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
