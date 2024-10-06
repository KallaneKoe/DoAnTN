<template>
  <Header v-if="!isLoading" />
  <div v-if="isLoading">
    <div class="loader"></div>
  </div>

  <div
    v-else
    class="h-screen bg-[#bec7a5] overflow-x-hidden flex flex-col lg:flex-row mainscreen"
    ref="scrollContainer"
  >
    <HistorySidebar class="flex-auto history-sidebar" />

    <div
      class="flex flex-col bg-[#bec7a5] content-between min-w-[50%] flex-auto chatscreen"
    >
      <div className=" ">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="flex flex-col first:mt-[15vh]"
          ref="messageContainer"
        >
          <div
            class="lg:w-[30vw] md:w-[50vw] sm:w-[70vw] w-[100vw] h-fit pr-[15px] mx-[10px] mb-[10px] relative overflow-y-auto text-black sm:ml-auto md:ml-auto lg:ml-auto"
            v-if="message.userMessage !== ''"
          >
            <pre class="rounded-lg shadow-lg user ml-[45px] mr-[45px]">{{
              message.userMessage
            }}</pre>
          </div>

          <div
            class="lg:w-[30vw] md:w-[50vw] sm:w-[70vw] w-[100vw] h-fit pr-[15px] mx-[10px] mb-[10px] relative overflow-y-auto text-black"
          >
            <pre class="rounded-lg bot shadow-lg">{{ message.botMessage }}</pre>
          </div>
        </div>
      </div>
      <div></div>
      <div
        class="p-5 flex flex-row bottom-0 right-0 left-0 w-full sticky z-10 flex-grow-0 mt-auto flex-1"
      >
        <div class="w-screen flex flex-col flex-auto">
          <input
            v-model="newMessage"
            type="text"
            class="w-full text-black font-semibold flex-auto bg-white rounded-full px-[16px] border-gray-300 border-2 text-lg min-h-[66pxs]"
            placeholder="Input your question here"
            @keyup.enter="handleClickSendMessage()"
          />
        </div>
        <button
          class="bg-white p-2 m-2 text-center no-underline inline-block text-base w-12 h-12 cursor-pointer border-gray-300 border-2 text-black font-bold rounded-full shrink-0 hover:bg-transparent hover:border-black hover:border-2"
          @click="handleClickSendMessage()"
        >
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import { defineComponent, onMounted, ref, provide } from "vue";
import axios from "axios";

import HistorySidebar from "./history-sidebar.vue";

import { useSendMessage } from "~/composables/useSendMessage.js";

import { useModalStore } from "~/stores/modal";

const modalStore = useModalStore();

const { sendMessage, newMessage, messages } = useSendMessage();

const data = ref(null);

const config = useRuntimeConfig();
const isLoading = ref(true);

defineComponent({
  name: "CibTelegramPlane",
});

onMounted(async () => {
  try {
    const response = await axios.get(config.public.apiBase);

    data.value = response.data;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
  } finally {
    isLoading.value = false;
  }
});

const windowWidth = ref(window.innerWidth);

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value < 965 && modalStore.sidebar_visible) {
    modalStore.sidebar_visible = false;
    modalStore.sidebar_auto_hidden = true;
  } else if (windowWidth.value >= 965 && modalStore.sidebar_auto_hidden) {
    modalStore.sidebar_visible = true;
    modalStore.sidebar_auto_hidden = false;
  }
};

function handleClickSendMessage() {
  if (newMessage.value === undefined || newMessage.value === "") {
    console.log("");
  } else {
    sendMessage(newMessage.value, "Tin nhắn mẫu");
    newMessage.value = "";
    nextTick(() => {
      scrollToBottom();
    });
  }
}

const scrollContainer = ref(null);

const scrollToBottom = () => {
  const lastMessage = scrollContainer.value?.querySelector(
    ".options:last-child"
  );
  if (lastMessage) {
    lastMessage.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style>
.loader {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: 0 auto;
}

@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}

pre.user {
  background-color: #dcf8c6;
  color: black;
}

pre.bot {
  background-color: whitesmoke;
  margin-left: 45px;
  margin-right: 45px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;

  padding: 14px;
}

.swiper-button-prev,
.swiper-button-next {
  color: black;
  background-color: whitesmoke;
  border-radius: 100%;
  border: 2px solid black;
  width: 45px;
  height: 45px;
  font-size: large;
  font-weight: bold;
}

.swiper-pagination-bullet-active {
  background: #000;
}

.swiper {
  margin: 0 10px 10px 10px;
}

.options {
  display: flex;
  flex-direction: column;
}

@media (max-width: 965px) {
  .mainscreen {
    flex-direction: column;
  }

  .history-sidebar {
    width: 250px;
    height: 100vh;
    z-index: 100;
    background-color: #f4f4f4;
  }

  .chatscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding-top: 20px;
    overflow-y: auto;
    z-index: 1;
  }

  .mainscreen {
    overflow: hidden;
  }
}
</style>
