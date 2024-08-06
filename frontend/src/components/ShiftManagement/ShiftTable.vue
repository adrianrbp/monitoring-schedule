<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div
      v-for="shift in shifts"
      :key="shift.day"
      class="border rounded-lg p-4 shadow-lg bg-white"
      :aria-label="`Day ${shift.day}`"
      role="table"
    >
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-yellow-100">
          <tr>
            <th
              colspan="2"
              class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
              :aria-label="`Header ${shift.day}`"
            >
              {{ shift.day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="timeBlock in shift.time_blocks"
            :key="timeBlock.start_time"
            :aria-label="`Time block ${shift.day} ${timeBlock.start_time}`"
          >
            <td
              class="py-2 px-4"
              :class="getColor(timeBlock.engineer)"
              :aria-label="`Hour ${timeBlock.start_time}`"
            >
              {{ timeBlock.start_time }} - {{ timeBlock.end_time }}
            </td>
            <td
              class="py-2 px-4"
              :style="{ backgroundColor: getEngineerColor(timeBlock.engineer) }"
              :aria-label="`Engineer Assigned ${getEngineerName(
                timeBlock.engineer
              )}`"
            >
              {{ getEngineerName(timeBlock.engineer) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";

const shiftManagement = inject("shiftManagement");

const { shifts, getEngineerColor } = shiftManagement;

const getColor = (engineer) => {
  return engineer ? "bg-green-200" : "bg-red-200";
};

const getEngineerName = (engineer) => {
  return engineer ? engineer.name : "⚠";
};
</script>

<style scoped></style>
