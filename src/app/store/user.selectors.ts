import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer'

export const selectUser = createFeatureSelector<UserState>('user');
export const selectFriends = createSelector(selectUser, (user) => user.friends)
export const selectIsLoggedIn = createSelector(selectUser, (user) => !!(user.id && user.name && user.token))
