import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Model, Error } from "../index";
import images from "../../assets";
import { ChatAppContext } from "../../Context/ChatAppContext";

import Style from "./NavBar.module.css";

const NavBar = () => {
    const menuItems = [
        {
            menu: "ALL USERS",
            link: "alluser",
        },
        {
            menu: "CHAT",
            link: "/",
        },
        {
            menu: "CONTACT",
            link: "/",
        },
        {
            menu: "SETTING",
            link: "/",
        },
        {
            menu: "FAQS",
            link: "/",
        },
    ];

    // usestate
    const [active, setActive] = useState(2);
    const [open, setOpen] = useState(false);
    const [openModel, setOpenModel] = useState(false);

    const { account, userName, connectWallet, createAccount, error } = useContext(ChatAppContext);

    return (
        <div className={Style.NavBar}>
            <div className={Style.NavBar_box}>
                <div className={Style.NavBar_box_left}>
                    <Image
                        src={images.logo}
                        alt="logo"
                        width={50}
                        height={50}
                    />
                </div>
                <div className={Style.NavBar_box_right}>
                    <div className={Style.NavBar_box_right_menu}>
                        {menuItems.map((el, i) => (
                            <div
                                onClick={() => setActive(i + 1)}
                                key={i + 1}
                                className={`${Style.NavBar_box_right_menu_items} ${active == i + 1 ? Style.active_btn : ""}`}>
                                <Link
                                    className={Style.NavBar_box_right_menu_items_link}
                                    href={el.link}>
                                    {el.menu}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Mobile menu */}
                    {open && (
                        <div className={Style.mobile_menu}>
                            {menuItems.map((el, i) => (
                                <div
                                    onClick={() => setActive(i + 1)}
                                    key={i + 1}
                                    className={`${Style.mobile_menu_items} ${active == i + 1 ? Style.active_btn : ""}`}>
                                    <Link
                                        className={Style.mobile_menu_items_link}
                                        href={el.link}>
                                        {el.menu}
                                    </Link>
                                </div>
                            ))}
                            <p className={Style.mobile_menu_btn}>
                                <Image
                                    src={images.close}
                                    alt="close"
                                    width={50}
                                    height={50}
                                    onClick={() => setOpen(false)}
                                />
                            </p>
                        </div>
                    )}

                    {/* Connect wallet */}
                    <div className={Style.NavBar_box_right_connect}>
                        {account === "" ? (
                            <button onClick={() => connectWallet()}>
                                {""}
                                <span>Connect Wallet</span>
                            </button>
                        ) : (
                            <div className={Style.account_info}>
                                <small></small>
                                <button>{userName + " " + account}</button>
                            </div>
                        )}
                    </div>
                    <div
                        className={Style.NavBar_box_right_open}
                        onClick={() => setOpen(true)}>
                        <Image
                            src={images.open}
                            alt="open"
                            width={30}
                            height={30}
                        />
                    </div>
                </div>
            </div>

            {/* Model component */}
            {openModel && (
                <div className={Style.modelBox}>
                    <Model
                        openBox={setOpenModel}
                        title="WELCOME TO"
                        head="BLOCK CHAT"
                        info="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium ipsam vitae expedita, saepe, exercitationem sint atque debitis laboriosam dolore quaerat harum deserunt officiis ratione id reprehenderit, eaque cumque totam consequuntur."
                        smallInfo="Kindly select your name...."
                        image={images.hero}
                        functionName={createAccount}
                        address={account}
                    />
                </div>
            )}

            {/* Display error if any */}
            {/* {error === "" ? "" : <Error error={error} />} */}
        </div>
    );
};

export default NavBar;
