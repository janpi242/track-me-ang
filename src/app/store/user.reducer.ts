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
    on(
        UserActions.savePosition,
        (state, position): UserState => {
            const friend = state.friends.find(_friend => position.user_id === _friend.id)
            const index = state.friends.indexOf(friend)
            const friends = state.friends.map(_friend => ({ ..._friend }))
            if (index !== -1) {
                friends[index].position = position
            }
            return {
                ...state,
                friends
            }
        }
    )
)
