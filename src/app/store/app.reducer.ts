import { ActionReducerMap } from "@ngrx/store";

import * as fromAuth from '../auth/store/auth.reducer'


export interface AppState {
    AuthState: fromAuth.AuthState
}


export const appReducers: ActionReducerMap<AppState> = {
    AuthState: fromAuth.AuthReducer
}