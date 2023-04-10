'use client';
import React from 'react';
import ChatDetailWidget from './ChatDetailWidget';

interface ChatWidgetProps {
  params: any;
  appSettings: any;
  user: any;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ appSettings, user, params }) => {
  return <ChatDetailWidget user={user} appSettings={appSettings} {...params} />;
};

export default ChatWidget;
