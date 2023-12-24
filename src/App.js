// src/App.js
import React, { useState } from 'react';
import './App.css';

const generatePassword = (length, includeLowercase, includeUppercase, includeNumbers, includeSpecialChars) => {
  // Define character sets for different types of characters
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()-=_+[]{}|;:,.<>?';

   // Concatenate character sets based on selected criteria
  let allChars = '';
  if (includeLowercase) allChars += lowercaseChars;
  if (includeUppercase) allChars += uppercaseChars;
  if (includeNumbers) allChars += numberChars;
  if (includeSpecialChars) allChars += specialChars;

   // Generate the password by randomly selecting characters from the combined set
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
};

function App() {
  // State variables to manage user input and generated password
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

   // Function to generate a password based on user input
  const handleGeneratePassword = () => {
    const password = generatePassword(
      passwordLength,
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSpecialChars
    );
    setGeneratedPassword(password);
  };

  // Function to copy the generated password to the clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert('Password copied to clipboard!');
  };

   // JSX structure for the app UI
  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div>
        <label>Password Length:</label>
        <input
          type="number"
          value={passwordLength}
          onChange={(e) => setPasswordLength(Math.max(1, parseInt(e.target.value, 10)))}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          Include Lowercase
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          Include Uppercase
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Include Numbers
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeSpecialChars}
            onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
          />
          Include Special Characters
        </label>
      </div>
      <button onClick={handleGeneratePassword}>Generate Password</button>
      {generatedPassword && (
        <div>
          <h2>Generated Password:</h2>
          <p>{generatedPassword}</p>
          <button onClick={handleCopyToClipboard} style={{backgroundColor:"yellow" , color:"black"}}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
}

export default App;
