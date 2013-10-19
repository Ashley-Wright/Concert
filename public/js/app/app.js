'use strict';

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#seatCreate').click(clickSeatCreate);
  $('#vip, #ga').on('dblclick', '.seat', clickSeat);

}

// -------------------------------------------------------------------- //

function clickSeat() {
  var $seat = $(this);
  if(!$seat.hasClass('reserved')){
    $seat.addClass('reserved');
    $seat.css('background-color', 'rgb(128, 0, 128)');
    var name = $('#seatName').val();
    var $p = $('<p>' + name + '</p>');
    $seat.append($p);
  }
}

function clickSeatCreate() {
  var section = $('#sections').val();
  var count = $('#seatCount').val();
  var pricePer = $('#seatCost').val();
  for(var i = 1; i <= count; i++) {
    var $seat = $('<div>');
    $seat.addClass('seat');
    $seat.text(section + i);
    $('#' + section).append($seat);
  }
  isSecondSection();
}

// -------------------------------------------------------------------- //

function isSecondSection(){
  if(($('#vip').children().length > 0) && ($('#ga').children().length > 0)){
    $('#sectionControls').remove();
  }
}


function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

// -------------------------------------------------------------------- //

function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

// -------------------------------------------------------------------- //
