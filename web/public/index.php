<?php
//  function __construct(){
//   if (session_status() == PHP_SESSION_NONE) {
//       session_start();
//   }
// }
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <title>FETCHER : Parameter LAB </title>
  <link rel="icon" type="image/x-icon" href="/assets/main/fav_logo_bmkg_16x16.png">



  <script src="assets/Loader_Pace_1_24/js/pace.min.js" data-pace-options='{ "ajax": true }'></script>
  <link rel="stylesheet" href="assets/Loader_Pace_1_24/css/barber-shop.css">


  <!-- Font Awesome -->
  <link rel="stylesheet" href="assets/FA_6/css/all.css">
  <!-- Bootstrap core CSS -->
  <link rel="stylesheet" href="assets/mdb_4/css/bootstrap.min.css">
  <!-- Material Design Bootstrap -->
  <link rel="stylesheet" href="assets/mdb_4/css/mdb.min.css">
  <!-- MDBootstrap Datatables  -->
  <!-- <link href="assets/mdb_4/css/addons/datatables2.min.css" rel="stylesheet">
  <link href="assets/mdb_4/css/addons/datatables-select2.min.css" rel="stylesheet"> -->

  <!-- Datatables From Sources -->
  <link href="assets/DataTables/datatables.min.css" rel="stylesheet">
  </script>


  <!-- Your custom styles (optional) -->
  <link rel="stylesheet" href="assets/main/css/style.css">
</head>

<body>


<!-- Central Modal Small -->
<div class="modal fade" id="centralModalSm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true" data-backdrop="static" data-keyboard="false">

  <!-- Change class .modal-sm to change the size of the modal -->
  <div class="modal-dialog modal-dialog-centered modal-fluid " role="document">


    <div class="modal-content" style="background-color: rgba(238, 238, 238, 0.42) !important;">
      <div class="modal-header">
        <h4 class="modal-title w-100" id="myModalLabel">Hasil Data </h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      <div id="tbl_suhu_placeholder" >
        </div>



      <!-- <table id="dtMaterialDesignExample" class="table table-striped table-responsive-md btn-table" cellspacing="0" width="100%">


        </table> -->


        <!-- <table id="dtMaterialDesignExample" class="stripe hover cell-border order-column table table-bordered" cellspacing="0" width="100%">
    <thead>

        <tr>
                <th rowspan="2">No</th>
                <th rowspan="2">Waktu</th>
                <th colspan="3">Tanggal</th>
        </tr>
        <tr>
                <th>x</th>
                <th>y</th>
                <th>z</th>
        </tr>

    </thead>
    <tbody>
            <tr>
                <td>1</td>
                <td>Pagi</td>

                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Siang</td>

                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Sore</td>

                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
            </tr>
</table> -->










      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>

      </div>
    </div>
  </div>
</div>
<!-- Central Modal Small -->










  <!--Navigation & Intro-->
  <header id="app">

    <nav class="navbar fixed-top navbar-expand-lg navbar-dark scrolling-navbar deep-purple lighten-2">
      <div class="container">
        <a class="navbar-brand" href="#"><strong>↤ Parameter Kondisi Lab</strong></a>

      </div>
    </nav>


    <!-- Intro Section -->
    <div id="home" class="view jarallax" data-jarallax='{"speed": 0.2}' style="background-image: url(assets/main/bg.jpg); background-repeat: no-repeat; background-size: cover; background-position: center center;">
      <div class="mask rgba-purple-slight">
        <div class="container h-100 d-flex justify-content-center align-items-center">
          <div class="row smooth-scroll">

            <div class="col-md-12 white-text text-center">


              <div class="wow fadeInDown" data-wow-delay="0.2s">
                <h5 class="display-4 font-weight-bold mb-2">Data Kondisi Lingkungan</h5>
              </div>








              <div class="wow zoomInUp" data-wow-delay="0.2s">

                <hr class="hr-light">
              </div>







              <!-- <form class="needs-validation container" novalidate> -->

              <form id="parameter_data" action="<?php echo (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]" . "conf/fetch_data.php"; ?>" method="POST" class="needs-validation container" novalidate>

                <!--Grid row-->
                <div class="form-row">


                  <!--Grid column-->
                  <div class="col-md-6 mb-4">

                    <div class="md-form ">
                      <!--The "from" Date Picker -->
                      <input placeholder="Selected starting date" type="text" name="startingDate" id="startingDate" class="form-control datepicker" required>
                      <label for="startingDate">Tanggal Awal</label>
                      <div class="invalid-feedback">Please select a valid date.</div>
                    </div>

                  </div>
                  <!--Grid column-->

                  <!--Grid column-->
                  <div class="col-md-6 mb-4">

                    <div class="md-form">
                      <!--The "to" Date Picker -->
                      <input placeholder="Selected ending date" type="text" name="endingDate" id="endingDate" class="form-control datepicker" required>
                      <label for="endingDate">Tanggal Akhir</label>
                      <div class="invalid-feedback">Please select a valid date.</div>
                    </div>

                  </div>
                  <!--Grid column-->

                </div>
                <!--Grid row-->




                <!-- <div class="form-row">
                  <div class="mb-3 col-12">
                    <select class="mdb-select  validate md-form" name="ruang_lab" id="ruang_lab" searchable="Cari ...">
                      <option value="" disabled selected>Pilih Ruang Lab.</option>
                      <option value="Fourly_ruang_angin">Lab. Angin</option>
                      <option value="Fourly_ruang_geof">Lab. Geof</option>
                      <option value="Fourly_ruang_hujan">Lab. Hujan</option>
                      <option value="Fourly_ruang_kelembaban">Lab. Kelembaban</option>
                      <option value="Fourly_ruang_suhu">Lab. Suhu</option>
                      <option value="Fourly_ruang_tekanan">Lab. Tekanan</option>
                    </select>

                  </div>
                </div> -->
                <div class="form-row">
                  <div class="mb-3 col-12">
                    <select class="mdb-select  validate md-form" name="ruang_lab" id="ruang_lab" searchable="Cari ...">
                      <option value="" disabled selected>Pilih Ruang Lab.</option>
                      <option value="ruang_angin">Lab. Angin</option>
                      <option value="ruang_geof">Lab. Geof</option>
                      <option value="ruang_hujan">Lab. Hujan</option>
                      <option value="ruang_kelembaban">Lab. Kelembaban</option>
                      <option value="ruang_suhu">Lab. Suhu</option>
                      <option value="ruang_tekanan">Lab. Tekanan</option>
                    </select>

                  </div>
                </div>

                <div class="form-row">
                <div class="col-12">
                <p class="text-center">Pilih Waktu Deltas:</p>
                  <!--Radio buttons-->
                  <div class="btn-group text-center align-content-center" data-toggle="buttons">

                    <label class="btn btn-cyan btn-rounded active form-check-label">
                      <input class="form-check-input" type="radio" autocomplete="off" name="deltas_time" id="dailytimes" value="dailytimes"> Harian
                      <i class="fa-duotone fa-repeat-1"></i>
                    </label>

                    <label class="btn btn-cyan btn-rounded form-check-label">
                      <input class="form-check-input" type="radio" autocomplete="off" name="deltas_time" id="fourlytimes" value="fourlytimes" checked> Jam Kerja
                      <i class="fa-duotone fa-business-time"></i>
                    </label>

                    <label class="btn btn-cyan btn-rounded form-check-label">
                      <input class="form-check-input" type="radio" autocomplete="off" name="deltas_time" id="realtimes" value="realtimes"> Per Jam
                      <i class="fa-duotone fa-hourglass-clock"></i>
                    </label>

                  </div>
                  <!--Radio buttons-->
                </div>
                </div>



                <button class="btn btn-rounded btn-purple-2 white-text  wow bounceInUp" type="submit" data-toggle="modal" data-target="#centralModalSm">Cari Data</button>
                <!-- <input type="submit" value="Cari" class="btn btn-rounded btn-purple-2 white-text  wow bounceInUp" data-wow-delay="0.2s"> -->
                <!-- <a id="sbmt_frm" class="btn btn-rounded pink white-text lighten-3 wow fadeIn waves-effect waves-light" data-wow-delay="0.2s" style="visibility: visible; animation-delay: 0.2s; animation-name: fadeIn;">Cari</a> -->

              </form>





              <?php
              // $callback =$_SESSION['callback'];
              // $data = json_decode($callback);

              ?>







              <!-- <div class="wow zoomInUp" data-wow-delay="0.2s">

                <hr class="hr-light">
              </div> -->






















            </div>
          </div>
        </div>
      </div>
    </div>


  </header>



  <!--Footer-->
  <footer class="page-footer unique-color-dark text-center text-md-left pt-0 ">

    <!--Footer Links-->
    <div class="container">

      <!--Copyright-->
      <div class="py-3 text-center">
        <div class="container-fluid">
          <a href="https://github.com/ggzitha/" target="_blank">© 2021 Copyright: Mee@BBWV </a>
        </div>
      </div>
      <!--/Copyright-->
    </div>
  </footer>
  <!--/Footer-->


  <!-- jQuery -->
  <script type="text/javascript" src="assets/mdb_4/js/jquery.min.js"></script>
  <!-- Bootstrap tooltips -->
  <script type="text/javascript" src="assets/mdb_4/js/popper.min.js"></script>
  <!-- Bootstrap core JavaScript -->
  <script type="text/javascript" src="assets/mdb_4/js/bootstrap.min.js"></script>
  <!-- MDB core JavaScript -->
  <script type="text/javascript" src="assets/mdb_4/js/mdb.min.js"></script>
  <!-- MDBootstrap Datatables  -->
  <!-- <script type="text/javascript" src="assets/mdb_4/js/addons/datatables2.min.js"></script>
  <script type="text/javascript" src="assets/mdb_4/js/addons/datatables-select2.min.js"></script> -->

  <!-- Datatables From Sources -->
  <script type="text/javascript" src="assets/DataTables/datatables.min.js"></script>

  <!-- Your custom scripts -->
  <script type="text/javascript" src="assets/main/js/script.js"></script>

  <script type="text/javascript">


    </script>


</body>

</html>
