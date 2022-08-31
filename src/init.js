
debugger;
const root = document.getElementById('root');
const addItem = document.getElementById("myBtn");
addItem.addEventListener("click", addFunction);

function addFunction () {
    const input = document.getElementById("inputVal").value;
    if(input != ""){
      postTodo();
    }
    }

      const postTodo=  async () => 
      {
          try
          {
              const input = document.getElementById("inputVal").value;
              const res = await fetch("http://localhost:5000/todos",
              {
                  method: 'POST',
                  headers: 
                  {
                      'Accept': 'application/json',
                      'Content-type': 'application/json',
                  },
                  body : JSON.stringify({title : input , completed : false})
              });
          
              // CHECK RES
              if (res.status === 201)
              {
                  const data = await res.json();

                  const container = document.createElement('div')
                  container.classList.add('item');
                  const textLabel = document.createElement('p');
                  textLabel.textContent=input;
                  container.appendChild(textLabel);
                  root.append(container);
                  
              
              
                  const editButton = document.createElement('button');
                  editButton.classList.add('editButton');
                  editButton.textContent= "Edit";
                  container.appendChild(editButton);
              
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
                  return data;
              }
              else
              {
                  console.log(`Error while posting todo with status : ${res.status}`);
                  return false;
              }
          }
          catch(err)
          {
              console.error(err);
          }
          
      }
