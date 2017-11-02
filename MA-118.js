/**
 * MA-118
 * Loads one of three loan provider widgets to guage which is the most succesful.
 * To be loaded in place.
 */
(function () {
    // Asynchronously get a script with callback, requires a head.
    function getScript (source, callback) {
        var script = document.createElement('script');
        document.head = document.head || document.getElementsByTagName('head')[0];
        script.async = 1;
        script.type = 'text/javascript';
        script.onload = script.onreadystatechange = function (_, isAbort) {
            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                script.onload = script.onreadystatechange = null;
                script = undefined;
                if (!isAbort) {
                    if (callback) {
                        callback();
                    }
                }
            }
        };
        script.src = source;
        document.head.appendChild(script);
    }

    // Deploy the nextinsure ratings widget.
    function nextinsure () {
        function getQueryStringVariable (variable) {
            var query = window.location.search.substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
        }

        window.ni_ad_client = 580013;
        window.ni_zc = getQueryStringVariable('zipcode');
        window.ni_str_state_code = getQueryStringVariable('statecode');
        window.ni_rp = getQueryStringVariable('rp');
        window.ni_loanamt = getQueryStringVariable('la');
        window.ni_deflv = 2;
        window.ni_var1 = '';
        window.ni_display_width = 400;
        window.ni_display_height = 1000;

        // Property Type Default
        window.ni_proptype = 1;
        // Loan Balance Default
        window.ni_loanbal = 75000;
        // Second Loan Balance Default
        window.ni_sloanbal = 35000;
        // Cashout Default
        window.ni_cashout = 35000;
        // Property Usage Default
        window.ni_propuse = 1;
        // Va Loan Default
        window.ni_vet = 1;
        // FHA Loan default
        window.ni_fha = 1;
        // Lock Period Default
        window.ni_lock = 1;
        // Credit Score Default
        window.ni_creditfico = 675;
        // Property Value Default
        window.ni_propval = 325000;

        // Unfortunately because this script uses document.write so must we... This is prone to failure in the future.
        document.write('<script type="text/javascript" src="https://www.nextinsure.com/ListingDisplay/Retrieve/?cat=10&src=580013"><\/script>');
    }

    // Display the bankrate ratings widget.
    function bankrate () {
        document.write('<div class="bankrateWidget" app="ratetables" kind="tabbed" template="standard" pkey="xirxv2jk9e" pid="bstrr" tabs="mortgage" rowsperpage="10" fontfamily="Overpass" mtgheadertext="Current Mortgage Rates" mtgloanamount="$200,000" mtgdefaultloantype="refinance"></div>');
        getScript('https://widgets.bankrate.com/booter.js');
    }

    // Deploy the fcmrktplace ratings widget.
    function fcmrktplace () {
        document.write('<div id="clicksnet_listing_1"></div>');
        // Note, 404s WILL occur due to an issue with these scripts :(
        getScript('https://ads.fcmrktplace.com/scripts/clicksnet.js', function () {
            getScript('https://ads.fcmrktplace.com/scripts/clicksnet_mortgage.js', function () {
                // Standard code below
                var affcid = '1074631';
                var key = 'OeG7gicNJPY1';
                var zip = clicksNetGetQueryStringParam('zip');
                //            Parameter for Credit Rating
                var clicksnet_credit_rating = clicksNetGetQueryStringParam('clicksnet_credit_rating');
                //            Parameter for Loan Amount
                var clicksnet_loan_range = clicksNetGetQueryStringParam('clicksnet_loan_range');
                //            Parameter for Loan Type and Term
                var clicksnet_loan_type_term = clicksNetGetQueryStringParam('clicksnet_loan_type_term');
                //            Subids are used to track conversions and traffic
                var subid1 = '';
                //            Subids are used to track conversions and traffic
                var subid2 = '';
                // Optional Query Parameters:
                //            showHeader=[true||false] -> will show or hide header (Default: true)
                //            showWidget=[true||false] -> will show or hide the subWidget filter bar (Default: true)
                //            showFooter=[true||false] -> will show or hide footer (Default: true)
                var showHeader = false;
                var showWidget = false;
                var showFooter = false;

                // Purpose: base script query
                var baseQuery = clicksNetGetProtocol() + 'ads.fcmrktplace.com/listing/?affcamid=' + affcid + '&key=' + key + '&subid1=' + subid1 + '&subid2=' + subid2;
                // Purpose: script to fetch listings
                // Filter Query Parameters:
                //            clicksnet_credit_rating: (eg.) Excellent (720 or Above), Good (620 - 719), Fair (580 - 619), Poor (579 or Below)
                //            clicksnet_loan_range: loan amount (eg.) $70,001 - $80,000
                //            clicksnet_loan_type_term: Loan Type + Rate Type (eg.) Purchase - FHA Rate - 30 Year
                var clicksnet_script_src = baseQuery + '&zip=' + zip + '&clicksnet_credit_rating=' + clicksnet_credit_rating + '&clicksnet_loan_range=' + clicksnet_loan_range + '&clicksnet_loan_type_term=' + clicksnet_loan_type_term + '&showHeader=' + showHeader + '&showWidget=' + showWidget + '&showFooter=' + showFooter;
                // Purpose: Execute scripts and fetch relevant listings
                (function fetchListings () {
                    var clicksnet_script_src_obj = {
                        baseQuery: baseQuery,
                        zip: zip,
                        clicksnet_credit_rating: clicksnet_credit_rating,
                        clicksnet_loan_range: clicksnet_loan_range,
                        clicksnet_loan_type_term: clicksnet_loan_type_term
                    };

                    function clicksnet_callback () {
                        clicksnet_listing.innerHTML = stripAndExecuteScript(clicksnet_listing_content.content), 'undefined' != typeof clicksnet_sub_widget && clicksnet_sub_widget.init_clicksnet_sw(clicksnet_script_src_obj), clicksNetAddExpandButtonListeners();
                    }

                    var clicksnet_listing_count = clicksnet_listing_count || 0;
                    clicksnet_listing_count += 1;
                    var clicksnet_listing_id = 'clicksnet_listing_' + clicksnet_listing_count;
                    // Leaving out this line prevents this script from consuming the dom.
                    // document.write('<div id="' + clicksnet_listing_id + '"></div>');
                    var clicksnet_script = document.createElement('script');
                    clicksnet_script.type = 'text/javascript', clicksnet_script.async = !0, clicksnet_script.src = clicksnet_script_src + '&gh=true&ghs=true', clicksnet_script.addEventListener ? clicksnet_script.addEventListener('load', clicksnet_callback, !1) : clicksnet_script.readyState && (clicksnet_script.onreadystatechange = function () {
                        ('loaded' == clicksnet_script.readyState || 'complete' == clicksnet_script.readyState) && clicksnet_callback();
                    });
                    var clicksnet_listing = document.getElementById(clicksnet_listing_id);
                    clicksnet_listing.appendChild(clicksnet_script);
                })();
            });
        });
    }

    // Inclusively get a random number in range.
    function getRandomIntInclusive (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    // Split the traffic 3 ways.
    switch (getRandomIntInclusive(1, 3)) {
        case 1:
            fcmrktplace();
            break;
        case 2:
            nextinsure();
            break;
        case 3:
            bankrate();
            break;
    }
})();
