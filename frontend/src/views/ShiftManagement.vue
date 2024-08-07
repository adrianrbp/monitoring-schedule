<template>
  <div class="flex flex-col space-y-4">
    <h1 class="text-center">Company Service Shifts</h1>
    <button
      @click="toggleAvailabilityView"
      class="mx-auto mt-4 px-4 py-2 max-w-xs bg-green-400 text-white rounded"
    >
      {{ showAvailabilityTable ? "Ver Turnos" : "Editar Disponibilidad" }}
    </button>

    <div class="w-full max-w-xs mx-auto">
      <div v-if="errorMessage" class="w-full text-center">
        {{ errorMessage }}
      </div>
      <div v-if="statusMessage" class="w-full text-center">
        {{ statusMessage }}
      </div>
      <CompanyServiceSelector />
      <WeekSelector />
      <div>{{ dateRange }}</div>
    </div>
    <section v-if="selectedService && selectedWeek">
      <article v-if="!showAvailabilityTable">
        <EngineerList />
      </article>
      <article class="flex max-w-3xl mx-auto">
        <ShiftTable />
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { provide, onMounted } from "vue";
import { useShiftManagement } from "@/mixins/useShiftManagement";
import { useAvailabilityManagement } from "@/mixins/useAvailabilityManagement";
import CompanyServiceSelector from "@/components/ShiftManagement/CompanyServiceSelector.vue";
import WeekSelector from "@/components/ShiftManagement/WeekSelector.vue";
import EngineerList from "@/components/ShiftManagement/EngineerList.vue";
import ShiftTable from "@/components/ShiftManagement/ShiftTable.vue";

const shiftManagement = useShiftManagement();
// Provide mixin to child components
provide("shiftManagement", shiftManagement);

onMounted(() => {
  shiftManagement.fetchServices();
});

const { errorMessage, selectedService, selectedWeek, dateRange } =
  shiftManagement;

const availabilityManagement = useAvailabilityManagement(
  selectedService,
  selectedWeek
);

provide("availabilityManagement", availabilityManagement);

const { statusMessage, showAvailabilityTable, toggleAvailabilityView } =
  availabilityManagement;
</script>

<style scoped></style>
