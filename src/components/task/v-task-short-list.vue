<template>
<div class="v-task-short-list">
    <p>Задача: {{todo.name_todo}}</p>
</div>
</template>

<script>


export default {
  name: 'v-task-short-list',
  data() {
    return {}
  },
  props: {
    todo: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  methods: {

  }

}
</script>

<style lang="scss">

.v-task-short-list {

    max-width: 300px;
    margin: 15px;
  
    padding: 1px;

    box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
    border-radius: 5px 5px 5px 5px;
    background-color: white;
}

</style>