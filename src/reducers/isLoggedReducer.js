const isLoggedReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            if (action.value.userId !== undefined && action.value.token !== undefined) {
                localStorage.setItem('isLogged', JSON.stringify(action.value));
                return action.value;
            } else {
                localStorage.setItem('isLogged', JSON.stringify(state));
                return state;
            }
        case 'LOGOUT':
            localStorage.removeItem('isLogged');
            return { logged: false, userId: null, isAdmin: false, token: null, tokenExpDate: null }
        default:
            return state;
    }
}

export default isLoggedReducer;