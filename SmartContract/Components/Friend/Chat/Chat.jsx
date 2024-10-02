// import React, { useEffect, useState } from "react";
// import styles from "./Chat.module.css";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import images from "../../../assets";
// import { convertTime } from "../../../Utils/apiFeature";
// import { Loader } from "../../index";

// const Chat = ({ functionName, readMessage, friendMsg, account, userName, loading, currentUsername, currentUserAddress }) => {
//     const [message, setMessage] = useState("");
//     const [chatData, setChatData] = useState({
//         name: "",
//         address: "",
//     });

//     const router = useRouter();

//     useEffect(() => {
//         if (!router.isReady) return;

//         const { name, address } = router.query;

//         setChatData({
//             name: name || "",
//             address: address || "",
//         });
//     }, [router.isReady, router.query]);

//     return (
//         <div className={styles.Chat}>
//             {currentUsername && currentUserAddress ? (
//                 <div className={styles.Chat_user_info}>
//                     <Image
//                         src={images.accountName}
//                         alt="user image"
//                         width={70}
//                         height={70}
//                     />
//                     <div className={styles.Chat_user_info_box}>
//                         <h4>{currentUsername}</h4>
//                         <p className={styles.show}>{currentUserAddress}</p>
//                     </div>
//                 </div>
//             ) : (
//                 ""
//             )}
//             <div className={styles.Chat_box_box}>
//                 <div className={styles.Chat_box}>
//                     <div className={styles.Chat_box_left}>
//                         {friendMsg.map((el, i) => (
//                             <div key={i}>
//                                 {el.sender === chatData.address ? (
//                                     <div className={styles.Chat_box_left_title}>
//                                         <Image
//                                             src={images.accountName}
//                                             alt="image"
//                                             width={50}
//                                             height={50}
//                                         />
//                                         <span>
//                                             {chatData.name} <small>Time {convertTime(el.timestamp)}</small>
//                                         </span>
//                                     </div>
//                                 ) : (
//                                     <div className={styles.Chat_box_left_title}>
//                                         <Image
//                                             src={images.accountName}
//                                             alt="image"
//                                             width={50}
//                                             height={50}
//                                         />
//                                         <span>
//                                             {userName} <small>Time {convertTime(el.timestamp)}</small>
//                                         </span>
//                                     </div>
//                                 )}
//                                 <p>{el.msg}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 {currentUsername && currentUserAddress ? (
//                     <div className={styles.Chat_box_send}>
//                         <div className={styles.Chat_box_send_img}>
//                             <Image
//                                 src={images.smile}
//                                 alt="smile"
//                                 width={50}
//                                 height={50}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="type your message"
//                                 onChange={(e) => setMessage(e.target.value)}
//                             />
//                             <Image
//                                 src={images.file}
//                                 alt="file"
//                                 width={50}
//                                 height={50}
//                             />
//                             {loading ? (
//                                 <Loader />
//                             ) : (
//                                 <>
//                                     <Image
//                                         src={images.send}
//                                         alt="send"
//                                         width={50}
//                                         height={50}
//                                     />
//                                     <button onClick={() => functionName({ msg: message, address: chatData.address })}>Send</button>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 ) : (
//                     ""
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Chat;

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import styles from "./Chat.module.css";
import ChatAppContext from "../../../Context/ChatAppContext";
import { images } from "../../../assets";

const Chat = ({ friend, messages, username, currentUsername, currentUserAddress }) => {
    const { sendMessage, convertTime } = useContext(ChatAppContext);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = async () => {
        if (newMessage.trim() !== "") {
            await sendMessage(friend.friendKey, newMessage);
            setNewMessage("");
        }
    };

    return (
        <div className={styles.chat}>
            <div className={styles.chatBox}>
                <div className={styles.chatUserInfo}>
                    <Image
                        src={images.user}
                        alt="User"
                        width={50}
                        height={50}
                    />
                    <div className={styles.chatUserInfoText}>
                        <h3>{currentUsername}</h3>
                        <p>{currentUserAddress.slice(0, 10)}...</p>
                    </div>
                </div>
                <div className={styles.chatMessages}>
                    {messages.length > 0 ? (
                        messages.map((message, i) => (
                            <div
                                key={i + 1}
                                className={message.sender === username ? styles.chatMessageRight : styles.chatMessageLeft}>
                                <div className={styles.chatMessageContent}>
                                    <p>{message.message}</p>
                                    <span className={styles.chatMessageTime}>{convertTime(message.timestamp)}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.noMessages}>
                            <p>No messages yet.</p>
                        </div>
                    )}
                </div>
                <div className={styles.chatInput}>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
