import { State, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from './user.model';

export const initialState: User = {
    isLoggedIn: false,
    token: null,
    name: null,
    id: null
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.loginUser, (state): User => ({ ...state, isLoggedIn: true })),
    on(UserActions.logoutUser, (state): User => ({ ...state, isLoggedIn: false })),
)
