const validateFirstName = (first_name) => {
    const name = /^[A-Za-z]{1,30}$/i
    return name.test(first_name)
}

const validateLastName = (last_name) => {
    const name = /^[A-Za-z]{0,30}$/i
    return name.test(last_name)
}

const validateUserName = (user_name) => {
    const name = /^[A-Za-z0-9]{6,30}$/i
    return name.test(user_name)
}

const validateEmail = (email) => {
    const emailId = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
    return emailId.test(email)
}

const validatePassword = (password) => {
    const pass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i
    return pass.test(password)
}

const validatePhone = (phone) => {
    if (!phone) return true // phone is optional
    const phoneNumber = /^[0-9]{10}$/i
    return phoneNumber.test(phone)
}


module.exports ={
    validateFirstName,
    validateLastName,
    validateUserName,
    validateEmail,
    validatePassword,
    validatePhone,
}