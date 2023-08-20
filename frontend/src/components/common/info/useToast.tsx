import { useToast as useChakraToast } from "@chakra-ui/react";

type ToastStatus = "success" | "info" | "warning" | "error" | "loading";

interface ToastProps {
  message: string;
  status: ToastStatus;
}

const useToast = (): {
  showToast: ({ message, status }: ToastProps) => void;
} => {
  const toast = useChakraToast();

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

export default useToast;
