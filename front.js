const PORT = 'http://localhost:5000';
const idInput = document.getElementById('forId');
const editNameInput = document.getElementById('editName');
const editSurnameInput = document.getElementById('editSurname');
const editAgeInput = document.getElementById('editAge');
const editInputs = document.getElementById('editInputs');
const inputs = document.getElementById('inputs');
let usersList = [];

const getUsersList = async () => {
    return fetch(`${PORT}/users`)
        .then((response) => response.json())
        .catch(() => []);
}
const deleteUserById = async (id) => {
    return fetch(`${PORT}/users/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .catch(() => []);
}

const createUser = async (firstName, age, lastName) => {
    return fetch(`${PORT}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            "firstName": firstName,
            "lastName": lastName,
            "age": age
        }),
    })
        .then((response) => response.json())
        .catch(() => []);
}

const editUserById = async (id,firstName,lastName,age) => {
    return fetch(`${PORT}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            "firstName": firstName,
            "lastName": lastName,
            "age": age
        }),
    })
        .then((response) => response.json())
        .catch(() => []);
}

editInputs.onsubmit = async (event) => {

    const editFirstName = document.getElementById('editName').value;
    const editLastName = document.getElementById('editSurname').value;
    const editAge = document.getElementById('editAge').value;
    const userId = idInput.value;

    await editUserById(userId,editFirstName,editLastName,editAge);

    refresh();
};

inputs.onsubmit = async (event) => {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('surname').value;
    const age = document.getElementById('age').value;

    const id = await createUser(firstName, age, lastName);
    usersList.push({
        "id": id,
        "firstName": firstName,
        "lastName": lastName,
        "age": age
    });

    refresh();
};

const renderElement = (obj) => {
    const container = document.createElement('tr');  // tr

    const id = document.createElement('td'); // td (id)
    id.innerText = obj.id;

    const name = document.createElement('td'); // td (name)
    name.innerText = obj.firstName;

    const sureName = document.createElement('td'); // td (age)
    sureName.innerText = obj.lastName;

    const age = document.createElement('td'); // td (phone)
    age.innerText = obj.age;

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-outline-success';
    editButton.innerText = 'Edit';
    const editButtonTd = document.createElement('td'); // td (actions)
    editButtonTd.append(editButton);
    editButton.onclick = () => {
        idInput.value = obj.id;
        editNameInput.value = obj.firstName;
        editSurnameInput.value = obj.lastName;
        editAgeInput.value = obj.age;
    }
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-outline-danger';
    deleteButton.innerText = 'Delete';
    const deleteButtonTd = document.createElement('td'); // td (actions)
    deleteButtonTd.append(deleteButton);
    deleteButton.onclick = async () => {
        await deleteUserById(obj.id);
        usersList = usersList.filter((x) => x.id !== obj.id);
        render();
    };


    container.append(id);
    container.append(name);
    container.append(sureName);
    container.append(age);
    container.append(editButtonTd);
    container.append(deleteButtonTd);

    return container;
};

const render = () => {
    const users = document.getElementById('users');
    users.innerHTML = '';

    usersList.forEach((user) => {
        const elem = renderElement(user);
        users.append(elem);
    })
}
const refresh = () => {
    getUsersList()
        .then((response) => {
            usersList = response;
            render();
            console.log(usersList);
        })
        .catch(() => {
            console.log('Error!');
        })
}
refresh();