<template>
  <div id="app" class="w-full mx-auto mt-10">
    <ShiftManagement />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ShiftManagement from "@/views/ShiftManagement.vue";

export default defineComponent({
  name: "App",
  components: {
    ShiftManagement,
  },
  mounted() {
    document.title = "Company Service Shifts";
  },
});
</script>

<style></style>
