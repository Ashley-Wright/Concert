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
  deepEqual($('#vip .seat:nth-child(5)').text(), 'vip5', 'Should have text vip5');
});

test('Hide Section Controls', function(){
  expect(2);

  $('#sections').val('vip');
  $('#seatCount').val('35');
  $('#seatCost').val('100');
  $('#seatCreate').trigger('click');

  deepEqual($('#sectionControls').length, 1, 'should be 2 rows');

  $('#sections').val('ga');
  $('#seatCount').val('70');
  $('#seatCost').val('50');
  $('#seatCreate').trigger('click');

  deepEqual($('#sectionControls').length, 0, 'should be 0 rows');
});

test('Reserve Seat Test', function() {
  expect(4);

  $('#sections').val('vip');
  $('#seatCount').val('35');
  $('#seatCost').val('100');
  $('#seatCreate').trigger('click');

  $('#seatName').val('Bobby');
  $('#vip .seat:first-child').trigger('dblclick');

  deepEqual($('#vip .seat:first-child').css('background-color'), 'rgb(128, 0, 128)', 'Should have color purple');
  ok($('#vip .seat:first-child').hasClass('reserved'), 'Should have class reserved');
  deepEqual($('#vip .seat:first-child > p').text(), 'Bobby', 'Should have name Bobby');

  $('#seatName').val('Sally');
  $('#vip .seat:first-child').trigger('dblclick');

  deepEqual($('#vip .seat:first-child > p').text(), 'Bobby', 'Should have name Bobby');
});
