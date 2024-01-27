/* eslint-disable @typescript-eslint/naming-convention */

// import { createAction } from '@ngrx/store';

// export const setLoggedIn = createAction('[User] Login')
// export const setLoggedOut = createAction('[User] Logout')
// export const setToken = createAction('[User] Token')
// export const setUsername = createAction('[User] Username')
// export const setUserId = createAction('[User] UserId')

import { createActionGroup, props } from '@ngrx/store';
import { User } from './user.model';
import { FriendsList } from './friend.model';
import { Position } from './position.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Login user': props<User>(),
    'Logout user': props<any>(),
    'Store friends': props<FriendsList>(),
    'Save position': props<Position>(),
  },
})
