(function () {
    var popUpElement = document.querySelector('.wrapper__element_button');
    popUpElement.addEventListener('click', function () {
        var newWin = window.open('about:blank', "mywork", "width=600,height=400,left=250,top=250");
        newWin.onload = function () {
            //Creating form
            var formToPost = newWin.document.createElement('form'), body = newWin.document.body;
            var inputName = newWin.document.createElement('input');

            var labelForInputName = newWin.document.createElement('label');
            var labelForInputNumber = newWin.document.createElement('label');

            var inputNumber = newWin.document.createElement('input');
            var btnSubmit = newWin.document.createElement('button');

            btnSubmit.setAttribute('type', 'submit');

            inputName.textContent = 'Имя';
            inputName.setAttribute('name', 'inputName');

            inputNumber.textContent = 'Номер';
            inputNumber.setAttribute('name', 'inputNumber');
            btnSubmit.textContent = 'ОК';
            labelForInputName.textContent = 'Имя:';
            labelForInputName.setAttribute('for', 'inputName');
            // вставить первым элементом в body нового окна
            formToPost.appendChild(labelForInputName);
            formToPost.appendChild(inputName);
            labelForInputNumber.textContent = 'Номер:';
            labelForInputNumber.setAttribute('for', 'inputNumber');
            formToPost.appendChild(labelForInputNumber);
            formToPost.appendChild(inputNumber);
            formToPost.appendChild(btnSubmit)

            formToPost.setAttribute('method', 'POST');
            formToPost.setAttribute('action', 'http://localhost:3000');

            body.appendChild(formToPost);

            btnSubmit.addEventListener('click', function (evt) {
                var xhr = new XMLHttpRequest();
                var json = JSON.stringify({
                    name: inputName.value,
                    number: inputNumber.value
                });


                xhr.open("POST", 'http://127.0.0.1:3000', true)
                xhr.setRequestHeader("Content-type", "application/json");

                xhr.onreadystatechange = function () {
                    console.log('onreadystatechange');
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        alert(xhr.responseText);
                    } else {
                        console.log('readyState=' + xhr.readyState + ', status: ' + xhr.status);
                    }
                }
                console.log('sending...')
                console.log(json);
                xhr.send(json);
                console.log('end');
            })
        }
    });
})();


