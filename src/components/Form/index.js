import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Form = ({ inputs, buttonText, user, setUser, handleForm }) => {

    const handleChange = (e) => {
        let newUser = { ...user };
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    };

    return (
        <form method="post" onSubmit={handleForm}>
            {inputs.map((input, index) => {
                return (
                    <div key={`form-${index}`} className="formGroup">
                        <label className={`formGroup__label ${input.error ? ' formGroup__label--error' : ''}`} htmlFor={input.name}><FontAwesomeIcon icon={input.error ? faExclamationTriangle : (input.icon ?? faArrowCircleRight)} /></label>
                        <input onChange={handleChange} value={user[input.name]} autoFocus={index === 0} name={input.name} id={input.name} type={input.name === "password" ? "password" : "text"} placeholder={input.placeholder} className={`formGroup__input input${input.error ? ' input--error' : ''}`} />
                    </div>
                );
            })}
            <button type="submit" className="btn">{buttonText ?? 'Valider'}</button>
        </form>
    );
};

export default Form;