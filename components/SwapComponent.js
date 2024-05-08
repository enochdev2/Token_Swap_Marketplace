import React, {useContext, useEffect, useRef, useState} from "react";
import {
  hasValidAllowance,
  increaseAllowance,
  swapEthToToken,
  swapTokenToEth,
  swapTokenToToken
} from "../utils/context";
import { MdArrowDropDown } from 'react-icons/md'
import { MdKeyboardArrowDown } from "react-icons/md";
import SwapField from "./SwapField";
import TransactionStatus  from "./TransactionStatus";
import toast, {Toaster} from "react-hot-toast";
import  {DEFAULT_VALUE, ETH} from "../utils/saleToken";
import  {toWei, toEth} from "../utils/utils";
import { ConnectWallet, ConnectWalletContext } from "../utils/ConnetWallet";
import { Router, useRouter } from "next/router";


const SwapComponent = () => {
  const [srcToken, setSrcToken] = useState(ETH);
  const [destToken, setDestToken] = useState(DEFAULT_VALUE);
  
  const [inputValue, setInputValue] = useState();
  const [outputValue, setOutputValue] = useState();
  
  const inputValueRef = useRef();
  const outputValueRef = useRef();

 const isReversed = useRef(false);

 const INCREASE_ALLOWANCE = "Increase allowance";
 const ENTER_AMOUNT = "Enter an amount";
 const CONNECT_WALLET = "Connect wallet";
 const SWAP = "Swap"; 

 const router = useRouter()

  const srcTokenObj = {
    id:"srcToken",
    value: inputValue,
    setValue: setInputValue,
    defaultValue: srcToken,
    ignoreValue: destToken,
    setToken: setSrcToken,
  };

  const destTokenObj = {
    id:"destToken",
    value: outputValue,
    setValue: setOutputValue,
    defaultValue: destToken,
    ignoreValue: srcToken,
    setToken: setDestToken,
  };

   const [srcTokenComp, setSrcTokenComp] = useState();
   const [destTokenComp, setDestTokenComp] = useState();

   const [swapBtnText, setSwapBtnText] = useState(ENTER_AMOUNT);
   const [txPending, setTxPending] = useState(false);

   const notifyError = (msg) => toast.error(msg, {duration: 6000});
   const notifySuccess = () => toast.success("Transaction completed");
   const { currentAccount, connectWallet } = useContext(ConnectWalletContext);
  
   const address  = currentAccount;

   useEffect(() => {


    if(!address) setSwapBtnText(CONNECT_WALLET);
    else if (!inputValue || !outputValue) setSwapBtnText(ENTER_AMOUNT);
    else setSwapBtnText(SWAP);
   }, [inputValue, outputValue, address]);

   useEffect(() => {
   if(
    document.activeElement !== outputValueRef.current &&
    document.activeElement.ariaLabel !== "srcToken" &&
    !isReversed.current
   )
   populateOutputValue(inputValue);

   setSrcTokenComp(<SwapField obj={srcTokenObj} ref={inputValueRef} />);

   if (inputValue?.length === 0) setOutputValue("");
   }, [inputValue, destToken]);

   useEffect(() => {
    if(
     document.activeElement !== inputValueRef.current &&
     document.activeElement.ariaLabel !== "descToken" &&
     !isReversed.current
    )
    populateInputValue(outputValue);
 
    setDestTokenComp(<SwapField obj={destTokenObj} ref={outputValueRef} />);
 
    if (outputValue?.length == 0) setInputValue("");


    if (isReversed.current) isReversed.current = false;
    }, [outputValue, destToken]);
   
    return (
      <div className="border-[1px] rounded-l border-[#7765F3] bg-[#7765F3] w-[100%] p-4 px-6 rounded-xl ">
      <div className="flex items-center justify-between py-4 px-1 ">
    <p> Swap </p>
    <MdArrowDropDown className="h-6" />
      </div>
      <div className=" relative bg-[#212429] p-4 py-6 rounded-xl  mb-2 border-[2px] border-transparent w-[100%] hover:border-zinc-600 ">
    {srcTokenComp}

    <MdKeyboardArrowDown
    className="absolute left-1/2 -translate-x-1/2 -bottom-6 h-10 p-1 px-2 bg-[#241c1c] border-4 border-zinc-900 text-zinc-300 rounded-xl cursor-pointer hover:scale-110"
    onClick={handleReverseExchange}
    />
      </div>

      <div className=" bg-[#212429] w-[100%] p-4 py-6 rounded-xl  mt-2 border-[2px]  border-transparent hover:border-zinc-600">
     {destTokenComp}
      </div>

      <button 
      className={getSwapBtnClassName()}
      onClick={()=> {
        if(swapBtnText === INCREASE_ALLOWANCE) handleIncreaseAllowance();
        else if(swapBtnText === SWAP) handleSwap();
        else if(swapBtnText === CONNECT_WALLET) connectWallet()
      }}
      >
{swapBtnText}
      </button>

    {txPending  && <TransactionStatus />}

    <Toaster/>
      </div>
    );

    async function handleSwap () {
      if (srcToken === ETH && destToken !== ETH) {
        performSwap();
      } else {

       setTxPending(true);
       const result = await hasValidAllowance(address, srcToken, inputValue);
       setTxPending(false);

       if (result) performSwap();
       else handleInsufficientAllowance();
      }
    }
   
  async function handleIncreaseAllowance() {

    setTxPending(true);
    await increaseAllowance(srcToken, inputValue);
    setTxPending(false);


    setSwapBtnText(SWAP);
  }

    function handleReverseExchange(e) {


      isReversed.current = true;




      setInputValue(outputValue);
      setOutputValue(inputValue);

      setSrcToken(destToken);
      setDestToken(srcToken);
    }

    function getSwapBtnClassName(){
      let className = "p-4 w-full my-2 cursor-pointer rounded-xl";
      className += 
      swapBtnText === ENTER_AMOUNT || swapBtnText === CONNECT_WALLET 
      ? "text-zinc-400 bg-zinc-800 pointer-events-none" 
      : "bg-blue-700";
      className += swapBtnText === INCREASE_ALLOWANCE ? " bg-yellow-600" : "";
      return className;
    }

    function populateOutputValue() {
      if ( 
        destToken === DEFAULT_VALUE || 
        srcToken === DEFAULT_VALUE ||
        !inputValue
      )
      return;
      try {
        if (srcToken !== ETH && destToken  !== ETH )  setOutputValue(inputValue);
        else if (srcToken === ETH && destToken !== ETH) {
          const outValue = toEth(toWei(inputValue), 14);
          setOutputValue(outValue);
        } else if (srcToken !== ETH && destToken === ETH) {
          const outValue = toEth(toWei(inputValue, 14));
          setOutputValue(outValue);
        }
      } catch (error) {
        setOutputValue("0");
      }
    }

    function populateInputValue() {
      if(
        destToken === DEFAULT_VALUE ||
        srcToken === DEFAULT_VALUE ||
        !outputValue
      )
      return;

      try {
        if (srcToken !== ETH && destToken  !== ETH )  setInputValue(outputValue);
        else if (srcToken === ETH && destToken !== ETH) {
          const outValue = toEth(toWei(inputValue, 14));
          setInputValue(outValue);
        } else if (srcToken !== ETH && destToken === ETH) {
          const outValue = toEth(toWei(outputValue), 14);
          setOutputValue(outValue);
        }
      } catch (error) {
        setInputValue("0");
      }
    }

     async function performSwap() {
      setTxPending(true);
      let receipt;
      
      if (srcToken === ETH && destToken !== ETH) {
        receipt = await swapEthToToken(destToken, inputValue);
      } else if (srcToken !== ETH && destToken === ETH) {
        receipt = await swapTokenToEth(srcToken, inputValue);
      } else receipt = await swapTokenToToken(srcToken, destToken, inputValue);

      setTxPending(false);

      router.push("/Tokens")

      if (receipt && !receipt.hasOwnProperty("transactionhash")) notifyError(receipt);
    else notifySuccess();
};

function handleInsufficientAllowance() {
  notifyError(
    "insufficient allowance. Click 'Increase allowance' to increase it."
  );
  setSwapBtnText(INCREASE_ALLOWANCE);
}
};

export default SwapComponent;
