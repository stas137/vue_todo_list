<template>
  <div class="v-note-main">

    <div class="v-note-main_p_display">
      <input v-model="new_name_note" placeholder="Введите новую заметку" class="v-note-main_p_display__input"> 
      <button @click="add_new_note" class="v-note-main_p_display__input">Добавить новую заметку</button>
    </div> 

    <hr />

    <v-note-list 
      v-for="(note, index) in NOTE_LIST"  
      v-bind:note="note" 
      v-bind:key="index" 
      v-bind:index="index"
      v-on:Delete_note="delete_note(index)"
    >
    </v-note-list>
  </div>
</template>


<script>

import vNoteList from './v-note-list'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'v-note-main',
  components: {
    vNoteList
  },

  data() {
     return {
      new_name_note: '',
      note_list: {}
    }
  },
  computed: {
    ...mapGetters([
      'NOTE_LIST'
    ]),
  },
  methods: {
    ...mapActions([
        'GET_NOTE_LIST_FROM_API',
        'ADD_NOTE_IN_NOTE_LIST',
        'DELETE_NOTE_IN_NOTE_LIST',
        'GET_NOTE_LIST_FROM_LOCAL'  
    ]),

    save_to_localStorage(){
          const parsed = JSON.stringify(this.NOTE_LIST);
          localStorage.setItem('note_list', parsed);
          console.log('Data local saved');
    },

    load_from_localStorage(name_item){
        this.note_list = JSON.parse(localStorage.getItem(name_item));
        console.log(this.note_list);
    },

    add_new_note: function(){

        console.log("New name note: ", this.new_name_note);
        if (this.new_name_note.trim() != '') {
          this.ADD_NOTE_IN_NOTE_LIST(this.new_name_note);

          this.new_name_note = '';

          this.save_to_localStorage();
        }
        

    },

    delete_note: function(index){
      console.log("Delete name note, index: ", index);
      this.DELETE_NOTE_IN_NOTE_LIST(index);

      this.save_to_localStorage();
    },
    
  },

  mounted() {

/*
если локальное хранилище не пустое загружаем из него данные
иначе загружаем данные из json и сохраняем в локальное хранилище
*/
    if (localStorage.getItem('note_list')) {
      try {
        this.load_from_localStorage('note_list');

        this.GET_NOTE_LIST_FROM_LOCAL(this.note_list);

      } catch(e) {
        localStorage.removeItem('note_list');
      }

    }
    else {
      this.GET_NOTE_LIST_FROM_API()
      .then((response) => {
      if (response.data){
        console.log('Data arrived');
      }
      });
      
      this.save_to_localStorage();
    }
  }
}
</script>


<style>

.v-note-main {

    justify-content: center;

    margin-top: 15px;
    margin-bottom: 0px;

    padding: 15px;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
    border-radius: 5px 5px 5px 5px;
}
    
.v-note-main_p_display {

    align-self: center;

}

.v-note-main_p_display__input {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 400;

    padding: 5px; 
    margin: 5px;
  }


</style>