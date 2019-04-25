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

var train , destination, frequency, departure, time, wait, firstTrain;



$('#submit').on('click', function(){
    train = $('#train-name').val();
    destination = $('#destination').val();
    frequency = $('#frequency').val();
    departure = $('#first-depart').val();
    firstTrain = $('#first-depart').val();

    time = moment().format('HH:mm');

    while (JSON.stringify(departure) < JSON.stringify(time)){
        departure = moment(departure,'HH:mm').add(frequency, 'minutes').format('HH:mm');
        
    };

    
    time = moment(time, "HH:mm");
    wait = moment(departure, 'HH:mm').diff(time, 'minutes');
    departure = moment(departure,'HH:mm').format('hh:mm a');



    database.ref().push({
        train: train,
        destination: destination,
        frequency: frequency,
        departure: firstTrain
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

    database.ref().on('child_added', function(snapshot){
        object = snapshot.val();
        console.log(object.train);
        
            var time = moment().format('HH:mm');
            var departure = object.departure;
        
            while (JSON.stringify(departure) < JSON.stringify(time)){
                departure = moment(departure,'HH:mm').add(object.frequency, 'minutes').format('HH:mm');
                
            };
        
            
            var time = moment(time, "HH:mm");
            var wait = moment(departure, 'HH:mm').diff(time, 'minutes');
            departure = moment(departure,'HH:mm').format('hh:mm a');
        
            $('tbody').append(`
            <tr>
                <td>${object.train}</td>
                <td>${object.destination}</td>
                <td>${object.frequency}</td>
                <td>${departure}</td>
                <td>${wait}</td>
            </tr>`);
            database.ref().off('child_added');
        
        });