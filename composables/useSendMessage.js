export const useSendMessage = () => {
  const newMessage = ref("");
  const messages = useState("messages", () => [
    {
      userMessage: "",
      botMessage: "Xin chào, hôm nay tôi có thể giúp gì cho bạn?",
    },
  ]);
  let responseList = [];
  console.log(messages);
  const sendMessage = (userMessage, botMessage) => {
    messages.value.push({ userMessage: userMessage, botMessage: botMessage });

    newMessage.value = "";
  };

  return { sendMessage, newMessage, messages };
};
