import React, {useContext, useEffect, useState} from "react";
// import {ConnectButton} from "@rainbow-me/rainbowkit";
import { AiFillPlayCircle } from "react-icons/ai";
import Link from "next/link"

import toast, {Toaster} from "react-hot-toast";
import { ConnectWalletContext } from "../utils/ConnetWallet";


import TokenBalance from "./TokenBalance";
import Logo from "./SVG/Logo";
import Menu from "./SVG/Menu";
import { shortenAddress } from "../utils/utils";

const Header = () => {
  const [tokenBalComp, setTokenBalComp] = useState();
  const { currentAccount, connectWallet } = useContext(ConnectWalletContext);


  const address = currentAccount;
  
  const notifyConnectWallet = ()=> toast.error("Connect wallet.", {duration: 2000});

  useEffect(() => {
   setTokenBalComp(
    <>
    <TokenBalance name={"USD Coin"} walletAddress={address}/>
    <TokenBalance name={"BNB"} walletAddress={address}/>
    <TokenBalance name={"SHIBA INU"} walletAddress={address}/>

    </>
   );
   
   if(!address) notifyConnectWallet();
  }, [address])

  return(
  <header className="p-4 text-gray-100 " >
    <div className=" container flex justify-between h-16 mx-auto " >
      <div className="flex">
        <a 
        rel="noopener noreferrer"
        href="#"
        aria-label="Back to homepage"
        className="flex items-center p-2"
        >
          <Logo/>
        </a>
        <ul className=" items-stretch hidden space-x-3 lg:flex ">
            <li className="flex" >
                <a 
                rel="noopener noreferrer"
                href="/"
                className="flex items-center px-4 -mb-1 dark:border-transparent text-[#7765F3]"
                >
                Swap
                </a>
            </li>
            <li className="flex" >
              <Link href="/Tokens">
                  <a 
                rel="noopener noreferrer"
                //  href="/tokens"
                className="flex items-center px-4 -mb-1 dark:border-transparent"
                >
                  Tokens
                </a>
            </Link>
            </li>
            <li className="flex" >
              <a 
              rel="noopener noreferrer"
              href="/"
              className="flex items-center px-4 -mb-1 dark:border-transparent"
              >
              NFTs
              </a>
            </li>
            <li className="flex" >
                <a 
                rel="noopener noreferrer"
                href="/"
                className="flex items-center px-4 -mb-1 dark:border-transparent"
                >
                Pool
                </a>
            </li>
        </ul>
      </div>
      <div className="items-center flex-shrink-0 hidden lg:flex">
      <TokenBalance name={"USD Coin"} walletAddress={address}/>
      <TokenBalance name={"SHIBA INU"} walletAddress={address}/>
      {/* <ConnectButton/> */}
      {!currentAccount ? (
              <button
                type="button"
                onClick={connectWallet}
                className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
              >
                <AiFillPlayCircle className="text-white mr-2" />
                <p className="text-white text-base font-semibold">
                  Connect Wallet
                </p>
              </button>
            ) :
            ( <button
                type="button"
              
                className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
              >
                <AiFillPlayCircle className="text-white mr-2" />
                <p className="text-white text-base font-semibold">
                  Connected {shortenAddress(currentAccount)}
                </p>
              </button>
            )
            }
      </div>
      <button className="p-4 lg:hidden">
        <Menu/>
      </button>
    </div>
    <Toaster/>
  </header>
  );
};

export default Header;
