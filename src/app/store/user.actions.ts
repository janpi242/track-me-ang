/* eslint-disable @typescript-eslint/naming-convention */

import { createActionGroup, props } from '@ngrx/store';
import { User } from './user.model';
import { FriendsList } from './friend.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Login user': props<User>(),
    'Logout user': props<any>(),
    'Store friends': props<FriendsList>(),
  },
})
