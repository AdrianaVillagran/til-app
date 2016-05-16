// global variables
var $bowList,
    bowTemplate,
    $newBowForm,
    $updateForm,
    date;




$(function(){

  //function to see if there is a user logged in
  $.ajax({
    method: 'GET',
    url: '/loggedin',
    success: function(json) {
      if(parseInt(json) !== 0) {
        // following functions change the homepage if the user is not logged in
        $('.signup').text('My Wisdom Profile');
        $('.signup').attr('href', '/profile');
        $('.login').text('Logout');
        $('.login').attr('href', '/logout');
      } else {
        $('#dropBead').attr("disabled", "disabled");
      }
    },
    error: function(err) {
      console.log("error checking for logged in user");
    }
  });

  //formats datetimepicker button on newBowForm
  $('#datetimepicker1').datetimepicker({
      format: 'MM-DD-YYYY'
  });

  // compiles Handlebars
  var bowSource = $('#wisdom-template').html();
  bowTemplate = Handlebars.compile(bowSource);
  $bowList = $('#beadsOfWisdom');

  $newBowForm = $('#addBow form');
  $updateForm = $('#beadsOfWisdom .update-form');

  //GET call for bows data - initial load
  $.ajax({
    method: 'GET',
    url: '/api/bows',
    success: renderBows,
    error: function (err) {
      console.log("There was an error getting bows:", err);
    }
  });


  //addBow click event
  $('#addBow').on('submit', addBowSubmit);

  // search by date form entry
  $('.search').on('click', searchByDate);

  // event listener for all beads button
  // have to reload page for now until I find a way to empty the $bowList after
  // searchByDate GET calls
  $('#allBeads').on('click', function(event) {
    location.reload();
  });

});
//end of document ready


//handles addBow POST call
function addBowSubmit(event) {
  event.preventDefault();
  var username = $('#username').val();
  var newBowInput = {  date: $('#date').val(),
                  username: username,
                  beadOfWisdom: $('#beadOfWisdom').val(),
                  topic: $('#topic').val(),
                  resourceUrl: $('#resourceUrl').val(),
                  description: $('#description').val()
                };
  console.log(newBowInput);
  $.ajax ({
    method: 'POST',
    url: "/api/users/" + username + "/bows",
    data: newBowInput,
    success: renderBow,
    error: function(err) {
      console.log("Oops, there was an error posting bow!",err);
    }
  });

  // resets addBow form
  $newBowForm[0].reset();
}

// handles event listener for search by date form entry
function searchByDate(event) {
  event.preventDefault();
  date = $('#search').val();
  $.ajax({
    method: 'GET',
    url: '/api/bows',
    success: renderBows,
    error: function (err) {
      console.log("There was an error getting bows:", err);
    }
  });

  $('#search-form')[0].reset();
  $bowList.empty();
}

// renders an array of bows
function renderBows(bows) {
  bows.forEach(function(bow) {
    renderBow(bow);
  });
}

// takes a single bow and renders it to the top of the page
function renderBow(bow) {
  var bowHtml = bowTemplate(bow);
  $bowList.prepend(bowHtml);
}
