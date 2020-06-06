<?php

include('DataBase.php');

echo 'Done';

$Conexion= new Database();
$result=$Conexion->Mostrar_Migrante_Detalle($Conexion, 1);

echo(json_encode($result));

/*
foreach($result as $Fila){

<tr>
<td><?php echo $Fila['NoBoleta']?></td>
<td><?php echo $Fila['Nombre']?></td>
<td><?php echo $Fila['APaterno']?></td>
<td><?php echo $Fila['AMaterno']?></td> 
<td><?php echo $Fila['NoEmpleado']?></td> 
<td><?php echo $Fila['State']?></td> 
</tr>
*/


?>