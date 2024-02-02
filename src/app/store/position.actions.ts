/* eslint-disable @typescript-eslint/naming-convention */

import { createActionGroup, props } from '@ngrx/store';
import { Position } from './position.model';

export const PositionActions = createActionGroup({
  source: 'Position',
  events: {
    'Save position': props<Position>(),
  },
})
