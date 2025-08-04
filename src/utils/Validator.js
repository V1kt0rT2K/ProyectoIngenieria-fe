class Validator {
    static isEmail(str) {
        return str && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str);
    }

    static isRTN(str) {
        return str && /^\d{14}$/.test(str);
    }

    static isContact(str) {
        return str && Validator.isEmail || /^(?:\+504|00504)?[-\s]?([23789]\d{3})[-\s]?(\d{4})$/.test(str);
    }

    static isIdentityNumber(str) {
        return str && /^\d{13}$/.test(str);

    }
}

export default Validator;