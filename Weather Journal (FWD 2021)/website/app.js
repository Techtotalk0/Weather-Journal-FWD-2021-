
/*  To declare some global variables */
const apiKey = "&appid=3dd6822b4a27c10c36dc730057180df8&units=imperial";
const apiUrl = "http://localhost:4800/";

const zipCode = document.getElementById('zipp');
const feelingsCode = document.getElementById('feel');
const date = document.getElementById('dat');
const temp = document.getElementById('tem');
const content = document.getElementById('cont');

const catchError = (error) => console.error('The error is => ', error);


// To add an existing function to the document
document.getElementById('gen').addEventListener('click', onGenerate);

/** To post the data to API */
function onGenerate() {
    let data = {
        zipCode: zipCode.value,
        content: feelingsCode.value,
        date: new Date()
    };

    //To post the data cathed from API
    getZipCodeInformation(data.zipCode).then(zipInfo => {
        //To return alert in case of any faliure
        if (zipInfo.cod != 200)
            return alert(zipInfo.message)

        //To finally post the data to server
        data.temp = zipInfo.list[0].main.temp;
        postDateToServer(data);
    }).catch(catchError);
};

/** To get the ZIP code from an external API */
async function getZipCodeInformation(zipCode) {
    return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`)).json()
}


/** The process of postting the data  */
async function postDateToServer(data) {
    let response = await fetch(`${apiUrl}postData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        if (!response.ok) {
            alert('Process is successful');
            return;
        }
       
        response.json().then(data => {
            if (response.ok)
                update_UI();//To update the user interface
            else
                alert('Process is successful');
        }).catch(catchError);

    } catch (error) {
        catchError(error);
    }
}

/** To update user interface */
async function update_UI() {
    let response = await fetch(`${apiUrl}getAll`);
    try {
        response.json().then(data => {
            date.innerHTML = `This is date: ${data.date}`;
            temp.innerHTML = `This is temporarys: ${data.temp}`;
            content.innerHTML = `This is feelings: ${data.content}`;
        }).catch(catchError);
    } catch (error) {
        catchError(error);
    }
}
