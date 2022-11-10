import { renderCards } from "./cardRender.js"


export async function filter(){
    const buttons = document.querySelectorAll(".filter-buttons")
    const input = document.querySelector('input')
    const select = document.querySelector("#select-filter")

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

    select.addEventListener("change", async ()=>{
        const filter = select.value
        console.log(filter)
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
        }else if (pressedButton === null){
            localStorage.setItem("@rick-and-morty: filterButton", "All")
            buttonAll.click()
        }
    })
}

export function optionSelected(){
    const select = document.querySelector("#select-filter")
    const options = [...select.options]
    const pressedButton = localStorage.getItem("@rick-and-morty: filterButton")

    options.forEach(opt =>{
        if(opt.value === pressedButton){
            opt.selected = true
        }else if(pressedButton === null){
            localStorage.setItem("@rick-and-morty: filterButton", "All")
            options[1].selected = true
        }
    })
}
