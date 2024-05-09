import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './styles.css';

function DecryptForm() {
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [iv, setIV] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [ivError, setIVError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'encryptedMessage') {
      setEncryptedMessage(value);
    } else if (name === 'secretKey') {
      setSecretKey(value);
    } else if (name === 'iv') {
      setIV(value);
      setIVError(false); // Reset IV error when the user types in the IV field
    }
  };

  const handleDecrypt = () => {
    try {
      const key = CryptoJS.enc.Hex.parse(secretKey);
      const providedIV = CryptoJS.enc.Hex.parse(iv);

      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Base64.parse(encryptedMessage) },
        key,
        { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: providedIV }
      ).toString(CryptoJS.enc.Utf8);

      if (decrypted) {
        setDecryptedMessage(decrypted);
        setIVError(false);
      } else {
        setDecryptedMessage('Decryption failed. Please check your input and try again.');
        setIVError(false);
      }
    } catch (error) {
      console.error('Decryption Error:', error);
      setDecryptedMessage('Wrong message or key, please double check!');
      setIVError(false);
    }
  };

  return (
    <div className="container">
      <h2>Decrypt Message</h2>
      <div className="input-group">
        <input
          type="text"
          name="encryptedMessage"
          value={encryptedMessage}
          onChange={handleInputChange}
          placeholder="Enter encrypted message"
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          name="secretKey"
          value={secretKey}
          onChange={handleInputChange}
          placeholder="Enter secret key"
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          name="iv"
          value={iv}
          onChange={handleInputChange}
          placeholder="Enter initialization vector (IV)"
        />
      </div>
      <div className="button-container">
        <button className="modern-button" onClick={handleDecrypt}>
          Decrypt
        </button>
      </div>
      {decryptedMessage && (
        <div className="result">
          {decryptedMessage === 'Wrong message or key, please double check!' ? (
            <p>{decryptedMessage}</p>
          ) : (
            <p>Decrypted Message: {decryptedMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DecryptForm;