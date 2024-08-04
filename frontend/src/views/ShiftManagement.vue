<template>
  <div class="flex flex-col space-y-4">
    <div class="w-full max-w-xs mx-auto">
      <CompanyServiceSelector />
    </div>
    <!-- <WeekSelector />
    <div>{{ dateRange }}</div>
    <EngineerList />
    <ShiftTable /> -->
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-if="selectedService">Service ID: {{ selectedService }}</div>
  </div>
</template>

<script setup lang="ts">
import { provide, onMounted } from "vue";
import { useShiftManagement } from "@/mixins/useShiftManagement";
import CompanyServiceSelector from "@/components/ShiftManagement/CompanyServiceSelector.vue";
// import WeekSelector from "@/components/ShiftManagement/WeekSelector.vue";
// import EngineerList from "@/components/ShiftManagement/EngineerList.vue";
// import ShiftTable from "@/components/ShiftManagement/ShiftTable.vue";

const shiftManagement = useShiftManagement();

// Provide mixin to child components
provide("shiftManagement", shiftManagement);

onMounted(() => {
  shiftManagement.fetchServices();
});

const { errorMessage, selectedService } = shiftManagement;
</script>

<style scoped></style>
