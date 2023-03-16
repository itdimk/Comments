import "./scss/style.scss"
import Comment from "./comment.html"
import {elementByHtml, formatDate, setTimeNow} from "./js/utils";
import {validateForm} from "./js/validation";

const comments = document.getElementById('comments')
const form = document.getElementById('submit-comment')
form.onsubmit = handleSubmit
form.onkeyup = clearErrors

function createComment(name, text, date) {
    let html = String(Comment)
        .replaceAll('$Title$', name)
        .replaceAll('$Text$', text)
        .replaceAll('$Date$', formatDate(date))


    const comment = elementByHtml(html)
    comment.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-delete'))
            comment.remove()

        if (e.target.hasAttribute('data-liked')) {
            let isLiked = e.target.getAttribute('data-liked') === 'true'

            e.target.classList.toggle('active', !isLiked)
            e.target.setAttribute('data-liked', !isLiked)
        }
    });
    return comment
}

function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const {name, text, date} = getFormValues(formData)
    const validationResult = validateForm(formData)

    if (validationResult.field) {
        setError(validationResult.field, validationResult.message)
        return
    }

    const dateObject = new Date(date)
    setTimeNow(dateObject)

    comments.append(createComment(name, text, dateObject))
    form.reset()
}

function getFormValues(formData) {
    const result = Object.fromEntries(formData)
    if (!result.date)
        result.date = new Date()
    return result;
}

function clearErrors() {
    document.querySelectorAll('[data-error]')
        .forEach(error => error.hidden = true)
}

function setError(fieldName, message) {
    const errorElement = document.querySelector(`[name=${fieldName}] + [data-error]`)
    errorElement.innerText = message
    errorElement.hidden = false
}