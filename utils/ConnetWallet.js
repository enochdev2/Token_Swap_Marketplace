import React, { useEffect, useState } from "react";


export const ConnectWalletContext = React.createContext();

// let ethereum = window.ethereum;

export const ConnectWallet = ({ children }) => {
 
  const [currentAccount, setCurrentAccount] = useState("");



  const checkIfWalletIsConnect = async () => {
    try {
      // if (!window.ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("🚀 ~ connectWal ~ accounts:", accounts)

      setCurrentAccount(accounts[0]);
      // window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };



  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <ConnectWalletContext.Provider
      value={{
        connectWallet,
        currentAccount,
      }}
    >
      {children}
    </ConnectWalletContext.Provider>
  );
};
