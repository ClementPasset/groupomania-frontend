import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const LoginForm = ({ inputs, buttonText, userState, dispatchUser, handleSubmit, actionType }) => {

    const handleChange = (e) => {
        let newUser = { ...userState.value };
        newUser[e.target.name] = e.target.value;
        dispatchUser({ type: actionType, value: { value: { ...newUser }, isValid: userState.isValid }, field: e.target.name })
    };

    return (
        <form method="post" onSubmit={handleSubmit}>
            {inputs.map((input, index) => {
                return (
                    <React.Fragment key={`form-${actionType}-${index}`}>
                        <div className="formGroup">
                            <label className={`formGroup__label ${userState.isValid[input.name] === true ? ' formGroup__label--success' : ''} ${userState.isValid[input.name] === false ? ' formGroup__label--error' : ''}`} htmlFor={input.name}><FontAwesomeIcon icon={userState.isValid[input.name] === false ? faExclamationTriangle : (input.icon ?? faArrowCircleRight)} /></label>
                            <input onChange={handleChange} value={userState.value[input.name]} autoFocus={index === 0} name={input.name} id={input.name} type={input.type} placeholder={input.placeholder} className={`formGroup__input input ${userState.isValid[input.name] === true ? ' formGroup__input--success' : ''} ${userState.isValid[input.name] === false ? ' input--error' : ''}`} />
                        </div>
                        {userState.isValid[input.name] === false && <div className="formGroup__errorText">{input.errorText}</div>}
                    </React.Fragment>
                );
            })}
            <button type="submit" className="btn">{buttonText ?? 'Valider'}</button>
        </form>
    );
};

export default LoginForm;