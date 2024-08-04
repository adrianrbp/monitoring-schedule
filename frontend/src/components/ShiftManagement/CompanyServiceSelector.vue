<template>
  <select
    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    @change="selectService($event.target.value)"
  >
    <option value="">Select a service</option>
    <option v-for="service in services" :key="service.id" :value="service.id">
      {{ service.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import { CompanyService } from "@/api/types";

// Inject the mixin from the parent
const shiftManagement = inject("shiftManagement") as {
  services: CompanyService[]; // ref
  selectedService: { value: number | null }; // ref
  fetchServices: () => Promise<void>;
};

if (!shiftManagement) {
  throw new Error("shiftManagement not provided");
}

const { services, selectedService, fetchServices } = shiftManagement;

const selectService = (serviceId: string) => {
  selectedService.value = Number(serviceId);
};

onMounted(() => {
  fetchServices();
});
</script>

<style scoped></style>
