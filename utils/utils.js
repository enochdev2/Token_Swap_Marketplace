import {ethers} from "ethers"


export function toWei(amount, decimals= 18) {
    const toWei = ethers.utils.parseUnits(amount, decimals)
    return toWei.toString();
}

export function toEth(amount, decimals= 18) {
    const toWei = ethers.utils.formatUnits(amount, decimals)
    return toWei.toString();
}

export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
