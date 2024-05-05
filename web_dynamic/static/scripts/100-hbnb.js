$(document).ready(function() {
    const amenitiesSelected = [];
    const statesSelected = [];
    const citiesSelected = [];

    function updateSelectedLocations() {
        const locationsDiv = $('#locations');
        locationsDiv.empty();
        locationsDiv.append('<h4>Selected Locations:</h4>');
        locationsDiv.append('<ul id="selected-locations"></ul>');

        const selectedLocations = [...statesSelected, ...citiesSelected];
        selectedLocations.forEach(location => {
            $('#selected-locations').append('<li>' + location + '</li>');
        });
    }

    $('input[name="state"], input[name="city"]').change(function() {
        const locationId = $(this).data('id');
        const locationName = $(this).data('name');

        if ($(this).is(':checked')) {
            if ($(this).attr('name') === 'state') {
                statesSelected.push(locationName);
            } else if ($(this).attr('name') === 'city') {
                citiesSelected.push(locationName);
            }
        } else {
            if ($(this).attr('name') === 'state') {
                statesSelected = statesSelected.filter(location => location !== locationName);
            } else if ($(this).attr('name') === 'city') {
                citiesSelected = citiesSelected.filter(location => location !== locationName);
            }
        }

        updateSelectedLocations();
    });

    $('input[name="amenity"]').change(function() {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            amenitiesSelected.push({ id: amenityId, name: amenityName });
        } else {
            amenitiesSelected = amenitiesSelected.filter(amenity => amenity.id !== amenityId);
        }
    });

    function fetchPlacesByCriteria() {
        const searchCriteria = {
            amenities: amenitiesSelected.map(amenity => amenity.id),
            states: statesSelected,
            cities: citiesSelected
        };

        const data = JSON.stringify(searchCriteria);

        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            type: 'POST',
            contentType: 'application/json',
            data: data,
            success: function(places) {
                displayPlaces(places);
            },
            error: function(err) {
                console.error('Request failed', err);
            }
        });
    }

    $('#my-button-id').click(function() {
        fetchPlacesByCriteria();
    });
});
