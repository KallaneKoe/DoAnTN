<template>
  <div
    v-show="modalStore.sidebar_visible"
    class="sticky top-0 bottom-0 left-0 z-[100]"
    :key="modalStore.sidebar_visible"
    :class="[
      modalStore.isAnimating
        ? 'animate__animated animate__fadeOutLeft'
        : 'animate__animated animate__fadeInLeft',
    ]"
    @animationend="modalStore.handleAnimationEnd"
  >
    <div
      class="h-screen sticky top-0 bottom-0 max-w-[50vw] min-w-[10vw] w-[90vw] md:w-[50vw] lg:w-[20vw] border-r-gray-300 border-r-2 no-scrollbar"
    >
      <div
        class="flex justify-between items-center p-4 top-0 bg-white h-[10vh] border-b-gray-300 border-b-2"
      >
        <button
          title="Open a new chat"
          @click="clearAllChats()"
          class="text-3xl ml-1 mr-1 text-black"
        >
          <i class="fa-regular fa-square-plus"></i>
        </button>
        <h3 class="break-all text-black font-semibold">Lịch sử Chat</h3>
        <button
          title="Close Sidebar"
          @click="modalStore.toggleSidebar"
          class="text-3xl ml-1 mr-1 text-black"
        >
          <i class="fa-regular fa-square-caret-left"></i>
        </button>
      </div>
      <div></div>
      <div
        class="text-black font-medium p-1 text-center bg-white content-center h-[10vh] max-h-[10vh]"
      >
        Mã lỗi người dùng tìm nhiều nhất
      </div>
      <div
        class="bg-white pt-0 overflow-x-hidden h-[35vh] max-h-[35vh] border-b-gray-300 border-b-2"
      >
        <ul>
          <li class="contents">
            <button>
              <h4
                class="m-2 items-center text-black font-medium bg-white rounded-full border-gray-500 border-2 px-[10px] py-[4px] text-large hover:text-white hover:bg-gray-300"
              >
                1000000
              </h4>
            </button>
          </li>
        </ul>
      </div>
      <div
        class="text-black font-medium p-1 text-center bg-white content-center h-[10vh] max-h-[10vh]"
      >
        Mã lỗi người dùng tìm gần đây nhất
      </div>
      <div
        class="bg-white pt-0 overflow-x-hidden h-[35vh] max-h-[35vh] border-b-gray-300 border-b-2"
      >
        <ul>
          <li class="contents">
            <button>
              <h4
                class="m-2 items-center text-black font-medium bg-white rounded-full border-gray-500 border-2 px-[10px] py-[4px] text-large hover:text-white hover:bg-gray-300"
              >
                1000000
              </h4>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import { useCleanChat } from "~/composables/useCleanChat";

const { clearChat } = useCleanChat();

import { useModalStore } from "~/stores/modal";

const modalStore = useModalStore();

const clearAllChats = () => {
  clearChat();
};
</script>

<style>
li {
  overflow-x: auto;
}

@media (max-width: 768px) {
  .styledContainer {
    width: 70vw;
  }
  .allContainer {
    z-index: 1000;
  }
}

@media (max-width: 965px) {
  .styledContainer {
    width: 50vw;
  }
  .allContainer {
    z-index: 1000;
  }
}
</style>
