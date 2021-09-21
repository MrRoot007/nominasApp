const InitialState = {
    open: false,
    message: ''
}
const openSnackBarReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'OPEN_SNACKBAR':
            return {
                ...state,
                open: action.openMessage.open,
                message: action.openMessage.message
            }
        case 'close_SNACKBAR':
            return state
        default:
            return state
    }
}
export default openSnackBarReducer;