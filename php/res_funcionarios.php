<?php

require_once('DataBase.php');

     /*Continuamos la sesión*/
     session_start();
    $result=new stdclass();
    if (!empty($_SESSION['USERID']) and !empty($_SESSION['USERNAME'])){
        $result->USERID=$_SESSION['USERID'];
        $result->USERNAME=$_SESSION['USERNAME'];
        $result->POINTID=$_SESSION['POINTID'];
        echo json_encode(($result),JSON_UNESCAPED_UNICODE);
        
    }else{
        $result->USERID=NULL;
        $result->USERNAME=NULL;
        $result->POINTID=NULL;
        echo json_encode(($result),JSON_UNESCAPED_UNICODE);
    }
?>