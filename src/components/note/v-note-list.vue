<template>

  <div class="v-note-list">
    
    <v-popup v-if="isPopupVisible" 
      v-bind:popup_title="popup_title"
      v-bind:btn_title="btn_title"
      v-bind:index="index"
      @closePopup="closePopup" 
      @deletePopup="deletePopup"
    >
      <p>Вы действительно хотите удалить заметку: "{{note.name_note}}" со всеми задачами?</p>
    </v-popup>

    <div style="display:block;">
        Заметка: {{note.name_note}} 

        <router-link :to="{name: 'note_edit', params: {note: note, index: index}}">
          <button @click="show_note">✏️</button>
        </router-link>

        <button v-on:click="show_v_popup">🗑️</button>
    </div>

    <hr />

    <v-task-short-list
      v-for="(todo, index) in note.todo_list.slice(0, 3)" 
      v-bind:key="index" 
      v-bind:index="index"
      v-bind:todo="todo"
    >
    </v-task-short-list>
    <p>...</p>
    <hr />

  </div>
</template>


<script>

import vPopup from '../popup/v-popup'
import vTaskShortList from '../task/v-task-short-list'


export default {
  name: 'v-note-list',
  components: {
    vPopup,
    vTaskShortList
  },
  props: {
    note: {
      type: Object
    },
    index: {
      type: Number
    }

  },
  data() {
      return {

          new_note_name: '',
          isPopupVisible: false,
          popup_title: 'Удаление заметки',
          btn_title: 'Удалить',

      }
  },

  computed: {

    new_note_name_comp: {
      get: function(){
        return this.note.name_note;
      },
      set: function(newValue){
        this.new_note_name = newValue;
      }
    }
  },

  methods: {

    show_v_popup: function(){
      this.isPopupVisible = true;
    },

    closePopup: function(){
      this.isPopupVisible = false;
    },

    deletePopup: function(){
      this.isPopupVisible = false;
      this.$emit('Delete_note');
    },

    show_note: function(){
      console.log(this.note);

    }
  }

}
</script>

<style>

.v-note-list {
    max-width: 500px;
    margin: 5px;
    padding: 15px;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.7);
    border-radius: 5px 5px 5px 5px;
    background-color: rgba(201, 247, 181, 0.3);
}
</style>