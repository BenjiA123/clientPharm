import * as AuthActions from "./auth.actions"

export interface AuthState {
    isAuthenticated: boolean,
    token: string,
    role: string,
    userId: string,
    currentUser: {},
}

const initialAuthState: AuthState = {
    isAuthenticated: false,
    token: null,
    role: null,
    userId: null,
    currentUser: null,
}

export function AuthReducer(state = initialAuthState, action: AuthActions.AuthActions) {

    switch (action.type) {
        case (AuthActions.LOGIN):
            return {
                ...initialAuthState,
                isAuthenticated: true,
                token: action.payload.token,
                role: action.payload.role,
                userId: action.payload.currentUser._id,
                currentUser: action.payload.currentUser,
            }

        case (AuthActions.CREATE_CUSTOMER):
            return {
                ...initialAuthState,
                isAuthenticated: true

            }
        case (AuthActions.LOGOUT):
            return {
                ...initialAuthState,
                isAuthenticated: false,
                token: null,
                role: null

            }
        default:
            return state


    }
}