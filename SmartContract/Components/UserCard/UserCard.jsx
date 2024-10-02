const UserCard = ({ element, i, addFriend }) => {
    const { account } = useContext(ChatAppContext);

    const handleAddFriendClick = async () => {
        if (element.address !== account) {
            try {
                await addFriend(element.address, element.name);
            } catch (err) {
                console.error("Error adding friend:", err);
            }
        } else {
            console.log("Cannot add yourself as a friend");
        }
    };

    console.log("User Name:", element.name);
    console.log("User Address:", element.address);

    return (
        <div
            className={styles.userCard}
            key={i}>
            <div className={styles.userCardBox}>
                <div className={styles.userCardBoxImage}></div>
                <div className={styles.userCardBoxInfo}>
                    <p className={styles.userCardBoxName}>{element.name}</p>
                    <p className={styles.userCardBoxAddress}>{element.address}</p>
                </div>
                <div className={styles.userCardBoxButton}>
                    <button
                        onClick={handleAddFriendClick}
                        disabled={element.address === account}>
                        {element.address === account ? "Already Friend" : "Add Friend"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const AllUsers = () => {
    const { addFriend } = useContext(ChatAppContext); // addFriend method from context
    const [users, setUsers] = useState([]);

    // Simulated users for demonstration
    const sampleUsers = [
        {
            name: "Arjun Sharma",
            address: "0x1234567890abcdef1234",
        },
        {
            name: "Meera Patel",
            address: "0xabcdef1234567890abcd",
        },
        {
            name: "Vikram Singh",
            address: "0x7890abcdef1234567890",
        },
    ];

    useEffect(() => {
        const storeUsers = async () => {
            for (let user of sampleUsers) {
                await addUser(user.name); // Add user to the blockchain
            }
            setUsers(sampleUsers); // Set the sample users for display
        };

        storeUsers();
    }, []);

    return (
        <div className={styles.allUsers}>
            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                users.map((user, index) => (
                    <UserCard
                        key={index}
                        element={user}
                        i={index}
                        addFriend={addFriend}
                    />
                ))
            )}
        </div>
    );
};

export default AllUsers;
