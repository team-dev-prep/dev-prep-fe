import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

type ToastType = "success" | "error" | "info" | "warning";

interface CustomToastProps {
  type: ToastType;
  message: string;
}

const ICON_MAP = {
  success: <CheckCircleIcon className="h-5 w-5 text-green-800" />,
  error: <ExclamationCircleIcon className="h-5 w-5 text-red-800" />,
  info: <InformationCircleIcon className="h-5 w-5 text-blue-800" />,
  warning: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-800" />,
};

const CustomToast = ({ type, message }: CustomToastProps) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-3 shadow-md">
      <div className="shrink-0">{ICON_MAP[type]}</div>
      <div className="flex-1 whitespace-nowrap text-sm">{message}</div>
    </div>
  );
};

export default CustomToast;
