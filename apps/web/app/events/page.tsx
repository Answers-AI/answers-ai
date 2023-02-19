import React from 'react';

const Inngest = () => (
  <iframe
    src={process.env.INNGEST_SERVER_URL || 'http://localhost:8288/'}
    width="100%"
    height="100%"
    style={{ border: 'none' }}
  />
);

export default Inngest;
