import React from 'react';

import { AvatarProfile } from '../avatarProfile';

interface ProfileCardHeaderProps {
  name: string;
  bio: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  type: 'users' | 'organizations';
}

export const ProfileCardHeader: React.FC<ProfileCardHeaderProps> = ({
  name,
  type,
  bio,
  profileImageUrl,
  coverImageUrl,
}) => {
  return (
    <div className="flex flex-col">
      <div
        className={`h-40 w-full bg-no-repeat bg-cover -z-10 `}
        style={{ backgroundImage: coverImageUrl ? `url(${coverImageUrl})` : 'linear-gradient(#ace0f9, #fff1eb)' }}
      />
      <div className="w-full -mt-9 z-0 flex flex-col py-5 md:py-6 gap-4 md:gap-5">
        <AvatarProfile size="small" imgUrl={profileImageUrl} type={type} verified={false} />
        <span className="text-xl font-semibold leading-[30px] text-Gray-light-mode-900">{name}</span>
        <span className="text-xl font-semibold leading-[30px] text-Gray-light-mode-900">{bio}</span>
      </div>
    </div>
  );
};
