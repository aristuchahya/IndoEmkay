import { toast } from "sonner";

export const showToast = (message: string, type: "success" | "error") => {
  toast(message, {
    style: {
      backgroundColor: type === "success" ? "green" : "red",
      color: "white",
      width: "50%",
    },
    duration: 3000,
    position: "bottom-center",
  });
};
