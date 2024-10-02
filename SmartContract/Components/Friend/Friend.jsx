// import React, { useContext } from "react";
// import Image from "next/image";

// import Style from "./Friend.module.css";
// import images from "../../assets";
// import Card from "./Card/Card";
// import Chat from "./Chat/Chat";
// import { ChatAppContext } from "../../Context/ChatAppContext";

// const Friend = () => {
//     const { sendMessage, account, friendLists, readMessage, userName, loading, currentUserName, currentUserAddress, readUser, friendMsg } = useContext(ChatAppContext);

//     return (
//         <div className={Style.Friend}>
//             <div className={Style.Friend_box}>
//                 <div className={Style.Friend_box_left}>
//                     {friendLists.map((el, i) => (
//                         <Card
//                             key={i + 1}
//                             el={el}
//                             i={i}
//                             readMessage={readMessage}
//                             readUser={readUser}
//                         />
//                     ))}
//                 </div>
//                 <div className={Style.Friend_box_right}>
//                     <Chat
//                         functionName={sendMessage}
//                         readMessage={readMessage}
//                         friendMsg={friendMsg}
//                         account={account}
//                         userName={userName}
//                         loading={loading}
//                         currentUserName={currentUserName}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Friend;

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import styles from "./Friend.module.css";
import ChatAppContext from "../../Context/ChatAppContext";
import Card from "../../Components/Friend/Card/Card"; // Import the Card component
import Chat from "../../Components/Friend/Chat/Chat"; // Import the Chat component
import { images } from "../../assets";

const Friend = () => {
    const { account, username, friendList, loading, userList, error, readMessage, getUserInfo } = useContext(ChatAppContext);

    const [selectedFriend, setSelectedFriend] = useState(null); // State for the selected friend
    const [friendMessages, setFriendMessages] = useState([]); // State for messages of the selected friend

    useEffect(() => {
        // Fetch messages for the selected friend when it changes
        if (selectedFriend) {
            readMessage(selectedFriend.friendKey).then((messages) => {
                setFriendMessages(messages);
            });
        }
    }, [selectedFriend, readMessage]);

    const handleFriendClick = async (friend) => {
        setSelectedFriend(friend);
        await getUserInfo(friend.friendKey); // Fetch user info for the selected friend
    };

    return (
        <div className={styles.friend}>
            <div className={styles.friendBox}>
                <div className={styles.friendBoxLeft}>
                    {loading ? (
                        <div className={styles.loaderBox}>
                            <Image
                                src={images.loader}
                                alt="Loader"
                                width={50}
                                height={50}
                            />
                        </div>
                    ) : (
                        <>
                            {friendList.length > 0 ? (
                                friendList.map((friend, i) => (
                                    <Card
                                        key={i + 1}
                                        friend={friend}
                                        onClick={() => handleFriendClick(friend)}
                                    />
                                ))
                            ) : (
                                <div className={styles.noFriends}>
                                    <p>You have no friends yet.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className={styles.friendBoxRight}>
                    {selectedFriend ? (
                        <Chat
                            friend={selectedFriend}
                            messages={friendMessages}
                            username={username}
                            currentUsername={currentUsername}
                            currentUserAddress={currentUserAddress}
                        />
                    ) : (
                        <div className={styles.noChat}>
                            <p>Select a friend to chat.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Friend;
