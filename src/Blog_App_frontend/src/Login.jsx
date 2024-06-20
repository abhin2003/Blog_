// Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Artemis } from 'artemis-web3-adapter';

const connectObj = { whitelist: ['bw4dl-smaaa-aaaaa-qaacq-cai'], host: 'https://icp0.io/' };
const artemisWalletAdapter = new Artemis(connectObj);

function Login({ setWalletAddress }) {
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate('/blogs/new');
    }
  }, [isConnected, navigate]);

  const connectWallet = async () => {
    try {
      console.log('Attempting to connect wallet...');
      const result = await artemisWalletAdapter.connect();
      console.log('Wallet connected:', result.principalId);
      setWalletAddress(result.principalId);
      setIsConnected(true);
    } catch (err) {
      console.error('Error connecting to wallet:', err);
      setError('Failed to connect wallet.');
    }
  };
  
  const disconnectWallet = async () => {
    try {
      console.log('Attempting to disconnect wallet...');
      await artemisWalletAdapter.disconnect();
      console.log('Wallet disconnected');
      setWalletAddress(null);
      setIsConnected(false);
    } catch (err) {
      console.error('Error disconnecting from wallet:', err);
      setError('Failed to disconnect wallet.');
    }
  };
  

  return (
    <div>
      <button onClick={isConnected ? disconnectWallet : connectWallet}>
        {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default Login;
