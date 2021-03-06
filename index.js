//VARIABLES GLOBALES
let input = document.querySelector(".search");
let buttonSearch = document.querySelector(".btn-search");
let buttonReset = document.querySelector(".btn-reset");
let wrapper = document.querySelector(".wrapper"); 
let containerResults = document.querySelector(".containerResults");


//FUNCIONES
function fetchTo(character){
  if(character !== ""){
    fetch(`https://rickandmortyapi.com/api/character/?name=${character}`)
          .then(response => response.json())
          .then(data => 
            data.results.map(element => paintResults(element), saveData(data)
            //recuerda que en data.map debe hacerse si el resultado del fetch es un array de objetos. 
            ))
  }
}
//GUARDAMOS DATA EN LOCALSTORAGE
const saveData =(data)=>{
const storedData = JSON.stringify(data);
localStorage.setItem("storedData", storedData);
}

//IR ATRÁS
const goBack = () => {
  let containerD= document.querySelector('.containerDetails');

  containerD.remove();

  let containerResults = document.createElement("div");
  containerResults.setAttribute('class', 'containerResults');
  wrapper.appendChild(containerResults);
  
  const storedData = JSON.parse(localStorage.getItem("storedData"));
  storedData.results.map(element =>  paintResults(element));
}

//PINTAMOS RESULTADOS
  function paintResults(element) {
      let containerResults = document.querySelector(".containerResults");

      let result = document.createElement("div");
      containerResults.appendChild(result);

      let text = document.createElement("p");
      let content = document.createTextNode(element.name);
      text.appendChild(content);
      containerResults.appendChild(text);

      text.addEventListener('click', () => paintDetails(element));
  }

  buttonSearch.addEventListener('click', function() {
    fetchTo (input.value); 
  })

  //PINTAMOS DETALLE
  function paintDetails(element) {
        containerResults.remove();   

        let containerDetails = document.createElement("div");
        containerDetails.setAttribute("class", "containerDetails");
        wrapper.appendChild(containerDetails);

        let picture = document.createElement("img"); 
        picture.setAttribute("src", element.image);
        containerDetails.appendChild(picture);

        let backBtn = document.createElement('button');
        backBtn.setAttribute("class", "btn-back");
        backBtn.setAttribute('content', 'BACK');
        backBtn.textContent = 'BACK';
        containerDetails.appendChild(backBtn);

        backBtn.addEventListener('click', goBack);
  }

