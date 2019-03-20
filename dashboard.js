// Load the Visualization API and the corechart package, and call the callback when it's ready
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(retrieveData);

function retrieveData() {
    //var URL = 'https://docs.google.com/spreadsheets/d/1SL8zq3X1PtzaHFrc7JYZwvOJiQFANf17ygG_fyNHN0I/gviz/tq?gid=0';
    var URL = 'https://docs.google.com/spreadsheets/d/1OUxH9hFWjiCOqRBp1UZNViaNB9ZeF2SFr2Tk8TUxHuw/gviz/tq?gid=199509318';
    var query = 'SELECT D, G, H';  // letters must be capitalized
    getDataFromSheet(URL, query, handleOverallIncomeResponse);

}

function handleOverallIncomeResponse(response) {
    var data = response.getDataTable();

    var options = {
        title: 'Temperature/ Pressure',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    /*var options = {
        hAxis: {
            title: 'Time(In Seconds)'
        },
        vAxis: {
            title: 'Temperature'
        }
    };*/

    var chart = new google.visualization.LineChart(document.getElementById('divTemperature'));

    chart.draw(data, options);



}

function getDataFromSheet(URL, queryString, callback) {
    var query = new google.visualization.Query(URL);
    query.setQuery(queryString);
    query.send(gotResponse);

    function gotResponse(response) {
        if (response.isError()) {
            console.log(response.getReasons());
            alert('Error in query: ' + response.getMessage() + " " + response.getDetailedMessage());
            return;
        }
        if (response.hasWarning()) {
            console.log(response.getReasons());
            alert('Warning from query: ' + response.getMessage() + " " + response.getDetailedMessage());
            return;
        }
        callback(response);
    }
}

// Misc functions
Number.prototype.commaSeparated = function () {
    var n = this;
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function monthName(n) {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', "Jul", 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][n];
}
