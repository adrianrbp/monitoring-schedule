<template>
  <div class="flex flex-col space-y-4">
    <div class="w-full max-w-xs mx-auto">
      <label
        for="companyService"
        class="block text-sm font-medium text-gray-700"
        >Select Company Service</label
      >
      <select
        v-model="selectedService"
        @change="handleServiceChange"
        id="companyService"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="0">-- Select Service --</option>
        <option
          v-for="service in companyServices"
          :key="service.id"
          :value="service.id"
        >
          {{ service.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { CompanyService } from "@/api/types";
import { fetchCompanyServices } from "@/api/CompanyServiceApi";

export default defineComponent({
  name: "CompanyServiceDropdown",
  emits: ["serviceSelected"],
  setup(_, { emit }) {
    const companyServices = ref<CompanyService[]>([]);

    const selectedService = ref<number>(0);

    onMounted(async () => {
      companyServices.value = await fetchCompanyServices();
    });

    const handleServiceChange = () => {
      emit("serviceSelected", selectedService.value);
    };

    return {
      companyServices,
      selectedService,
      handleServiceChange,
    };
  },
});
</script>

<style></style>
