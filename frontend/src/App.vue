<template>
  <div id="app" class="max-w-xl mx-auto mt-10">
    <CompanyServiceView />
    <ShiftManagement />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CompanyServiceView from "@/views/CompanyServiceView.vue";
import ShiftManagement from "@/views/ShiftManagement.vue";

export default defineComponent({
  name: "App",
  components: {
    CompanyServiceView,
    ShiftManagement,
  },
  mounted() {
    document.title = "Company Service Shifts";
  },
});
</script>

<style></style>
