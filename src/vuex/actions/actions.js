import Axios from 'axios';

export default {
    
/*
Получить данные из json файла и установить их для списка заметок
*/        
    GET_NOTE_LIST_FROM_API({commit}){

        //return Axios('http://localhost:3000/note_list', {
        return Axios('http://www.design-k.mcdir.ru/db.json', {
            method: "GET"
        })
        .then((note_list) => {
            commit('SET_NOTE_LIST_TO_STATE', note_list.data);
            return note_list;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
    },

/*
Полученые данные из localStorage файла устанавливаем для списка заметок
*/ 
    GET_NOTE_LIST_FROM_LOCAL({commit}, note_list){
        commit('SET_NOTE_LIST_TO_STATE', note_list);
    },
    
/*
Добавить заметку списка заметок
*/    
    ADD_NOTE_IN_NOTE_LIST({commit}, name_note){
        commit('SET_ADD_NOTE_IN_NOTE_LIST', name_note);
    },

/*
Редактирование заметки из списка заметок
*/    
    EDIT_NOTE_IN_NOTE_LIST({commit}, name_note){
        commit('SET_EDIT_NOTE_IN_NOTE_LIST', name_note);
    },

/*
Отмена изменений для заметки из списка заметок
*/ 
    CANCEL_CHANGES_NOTE_LIST({commit}, note_copy){
        commit('SET_CANCEL_CHANGES_NOTE_LIST', note_copy);
    },

/*
Удаление заметки из списка заметок
*/     
    DELETE_NOTE_IN_NOTE_LIST({commit}, index){
        commit('SET_DELETE_NOTE_IN_NOTE_LIST', index);
    },

/*
Добавляем задачу в заметку
*/     
    ADD_TODO_IN_NOTE_LIST({commit}, name_todo){
        commit('SET_ADD_TODO_IN_NOTE_LIST', name_todo);
    },

/*
Редактироуем задачу из заметки
*/     
    EDIT_TODO_IN_NOTE_LIST({commit}, name_todo){
        commit('SET_EDIT_TODO_IN_NOTE_LIST', name_todo);
    },

/*
Удаляем задачу из заметки
*/     
    DELETE_TODO_IN_NOTE_LIST({commit}, index){
        commit('SET_DELETE_TODO_IN_NOTE_LIST', index);
    },

/*
Отмечаем выполненной задачу в заметке
*/     
    COMPLETE_TODO_IN_NOTE_LIST({commit}, index){
        commit('SET_COMPLETE_TODO_IN_NOTE_LIST', index);
    }
}