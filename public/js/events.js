    const listContainer = document.getElementById("list-name");
    const addListButton = document.getElementById("add-list");
  
    // завантаження списків із localStorage
    function loadLists() {
      const savedLists = JSON.parse(localStorage.getItem("taskLists")) || [];
      listContainer.innerHTML = ""; // Очистити перед оновленням
  
      savedLists.forEach(listName => {
        createListElement(listName);
      });
    }
  
    // створення нового елемента списку
    function createListElement(name) {
      const listItem = document.createElement("li");
      listItem.classList.add("list-name");
  
      const span = document.createElement("span");
      span.classList.add("list-person")
      span.textContent = name;
  
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = `<img src="./img/del.svg" class="del--svg" alt="Delete" width="20" height="20">`;
      deleteButton.classList.add("delete-list");
      deleteButton.addEventListener("click", () => deleteList(name));
  
      listItem.appendChild(span);
      listItem.appendChild(deleteButton);
      listContainer.appendChild(listItem);
    }
  
    // додавання нового списку в сховище
    addListButton.addEventListener("click", () => {
      const listName = prompt("Введіть назву нового списку:");
  
      if (listName && listName.trim() !== "") {
        const savedLists = JSON.parse(localStorage.getItem("taskLists")) || [];
  
        if (!savedLists.includes(listName)) {
          savedLists.push(listName);
          localStorage.setItem("taskLists", JSON.stringify(savedLists));
          createListElement(listName);
        }
      }
    });
  
    // видалення списку
    function deleteList(name) {
      let savedLists = JSON.parse(localStorage.getItem("taskLists")) || [];
      savedLists = savedLists.filter(list => list !== name);
      localStorage.setItem("taskLists", JSON.stringify(savedLists));
      loadLists(); // Оновлюємо список
    }
    
document.addEventListener("DOMContentLoaded", loadLists());
  

document.querySelectorAll("#nav--btn").forEach(button => {
      button.addEventListener("click", function () {
          document.getElementById("sidebar").classList.toggle("open");
          document.getElementById("main").classList.toggle("open");
      });
  });


function renameItem () {
    const pageName = document.getElementById("page-name");
    const listItem = document.querySelectorAll(".day-item");

    listItem.forEach(item => {
        item.addEventListener("click", () => {
            pageName.textContent = item.textContent; // Змінюємо заголовок
        });
    });
}
    document.addEventListener("DOMContentLoaded", renameItem ())

  