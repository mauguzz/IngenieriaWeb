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

    if (count($args)==1){
        //Se pasó el id. //CASO: Obtener detalles de un migrante

        //$result=DataBase::Mostrar_Migrante_Detalles($id);

        //OJO: Prototipo del array a pasar, verificar que el resultado del método correspondiente en DataBase.php devuelva un array con la misma estructura
        $result=array("id"=>$args[0],"datos_generales"=> array("Nombre"=>"Mauricio", "Edad"=>"20", "Punto"=> "2"), 
            "laborales"=>array("1"=> array("Fecha"=>"30 de mayo de 2020","Detalles"=>"Backend Developer","Requisitos"=>"PHP","Direccion"=>"Jiutepec") ), 
            "culturales"=>array("1"=> array("Fecha"=>"23 de mayo de 2020", "Nombre"=> "Guitarra", "Detalles"=>"Clases básicas", "Direccion"=>"Jiutepec", "Activo"=>"1")));
    }else{
        //No se pasó el id. //CASO: Obtener todos los migrantes

        //OJO: Prototipo del array a pasar, verificar que el resultado del método correspondiente en DataBase.php devuelva un array con la misma estructura
        $result=array("migrantes"=>array("1"=>array("Nombre"=>"Mauricio", "Apellido_Paterno"=>"Gutiérrez", "Apellido_Materno"=>"Montor", "Ciudad"=>"Jiutepec"), 
        "2"=>array("Nombre"=>"Fabián", "Apellido_Paterno"=>"Sánchez", "Apellido_Materno"=>"Moreno", "Ciudad"=>"Ecatepec")));
    }
          

return $result;
}

//MÉTODO HTTP POST
function res_post(){
    //USO: No es necesario pasar argumentos, la función lee el contenido del body de la solicitud HTTP y trata los datos para hacer la inserción en la BD
    //Obtención de datos de la solicitud
    if($json=file_get_contents('php://input')){
        $data=json_decode($json);
    }else{
        header('HTTP/1.1 400 Bad Request');
        return;
    }
    $Nombre = $data->nombre;
    $Apellido_Paterno = $data->apellido_paterno;
    $Apellido_Materno = $data->apellido_materno;
    $Fecha_Nacimiento = $data->fecha_nacimiento;
    $Ciudad = $data->ciudad;
    $Pais = $data->pais; //entero (opción de combobox)
    $Oficio = $data->oficio;
    $Contacto_Telefono = $data->contacto_telefono;
    $Nivel_Educativo = $data->nivel_educativo; //entero (opción de combobox)
    $Situacion_Familiar = $data->situacion_familiar; //entero (opción de combobox)
    $Causa_Migracion = $data->causa_migracion; //entero (opción de combobox)
    $Llave = "123456"; //Crear una llave de migrante aleatoria
    
    
    //Datos derivados en la BD, que no es necesario insertar: ID_Migrante, Edad, Id_Estado (migrando o establecido).

    //DataBase::Crear_Migrante($Nombre, $Apellido_Paterno, $Apellido_Materno, $Fecha_Nacimiento, $Ciudad, $Pais, $Oficio, $Contacto_Telefono, $Nivel_Educativo, $Situacion_Familiar, $Causa_Migracion, $Llave);
    $result=["POST"=>"Correcto, insertado correctamente"];
    return $result;

}

//MÉTODO HTTP PUT
function res_put($id){
    //USO: Es necesario pasar un único argumento $id, para conocer cual row se va a modificar.
    if($json=file_get_contents('php://input')){
        $data=json_decode($json);
    }else{
        header('HTTP/1.1 400 Bad Request');
        return;
    }
    $Nombre = $data->nombre;
    $Apellido_Paterno = $data->apellido_paterno;
    $Apellido_Materno = $data->apellido_materno;
    $Fecha_Nacimiento = $data->fecha_nacimiento;
    $Ciudad = $data->ciudad;
    $Pais = $data->pais; //entero (opción de combobox)
    $Oficio = $data->oficio;
    $Contacto_Telefono = $data->contacto_telefono;
    $Nivel_Educativo = $data->nivel_educativo; //entero (opción de combobox)
    $Situacion_Familiar = $data->situacion_familiar; //entero (opción de combobox)
    $Causa_Migracion = $data->causa_migracion; //entero (opción de combobox)
    $Llave = "123456"; //Cambiar la llave de migrante aleatoria
    
    
    //Datos derivados en la BD, que no es necesario insertar: ID_Migrante, Edad, Id_Estado (migrando o establecido).

    //A diferencia de DataBase::Crear_Migrante(), se pasa adicionalmente un ID
    //DataBase::Modificar_Migrante($id, $Nombre, $Apellido_Paterno, $Apellido_Materno, $Fecha_Nacimiento, $Ciudad, $Pais, $Oficio, $Contacto_Telefono, $Nivel_Educativo, $Situacion_Familiar, $Causa_Migracion, $Llave);

    $result=["PUT"=>"Correcto, modificado correctamente", "ID"=>$id];
    return $result;
}

//MÉTODO HTTP DELETE
function res_delete($id){
    //USO: Es necesario pasar un único argumento $id, para conocer cual row se va a eliminar. No se considera implementar la opción de eliminar todos.
    
    //DataBase::Eliminar_Migrante($id);

    $result=["DELETE"=>"Correcto, eliminado correctamente", "ID"=>$id];
    return $result;
}


//CÓDIGO EJECUTADO AL MOMENTO DE LLAMAR AL ARCHIVO PHP
$uri=explode("/",$uri);
$uri=array_slice($uri,3); //Elimina las primeras tres partes irrelevantes de la uri (""/"projectfolder"/"php")
if($uri[0] == 'res_migrantes.php'){
    if($uri=array_slice($uri,1)){ //Si después de eliminar el primer elemento ("res_migrantes.php"), el array no está vacío, entonces
        if($uri[0]==""){ //Si no se especificó un id pero si se puso un slash al final de la uri ("...ntes.php/")
            header('HTTP/1.1 400 Bad Request');
            return;
        } else { //Si se especificó un id en la uri ("...ntes.php/1")
            $id=$uri[0];
            $id_specified=TRUE;   
        }
    }else{ //Si no se especificó un id en la uri ("...ntes.php")
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