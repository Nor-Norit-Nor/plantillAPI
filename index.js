//VARIABLES GLOBALES
let input = document.querySelector(".search");
let buttonSearch = document.querySelector(".btn-search");
let buttonReset = document.querySelector(".btn-reset");
let wrapper = document.querySelector(".wrapper"); 
let containerResults = document.querySelector(".containerResults");


//FUNCIONES
function fetchTo(character) {
    if(character !== "") {
      fetch(`https://rickandmortyapi.com/api/character/?name=${character}`)
        .then(response => response.json())
        .then(data => {
          sessionStorage.setItem(`save-${character}`, JSON.stringify(data))
          console.log(data)
          return data
        })
        .then(data => 
            data.results.map(element => paintResults(element)
            //recuerda que en data.map debe hacerse si el resultado del fetch es un array de objetos. 
          ))
    }
  }

  function paintResults(element) {
      let result = document.createElement("div");
      containerResults.appendChild(result);
      let text = document.createElement("p");
      let content = document.createTextNode(element.name);
      text.appendChild(content);
      containerResults.appendChild(text);
      text.addEventListener('click', () => paintDetails(element));
  }

  buttonSearch.addEventListener('click', function() {
    fetchTo (input.value) 
  })

  function paintDetails(element) {
        containerResults.remove();    
        let containerDetails = document.createElement("div");
        wrapper.appendChild(containerDetails);
        let picture = document.createElement("img"); 
        picture.setAttribute("src", element.image);
   
        containerDetails.appendChild(picture);
        let backBtn = document.createElement('button');
        backBtn.setAttribute("class", "btn-back");
        backBtn.setAttribute('content', 'BACK');
        backBtn.textContent = 'BACK';
        containerDetails.appendChild(backBtn);

        backBtn.addEventListener('click', ()=>{
          goBack();
        })
  }

  function goBack(){

    const storageSaved = JSON.parse(localStorage.getItem(`save-${character}`))
    console.log('paso por back', storageSaved)
      paintResults(storageSaved)
    recoverResults = input.value
  }




  