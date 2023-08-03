import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';

type TransitionProps = Omit<SlideProps, 'direction'>;

/**
 * Slide component with left direction.
 * @param {TransitionProps} props - Props for the Slide component.
 * @returns {JSX.Element} - Slide component with left direction.
 */
function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

/**
 * Snackbar message component.
 * @param {string} message - The message to be displayed.
 * @returns {JSX.Element} - Snackbar message component.
 */
const SnackMessage = ({ message }: { message: string }) => {
  const [theMessageOpen, setTheMessageOpen] = useState(false);
  const [theMessageTransition, setTheMessageTransition] = useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  useEffect(() => {
    if (message.trim() === '') {
      setTheMessageOpen(false);
    } else {
      setTheMessageOpen(true);
    }
  }, [message]);

  /**
   * Handles the closing of the message.
   */
  const handleMessageClose = () => {
    setTheMessageOpen(false);
  };

  return (
    <Snackbar
      data-cy="snackbar" // data-cy attribute for testing
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={theMessageOpen}
      autoHideDuration={6000}
      onClose={handleMessageClose}
      TransitionComponent={theMessageTransition}
      message={message}
      key={theMessageTransition ? theMessageTransition.name : ''}
    />
  );
};

export default SnackMessage;
