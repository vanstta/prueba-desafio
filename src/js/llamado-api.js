const url = 'https://www.mockachino.com/a71b232c-218e-4d/users'


export const obtenerUsuarios = async() => {

  try {
   const respuesta= await fetch (url);

   if (!respuesta.ok) throw'No se pudo cargar la API';

   const data = await respuesta.json();
   const usuarios = data.results
   
   const getPaginado = (usuarios, pages) => {
       const page = pages || 1;
       const limit = 10; 
       const offset= (page -1) * limit; 
       const usuariosPaginados = usuarios.slice(offset).slice(0, limit)
       
       const total_pages = Math.ceil(usuarios.length / limit);
      
       return {usuariosPaginados, total_pages}
    }
       
  const body  = document.body;

   const {total_pages} = getPaginado(usuarios, 1);

   for (let i =1; i< total_pages +1; i++) {

      console.log(getPaginado(usuarios, `${i}`))
       const button = document.createElement('button')
       button.innerHTML = `${i}`;
       body.appendChild( button );
       button.classList.add('botones-paginado');
       
       if (i == total_pages) {
           // accionarBotones()
       }
   }    



    return usuarios;

   }catch(err) {
  
    throw err
}


}

