interface QuestionProps {
  text: string;
}

const Question = ({ text }: QuestionProps) => {
  return (
    <div className="mb-2 text-xl font-extrabold">
      <span>Q. {text}</span>
    </div>
  );
};

export default Question;
