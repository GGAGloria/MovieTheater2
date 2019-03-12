
// Add Commodity button click
$('#submit').on('click', showseat);


function showseat(event) {
  event.preventDefault();
  
    var broadcast = $('#broadcast').val();
    var data = {"broadcast": broadcast};
    $.getJSON('/seat', function (data) {
        var section = document.getquerySelector('section');
        section.innerHTML = "";
        var FilmName = data.Film.FilmName;
        var HouseId = data.Film.HouseId;
        var Category = data.Film.Category;
        var showtime = data.Film.Dates+data.Film.day+data.Film.Time;
        var myInfo = document.createElement('div');
        myInfo.setAttribute("class","information");
        var s = "<p> Cinema:  Elvia's Cinema </p>"; 
        myInfo.innerHTML += s;
        s = "<p> House:  "+HouseId+" </p>";
        myInfo.innerHTML += s;
        s = "<p> Film:  "+FilmName+" </p>";
        myInfo.innerHTML += s;
        s = "<p> Category:  "+Category+" </p>";
        myInfo.innerHTML += s;
        s = "<p> Show Time:  "+showtime+" </p>";
        myInfo.innerHTML += s;
        section.appendChild(myInfo);
        var myOuter = document.createElement('div');
        var myButton = document.createElement('div');
        var f = document.createElement('form');
        f.setAttribute('method',"post");
        f.setAttribute('action',"/buyticket");
        f.setAttribute('name',"seats");
        var t = document.createElement('table');
        t.setAttribute("border",'4');
        t.setAttribute("class", "seats");
        //table for seats
        f.appendChild(t);
        var submit = document.createElement('button');
        submit.setAttribute("type","submit");
        submit.innerHTML = "SUbmit";
        var cancel = document.createElement('button');
        cancel.setAttribute("type","button");
        cancel.setAttribute("onclick", "window.location=\'buywelcome.php\';return false;");
        cancel.innerHTML = "cancel";
        myButton.appendChild(submit);
        myButton.appendChild(cancel);
        myOuter.appendChild(myButton);
        f.appendChild(myOuter);
        section.appendChild(f);
    });
};

