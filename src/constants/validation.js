export const required = value => (value ? undefined : 'This is a required field.');
export const dropdownRequired = value =>
    value === null || value === undefined
    ? 'This is a required field.'
    : undefined;
export const requiredAtleastOne = value => (value ? undefined : 'At least one must be selected.');
export const arrayChecker = value => (value && value.length > 0 ? undefined : 'This is a required field.');
export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Please provide a valid email address.'
    : undefined;

export const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;

const length = size => value =>
    value && value.length !== size
    ? `Must be ${size} characters.`
    : undefined;
export const length4    = length(4);
export const length10   = length(10);
export const length11   = length(11);
export const length12   = length(12);
export const length13   = length(13);

const minLength = min => value =>
    value && value.length < min
    ? `Must be ${min} characters or more`
    : undefined;
export const minLength2 = minLength(2)

const maxLength = max => value =>
    value && value.length > max
    ? `Must be ${max} characters or less.`
    : undefined;
export const maxLength5 = maxLength(5);
export const maxLength10 = maxLength(10);
export const maxLength15 = maxLength(15);

export const numbers = value =>
    value && !/^[0-9]*$/i.test(value)
    ? 'Must be whole numbers only.'
    : undefined;

export const numbersWithDecimals = value =>
    value && !/^\d+(\.\d{1,2})?$/i.test(value)
    ? 'Must be a valid number with two (2) decimals only.'
    : undefined;

const minValue = min => value =>
    value && parseFloat(value.toString().replace(/,/g, '')) <= min
    ? `Must be greater than ${min}.`
    : undefined;
export const minValue0 = minValue(0);

const minAllowableValue = min => value =>
    value && parseFloat(value.toString().replace(/,/g, '')) < min
    ? `Must be greater than ${min}.`
    : undefined;

export const minAllowableValue0 = minAllowableValue(0)

const maxValue = max => value =>
    value && parseFloat(value.toString().replace(/,/g, '')) >= max
    ? `Must be less than ${max}.`
    : undefined;

export const maxValue1M = maxValue(1000000)
export const maxValue100 = maxValue(100)
