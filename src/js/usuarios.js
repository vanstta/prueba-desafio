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
ordenarUsers(dataUsuario)
}

const crearCardUsuario = (dataUsuario) => {

    const usuarioContainer = document.getElementById("card");
  //hago un map para recorrer la data recibida y generar la card con los datos solicitados en el maquetado
  
  
  usuarioContainer.innerHTML = dataUsuario

      .map(
        
        ({ name:{first}, name:{last},picture:{large}, location:{city}, location:{state}, location: {postcode}, registered: {age}}) => ` <div class="cardUsuario"> 
        <img class="foto" src="${large}" alt="persona">
        <div class="cardDatos">
            <h3 class="nombre">${first} ${last}</h3>
            <i class="fas fa-filter ">Recruitment Consultancy</i>
            <i class="fas fa-map-marker-alt ciudad">${city}, ${state} ${postcode} </i>
            <hr>
            <div>
                <i class="far fa-clock activo">Active since: ${age} Y ago</i>
                <i class="far fa-heart"></i>
            </div>
            
        </div>
        </div>`
  
      )
  
      .join("");
  

  };


const inputBuscar =document.getElementById('buscar')
const tarjeta = document.getElementsByClassName('cardUsuario')

//agrego filtro para buscar por nombre

inputBuscar.addEventListener('keyup', (e)=> {
    let texto= e.target.value;
    
    let er= new RegExp(texto, "i");
    for (let i=0; i<tarjeta.length; i++) {
        let valor= tarjeta[i];
    
        if(er.test(valor.innerText)) {
            valor.classList.remove('ocultar')
        }else {
            
            valor.classList.add('ocultar')
        }
    }


})


const ordenarUsers = async () => {
    let usuariosNombres = await obtenerUsuarios();
    const arrayNombres= usuariosNombres.map(item=>item.name)
    
    arrayNombres.sort((a, b)=> {
      
        if (a.first< b.first) {
            return -1
        } if (a.first> b.first) {
            return 1
        }
        return 0
    })
    

    const asc = document.querySelector('#uno')
    let dataUsuario = arrayNombres
    asc.onclick= function () {

    
    dataUsuario = getPaginado(usuarios, 1).usuariosPaginados
    crearCardUsuario(dataUsuario)
   
 }
}


