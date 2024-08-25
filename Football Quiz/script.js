function Quiz(name) {
    this.name = name;
    this.questions_answers = [];
    this.points = 0;
    this.lostPoints = 0;
    this.buttonsById = [];
    this.rating;
    
    this.listAllQuestions = function() {
        let start_section = document.querySelector('.start')
        start_section.style.display = 'none';
        questions_section.style.display = 'block';

        let html = '';
        let index = 0;

        for(let i=0; i<this.questions_answers.length; i++) {
            html += 
                `
                <div class="questions">
                    <h1>Football <span>Quiz</span></h1>
                    <h2><text>${this.questions_answers[i].questionIndex}.</text> ${this.questions_answers[i].question}</h2>
                    <div class="anwsers">
                        <button class="awnser" id="${index}">${this.questions_answers[i].answer1}</button>
                        <button class="awnser" id="${index}">${this.questions_answers[i].answer2}</button>
                        <button class="awnser" id="${index}">${this.questions_answers[i].answer3}</button>
                        <button class="awnser" id="${index}">${this.questions_answers[i].answer4}</button>
                    </div>
                    <div class="d-flex">
                        <div>
                            <button class="back">Back</button>
                            <button class="next">Next</button>
                        </div>
                        <div class="right-buttons">
                            <button class="home">Back to Home</button>
                            <button class="finish">Finish</button>
                        </div>
                    </div>
                </div>
                `;   

            index++;
        }

        questions_section.innerHTML = html; 
    } 

    this.backToHome = function() {
        let homeBtn = document.querySelectorAll('.home');

        homeBtn.forEach(btn => {
            btn.addEventListener('click', function() {
                window.location.reload()
            })
        })
    }

    this.slider = function() {
        let allQuestions = document.querySelectorAll('.questions');
        let counter = 0;
        let nextBtn = document.querySelectorAll('.next');
        let backBtn = document.querySelectorAll('.back');

        function slideQuestions(counter) {

            for(let i=0; i<allQuestions.length; i++) {
                allQuestions[i].style.display = 'none'
                allQuestions[counter].style.display = 'block';
            } 
        }

        slideQuestions(counter);

        for(let i=0; i<nextBtn.length; i++) {
            nextBtn[i].addEventListener('click', function() {
                counter++;
                if(counter >= allQuestions.length) {
                    counter = 0;
                }
                slideQuestions(counter);
            })
        }

        for(let i=0; i<backBtn.length; i++) {
            backBtn[i].addEventListener('click', function() {
                counter--;
                if(counter < 0) {
                    counter = allQuestions.length - 1;
                }
                slideQuestions(counter);
            })
        }
    }

    this.trueAwnser = function() {
        
        for(let i=0; i<this.buttonsById.length; i++) {
            for(let j=0; j<this.buttonsById[i].length; j++) {

                this.buttonsById[i][j].addEventListener('click', () => {

                    if(this.buttonsById[i][j].innerHTML !== this.questions_answers[i].correctAnwser) {
                        for(let p=0; p<this.buttonsById[i].length; p++) {
                            if(this.buttonsById[i][p].innerHTML === this.questions_answers[i].correctAnwser) {
                                this.buttonsById[i][p].style.backgroundColor = 'green'
                                this.buttonsById[i][p].setAttribute('disabled', '')
                            } else {
                                this.buttonsById[i][p].style.backgroundColor = 'red'
                                this.buttonsById[i][p].setAttribute('disabled', '')
                            }
                        }

                        this.lostPoints++;
                        this.buttonsById[i][j].setAttribute('disabled', '')
                    }


                    if(this.buttonsById[i][j].innerHTML === this.questions_answers[i].correctAnwser) {
                        this.buttonsById[i][j].style.backgroundColor = 'green'
                        this.points++;

                        for(let k=0; k<this.buttonsById[i].length; k++) {
                            if(this.buttonsById[i][k].innerHTML !== this.questions_answers[k].correctAnwser) {
                                this.buttonsById[i][k].setAttribute('disabled', '')   
                            }
                        }
                        this.buttonsById[i][j].setAttribute('disabled', '')
                    }

                })
            }
        }
    }

    this.getButtonsById = function() {
        for(let i=0; i<this.questions_answers.length; i++) {
            if(this.questions_answers[i]) {
                let buttons = document.querySelectorAll(`.awnser[id="${i}"]`)
                this.buttonsById.push(buttons)
            }
        }
    }

    this.finishDisplay = function(firstName,lastName) {
        let finishBtn = document.querySelectorAll('.finish');
        
        finishBtn.forEach(btn => {
            btn.addEventListener('click', function() {
                let knowledge = myQuiz.points;
                if(knowledge === 15) {
                    knowledge = 'Perfect';
                } else if (knowledge < 15 && knowledge >= 11){  
                    knowledge = 'Very Good'
                } else if (knowledge < 11 && knowledge >= 7) {
                    knowledge = 'Good';
                } else if(knowledge < 7 && knowledge >= 4) {
                    knowledge = 'Bad';
                } else if(knowledge < 4 && knowledge >=0) {
                    knowledge = 'Very Bad'
                }
                
                let htmlToAdd = 
                `
                    <h1>Football <span>Quiz</span></h1>
                    <p>Correct Awnsers : <span class="finishPoints">${myQuiz.points}</span></p>
                    <p>Mistakes : <span class="finishPoints">${myQuiz.lostPoints}</span></p>
                    <p>Your football knowledge : <span class="knowledge">${knowledge}</span></p>
                    <h3>Want to try again <span class="name-end">${firstName} ${lastName}</span> ?</h3>
                    <button class="try">Try Again</button>
                    <button class="see-questions">questions</button>
                `
                result.innerHTML = htmlToAdd;
                result.style.display = "block"
                questions_section.style.display = "none";
                
                let tryAgainBtn = document.querySelector('.try');
                tryAgainBtn.addEventListener('click', () => {
                    window.location.reload()
                    
                }) 

                let seeQuestions = document.querySelector('.see-questions');
                seeQuestions.addEventListener('click', () => {
                    result.style.display = 'none';
                    questions_section.style.display = 'block';

                    let allButtons = document.querySelectorAll('.awnser')
                    allButtons.forEach(btn => {
                        btn.setAttribute('disabled', '')
                    })
                })
            })
        })
        
    }

}

function Questions(question, answer1, answer2, answer3, answer4, questionIndex, correctAnwser) {
    this.question = question;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4;
    this.questionIndex = questionIndex;
    this.correctAnwser = correctAnwser;
}

let myQuiz = new Quiz('Football Quiz');
let question1 = new Questions("Who has the most Ballon d'Ors ?", "Lionel Messi", "Cristiano Ronaldo", "Pele", "Ronaldo Nazario", 1, "Lionel Messi");
let question2 = new Questions("Which country has won the most World CUPs ?", "France", "Argentina", "Brazil", "Germany", 2, "Brazil");
let question3 = new Questions("Which player has scored the most goals of all time ?", "Gerd Muller", "Cristiano Ronaldo", "Lionel Messi", "Pele", 3, "Cristiano Ronaldo");
let question4 = new Questions("Which team won the Final World Cup 2022 ?", "Argentina", "France", "Germany", "Portugal", 4, "Argentina");
let question5 = new Questions("Who has the most goals scored in a single season ?", "Erling Haaland", "Cristiano Ronaldo", "Lionel Messi", "Lewandowski", 5, "Lionel Messi");
let question6 = new Questions("Which team won the 2015 UCl Final ?", "Juventus", "Bayern Munich", "Real Madrid", "Barcelona", 6, "Barcelona");
let question7 = new Questions("Which coach won 3 times in a row UCL Final ?", "Pep Guardiola", "Carlo Anchelotti", "Jose Mourinho", "Zidane", 7, "Zidane");
let question8 = new Questions("What was the first team that Cristiano Ronaldo played ?", "Sporting", "Manchester United", "Juventus", "Real Madrid", 8, "Sporting");
let question9 = new Questions("Which country won the world Cup 2010 ?", "Uruguay", "Spain", "Brazil", "Germany", 9, "Spain");
let question10 = new Questions("How many Ballon d'Ors Messi has ?", "3", "5", "7", "8", 10, "8");
let question11 = new Questions("Which teams were in the final UCL 2020 ?", "PSG vs Bayern Munich", "Chelsea vs Bayern Munich", "Real Madrid vs Atl Madrid", "Manchester United vs Barcelona", 11, "PSG vs Bayern Munich");
let question12 = new Questions("What position Karim Benzema played in Real Madrid ?", "CB", "LB", "ST", "LW", 12, "ST");
let question13 = new Questions("In which city Lionel Messi was born ?", "Rio De Jeniro", "Barcelona", "Rozzario", "Paris", 13, "Rozzario");
let question14 = new Questions("Which team won the final UCL 2012 ?", "Barcelona", "Chelsea", "Bayern Munich", "Manchester United", 14, "Chelsea");
let question15 = new Questions("Who is the best player of all time ?", "Cristiano Ronaldo", "Lionel Messi", "Pele", "Maradona", 15, "Lionel Messi");

myQuiz.questions_answers.push(question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15);


let playBtn = document.querySelector('.play');
let questions_section = document.querySelector('.questions-section')
let result = document.querySelector('.result')


playBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    
    myQuiz.listAllQuestions();
    myQuiz.slider();
    myQuiz.getButtonsById();
    myQuiz.trueAwnser();
    myQuiz.backToHome();
    myQuiz.finishDisplay(firstName, lastName)
})