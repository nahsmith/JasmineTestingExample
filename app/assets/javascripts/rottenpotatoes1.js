    RP1 = {
        setup: function() {
            // construct new DOM elements
            $('<label for="filter" class="explanation">' +
              'Restrict to movies suitable for children' +
              '</label>' +
              '<input type="checkbox" id="filter"/>'
             ).insertBefore('#movies').change(RP1.filter_adult);
        },
        filter_adult: function () {
            // 'this' is element that received event (checkbox)
            if ($(this).is(':checked')) {
                $('#movies tbody tr').each(RP1.hide_if_adult_row);
            } else {
                $('#movies tbody tr').show();
            };
        },
        hide_if_adult_row: function() {
            if (! /^G|PG$/i.test($(this).find('td:nth-child(2)').text())) {
             $(this).hide();
            }
        }
    }
    $(RP1.setup);       // when document ready, run setup code

