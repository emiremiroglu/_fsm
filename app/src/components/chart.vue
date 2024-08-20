 <script>
import Peity from 'vue-peity'
 
export default {
  components: {
    Peity
  },
 
  computed: {
    pieData () {
      return this.data.toString()
    }
  },
 
  data () {
    return {
      data: [1, 2, 3, 2, 2]
    }
  },
 
  created () {
    setInterval(() => {
      // https://vuejs.org/guide/list.html#Mutation-Methods
      this.data.unshift(this.data.pop())
    }, 377)
  }
}
</script>

<template>
  <peity :type="'pie'" :options="{ 'fill': ['red', '#eeeeee'], width: 50, height:50,  'innerRadius': 10, 'radius': 40 }" :data="pieData"></peity>
</template>
