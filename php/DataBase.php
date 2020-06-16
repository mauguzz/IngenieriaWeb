<?php
class DataBase{	
    private static $Conexion_Alt;
/*-------------------------------------------------Conexión-------------------------------------------------*/
    public static function Conectar() {        
        define('Server', 'localhost');
        define('DataBase', 'Sistema_Migracion');
        define('user', 'WebApplication');
        define('password', '123456');					        
        $options = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');			
        try{
            $Conexion = new PDO("mysql:host=".Server."; dbname=".DataBase, user, password, $options);			
            return $Conexion;
        }catch (Exception $e){
            die("Hubo un error al conectar: ". $e->getMessage());
        }
    }
/*--------------------------------------------------Views---------------------------------------------------*/
    public static function Mostrar_Migrantes_Todos ($mysqli){//Recibe objeto de conexión

        //$mysqli = new DataBase(); //Inicializo mi objeto
        $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
        $query="SELECT * FROM Migrantes_Todos";//Introduzco la consulta
        $result = $Conexion->prepare($query); //Agrego variables (Si es el caso)
        $result->execute();  //Ejecuto la consulta
        //return ['Migrantes'=>$result->fetchAll(PDO::FETCH_ASSOC)] //Retorno la matriz en el formato
        return ["migrantes"=>$result->fetchAll(PDO::FETCH_ASSOC)];
    }

    public static function Mostrar_Migrante_Detalle ($mysqli, $Id_Migrante){//Recibe objeto de conexión

        //Lo siguiente es un parche, debido a que en res_migrantes.php llamo dos veces a una función de DataBase
        //estas son primero Consultar_Llave_Migrante() y después esta función Mostrar_Migrante_Detalle, y como
        //me pide hacer la conexión para cada una de estas, PHP me regresaba una advertencia de que las constantes de
        //servidor define('Server', 'localhost');
        //define('DataBase', 'Sistema_Migracion');
        //define('user', 'WebApplication');
        //define('password', '123456');	
        //ya estaban definidas, por lo que para no modificar mucho la estructura de lo que se tiene hasta ahorita hice el
        //siguiente parche. Lo ideal sería modificar todas las funciones para que no se tenga que volver a llamar
        //a la función Conectar() tanto en los archivos res_xxxxxx.php y después redefinirlo en cada función como se hacía hasta ahora
        //Ver implementación de lo ideal en Consultar_Llave_Migrante(), observar que es una variable estática de la clase,
        //Accesible por todas las funciones.
        if(!isset(DataBase::$Conexion_Alt)){
            $Conexion=$mysqli->Conectar();
        }else{
            $Conexion=DataBase::$Conexion_Alt;
        }
        
        $query="SELECT * FROM Migrantes_Detalle where Id_Migrante='".$Id_Migrante."'";//Introduzco la consulta
        $Migrante = $Conexion->prepare($query); //Agrego la variable $Id_Migrante
        $Migrante->execute();  //Ejecuto la consulta
        $query="SELECT  Id_Punto_Control,'Punto de control',Fecha_Entrada,Fecha_Salida,Alimentacion FROM Migrantes_Registro where Id_Migrante='".$Id_Migrante."'";
        $Registro = $Conexion->prepare($query); //Agrego la variable $Id_Migrante
        $Registro->execute();  //Ejecuto la consulta
        $query="SELECT Id_Actividad,Actividad,Direccion,fecha FROM  Asistencia_Actividad_Cultural_View where Id_Migrante='".$Id_Migrante."'";
        $Asistencia_Actividad_Cultural = $Conexion->prepare($query); //Agrego la variable $Id_Migrante
        $Asistencia_Actividad_Cultural->execute();  //Ejecuto la consulta
        $query="SELECT Id_Trabajo,Actividad,Direccion,fecha FROM  Asistencia_Oferta_Laboral_View where Id_Migrante='".$Id_Migrante."'";
        $Asistencia_Oferta_Laboral = $Conexion->prepare($query); //Agrego la variable $Id_Migrante
        $Asistencia_Oferta_Laboral->execute();  //Ejecuto la consulta
        return array('general'=>$Migrante->fetchAll(PDO::FETCH_ASSOC),
                'registros'=>$Registro->fetchAll(PDO::FETCH_ASSOC),
                'culturales'=>$Asistencia_Actividad_Cultural->fetchAll(PDO::FETCH_ASSOC),
                'laborales'=>$Asistencia_Oferta_Laboral->fetchAll(PDO::FETCH_ASSOC)
    )       ; //Retorno las matrices

    }

    public static function Consultar_Llave_Migrante($mysqli, $id){
        //$Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
        DataBase::$Conexion_Alt=DataBase::Conectar();
        $query = "SELECT Id_Migrante, Llave FROM migrante WHERE Id_Migrante='".$id."' ";
        $result = DataBase::$Conexion_Alt->prepare($query); //Agrego variables (Si es el caso)
        $result->execute();  //Ejecuto la consulta
        return ["migrante"=>$result->fetchAll(PDO::FETCH_ASSOC)];
    }

    public static function Mostrar_Actividades_Culturales($mysqli){
        $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
        $query="SELECT Id_Actividad,Nombre,Fecha,Direccion,Detalles,Activo FROM Actividades";//Introduzco la consulta
        $Actividades = $Conexion->prepare($query); //
        $Actividades->execute();  //Ejecuto la consulta
        return ['culturales'=>$Actividades->fetchAll(PDO::FETCH_ASSOC)];
    }
   
    //ESTA POSIBLEMENTE NO SE UTILICE, YA QUE SE HACE UNA CONSULTA SELECTIVA EN DETALLES DEL MIGRANTE//
    public static function Mostrar_Asistencia_Actividad_Cultural($mysqli){
        $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
        $query="SELECT * FROM Asistencia_Actividad_Cultural_View";//Introduzco la consulta
        $Asistencia_Actividad_Cultural = $Conexion->prepare($query); //
        $Asistencia_Actividad_Cultural->execute();  //Ejecuto la consulta
        return ['Asistencia_Actividad_Cultural'=>$Asistencia_Actividad_Cultural->fetchAll(PDO::FETCH_ASSOC)];
    }
 

    public static function Mostrar_Ofertas_de_Trabajo($mysqli){
        $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
        $query="SELECT Id_Trabajo, Nombre, Direccion, Requisitos, Detalles FROM Ofertas_de_Trabajo";//Introduzco la consulta
        $Ofertas_de_Trabajo = $Conexion->prepare($query); //
        $Ofertas_de_Trabajo->execute();  //Ejecuto la consulta
        return ['laborales'=>$Ofertas_de_Trabajo->fetchAll(PDO::FETCH_ASSOC)];
    }
 
    //ESTA POSIBLEMENTE NO SE UTILICE, YA QUE SE HACE UNA CONSULTA SELECTIVA EN DETALLES DEL MIGRANTE//
    public static function Mostrar_Asistencia_Oferta_Laboral($mysqli){
        $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
        $query="SELECT * FROM Asistencia_Oferta_Laboral_View";//Introduzco la consulta
        $Asistencia_Oferta_Laboral = $Conexion->prepare($query); //
        $Asistencia_Oferta_Laboral->execute();  //Ejecuto la consulta
        return ['Asistencia_Oferta_Laboral'=>$Asistencia_Oferta_Laboral->fetchAll(PDO::FETCH_ASSOC)];
    }

    public static function Mostrar_Funcionario($mysqli){
        $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
        $query="SELECT * FROM Mostrar_Funcionarios";//Introduzco la consulta
        $Funcionario = $Conexion->prepare($query); //
        $Funcionario->execute();  //Ejecuto la consulta
        return ['Funcionario'=>$Funcionario->fetchAll(PDO::FETCH_ASSOC)];
    }

    public static function Mostrar_Opciones($mysqli){
        $Conexion = $mysqli -> Conectar(); //Me conecto a la base de datos
        $query="SELECT * FROM pais";
        $Paises = $Conexion -> prepare($query);
        $Paises->execute();
        $query="SELECT * FROM estados";
        $Estados = $Conexion -> prepare($query);
        $Estados->execute();
        $query="SELECT * FROM municipios";
        $Municipios = $Conexion -> prepare($query);
        $Municipios->execute();
        $query="SELECT * FROM nivel_educativo";
        $Niveles_Educativos = $Conexion -> prepare($query);
        $Niveles_Educativos->execute();
        $query="SELECT * FROM causas_migracion";
        $Causas_Migracion = $Conexion -> prepare($query);
        $Causas_Migracion->execute();
        $query="SELECT * FROM estado_de_migrante";
        $Estados_Migrante = $Conexion -> prepare($query);
        $Estados_Migrante->execute();
        $query="SELECT * FROM Familia";
        $Situaciones_Familiares = $Conexion -> prepare($query);
        $Situaciones_Familiares->execute();
        return [
            'paises_origen' => $Paises ->fetchAll(PDO::FETCH_ASSOC),
            'estados_mexico' => $Estados ->fetchAll(PDO::FETCH_ASSOC),
            'municipios_mexico' => $Municipios ->fetchAll(PDO::FETCH_ASSOC),
            'niveles_educativos' => $Niveles_Educativos ->fetchAll(PDO::FETCH_ASSOC),
            'causas_migracion' =>  $Causas_Migracion ->fetchAll(PDO::FETCH_ASSOC),
            'migrante_estados' => $Estados_Migrante ->fetchAll(PDO::FETCH_ASSOC),
            'situaciones_familiares'=> $Situaciones_Familiares ->fetchAll(PDO::FETCH_ASSOC)
        ];
    }
/*----------------------------------------------Insercciones------------------------------------------------ */

    public static function Crear_Migrante ($mysqli,$Nombre, $Apellido_Paterno, $Apellido_Materno, $Fecha_Nacimiento, $Ciudad, $Pais, $Oficio, $Contacto_Telefono, $Nivel_Educativo, $Situacion_Familiar, $Causa_Migracion, $Llave){

        $Estado_Por_Defecto= 1;
        try {
            $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
            $Conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $query="insert into Migrante values (
            NULL,
            '".$Nombre."',
            '".$Apellido_Paterno."',
            '".$Apellido_Materno."',
            '".$Ciudad."',
            '".$Pais."',
            '".$Oficio."',
            '".$Fecha_Nacimiento."',
            NULL,
            '".$Contacto_Telefono."',
            '".$Nivel_Educativo."',
            '".$Situacion_Familiar."',
            '".$Llave."',
            '".$Causa_Migracion."',
            '".$Estado_Por_Defecto."');";
            $Funcionario = $Conexion->prepare($query); 
            $Funcionario->execute();  //Ejecuto la consulta
            return ["POST"=>"Correcto, insertado correctamente", "llave_migrante"=>$Llave];
         }catch(PDOException $e){
             return ["POST"=>"$e->getMessage()"];
         }

    }

    public static function Crear_Actividad_Cultural ($mysqli,$Nombre, $Fecha, $Direcccion, $Detalles){
    
        $Estado_Por_Defecto= 1;
        $PuntoDeControl=$_SESSION['POINTID'];
        try {
            $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
            $Conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $query="insert into Actividades values (
            NULL,
            '".$PuntoDeControl."',
            '".$Nombre."',
            '".$Fecha."',
            '".$Estado_Por_Defecto."',
            '".$Direcccion."',
            '".$Detalles."'
            );";
            $Funcionario = $Conexion->prepare($query); 
            $Funcionario->execute();  //Ejecuto la consulta
            return ["POST"=>"Correcto, insertado correctamente"];
         }catch(PDOException $e){
             return ["POST"=>"$e->getMessage()"];
         }

    }

    public static function Crear_Oferta_Laboral ($mysqli,$Nombre, $Detalles, $Requisitos, $Direccion){
    
        $Estado_Por_Defecto= 1;
        $PuntoDeControl=$_SESSION['POINTID'];
        try {
            $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
            $Conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $query="insert into Ofertas_De_trabajo values (
            NULL,
            '".$PuntoDeControl."',
            '".$Nombre."',
            '".$Detalles."',
            '".$Requisitos."',
            '".$Direcccion."'
            );";
            $Funcionario = $Conexion->prepare($query); 
            $Funcionario->execute();  //Ejecuto la consulta
            return ["POST"=>"Correcto, insertado correctamente"];
         }catch(PDOException $e){
             return ["POST"=>"$e->getMessage()"];
         }

    }

/*----------------------------------------------Modificaciones------------------------------------------------ */

public static function Modificar_Migrante ($mysqli,$id, $Nombre, $Apellido_Paterno, $Apellido_Materno, $Fecha_Nacimiento,$Edad, $Ciudad, $Pais, $Oficio, $Contacto_Telefono, $Nivel_Educativo, $Situacion_Familiar, $Causa_Migracion, $Llave){

    $Estado_Por_Defecto= 1;
    $Tabla='Migrante';
    try {
        $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
        $Conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $query="
        UPDATE ".$Tabla."
        SET 
        Nombre='".$Nombre."', 
        Apellido_Paterno='".$Apellido_Paterno."', 
        Apellido_Materno='".$Apellido_Materno."', 
        Ciudad='".$Ciudad."',
        Id_Pais='".$Pais."', 
        Oficio='".$Oficio."', 
        Fecha_Nacimiento='".$Fecha_Nacimiento."', 
        Edad='".$Edad."', 
        Telefono_Contacto='".$Contacto_Telefono."',
        Id_Nivel='".$Nivel_Educativo."',
        Id_Famlia='".$Situacion_Familiar."',
        Llave='".$Llave."',
        Id_Causa='".$Causa_Migracion."',
        Id_Estado='".$Estado_Por_Defecto."'
        WHERE Id_Migrante=".$id.";";
        $Funcionario = $Conexion->prepare($query); 
        $Funcionario->execute();  //Ejecuto la consulta
        return ["PUT"=>"Correcto, Modificado correctamente"];
     }catch(PDOException $e){
         return ["PUT"=>"$e->getMessage()"];
     }

}

public static function Modificar_Oferta_Laboral ($mysqli,$id,$Nombre, $Detalles, $Requisitos, $Direccion){

    $Estado_Por_Defecto= 1;
    $Tabla='Ofertas_De_Trabajo';
    try {
        $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
        $Conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $query="
        UPDATE ".$Tabla."
        SET 
        Nombre='".$Nombre."', 
        Detalles='".$Detalles."', 
        Requisitos='".$Requisitos."', 
        Direccion='".$Direccion."'       
        WHERE Id_Trabajo=".$id.";";
        $Funcionario = $Conexion->prepare($query); 
        $Funcionario->execute();  //Ejecuto la consulta
        return ["PUT"=>"Correcto, Modificado correctamente"];
     }catch(PDOException $e){
         return ["PUT"=>"$e->getMessage()"];
     }

}

public static function Modificar_Actividad_Cultural($mysqli,$id,$Nombre, $Fecha, $Activo, $Direccion, $Detalles){

    $Estado_Por_Defecto= 1;
    $Tabla='Actividades';
    try {
        $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
        $Conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $query="
        UPDATE ".$Tabla."
        SET 
        Nombre='".$Nombre."', 
        Fecha='".$Fecha."', 
        Activo='".$Activo."', 
        Direccion='".$Direccion."',
        Detalles='".$Detalles."'
        WHERE Id_Actividad=".$id.";";
        $Funcionario = $Conexion->prepare($query); 
        $Funcionario->execute();  //Ejecuto la consulta
        return ["PUT"=>"Correcto, Modificado correctamente"];
     }catch(PDOException $e){
         return ["PUT"=>"$e->getMessage()"];
     }
}

/*--------------------------------------------------Borrado de registros----------------------------------------*/

public static function Eliminar_Migrante($mysqli,$id){
   
     $Tabla='Migrante';
     $Id_Tabla='Id_Migrante';
    try {
        $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
        $Conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $query="
        DELETE FROM ".$Tabla."
        WHERE ".$Id_Tabla."=".$id.";";
        $Funcionario = $Conexion->prepare($query); 
        $Funcionario->execute();  //Ejecuto la consulta
        return ["DELETE"=>"Correcto, Eliminado correctamente"];
     }catch(PDOException $e){
         return ["DELETE"=>"$e->getMessage()"];
     }
}

public static function Eliminar_Oferta_Laboral($mysqli,$id){
   
    $Tabla='Ofertas_De_Trabajo';
    $Id_Tabla='Id_Trabajo';
   try {
       $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
       $Conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       $query="
       DELETE FROM ".$Tabla."
       WHERE ".$Id_Tabla."=".$id.";";
       $Funcionario = $Conexion->prepare($query); 
       $Funcionario->execute();  //Ejecuto la consulta
       return ["DELETE"=>"Correcto, Eliminado correctamente"];
    }catch(PDOException $e){
        return ["DELETE"=>"$e->getMessage()"];
    }
}

public static function Eliminar_Actividad_Cultural($mysqli,$id){
   
    $Tabla='Actividades';
    $Id_Tabla='Id_Actividad';
   try {
       $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
       $Conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       $query="
       DELETE FROM ".$Tabla."
       WHERE ".$Id_Tabla."=".$id.";";
       $Funcionario = $Conexion->prepare($query); 
       $Funcionario->execute();  //Ejecuto la consulta
        
    }catch(PDOException $e){
        return ["DELETE"=>"$e->getMessage()"];
    }
}


/*------------------------------------------------Sesiones--------------------------------------------------*/
    public static function IniciarSesion ($mysqli,$User, $Pass){
        

        if (empty($User) || empty ($Pass)){
           
            echo '
					<script type="text/javascript">	
					alert("Por favor llene ambos campos");
					window.history.back();
					</script>';
        }   
        else {
            $Conexion = $mysqli ->Conectar();
            $query="SELECT Id_Funcionario, Nombre,Apellido_Paterno,Apellido_Materno,Correo_Electronico,Contrasenia,Id_Punto_Control FROM Funcionario where Correo_Electronico='".$User."'";//Introduzco la consulta
            $result  = $Conexion->prepare($query); //
            $result->execute();
            $res=$result->fetchAll(PDO::FETCH_ASSOC);
            //var_dump($res);
            if (!empty($res)){//Verifico la existencia de un usuario funcinoario -----------Comprobar funcionamiento    
                if (password_verify($Pass,$res[0]["Contrasenia"])) {
                    session_start(); /*Inicializamos los valores de la sesión*/
                    $_SESSION['USERNAME']=$res[0]["Nombre"];
                    $_SESSION['USERID']=$res[0]["Id_Funcionario"];
                    $_SESSION['POINTID']=$RES[0]["Id_Punto_Control"];
                    header("location:http://localhost/IngenieriaWeb/migrantes.html");  
                    //header('Content-Type: text/html; charset=utf-8');
                    //header("Location: "."../../migrantes.html");  

                }else{
                    echo '
					<script type="text/javascript">	
					alert("La contraseña es incorrecta, por favor intente de nuevo");
					window.history.back();
					</script>';
                }            



            }else {//Si no existe un usuario funcionario, lo verifico con un usuario Administrador 
                $query="SELECT Nombre,Apellido_Paterno,Apellido_Materno,Correo_Electronico,Contraseña FROM Administrador where Correo_Electronico='".$User."'";//Introduzco la consulta
                $result  = $Conexion->prepare($query); //
                $result->execute();
                $res=$result->fetchAll(PDO::FETCH_ASSOC);
                
                if (!empty($res)){//--------------------------------------------Comprobar funcionamiento
                    if(password_verify($Pass,$res[0]["Contraseña"])){
                        session_start(); /*Inicializamos los valores de la sesión*/
                        $_SESSION['USERNAME']=$res[0]["Nombre"];
                        $_SESSION['USERID']=$res[0]["Id_Administrador"];
                        $_SESSION['ADMIN']=1;
                        header("Location: "."../../administrador.html");    
                    }else{
                        echo '
                        <script type="text/javascript">	
                        alert("La contraseña es incorrecta, por favor intente de nuevo");
                        window.history.back();
                        </script>';
                    }     


                }else{
                    echo '
					<script type="text/javascript">	
					alert("El usuario no es valido");
					window.history.back();
					</script>';
                }
                
            }

        }

    }

}

?>