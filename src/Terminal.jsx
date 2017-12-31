import React from 'react';
import './Terminal.css';

import TitleBar from './terminal/TitleBar';
import Textarea from './terminal/Textarea';

const Terminal = () => (
  <div className="terminal">
    <TitleBar />
    <Textarea />
  </div>
);

export default Terminal;

