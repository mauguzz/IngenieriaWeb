<?php
require_once('DataBase.php');

use DataBase;

$conexion=DataBase::Conectar();
echo(DataBase::Mostrar_Migrantes_Todos($conexion));



?>