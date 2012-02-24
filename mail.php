<?php
$email = $_POST['email'];

$to = "amanda@artifactdesign.com";
$subject = "[Newsletter] Newsletter subscription ";
$message = "Please subscribe: ".$email;

if(mail($to, $subject, $message, null, '-fnewsletter@artifactdesign.com')){
echo 1;
}
else{
echo 0;
}
?>
