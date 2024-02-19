import { createReducer, on } from '@ngrx/store';
import { PositionActions } from './position.actions';
import { Position } from './position.model';

export type PositionState = {
    positions: Position[];
};

export const initialState: PositionState =
    { positions: [] };

export const positionsReducer = createReducer(
    initialState,
    on(PositionActions.savePosition, (state, position): PositionState => ({ positions: [...state.positions, position] })),
    on(PositionActions.clearFriendsPositions, (state): PositionState => ({ ...initialState }))
)
