interface QuestionProps {
  text: string;
}

const Question = ({ text }: QuestionProps) => {
  return (
    <div className="mb-2 text-xl font-[800]">
      Q. <span className="text-xl font-[800]">{text}</span>
    </div>
  );
};

export default Question;
