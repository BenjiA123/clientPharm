import * as AuthActions from "./auth.actions"

export interface AuthState {
    isAuthenticated: boolean,
    token: string,
    currentUser: {},
}

const initialAuthState: AuthState = {
    isAuthenticated: false,
    token: null,
    currentUser: null,
}

export function AuthReducer(state = initialAuthState, action: AuthActions.AuthActions) {

    switch (action.type) {
        case (AuthActions.LOGIN):
            return {
                ...initialAuthState,
                isAuthenticated: true,
                token: action.payload.token,
                currentUser: action.payload.currentUser,
            }

        case (AuthActions.CREATE_CUSTOMER):
            return
        case (AuthActions.LOGOUT):
            return {
                ...initialAuthState,
                isAuthenticated: false,
                token: null,
                currentUser: null,
            }
        default:
            return state


    }
}