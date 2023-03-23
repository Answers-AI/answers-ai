import React from 'react';

const ContentApp = () => {
  React.useEffect(() => {
    console.log('ContentApp mounted');
    chrome.runtime.sendMessage({ data: document.body.innerHTML });
  }, []);
  return null;
};
export default ContentApp;
