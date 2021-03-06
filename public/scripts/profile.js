
// global variables
var $bowList,
    bowTemplate,
    $newBowForm,
    $updateForm,
    username;


// DOCUMENT READY
$(function(){

  $('#datetimepicker1').datetimepicker({
      format: 'MM-DD-YYYY'
  });

  // compiles Handlebars
  var bowSource = $('#wisdom-template').html();
  $bowList = $('#beadsOfWisdom');
  bowTemplate = Handlebars.compile(bowSource);

  $newBowForm = $('#addBow form');
  $updateForm = $('#beadsOfWisdom .update-form');

  //GET call for bows data
  $.ajax({
    method: 'GET',
    url: '/api/me',
    success: function getUserData(user) {
      username = user.username;
      $('#welcomeMessage').text('Welcome, ' + username + '!');
      $.ajax({
        method: 'GET',
        url: '/api/users/' + username + '/bows',
        success: handleBowSuccess,
        error: function (err) {
          console.log("There was an error getting bows:", err);
        }
      });
    },
    error: function handleUserError(err) {
      console.log(err);
    }
  });


  //addBow click event
  $('#addBow').on('submit', addBowSubmit);

  //delete bow click event
  $bowList.on('click', '.delete-bow', deleteBow);

  // update bow click event
  $bowList.on('click', '.edit-bow', updateBow);

  $('.search').on('click', searchByDate);

});


//handles addBow POST call
function addBowSubmit(event) {
  event.preventDefault();

  //hard-coding userId until I find a way to isolate it
  var newBow = {
                  date: $('#date').val(),
                  username: $('#username').val(),
                  beadOfWisdom: $('#beadOfWisdom').val(),
                  topic: $('#topic').val(),
                  resourceUrl: $('#resourceUrl').val(),
                  description: $('#description').val()
                };

  $.ajax ({
    method: 'POST',
    url: "/api/users/" + username + "/bows",
    data: newBow,
    success: renderBow,
    error: function(err) {
      console.log("Oops, there was an error posting bow!",err);
    }
  });

  // resets addBow form
  $newBowForm[0].reset();
}

//handles bow GET success
function handleBowSuccess(bows) {
    $bowList.empty();
    bows.forEach(function(bow) {
      console.log("We've successfully handledBowSuccess!!!");
      renderBow(bow);
    });
}

// takes a single bow and renders it to the top of the page
function renderBow(bow) {
  var bowHtml = bowTemplate(bow);
  $bowList.prepend(bowHtml);
}

//handles Deleted bow success
function deleteBow(event){
  event.preventDefault();

  var bowId = $(this).closest('.bow').data('bow-id');

  /* TODO: Typically we'd like to remove data once we know we've been successful.
  Consider moving this removal down into your success function for your ajax Delete -jc */

  $('div[data-bow-id=' + bowId + ']').remove();

  $.ajax ({
    method: 'DELETE',
    url: '/api/users/' + username + '/bows/' + bowId,
    success: function(json) {
      console.log("bow successfully deleted");
    },
    error: function(err) {
      console.log("the bow was not successfully deleted", err);
    }
  });
}

//handles update bow success
function updateBow(event) {
  event.preventDefault();
  var bowId = $(this).closest('.bow').data('bow-id');
  console.log(bowId);

  var updateInput = $('#update-' + bowId + " form").serialize();
  $.ajax({
    method:'PUT',
    url: '/api/users/' + username + '/bows/' + bowId,
    data: updateInput,
    success: handleUpdatedBow,
    error: function(err) { console.log('there was an error updating bow', err); }
  });
  //$('#update-' + bowId + " form")[0].reset();

}

//renders updated bow to view
function handleUpdatedBow(json) {
  var bowId = json._id;
  // removes bow from the page
  $('[data-bow-id=' + bowId + ']').remove();
  // re-renders it with most current data
  renderBow(json);
}

// handles search by date query and requests bows by date
function searchByDate(event) {
  event.preventDefault();
  var date = $('#search').val();

  /* TODO: At this point you should consider converting this ajax request to a query
  by attaching 'search/?date=' to the front of your date variable. You can access this
  on the server side with req.query and use it to filter out your matches.
  I understand your methodology here.  Computers are just too easily confused. */

  $.ajax({
    method: 'GET',
    url: '/api/users/' + username + '/bows/' + date,
    success: handleBowSuccess,
    error: function (err) {
      console.log(err);
    }
  });
  $('#search-form')[0].reset();
}
