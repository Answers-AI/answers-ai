import React from 'react';
import ReactDOM from 'react-dom';
import ContentApp from './ContentApp';

const root = document.createElement('div');
root.id = 'crx-root';
document.body.append(root);

ReactDOM.render(
  <React.StrictMode>
    <ContentApp />
  </React.StrictMode>,
  root
);
