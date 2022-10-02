import React from 'react';

import './checkbox.css';

export default function Checkbox ({ label, value, valueSetter }) {
  return (
    <div className='checkbox-organizer'>
      <span className='checkbox-title'>
        {label}
      </span>
      <div
        className={`custom-checkbox${value ? ' checked' : ''}`}
        onClick={() => valueSetter(prev => !prev)}
      >
        <span className='material-symbols-outlined'>
          {value ? 'check' : ''}
        </span>
      </div>
    </div>
  );
}
