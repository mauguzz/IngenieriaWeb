<?php
class DataBase{	
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
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function Mostrar_Migrante_Detalle ($mysqli, $Id_Migrante){//Recibe objeto de conexión

        //$Id_Migrante=$_POST['Id_Migrante']; //Se hace el cast de HTML a un variable PHP por el metodo POST 
        $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
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
        return array('datos_generales'=>$Migrante->fetchAll(PDO::FETCH_ASSOC),
                'Registro'=>$Registro->fetchAll(PDO::FETCH_ASSOC),
                'culturales'=>$Asistencia_Actividad_Cultural->fetchAll(PDO::FETCH_ASSOC),
                'laborales'=>$Asistencia_Oferta_Laboral->fetchAll(PDO::FETCH_ASSOC)
    )       ; //Retorno las matrices

    }

    public static function Mostrar_Actividades_Culturales($mysqli){
        $Conexion = $mysqli ->Conectar(); //Me conecto a la base de datos
        $query="SELECT * FROM Actividades";//Introduzco la consulta
        $Actividades = $Conexion->prepare($query); //
        $Actividades->execute();  //Ejecuto la consulta
        return ['Actividades'=>$Actividades->fetchAll(PDO::FETCH_ASSOC)];
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
        $query="SELECT * FROM Ofertas_de_Trabajo";//Introduzco la consulta
        $Ofertas_de_Trabajo = $Conexion->prepare($query); //
        $Ofertas_de_Trabajo->execute();  //Ejecuto la consulta
        return ['Ofertas_de_Trabajo'=>$Ofertas_de_Trabajo->fetchAll(PDO::FETCH_ASSOC)];
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

/*------------------------------------------------Sesiones--------------------------------------------------*/
    public static function IniciarSesion ($mysqli){
        
        if (empty($_POST['User']) || empty ($_POST['Pass'];)){
           
            echo '
					<script type="text/javascript">	
					alert("Por favor llene ambos campos");
					window.history.back();
					</script>';
        }   
        else {
            $User=$_POST['User'];        
            $Pass=$_POST['Pass'];
            $Conexion = $mysqli ->Conectar();
            $query="SELECT * FROM Funcionario where Correo_Electronico='".$User."'";//Introduzco la consulta
            $result  = $Conexion->prepare($query); //
            $result->execute();
            $res=fetchAll(PDO::FETCH_ASSOC)];
            if (($res>0){//Verifico la existencia de un usuario funcinoario -----------Comprobar funcionamiento
                
                if(password_verify($pass,$res["Contrasenia"])){
                    session_start(); /*Inicializamos los valores de la sesión*/
                    $_SESSION['USERNAME']=$res["Nombre"];
                    $_SESSION['USERID']=$res["Id_Funcionario"];
                    header("location:../Funcionario.html");  

                }else{
                    echo '
					<script type="text/javascript">	
					alert("La contraseña es incorrecta, por favor intente de nuevo");
					window.history.back();
					</script>';
                }            



            }else {//Si no existe un usuario funcionario, lo verifico con un usuario Administrador 
                $Conexion = $mysqli ->Conectar();
                $query="SELECT * FROM Administrador where Correo_Electronico='".$User."'";//Introduzco la consulta
                $result  = $Conexion->prepare($query); //
                $result->execute();
                $res=fetchAll(PDO::FETCH_ASSOC)];
                if (($res>0){//--------------------------------------------Comprobar funcionamiento
                    if(password_verify($pass,$res["Contraseña"])){
                        session_start(); /*Inicializamos los valores de la sesión*/
                        $_SESSION['USERNAME']=$res["Nombre"];
                        $_SESSION['USERID']=$res["Id_Administrador"];
                        header("location:../Funcionario.html");  

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
					alert("El usuario o contraseña no es valido, por favor verifique sus datos");
					window.history.back();
					</script>';
                }
                
            }

        }

    }

}

?>