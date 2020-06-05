<?php
require_once('DataBase.php');

DataBase::Conectar();
echo(DataBase::Mostrar_Migrantes_Todos());



?>