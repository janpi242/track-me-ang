import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PositionState } from './position.reducer'

export const selectPositions = createFeatureSelector<PositionState>('positions');
