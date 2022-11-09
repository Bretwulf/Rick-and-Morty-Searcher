const select = document.querySelector('select')
const input = document.querySelector("input");
select.addEventListener("change", search)
input.addEventListener("keyup", search);

const icon = document.querySelector('header div small')
icon.addEventListener('click', ()=>{input.focus()})

async function search() {
  const filterBtns = [...document.querySelectorAll('#filterSection button')]
  const selectedBtn = filterBtns.filter(btn => btn.classList.contains('filter-buttons-selected'))

  
  try {

    let filter;
    if (selectedBtn[0].innerText != 'All') {
      if (selectedBtn[0].innerText == 'Alive' || selectedBtn[0].innerText == 'Dead' || selectedBtn[0].innerText == 'Unknown') {
        filter = `&status=${selectedBtn[0].innerText}`
        console.log(filter)
      }
      if (selectedBtn[0].innerText == 'Female' || selectedBtn[0].innerText == 'Male' || selectedBtn[0].innerText == 'Genderless') {
        filter = `&gender=${selectedBtn[0].innerText}`;
      }
    }

    if (filter) {
            if (select.value == "species") {
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
      
      if (select.value == 'species') {
        
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
    console.log(error);
  }
}
