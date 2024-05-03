import { useEffect, useState } from "react";
import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questionsList, setQuestionsList] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(questions => setQuestionsList(questions))
    .catch(error => console.error("Error fetching questions:", error));
    },[]);

    function handleDeleteQuestion(deletedQuestion){
      const listAfterDelete = questionsList.filter((question) => 
        question.id !== deletedQuestion.id
      )
      setQuestionsList(listAfterDelete);
    }

    function handleAddQuestion(addedQuestion){
    setQuestionsList([...questionsList,addedQuestion]) 
    }

    function handleChangingAnswer(updatedQuestion) {
      const updatedQuestions = questionsList.map((question) => {
        if (question.id === updatedQuestion.id) {
          return updatedQuestion;
        } else {
          return question;
        }
      });
      setQuestionsList(updatedQuestions);
    }
    
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {questionsList.map((question, id) => (
           <QuestionItem 
           key={id}
           question={question} 
           onDelete={handleDeleteQuestion}
           onAdd={handleAddQuestion}
           onChangeAnswer={handleChangingAnswer}
           />
          ))}
      </ul>
    </section>
  );
}

export default QuestionList;
