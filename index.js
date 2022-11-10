import { observer } from "./scripts/cardRender.js";
import { filter, buttonSelected, optionSelected } from "./scripts/filterBtn.js";

function setFilterWhenNull(){
    if(localStorage.getItem("@rick-and-morty: filterButton")===null){
        localStorage.setItem("@rick-and-morty: filterButton","All")
    }
}

async function onLoad(){
    setFilterWhenNull()
    await filter()
    buttonSelected()
    optionSelected()
    observer() 
}

onLoad()