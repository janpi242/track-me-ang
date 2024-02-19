/* eslint-disable @typescript-eslint/naming-convention */

import { createAction, createActionGroup, props } from '@ngrx/store';
import { Settings } from './settings.model';

export const SettingsActions = createActionGroup({
    source: 'Settings',
    events: {
        'Store settings': props<Settings>(),
    },
})
