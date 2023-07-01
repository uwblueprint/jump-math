import { useToast } from "@chakra-ui/react";

type ToastStatus = "success" | "info" | "warning" | "error" | "loading";

interface ToastProps {
  message: string;
  status: ToastStatus;
}

const Toast = (): { showToast: ({ message, status }: ToastProps) => void } => {
  const toast = useToast();

  const showToast = ({ message, status }: ToastProps) => {
    toast({
      description: message,
      variant: status === "success" ? "successToast" : "errorToast",
      status,
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  };

  return { showToast };
};

export default Toast;
