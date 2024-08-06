<template>
  <select
    aria-label="Selecciona una Semana"
    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    @change="selectWeek($event.target.value)"
  >
    <option value="">Semana</option>
    <option
      v-for="week in futureWeeks"
      :key="week"
      :value="week.id"
      :aria-label="week.label"
    >
      {{ week.label }}
    </option>
    <option
      v-for="week in pastWeeks"
      :key="week"
      :value="week.id"
      class="bg-gray-400"
    >
      {{ week.label }}
    </option>
  </select>
</template>

<script setup>
import { inject } from "vue";

const shiftManagement = inject("shiftManagement");

if (!shiftManagement) {
  throw new Error("shiftManagement not provided");
}

const { pastWeeks, futureWeeks, selectWeek } = shiftManagement;
</script>
