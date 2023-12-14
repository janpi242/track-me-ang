import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from './user.model';

export const selectUser = createFeatureSelector<User>('user');

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
