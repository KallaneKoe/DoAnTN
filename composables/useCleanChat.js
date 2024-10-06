import { useSendMessage } from "~/composables/useSendMessage.js";

export const useCleanChat = () => {
  const { sendMessage, messages } = useSendMessage();
  const clearChat = () => {
    messages.value = [];
    sendMessage("", "Xin chào, hôm nay tôi có thể giúp gì cho bạn?");
  };
  return { clearChat };
};
