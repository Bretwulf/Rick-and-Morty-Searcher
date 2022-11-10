import { renderCards } from "./cardRender.js";

const select = document.querySelector('select')
const input = document.querySelector("input");
select.addEventListener("input", search)
input.addEventListener("keyup", search);

const icon = document.querySelector('header div small')
icon.addEventListener('click', ()=>{input.focus()})

async function search() {
  const filterBtns = [...document.querySelectorAll('#filterSection button')]
  const filterSelec = document.getElementById("select-filter")
  const filterDiv = document.getElementById("div-buttons")
  const selectedBtn = filterBtns.filter(btn => btn.classList.contains('filter-buttons-selected'))


  
  try {

    let filter;
    
    if(filterDiv.offsetParent!==null)
    {if (selectedBtn[0].innerText != 'All') {
      if (selectedBtn[0].innerText == 'Alive' || selectedBtn[0].innerText == 'Dead' || selectedBtn[0].innerText == 'Unknown') {
        filter = `&status=${selectedBtn[0].innerText}`
      }
      if (selectedBtn[0].innerText == 'Female' || selectedBtn[0].innerText == 'Male' || selectedBtn[0].innerText == 'Genderless') {
        filter = `&gender=${selectedBtn[0].innerText}`;
      }
    }}
    else
    {if (filterSelec.value != 'All') {
      if (filterSelec.value == 'Alive' || filterSelec.value == 'Dead' || filterSelec.value == 'Unknown') {
        filter = `&status=${filterSelec.value}`
      }
      if (filterSelec.value == 'Female' || filterSelec.value == 'Male' || filterSelec.value == 'Genderless') {
        filter = `&gender=${filterSelec.value}`;
      }
    }}
    if (filter) {
      if (select.value == "species" || select.value == "All") {
             
              renderCards(
                `https://rickandmortyapi.com/api/character/?name=${input.value}${filter}`,
                true
              );
            } else {
              renderCards(
                `https://rickandmortyapi.com/api/character/?name=${input.value}&species=${select.value}${filter}`,
                true
              );
            }
    } else {
      
      if (select.value == "species" || select.value == "All") {
        renderCards(
          `https://rickandmortyapi.com/api/character/?name=${input.value}`,
          true
        );
      } else {
        renderCards(
          `https://rickandmortyapi.com/api/character/?name=${input.value}&species=${select.value}`,
          true
        );
      }
    }

  } catch (error) {
    
  }
}
