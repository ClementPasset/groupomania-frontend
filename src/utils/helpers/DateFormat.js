class DateFormat {
    #months = [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre',
    ];

    constructor(sqlDate) {
        this.date = new Date(sqlDate);
    }


    toString = () => {
        return `${this.date.getDate() === 1 ? `${this.date.getDate()}er` : `${this.date.getDate()}`} ${this.#months[this.date.getMonth()]} ${this.date.getFullYear()}`;
    }

    time = () => {
        return `${this.date.getHours().toString().padStart(2, '0')}h${this.date.getMinutes().toString().padStart(2, '0')}`;
    }
}

export default DateFormat;