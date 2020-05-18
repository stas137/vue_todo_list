<template>
<div class="v-task-edit">

    <v-popup v-if="isPopupVisible" 
      v-bind:popup_title="popup_title"
      v-bind:btn_title="btn_title"
      v-bind:index="index"
      @closePopup="closePopup" 
      @deletePopup="deletePopup"
    >
      <p>Вы действительно хотите удалить задачу: "{{todo.name_todo}}" ?</p>
    </v-popup>

    <v-popup-edit v-if="isPopupEditVisible" 
      v-bind:popup_title="popup_title"
      v-bind:btn_title="btn_title"
      v-bind:index="index"
      @closePopupEdit="closePopupEdit"
      @continuePopupEdit="continuePopupEdit"
    >
      <p>Вы действительно хотите отменить редактирование задачи: "{{new_name_todo_comp}}" ?</p>
    </v-popup-edit>

    <div class="todo-item" :class="{ completed: todo.completed }">
      <div v-if="isEditNameTodo" >
        <p>Задача: 
          <input style="width: 100px;" v-model="new_name_todo_comp"> 
          <button v-on:click="save_name_todo">💾</button>
          <button v-on:click="back_name_todo" >⬅</button>
        </p>
      </div>
      <div v-else>
        <div v-if="todo.completed">
          <p>
            <input type="checkbox" @click="complete_todo" v-model="todo.completed">
            Задача: {{todo.name_todo}} 
            <button disabled>✏️</button>
            <button disabled>🗑️</button>
          </p>
        </div>
        <div v-else>
          <p>
            <input type="checkbox" @click="complete_todo" v-model="todo.completed">
            Задача: {{todo.name_todo}} 
            <button v-on:click="edit_name_todo">✏️</button>
            <button v-on:click="show_v_popup">🗑️</button>
          </p>
        </div>
      </div>
    </div>

</div>
</template>

<script>

import vPopup from '../popup/v-popup'
import vPopupEdit from '../popup/v-popup-edit'

export default {
  name: 'v-task-edit',
  components: {
    vPopup,
    vPopupEdit
  },
  data() {
    return {
      isEditNameTodo: false,
      new_name_todo: '',
      isPopupVisible: false,
      isPopupEditVisible: false,
      popup_title: '',
      btn_title: '',
    }
  },
  props: {
    todo: {
      type: Object
    },
    index: {
      type: Number
    }
  },

  computed: {

    new_name_todo_comp: {
      get: function(){
        if (this.new_name_todo.trim()!=''){
          return this.new_name_todo;
        } else {
          return this.todo.name_todo;
        }
      },
      set: function(newValue){
        this.new_name_todo = newValue;
      }
    }
    
  },

  methods: {

    edit_name_todo: function(){
      this.isEditNameTodo = !this.isEditNameTodo;

    },

    save_name_todo: function(){

      this.isEditNameTodo = !this.isEditNameTodo;

      if (this.new_name_todo.trim() != ''){
        this.$emit('save_name_todo', this.index, this.todo.name_todo, this.new_name_todo);
      }
      else {
        this.$emit('save_name_todo', this.index, this.todo.name_todo, '');
      }
    },

    complete_todo: function(){
      this.$emit('complete_todo');
    },
    

    back_name_todo: function(){
        //this.isEditNameTodo = !this.isEditNameTodo;
      this.isPopupEditVisible = true;
      this.popup_title= 'Редактирование задачи';
      this.btn_title= 'Продолжить редактировать';
    },

    closePopupEdit: function(){
      this.isPopupEditVisible = false;
      this.isEditNameTodo = false;
    },

    continuePopupEdit: function(){
      this.isPopupEditVisible = false;
    },

    show_v_popup: function(){
      console.log('show popup');
      this.popup_title= 'Удаление задачи';
      this.btn_title= 'Удалить';
      this.isPopupVisible = true;
    },
    closePopup: function(){
      this.isPopupVisible = false;
    },
    deletePopup: function(index){
      console.log('delete popup = ', index);
      this.isPopupVisible = false;
      this.$emit('Delete_todo')
    }
  }

}
</script>

<style lang="scss">

    .v-task-edit {

      max-width: 300px;
      margin: 15px;
      padding: 15px;
      box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
      border-radius: 5px 5px 5px 5px;
      background-color: white;
    } 

    .completed {
      text-decoration: line-through;
      color: grey;
    }

</style>