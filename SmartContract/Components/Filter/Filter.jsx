import React, { useState, useContext } from "react";
import Image from "next/image";

import Style from "./Filter.module.css";
import images from "../../assets";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model } from "../index";
import { div } from "framer-motion/client";

const Filter = () => {
    const { account, addFriends } = useContext(ChatAppContext);

    // usestate
    const [addFriend, setAddFriend] = useState(false);
    return (
        <div className={Style.Filter}>
            <div className={Style.Filter_box}>
                <div className={Style.Filter_box_left}>
                    <div className={Style.Filter_box_left_search}>
                        <Image
                            src={images.search}
                            alt="img"
                            width={20}
                            height={20}
                        />
                        <input
                            type="text"
                            placeholder="search..."
                        />
                    </div>
                </div>
                <div className={Style.Filter_box_right}>
                    <button>
                        <Image
                            src={images.clear}
                            alt="clear"
                            width={20}
                            height={20}
                        />
                        CLEAR CHAT
                    </button>
                    <button onClick={() => setAddFriend(true)}>
                        <Image
                            src={images.clear}
                            alt="clear"
                            width={20}
                            height={20}
                        />
                        ADD FRIEND
                    </button>
                </div>
            </div>
            {/* Model component */}
            {addFriend && (
                <div className={Style.Filter_model}>
                    <Model
                        openBox={setAddFriend}
                        title="WELCOME TO"
                        head="BLOCK CHAT"
                        info="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error nihil mollitia ipsum molestiae, velit voluptatum aliquid deserunt explicabo esse, magni, ducimus doloribus. Odit, ullam earum velit magni in doloremque voluptas."
                        smallInfo="Kindley Select Your Friend name and address"
                        image={images.hero}
                        functionName={addFriends}
                    />
                </div>
            )}
        </div>
    );
};

export default Filter;
