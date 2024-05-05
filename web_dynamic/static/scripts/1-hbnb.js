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
