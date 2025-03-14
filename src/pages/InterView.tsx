import Timer from "../components/common/Timer";
import Button from "../components/common/Button";
import Counter from "../components/common/Counter";
import Question from "../components/common/Question";
import AnswerInput from "../components/common/AnswerInput";

const Interview = () => {
  return (
    <div
      className="mx-auto flex w-full max-w-[1200px] flex-col"
      style={{ height: "calc(100vh - 130px)" }}
    >
      <div className="flex w-full justify-center py-6">
        <Timer />
      </div>

      <div className="flex w-full max-w-[1200px] flex-1 flex-col px-4">
        <Question text="타입스크립트의 infer 키워드에 대해서 설명해주세요." />
        <div className="flex flex-1">
          <AnswerInput />
        </div>
      </div>

      <div className="flex w-full max-w-[1200px] items-center justify-between p-4 pt-6">
        <div className="flex-1"></div>
        <Counter current={1} total={1} />
        <div className="flex flex-1 justify-end">
          <Button to="/feedback" label="결과 보기" />
        </div>
      </div>
    </div>
  );
};

export default Interview;
