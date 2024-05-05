$(document).ready(function () {
	const amenitiesSelected = [];
  
	$('input[name="amenity"]').change(function () {
	  const amenityId = $(this).data('id');
	  const amenityName = $(this).data('name');
  
	  if ($(this).is(':checked')) {
		amenitiesSelected.push({ id: amenityId, name: amenityName });
	  } else {
		amenitiesSelected = amenitiesSelected.filter(function (amenity) {
		  return amenity.id !== amenityId;
		});
	  }
	  $('#selected-amenities').empty();
	  amenitiesSelected.forEach(function (amenity) {
		$('#selected-amenities').append('<li>' + amenity.name + '</li>');
	  });
	});
  });


$(document).ready(function() {
	function checkApiStatus() {
		$.ajax({
			url: 'http://0.0.0.0:5001/api/v1/status/',
			type: 'GET',
			success: function(resp) {
				if (resp.status == 'OK') {
					$('#api_status').addClass('available');
				} else {
					$('#api_status').removeClass('available');
				}
			},
			error: function(err) {
				console.error('Error checking Api status', err);
				$('#api_status').removeClass('available');
			}
		});
	}
	checkApiStatus();
});

document.addEventListener('DOMContentLoaded', function() {
    function fetchPlaces(searchCriteria) {
        const data = JSON.stringify(searchCriteria);

        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'http://0.0.0.0:5001/api/v1/places_search', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {
            if (xhr.status === 200) {
                const places = JSON.parse(xhr.responseText);

                displayPlaces(places);
            } else {
                console.error('Request failed. Returned status of ' + xhr.status);
            }
        };

        xhr.send(data);
    }

    function displayPlaces(places) {
        const section = document.querySelector('.places');
        section.innerHTML = '';

        places.forEach(place => {
            const article = document.createElement('article');
            article.innerHTML = `
                <h2>${place.name}</h2>
                <p>${place.description}</p>
                <p>${place.price_by_night}</p>
                <p>${place.number_rooms}</p>
                <p>${place.number_bathrooms}</p>
                <p>${place.max_guest}</p>
            `;
            section.appendChild(article);
        });
    }

    $('#my-button-id').click(function() {
      const amenities = $('input[name="amenity"]:checked').map(function() {
          return $(this).val()
      }).get();

      fetchPlacesByAmenities(amenities);
    });

});
