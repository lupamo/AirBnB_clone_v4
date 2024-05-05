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
