import { useNavigate } from "react-router-dom";
import { Button } from "../components/common";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center gap-12 px-4"
      style={{ height: "calc(100vh - 130px)" }}
    >
      {/* 히어로 영역 */}
      <section className="text-center">
        <h1 className="mb-3 text-5xl font-bold leading-[1.2]">
          면접 질문에 직접 타이핑하며,
          <br />
          나만의 면접 리허설을 시작하세요.
        </h1>
        <p className="text-xl text-gray8">
          면접 질문과 맞춤형 피드백을 제공하는 개발자 면접 준비 플랫폼
        </p>
      </section>

      {/* 버튼 영역 */}
      <Button
        label="시작하기"
        onClick={() => {
          navigate("/option");
        }}
        className="bg-blue3 text-2xl font-[600] text-white shadow-md"
      />

      {/* 프리뷰 영역 */}
      <section className="mg-4px grid w-full grid-cols-2 gap-6">
        <div className="bg-blue1 shadow-s rounded-xl p-6">
          <div className="mx-auto mb-8 flex w-40 items-center justify-center rounded-lg border-2 border-gray4 px-4 py-2">
            <p className="text-center font-keania text-3xl font-[800]">10:00</p>
          </div>
          <p className="mb-3 text-xl font-[600]">Q. 이벤트 루프(Event Loop)에 대해 설명하세요.</p>
          <div className="py-30 rounded-lg border border-gray2 bg-white px-4 py-32 text-gray6">
            주어진 시간 내에 답변을 완성해 보세요. <br />
            간단한 키워드 작성이라도 좋아요.
          </div>
        </div>

        <div className="bg-blue1 shadow-sm09876 rounded-xl p-6">
          <p className="mb-3 text-center text-3xl font-[800]">맞춤형 피드백</p>
          <p className="whitespace-pre-line text-lg leading-relaxed">
            ✅ 핵심 개념에 대한 이해가 잘 드러나는 답변입니다. 싱글 스레드 환경에서의 실행 흐름과
            함께, 콜백 큐와 이벤트 루프 간의 상호작용을 잘 설명해주셨습니다. <br />
            <br />
            💡 보완하면 좋은 점: 'Web APIs', 'Microtask Queue와 Callback Queue의 차이'와 같은
            구체적인 개념을 함께 언급하면 답변의 깊이가 더해집니다. 예를 들어, setTimeout은 콜백
            큐에, Promise는 마이크로태스크 큐에 들어간다는 차이를 설명해보세요. <br />
            <br />
            ✍️ 답변 팁: "이벤트 루프는 콜 스택과 태스크 큐를 지속적으로 확인하며, 스택이 비었을 때
            큐에서 작업을 가져와 실행하는 구조입니다."처럼 정의형 문장으로 시작하면 답변의 명확성과
            전문성을 높일 수 있습니다.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
