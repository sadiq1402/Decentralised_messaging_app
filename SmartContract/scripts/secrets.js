const { generateKeyPairSync, publicEncrypt, privateDecrypt } = require("crypto");
const { createSign, createVerify } = require("crypto");
const { createCipheriv, createDecipheriv, randomBytes } = require("crypto");
const ethUtil = require("ethereumjs-util");
const algorithm = "aes-256-cbc";

const crypto = require("crypto");

// 1. DID for address
const createDID = (ethereumAddress) => {
    const did = `did:ethr:${ethereumAddress}`;
    console.log("DID created: ", did);
    return did;
};

// Step 1: Generate RSA Key Pair (Public and Private Keys)
const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048, // Length of the key in bits
    publicKeyEncoding: {
        type: "spki", // Public Key format
        format: "pem", // PEM encoded
    },
    privateKeyEncoding: {
        type: "pkcs8", // Private Key format
        format: "pem", // PEM encoded
    },
});

// const ethereumAddress = "0x1234567890abcdef1234567890abcdef12345678";
// const userDID = createDID(ethereumAddress);
// console.log("User DID:", userDID);

function encryptMessage(publicKey, message) {
    const bufferMessage = Buffer.from(message, "utf8");
    const encrypted = crypto.publicEncrypt(publicKey, bufferMessage);
    return encrypted.toString("base64");
}

function decryptMessage(privateKey, encryptedMessage) {
    const bufferEncryptedMessage = Buffer.from(encryptedMessage, "base64");
    const decrypted = crypto.privateDecrypt(privateKey, bufferEncryptedMessage);
    return decrypted.toString("utf8");
}

// const _message = "Hello, this is a secret message!";
// console.log("Original message:", _message);

// // Encrypt the message
// const encryptedMessage = encryptMessage(publicKey, _message);
// console.log("Encrypted message:", encryptedMessage);

// // Decrypt the message
// const decryptedMessage = decryptMessage(privateKey, encryptedMessage);
// console.log("Decrypted message:", decryptedMessage);

// ZKPs

function signMessage(privateKey, message) {
    const sign = createSign("SHA256");
    sign.update(message);
    sign.end();
    return sign.sign(privateKey, "hex");
}

function verifyMessage(publicKey, message, signature) {
    const verify = createVerify("SHA256");
    verify.update(message);
    verify.end();
    return verify.verify(publicKey, signature, "hex");
}

// console.log("Decentralized Identifier (DID):", userDID);

// Step 3: Sign a Message (Off-chain)
const ex_message = "This is a confidential message that needs signing";

// Create a Sign object and sign the message using the private key
const signer = createSign("RSA-SHA256");
signer.update(ex_message);
signer.end();

const signature = signer.sign(privateKey, "hex");
console.log("Signature:", signature);

// Step 4: Verify the Signature (Off-chain)
const verifier = createVerify("RSA-SHA256");
verifier.update(ex_message);
verifier.end();

const isVerified = verifier.verify(publicKey, signature, "hex");
console.log("Signature Verified:", isVerified); // Should return true

// Step 5: Encrypt the message using Public Key (End-to-End Encryption)
const encryptedData = publicEncrypt(publicKey, Buffer.from(ex_message));
console.log("Encrypted Data (in base64):", encryptedData.toString("base64"));

// Step 6: Decrypt the message using Private Key (End-to-End Encryption)
const decryptedData = privateDecrypt(privateKey, encryptedData);
console.log("Decrypted Message:", decryptedData.toString("utf-8"));

function generateSessionKey() {
    return crypto.randomBytes(32); // 256-bit key
}

function encryptSessionKey(publicKey, sessionKey) {
    return crypto.publicEncrypt(publicKey, sessionKey);
}

// Decrypt the session key with the recipient's private key (RSA)
function decryptSessionKey(privateKey, encryptedSessionKey) {
    return crypto.privateDecrypt(privateKey, encryptedSessionKey);
}

function encryptMessageWithSessionKey(sessionKey, message) {
    const iv = crypto.randomBytes(16); // Initialization vector for AES
    const cipher = crypto.createCipheriv("aes-256-cbc", sessionKey, iv);
    let encryptedMessage = cipher.update(message, "utf8", "hex");
    encryptedMessage += cipher.final("hex");
    return { encryptedMessage, iv: iv.toString("hex") };
}

// Decrypt a message using the session key (AES)
function decryptMessageWithSessionKey(sessionKey, encryptedMessage, iv) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", sessionKey, Buffer.from(iv, "hex"));
    let decryptedMessage = decipher.update(encryptedMessage, "hex", "utf8");
    decryptedMessage += decipher.final("utf8");
    return decryptedMessage;
}

// const sessionKey = generateSessionKey();
// console.log("Session key generated:", sessionKey.toString("hex"));

// Encrypt the session key with recipient's public key
// const encryptedSessionKey = encryptSessionKey(publicKey, sessionKey);
// console.log("Encrypted session key:", encryptedSessionKey.toString("hex"));

// // Decrypt the session key using the recipient's private key
// const decryptedSessionKey = decryptSessionKey(privateKey, encryptedSessionKey);
// console.log("Decrypted session key:", decryptedSessionKey.toString("hex"));

// // Encrypt a message with the session key
// const message = "Hello, this is a secure message!";
// const { encryptedMessage, iv } = encryptMessageWithSessionKey(sessionKey, message);
// console.log("Encrypted message:", encryptedMessage);

// // Decrypt the message using the session key
// const decryptedMessage = decryptMessageWithSessionKey(sessionKey, encryptedMessage, iv);
// console.log("Decrypted message:", decryptedMessage);
