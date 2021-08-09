import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Form = ({ inputs, buttonText }) => {
    return (
        <form>
            {inputs.map((input, index) => {
                return (
                    <div key={`form-${index}`} className="formGroup">
                        <label className="formGroup__label" htmlFor={input.name}><FontAwesomeIcon icon={input.icon} /></label>
                        <input name={input.name} id={input.name} type={input.name === "password" ? "password" : "text"} placeholder={input.placeholder} className="formGroup__input input" />
                    </div>
                );
            })}
            <button onClick={(e) => e.preventDefault()} type="submit" className="btn">{buttonText ?? 'Valider'}</button>
        </form>
    );
};

export default Form;