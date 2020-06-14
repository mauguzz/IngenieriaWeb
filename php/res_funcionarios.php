<?php

require_once('DataBase.php');

     /*Continuamos la sesión*/
     session_start();
    if (!empty($_SESSION['USERID']) and !empty($_SESSION['USERNAME']) ){
         return [
            'USERID'=>$_SESSION['USERID'],
            'USERNAME'=>$_SESSION['USERNAME']
                ];
    }else{
        return ['Datos'=>'Inicie sesión'];
    }

?>