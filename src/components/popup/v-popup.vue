<template>
<div class="v-popup_wrapper" ref="v-popup_wrapper">
  <div class="v-popup">
    <div class="v-popup__header">
        <span>{{popup_title}}</span>
        <span>
            <i class="material-icons" @click="closePopup">close</i>
        </span>
    </div>
    <div class="v-popup__content">
        <slot></slot>
    </div>
    <div class="v-popup__footer">
        <button class="close_modal" v-on:click="closePopup">Отмена</button>
        <button class="submit_btn" v-on:click="submit_btn">{{btn_title}}</button>
    </div>
  </div>
</div>
</template>

<script>



export default {
  name: 'v-popup',
  data() {
    return {}
  },
  props: {
      popup_title: {
          type: String
      },
      btn_title: {
          type: String,
          default: 'Ok'
      },
      index: {
          type: Number
      }
  },
  methods: {
      closePopup() {
          console.log('closepopup popup');
          this.$emit('closePopup');
      },
      submit_btn(){
          console.log('deletepopup index', this.index);
          this.$emit('deletePopup', this.index);
      }
  },
  mounted() {
      let vm = this;
      document.addEventListener('click', function(item){
          if (item.target === vm.$refs['v-popup_wrapper']){
              vm.closePopup();
              //console.log('123');
          }
      })
  }
}
</script>

<style lang="scss">
    .v-popup_wrapper {
        background: rgba(17, 16, 16, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
    }
    .v-popup {
        padding: 16px;
        position: fixed;
        top: 50px;
        width: 300px;
        background: #ffffff;
        box-shadow: 0 0 17px 0 #161515;
        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &__content {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .submit_btn {
            padding: 8px;
            color: #ffffff;
            background: #11c20b;
        }
        .close_modal{
            padding: 8px;
            color: #ffffff;
            background: #cc0b0b;
        }
    }

    .material-icons {
        cursor: pointer;
    }
</style>