'use client';
import React, { useEffect, useState } from 'react';
import ChatDetailWidget from './ChatDetailWidget';
import { signIn } from 'next-auth/react';
import { Session } from 'next-auth';
import { useSearchParams, useRouter } from 'next/navigation';

interface ChatWidgetProps {
  params: any;
  session: Session;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ session, params }) => {
  const [isAuthorized, setIsAuthorized] = useState(!!session?.user);
  const router = useRouter();
  const searchParams = useSearchParams();

  const apiKey = searchParams?.get('apiKey');
  console.log({ apiKey });
  //TODO: Show error if api key is not passed in
  if (!apiKey) console.log('no api key');

  useEffect(() => {
    if (isAuthorized) return;

    const signInAsync = async () => {
      const signInResponse = await signIn(
        'app-widget',
        {
          apiKey,
          redirect: false
        },
        {}
      );
      console.log('signInResponse', signInResponse);
      setIsAuthorized(!!signInResponse?.ok);
      router.refresh();
    };
    signInAsync();
  }, [isAuthorized, Router, apiKey]);

  console.log({ isAuthorized, session });

  return isAuthorized && session?.user ? (
    <ChatDetailWidget user={session.user} appSettings={session.user.appSettings} {...params} />
  ) : null;
};

export default ChatWidget;
