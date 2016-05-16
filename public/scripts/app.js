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


// // handles all bows by all users GET success. result of GET request is an
// //array of bow arrays by all users
// function handleBowSuccess(bows) {
//   bows.forEach(function(bow) {
//     renderBow(bow);
//   });
// }

// function to sort through and call function to handle array of bow arrays that
// comes back when search by date entry is submitted
/* TODO: The name of this array, bows, is misleading. This array is an array of your users, correct? Consider changing the name of this parameter. It'll make the code easier to read by other devs. -jc */
// function handleBowDateSuccess(bows) {
//     //filters through array of bow arrays
//     /* TODO: Careful, this doesn't filter. This iterates through your bows array and calls a function on them.  Please consider turning this into a bows.forEach function. -jc */
//     console.log("HANLDING BOW SUCCESS", bows);
//     for(var i = 0; i<bows.length; i++) {
//       console.log("HANLDING BOW SUCCESS INDIVIDUAL", bows[i]);
//       sortBowsByDate(bows[i]);
//     }
// }

// sorts through bows to find those that match by  date and calls function to
// render bows based on how many bows there are
// function sortBowsByDate(bows) {
//   /* TODO: Consider using a .forEach loop here. -jc */
//   /* TODO: Depening on a global date value is a bit risky, could you make it more narrowly scoped by adding a date parameter? -jc */
//   console.log("SORTING BOWS: ", bows)
//   for(var i = 0; i<bows.length; i++) {
//     console.log(i + ". " , bows[i]);
//     if(bows[i].date === date) {
//       if(bows[i].length > 1) {
//         sortAndRenderBows(bows[i]);
//       } else {
//         renderBow(bows[i]);
//       }
//     }
//   }
// }


// /* TODO: This function is never called. Please remove. -jc */
// function clearBows() {
//   $bowlist.empty();
// }
