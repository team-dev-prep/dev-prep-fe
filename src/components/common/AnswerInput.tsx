import { useEffect, useRef, useState } from "react";

interface AnswerInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  isFixedHeight?: boolean;
}

const AnswerInput = ({
  placeholder = "질문의 답을 작성해 보세요. 문장이 어렵다면 키워드로 간단히 표현해도 좋아요.",
  value: externalValue,
  onChange: externalOnChange,
  readOnly = false,
  isFixedHeight = false,
}: AnswerInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [internalValue, setInternalValue] = useState(externalValue || "");

  // 외부 value가 변경되었을 때 내부 상태를 업데이트
  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue);
    }
  }, [externalValue]);

  // textarea 높이 자동 조정
  useEffect(() => {
    if (textareaRef.current && !isFixedHeight) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [internalValue, isFixedHeight]);

  // 입력 변경 핸들러
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(event.target.value);
    if (externalOnChange) {
      externalOnChange(event);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      className={`w-full resize-none rounded-lg border border-gray4 p-3 text-gray8 ${
        isFixedHeight ? "h-full" : "h-auto overflow-hidden"
      }`}
      placeholder={placeholder}
      value={internalValue}
      onChange={readOnly ? undefined : handleChange}
      readOnly={readOnly}
    />
  );
};

export default AnswerInput;
