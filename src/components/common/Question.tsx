interface QuestionProps {
  text: string;
}

const Question = ({ text }: QuestionProps) => {
  return (
    <div className="mb-2 text-xl font-extrabold">
      Q. <span className="text-xl font-extrabold">{text}</span>
    </div>
  );
};

export default Question;
