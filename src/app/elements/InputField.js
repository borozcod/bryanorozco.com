// InputField.js
"use client";
import React, { useState } from 'react';

const InputField = ({ label, placeholder, type = 'text' }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className='pa2'>
    <div className='mb3'>
        <button className='fw2 link bg-animate hover-white hover-bg-gold bg-transparent br-pill bg-none pv2 ph3 gold b--gold bw1 ba ph3 mr3'>a turtle</button>
        <button className='fw2 link bg-animate hover-white hover-bg-gold bg-transparent br-pill bg-none pv2 ph3 gold b--gold bw1 ba ph3 '>a cat</button>
    </div>
    <div className='flex items-stretch'>
        <button className='button-reset br3 br--left input-reset white bg-gold bn ph3 '>
            <i className="fas fa-star-of-life"></i> turn into
        </button>
        <input
            type={type}
            placeholder="| a cat"
            value={value}
            onChange={handleChange}
            className='input-reset br3 br--right bw1 ba b--gold pv2 ph3'
        />
    </div>
    </div>
  );
};

export default InputField;
