import {obtenerUsuarios, getPaginado} from './llamado-api'

const body  = document.body;
let card;

const hacerHtml = () => {
    
    const html = ` <div class="cardsContainer">
   
                        <div id="card">

                        </div>
                    </div>`;

    const div = document.createElement('div');
    div.innerHTML = html;
    body.appendChild( div );
    card=document.getElementById('card')
   

}

export const init = async() => {

    hacerHtml();
   

    const usuarios = await obtenerUsuarios();
   
    const {total_pages, usuariosPaginados} = getPaginado(usuarios, 1);
    let dataUsuario = usuariosPaginados;
    crearCardUsuario(dataUsuario)

    // creo los botones y llamo a la función getPaginado para que se actualicen con la data recibida

    for (let i =1; i< total_pages +1; i++) {


         const divButtons = document.querySelector('.buttonContainer')
         const button = document.createElement('button')
         button.innerHTML = `${i}`;
         divButtons.appendChild(button)
         button.classList.add('botonesPaginado');
         divButtons.classList.add('buttonContainer');
         body.appendChild(divButtons)

         button.onclick= function () {
            dataUsuario = getPaginado(usuarios, i ).usuariosPaginados
            crearCardUsuario(dataUsuario)
         }
     }    
}

const crearCardUsuario = (dataUsuario) => {

    const usuarioContainer = document.getElementById("card");
  //hago un map para recorrer la data recibida y generar la card con los datos solicitados en el maquetado
  
  
  usuarioContainer.innerHTML = dataUsuario
    // const {
    //     picture: {large},
    //     name: {first},
    //     name: {last},
    //     location: {city},
    //     location: {state},
    //     location: {postcode},
    //     registered: {age}

    //     } = usuario
      .map(
        
        ({ name, picture, location, registered }) => ` <div class="cardUsuario"> 
        <img class="foto" src="${picture.large}" alt="persona">
        <div class="cardDatos">
            <h3 class="nombre">${name.first} ${name.last}</h3>
            <i class="fas fa-filter puesto">Recruitment Consultancy</i>
            <i class="fas fa-map-marker-alt ciudad">${location.city}, ${location.state} ${location.postcode} </i>
            <hr>
            <div>
                <i class="far fa-clock activo">Activo hace: ${registered.age} años</i>
                <i class="far fa-heart"></i>
            </div>
            
        </div>
        </div>`
  
      )
  
      .join("");
  
    console.log("user::", dataUsuario);
  
  };


const inputBuscar =document.getElementById('buscar')
const tarjeta = document.getElementsByClassName('cardUsuario')

inputBuscar.addEventListener('keyup', (e)=> {
    let texto= e.target.value;
    
    let er= new RegExp(texto, "i");
    for (let i=0; i<tarjeta.length; i++) {
        let valor= tarjeta[i];
    
        if(er.test(valor.innerText)) {
            valor.classList.remove('ocultar')
        }else {
            console.log(valor)
            valor.classList.add('ocultar')
        }
    }


})


