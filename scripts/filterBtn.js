import { renderCards } from "./cardRender.js";
export async function filter(){
    const buttons = document.querySelectorAll(".filter-buttons")
    const input = document.querySelector('input')
    

    buttons.forEach(btn =>{
        btn.addEventListener("click", async ()=>{
            const filter = btn.innerText

            let search = ''

            if (input.value.length > 0) {
                console.log(input.value)
                search = `&name=${input.value}`;
            }

            if(filter === "All" && input.value.length == 0){
                renderCards(
                    `https://rickandmortyapi.com/api/character/`,
                    true
                );
            } else if (filter === "All" && input.value.length > 0) {
                renderCards(
                `https://rickandmortyapi.com/api/character/?name=${input.value}`,
                true
                );
            }
            
            else if (filter === "Alive" || filter === "Dead" || filter === "Unknown") {
                renderCards(
                    `https://rickandmortyapi.com/api/character/?status=${filter}${search}`,
                    true
                );
            }else if(filter === "Female" || filter === "Male" || filter === "Genderless"){
                renderCards(
                  `https://rickandmortyapi.com/api/character/?gender=${filter}${search}`,
                  true
                );
            }

            localStorage.setItem("@rick-and-morty: filterButton", filter)
        })
    })
}

export function buttonSelected(){
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
        }
    })
}

