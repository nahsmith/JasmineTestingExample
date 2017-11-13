//=require jquery
//=require jasmine-jquery

describe('MoviePopup', function() {
  describe('setup', function() {
    it('adds popup Div to main page', function() {
      expect($('#movieInfo')).toExist();
    });
    it('hides the popup Div', function() {
      expect($('#movieInfo')).toBeHidden();
    });
  });
  describe('clicking on movie link', function() {
  // Can't get fixture loading to work.  Must be a path problem  
 //  beforeEach(function() {loadFixtures('movie_row.html')})
 // The fixture is set after page load.  Hence Javascript Setup
 // has already run.  SO the handler will not be properly attached
 //to the a element.
   beforeEach(function() {setFixtures(
      '<table id="movies">'+
       '<tbody>'+
         '<tr>'+
           '<td>Aladdin</td>'+
           '<td>G</td>'+
           '<td><a href="/movies/1">More about Alladin</a></td>'+
         '</tr>'+
       '</tbody>'+
      '</table>')
    });
 /*   
 //  Notice that if we explicitly add javascript to the fixture
 // to attach the handler,the tests will pass
    beforeEach(function() {setFixtures(
      '<table id="movies">'+
       '<tbody>'+
         '<tr>'+
           '<td>Aladdin</td>'+
           '<td>G</td>'+
           '<td><a href="/movies/1">More about Alladin</a></td>'+
         '</tr>'+
       '</tbody>'+
      '</table>'+
     '<script>'+
        "$('#movies a').click(RP.getMovieInfo)"+
     '</script>')
    });
 */   
    it('calls correct URL', function() {
      spyOn($, 'ajax');
      $('#movies a').trigger('click');
     expect($.ajax.calls.mostRecent().args[0]['url']).toEqual('/movies/1');
    });
    
    describe('when successful server call', function() {
      beforeEach(function() {
        var jsonResponse= {"id":1,"title":"Aladdin","rating":"G",
                          "description":null,"release_date":"1992-11-25T00:00:00.000Z",
                          "created_at":"2016-10-28T16:03:45.429Z",
                          "updated_at":"2016-10-28T16:03:45.429Z"};
        spyOn($, 'ajax').and.callFake(function(ajaxArgs) { 
          ajaxArgs.success(jsonResponse, '200');
        });
        $('#movies a').trigger('click');
      });
      it('makes #movieInfo visible', function() {
        expect($('#movieInfo')).toBeVisible();
      });
      it('places movie title in #movieInfo', function() {
        expect($('#movieInfo').text()).toContain('Aladdin');
      });
    });
  });
});
