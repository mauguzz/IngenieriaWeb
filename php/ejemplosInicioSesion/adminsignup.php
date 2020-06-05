<?php
include 'conexion.php';

$json=file_get_contents('php://input');
$data=json_decode($json);
$email=$data->user;
$name=$data->name;
$password=$data->password;

$hash=password_hash($password, PASSWORD_DEFAULT, ['cost'=>10]);

mysqli_set_charset($conexion, "utf8");

$consulta="insert into administradores(nombre, email, pass) values ('$name', '$email', '$hash')";
$result=mysqli_query($conexion,$consulta) or die(mysqli_error($conexion));

if(!$result){
	header('HTTP/1.1 500 Internal Server Error');
}


mysqli_close($conexion);


?>