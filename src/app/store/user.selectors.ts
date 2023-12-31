import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer'

export const selectUser = createFeatureSelector<UserState>('user');
export const selectFriends = createSelector(selectUser, (user) => user.friends)
export const selectIsLoggedIn = createSelector(selectUser, (user) => !!(user.id && user.name && user.token))

// export const selectCollectionState = createFeatureSelector<
//   ReadonlyArray<string>
// >('collection');

// export const selectBookCollection = createSelector(
//   selectBooks,
//   selectCollectionState,
//   (books, collection) => {
//     return collection.map((id) => books.find((book) => book.id === id)!);
//   }
// );
