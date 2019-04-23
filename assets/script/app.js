// Initialize Firebase
var config = {
    apiKey: "AIzaSyDs9eLLRbzD3ZJ50zp3f6JzfHkCsA2P-EY",
    authDomain: "fir-test-94682.firebaseapp.com",
    databaseURL: "https://fir-test-94682.firebaseio.com",
    projectId: "fir-test-94682",
    storageBucket: "fir-test-94682.appspot.com",
    messagingSenderId: "845128325533"
};

firebase.initializeApp(config);

var database = firebase.database();

var train , destination, frequency, departure, time, wait;




$('#submit').on('click', function(){
    train = $('#train-name').val();
    destination = $('#destination').val();
    frequency = $('#frequency').val();
    departure = $('#first-depart').val();

    time = moment().format('HH:mm');
    console.log(time);

    while (JSON.stringify(departure) < JSON.stringify(time)){
        departure = moment(departure,'HH:mm').add(frequency, 'minutes').format('HH:mm');
        console.log(departure);
        
    };

    departure = moment(departure,'HH:mm').format('hh:mm');
    console.log(departure);
    wait = moment(time, 'hh:mm').diff(departure, 'm');
    console.log(wait);



    database.ref().push({
        train: train,
        destination: destination,
        frequency: frequency,
        departure: departure
    });

    $('tbody').append(`
        <tr>
            <td>${train}</td>
            <td>${destination}</td>
            <td>${frequency}</td>
            <td>${departure}</td>
            <td>${wait}</td>
        </tr>`);
});