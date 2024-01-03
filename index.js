function handleDeleteAndEdit(event) {
  const form = document.querySelector("form");
  const data = event.target.parentElement.firstChild.textContent.split(" - ");
  if (event.target.id == "edit") {
    form.username.value = data[0];
    form.email.value = data[1];
    form.phone.value = data[2];
  }
  localStorage.removeItem(data[1]);
  event.target.parentElement.remove();
}

function makeli(value) {
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
  btnDel.addEventListener("click", handleDeleteAndEdit);
  btnEdit.addEventListener("click", handleDeleteAndEdit);
  newli.id = "member";
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
      "https://crudcrud.com/api/3b91d491bb464ef98254835e258ea93b/appointmentData",
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

function showUserOnScreen(obj) {
  const memberlist = document.querySelector("ul");
  const fullname = `${obj.username} - ${obj.email} - ${obj.phone}`;
  const newmember = makeli(fullname);
  memberlist.appendChild(newmember);
}
