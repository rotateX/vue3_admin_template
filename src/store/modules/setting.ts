import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayoutSettingStore = defineStore('SettingStore', () => {
  const fold = ref(false)
  const refresh = ref(false)
  function handleFold() {
    fold.value = !fold.value
  }
  return { fold, refresh, handleFold }
})
