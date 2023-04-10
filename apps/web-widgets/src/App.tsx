import { useState } from 'preact/hooks';

interface Props {
  src: string;
  width: string;
  height: string;
}

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  // Add an event listener to the window object to instantiate the button on load
  // window.addEventListener('load', openChat);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        right: '1vw',
        bottom: '1vw',
        width: '20vw',
        gap: '1vw',
        maxHeight: '80vh',
        height: '100%',
        justifyContent: 'flex-end'
      }}>
      <div
        style={{
          // position: 'fixed',
          // right: '0',
          // bottom: '0',
          display: isChatOpen ? 'block' : 'none',
          // width: '20vw',
          // height: '100vh',
          flexGrow: 1,
          zIndex: 9999
        }}>
        <iframe
          src="http://localhost:3000/widgets/chat"
          style={{ height: '100%', width: '100%', border: 'none' }}
        />
      </div>

      <div
        style={{
          // position: 'fixed',
          // right: '0',
          // bottom: '0',
          backgroundColor: '#fff',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
          borderRadius: '50%',
          width: '2vw',
          height: '2vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9999,
          fontSize: '1vw',
          fontWeight: 900,
          alignSelf: 'flex-end'
        }}
        onClick={() => toggleChat()}>
        {isChatOpen ? '-' : '+'}
      </div>
    </div>
  );
};

export default App;
