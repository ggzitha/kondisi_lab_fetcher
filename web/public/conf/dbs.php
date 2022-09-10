<?php

    // if (session_status() == PHP_SESSION_NONE) {
    //     session_start();
    // }


$servername = "192.168.88.8";
$database = "db_parameter_lab";
$username = "admin_parameter_lab";
$password = "root_lab";
 
// untuk tulisan bercetak tebal silakan sesuaikan dengan detail database Anda
// membuat koneksi
$conn = mysqli_connect($servername, $username, $password, $database);
// mengecek koneksi
// if (!$conn) {
//     die("Koneksi gagal: " . mysqli_connect_error());
// }
// echo "Koneksi berhasil";
// mysqli_close($conn);
?>