module.exports = ()=>{
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <link rel="stylesheet" href="./page.css">
        <style type="text/css">
            * {
        margin: 0;
        padding: 0;
    }
    
    .pageA4 {
        width: 21cm;
        height: 29.7cm;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: white;
        border: 3px solid;
    }
    
    .pageContenar {
        width: 19cm;
        height: 27.7cm;
        background-color: white;
    
    }
    
    
    .sc1 {
        width: 100%;
        height: 15%;
        border-bottom: 3px solid;
        display: flex;
        flex-direction: row;
    
    }
    
    .coInfo {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    .coLogo {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    
    }
    
    .sc2 {
        width: 100%;
        height: 20%;
        border-bottom: 3px solid;
        display: flex;
        flex-direction: row;
        margin-bottom: 1.5%;
    
    }
    
    .hirerInfo1 {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
    
    
    }
    
    .hirerInfo2 {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
    
    }
    
    .sc3 {
        width: 100%;
        height: 30%;
        border-bottom: 3px solid;
        display: flex;
        flex-direction: row;
        margin-bottom: 1.5%;
    }
    
    .carInfo1 {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
    
    }
    
    .carInfo11 {
        width: 100%;
        height: 60%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
    }
    
    .note {
        width: 96%;
        height: 56%;
        border: 3px solid;
        border-radius: 5px;
        margin: 2%;
        margin-left: 0;
        padding: 5px;
    }
    
    .carInfo2 {
        width: 50%;
        height: 100%;
    
    
    }
    
    .sc4 {
        width: 100%;
        height: 7%;
        border-bottom: 3px solid;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-bottom: 1.5%;
    }
    
    .sc5 {
        width: 100%;
        height: 23%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
    
    .hSin {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    
    .mSin {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    
    .singPlace {
        width: 70%;
        height: 50%;
    
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-around;
        border: 3px solid;
        border-radius: 5px;
    }
    
    .carContract {
        /* width: 100%; */
        height: 90%;
        /* background-size: cover; */
    
    }
    
    .blackLogo {
        height: 100%;
    }d
        </style>
    </head>
    
    <body>
        <div class="pageA4">
            <div class="pageContenar">
                <div class="sc1">
                    <div class="coInfo">
                        <h1>General Company</h1>
                        <h4>for renting cars</h4>
                        <h5> </h5>
                        <h5> </h5>
                    </div>
                    <div class="coLogo"><img class="blackLogo" src='blackLogo.png' alt="logo"></div>
                </div>
                <div class="sc2">
                    <div class=" hirerInfo1">
                        <h4>Hirer Name : ${obj.hirerName}</h4>
                        <h4>Phone Number : ${obj.phoneNumber}</h4>
                        <h4>Id Number : ${obj.IDNumber}</h4>
                        <h4>Date Out : ${obj.dateOut}</h4>
                    </div>
                    <div class=" hirerInfo2">
                        <h4> . </h4>
                        <h4>Nationality : ${obj.nationality}</h4> </h4>
                        <h4>Licence Number : ${obj.licenceNumber}</h4> </h4>
                        <h4> Expiry Date : ${obj.expiryDate}</h4>
                    </div>
                </div>
                <div class="sc3">
                    <div class="carInfo1">
                        <div class=" carInfo11">
                            <h4> Car Type : ${obj.carType}</h4>
                            <h4> Plate Code : ${obj.plateCode}</h4>
                            <h4> Year Model ${obj.yearModel}: </h4>
                        </div>
                        <div class="note">
                            <h5>notes</h5>
                        </div>
                    </div>
                    <div class="carInfo2"><img class="carContract" src='carContract.jpg' alt="img"></div>
                </div>
                <div class="sc4">
                    <h4> Total Cost : </h4>
                </div>
                <div class="sc5">
                    <div class="hSin">
                        <h5> Hirer's signature : </h5>
                        <div class="singPlace"> </div>
                    </div>
                    <div class="mSin">
                        <h5> manager's signature : </h5>
                        <div class="singPlace"> </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    
    </html>`
}