<template>
  <div>
    <div class="input_container">
      <el-input type="password" @input="p_len" v-model="password" placeholder="输入密码"/>
      <span v-bind:class="{ valid_password_length: valid_password_length , show_password_length: typed}"
            class="password_length">{{password_length}}</span></div>
    <div class="lnu_container">
      <p v-bind:class="{ lovercase_valid: contains_lovercase }">小写字母</p>
      <p v-bind:class="{ number_valid: contains_number }">数字</p>
      <p v-bind:class="{ uppercase_valid: contains_uppercase }">大写字母</p>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        password: null,
        password_length: 0,
        typed: false,
        contains_lovercase: false,
        contains_number: false,
        contains_uppercase: false,
        valid_password_length: false,
        valid_password: false
      }
    },
    methods: {
      p_len: function () {
        this.password_length = this.password.length;
        if (this.password_length > 5) {
          this.valid_password_length = true;
        } else {
          this.valid_password_length = false;
        }

        if (this.password_length > 0) {
          this.typed = true;
        } else {
          this.typed = false;
        }

        this.contains_lovercase = /[a-z]/.test(this.password);
        this.contains_number = /\d/.test(this.password);
        this.contains_uppercase = /[A-Z]/.test(this.password);

        // Check if the password is valid
        if (this.contains_lovercase == true && this.contains_number == true) {
          this.valid_password = false;
          if (
            this.contains_uppercase == true &&
            this.valid_password_length == true
          )
            this.valid_password = true;
        } else {
          this.valid_password = false;
        }
        this.$emit('save-pwd', this.password, this.valid_password, this.valid_password_length);
      }
    }
  }
</script>

<style scoped>
  *,
  *:before,
  *:after {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }

  input[type="password"]::-webkit-input-placeholder {
    color: rgba(71, 87, 98, 0.8);
  }

  input[type="password"]::input-placeholder {
    color: rgba(71, 87, 98, 0.8);
  }

  .input_container {
    display: block;
    /*margin: 0 auto;*/
    /*width: 320px;*/
    height: auto;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 10px;
  }

  input[type="password"] {
    width: 430px;
    height: auto;
    border: 1px solid transparent;
    background: #EEEEEE;
    color: #475762;
    font-size: 15px;
    border-radius: 4px;
    padding: 12px 5px;
    overflow: hidden;
    outline: none;
    -webkit-transition: all .1s;
    transition: all .1s;
  }

  input[type="password"]:focus {
    border: 1px solid #2196F3;
  }

  .password_length {
    padding: 2px 10px;
    position: absolute;
    top: 50%;
    right: 0px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    background: #FBD490;
    color: rgba(71, 87, 98, 0.8);
    border-radius: 4px;
    font-size: 13px;
    display: none;
    -webkit-transition: all .1s;
    transition: all .1s;
  }

  .valid_password_length {
    background: #00AD7C;
    color: rgba(255, 255, 255, 0.9);
  }

  .show_password_length {
    display: block;
  }

  .lnu_container {
    display: block;
    margin: 10px auto;
    width: 320px;
    height: auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .lnu_container p {
    width: 100px;
    height: auto;
    font-size: 12px;
    line-height: 1.2;
    text-align: center;
    border-radius: 2px;
    color: rgba(71, 87, 98, 0.8);
    background: -webkit-linear-gradient(left, #00AD7C 50%, #eee 50%);
    background: linear-gradient(to right, #00AD7C 50%, #eee 50%);
    background-size: 201% 100%;
    background-position: right;
    -webkit-transition: background .3s;
    transition: background .3s;
  }

  .lovercase_valid,
  .number_valid,
  .uppercase_valid {
    background-position: left !important;
    color: rgba(255, 255, 255, 0.9) !important;
  }

  .valid_password_container {
    display: block;
    margin: 10px auto;
    border-radius: 4px;
    position: relative;
    background: #00AD7C;
    width: 20px;
    height: 20px;
    visibility: hidden;
    opacity: 0;
  }

  .show_valid_password_container {
    visibility: visible;
    opacity: 1;
  }

  .tick {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: white;
    stroke-width: 25;
    stroke-linecap: round;
    stroke-dasharray: 180;
    stroke-dashoffset: 180;
  }

  .checked {
    -webkit-animation: draw 0.5s ease forwards;
    animation: draw 0.5s ease forwards;
  }

  @-webkit-keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }

</style>
