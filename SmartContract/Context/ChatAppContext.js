import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { checkIfWalletConnected, connectWallet, connectingWithcontract } from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("");

    // Chat user data
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");

    const router = useRouter();

    const fetchData = async () => {
        try {
            const contract = await connectingWithcontract();

            // Get the connected wallet account
            const connectAccount = await connectWallet();
            setAccount(connectAccount);

            // Get username by account
            const userName = await contract.getUsername(connectAccount);
            setUserName(userName);

            // Get friend list
            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);

            // Get all app users list
            const userList = await contract.getAllAppUser();
            setUserLists(userList);
        } catch (error) {
            setError("Please install and connect your wallet");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    //read msg
    const readMessage = async (friendAddress) => {
        try {
            const contract = await connectingWithcontract();
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(read);
        } catch (error) {
            setError("Currently you have no message");
        }
    };

    // create account
    const createAccount = async ({ name, accountAddress }) => {
        try {
            // if (name || accountAddress) return setError("name and account address must be there");

            const contract = await connectingWithcontract();
            const getCreatedUser = await contract.createAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Error while creating your account please reload browser");
        }
    };

    // add your friends
    const addFriends = async ({ name, accountAddress }) => {
        try {
            if (name || accountAddress) return setError("please provide information of the friend");
            const contract = await connectingWithcontract();
            const addMyFriend = await contract.addFriend(accountAddress, name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();
        } catch (error) {
            setError("something went wrong while adding friend. Try again");
        }
    };

    // send msg to friend
    const sendMessage = async ({ msg, address }) => {
        try {
            if (msg || address) return setError("please type your message");
            const contract = await connectingWithcontract();
            const addMessage = await contract.sendMessage(address, msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("please try again");
        }
    };

    // read user info
    const readUser = async (userAddress) => {
        const contract = await connectingWithcontract();
        const userName = await contract.getUsername(userAddress);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress);
    };

    return (
        <ChatAppContext.Provider
            value={{
                readMessage,
                createAccount,
                addFriends,
                sendMessage,
                readUser,
                connectWallet,
                checkIfWalletConnected,
                account,
                userName,
                friendLists,
                friendMsg,
                loading,
                userLists,
                error,
                currentUserName,
                currentUserAddress,
            }}>
            {children}
        </ChatAppContext.Provider>
    );
};
