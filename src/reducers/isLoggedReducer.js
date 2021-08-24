const isLoggedReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            if (action.value.userId !== undefined && action.value.token !== undefined) {
                return action.value;
            } else {
                return state;
            }
        case 'LOGOUT':
            return { logged: false, userId: null, token: null }
        default:
            return state;
    }
}

export default isLoggedReducer;