import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from './settings.reducer';

export const selectSettings = createFeatureSelector<SettingsState>('settings');

export const selectInterval = createSelector(selectSettings, (settings) => settings.interval)

export const selectMapType = createSelector(
    selectSettings, (settings) => settings.mapType
)
