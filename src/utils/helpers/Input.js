import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Input {

    constructor(name, placeholder, type, icon, index) {
        this.name = name;
        this.placeholder = placeholder;
        this.type = type;
        this.icon = icon;
        this.index = index;
    }

    handleChange = (e) => {
        let textInput = document.querySelector(`#${this.name}-textInput`);
        if (e.target.files.length > 0) {
            let fileName = e.target.files[0].name;
            textInput.value = fileName;
        } else {
            textInput.value = '';
        }
    }
    handleFocus = (e) => {
        let fileInput = document.querySelector(`#${this.name}`);
        if (fileInput) {
            e.target.blur();
            fileInput.click();
        }
    }

    toHtml() {
        switch (this.type) {
            case 'textarea':
                return (
                    <div key={`input-${this.index}`} className='formGroup'>
                        <label htmlFor={this.name} className='formGroup__label formGroup__label--textarea'><FontAwesomeIcon icon={this.icon} /></label>
                        <textarea autoFocus={this.index === 0} id={this.name} name={this.name} className='formGroup__input textarea' placeholder={this.placeholder}></textarea>
                    </div>
                );
            case 'file':
                return (
                    <div key={`input-${this.index}`} className='formGroup'>
                        <label htmlFor={this.name} className='formGroup__label'><FontAwesomeIcon icon={this.icon} /></label>
                        <input onFocus={this.handleFocus} autoFocus={this.index === 0} id={`${this.name}-textInput`} name={this.name} type='text' className='formGroup__input input' placeholder={this.placeholder} />
                        <input onChange={this.handleChange} type="file" autoFocus={this.index === 0} id={this.name} name={this.name} className="fileInput" />
                    </div>
                );
            default:
                return (
                    <div key={`input-${this.index}`} className='formGroup'>
                        <label htmlFor={this.name} className='formGroup__label'><FontAwesomeIcon icon={this.icon} /></label>
                        <input autoFocus={this.index === 0} id={this.name} name={this.name} type='text' className='formGroup__input input' placeholder={this.placeholder} />
                    </div>
                )
        }
    }

}

export default Input;