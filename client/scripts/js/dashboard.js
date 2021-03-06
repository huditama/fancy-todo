function getTaskCards() {
    let token = localStorage.getItem('token')
    $.ajax({
        url: `${serverUrl}/toDo`,
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
                                    <a href="#" class="card-link" id="click_create" data-toggle="modal"
                                    data-target="#updateTaskForm" onclick="getUpdateTaskForm('${task._id}')">Update</a>
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
        url: `${serverUrl}/toDo`,
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
        url: `${serverUrl}/toDo/complete/${TaskId}`,
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
        url: `${serverUrl}/toDo/uncomplete/${TaskId}`,
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

function getUpdateTaskForm(TaskId) {
    let token = localStorage.getItem('token')
    $.ajax({
        url: `${serverUrl}/toDo/${TaskId}`,
        method: "GET",
        headers: { token }
    })
        .done((response) => {
            let html = `
            <div class="modal-body">
                <form id="updateToDo">
                    <div class="form-group">
                        <label for="inputTitle">Title</label>
                        <input type="text" class="form-control" id="inputTitleUpdate" value="${response.name}" required>
                    </div>
                    <div class="form-group">
                        <label for="inputDescription">Description</label>
                        <textarea class="form-control" id="inputDescriptionUpdate" rows="3" required>${response.description}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="inputDueDate">Due Date</label>
                        <input type="datetime-local" class="form-control" id="inputDueDateUpdate" value="${new Date(response.due_date).toISOString().slice(0, 16)}" required>
                    </div>
            </div>
            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" data-dismiss="modal" onclick="updateTask('${TaskId}')">Submit!</button>
                </div>`
            $('#inputUpdateData').html(html)
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed!', textStatus)
        })
}

function updateTask(TaskId) {
    event.preventDefault()
    let token = localStorage.getItem('token')
    const name = $('#inputTitleUpdate').val()
    const description = $('#inputDescriptionUpdate').val()
    const due_date = $('#inputDueDateUpdate').val()
    $.ajax({
        url: `${serverUrl}/toDo/${TaskId}`,
        method: 'PATCH',
        data: { name, description, due_date },
        headers: { token }
    })
        .done((response) => {
            swal("Success!", response.message, "success");
            getTaskCards()
            $('#updateTaskModal').hide()
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed!', textStatus)
        })
}


function deleteTask(TaskId) {
    let token = localStorage.getItem('token')
    $.ajax({
        url: `${serverUrl}/toDo/${TaskId}`,
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
                    } else getTaskCards()
                })
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed!', textStatus)
        })
}