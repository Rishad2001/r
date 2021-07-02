//-------parent element to store cards----------
const taskContainer = document.querySelector(".task__container");
console.log(taskContainer);

//global store
let globalStore = [];

const newCard = ({
    id, 
    imageUrl, 
    taskTitle, 
    taskType, 
    taskDescription
}) =>  `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card text-">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success" onclick="editCard.apply(this, arguments)" id=${id}>
      <i class="fas fa-pencil-alt" id=${id} onclick="editCard.apply(this, arguments)"></i>
    </button>
    <button type="button" id=${id} class="btn btn-outline-danger" onclick="deleteCard.apply(this, arguments)">
      <i class="fas fa-trash-alt"  onclick="deleteCard.apply(this, arguments)" id=${id}></i>
    </button>
  </div>
    <img src=${imageUrl} alt ="dfv jsd">
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">${taskDescription}</p>
    <span class="badge bg-primary">${taskType}</span>
  </div>
  <div class="card-footer text-muted">
    <button type="button" class="btn btn-outline-primary float-end">Open task</button>
  </div>
</div>
</div>`;


//for getting the things in local storage after refreshing
const loadInitialTaskCards = () =>{
  //access local storage
  const getInitialData = localStorage.getItem("tasky");
  if (!getInitialData) return;
  //convert stringified-object to object
  const { cards } = JSON.parse(getInitialData); 
  //map arround the array to generate HTML card and inject it to DOM
  cards.map((cardObject) => {
    const createNewCard =newCard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(cardObject);  
  });
}; 

const updateLocalStorage = () => {
  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));
}; 


const saveChanges= () => {
    const taskData = {
        id: `${Date.now()} `, // unique number for card id
        imageUrl: document.getElementById("imageurl").value ,
        taskTitle: document.getElementById("tasktitle").value   ,
        taskType: document.getElementById("tasktype").value  ,
        taskDescription: document.getElementById("taskdescription").value  ,
    };
    //html code
     const createNewCard =newCard(taskData);

     taskContainer.insertAdjacentHTML("beforeend", createNewCard);
     globalStore.push(taskData);
     // for storing to local storage 
     //we cannot directly store array in local stporage thats why we store it in object
     //here tasky is the key & the object {cards: globalStore is our data}
     //JSON.stringify for converting object to string
     updateLocalStorage();
  };

const deleteCard = (event) => {
  //id 

  event = window.event;
  const targetID =event.target.id;
  const tagname =event.target.tagName; //BUTTON

  //search the globalStore, return the object which matches with the id
  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  updateLocalStorage();

    //access the DOM to remove them

    if(tagname ==="BUTTON"){
      //task container
      return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode //remove col-md-6 ... div tag
      );
    }

    //task__container
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode.parentNode //parent node means parent tag
    );
};  

const editCard = (event) => {
  event = window.event;
  const targetID =event.target.id;
  const tagname =event.target.tagName;


  let parentElement;

  if (tagname === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  }else {
      parentElement = event.target.parentNode.parentNode.parentNode;
    }

    let taskTitle = parentElement.childNodes[5].childNodes[1];
    let taskDescription = parentElement.childNodes[5].childNodes[3];
    let taskType = parentElement.childNodes[5].childNodes[5];
    //for changing open task to save changes
    let submitButton = parentElement.childNodes[7].childNodes[1];
    
    //setAttr4ibute
  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");  
  submitButton.innerHTML = "save changes"

};



// write about modal 
//write about onclick
//write about Date.now()


//issues

//the modal was not closing upon adding new caeds. (solved)
// the cards were deleted after refresh -> local storage (5mb)solved

//features
//delete modal
//edit modal
//edit task