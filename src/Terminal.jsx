import React from 'react';
import './Terminal.css';

import TitleBar from './terminal/TitleBar';
import TextArea from './terminal/TextArea';

const Terminal = () => (
  <div className="terminal">
    <TitleBar />
    <TextArea />
  </div>
);

export default Terminal;

