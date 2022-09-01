debugger;
const root = document.getElementById("root");
const addItem = document.getElementById("myBtn");
addItem.addEventListener("click", addFunction);

function addFunction() {
  const todoText = document.getElementById("inputVal").value;
  if (todoText != "") {
    postTodo();
  }
}

const postTodo = async () => {
  try {
    const todoText = document.getElementById("inputVal").value;
    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title: todoText, completed: false }),
    });

    // CHECK RES
    if (res.status === 201) {
      const data = await res.json();

      const container = document.createElement("div");
      container.classList.add("item");
      const textLabel = document.createElement("p");
      textLabel.textContent = todoText;
      container.appendChild(textLabel);
      root.append(container);

      const removeButton = document.createElement("button");
      removeButton.classList.add("removeButton");
      removeButton.setAttribute("id", data.id);
      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fa");
      trashIcon.classList.add("fa-trash");
      removeButton.appendChild(trashIcon);
      container.appendChild(removeButton);

      const editButton = document.createElement("button");
      editButton.classList.add("editButton");
      editButton.setAttribute("id", data.id);
      const editIcon = document.createElement("i");
      editIcon.classList.add("fa");
      editIcon.classList.add("fa-pencil-square");
      editButton.appendChild(editIcon);
      container.appendChild(editButton);

      removeButton.addEventListener("click", function () {
        deleteTodo(data.id);
        container.remove();
      });
      document.getElementById("inputVal").value="";
      return data;
    } else {
      console.log(`Error while posting todo with status : ${res.status}`);
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

const deleteTodo = async (deleteID) => {
  try {
    console.log("deleting id: "+deleteID);
    const res = await fetch(`http://localhost:5000/todos/${deleteID}`, {
      method: "DELETE",
    });

    // CHECK RES
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      console.log(`Error while deleting todo with status : ${res.status}`);
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
