const userReducer = (state, action) => {
    switch (action.type) {
        case 'SIGNUP_FORM':
            switch (action.field) {
                case 'mail':
                    action.value.isValid.mail = action.value.value.mail !== '' ? /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(action.value.value.mail) : null;
                    break;
                case 'firstName':
                    action.value.isValid.firstName = action.value.value.firstName !== '' ? !/[0-9 ]/.test(action.value.value.firstName) : null;
                    break;
                case 'lastName':
                    action.value.isValid.lastName = action.value.value.lastName !== '' ? !/[0-9 ]/.test(action.value.value.lastName) : null;
                    break;
                case 'password':
                    let password = action.value.value.password;
                    action.value.isValid.password = password !== '' ? (/[0-9]/.test(password) && /[a-z]/.test(password) && /[A-Z]/.test(password) && password.length >= 8) : null;
                    break;
                default:
                    break;
            }
            return action.value;
        case 'SIGNIN_FORM':
            return action.value
        default:
            return state;
    }
};

export default userReducer;