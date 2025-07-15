// quiz.js

document.addEventListener('DOMContentLoaded', function () {
    const quizzes = document.querySelectorAll('.quiz-container');
  
    quizzes.forEach(function (quizContainer) {
      const slides = quizContainer.querySelectorAll('.quiz-slide');
      let currentSlide = 0;
  
      const nextButtons = quizContainer.querySelectorAll('.next-btn');
      const prevButtons = quizContainer.querySelectorAll('.prev-btn');
  
      nextButtons.forEach(button => {
        button.addEventListener('click', () => {
          goToSlide(currentSlide + 1);
        });
      });
  
      prevButtons.forEach(button => {
        button.addEventListener('click', () => {
          goToSlide(currentSlide - 1);
        });
      });
  
      function goToSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        currentSlide = n;
        if (currentSlide >= slides.length) {
          currentSlide = slides.length - 1;
        } else if (currentSlide < 0) {
          currentSlide = 0;
        }
        slides[currentSlide].classList.add('active-slide');
  
        // Update progress bar
        const progressBar = quizContainer.querySelector('.progress-bar');
        const progress = ((currentSlide) / (slides.length - 1)) * 100;
        progressBar.style.width = progress + '%';
      }
  
      // Function to check answers
      const submitButton = quizContainer.querySelector('.submit-btn');
      if (submitButton) {
        submitButton.addEventListener('click', function () {
          checkAnswers(quizContainer);
        });
      }
  
      function checkAnswers(quizContainer) {
        let correctAnswers = 0;
        const totalQuestions = slides.length;
        const correctAnswerKeys = JSON.parse(quizContainer.dataset.correctAnswers);
  
        for (let i = 0; i < totalQuestions; i++) {
          const selectedOption = quizContainer.querySelector(`input[name="question${i + 1}"]:checked`);
          if (selectedOption && selectedOption.value === correctAnswerKeys[i]) {
            correctAnswers++;
          }
        }
  
        const scorePercentage = (correctAnswers / totalQuestions) * 100;
        let resultText = 'You got ' + correctAnswers + ' out of ' + totalQuestions + ' correct!';
  
        if (scorePercentage === 100) {
          resultText += ' Excellent work!';
        } else if (scorePercentage >= 75) {
          resultText += ' Good job!';
        } else if (scorePercentage >= 50) {
          resultText += ' Not bad, but there\'s room for improvement.';
        } else {
          resultText += ' Don\'t worry, keep learning and try again!';
        }
  
        const resultElement = quizContainer.querySelector('.quizResult');
        if (resultElement) {
          resultElement.innerText = resultText;
        }
  
        // Show result on the last slide
        goToSlide(slides.length - 1);
  
        // Disable buttons after submitting
        quizContainer.querySelectorAll('button').forEach(button => {
          button.disabled = true;
        });
      }
  
      // Initialize the quiz
      slides[currentSlide].classList.add('active-slide');
      const progressBar = quizContainer.querySelector('.progress-bar');
      if (progressBar) {
        progressBar.style.width = '0%';
      }
    });
  });
  