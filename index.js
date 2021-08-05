console.log('POSTMASTER (idea from PostMan)');

//Utility functions :
// 1. Utility function to get DOM element from string 
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


//Initalise number of parameters
let addedParamsCount = 0;

// Hide the pearameters box initially 
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// If the user clicks on params box, hide the json box 

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

// If the user clicks on json box, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

//If the user clicks on + button, add more parameters
let addParam = document.getElementById('addParam');

addParam.addEventListener('click', () => {
    // console.log('you clicked +');

    let params = document.getElementById('params');

    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam">-</button>
                </div>`;

    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // Add an event listener to remove the parameter on clicking - button 
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }

    addedParamsCount++;
})

// If the user clicks on submit button 
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{

    //Show Please wait in the response box to request patience from the user 
    document.getElementById('responseJsonText').value = "Please wait... Fetching response";

    //Fetch all the values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector(`input[name="requestType"]:checked`).value;
    let contentType = document.querySelector(`input[name="contentType"]:checked`).value;
    // console.log(url, requestType, contentType);

    // If user has used params option instead of JSON , collect all parameters in object 
    if(contentType == 'params'){
        data = {};
        for(let i = 0 ; i < addedParamsCount + 1; i++){
            if(document.getElementById('parameterKey' + (i+1)) !== undefined){
                let key = document.getElementById('parameterKey' + (i+1)).value;
                let value = document.getElementById('parameterValue' + (i+1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('requestJsonText').value;
    }

    // if the request type is GET, invoke fetch api to create a post request
    if(requestType == 'GET'){
        fetch(url, {
            method : 'GET',
        }).then(response => response.text())
        .then(text => {
            document.getElementById('responseJsonText').value = text;
        });
    }
    else{
        fetch(url, {    // if the request type is POST , invoke fetch api to create a post request
            method : 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        }).then(response => response.text())
        .then(text => {
            document.getElementById('responseJsonText').value = text;
        });

    }
});
