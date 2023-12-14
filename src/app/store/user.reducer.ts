import { State, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from './user.model';

export const initialState: User = {
    token: null,
    name: null,
    id: null,
    email: null
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.loginUser, (state, userData): User => ({ ...userData })),
    on(UserActions.logoutUser, (state): User => ({ ...initialState })),
)
