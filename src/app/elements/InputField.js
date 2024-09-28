// InputField.js
"use client";
import React, { useState } from 'react';

const InputField = ({ type = 'text', generateImage, loading }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleButtonClick = () => {
    generateImage(value);
  };

  return (
    <div className='pa2'>
    <div className='flex items-stretch'>
        <button className='button-reset br3 br--left input-reset white bg-gold bn ph3 '>
            <i className="fas fa-star-of-life"></i> turn into
        </button>
        <input
            type={type}
            placeholder="| a cat jumpping in space"
            value={value}
            onChange={handleChange}
            className='input-reset br3 br--right bw1 ba b--gold pv2 ph3'
        />
    </div>
    {!loading && (
      <button
      onClick={handleButtonClick}
      className="fw2 link bg-animate hover-white hover-bg-gold bg-transparent br-pill bg-none pv2 ph3 gold b--gold bw1 ba mt3"
    >
      Generate Image
    </button>  
    )}
    
    </div>
  );
};

export default InputField;
