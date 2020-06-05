<?php

		setcookie('guzmorauth', 'loging_out', [
			'expires' => time()-1, 
			'path' => '/guzmor/',
			'domain' => 'localhost', 
			'secure' => false,
			'httponly' => true,
			'samesite' => 'Lax']
		);
		header('HTTP/1.1 200 OK');
		


?>