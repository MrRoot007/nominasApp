export const initialState = {
    user: {
        User: '',
        Password: '',
    },
    authenticated: false
};

const sessionUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                user: action.session,
                authenticated: action.authenticated
            };
        case 'LOG_OUT':
            return {
                ...state,
                user: action.newUser,
                authenticated: action.authenticated
            }
        case 'UPDATE_USER':
            return {
                ...state,
                user: action.newUser,
                authenticated: action.authenticated
            }
        default:
            return state
    }
};
export default sessionUserReducer;