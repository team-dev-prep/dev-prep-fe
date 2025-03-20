interface ModelAnswerProps {
  text: string;
}

const ModelAnswer = ({ text }: ModelAnswerProps) => {
  return (
    <div className="h-fit w-full max-w-[1200px] rounded-lg border border-gray4 bg-gray2 p-3">
      <p className="whitespace-pre-wrap">{text}</p>
    </div>
  );
};

export default ModelAnswer;
