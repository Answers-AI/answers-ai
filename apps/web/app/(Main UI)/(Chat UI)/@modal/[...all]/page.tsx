'use client';
import ShareModal from '@ui/ShareModal';

const Modal = ({ searchParams }: any) => {
  const modal = searchParams?.modal;

  if (modal === 'share') return <ShareModal />;

  return null;
};

export default Modal;
