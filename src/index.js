import "./scss/style.scss"
import Comment from "./comment.html"

(async function () {
    const comments = document.getElementById('comments')
    console.log(Comment)
    comments.insertAdjacentHTML('afterbegin', Comment)
    comments.insertAdjacentHTML('afterbegin', Comment)
})()