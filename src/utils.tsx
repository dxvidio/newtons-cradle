export const createInputHandler = (setState, setErrorMessage, validationRules) => {
    return (e) => {
        const newValue = e.target.value;
        const { isValid, errorMessage } = validationRules(newValue);
        if (isValid) {
        setState(newValue);
        setErrorMessage('');
        } else {
        setErrorMessage(errorMessage);
        }
    };
};
  
export const validationRules = {
    mass: (value) => ({
        isValid: !isNaN(value) && value >= 0 && value <= 10,
        errorMessage: 'Mass must be between 0 and 10',
    }),
    elasticity: (value) => ({
        isValid: !isNaN(value) && value >= 0 && value <= 1,
        errorMessage: 'Elasticity must be between 0 and 1',
    }),
    stringLength: (value) => ({
        isValid: !isNaN(value) && value >= 0 && value <= 400,
        errorMessage: 'String length must be between 0 and 400',
    }),
    pendulums: (value) => ({
        isValid: !isNaN(value) && value >= 0 && value <= 5,
        errorMessage: 'Number must be between 0 and 5',
    }),
};