<?php

if (isset($POST['enviar'])) {
    if(!empty($_POST['nombre']) && !empty($_POST['email']) && !empty($_POST['telefono']) && !empty($_POST['asunto']) && !empty($_POST['mensaje'])) {
        $nombre = $_POST['nombre'];
        $email = $_POST['email'];
        $telefono = $_POST['telefono'];
        $asunto = $_POST['asunto'];
        $mensaje = $_POST['mensaje'];

        $header = "From: noreply@example.com" . "\r\n";
        $header .= "Reply-To: noreply@example.com" . "\r\n";
        $header .= 'X-Mailer: PHP/' . phpversion();

        $mensaje_completo = $email. "\r\n";
        $mensaje_completo .= $telefono. "\r\n";
        $mensaje_completo .= $mensaje. "\r\n";
        
        $mail = mail("madape05@gmail.com", $asunto, $mensaje_completo, $header);

        if ($mail) {
            echo "<h4>¡Mail enviado exitosamente</h4>";
        }
    }
}


?>
