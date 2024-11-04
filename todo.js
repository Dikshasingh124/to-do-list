let inputBx = document.querySelector('#inputBx');
let list = document.querySelector('#list');

inputBx.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addItem(this.value);
        this.value = ""; // Clear the input after adding the item
    }
});

let addItem = (inputValue) => {
    let listItem = document.createElement("li");
    listItem.innerHTML = `${inputValue} <i></i>`; // Use template literals correctly

    listItem.addEventListener("click", function() {
        this.classList.toggle('done');
    })
    listItem.querySelector("i").addEventListener("click", function(){
        listItem.remove();
    })

    list.appendChild(listItem);
};