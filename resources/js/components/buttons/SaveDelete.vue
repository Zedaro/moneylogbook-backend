<template>

  <div>
    <v-btn v-if="this.$route.params.item !== 'new'" class="delete-button mx-2" fab dark medium color="red" @click="deleteData">
      <v-icon dark>mdi-delete</v-icon>
    </v-btn>
    <v-btn type="submit" class="save-button mx-2" fab dark medium color="green">
      <v-icon dark>mdi-check</v-icon>
    </v-btn>
  </div>

</template>

<script>
export default {
  name: "SaveDelete",
  data() {
    return {
      /*
      accountData : {
        item: this.$route.params.item,
        accountName: this.name,
        money: this.money,
        color: this.color
      }
       */
    };
  },
  methods: {
    /*
    buttonClicked(button) {
      const data = {
        item: this.$route.params.item,
        name: this.name,
        money: this.money,
        color: this.color
      };
      if(button == 'delete') {
        this.methods.saveData(data);
      } else {
        this.methods.saveData(data);
      }
    },
     */
    deleteData() {
      this.$emit('deleteData');
    },
    saveData() {
      this.$emit('saveData');
    }
  },
  /*
  watch: {
    name() {
      console.log(this.name);
    },
    color() {
      console.log(this.color);
    }
  }
   */
}
</script>

<style scoped>

  .container {
    position: fixed;
    left: 25%;
    /*top: 80%;*/
    top: 92%;
    width: 50%;
    /* border: black solid 1px; */
  }

  .delete-button {
    position: fixed;
    top: 90%;
    left: calc(25% - 28px);
  }

  .save-button {
    position: fixed;
    top: 90%;
    left: calc(75% - 28px);
  }

  @media only screen and (min-width: 1264px) {
    .delete-button {
      position: fixed;
      top: 90%;
      left: calc(35% - 28px);
    }

    .save-button {
      position: fixed;
      top: 90%;
      left: calc(65% - 28px);
    }
  }

</style>