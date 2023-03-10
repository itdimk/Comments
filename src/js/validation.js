export function validateForm(formData) {
    const values = Object.fromEntries(formData)

    if (!values.name)
        return validationResult('name', 'Поле не может быть пустым')

    if (/[\d\[\-.?!)(,:\]]/.exec(values.name))
        return validationResult('name', 'Имя не должно содержать цифр и знаков препинания')

    if (!values.text)
        return validationResult('text', 'Поле не может быть пустым')

    return validationResult()
}

function validationResult(field, message) {
    return {
        field,
        message
    }
}