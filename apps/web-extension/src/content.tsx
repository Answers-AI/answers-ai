import React from 'react';
import ReactDOM from 'react-dom';
import ContentApp from './ContentApp';
import { createRoot } from 'react-dom/client';

const container = document.createElement('div');
container.id = 'crx-root';
document.body.append(container);
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ContentApp />
  </React.StrictMode>
);
