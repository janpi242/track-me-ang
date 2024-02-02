import { State, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from './user.model';
import { FriendsList } from './friend.model';

export type UserState = User & FriendsList

export const initialState: UserState = {
    token: null,
    name: null,
    id: null,
    email: null,
    friends: []
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.loginUser, (state, userData): UserState => ({ ...userData, friends: [] })),
    on(UserActions.logoutUser, (state): UserState => ({ ...initialState })),
    on(UserActions.storeFriends, (state, friendsList): UserState => ({ ...state, friends: friendsList.friends })),
)
