import React from 'react';
import ReactDOM from 'react-dom';
import ExternalChatWidget from './ExternalChatWidget';

(function () {
  console.log('Testing renderExternalChatWidget.ts');
  const src = 'http://localhost:3000/widgets/chat'; // Replace with the URL you want to load in the iframe

  const externalChatWidget = React.createElement(ExternalChatWidget, { src });
  const container = document.createElement('div');
  container.setAttribute('id', 'iframe-container');

  document.body.appendChild(container);
  alert('hellos');
  ReactDOM.render(externalChatWidget, container);
})();
