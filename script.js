const questions = [
  {
    question: "What does HTML stand for?",
    answer: [
      { text: "Hyper Trainer Marking Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Text Machine Language", correct: false },
      { text: "Hyper Text Making Links", correct: false },
    ],
  },
  {
    question: "Which tag is used to display a heading in HTML?",
    answer: [
      { text: "<p>", correct: false },
      { text: "<h1>", correct: true },
      { text: "<title>", correct: false },
      { text: "<div>", correct: false },
    ],
  },
  {
    question: "Which tag is used to create a hyperlink?",
    answer: [
      { text: "<href>", correct: false },
      { text: "<h1>", correct: false },
      { text: "<a>", correct: true },
      { text: "<src>", correct: false },
    ],
  },
  {
    question: "What does CSS control?",
    answer: [
      { text: "web structure", correct: false },
      { text: "database", correct: false },
      { text: "web design/style", correct: true },
      { text: "web content", correct: false },
    ],
  },
  {
    question: "Which property changes the text color?",
    answer: [
      { text: "text-color", correct: false },
      { text: "font-color", correct: false },
      { text: "bgcolor", correct: false },
      { text: "color", correct: true },
    ],
  },
  {
    question: "Which symbol is used to select a class in CSS?",
    answer: [
      { text: ".", correct: true },
      { text: "#", correct: false },
      { text: "%", correct: false },
      { text: "@", correct: false },
    ],
  },
  {
    question: "What does JavaScript mainly add to a webpage?",
    answer: [
      { text: "styles", correct: false },
      { text: "interaction and behavior", correct: true },
      { text: "server connection", correct: false },
      { text: "images", correct: false },
    ],
  },
  {
    question: "How do you show a pop-up message in JavaScript?",
    answer: [
      { text: "box()", correct: false },
      { text: "alert()", correct: true },
      { text: "popup()", correct: false },
      { text: "message()", correct: false },
    ],
  },
  {
    question: "What does === mean in JavaScript?",
    answer: [
      { text: "assignment", correct: false },
      { text: "equal value only", correct: false },
      { text: "equal value and type", correct: true },
      { text: "not equal", correct: false },
    ],
  },
  {
    question: "Which of these is a JavaScript data type?",
    answer: [
      { text: "integer", correct: false },
      { text: "string", correct: true },
      { text: "float", correct: false },
      { text: "decimal", correct: false },
    ],
  },
];

const questionElement = $("#question");
const ansBtn = $("#ansBtn");
const nextBtn = $("#nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.html("Next");
  showQuestion();
}

function showQuestion() {
  resetState();
  console.log("Current index:", currentQuestionIndex);
  console.log("Total questions:", questions.length);

  if (currentQuestionIndex >= questions.length) {
    console.error("No more questions!");
    return;
  }

  let q = questions[currentQuestionIndex];
  console.log("Showing question:", q.question);
  let questionNo = currentQuestionIndex + 1;
  questionElement.html(questionNo + ". " + q.question);

  ansBtn.empty();

  console.log("Displaying answers for question:", q.question);
  q.answer.forEach((answer) => {
    const button = $("<button></button>")
      .text(answer.text)
      .addClass("btn")
      .data("correct", answer.correct || false)
      .on("click", selectAnswer);

    ansBtn.append(button);
    console.log("Created button:", button.text());
  });
}

function resetState() {
  nextBtn.hide();
  ansBtn.empty();
}

function selectAnswer(e) {
  const selectBtn = $(e.target);
  const isCorrect = selectBtn.data("correct") === true;

  if (isCorrect) {
    selectBtn.addClass("correct");
    score++;
  } else {
    selectBtn.addClass("incorrect");
  }

  ansBtn.find("button").each(function () {
    if ($(this).data("correct") === true) {
      $(this).addClass("correct");
    }
    $(this).prop("disabled", true);
  });

  nextBtn.show();
}

function showScore() {
  resetState();
  questionElement.html(`You scored ${score} out of ${questions.length}!`);
  nextBtn.html("Play Again");
  nextBtn.show();
}

function handleNextBtn() {
  currentQuestionIndex++;
  console.log("Moving to question index:", currentQuestionIndex);
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.on("click", function () {
  if (currentQuestionIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();
