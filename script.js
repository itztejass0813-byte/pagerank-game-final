// ==========================================
// LEVEL 10 — FINAL EXAM
// ==========================================

const finalQuestions = [
  {
    question: "What does PageRank primarily use?",
    options: [
      "Only word frequency",
      "Web link structure",
      "Page color",
      "Website age"
    ],
    correct: 1,
    explanation:
      "PageRank uses the structure of links between pages."
  },

  {
    question: "What is the random surfer idea?",
    options: [
      "A person randomly browsing pages",
      "A robot deleting pages",
      "A person writing websites",
      "A search advertisement"
    ],
    correct: 0,
    explanation:
      "The model imagines a surfer following links and sometimes jumping to another page."
  },

  {
    question: "Why is damping useful?",
    options: [
      "It makes text larger",
      "It lets the surfer escape loops",
      "It deletes links",
      "It changes website colors"
    ],
    correct: 1,
    explanation:
      "Random jumps help prevent the surfer from becoming trapped in link cycles or dead ends."
  },

  {
    question: "Can people attempt to manipulate link-based rankings?",
    options: [
      "No",
      "Yes",
      "Only on paper",
      "Only offline"
    ],
    correct: 1,
    explanation:
      "People can attempt to manipulate rankings through links, which is why search engines have spam policies."
  }
];

let finalQuestionIndex = 0;
let finalAnswerLocked = false;


// Start Level 10
function level10() {

  finalQuestionIndex = 0;
  finalAnswerLocked = false;

  updateProgress();

  renderFinalQuestion();
}


// Draw the current question
function renderFinalQuestion() {

  const question =
    finalQuestions[finalQuestionIndex];

  finalAnswerLocked = false;

  updateProgress();

  $("gameContent").innerHTML = `
    <div class="challenge">

      <div class="badge">
        FINAL EXAM
      </div>

      <h3>
        Question ${finalQuestionIndex + 1}
        / ${finalQuestions.length}
      </h3>

      <p>
        Choose the answer you think is correct.
      </p>

      <div class="option-grid">

        ${question.options.map((option, index) => `
          
          <button
            class="option"
            onclick="answerFinal(${index})">

            ${option}

          </button>

        `).join("")}

      </div>

      <div id="finalAnswer"></div>

    </div>
  `;
}


// Check answer
function answerFinal(selectedIndex) {

  // Prevent double clicking
  if (finalAnswerLocked) {
    return;
  }

  const question =
    finalQuestions[finalQuestionIndex];

  const buttons =
    document.querySelectorAll(
      "#gameContent .option"
    );

  // Lock buttons immediately
  finalAnswerLocked = true;

  buttons.forEach(button => {
    button.disabled = true;
  });


  // ------------------------------
  // CORRECT
  // ------------------------------

  if (selectedIndex === question.correct) {

    buttons[selectedIndex]
      .classList.add("correct");


    // Is this the LAST question?
    if (
      finalQuestionIndex ===
      finalQuestions.length - 1
    ) {

      $("finalAnswer").innerHTML = `
        <div class="explanation">

          <strong>
            🎉 Perfect! You completed the final exam.
          </strong>

          <p>
            You answered all
            ${finalQuestions.length}
            questions correctly.
          </p>

          <p>
            Your PageRank Master reward is ready.
          </p>

          <button
            class="primary"
            onclick="completeFinalExam()">

            🏆 CLAIM MASTER REWARD →

          </button>

        </div>
      `;

      return;
    }


    // There are still questions
    $("finalAnswer").innerHTML = `
      <div class="explanation">

        <strong>
          Correct! 🎯
        </strong>

        <p>
          ${question.explanation}
        </p>

        <button
          class="primary"
          onclick="nextFinalQuestion()">

          NEXT QUESTION →

        </button>

      </div>
    `;

  }


  // ------------------------------
  // WRONG
  // ------------------------------

  else {

    buttons[selectedIndex]
      .classList.add("wrong");


    $("finalAnswer").innerHTML = `
      <div class="explanation">

        <strong>
          Not quite.
        </strong>

        <p>
          Review what you discovered during
          the earlier levels.
        </p>

        <button
          class="primary"
          onclick="retryFinalQuestion()">

          TRY AGAIN

        </button>

      </div>
    `;
  }
}


// Go to the next question
function nextFinalQuestion() {

  if (
    finalQuestionIndex <
    finalQuestions.length - 1
  ) {

    finalQuestionIndex++;

    finalAnswerLocked = false;

    renderFinalQuestion();

  }
}


// Retry the SAME question
function retryFinalQuestion() {

  finalAnswerLocked = false;

  renderFinalQuestion();

}


// Finish the final exam
function completeFinalExam() {

  finishLevel();

}
