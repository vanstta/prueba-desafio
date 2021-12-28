const url = 'https://www.mockachino.com/a71b232c-218e-4d/users'


//llamado a la api
export const obtenerUsuarios = async() => {

  try {
   const respuesta= await fetch (url);

   if (!respuesta.ok) throw'No se pudo cargar la API';

   const data = await respuesta.json();
   const usuarios = data.results
 
   return usuarios;

   }catch(err) {
  
    throw err
}


}

//creo la función para mostrar 10 usuarios por página

export const getPaginado = (usuarios, pages) => {
    const page = pages || 1;
    const limit = 10; 
    const offset= (page -1) * limit; 
    const usuariosPaginados = usuarios.slice(offset).slice(0, limit)
    
    const total_pages = Math.ceil(usuarios.length / limit);
   
    return {usuariosPaginados, total_pages}
 }

