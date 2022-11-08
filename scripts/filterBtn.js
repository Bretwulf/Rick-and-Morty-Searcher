
async function filter(){
    const buttons = document.querySelectorAll(".filter-buttons")

    buttons.forEach(btn =>{
        btn.addEventListener("click", async ()=>{
            const filter = btn.innerText

            if(filter === "All"){
                renderCards(
                    "https://rickandmortyapi.com/api/character",
                    true
                );
            }else if(filter === "Alive" || filter === "Dead" || filter === "Unknown"){
                renderCards(
                    `https://rickandmortyapi.com/api/character/?status=${filter}`,
                    true
                );
            }else if(filter === "Female" || filter === "Male" || filter === "Genderless"){
                renderCards(
                    `https://rickandmortyapi.com/api/character/?gender=${filter}`,
                    true
                );
            }

            localStorage.setItem("@rick-and-morty: filterButton", filter)
        })
    })
}

function buttonSelected(){
    const buttons = document.querySelectorAll(".filter-buttons")
    const pressedButton = localStorage.getItem("@rick-and-morty: filterButton")
    const buttonAll = document.getElementById("all-filter")

    buttons.forEach(btn =>{
        btn.addEventListener("click", (e)=>{
            buttons.forEach(btn =>{
                btn.classList.remove("filter-buttons-selected")
            })

            btn.classList.add("filter-buttons-selected")
        })
        if(btn.innerText === pressedButton){
            btn.click()
        }else if (pressedButton === null){
            buttonAll.click()
        }
    })
}

filter()
buttonSelected()