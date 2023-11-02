import React, { useState } from "react";

function QuestionForm(props) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newQuestionData = {
      prompt: formData.prompt,
      answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      correctIndex: parseInt(formData.correctIndex),
    };

    fetch("http://localhost:3000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestionData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Implement a callback function to update the state in QuestionList
        props.onAddQuestion(data);
      })
      .catch((error) => console.error("Error adding question: ", error));
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        {/* Input fields for prompt, answers, and correct answer */}
        {/* Handle change events using handleChange function */}
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
