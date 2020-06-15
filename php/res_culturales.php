<?php

require_once('DataBase.php');

$method=$_SERVER['REQUEST_METHOD']; //Capturar método utilizado
$uri=$_SERVER['REQUEST_URI'];       //Capturar URI utilizada
$result = "";


//MÉTODO HTTP GET
function res_get(){
    //USO: Pasar un único argumento entero id si se va a aplicar la acción a un elemento específico
    //Si no, no es necesario pasar argumentos.
    $args=func_get_args();
    $conexion= new Database();

    if (count($args)==1){
        //Se pasó el id. //CASO: Obtener una única actividad cultural
        $result=$conexion->Mostrar_Actividades_Culturales($conexion);
        //OJO: Prototipo del array a pasar, verificar que el resultado del método correspondiente en DataBase.php devuelva un array con la misma estructura
        //$result=array("culturales"=>array("Fecha"=>"23 de mayo de 2020", "Nombre"=> "Guitarra", "Detalles"=>"Clases básicas", "Direccion"=>"Jiutepec", "Activo"=>"1"));
    }else{
        //No se pasó el id. //CASO: Obtener todos las actividades culturales
        $result=$conexion->Mostrar_Actividades_Culturales($conexion);
        //OJO: Prototipo del array a pasar, verificar que el resultado del método correspondiente en DataBase.php devuelva un array con la misma estructura
        //$result=array("culturales"=>array("1"=>array("Fecha"=>"23 de mayo de 2020", "Nombre"=> "Guitarra", "Detalles"=>"Clases básicas", "Direccion"=>"Jiutepec", "Activo"=>"1"), 
        //"2"=>array("Fecha"=>"02 de febrero de 2020", "Nombre"=> "Pintura", "Detalles"=>"Clases básicas", "Direccion"=>"Jonacatepec", "Activo"=>"1")));
    }

return $result;
}

//MÉTODO HTTP POST
function res_post(){
    //USO: No es necesario pasar argumentos, la función lee el contenido del body de la solicitud HTTP y trata los datos para hacer la inserción en la BD
    //Obtención de datos de la solicitud
    if($json=file_get_contents('php://input')){
        $data=json_decode($json);

        $conexion= new Database();

        $Nombre = $data->nombre;
        $Detalles = $data->detalles;
        $Direccion = $data->direccion;

        $result = $conexion->Crear_Actividad_Cultural(
            $conexion,
            $Nombre, 
            $Fecha, 
            $Direccion, 
            $Detalles
        );

    }else{
        $result = ["Error"=>"No se enviaron todos los parametros correctamente"];
        header('HTTP/1.1 400 Bad Request');
        return;
    }


    return $result;

}

//MÉTODO HTTP PUT
function res_put($id){
    //USO: Es necesario pasar un único argumento $id, para conocer cual row se va a modificar.
    if($json=file_get_contents('php://input')){
        $data=json_decode($json);
        $conexion= new Database();

        $Nombre = $data->nombre;
        $Detalles = $data->detalles;
        $Direccion = $data->direccion;

        $result = $conexion->Modificar_Actividad_Cultural(
            $conexion,
            $id,
            $Nombre, 
            $Fecha, 
            $Direccion, 
            $Detalles
        );

    }else{
        $result = ["Error"=>"No se enviaron todos los parametros correctamente"];
        header('HTTP/1.1 400 Bad Request');
        return;
    }
    return $result;
}

//MÉTODO HTTP DELETE
function res_delete($id){

    $conexion= new Database();

    $result = $conexion->Eliminar_Actividad_Cultural (
        $conexion,
        $id
    );
    
    return $result;
}


//CÓDIGO EJECUTADO AL MOMENTO DE LLAMAR AL ARCHIVO PHP
$uri=explode("/",$uri);
$uri=array_slice($uri,3); //Elimina las primeras tres partes irrelevantes de la uri (""/"projectfolder"/"php")
if($uri[0] == 'res_culturales.php'){
    if($uri=array_slice($uri,1)){ //Si después de eliminar el primer elemento ("res_culturales.php"), el array no está vacío, entonces
        if($uri[0]==""){ //Si no se especificó un id pero si se puso un slash al final de la uri ("...ntes.php/")
            header('HTTP/1.1 400 Bad Request');
            return;
        } else { //Si se especificó un id en la uri ("...rales.php/1")
            $id=$uri[0];
            $id_specified=TRUE;   
        }
    }else{ //Si no se especificó un id en la uri ("...rales.php")
       $id_specified=FALSE;
    }
    
    switch($method){
        case 'GET':
                $id_specified ? ($result=res_get($id)) : ($result=res_get());
        break;
        case 'POST':
                $id_specified ? header('HTTP/1.1 400 Bad Request') : ($result = res_post());
        break;
        case 'PUT':
                $id_specified ? ($result=res_put($id)) : header('HTTP/1.1 400 Bad Request');
        break;
        case 'DELETE':
                $id_specified ? ($result=res_delete($id)) : header('HTTP/1.1 400 Bad Request');
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






echo json_encode(($result),JSON_UNESCAPED_UNICODE);

?>