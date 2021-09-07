class TextFormat {
    static excerptLength = 120;

    static excerpt(text) {
        if (text.length > this.excerptLength) {
            return text.substring(0, text.indexOf(' ', this.excerptLength)) + '...';
        } else {
            return text;
        }
    }
};

export default TextFormat;