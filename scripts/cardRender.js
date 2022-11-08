let nextPage = ""

async function getChars (param){
    const options = { method: "GET" };
    /* -------------------------------------------------------------------------- */
    try {
      const response = await fetch(
        param, //parametro aqui é a própria URL!
        options
      );

      if (response.ok) {
        const chars = await response.json();
        return chars
        
      } else {
        const error = await response.json();
        throw Error(error.error);
      }
    } catch (error) {
      console.log(error.message);
    }

}

async function getEpisode (param){
    const options = { method: "GET" };
    try {
        const response = await fetch(
          `${param}`,
          options
        );
  
        if (response.ok) {
          const episode = await response.json();
          return episode
          
        } else {
          const error = await response.json();
          throw Error(error.error);
        }
      } catch (error) {
        console.log(error.message);
      }
}


    
async function observer(){
    document.querySelector("main").insertAdjacentHTML("beforeend","<div id='observer'><p>observer</p></div>")
    
    let observer = new IntersectionObserver(async (entries)=>{
        if (entries[0].isIntersecting===true){
            console.log(nextPage)
            if(nextPage!==null){
            await renderCards(nextPage)}
        }
    })
     observer.observe(document.getElementById("observer"))
}

async function renderCards(param,param2) { //parametro1 é a URL inteira de como os personagens devem ser renderizados! Você pode construir uma string com a URL+filtros e passar eles como parâmetro! facilimo!
const cardSection =  document.getElementById("cardsSection")
/*esse if deve ser usado pra decidir se o código 
reseta a página ou só adiciona conteúdo. Como underfined 
é uma falsie, por padrão é falso!.*/
if (param2===true){
cardSection.innerHTML=""}
 const characters =  await getChars(param)
 nextPage = characters.info.next
    console.log(characters); //cria os cards!
    characters.results.forEach(async element => {
        const firstSeen = await getEpisode(element.episode[0])
        cardSection.insertAdjacentHTML("beforeend",`
        <li id="card${element.id}" class="card-base">
        <div class="image-div">
         <img class="card-image" src=${element.image}>
         <p class="text-center font16 font-regular font-color-adaptable species-pip">${element.species}</p>
        </div>
        <div class="card-content">
            <h4 class="font20 font-regular font-color-adaptable">${element.name}</h4>
            <div class="status-pip font12 font-thin font-color-white-fixed">${element.status}</div>
            <p class="font12 font-thin font-color-adaptable">last known location:</p>
            <p class="font16 font-regular font-color-adaptable">${element.location.name}</p>
            <p class="font12 font-thin font-color-adaptable">first seen in</p>
            <p class="font16 font-regular font-color-adaptable">${firstSeen.name}</p>
        </div>
        </li>
        `)
    });
    

    
}
observer() //adicionando obvserver no fim da página!
renderCards("https://rickandmortyapi.com/api/character?status=alive",true);//render de quando o usuário carrega a página.
