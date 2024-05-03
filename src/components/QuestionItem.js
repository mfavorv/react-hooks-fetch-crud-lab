import React from "react";

function QuestionItem({ question,onDelete, onChangeAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function deleteQuestion(){
    fetch(`http://localhost:4000/questions/${question.id}`,{
    method: "DELETE",
  })
    .then((r) => r.json())
    .then(() => onDelete(question));
}

function changeAnswer(event){
  const correctIndex = event.target.value;

  fetch(`http://localhost:4000/questions/${question.id}`,{
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body:JSON.stringify({correctIndex})

  })
  .then((res) => res.json())
  .then((updatedQuestion) => {
  onChangeAnswer(updatedQuestion)
    });
    
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changeAnswer}>{options}</select>
      </label>
      <button onClick={deleteQuestion} > Delete Question </button>
    </li>
  );
}

export default QuestionItem;
