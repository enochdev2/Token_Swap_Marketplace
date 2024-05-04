import {ethers} from 'ethers'
import CustomDexABI from "../utils/CustomDex.json";
import CustomTokenABI from "../utils/CustomToken.json";

export const tokenContract = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const {ethereum} = window;

    if(ethereum) {
        const signer = provider.getSigner();

        const contractReader = new ethers.Contract( 
            address, 
            CustomDexABI.abi, 
            signer
        );

        return contractReader;
    }
}

export const contract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const {ethereum} = window;

    if(ethereum) {
        const signer = provider.getSigner();

        const contractReader = new ethers.Contract( 
            "0x975c086FF834402822B9b0a1A7020836314f23c8", 
            CustomDexABI.abi, 
            signer
        );

        return contractReader;
    }
}