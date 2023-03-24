import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { AnswersFilters, AppSettings } from 'types';
import { AvatarGroup } from '@mui/material';

export default function BadgeAvatars({ appSettings }: { appSettings: AppSettings }) {
  const enabledServices = appSettings?.services?.filter((service) => service.enabled);
  return (
    <AvatarGroup total={enabledServices?.length} spacing={-8}>
      {enabledServices?.map((service) => (
        <Avatar src={service.imageURL} alt={service.name} />
      ))}
    </AvatarGroup>
  );
}
