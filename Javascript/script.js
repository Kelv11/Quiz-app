const answerOptions = document.querySelector(".answer-options");
const nextQuestionBtn = document.querySelector(".next-question-btn");

let quizCategory = "programming";
let currentQuestion = null;
const questionsIndexHistory = [];

//Fetch a random question based on the selected category
const getRandomQuestion = () => {
  const categoryQuestions =
    questions.find(
      (cat) => cat.category.toLowerCase() === quizCategory.toLowerCase()
    ).questions || [];

  const availableQuestion = categoryQuestions.filter(
    (_, index) => !questionsIndexHistory.includes(index)
  );
  //filter out already asked questions and choose a random one
  const randomQuestion =
    availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
  questionsIndexHistory.push(categoryQuestions.indexOf(randomQuestion));
  return randomQuestion;
};
//highlight the correct answer option and add icon
const highlightCorrectAnswer = () => {
  const correctOption =
    answerOptions.querySelectorAll(".answer-option")[
      currentQuestion.correctAnswer
    ];
  correctOption.classList.add("correct");
  const iconHTML = `<span class="material-symbols-rounded">
  check_circle
</span>`;
  correctOption.insertAdjacentHTML("beforeend", iconHTML);
};

//Handles the user's answer selection
const handleAnswer = (option, answerIndex) => {
  const isCorrect = currentQuestion.correctAnswer === answerIndex;
  option.classList.add(isCorrect ? "correct" : "incorrect");

  !isCorrect ? highlightCorrectAnswer() : "";

  //Insert icon based on correctness
  const iconHTML = `<span class="material-symbols-rounded">
      ${isCorrect ? "check_circle" : "cancel"}
    </span>`;
  option.insertAdjacentHTML("beforeend", iconHTML);

  //Disable all answer options after one option is selected
  answerOptions
    .querySelectorAll(".answer-option")
    .forEach((option) => (option.style.pointerEvents = "none"));
  nextQuestionBtn.style.visibility = "visible";
};

//render the current question and its options in the quiz
const renderQuestion = () => {
  currentQuestion = getRandomQuestion();
  if (!currentQuestion) return;
  console.log(currentQuestion);

  //Update the UI
  answerOptions.innerHTML = "";
  nextQuestionBtn.style.visibility = "hidden";
  document.querySelector(".question-text").textContent =
    currentQuestion.question;
  //Create option elements and append them and add click event listeners
  currentQuestion.options.forEach((Option, index) => {
    const li = document.createElement("li");
    li.classList.add("answer-option");
    li.textContent = Option;
    answerOptions.appendChild(li);
    li.addEventListener("click", () => handleAnswer(li, index));
  });
};

renderQuestion();

nextQuestionBtn.addEventListener("click", renderQuestion);
