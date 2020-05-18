<template>
<div class="v-note-edit">

    <v-popup-edit v-if="isPopupEditVisible" 
      v-bind:popup_title="popup_title"
      v-bind:btn_title="btn_title"
      v-bind:index="index"
      @closePopupEdit="closePopupEdit"
      @continuePopupEdit="continuePopupEdit"
    >
      <p>Вы действительно хотите отменить редактирование заметки: "{{new_name_note_comp}}" ?</p>
    </v-popup-edit>

    <router-link :to="{name: 'note_main'}">
      <button class="v-note-edit__p_display v-note-edit_p_display__input">Назад к заметкам</button>
    </router-link>

    <p class="v-note-edit__p_display">
      <input v-model="new_name_todo" placeholder="Введите название задачи" class="v-note-edit_p_display__input">  
      <button @click="add_new_todo" class="v-note-edit_p_display__input">Добавить новую задачу</button>
    </p> 


    <div v-if="isEditNameTodo">
      <p>Заметка: 
        <input style="width: 100px;" v-model="new_name_note_comp"> 
        <button v-on:click="save_name_note">💾</button>
        <button v-on:click="back_name_note" >⬅</button>
      </p>
    </div>
    <div v-else>
      <p>Заметка: {{note.name_note}}
        <button v-on:click="edit_name_note">✏️</button>
        <!--button v-on:click="show_v_popup">🗑️</button-->
      </p>
    </div>


    <v-task-edit 
      v-for="(todo, index) in note.todo_list" 
      v-bind:key="index" 
      v-bind:index="index" 
      v-bind:todo="todo"
      @save_name_todo = "save_name_todo"
      @Delete_todo = "delete_todo(index)"
      @complete_todo = "complete_todo(index)"
    >
    </v-task-edit>


    <div style="display:block;">
    <div v-if="isSaveChangesActive">  
      <button @click="save_changes" class="v-note-edit__p_display v-note-edit_p_display__input">
        Сохранить изменения
      </button>
    </div>
    <div v-else>
      <button @click="save_changes" class="v-note-edit__p_display v-note-edit_p_display__input" disabled>
        Сохранить изменения
      </button>
    </div>

    <div v-if="isCancelChangesActive">  
      <button @click="cancel_changes" class="v-note-edit__p_display v-note-edit_p_display__input">
        Отменить изменения
      </button>
    </div>
    <div v-else>
      <button @click="cancel_changes" class="v-note-edit__p_display v-note-edit_p_display__input" disabled>
        Отменить изменения
      </button>
    </div>

    <div v-if="isReturnCancelChangesActive">  
      <button @click="return_cancel_changes" class="v-note-edit__p_display v-note-edit_p_display__input">
        Повторить отмененное изменение
      </button>
    </div>
    <div v-else>
      <button @click="return_cancel_changes" class="v-note-edit__p_display v-note-edit_p_display__input" disabled>
        Повторить отмененное изменение
      </button>
    </div>
    </div>


</div>
</template>

<script>

import vTaskEdit from '../task/v-task-edit.vue'
import vPopupEdit from '../popup/v-popup-edit.vue'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'v-note-edit',
  components: {
    vTaskEdit,
    vPopupEdit
  },
  data() {
    return {
      new_name_todo: '',
      new_name_note: '',
      isEditNameTodo: false,
      isPopupVisible: false,
      isPopupEditVisible: false,
      isSaveChangesActive: false,
      isCancelChangesActive: false,
      isReturnCancelChangesActive: false,
      popup_title: '',
      btn_title: '',
      note_copy_return: {},
      note_copy: {}
    }
  },
  props: {
      note: {
        type: Object
      },
      index: {
        type: Number
      }
  },

  computed: {
    ...mapGetters([
      'NOTE_LIST'
    ]),

    new_name_note_comp: {
      get: function(){
        if (this.new_name_note.trim() != ''){
          return this.new_name_note;
        } else {
          return this.note.name_note;
        }
      },
      set: function(newValue){
        this.new_name_note = newValue.trim();
      }
    },


  },

  methods: {
    ...mapActions([
      'ADD_TODO_IN_NOTE_LIST',
      'EDIT_TODO_IN_NOTE_LIST',
      'CANCEL_CHANGES_NOTE_LIST',
      'COMPLETE_TODO_IN_NOTE_LIST',
      'DELETE_TODO_IN_NOTE_LIST',
      'DELETE_NOTE_IN_NOTE_LIST',
      'EDIT_NOTE_IN_NOTE_LIST'
    ]),

    edit_name_note: function(){
      this.isEditNameTodo = !this.isEditNameTodo;
    },

    save_name_note: function(){

      if (this.new_name_note.trim() != ''){
        this.EDIT_NOTE_IN_NOTE_LIST([this.index, this.new_name_note]);
      }
      else {
        this.EDIT_NOTE_IN_NOTE_LIST([this.index, this.note.name_note]);
      }

      this.isEditNameTodo = !this.isEditNameTodo;
      this.new_name_note = '';
      this.isSaveChangesActive = true;
    },

    back_name_note: function (){
      this.popup_title = "Редактирование заметки";
      this.btn_title = "Продолжить редактировать";      
      this.isPopupEditVisible = true;      
    },

    show_v_popup: function(){
      this.popup_title = "Удаление заметки";
      this.btn_title = "Удалить";   
      this.isPopupVisible = true;
    },

    closePopup: function(){
      this.isPopupVisible = false;
    },

    deletePopup: function(){
      this.isPopupVisible = false;
      this.DELETE_NOTE_IN_NOTE_LIST(this.index);
    },

    closePopupEdit: function(){
      this.isPopupEditVisible = false;
      this.isEditNameTodo = !this.isEditNameTodo;
    },

    continuePopupEdit: function(){
      this.isPopupEditVisible = false;
      this.new_name_note_comp = this.new_name_note;
    },

    add_new_todo: function() {
      
      if (this.new_name_todo.trim() != ''){
        this.ADD_TODO_IN_NOTE_LIST([this.index, this.new_name_todo]);
        this.isSaveChangesActive = true;
      }
      this.new_name_todo = '';
    },

    save_name_todo: function(index, name_todo, new_name_todo) {

      if (new_name_todo!=''){
        this.EDIT_TODO_IN_NOTE_LIST([this.index, index, new_name_todo]);
      }
      else {
        this.EDIT_TODO_IN_NOTE_LIST([this.index, index, name_todo]);
      }
      this.isSaveChangesActive = true;
    },

    delete_todo: function(index){
      this.DELETE_TODO_IN_NOTE_LIST([this.index, index]);
      this.isSaveChangesActive = true;
    },

    complete_todo: function(index){
      this.COMPLETE_TODO_IN_NOTE_LIST([this.index, index]);
      this.isSaveChangesActive = true;
    },


/*
Отменяем отмену изменения, возвращая состояние после редактирования
*/
    return_cancel_changes: function(){
      this.CANCEL_CHANGES_NOTE_LIST([this.index, this.note_copy_return]);
    },


/*
Отменяем изменения (сохраняя предыдущее состояние заметки, 
т.е. с теми изменениями которые были произведены)
*/
    cancel_changes: function(){
      console.log('index note = ', this.index);
      console.log('note copy = ', this.note_copy);

      this.note_copy_return = JSON.parse(JSON.stringify(this.note));

      this.CANCEL_CHANGES_NOTE_LIST([this.index, this.note_copy]);
      this.isReturnCancelChangesActive = true;
    },

/*
Сохраняем копию заметки на момент редактирования 
и сохраняем все заметки с изменениями в localStorage 
*/
    save_changes: function(){

      this.note_copy = JSON.parse(JSON.stringify(this.note));

      const parsed = JSON.stringify(this.NOTE_LIST);
      localStorage.setItem('note_list', parsed);
      
      this.isCancelChangesActive = true;
      
    }

  }

}
</script>

<style lang="scss">

  .v-note-edit {
    max-width: 500px;
    margin: 15px;
    padding: 15px;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
    border-radius: 5px 5px 5px 5px;
    background-color: rgba(201, 247, 181, 0.3);
}

.v-note-edit__p_display {
    align-self: center;

}

.v-note-edit_p_display__input {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 400;

    padding: 5px; 
    margin: 5px;
  }
</style>