function getTaskCards() {
    let token = localStorage.getItem('token')
    $.ajax({
        url: `http://localhost:3000/toDo`,
        method: 'GET',
        headers: { token }
    })
        .done((response) => {
            let html = ``
            let action;
            let completedAt;
            let grid;
            if (!response.length) {
                grid = `
                <center>
                    <div class="alert alert-warning" role="alert" id="noTasks">
                        You dont have any tasks!
                        </div>
                    <button type="button" class="btn btn-primary" id="offerCreate" data-toggle="modal"
                    data-target="#createTaskForm">Would you like to add a task?</button>
                </center>`
            } else {
                response.forEach((task) => {
                    if (!task.completedAt) completedAt = '<b>N/A</b>'
                    else completedAt = new Date(task.completedAt).toDateString()

                    if (!task.completedAt) action = `<a href="#" class="card-link" onclick="completeTask('${task._id}')">Check!</a>`
                    else action = `<a href="#" class="card-link" onclick="unCompleteTask('${task._id}')">Uncheck!</a>`

                    html += `
                        <div class="col-sm" id="card_column">
                            <div class="card" style="width: 18rem;">
                                <div class="card-body">
                                    <h5 class="card-title">${task.name}</h5>
                                    <p class="card-subtitle mb-2 text-muted">Due Date: ${new Date(task.due_date).toDateString()}</p>
                                    <p class="card-subtitle mb-2 text-muted">Time: ${new Date(task.due_date).toLocaleTimeString()}</p>
                                    <p class="card-subtitle mb-2 text-muted">Completed at: ${completedAt}</p>
                                    <p class="card-text">${task.description}</p>
                                    ${action}
                                    <a href="#" class="card-link" onclick="deleteTask('${task._id}')">Delete</a>
                                </div>
                            </div>
                        </div>`
                })
                grid = `
                <div class="container">
                    <div class="row">
                       ${html}
                    </div>
                </div>`
            }
            $('#taskCards').html(grid)
        })
}

function createTask() {
    let token = localStorage.getItem('token')
    event.preventDefault()
    const name = $('#inputTitle').val()
    const description = $('#inputDescription').val()
    const due_date = $('#inputDueDate').val()
    const UserId = localStorage.getItem('UserId')

    $.ajax({
        url: 'http://localhost:3000/toDo',
        method: 'POST',
        data: { name, description, due_date, UserId },
        headers: { token }
    })
        .done((response) => {
            $('.modal-backdrop').remove()
            swal("Success!", response.message, "success");
            $('#inputTitle').val('')
            $('#inputDescription').val('')
            $('#inputDueDate').val('')
            getTaskCards()
        })
        .fail((err) => {
            swal("Error!", err.responseJSON, "error");
        })
}

function completeTask(TaskId) {
    let token = localStorage.getItem('token')
    $.ajax({
        url: `http://localhost:3000/toDo/complete/${TaskId}`,
        method: 'PATCH',
        headers: { token }
    })
        .done((response) => {
            swal("Success!", response.message, "success");
            getTaskCards()
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed!', textStatus)
        })
}

function unCompleteTask(TaskId) {
    let token = localStorage.getItem('token')
    $.ajax({
        url: `http://localhost:3000/toDo/uncomplete/${TaskId}`,
        method: 'PATCH',
        headers: { token }
    })
        .done((response) => {
            swal("Success!", response.message, "success");
            getTaskCards()
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed!', textStatus)
        })
}

function deleteTask(TaskId) {
    let token = localStorage.getItem('token')
    $.ajax({
        url: `http://localhost:3000/toDo/${TaskId}`,
        method: 'DELETE',
        headers: { token }
    })
        .done((response) => {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover your task!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Success!", response.message, "success");
                        getTaskCards()
                    } else {
                        getTaskCards
                    }
                })
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed!', textStatus)
        })
}