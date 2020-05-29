
function leerMigrante(){
    fetch("migrantes.php", {
        method: 'GET'
    })
    .then(res=>{
        return res.json();
    })
    .then(json=>{

    })
    .catch(e=>{

    })

}

function registrarMigrante(){

}

function modificarMigrante(){
    
}