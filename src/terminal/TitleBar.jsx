import React from 'react';
import './TitleBar.css';

const TitleBar = () => (
  <div className="title-bar">
    <div className="title">/bin/zsh</div>
    <div className="window-controls">
      <div className="control minimize">-</div>
      <div className="control maximize">m</div>
      <div className="control close">x</div>
    </div>
  </div>
);

export default TitleBar;

