$(function(){
    var _country =$('#country');
    var _continent=$('#continent');
    var addvalue =$('#addvalue');
    var  country =[
        {countryname :'France',continent:'Europe'}
    ];
    addvalue.click(
        ()=>{
            country.push({countryname:_country.val(),continent:_continent.val()});
            $('table').
            append('<tr><td>'+country[country.length-1].countryname+'</td><td>'+country[country.length-1].continent+'</td></tr>');
        }
    );
    $.each(
        country,(key,value)=>{
            $('ul').append(`<li>${country[key].name}</li>`);
            $('table').
            append('<tr><td>'+country[key].countryname+'</td><td>'+country[key].continent+'</td></tr>');
        }
    );

});