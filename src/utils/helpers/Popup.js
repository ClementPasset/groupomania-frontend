class Popup {
    constructor(text) {
        this.text = text ?? '';
    }

    show = () => {
        let root = document.querySelector('#root')
        let popup = document.createElement('div');
        popup.classList.add('infoPopup')
        popup.innerHTML = `
            <p className='infoPopup__question'>${this.text}</p>
        `;
        root.appendChild(popup);
        setTimeout(() => {
            popup.remove();
        }, 1500);
    }
}

export default Popup;