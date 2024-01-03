function handleDelete(event) {
  const listId = event.target.parentElement.id;
  axios
    .delete(
      `https://crudcrud.com/api/87a65b085c1248d78650576c5a0142b8/appointmentData/${listId}`
    )
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
  event.target.parentElement.remove();
}

function handleEdit(event) {
  const form = document.querySelector("form");
  const listId = event.target.parentElement.id;
  const data = event.target.parentElement.firstChild.textContent.split(" - ");
  if (event.target.id == "edit") {
    form.username.value = data[0];
    form.email.value = data[1];
    form.phone.value = data[2];
  }

  axios
    .delete(
      `https://crudcrud.com/api/87a65b085c1248d78650576c5a0142b8/appointmentData/${listId}`
    )
    .catch((err) => console.log(err));
  event.target.parentElement.remove();
}

function makeli(value, user) {
  const newli = document.createElement("li");
  const btnDel = document.createElement("button");
  const btnEdit = document.createElement("button");
  btnDel.textContent = "Delete User";
  btnEdit.textContent = "Edit User";
  btnDel.id = "delete";
  btnDel.style.margin = "5px";
  btnEdit.id = "edit";
  btnEdit.style.margin = "5px";
  btnDel.type = "button";
  btnEdit.type = "button";
  btnDel.addEventListener("click", handleDelete);
  btnEdit.addEventListener("click", handleEdit);
  newli.id = user._id;
  newli.textContent = value;
  newli.appendChild(btnDel);
  newli.appendChild(btnEdit);
  return newli;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const data = event.target;
  let username = data.username.value;
  let email = data.email.value;
  let phone = data.phone.value;

  if (!username || !email || !phone) return;
  const myobj = {
    username,
    email,
    phone,
  };

  axios
    .post(
      "https://crudcrud.com/api/87a65b085c1248d78650576c5a0142b8/appointmentData",
      myobj
    )
    .then((response) => {
      showUserOnScreen(response.data);
      console.log(response);
    })
    .catch((err) => console.log(err));

  //   const myobjString = JSON.stringify(myobj);
  //   localStorage.setItem(email, myobjString);

  data.username.value = "";
  data.email.value = "";
  data.phone.value = "";
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/87a65b085c1248d78650576c5a0142b8/appointmentData"
    )
    .then((response) => {
      //   console.log(response);

      for (let i = 0; i < response.data.length; i++) {
        showUserOnScreen(response.data[i]);
      }
    })
    .catch((err) => console.log(err));
});

function showUserOnScreen(user) {
  const memberlist = document.querySelector("ul");
  const fullname = `${user.username} - ${user.email} - ${user.phone}`;
  const newmember = makeli(fullname, user);
  memberlist.appendChild(newmember);
}
