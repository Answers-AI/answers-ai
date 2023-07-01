'use client';
import ShareModal from '@ui/ShareModal';
const Modal = ({ searchParams }: any) => {
  const modal = searchParams.modal;
  switch (modal) {
    case 'share':
      return <ShareModal />;
    default:
      return null;
  }
};
export default Modal;
