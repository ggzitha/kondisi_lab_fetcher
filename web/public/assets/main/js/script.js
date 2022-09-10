var root_url = window.location.href;


// add an event listener for the change event
const radioButtons = document.querySelectorAll('input[name="deltas_time"]');
var radio_btn_value = 'fourlytimes';

for (const radioButton of radioButtons) {
    radioButton.addEventListener('change', showSelected_Radios);
}

function showSelected_Radios(e) {
    if (this.checked) {
        radio_btn_value = this.value;
    }
}


(function() {
    'use strict';
    window.addEventListener('load', function() {


  var place_table_suhu = document.getElementById("tbl_suhu_placeholder");

  function isWeekend(date = new Date()) {
    return date.getDay() % 6 === 0;
  }




        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();

                    toastr.options = {
                        'closeButton': true,
                        'debug': false,
                        'newestOnTop': false,
                        'progressBar': true,
                        'positionClass': 'md-toast-top-right',
                        'preventDuplicates': true,
                        'onclick': null,
                        'showDuration': 300,
                        'hideDuration': 1000,
                        'timeOut': 5000,
                        'extendedTimeOut': 1000,
                        'showEasing': 'swing',
                        'hideEasing': 'linear',
                        'showMethod': 'fadeIn',
                        'hideMethod': 'fadeOut'
                    }

                    toastr['error']('Mohon Periksa Input Anda ', 'Error ');
                }
                if (form.checkValidity() === true) {

                    var formData = {
                        startingDate: $('#startingDate').val(),
                        endingDate: $('#endingDate').val(),
                        ruang_lab: $('#ruang_lab').val(),
                        deltas_time: radio_btn_value,
                    };



                    $.ajax({
                        type: 'POST',
                        url: root_url + 'conf/fetch_data.php',
                        data: formData,
                        dataType: 'json',
                        encode: true,
                        // success: function(result) {
                        //     alert('ok');
                        // },
                        // error: function(result) {
                        //     alert('error');
                        // }
                    }).done(function(callback) {
                        console.log(callback);

                        if (!callback.success) {
                            toastr.options = {
                                'closeButton': true,
                                'debug': false,
                                'newestOnTop': true,
                                'progressBar': true,
                                'positionClass': 'md-toast-top-right',
                                'preventDuplicates': true,
                                'onclick': null,
                                'showDuration': 300,
                                'hideDuration': 1000,
                                'timeOut': 10000,
                                'extendedTimeOut': 1000,
                                'showEasing': 'swing',
                                'hideEasing': 'linear',
                                'showMethod': 'fadeIn',
                                'hideMethod': 'fadeOut'
                            }
                            if (callback.errors.err_ruang_lab) {
                                toastr['error'](callback.errors.err_ruang_lab, 'Error ');
                            }
                            if (callback.errors.err_startingDate) {
                                toastr['error'](callback.errors.err_startingDate, 'Error ');
                            }
                            if (callback.errors.err_endingDate) {
                                toastr['error'](callback.errors.err_endingDate, 'Error ');
                            }
                            if (callback.errors.err_deltas_time) {
                                toastr['error'](callback.errors.err_deltas_time, 'Error ');
                            }
                        } else if (callback.success) {


                            document.getElementById("myModalLabel").innerHTML = callback.Rename_TO_THIS;
                            let table_header_dates = "";

                            let table_data_pagi = "";
                            let table_data_siang = "";
                            let table_data_sore = "";

                            let table_data_pagi_RH = "";
                            let table_data_siang_RH = "";
                            let table_data_sore_RH = "";

                            var hoolidayss = [];

                            // Loop over the object and append a list item for each AppName property.
                            $.each(callback.TimeCTRL, function (index, item) {
                                const d222 = new Date(callback.TimeCTRL_UNIX[index]);

                                if (isWeekend(d222)){
                                    table_header_dates += '<th style="background-color:#FFACAC">' + item + '</th>';

                                    hoolidayss.push(
                                        item );
                                }else{
                                    table_header_dates += '<th >' + item + '</th>';
                                }

                            });

                            console.log(hoolidayss);
                            var columnNames = callback.TimeCTRL; //.Table[0]] refers to the propery name of the returned json
                            for (var i in columnNames) {
                                var tgls = String(columnNames[i]);
                                if (callback.data_PAGI[tgls] != undefined){
                                    var pg_bats = String(callback.data_PAGI[tgls]['BAT']);
                                    var pg_hums = String(callback.data_PAGI[tgls]['HUM']);
                                    var pg_tems = String(callback.data_PAGI[tgls]['TEM']);
                                    if(hoolidayss.includes(tgls)){
                                        table_data_pagi +=  '<td style="background-color:#FFACAC">' + pg_tems + '°C </td>';
                                        table_data_pagi_RH +=  '<td style="background-color:#FFACAC">' + pg_hums + '%RH </td>';
                                    }else{
                                    table_data_pagi += "<td>" + pg_tems + "°C </td>";
                                    table_data_pagi_RH += "<td>" + pg_hums + "%RH </td>";
                                    }
                                }else{
                                    var pg_bats = String("___");
                                    var pg_hums = String("___");
                                    var pg_tems = String("___");
                                    if(hoolidayss.includes(tgls)){
                                        table_data_pagi +=  '<td style="background-color:#FFACAC">' + pg_tems + '°C </td>';
                                        table_data_pagi_RH +=  '<td style="background-color:#FFACAC">' + pg_hums + '%RH </td>';
                                    }else{
                                    table_data_pagi += "<td>" + pg_tems + "°C </td>";
                                    table_data_pagi_RH += "<td>" + pg_hums + "%RH </td>";
                                    }
                                }

                                if (callback.data_SIANG[tgls] != undefined){
                                    var si_bats = String(callback.data_SIANG[tgls]['BAT']);
                                    var si_hums = String(callback.data_SIANG[tgls]['HUM']);
                                    var si_tems = String(callback.data_SIANG[tgls]['TEM']);
                                    if(hoolidayss.includes(tgls)){
                                        table_data_siang +=  '<td style="background-color:#FFACAC">' + si_tems + '°C </td>';
                                        table_data_siang_RH +=  '<td style="background-color:#FFACAC">' + si_hums + '%RH </td>';
                                    }else{
                                        table_data_siang += "<td>" + si_tems + "°C </td>";
                                        table_data_siang_RH += "<td>" + si_hums + "%RH </td>";
                                    }
                                }else{
                                    var si_bats = String("___");
                                    var si_hums = String("___");
                                    var si_tems = String("___");
                                    if(hoolidayss.includes(tgls)){
                                        table_data_siang +=  '<td style="background-color:#FFACAC">' + si_tems + '°C </td>';
                                        table_data_siang_RH +=  '<td style="background-color:#FFACAC">' + si_hums + '%RH </td>';
                                    }else{
                                        table_data_siang += "<td>" + si_tems + "°C </td>";
                                        table_data_siang_RH += "<td>" + si_hums + "%RH </td>";
                                    }
                                }

                                if (callback.data_SORE[tgls] != undefined){
                                    var so_bats = String(callback.data_SORE[tgls]['BAT']);
                                    var so_hums = String(callback.data_SORE[tgls]['HUM']);
                                    var so_tems = String(callback.data_SORE[tgls]['TEM']);
                                    if(hoolidayss.includes(tgls)){
                                        table_data_sore +=  '<td style="background-color:#FFACAC">' + so_tems + '°C </td>';
                                        table_data_sore_RH +=  '<td style="background-color:#FFACAC">' + so_hums + '%RH </td>';
                                    }else{
                                        table_data_sore += "<td>" + so_tems + "°C </td>";
                                        table_data_sore_RH += "<td>" + so_hums + "%RH </td>";
                                    }
                                }else{
                                    var so_bats = String("___");
                                    var so_hums = String("___");
                                    var so_tems = String("___");
                                    if(hoolidayss.includes(tgls)){
                                        table_data_sore +=  '<td style="background-color:#FFACAC">' + so_tems + '°C </td>';
                                        table_data_sore_RH +=  '<td style="background-color:#FFACAC">' + so_hums + '%RH </td>';
                                    }else{
                                        table_data_sore += "<td>" + so_tems + "°C </td>";
                                        table_data_sore_RH += "<td>" + so_hums + "%RH </td>";
                                    }
                                }

                            }


                            var Append_to_html = `
                            <table id="dtMaterialDesignExample" class="table  table-bordered table-hover cell-border table-striped table-responsive-md btn-table" cellspacing="0" width="100%">

                            <thead>
                                <tr>
                                        <th colspan="`+(callback.Days_TOTAL+4)+`" class="dt-center dver-middle h5"><strong><b>Tabel Data SUHU</b></strong></th>
                                </tr>
                                <tr>
                                        <th rowspan="2" class="dt-center dver-middle h5"><strong><b>No</b></strong></th>
                                        <th rowspan="2" class="dt-center dver-middle h5"><strong><b>Waktu</b></strong></th>
                                        <th colspan="`+callback.Days_TOTAL+`" class="dt-center h5"><strong><b>Tanggal</b></strong></th>
                                </tr>
                                <tr>

                                        `+table_header_dates+`
                                </tr>

                            </thead>
                            <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Pagi</td>

                                        `+ table_data_pagi+`
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Siang</td>

                                        `+ table_data_siang+`
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Sore</td>

                                        `+ table_data_sore+`
                                    </tr>
                            </tbody>
                        </table>
                        </br>
                            <table id="dtMaterialDesignExample_RH" class="table  table-bordered table-hover cell-border table-striped table-responsive-md btn-table" cellspacing="0" width="100%">

                            <thead>
                                <tr>
                                        <th colspan="`+(callback.Days_TOTAL+4)+`" class="dt-center dver-middle h5"><strong><b>Tabel Data RH</b></strong></th>
                                </tr>
                                <tr>
                                        <th rowspan="2" class="dt-center dver-middle h5"><strong><b>No</b></strong></th>
                                        <th rowspan="2" class="dt-center dver-middle h5"><strong><b>Waktu</b></strong></th>
                                        <th colspan="`+callback.Days_TOTAL+`" class="dt-center h5"><strong><b>Tanggal</b></strong></th>
                                </tr>
                                <tr>

                                        `+table_header_dates+`
                                </tr>

                            </thead>
                            <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Pagi</td>

                                        `+ table_data_pagi_RH+`
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Siang</td>

                                        `+ table_data_siang_RH+`
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Sore</td>

                                        `+ table_data_sore_RH+`
                                    </tr>
                            </tbody>
                        </table>
                      `;
                            place_table_suhu.innerHTML = Append_to_html;




                            if ($.fn.DataTable.isDataTable('#dtMaterialDesignExample')) {
                                var tabless = $('#dtMaterialDesignExample').DataTable();
                                tabless.destroy();
                                $('#dtMaterialDesignExample').empty();
                            }



                            var Append_to_PRINT_SUHU = `
                            <thead>

                                <tr>
                                        <th rowspan="2" class="dt-center dver-middle h5"><strong><b>No</b></strong></th>
                                        <th rowspan="2" class="dt-center dver-middle h5"><strong><b>Waktu</b></strong></th>
                                        <th colspan="`+callback.Days_TOTAL+`" class="dt-center h5"><strong><b>Tanggal</b></strong></th>
                                </tr>
                                <tr>

                                        `+table_header_dates+`
                                </tr>

                            </thead>
                            <tbody>
                                    <tr>
                                        <td class="dt-center">1</td>
                                        <td>Pagi</td>
                                        `+ table_data_pagi+`
                                    </tr>
                                    <tr>
                                        <td class="dt-center">2</td>
                                        <td>Siang</td>
                                        `+ table_data_siang+`
                                    </tr>
                                    <tr>
                                        <td class="dt-center">3</td>
                                        <td>Sore</td>
                                        `+ table_data_sore+`
                                    </tr>
                            </tbody>
                      `;
                            var Append_to_PRINT_ERHA = `
                            <thead>

                                <tr>
                                        <th rowspan="2" class="dt-center dver-middle h5"><strong><b>No</b></strong></th>
                                        <th rowspan="2" class="dt-center dver-middle h5"><strong><b>Waktu</b></strong></th>
                                        <th colspan="`+callback.Days_TOTAL+`" class="dt-center h5"><strong><b>Tanggal</b></strong></th>
                                </tr>
                                <tr>

                                        `+table_header_dates+`
                                </tr>

                            </thead>
                            <tbody>
                                    <tr>
                                        <td class="dt-center">1</td>
                                        <td>Pagi</td>
                                        `+ table_data_pagi_RH+`
                                    </tr>
                                    <tr>
                                        <td class="dt-center">2</td>
                                        <td>Siang</td>
                                        `+ table_data_siang_RH+`
                                    </tr>
                                    <tr>
                                        <td class="dt-center">3</td>
                                        <td>Sore</td>
                                        `+ table_data_sore_RH+`
                                    </tr>
                            </tbody>
                      `;


                            $('#dtMaterialDesignExample_RH').DataTable({

                                processing: false,
                                serverSide: false,
                                searching: false,
                                stateSave: false,
                                bDestroy: true,
                                ordering: false, // Set true agar bisa di sorting
                                empty: true,
                                dom: 'lBfrtip',
                                deferRender: true,
                                responsive: true,
                                paging: false,
                                info: false,
                                order: [
                                    [0, 'ASC']
                                ],
                                buttons: [ ]
                            });



                            $('#dtMaterialDesignExample').DataTable({

                                processing: false,
                                serverSide: false,
                                searching: false,
                                stateSave: true,
                                bDestroy: true,
                                ordering: false, // Set true agar bisa di sorting
                                empty: true,
                                dom: 'lBfrtip',
                                deferRender: true,
                                responsive: true,
                                paging: false,
                                info: false,
                                order: [
                                    [0, 'ASC']
                                ],
                                buttons: [
                                    // 'excelHtml5',
                                    // 'csvHtml5',
                                    // 'pdfHtml5',
                                    // 'print',
                                    {
                                        extend: 'print',
                                        text: 'Print Data',
                                        className: 'btn dark btn-outline',
                                        // exportOptions: {
                                        //     columns: [ 2,3,4,5,6 ]
                                        // },
                                        filename: 'Report',
                                        title: 'Data suhu',
                                        autoPrint: true,
                                        customize: function ( win ) {
                                            var css = `@page { size: landscape; }

                                                table, table tr, table td, table th, table td {
                                                    border-top: #000 solid 1px !important;
                                                    border-bottom: #000 solid 1px !important;
                                                    border-left: #000 solid 1px !important;
                                                    border-right: #000 solid 1px !important

                                            }`,
                                            head = win.document.head || win.document.getElementsByTagName('head')[0],
                                            style = win.document.createElement('style');
                                            style.type = 'text/css';
                                            style.media = 'print';

                                            if (style.styleSheet)
                                                {
                                                style.styleSheet.cssText = css;
                                                }
                                                else
                                                {
                                                style.appendChild(win.document.createTextNode(css));
                                                }

                                                head.appendChild(style);


                                            $(win.document.body)
                                                .css( 'font-size', '10pt' )
                                                .prepend(
                                                    '<img src="http://datatables.net/media/images/logo-fade.png" style="position:absolute; top:0; left:0;" />'
                                                );

                                                let stylish = `<style>
                                                @page { size: A4 landscape; margin: 0; }

                                                  body {
                                                    background-image:  url(/assets/main/bg_print_a4.png);
                                                    background-size:   cover;                      /* <------ */
                                                    background-repeat: no-repeat;
                                                    background-position: center top;            /* optionally, center the image */
                                                }
                                                @media print {
                                                    @page { size: A4 landscape; margin: 0; }
                                                    body {transform: scale(1);}
                                                    table {page-break-inside: avoid;}
                                                    #tabele_print_suhu{
                                                        table-layout: fixed !important;
                                                        width: 380mm !important;
                                                        height: 40mm !important;
                                                        border: 1px solid !important;
                                                        margin-top: 95mm !important;
                                                        margin-left: 1mm !important;
                                                    }
                                                    #tabele_print_lembab{
                                                        table-layout: fixed !important;
                                                        width: 380mm !important;
                                                        height: 40mm !important;
                                                        border: 1px solid !important;
                                                        margin-top: 10mm !important;
                                                        margin-left: 1mm !important;
                                                    }

                                                }
                                                #tabele_print_suhu{
                                                    table-layout: fixed;
                                                    width: 98%;
                                                    height: 24%;
                                                    border: 1px solid;
                                                    margin-top: 25%;
                                                    margin-left: 1%;
                                                }
                                                #tabele_print_lembab{
                                                    table-layout: fixed;
                                                    width: 98%;
                                                    height: 24%;
                                                    border: 1px solid;
                                                    margin-top: 3%;
                                                    margin-left: 1%;
                                                }
                                                table tr, table td, table th, table td {
                                                    border-top: #000 solid 1px !important;
                                                    border-bottom: #000 solid 1px !important;
                                                    border-left: #000 solid 1px !important;
                                                    border-right: #000 solid 1px !important

                                                }
                                                .h5 {
                                                        font-size: 13px;
                                                        font-weight: 900;
                                                      }
                                                thead > tr > th {
                                                        font-size: 12px;
                                                      }
                                                td {
                                                        font-size: 10px;
                                                        text-align: center
                                                      }
                                                      .dt-center {
                                                          text-align: center
                                                      }
                                                      .dver-middle{
                                                          vertical-align: middle
                                                      }
                                                      #Ruang_kals {
                                                        position: absolute;
                                                        width: 155mm;
                                                        height: 200px;
                                                        z-index: 15;
                                                        left: 50%;
                                                        margin: -185px 0 0 -150px;
                                                        align-content: center;
                                                        text-align: center;
                                                      }
                                                    </style>`;



    win.document.write('<html><head>');
    win.document.write('<title>'+callback.Rename_TO_THIS+'</title>');
    win.document.write(stylish);
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write('<div id="Ruang_kals" style="font-size: 19px;"><p><u><strong >KONDISI RUANG KALIBRASI</strong></u><br>'+callback.Selector_Header_LABS+'</p></div>');

    win.document.write('<table id="tabele_print_suhu" cellspacing="0" >');
    win.document.write(Append_to_PRINT_SUHU);
    win.document.write('</table>');


    win.document.write('<table id="tabele_print_lembab" cellspacing="0" >');
    win.document.write(Append_to_PRINT_ERHA);
    win.document.write('</table>');


    win.document.write('</body></html>');

    // win.document.close();
    // win.print();
                                        }
                                    }


                                ],

                                aLengthMenu: [
                                    [10, 20, 50],
                                    [10, 20, 50]
                                ], // Combobox Limit



                            });


                        }

                    });

                    event.preventDefault();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();




$(document).ready(function() {

    //Animation init
    new WOW().init();




    //Mdb_select Init

    $('.mdb-select.validate').materialSelect({
        validate: true,
        labels: {
            validFeedback: 'Correct choice',
            invalidFeedback: 'Wrong choice'
        }
    });

    function validateSelect(e) {
        e.preventDefault();
        $('.needs-validation').addClass('was-validated');
        if ($('.needs-validation select').val() === null) {
            $('.needs-validation').find('.valid-feedback').hide();
            $('.needs-validation').find('.invalid-feedback').show();
            $('.needs-validation').find('.select-dropdown').val('').prop('placeholder', 'No countries selected')
        } else {
            $('.needs-validation').find('.valid-feedback').show();
            $('.needs-validation').find('.invalid-feedback').hide();
        }
    }
    $('.needs-validation select').on('change', e => validateSelect(e));
    $('.needs-validation').on('submit', e => validateSelect(e));


    // Date Picker Initialization
    $('.datepicker').pickadate();
    $('.datepicker').removeAttr('readonly');

    // Get the elements
    var from_input = $('#startingDate').pickadate(),
        from_picker = from_input.pickadate('picker')
    var to_input = $('#endingDate').pickadate(),
        to_picker = to_input.pickadate('picker')

    // Check if there’s a “from” or “to” date to start with and if so, set their appropriate properties.
    if (from_picker.get('value')) {
        to_picker.set('min', from_picker.get('select'))
    }
    if (to_picker.get('value')) {
        from_picker.set('max', to_picker.get('select'))
    }

    // Apply event listeners in case of setting new “from” / “to” limits to have them update on the other end. If ‘clear’ button is pressed, reset the value.
    from_picker.on('set', function(event) {
        if (event.select) {
            to_picker.set('min', from_picker.get('select'))
        } else if ('clear' in event) {
            to_picker.set('min', false)
        }
    })
    to_picker.on('set', function(event) {
        if (event.select) {
            from_picker.set('max', to_picker.get('select'))
        } else if ('clear' in event) {
            from_picker.set('max', false)
        }
    })






});




$('#centralModalSm').on('show.bs.modal', function(event) {
    $("html").css({
        "overflow-y": "hidden",
    });
    $('#app').css('filter', 'blur(10px)');
});

$("#centralModalSm").on("hide.bs.modal", function() {
    $('#app').css('filter', '');
    $("html").css({
        "overflow-y": "auto"
    });
});
