import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { ChatAppAddress, ChatAppABI } from "../Context/constants";

export const checkIfWalletConnected = async () => {
    try {
        if (!window.ethereum) return console.log("Install MetaMask");
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
};

export const connectWallet = async () => {
    try {
        if (!window.ethereum) return console.log("Install MetaMask");
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
};

const fetchContract = (signerOrProvider) => new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithcontract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log(error);
    }
};

export const convertTime = (time) => {
    const newTime = new Date(time.toNumber());
    const realTime = newTime.getHours() + "/" + newTime.getMinutes() + "/" + newTime.getSeconds() + "/" + " Date:" + newTime.getDate() + "/" + (newTime.getMonth() + 1) + "/" + newTime.getFullYear();
    return realTime;
};

///////
// export const getProviderDetails = async () => {
//     try {
//         const web3modal = new Web3Modal();
//         const connection = await web3modal.connect();
//         const provider = new ethers.providers.Web3Provider(connection);

//         const network = await provider.getNetwork();
//         const blockNumber = await provider.getBlockNumber();
//         const gasPrice = await provider.getGasPrice();

//         return {
//             networkName: network.name,
//             chainId: network.chainId,
//             blockNumber: blockNumber,
//             gasPrice: ethers.utils.formatUnits(gasPrice, "gwei") + " gwei",
//         };
//     } catch (error) {
//         console.log("Error getting provider details:", error);
//         return null;
//     }
// };
