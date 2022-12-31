// validation on Number and +
export const isNumeric = (val) => /^[\d+ ]*$/.test(val)
// checking for Ukrainian number
export const isUaNumber = (val) => val.substr(0, 4) === '+380'
