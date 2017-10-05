var basicCard = require("./cardType.js");
var json = require("./app.json")
var inquirer = require("inquirer");
var fs = require("fs");



function start(){

    inquirer.prompt([
        {
            name: "gameStart",
            type: "list",
            message: "What would you like to do?",
            choices: ["make cards", "Read Cards"]
        },
    ]).then(function(answer){
        if( answer.gameStart === "make cards"){
            createCard();
        } else {
            readCard();
        }
    });

};



function createCard(){

    inquirer.prompt([
        {
        type: "list",
        name: "flashCard",
        message: "Please choose the kind of card you want to make...",
        choices: ["basic", "cloze"]
        }
    ]).then(function(answer) {
       flashCard = answer.flashCard;
    //console.log(data.flashCard);
    
        if(answer.flashCard === "basic"){
            basic();
         } else {
            cloze();
            };
        });
    }
            function basic() {
                

            inquirer.prompt([
                {
                type: "input",
                name: "front",
                message: "Please enter your card's question...",
                },
                {
                type: "input",
                name: "back",
                message: "Please enter the cards answer..."
                }
            ]).then(function(data){
                let newCard = {
                    type:"basicCard",
                    front: data.front,
                    back: data.back
                }
                console.log(newCard);

                json.push(newCard);

                fs.writeFileSync("app.json", JSON.stringify(json, null, 2));
                

                inquirer.prompt([
                    {
                    type: "confirm",
                    name: "confirm",
                    message: "Do you want to make another card?",
                    default: true
                    }
                ]).then(function(answer){
                    if( answer.confirm === true){
                        basic();
                    } else {
                        start();
                    }
                });
                
            });
         
    }

    function cloze(){

            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter the answer to the cloze card (e.g. 'George Washington')",
                    name: "cloze"
                },
                {
                    type: "input",
                    message: "Enter the full card.  Such as: 'George Washington was the first president of the United States.'",
                    name: "fullText"
                }
            ]).then(function(data){
                //console.log("hello");
                let newCard = {
                    type:"clozeCard",
                    cloze: data.cloze,
                    fullText: data.fullText
                    }

                    var partial = function() {
                        if (data.fullText.includes(data.cloze)) {
                            return data.fullText.replace(data.cloze, '...');
                        } else {
                            console.log("Oops the cloze was not about of the sentence, please try again")
                        }
                    };

                    partial();
                
                    json.push(newCard);
                    fs.writeFileSync("app.json", JSON.stringify(json, null, 2));

                    inquirer.prompt([
                        {
                        type: "confirm",
                        name: "confirm",
                        message: "Do you want to make another card?",
                        default: true
                        }
                    ]).then(function(answer){
                        if( answer.confirm === true){
                            cloze();
                        } else {
                            start();
                        }
                    });   
            });
        
    }
 
 function readCard(){
      
    fs.readFile('app.json', (err, data) => {  
        if (err) throw err;
        let cardInfo = JSON.parse(data);
        console.log(cardInfo);
    });      
}

        start();



