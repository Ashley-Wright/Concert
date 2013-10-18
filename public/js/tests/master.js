'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){
}

test('Create seat test', function(){
  expect(1);

  $('#sections').val('vip');
  $('#seatNumber').val('35');
  $('#seatCost').val('100');
  $('#seatCreate').trigger('click');

  deepEqual($('#vip .seat').length, 35, 'Should equal 35');

});
