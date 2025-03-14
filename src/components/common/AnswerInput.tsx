interface AnswerInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
}

const AnswerInput = ({
  placeholder = "질문의 답을 작성해 보세요. 문장 작성이 힘들다면 키워드 작성으로도 좋아요.",
  value,
  onChange,
  readOnly = false,
}: AnswerInputProps) => {
  return (
    <textarea
      className="border-gray4 text-gray8 h-full w-full flex-1 resize-none rounded-lg border p-3"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    ></textarea>
  );
};

export default AnswerInput;
