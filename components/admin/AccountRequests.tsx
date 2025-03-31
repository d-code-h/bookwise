import React, { FC } from 'react';
import UserAvatar from './UserAvatar';

interface AccountRequest {
  fullName: string;
  email: string;
}

interface Props {
  accountRequests: AccountRequest[];
}
const AccountRequests: FC<Props> = ({ accountRequests }) => {
  return (
    <div className="flex flex-wrap flex-col md:flex-row gap-2.5">
      {accountRequests.map((account) => (
        <div
          key={account.email}
          className="flex flex-wrap gap-3 flex-col justify-center items-center px-3 py-3.5 bg-light-300 rounded-lg flex-1"
        >
          <UserAvatar name={account.fullName} />

          <div className="flex flex-col">
            <h5 className="font-medium text-base text-dark-400 tracking-tight">
              {account.fullName.split(' ').slice(0, 2).join(' ')}
            </h5>
            <p className="text-[#64748B] text-xs">{account.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountRequests;
