'use strict';

var pricePer = {};

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
    if(name == '') {
      name = 'Reserved';
    }
    var $p = $('<p>' + name + '</p>');
    $seat.append($p);
  }
  htmlUpdateSeating();
  htmlUpdateReport();

  $('#seatName').val('');
  $('#seatName').focus();
}

function clickSeatCreate() {
  var section = $('#sections').val();
  var count = $('#seatCount').val();
  pricePer[section] = $('#seatCost').val();
  for(var i = 1; i <= count; i++) {
    var $seat = $('<div>');
    $seat.addClass('seat');
    var $p = $('<p>');
    $p.text(parseUpperCase(section[0]) + '-' + i);
    $seat.append($p);
    $('#' + section).append($seat);
  }
  isSecondSection();
  $('#seatName').focus();
}

// -------------------------------------------------------------------- //

function isSecondSection(){
  if(($('#vip').children().length > 0) && ($('#ga').children().length > 0)){
    $('#sectionControls').remove();
  }
}

function htmlUpdateReport(){
  var vipPeople = $('#vip .reserved').length;
  var vipTotal = parseFloat(pricePer.vip * vipPeople);
  var gaPeople = $('#ga .reserved').length;
  var gaTotal = parseFloat(pricePer.ga * gaPeople);
  if(vipPeople){
    $('#vipPeople').text(vipPeople);
    $('#vipTotal').text(vipTotal.toFixed(2));
  } else {
    vipPeople = 0;
    vipTotal = 0;
  }
  if(gaPeople){
    $('#gaPeople').text(gaPeople);
    $('#gaTotal').text(gaTotal.toFixed(2));
  } else {
    gaPeople = 0;
    gaTotal = 0;
  }
  var totalPeople = vipPeople + gaPeople;
  var grandTotal = vipTotal + gaTotal;
  $('#totalPeople').text(totalPeople);
  $('#grandTotal').text(grandTotal.toFixed(2));
}

function htmlUpdateSeating(){
  var $vipReserved = $('#vip .reserved');
  $('#vipSeating').empty();
  for(var i = 0; i < $vipReserved.length; i++){
    var $vipli = $('<li>');
    var $vipSeat = $('<span>');
    var vipSeat = $($vipReserved[i]).children('p:nth-child(1)').text();
    $vipSeat.text(vipSeat);
    var $vipName = $('<span>');
    var vipName = $($vipReserved[i]).children('p:nth-child(2)').text();
    $vipName.text(vipName);
    $vipli.append($vipSeat, $vipName);
    $('#vipSeating').append($vipli);
  }

  var $gaReserved = $('#ga .reserved');
  $('#gaSeating').empty();
  for(i = 0; i < $gaReserved.length; i++){
    var $gali = $('<li>');
    var $gaSeat = $('<span>');
    var gaSeat = $($gaReserved[i]).children('p:nth-child(1)').text();
    $gaSeat.text(gaSeat);
    var $gaName = $('<span>');
    var gaName = $($gaReserved[i]).children('p:nth-child(2)').text();
    $gaName.text(gaName);
    $gali.append($gaSeat, $gaName);
    $('#gaSeating').append($gali);
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
