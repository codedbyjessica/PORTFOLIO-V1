<?php
  $name = $_REQUEST['name'] ;
  $email = $_REQUEST['email'] ;
  $message = $_REQUEST['message'] ;

  mail( "yaojiazhang@gmail.com", "A message by $name from www.codedbyjessica.com",
    $message, "From: $email");
  header( "Location: sent.html" );
?>
