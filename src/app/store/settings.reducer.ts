import { createReducer, on } from '@ngrx/store';
import { Settings } from './settings.model';
import { SettingsActions } from './settings.actions';

export type SettingsState = Settings;

export const initialState: SettingsState = {
    interval: 60,
    mapType: 'osm'
}

export const settingsReducer = createReducer(
    initialState,
    on(SettingsActions.storeSettings,
        (state, settings): SettingsState => ({ ...settings })
    )
)
