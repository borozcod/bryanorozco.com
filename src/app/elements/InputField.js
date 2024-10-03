// InputField.js
"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'

const InputField = ({ generateImage }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const generateNewImage = () => {
    if(!value) {
      return
    }
    setLoading(true)
    generateImage(value, ()=> {
      setLoading(false)
    });
  };


  return (
    <div>
      <div className='flex items-stretch'>
          <button onClick={generateNewImage} className='f6 f5-ns button-reset br3 br--left input-reset white bg-gold bn ph3 '> <FontAwesomeIcon className="white mr2" icon={faBolt} />turn into</button>
          <input
              type="text"
              placeholder="| a cat jumpping in space"
              value={value}
              onChange={handleChange}
              className='input-reset br3 br--right bw1 ba b--gold pv2 ph3'
          />
      </div>
      {!loading && (
        <button
          onClick={generateNewImage}
          className="fw2 link bg-animate hover-white hover-bg-gold bg-transparent br-pill bg-none pv2 ph3 gold b--gold bw1 ba mt3"
        >
          Transform
        </button>  
      )}
    </div>
  );
};

export default InputField;
