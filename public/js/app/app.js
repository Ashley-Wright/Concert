'use strict';

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#seatCreate').click(clickSeatCreate);
}

// -------------------------------------------------------------------- //

function clickSeatCreate() {
  var section = $('#sections').val();
  var count = $('#seatCount').val();
  var pricePer = $('#seatCost').val();
  for(var i = 1; i <= count; i++) {
    var $seat = $('<div>');
    $seat.addClass('seat');
    $seat.text(i);
    $('#' + section).append($seat);
  }
}

// -------------------------------------------------------------------- //

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
