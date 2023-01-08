let comments = [];
commentadd.addEventListener('click', () => {
    event.preventDefault();
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body').value;
    let newcommentBody = commentBody.toString().replace(/viagra/gi, '***');


    let comment = {
        name: commentName.value,
        body: newcommentBody,
        time: Math.floor(Date.now() / 1000)
    }
    commentName.value = '';
    newcommentBody.value = '';
    comments.push(comment);
    saveComments();
    showComments();
});

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
    showComments();
}

function loadComments() {
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
}

function showComments() {
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function (item) {
        out += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`;
        out += `<p class="alert alert-primary">${item.name}</p>`;
        out += `<p class="alert alert-secondary">${item.body}</p>`;

    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Ноя', 'Дек'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return time;

}