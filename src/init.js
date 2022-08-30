
debugger;
const root = document.getElementById('root');
const addItem = document.getElementById("myBtn");
addItem.addEventListener("click", addFunction);

function addFunction () {
    const input = document.getElementById("inputVal").value;
    if(input != ""){

    
    const container = document.createElement('div')
    container.classList.add('item');
    container.innerHTML=input;
    root.append(container);

    const removeButton = document.createElement('button');
    removeButton.classList.add('removeButton');
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa');
    trashIcon.classList.add('fa-trash');
    removeButton.appendChild(trashIcon);
    container.appendChild(removeButton);

    removeButton.addEventListener("click", function() {
        container.remove()
      });
    }

    }
