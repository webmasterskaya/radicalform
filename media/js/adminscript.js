jQuery(document).ready(function () {
    jQuery(function ($) {

        document.querySelector("#historyclear").addEventListener('click', function (event) {
            $("#historyclear").html("Wait...")
                .prop('disabled', true);
            $.getJSON("index.php?option=com_ajax&plugin=radicalform&format=json&group=system&admin=2", function (data) {
                location.reload();
            });

            event.preventDefault();
        });

        document.querySelector("#numberclear").addEventListener('click', function (event) {
            $("#numberclear").html("Wait...")
                .prop('disabled', true);
            $.getJSON("index.php?option=com_ajax&plugin=radicalform&format=json&group=system&admin=3", function (data) {
                location.reload();
            });
            event.preventDefault();
        });

        document.querySelector("#exportcsv").addEventListener('click', function (event) {
            var t=document.querySelector("#exportcsv");
            var temp=t.outerHTML;
            t.outerHTML="<button class='btn' id='exportcsv' disabled>Wait...</button>";

            setTimeout(function () {
                document.querySelector("#exportcsv").outerHTML=temp;
            }, 3000)
        });



//show the info about need to save parameters
        [].forEach.call(document.querySelectorAll('#attrib-list label.btn'), function (el) {
            el.addEventListener('click',function (e) {
                if(!document.querySelector("#attrib-list .alert.alert-info.hidden")) return;
                document.querySelector("#attrib-list .alert.alert-info.hidden").classList.remove("hidden");
            });
        });


        $("#radicalformcheck").on("click", function (event) {
            var temp=$("#radicalformcheck").html();
            $("#radicalformcheck").html("Wait...")
                                  .prop('disabled', true);

            $.getJSON("index.php?option=com_ajax&plugin=radicalform&format=json&group=system&admin=1", function (data) {
                var output=data.data[0];
                for(var i=0;i<output.length;i++) {
                    var found=false;
                    $("#attrib-advanced .adminlist.table tr td:first-child input").each(function () {

                        if($(this).val()==output[i].chatID) {
                            found=true;
                        }
                    });
                    if(!found) {
                        $("#attrib-advanced th a:first").trigger("click");
                        $("#attrib-advanced .adminlist.table tr:last-child input:eq(1)").val(output[i].name);
                        $("#attrib-advanced .adminlist.table tr:last-child input:first").val(output[i].chatID);
                    }
                }
                $("#radicalformcheck").html(temp)
                    .prop('disabled', false);

            });

            event.preventDefault();
        });

    });
});

