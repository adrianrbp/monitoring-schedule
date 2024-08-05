<template>
  <select
    aria-label="Selecciona un Servicio"
    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    @change="selectService($event.target.value)"
  >
    <option value="">Servicio</option>
    <option
      v-for="service in services"
      :key="service.id"
      :value="service.id"
      :aria-label="service.name"
    >
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
  fetchServices: () => Promise<void>;
  selectService: (serviceId: string) => void;
};

if (!shiftManagement) {
  throw new Error("shiftManagement not provided");
}

const { services, fetchServices, selectService } = shiftManagement;

onMounted(() => {
  fetchServices();
});
</script>

<style scoped></style>
