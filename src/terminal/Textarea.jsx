import React from 'react';
import './Textarea.css';

import Prompt from './Prompt';
import Input from './Input';

const Textarea = () => (
  <div className="wrapper">
    <ul>
      <li className="line"><Prompt /><Input /></li>
    </ul>
  </div>
);

export default Textarea;

