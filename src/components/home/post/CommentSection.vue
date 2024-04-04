<template>
  <div class="max-h-56 overflow-y-auto">
    <div
      v-for="comment in 20"
      :key="comment"
      class="py-3 border-t border-b flex justify-between items-start px-4"
    >
      <div>
        <div>Ramstein</div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, quos?
        </div>
      </div>

      <div>
        <button
          type="button"
          class="border rounded-md p-2 bg-red-100 hover:bg-red-200"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import DeleteIcon from "../../icons/DeleteIcon.vue";
</script>
