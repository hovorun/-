var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var path = require('path');
var counter = 0;
var __pathA = 'C:\\Users\\_hovorun\\WebstormProjects\\server\\A';
var __pathB = 'C:\\Users\\_hovorun\\WebstormProjects\\server\\B';
var server = http.createServer( function(req, res) {
    path.basename('C:\\Users\\_hovorun\\WebstormProjects\\server\\A');
    var time = new Date();
    var nameOfFile = time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear() +
    '.' + time.getHours() + '.' + time.getMinutes() + '.' + time.getSeconds();

    console.log(nameOfFile);
    console.dir(req.param);

    if (req.method == 'POST') {
        console.log("POST");
        var body = "";
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var post = qs.parse(body);
            var information = 'Name: ' + post.inputName + '  ' + 'Number: ' + post.inputNumber;
            if(counter === 2 ) {
                if(!(fs.existsSync(__pathB))) {
                    console.log('Создаем директорию А')
                    fs.mkdir('./B', function (err) {
                        console.log(err);
                    })
                }
                fs.writeFileSync(`./B/${nameOfFile}.txt`,information);
                counter = 0;
                return;
            }
            if(!(fs.existsSync(__pathA))){
                console.log('Создаем директорию А')
                fs.mkdir('./A', function (err) {
                    console.log(err);
                })
                console.log(path);
            }
            fs.writeFileSync(`./A/${nameOfFile}.txt`,information);
            counter++;
            console.log(counter);


        });



        res.writeHead(200, {'Content-Type': 'application/json'});
        // fs.writeFileSync(`${time}.txt`,information);
        res.end('post received');
        console.log('')
    }

});

var port = 3000;
var host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);



