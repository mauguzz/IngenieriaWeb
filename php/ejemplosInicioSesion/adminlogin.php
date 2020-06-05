<?php
include 'conexion.php';
require_once('jwt.php');

$json=file_get_contents('php://input');
$data=json_decode($json);
$email=$data->user;
$trypassword=$data->password;


mysqli_set_charset($conexion, "utf8");

$consulta="select id, email, pass from administradores where email='$email'";
$result=mysqli_query($conexion,$consulta) or die(mysqli_error($conexion));

if(mysqli_num_rows($result)==1){
	if (!isset($myArray)) $myArray = new stdClass();

	$myArray->numRows=mysqli_num_rows($result);
	$row=$result->fetch_array(MYSQLI_ASSOC);
	$hash = $row['pass'];
	if(password_verify($trypassword, $hash)){
		$myArray->resultado = "Correcto";
		$token = JSONWebToken::createToken($row['id'], $row['email']);
		setcookie('guzmorauth', $token, [
			'expires' => time()+57600, 
			'path' => '/guzmor/',
			'domain' => 'localhost', 
			'secure' => false,
			'httponly' => true,
			'samesite' => 'Lax']
		);
		header('HTTP/1.1 200 OK');
		
	}else{
		$myArray->resultado = "Fallido";
		header('HTTP/1.1 401 Unauthorized');
	}	
}
else{
	if (!isset($myArray)) $myArray = new stdClass();
	$myArray->resultado = "Usuario no existente";
	header('HTTP/1.1 401 Unauthorized');
}




/*
if(mysqli_num_rows($result)>0)
{
	$myArray=array();
	while($row=$result->fetch_array(MYSQLI_ASSOC))
	{
		$myArray['administradores'][]=$row;
	}
	
}
*/



echo json_encode(($myArray),JSON_UNESCAPED_UNICODE);
//echo json_last_error_msg(); die();
mysqli_close($conexion);





?>