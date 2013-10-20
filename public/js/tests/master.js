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
  deepEqual($('#vip .seat:nth-child(5)').text(), 'v5', 'Should have text v5');
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
  deepEqual($('#vip .seat:first-child > p:nth-child(2)').text(), 'Bobby', 'Should have name Bobby');

  $('#seatName').val('Sally');
  $('#vip .seat:first-child').trigger('dblclick');

  deepEqual($('#vip .seat:first-child > p:nth-child(2)').text(), 'Bobby', 'Should have name Bobby');
});

test('Report test', function() {
  expect(6);

  $('#sections').val('vip');
  $('#seatCount').val('35');
  $('#seatCost').val('100');
  $('#seatCreate').trigger('click');

  $('#seatName').val('Bobby');
  $('#vip .seat:first-child').trigger('dblclick');

  $('#seatName').val('Sally');
  $('#vip .seat:nth-child(2)').trigger('dblclick');

  $('#seatName').val('Frank');
  $('#vip .seat:last-child').trigger('dblclick');

  deepEqual($('#vipPeople').text(), '3', 'should be 3 vip people');
  deepEqual($('#vipTotal').text(), '300.00', 'should be 300.00 vip total');

  $('#sections').val('ga');
  $('#seatCount').val('35');
  $('#seatCost').val('100');
  $('#seatCreate').trigger('click');

  $('#seatName').val('Bobby');
  $('#ga .seat:first-child').trigger('dblclick');

  $('#seatName').val('Sally');
  $('#ga .seat:nth-child(2)').trigger('dblclick');

  $('#seatName').val('Frank');
  $('#ga .seat:last-child').trigger('dblclick');

  deepEqual($('#gaPeople').text(), '3', 'should be 3 ga people');
  deepEqual($('#gaTotal').text(), '300.00', 'should be 300.00 ga total');
  deepEqual($('#totalPeople').text(), '6', 'should be 6 total people');
  deepEqual($('#grandTotal').text(), '600.00', 'should be 600.00 grand total');
});

test('Seating Chart Test', function() {
  expect(2);

  $('#sections').val('vip');
  $('#seatCount').val('35');
  $('#seatCost').val('100');
  $('#seatCreate').trigger('click');

  $('#seatName').val('Bobby');
  $('#vip .seat:first-child').trigger('dblclick');

  $('#seatName').val('Sally');
  $('#vip .seat:last-child').trigger('dblclick');

  deepEqual($('#vipSeating li').length, 2, 'should have 2 list items');

  $('#sections').val('ga');
  $('#seatCount').val('35');
  $('#seatCost').val('100');
  $('#seatCreate').trigger('click');

  $('#seatName').val('Bobby');
  $('#ga .seat:first-child').trigger('dblclick');

  $('#seatName').val('Sally');
  $('#ga .seat:last-child').trigger('dblclick');

  deepEqual($('#gaSeating li').length, 2, 'should have 2 list items');
});