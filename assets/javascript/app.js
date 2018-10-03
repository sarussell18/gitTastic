var topics = ["Led Zeppelin", "The Beatles", "Johnny Cash", "The Who", "Queen", "Pink Floyd", "Abba", "Spice Girls"];

createBandButtons();

$('#addBand').on('click', function() {
    var bandEntered = $('#bandInput').val().trim();
    topics.push(bandEntered);
    $('#bandInput').val('');
    createBandButtons();

    return false;
});

$(document.body).on('click', '.button-list', function() {

    var bandClicked = $(this).data('band');

    var query = 'https://api.giphy.com/v1/gifs/search?q=' + bandClicked + '&limit=10&api_key=dc6zaTOxFJmzC';

    $('#topics').empty();

    $.ajax({
        url: query,
        method: 'GET'
      
    }).done(function(response) {
       
        var results = response.data;

        
        for (i = 0; i < results.length; i++) {
           
            var newGif = $('<div class="col-sm-4">');
            var rating = results[i].rating.toUpperCase();
            var p = $('<p>').html('Rating: ' + rating);
       
            p.addClass('text-center');
           
            var img = $('<img>');

            img.attr('src', results[i].images.fixed_height_small_still.url);

            img.attr('data-still', results[i].images.fixed_height_small_still.url);
     
            img.attr('data-animate', results[i].images.fixed_height_small.url);
 
            img.attr('data-clicked', 'still');
         
            img.addClass('gif-margin gif center-block panel');

            newGif.append(p);

            newGif.append(img);

            $('#topics').append(newGif);
        }
    });
});

$(document.body).on('click', '.gif', function() {
    var click = $(this).attr('data-clicked');

    if (click === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-clicked', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-clicked', 'still');
    }
});

function createBandButtons() {
    $('#bandButtons').empty();

    for (var i = 0; i < topics.length; i++) {
        var button = $('<button>').addClass('btn btn-primary button-list');
        button.attr('data-band', topics[i]).html(topics[i]);
        $('#bandButtons').append(button);
    }
}