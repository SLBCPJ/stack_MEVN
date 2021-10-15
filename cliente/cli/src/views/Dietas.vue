<template>
  <div>
      <Header></Header>
    <div class="container">
      <h1>Formulario de Dietas</h1>

      <b-alert
        :show="dismissCountDown"
        dismissible
        :variant="mensaje.color"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        {{ mensaje.texto }}
      </b-alert>

      <form @submit.prevent="editarDieta(dietaEditar)" v-if="editar">
        <h3>Editar Dieta</h3>

        <input
          type="text"
          class="form-control my-2"
          placeholder="Nombre"
          v-model="dietaEditar.nombreDieta"
        />
        <input
          type="text"
          class="form-control my-2"
          placeholder="Descripcion"
          v-model="dietaEditar.descripcionDieta"
        />
        <b-button class="btn-success my-2 mx-2" type="submit">Editar</b-button>
        <b-button
          class="my-2"
          type="submit"
          v-b-popover.hover.top="'¿Deseas Cancelar la actualización?'"
          title="Cancelar"
          @click="editar = false"
          ><i class="far fa-window-close"></i
        ></b-button>
      </form>
      <form @submit.prevent="agregarDieta()" v-if="!editar">
        <h3>Agregar una nueva Dieta</h3>

        <input
          type="text"
          class="form-control my-2"
          placeholder="Nombre"
          v-model="dieta.nombreDieta"
        />
        <input
          type="text"
          class="form-control my-2"
          placeholder="Descripcion"
          v-model="dieta.descripcionDieta"
        />
        <b-button class="btn-success my-2" type="submit">Crear</b-button>
      </form>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dietas" :key="index">
            <td>{{ item.nombreDieta }}</td>
            <td>{{ item.descripcionDieta }}</td>
            <td>
              <b-button
                class="btn-danger mx-2"
                v-b-popover.hover.top="'¿Deseas Eliminar esta Dieta?'"
                title="Eliminar Dieta"
                @click="eliminarDieta(item._id)"
                ><i class="far fa-trash-alt"></i
              ></b-button>
              <b-button
                class="btn-warning mx-2"
                v-b-popover.hover.bottom="'¿Deseas Actualizar esta Dieta?'"
                title="Actualizar Dieta"
                @click="activarEdicion(item._id)"
                ><i class="far fa-edit"></i
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
export default {
  components: {
    Header,
    Footer,
  },      
  data() {
    return {
      dietas: [],
      mensaje: { color: "success", texto: "" },
      dismissSecs: 5,
      dismissCountDown: 0,

      dieta: { nombreDieta: "", descripcionDieta: "" },
      editar: false,
      dietaEditar: {},
    };
  },

  created() {
    this.listarDietas();
  },

  methods: {
    listarDietas() {
      this.axios
        .get("/dieta")
        .then((res) => {
          console.log(res.data);
          this.dietas = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    agregarDieta() {
      this.axios
        .post("/new-dieta", this.dieta)
        .then((res) => {
          this.dietas.push(res.data);
          this.dieta.nombreDieta = "";
          this.dieta.descripcionDieta = "";
          this.mensaje.color = "success";
          this.mensaje.texto = "Dieta Agregada";
          this.showAlert();
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    eliminarDieta(id) {
      this.axios
        .delete(`/dieta/${id}`)
        .then((res) => {
          const index = this.dietas.findIndex(
            (item) => item._id === res.data._id
          );
          this.dietas.splice(index, 1);
          this.mensaje.color = "danger";
          this.mensaje.texto = "Dieta Eliminada";
          this.showAlert();
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    activarEdicion(id) {
      this.editar = true;
      this.axios
        .get(`/dieta/${id}`)
        .then((res) => {
          this.dietaEditar = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    editarDieta(item) {
      this.axios
        .put(`/dieta/${item._id}`, item)
        .then((res) => {
          const index = this.dietas.findIndex((n) => n._id === res.data._id);
          this.dietas[index].nombreDieta = res.data.nombreDieta;
          this.dietas[index].descripcionDieta = res.data.descripcionDieta;
          this.mensaje.color = "success";
          this.mensaje.texto = "Dieta Editada";
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
