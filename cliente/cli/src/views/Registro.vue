<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ mensaje.texto }}
    </b-alert>
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                  <div class="card-header">
                    <h3 class="text-center font-weight-light my-4">
                      Crear una Cuenta
                    </h3>
                  </div>
                  <div class="card-body">
                    <form @submit.prevent="agregarUsuario()">
                      <div class="row mb-3">
                        <div class="col-md-6">
                          <div class="form-floating mb-3 mb-md-0">
                            <input
                              required
                              class="form-control"
                              v-model="user.name"
                              type="text"
                              placeholder="Nombre Completo"
                            />
                            <label for="inputFirstName">Nombre</label>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-floating">
                            <input
                              required
                              class="form-control"
                              v-model="user.tipoId"
                              type="text"
                              placeholder="Tipo de Documentación"
                            />
                            <label for="inputFirstName">Tipo ID</label>
                          </div>
                        </div>
                      </div>

                       <div class="row mb-3">
                        <div class="col-md-6">
                          <div class="form-floating mb-3 mb-md-0">
                            <input
                              required
                              class="form-control"
                              v-model="user.numberIden"
                              type="number"
                              placeholder="Número de identificación"
                            />
                            <label for="inputFirstName">Número ID</label>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-floating">
                            <input
                              required
                              class="form-control"
                              v-model="user.address"
                              type="text"
                              placeholder="Dirección"
                            />
                            <label for="inputFirstName">Dirección</label>
                          </div>
                        </div>
                      </div>
                       <div class="row mb-3">
                        <div class="col-md-6">
                          <div class="form-floating mb-3 mb-md-0">
                            <input
                              required
                              class="form-control"
                              v-model="user.phone"
                              type="number"
                              placeholder="Telefono"
                            />
                            <label for="inputFirstName">Telefono</label>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-floating">
                            <input
                              required
                              class="form-control"
                              v-model="user.gender"
                              type="text"
                              placeholder="Genero"
                            />
                            <label for="inputFirstName">Genero</label>
                          </div>
                        </div>
                      </div>
                      
                      <div class="form-floating mb-3">
                        <input
                          class="form-control"
                          id="inputEmail"
                          type="email"
                          placeholder="Email"
                          v-model="user.email"
                          required
                        />
                        <label for="inputEmail">Email</label>
                      </div>
                         <div class="form-floating mb-3">
                        <input
                          class="form-control"
                          id="inputEmail"
                          type="date"
                          placeholder="Fecha De Nacimiento"
                          v-model="user.fechNaci"
                          required
                        />
                        <label for="inputEmail">Fecha de Nacimiento</label>
                      </div>
                      <div class="row mb-3">
                        <div class="col-md-6">
                          <div class="form-floating mb-3 mb-md-0">
                            <input
                              class="form-control"
                              type="password"
                              placeholder="Create a password"
                              v-model="user.password"
                            />
                            <label for="inputPassword">Contraseña</label>
                          </div>
                        </div>
                        <div class="col-md-6">
                         <div class="form-floating mb-3 mb-md-0">
                            <input
                              class="form-control"
                              type="text"
                              placeholder="Rol"
                              v-model="user.rol"
                            />
                            <label for="inputPassword">Rol</label>
                        </div>
                        </div>
                      </div>
                      <div class="mt-4 mb-0">
                        <div class="d-grid">
                          <button
                            class="btn btn-primary"
                            tabindex="5"
                            type="submit"
                          >
                            <i class="fas fa-user"></i>

                            Registrar
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="card-footer text-center py-3">
                    <div class="small">
                      <a href="/login">Ya tienes una cuenta? Inicia Sesión</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: [],
      mensaje: { color: "success", texto: "" },
      dismissSecs: 5,
      dismissCountDown: 0,

      user: {
        name: "",
        email: "",
        password: "",
        tipoId: "",
        numberIden: 0,
        address: "",
        phone: 0,
        gender: "",
        fechNaci: "",
        rol: ""
      },
      editar: false,
      userEditar: {},
    };
  },

  // created() {

  //     this.listarUsuarios();

  // },

  methods: {
    agregarUsuario() {
      this.axios
        .post("/register", this.user)
        .then((res) => {
          this.users.push(res.data);
          this.user.name = "";
          this.user.email = "";
          this.user.password = "";
          this.user.tipoId = "";
          this.user.numberIden = "";
          this.user.address = "";
          this.user.phone = "";
          this.user.gender = "";
          this.user.fechNaci = "";
          this.user.rol = "";

          this.mensaje.color = "success";
          this.mensaje.texto = "Usuario Agregado";
          this.showAlert();
          this.$router.push("/users");
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>
