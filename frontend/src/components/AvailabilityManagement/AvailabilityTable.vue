<template>
  <td v-for="engineer in engineers" :key="engineer.id" class="text-center">
    <input
      type="checkbox"
      :checked="isEngineerAvailable(day, timeBlock, engineer.id)"
      @change="updateAvailability(day, timeBlock, engineer.id)"
    />
  </td>
</template>

<script setup lang="ts">
import { type Ref, inject, defineProps } from "vue";
import { Engineer, DayAvailability } from "@/api/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  day: string;
  timeBlock: string;
  engineers: Engineer[];
}>();

const shiftManagement = inject("shiftManagement") as {
  engineers: Ref<Engineer[]>;
};
const { engineers } = shiftManagement;

interface AvailabilityManagement {
  availabilities: Ref<DayAvailability[]>;
}

const availabilityManagement = inject(
  "availabilityManagement"
) as AvailabilityManagement;

if (!availabilityManagement) {
  throw new Error("Availability management not provided");
}
const { availabilities } = availabilityManagement;

const getEngineerAvailability = (
  day: string,
  time: string,
  engineerId: number
) => {
  const dayData = availabilities.value.find((d) => d.day === day);
  if (!dayData) return null;

  const timeData = dayData.times.find((t) => t.time === time);
  if (!timeData) return null;

  return timeData.engineers.find((e) => e.id === engineerId) || null;
};

const isEngineerAvailable = (day: string, time: string, engineerId: number) => {
  const engineerData = getEngineerAvailability(day, time, engineerId);
  return engineerData ? engineerData.available : false;
};

const updateAvailability = (day: string, time: string, engineerId: number) => {
  const engineerData = getEngineerAvailability(day, time, engineerId);
  if (engineerData) {
    engineerData.available = !engineerData.available; // Toggle availability
  }
};
</script>
