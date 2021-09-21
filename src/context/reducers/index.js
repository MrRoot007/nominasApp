import sessionUserReducer from './sessionUserReducer';
import openSnackbarReducer from './openSnackbarReducer';

export const mainReducer = ({ sessionUser, openSnackbar }, action) => {
    return {
        sessionUser: sessionUserReducer(sessionUser, action),
        openSnackbar: openSnackbarReducer(openSnackbar, action),
    }
}