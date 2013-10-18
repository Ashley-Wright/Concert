'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){
}

test('Create seat test', function(){
  expect(2);

  $('#sections').val('vip');
  $('#seatCount').val('35');
  $('#seatCost').val('100');
  $('#seatCreate').trigger('click');

  deepEqual($('#vip .seat').length, 35, 'Should equal 35');
  deepEqual($('#vip .seat:nth-child(5)').text(), '5', 'Should have text 5');
});
