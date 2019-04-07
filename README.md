Fancy To Do
===
## Usage
```javascript
$ npm install
$ node app.js
```
Access client via `http://localhost:8080`<br>
Access server via `http://localhost:3000`

##  Routes
|Routes|HTTP|Header(s)|Body|Response|Description| 
|:--:|:--:|:--:|:--:|:--:|:--:|
|/users/signUp  |POST  |none|first_name: String (**required**), last_name: String (**required**), email: String (**required**),  password: String (**required**)|**Success**: Register a user, **Error**: Internal server error (Validation)|Register a user|
|/users/signIn  |POST  |none|email: String (**required**),  password: String (**required**)|**Success**: Login as a user, **Error**: Internal server error (Wrong e-mail/password)|Login as a user|
|/users/googleSignIn  |POST  |none|email: String (**required**),  password: String (**required**)|**Success**: Login as a user (**via Google**), **Error**: Internal server error (Wrong e-mail/password)|Login as a user (**via Google**)|
|/toDo  |GET  |token|none|**Success**: Show tasks of logged in user, **Error**: Internal server error|Show tasks of logged in user|
|/toDo  |POST  |token|name: String (**required**), description: String (**required**), due_date: String (**required**)|**Success**: Create a new task, **Error**: Internal server error (Validation)|Create a new task|
|/toDo/complete/:id  |PATCH  |token|none|**Success**: Complete a task, **Error**: Internal server error|Complete a task|
|/toDo/uncomplete/:id  |PATCH  |token|none|**Success**: Un-complete a task, **Error**: Internal server error|Un-complete a task|
|/toDo/delete/:id  |DELETE|token|none|**Success**: Delete a task, **Error**: Internal server error|Delete a task|