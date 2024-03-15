<template>
   <svg aria-hidden="true">
       
    <use :xlink:href="`#${prefix}-${name}`" />
     
  </svg>
</template>
​
<script>
import { defineComponent } from 'vue'
​
export default defineComponent({
  props: {
    prefix: {
      type: String,
      default: 'icon'
    },
    name: {
      type: String,
      required: true,
    },
  }
})
</script>
