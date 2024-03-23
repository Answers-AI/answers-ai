import Chat from '@ui/Chat';

export default function Loading() {
  // @ts-expect-error Async Server Component
  return <Chat />;
}
