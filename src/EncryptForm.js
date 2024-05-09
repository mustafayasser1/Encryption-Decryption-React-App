import React, { useState } from "react";
import CryptoJS from "crypto-js";
import "./styles.css";

function EncryptForm() {
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [iv, setIV] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setMessage(event.target.value);
    setErrorMessage(""); // Clear error message when typing in the input field
  };

  const handleEncrypt = () => {
    const key = CryptoJS.lib.WordArray.random(32); // 256-bit key
    const ivValue = CryptoJS.lib.WordArray.random(16); // 128-bit initialization vector
    const encryptedMessage = CryptoJS.AES.encrypt(message, key, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: ivValue,
    }).toString();

    setSecretKey(key.toString(CryptoJS.enc.Hex)); // Store key as hex string
    setIV(ivValue.toString(CryptoJS.enc.Hex)); // Store IV as hex string
    setEncryptedMessage(encryptedMessage);
  };

  return (
    <div className="container">
      <h2>Encrypt Message</h2>
      <div className="input-group">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Enter your message"
        />
      </div>
      {errorMessage && (
        <div className="result error">
          <p>{errorMessage}</p>
        </div>
      )}
      <div className="button-container">
        <button className="modern-button" onClick={handleEncrypt}>
          Encrypt
        </button>
      </div>
      {encryptedMessage && (
        <div>
          <div className="result">
            <p>Encrypted Message:</p>
            <pre>{encryptedMessage}</pre>
            <p>Secret Key:</p>
            <pre>{secretKey}</pre>
            <p>Initialization Vector (IV):</p>
            <pre>{iv}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default EncryptForm;