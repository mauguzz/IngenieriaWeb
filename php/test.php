<?php
require_once('DataBase.php');

//use DataBase;
$db = new DataBase();
$conexion=$db.Conectar();
//$conexion=DataBase::Conectar();
echo(DataBase::Mostrar_Migrantes_Todos($conexion));



?>