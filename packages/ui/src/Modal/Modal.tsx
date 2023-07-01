'use client';
import ShareModal from '@ui/ShareModal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Modal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const modal = searchParams.get('modal');
  const handleClose = () => {
    router.push(pathname, { shallow: true });
  };
  switch (modal) {
    case 'share':
      return <ShareModal onClose={handleClose} />;
    default:
      return null;
  }
};
export default Modal;
