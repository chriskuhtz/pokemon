import { ReactNode } from "react";
import { toast } from "react-toastify";
import { Pill } from "../../UiComponents/Pill/Pill";

export const useCustomToast = () => {
  const notify = (content: ReactNode, afterDismissal?: () => void) => {
    const newToast = toast(<Pill>{content}</Pill>);
    setTimeout(() => {
      toast.dismiss(newToast);
      if (afterDismissal) {
        afterDismissal();
      }
    }, 2000);
  };
  const fullScreenAlert = (content: ReactNode, afterDismissal?: () => void) => {
    const newToast = toast(
      <Pill>
        <div style={{ height: "100%" }}>{content}</div>
      </Pill>
    );
    setTimeout(() => {
      toast.dismiss(newToast);
      if (afterDismissal) {
        afterDismissal();
      }
    }, 2000);
  };

  return { notify, fullScreenAlert };
};
