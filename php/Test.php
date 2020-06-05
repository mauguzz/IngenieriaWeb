<?php

include('DataBase.php');

$Conexion= new Database();
$result=$Conexion->Mostrar_Migrantes_Todos($Conexion);



foreach($result as $Fila){

<tr>
<td><?php echo $Fila['NoBoleta']?></td>
<td><?php echo $Fila['Nombre']?></td>
<td><?php echo $Fila['APaterno']?></td>
<td><?php echo $Fila['AMaterno']?></td> 
<td><?php echo $Fila['NoEmpleado']?></td> 
<td><?php echo $Fila['State']?></td> 
</tr>



?>