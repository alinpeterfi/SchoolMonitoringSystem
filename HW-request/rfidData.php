<?php
require 'D:/XAMPP/htdocs/PHPMailer/src/PHPMailer.php';
require 'D:/XAMPP/htdocs/PHPMailer/src/SMTP.php';
require 'D:/XAMPP/htdocs/PHPMailer/src/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;

   $servername = "localhost";
   $username = "root";
   $password = "password";
   $dbname = "licenta";
   $rfid = $_GET["rfid"];
   $hour = $_GET["hour"];
   $min = $_GET["min"];

   // Create connection

   $conn = new mysqli($servername, $username, $password, $dbname);
   // Check connection
   if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
   }

   $query1 = "SELECT firstName, lastName, entranceStatus FROM students WHERE rfid = '$rfid'";
   $query2 = "SELECT firstName, lastName, entranceStatus, email, sms FROM students WHERE rfid = '$rfid'";
   $sql = "UPDATE students SET entranceStatus = NOT entranceStatus, hour = $hour, min = $min WHERE rfid = '$rfid'";	

$results1 = array();
$results2 = array();

 if ($conn->query($sql) === TRUE) {
      echo "";
   }
 else {
      echo "Error: " . $sql . " => " . $conn->error;
   }

	/* The query for arduino */
if ($result1 = $conn->query($query1)) {

    /* fetch associative array */
    while ($row = $result1->fetch_assoc()) {
        $results1[] = $row;
    }

    /* free result set */
    $result1->free();
}

	/* The query for email */
if ($result2 = $conn->query($query2)) {

    /* fetch associative array */
    while ($row = $result2->fetch_assoc()) {
        $results2[] = $row;
    }

    /* free result set */
    $result2->free();
}

/* close connection */
$conn->close();

/* print json object*/
$json_p = json_encode($results1);
echo $json_p;


/* json object for email parameters */
$json_e = json_encode($results2);
$json_d = json_decode($json_e);

if($json_d[0]->sms == 1){
$mail = new PHPMailer();
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'ssl';
$mail->Host = 'smtp.gmail.com';
$mail->Port = '465';
$mail->isHtml();
$mail->Username = 'schoolmonitorsystem@gmail.com';
$mail->Password = '';
$mail->Subject = 'Entrance Status';
$mail->setFrom("schoolmonitorsystem@gmail.com");

if($hour <= 9){
$hour = str_pad($hour, 2, '0', STR_PAD_LEFT);
}

if($min <= 9){
$min = str_pad($min, 2, '0', STR_PAD_LEFT);
}

if($json_d[0]->entranceStatus == 0) {
$mail->Body = 'The student ' . $json_d[0]->firstName . ' ' . $json_d[0]->lastName . ' has left the school at ' . $hour . ':' . $min;
}
else {
$mail->Body = 'The student ' . $json_d[0]->firstName . ' ' . $json_d[0]->lastName . ' has entered the school at ' . $hour . ':' . $min;
}

$mail->addAddress($json_d[0]->email);
$mail->Send();
}
?>