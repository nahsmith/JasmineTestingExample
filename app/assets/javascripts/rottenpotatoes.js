    RP = {
        setup: function() {
            // add invisible 'div' to end of page:
            $('<div id="movieInfo"></div>').
                hide().
                appendTo($('body'));
            $('#movies a').click(RP.getMovieInfo);
        },
        getMovieInfo: function() {
            $.ajax({type: 'GET',
            dataType: 'json',
            url: $(this).attr('href'),
            timeout: 5000,
            success: RP.showMovieInfo,
            error: function() { alert('Error!'); }
           });
           return(false);
        },
        showMovieInfo: function(jsonData, requestStatus, xhrObject) {
           // center a floater 1/2 as wide and 1/4 as tall as screen
          var oneFourth = Math.ceil($(window).width() / 4);
          $('#movieInfo').
          css({'left': oneFourth,  'width': 2*oneFourth, 'top': 250}).
            html( '<h2>Details about ' + jsonData.title + '</h2>' +
                '<ul>'+
                   '<li> Rating: ' + jsonData.rating + '</li>' +
                   '<li> Release Date: ' + jsonData.release_date + '</li>' +
                   '<li> Description: ' + jsonData.description + '</li>' +
                '</ul>' + 
             '<a id="closeLink" href=""> Close</a>').
          show();
          // make the Close link in the hidden element work
          $('#closeLink').click(RP.hideMovieInfo);
         return(false);  // prevent default link action
       },
       hideMovieInfo: function() {
           $('#movieInfo').hide();
           return(false);
       }
    }
    $(RP.setup);
