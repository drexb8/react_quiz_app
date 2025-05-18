import Option from "./Option";

function Question({ question }) {
  console.log(question);
  return (
    <div>
      <h3>{question.question}</h3>
      <Option options={question.options} />
    </div>
  );
}

export default Question;
