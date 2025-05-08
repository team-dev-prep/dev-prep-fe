import { toast } from "sonner";
import { CustomToast } from "../components/common";

type ToastType = "success" | "error" | "info" | "warning";

interface ShowToastProps {
  type: ToastType;
  message: string;
}

const showToast = ({ type, message }: ShowToastProps) => {
  toast.custom((id) => <CustomToast type={type} message={message} />);
};

export default showToast;
