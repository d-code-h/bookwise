'use client';

import React from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { generateBgColor, getInitials } from '@/lib/utils';

const UserAvatar = ({ name }: { name: string }) => {
  const bgColor = generateBgColor(name);

  return (
    <Avatar>
      <AvatarFallback className={`font-semibold ${bgColor}`}>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
