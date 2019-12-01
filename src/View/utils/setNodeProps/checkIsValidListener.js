const checkIsValidListener = listener => typeof listener === 'function' || Array.isArray(listener)


export default checkIsValidListener
