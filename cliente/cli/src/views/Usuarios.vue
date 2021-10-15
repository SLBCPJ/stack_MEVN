<template>
  <div>
    <Header></Header>
    <div class="container">
      <h1>Usuarios</h1>

      <b-alert
        :show="dismissCountDown"
        dismissible
        :variant="mensaje.color"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        {{ mensaje.texto }}
      </b-alert>

      <form @submit.prevent="editarUsuario(userEditar)" v-if="editar">
        <h3>Editar Usuario</h3>

        <input
          type="text"
          class="form-control my-2"
          placeholder="Nombre"
          v-model="userEditar.name"
        />
        <input
          type="email"
          class="form-control my-2"
          placeholder="Email"
          v-model="userEditar.email"
        />
         <input
          type="text"
          class="form-control my-2"
          placeholder="Tipo ID"
          v-model="userEditar.tipoId"
        />
        <input
          type="number"
          class="form-control my-2"
          placeholder="Numero Identificación"
          v-model="userEditar.numberIden"
        />
         <input
          type="text"
          class="form-control my-2"
          placeholder="Dirección"
          v-model="userEditar.address"
        />
         <input
          type="number"
          class="form-control my-2"
          placeholder="Telefono"
          v-model="userEditar.phone"
        />
         <input
          type="text"
          class="form-control my-2"
          placeholder="Rol"
          v-model="userEditar.rol"
        />
        <!-- <input type="password" class="form-control my-2" placeholder="Contraseña" v-model="userEditar.password"> -->
        <b-button class="btn-success my-2 mx-2" type="submit">Editar</b-button>
        <b-button class="my-2" type="submit" @click="editar = false"
          >Cancelar</b-button
        >
      </form>

      <!-- consultas -->
      <a
        href="/register"
        class="btn btn-primary"
        type="button"
        v-b-popover.hover.top="''"
        title="Agregar Usuario"
        ><i class="fas fa-plus"></i
      ></a>
      <table class="table">
        <thead>
          <tr>
            <!-- <th scope="col">Id</th> -->
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Contraseña</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in users" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.password }}</td>
            <td>
              <b-button
                class="btn-danger mx-2"
                v-b-popover.hover.top="''"
                title="Eliminar Usuario"
                @click="eliminarUsuario(item._id)"
                ><i class="fas fa-user-minus"></i
              ></b-button>
              <b-button
                class="btn-warning mx-2"
                v-b-popover.hover.bottom="''"
                title="Editar Usuario"
                @click="activarEdicion(item._id)"
                ><i class="fas fa-user-edit"></i
              ></b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer";
// import Aside from "@/components/Aside";
// import Menu from "@/components/Menu";
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      users: [],
      mensaje: { color: "success", texto: "" },
      dismissSecs: 5,
      dismissCountDown: 0,

      user: { name: "", email: "", password: "" },
      editar: false,
      userEditar: {},
    };
  },

  created() {
    this.listarUsuarios();
  },

  methods: {
    listarUsuarios() {
      this.axios
        .get("/user")
        .then((res) => {
          console.log(res.data);
          this.users = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    eliminarUsuario(id) {
      this.axios
        .delete(`/user/${id}`)
        .then((res) => {
          const index = this.users.findIndex(
            (item) => item._id === res.data._id
          );
          this.users.splice(index, 1);
          this.mensaje.color = "danger";
          this.mensaje.texto = "Usuario Eliminado";
          this.showAlert();
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    activarEdicion(id) {
      this.editar = true;
      this.axios
        .get(`/user/${id}`)
        .then((res) => {
          this.userEditar = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    editarUsuario(item) {
      this.axios
        .put(`/update-user/${item._id}`, item)
        .then((res) => {
          const index = this.users.findIndex((n) => n._id === res.data._id);
          this.users[index].name = res.data.name;
          this.users[index].email = res.data.email;
          // this.users[index].password=res.data.password;
          this.users[index].tipoId = res.data.tipoId;
          this.users[index].numberIden = res.data.numberIden;
          this.users[index].address = res.data.address;
          this.users[index].phone = res.data.phone;
          this.users[index].gender = res.data.gender;
        //   this.users[index].fechNaci = res.data.fechNaci;
          this.users[index].rol = res.data.rol;
          this.mensaje.color = "success";
          this.mensaje.texto = "Usuario Editado";
          this.showAlert();
          this.editar = false;
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
