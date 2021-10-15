<template>
<div>
  <div class="LoginForm">
  <div class="container">
    <div class="login-form">
      <div class="main-div">
        <div class="panel">
          <h2>Ingrese A Nuestro Sistema</h2>
          <p>Por favor ingrese usuario y contraseña</p>
        </div>
        <form id="Login">
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              v-model="form.email" id="email"
              placeholder="Correo Electronico"
            />
          </div>

          <div class="form-group">
            <input
              type="password"
              class="form-control"
              v-model="form.password" id="pass" 
              placeholder="Contraseña"
            />
          </div>
          <!-- <div class="forgot">
            <a href="/user">Olvido la contraseña</a>
          </div> -->
          <input
            type="button"
            class="btn btn-primary"
            @click="login"
            value="Ingresar"
          />

            <a href="/register" class="btn btn-primary mt-3">Registrarse</a>

        </form>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      let formData = new URLSearchParams();
      formData.append("email", this.form.email);
      formData.append("password", this.form.password);
      axios
        .post("https://yimy-mintic-88.herokuapp.com/login", formData, {
          // axios.post('http://localhost:3000/login',formData,{
          headers: {
            "Access-Control-Allow_Methods": "POST",
            // "x-auth-token":
          },
        })
        .then((response) => {
          // console.log(response.data);
          localStorage.setItem("token", response.data.token);
          this.$router.push("/home");
        });
      // if (this.user) {
      //     localStorage.setItem('user',this.user);
      //     this.$router.push('/home')
      // }
    },
  },
};
</script>

<style scoped>
.LoginForm {
  background-image: url("https://hdwallsource.com/img/2014/9/blur-26347-27038-hd-wallpapers.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: 80px;
}

.form-heading {
  color: #fff;
  font-size: 23px;
}
.panel h2 {
  color: #444444;
  font-size: 18px;
  margin: 0 0 8px 0;
}
.panel p {
  color: #777777;
  font-size: 14px;
  margin-bottom: 30px;
  line-height: 24px;
}
.login-form .form-control {
  background: #f7f7f7 none repeat scroll 0 0;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
.main-div {
  background: #ffffff none repeat scroll 0 0;
  border-radius: 2px;
  margin: 10px auto 30px;
  max-width: 38%;
  padding: 50px 70px 70px 71px;
}

.login-form .form-group {
  margin-bottom: 10px;
}
.login-form {
  text-align: center;
}
.forgot a {
  color: #777777;
  font-size: 14px;
  text-decoration: underline;
}
.login-form .btn.btn-primary {
  background: #f0ad4e none repeat scroll 0 0;
  border-color: #f0ad4e;
  color: #ffffff;
  font-size: 14px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0;
}
.forgot {
  text-align: left;
  margin-bottom: 30px;
}
.botto-text {
  color: #ffffff;
  font-size: 14px;
  margin: auto;
}
.login-form .btn.btn-primary.reset {
  background: #ff9900 none repeat scroll 0 0;
}
.back {
  text-align: left;
  margin-top: 10px;
}
.back a {
  color: #444444;
  font-size: 13px;
  text-decoration: none;
}
</style>