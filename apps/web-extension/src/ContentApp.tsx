import React from 'react';

const ContentApp = () => {
  React.useEffect(() => {
    console.log('ContentApp mounted');
    chrome.runtime.sendMessage({ data: document.body.innerHTML });
  }, []);
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        minWidth: 420,
        height: '100vh',
        overflow: 'hidden'
      }}>
      {/* TODO: Use same component as the webapp instead */}
      <iframe
        src={import.meta.env.VITE_APP_URL}
        width="100%"
        height="100%"
        style={{ border: 'none' }}></iframe>
    </div>
  );
};
export default ContentApp;
