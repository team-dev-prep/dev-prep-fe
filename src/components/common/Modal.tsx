import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content?: React.ReactNode;
  actions?: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, content, actions }: ModalProps) => {
  const [mounted, setMounted] = useState(false); // 클라이언트 렌더링 여부

  // 클라이언트에서만 모달 렌더링
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 모달 열릴 때 스크롤 비활성화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  // 포탈을 붙일 DOM 요소
  const portalRoot = document.getElementById("modal-root");
  if (!portalRoot) {
    console.error("modal-root가 HTML에 없습니다.");
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black-60"
      onClick={onClose}
    >
      <div
        className="flex flex-col rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼*/}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-fit cursor-pointer text-sm text-gray8 hover:underline"
          >
            닫기
          </button>
        </div>

        {/* 내용 영역 */}
        <div className="flex flex-col gap-6">
          {title && <h2 className="text-2xl font-bold text-black">{title}</h2>}
          {content && <div className="text-lg text-gray8">{content}</div>}
          {actions && <div className="flex flex-col gap-3 text-lg">{actions}</div>}
        </div>
      </div>
    </div>,
    portalRoot,
  );
};

export default Modal;
