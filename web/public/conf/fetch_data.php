<?php

    // if (session_status() == PHP_SESSION_NONE) {
    //     session_start();
    // }

require 'carbon/autoload.php';

use Carbon\Carbon;
use Carbon\CarbonInterval;



include "dbs.php";
// Check Connection
if (!$conn) {
    die("Failed To Connect: " . mysqli_connect_error());
    $Srv_Status = "Failed To Connect: " . mysqli_connect_error();
}
$Srv_Status = "Connected";



function transposeData($dataa)
{
  $retData = array();

    foreach ($dataa as $row => $columns) {
      foreach ($columns as $row2 => $column2) {
          $retData[$row2][$row] = $column2;
      }
    }
  return $retData;
}




$errors = [];
$data = [];

if (empty($_POST['ruang_lab'])) {
    $errors['err_ruang_lab'] = 'Ruangan Lab is required.';
}

if (empty($_POST['endingDate'])) {
    $errors['err_endingDate'] = 'Start Date is required.';
}

if (empty($_POST['startingDate'])) {
    $errors['err_startingDate'] = 'End Date is required.';
}

if (empty($_POST['deltas_time'])) {
    $errors['err_deltas_time'] = 'Time Deltas is required.';
}

if (!empty($errors)) {
    $callback = array(
        'success'=>false,
        'errors'=>$errors
    );

} else {

    $Ruang_lab=$_POST['ruang_lab'];
    $Tanggal_Awal=$_POST['startingDate'];
    $Tanggal_Akhir=$_POST['endingDate'];


    $Opsi_Jarak=$_POST['deltas_time'];
    if($Opsi_Jarak == 'dailytimes'){
        $Nama_DBs = 'daily_'.$Ruang_lab;
    }
    if($Opsi_Jarak == 'fourlytimes'){
        $Nama_DBs = 'Fourly_'.$Ruang_lab;
    }
    if($Opsi_Jarak == 'realtimes'){
        $Nama_DBs =  $Ruang_lab;
    }



    $Tanggal_Awal_frmt = Carbon::create($Tanggal_Awal, 'Asia/Jayapura')->setTimezone('UTC')->format('Y-m-d 00:00:00');
    $Tanggal_Akhir_frmt = Carbon::create($Tanggal_Akhir, 'Asia/Jayapura')->setTimezone('UTC')->format('Y-m-d 00:00:00');



    $sql = mysqli_query($conn, "SELECT * FROM `db_parameter_lab`.`$Nama_DBs` WHERE `Date_Time` > '$Tanggal_Awal_frmt' AND  `Date_Time` < '$Tanggal_Akhir_frmt' AND `keterangan` IS NOT NULL ");

    $datas = mysqli_fetch_all($sql, MYSQLI_ASSOC);



    $mod_timeCtrl = array();
    $mod_timeCtrl_UNIX = array();

    $datas_pagi = array();
    $datas_siang = array();
    $datas_sore = array();

    foreach ($datas as $dta) {

        $data_id	=$dta["data_id"];
        $Date_Time	=$dta["Date_Time"];
        $Battery	=$dta["Battery"];
        $Temperature	= round($dta["Temperature"], 1);
        $Humidity	= round($dta["Humidity"], 1);
        $keterangan	=$dta["keterangan"];
        $Timestamps	=$dta["Timestamps"];

        $datas_dateTime = Carbon::create($Date_Time, 'UTC');

        $date_indo = Carbon::parse($datas_dateTime)->locale('id');
        $date_indo->settings(['formatFunction' => 'translatedFormat']);
        // buat index Header print
        $datas_dateTime_WIT_BULAN_TAHUN = $date_indo->setTimezone('Asia/Jayapura')->format('F Y');
        $datas_dateTime_WIT_BULAN_TAHUN_ = $date_indo->setTimezone('Asia/Jayapura')->format('F_Y');

        // buat index array hari libur (hari Tanggal)
        $datas_date_WIT = $datas_dateTime->setTimezone('Asia/Jayapura')->format('Y-m-d');

        // buat index array (hari Tanggal)
        $datas_dateOnly_WIT = $datas_dateTime->setTimezone('Asia/Jayapura')->format('d');

        // beda pengambilan pagi siang sore
        $datas_hr_WIT = (int)$datas_dateTime->setTimezone('Asia/Jayapura')->format('H');

        array_push($mod_timeCtrl, $datas_dateOnly_WIT);
        array_push($mod_timeCtrl_UNIX, $datas_date_WIT);

        if($datas_hr_WIT == 8){
            $datas_pagi[$datas_dateOnly_WIT] = [
                "BAT" => $Battery,
                "TEM" => $Temperature,
                "HUM" => $Humidity,
            ];
            }elseif($datas_hr_WIT == 12){
                $datas_siang[$datas_dateOnly_WIT] = [
                "BAT" => $Battery,
                "TEM" => $Temperature,
                "HUM" => $Humidity,
                ];
                }elseif($datas_hr_WIT == 4){
            $datas_sore[$datas_dateOnly_WIT] = [
                "BAT" => $Battery,
                "TEM" => $Temperature,
                "HUM" => $Humidity,
            ];
            };

    }


    // Remove duplicate values
    $num_unique = array_unique($mod_timeCtrl);
    $num_unique_UNIX = array_unique($mod_timeCtrl_UNIX);


    if($Ruang_lab == "ruang_angin"){
        $Selector_Header_LABS = "RUANG LINGKUP : LAB.ANGIN &nbsp;&nbsp;&nbsp; BULAN : ". strtoupper ($datas_dateTime_WIT_BULAN_TAHUN);
        $Rename_TO_THIS = "kondisi_LAB_ANGIN_". strtoupper ($datas_dateTime_WIT_BULAN_TAHUN_);
    }
    elseif($Ruang_lab == "ruang_geof"){
        $Selector_Header_LABS = "RUANG LINGKUP : LAB.GEOFISIKA &nbsp;&nbsp;&nbsp; BULAN : ". strtoupper ($datas_dateTime_WIT_BULAN_TAHUN);
        $Rename_TO_THIS = "kondisi_LAB_GEOF_". strtoupper ($datas_dateTime_WIT_BULAN_TAHUN_);
    }
    elseif($Ruang_lab == "ruang_hujan"){
        $Selector_Header_LABS = "RUANG LINGKUP : LAB.HUJAN &nbsp;&nbsp;&nbsp; BULAN : ". strtoupper ($datas_dateTime_WIT_BULAN_TAHUN);
        $Rename_TO_THIS = "kondisi_LAB_HUJAN_". strtoupper ($datas_dateTime_WIT_BULAN_TAHUN_);
    }
    elseif($Ruang_lab == "ruang_kelembaban"){
        $Selector_Header_LABS = "RUANG LINGKUP : LAB.KELEMBABAN &nbsp;&nbsp;&nbsp; BULAN : ". strtoupper ($datas_dateTime_WIT_BULAN_TAHUN);
        $Rename_TO_THIS = "kondisi_LAB_KELEMBABAN_". strtoupper ($datas_dateTime_WIT_BULAN_TAHUN_);
    }
    elseif($Ruang_lab == "ruang_suhu"){
        $Selector_Header_LABS = "RUANG LINGKUP : LAB.SUHU &nbsp;&nbsp;&nbsp; BULAN : ". strtoupper ($datas_dateTime_WIT_BULAN_TAHUN);
        $Rename_TO_THIS = "kondisi_LAB_SUHU_". strtoupper ($datas_dateTime_WIT_BULAN_TAHUN_);
    }
    elseif($Ruang_lab == "ruang_tekanan"){
        $Selector_Header_LABS = "RUANG LINGKUP : LAB.TEKANAN &nbsp;&nbsp;&nbsp; BULAN : ". strtoupper ($datas_dateTime_WIT_BULAN_TAHUN);
        $Rename_TO_THIS = "kondisi_LAB_TEKANAN_". strtoupper ($datas_dateTime_WIT_BULAN_TAHUN_);
    }
    else{
        $Selector_Header_LABS = "";
        $Rename_TO_THIS = "";
    }


    $days_ttl = count($num_unique);

    $callback = array(
        'srv_status'=>$Srv_Status,
        'success'=>true,
        'message'=>'Success!',
        'Selector_Header_LABS'=>$Selector_Header_LABS,
        'Rename_TO_THIS'=>$Rename_TO_THIS,
        'TimeCTRL'=>$num_unique,
        'TimeCTRL_UNIX'=>$num_unique_UNIX,
        'Days_TOTAL'=>$days_ttl,
        'data_PAGI'=>$datas_pagi,
        'data_SIANG'=>$datas_siang,
        'data_SORE'=>$datas_sore
    );
}

$_SESSION['callback'] = json_encode($callback);

header('Content-Type: application/json');
echo json_encode($callback);
