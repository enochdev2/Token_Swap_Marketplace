import {BigNumber, ethers} from 'ethers';
import {contract, tokenContract} from './contract';
import {toEth, toWei} from './utils';

export async function swapEthToToken(tokenName, amount) {
    console.log(tokenName);
    try {
        let tx = {value: toWei(amount)};

        const contractObj = await contract();
        const data = await contractObj.swapEthToToken(tokenName, tx);

        const receipt = await data.wait();
          return receipt;
    } catch (e) {
        return parseErrorMsg(e);
    }
}

export async function hasValidAllowance(owner, tokenName, amount) {
    try {
        const contractObj = await contract();
        const address = await contractObj.getTokenAddress(tokenName);

        const TokenContractObj = await tokenContract(address);
        const data = await TokenContractObj.allowance(
            owner,
            "0x975c086FF834402822B9b0a1A7020836314f23c8"
        );

        const result = BigNumber.from(data.toString()).gte(
            BigNumber.from(toWei(amount))
        );

          return result; 
    } catch (e) {
        return parseErrorMsg(e);
    }
}

export async function swapTokenToEth(tokenName, amount) {
    try {
        const contractObj = await contract();
        const data = await contractObj.swapTokenToEth(tokenName,  toWei(amount));

        const receipt = await data.wait();
          return receipt;
    } catch (e) {
        return parseErrorMsg(e);
    }
}

export async function swapTokenToToken(srcToken, destToken, amount) {
    try {
        const contractObj = await contract();
        const data = await contractObj.swapTokenToToken(
            srcToken,
            destToken,
            toWei(amount)
        );

        const receipt = await data.wait();
          return receipt;
    } catch (e) {
        return parseErrorMsg(e);
    }
}

export async function getTokenBalance(tokenName, address) {
        const contractObj = await contract();
        const balance = await contractObj.getBalance(tokenName, address);
        return balance;
}

export async function getTokenAddress(tokenName) {
    try {
        const contractObj = await contract();
        const address = await contractObj.getTokenAddress(tokenName);
        return address;
    } catch (e) {
        return parseErrorMsg(e);
    }
}

export async function increaseAllowance(tokenName, amount) {
    try {
        const contractObj = await contract();
        const address = await contractObj.getTokenAddress(tokenName);
        console.log("i got here");
        
        const tokenContractObj = await tokenContract(address);
        
        const data = await tokenContractObj.approve(
        "0x975c086FF834402822B9b0a1A7020836314f23c8",
        toWei(amount)
    );
        console.log("🚀 ~ increaseAllowance ~ data:", data)

        const receipt = await data.wait();
        console.log("🚀 ~ increaseAllowance ~ receipt :", receipt )
        return receipt;
    } catch (e) {
        return parseErrorMsg(e);
    }
}

export async function getAllHistory() {
    try {
        const contractObj = await contract();
        const getAllHistory = await contractObj.getAllHistory();

         const historyTransaction = getAllHistory.map((history, i) => ({
            historyId: history.historyId.toNumber(),
            tokenA: history.tokenA,
            tokenB: history.tokenB,
            inputValue: toEth(history?.inputValue),
            outputValue: toEth(history?.outputValue),
            userAddress: history.userAddress,
         }));

          return historyTransaction;
    } catch (e) {
        return parseErrorMsg(e);
    }
}

// function toWei(amount) {
//     const toWei = ethers.utils.parseUnits(amount.toString());
//     return toWei.toString();
// }
function parseErrorMsg(e) {
    const json = JSON.parse(JSON.stringify(e));
    return json?.reason || json?.error?.message;
}

    //contract address for  polygonAmoy testnet "0x4e0320d417f41f2b3152D65f377A038B6Fc45491",
    //contract address for  sepolia testnet "0x975c086FF834402822B9b0a1A7020836314f23c8",