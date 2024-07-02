import { useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'; 

const webSocketUrl = 'wss://rest-j2kjfrifbq-ez.a.run.app/ws';

export const useLocationService = () => {
  const userToken = useContext(AuthContext);
  const ws = useRef(null);

  // ... (WebSocket connection logic remains mostly the same)

  const sendLocationUpdate = (location) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(location));
    }
  };

  return { sendLocationUpdate }; 
};