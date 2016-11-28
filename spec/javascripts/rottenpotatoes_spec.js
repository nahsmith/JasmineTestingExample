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
//    beforeEach(function() { loadFixtures('movie_row.html'); });
    beforeEach(function() {setFixtures(
      '<table id="movies">'+
       '<tbody>'+
         '<tr>'+
           '<td>Aladdin</td>'+
           '<td>G</td>'+
           '<td><a href="/movies/1">More about Alladin</a></td>'+
         '</tr>'+
      '</tbody>'+
     '</table>')});
    it('calls correct URL', function() {
      spyOn($, 'ajax');
      $('#movies a').trigger('click');
      expect($.ajax.calls.mostRecent().args[0]['url']).toEqual('/movies/1');
    });
    describe('when successful server call', function() {
      beforeEach(function() {
  //      var jsonResponse = getJSONFixture('movie_info.json');
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
