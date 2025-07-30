class Validator {
    static isEmail(str) {
        return str && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str);
    }

    static isRTN(str) {
        return str && /^\d{14}$/.test(str);
    }
}

export default Validator;