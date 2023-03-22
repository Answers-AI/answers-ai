import React from 'react';
import { syncAi } from './useAI';

async function getActiveTab() {
  //@ts-ignore

  const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });

  if (tab) {
    return tab;
  } else {
    //@ts-ignore
    return chrome.tabs.get(activeTabId);
  }
}

const App = () => {
  React.useEffect(() => {
    (async () => {
      try {
        let tab = await getActiveTab();

        if (tab) {
          await syncAi({ url: tab.url });
        }
      } catch (err) {
        console.log('SyncWebExtension', err);
      }
    })();
  }, []);

  // React.useEffect(() => {
  //   const messageListener = (
  //     message: any,
  //     sender: chrome.runtime.MessageSender,
  //     sendResponse: (response?: any) => void
  //   ) => {
  //     // 2. A page requested user data, respond with a copy of `user`
  //     console.log('Message', message, sender, sendResponse);
  //   };
  //   chrome.runtime.onMessage.addListener(messageListener);
  //   return () => {
  //     chrome.runtime.onMessage.removeListener(messageListener);
  //   };
  // }, []);

  return (
    <div
      style={{
        minWidth: 420,
        height: 593,
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

export default App;
