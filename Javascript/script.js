const answerOptions = document.querySelector(".answer-options");
const nextQuestionBtn = document.querySelector(".next-question-btn");

let quizCategory = "programming";

//Fetch a random question based on the selected category
const getRandomQuestion = () => {
  const categoryQuestions =
    questions.find(
      (cat) => cat.category.toLowerCase() === quizCategory.toLowerCase()
    ).questions || [];

  const randomQuestion =
    categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
  return randomQuestion;
};
//render the current question and its options in the quiz
const renderQuestion = () => {
  const currentQuestion = getRandomQuestion();
  if (!currentQuestion) return;
  console.log(currentQuestion);

  //Update the UI
  answerOptions.innerHTML = "";
  document.querySelector(".question-text").textContent =
    currentQuestion.question;
  //Create option elements and append them
  currentQuestion.options.forEach((Option) => {
    const li = document.createElement("li");
    li.classList.add("answer-option");
    li.textContent = Option;
    answerOptions.appendChild(li);
  });
};

renderQuestion();

nextQuestionBtn.addEventListener("click", renderQuestion);
