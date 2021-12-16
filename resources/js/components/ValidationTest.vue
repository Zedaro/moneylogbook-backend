<template>
  <div>

    <validation-observer v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submit)">
        <validation-provider rules="text" v-slot="{ errors }">
          <input type="text" v-model="text">
          <span>{{ errors[0] }}</span>
        </validation-provider>
        <v-btn type="submit"  >Button</v-btn>
      </form>
    </validation-observer>

  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate";
import { extend } from "vee-validate";

extend('text', {
  // eslint-disable-next-line no-unused-vars
  validate(text) {



    return {
      required: true,
      valid: false,
      message: 'invalid, görl'
    };
  },
  computesRequired: true
});

export default {
  name: "ValidationTest",
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      text: ''
    };
  },
  methods: {
    submit() {
      console.log('submitted');
    }
  }
}
</script>

<style scoped>
  div {
    margin-top: 100px;
    height: 100px;
    border: 5px black solid;
  }

  input {
    background-color: lightgrey;
  }
</style>