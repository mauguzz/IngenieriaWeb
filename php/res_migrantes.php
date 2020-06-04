<?php

require_once('DataBase.php');

$method=$_SERVER['REQUEST_METHOD']; //Capturar método utilizado
$uri=$_SERVER['REQUEST_URI'];       //Capturar URI utilizada


//MÉTODO HTTP GET
/*
function res_get($uri){
    
          
        if($uri){
            if($uri[0]==""){ //Si no se especifica un id pero si se puso un slash
                header('HTTP/1.1 400 Bad Request');
            } else { //Si se especifica un id
                //CASO: Obtener detalles de un migrante
                $result=array("uri"=>$uri,"datos_generales"=> array("Nombre"=>"Mauricio", "Edad"=>"20", "Punto"=> "2"), 
                "trabajos"=>array("1"=> array("Fecha"=>"30 de mayo de 2020","Detalles"=>"Backend Developer","Requisitos"=>"PHP","Direccion"=>"Jiutepec") ), 
                "actividades_culturales"=>array("1"=> array("Fecha"=>"23 de mayo de 2020", "Nombre"=> "Guitarra", "Detalles"=>"Clases básicas", "Requisitos"=>"Ninguno", "Activo"=>"Si")));
            }
        }else{
            //CASO: Obtener todos los migrantes
            $result=array("migrantes"=>array("1"=>array("Nombre"=>"Mauricio", "Apellido_Paterno"=>"Gutiérrez", "Apellido_Materno"=>"Montor", "Ciudad"=>"Jiutepec"), 
            "2"=>array("Nombre"=>"Fabián", "Apellido_Paterno"=>"Sánchez", "Apellido_Materno"=>"Moreno", "Ciudad"=>"Ecatepec")));
        }

    return $result;
}
*/

function res_get(){
    //USO: Pasar un único argumento entero id si se va a aplicar la acción a un elemento específico
    //Si no, no es necesario pasar argumentos.
    $args=func_get_args();

    if (count($args)==1){
        //Se pasó el id. //CASO: Obtener detalles de un migrante
        $result=array("id"=>$args[0],"datos_generales"=> array("Nombre"=>"Mauricio", "Edad"=>"20", "Punto"=> "2"), 
            "trabajos"=>array("1"=> array("Fecha"=>"30 de mayo de 2020","Detalles"=>"Backend Developer","Requisitos"=>"PHP","Direccion"=>"Jiutepec") ), 
            "actividades_culturales"=>array("1"=> array("Fecha"=>"23 de mayo de 2020", "Nombre"=> "Guitarra", "Detalles"=>"Clases básicas", "Requisitos"=>"Ninguno", "Activo"=>"Si")));
    }else{
        //No se pasó el id. //CASO: Obtener todos los migrantes
        $result=array("migrantes"=>array("1"=>array("Nombre"=>"Mauricio", "Apellido_Paterno"=>"Gutiérrez", "Apellido_Materno"=>"Montor", "Ciudad"=>"Jiutepec"), 
        "2"=>array("Nombre"=>"Fabián", "Apellido_Paterno"=>"Sánchez", "Apellido_Materno"=>"Moreno", "Ciudad"=>"Ecatepec")));
    }
          

return $result;
}

//MÉTODO HTTP POST
function res_post($uri){
    if($uri[0] == 'res_migrantes.php'){

    }
}

//MÉTODO HTTP PUT
function res_put($uri){

}

//MÉTODO HTTP DELETE
function res_delete($uri){

}

$uri=explode("/",$uri);
$uri=array_slice($uri,3); //Elimina las primeras tres partes irrelevantes de la uri (""/"projectfolder"/"php")
if($uri[0] == 'res_migrantes.php'){
    array_shift($uri);  //Eliminar después
    



    if($uri=array_slice($uri,1)){
        if($uri[0]==""){ //Si no se especifica un id pero si se puso un slash
            header('HTTP/1.1 400 Bad Request');
            return;
        } else { //Si se especifica un id
            $id=$uri[0];
            $id_specified=TRUE;
            //CASO: Obtener detalles de un migrante
            
        }
    }else{
        //CASO: Obtener todos los migrantes
       $id_specified=FALSE;
    }
    


    switch($method){
        case 'GET':
                $id_specified ? ($result=res_get($id)) : ($result=res_get());
        break;
        case 'POST':
                res_post($uri);
        break;
        case 'PUT':
                res_put($uri);
        break;
        case 'DELETE':
                res_delete($uri);
        break;
        default:
                header('HTTP/1.1 405 Method not allowed');
                header('Allow: GET, POST, PUT, DELETE');
        break;
    }
        
} else {
    // Sólo se aceptan resources desde 'clients'
    header('HTTP/1.1 404 Not Found');
}







//


/*
//Obtención de datos de la solicitud
if($data=file_get_contents('php://input')){
        $id=$data->id;
}else{
        header('HTTP/1.1 400 Bad Request');
        return;
}
*/

//$result=DataBase::Mostrar_Migrante_Detalles($id);


echo json_encode(($result),JSON_UNESCAPED_UNICODE);

?>