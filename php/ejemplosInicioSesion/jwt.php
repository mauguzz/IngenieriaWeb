<?php
require_once('../vendor/autoload.php');

use Firebase\JWT\JWT;

class JSONWebToken{
    private $tokenId;
    private $issuedAt;
    private $notBefore;
    private $expire;
    private $serverName;
    private $data;
    private $jwt;
    private $jwtUnencodedArray;
    private $jwtEncodedAray;
    private $jwtSecretKey;

    private static function getKey(){
        $dotenv=new Dotenv();
        $dotenv->load(__DIR__.'/environment/.env');
        $jwtKey = $_ENV['JWT_KEY'];
        return $jwtKey;
    }
    public static function createToken($id, $email) : string {
        $tokenId=base64_encode(random_bytes(32));
        $issuedAt = time();
        $notBefore = $issuedAt;
        $expire = $notBefore + 57600; //16 horas
        $serverName = "guzmorauth";
        $data=[
            'iat' => $issuedAt,
            'jti' => $tokenId,
            'iss' => $serverName,
            'nbf' => $notBefore,
            'exp' => $expire,
            'data'=> [
                'userID' => $id,
                'userName' => $email
            ]
        ];

        //$jwtSecretKey=getKey();
        $jwtSecretKey="GUZMOR";
        $jwt= JWT::encode(
            $data,
            $jwtSecretKey,
            'HS512'
        );
        //$jwtUnencodedArray=['jwt'=>$jwt];
        //$jwtEncodedAray=json_encode($jwtUnencodedArray);
        //return $jwtEncodedAray;
        return $jwt;
    }

    public static function validateToken($receivedJWT){
        if($receivedJWT){
            try{
                //$jwtSecretKey=getKey();
                $jwtSecretKey="GUZMOR";
                $token = JWT::decode($receivedJWT, $jwtSecretKey, array('HS512'));
                return $token;

            } catch(Exception $e) {
                return 'UNAUTHORIZED';
            }

        }
    }



}

?>