<template>
    <div class="container">
        <h1>Usuarios</h1>

        <b-alert 
        :show="dismissCountDown" 
        dismissible 
        :variant="mensaje.color" 
        @dismissed="dismissCountDown=0" 
        @dismiss-count-down="countDownChanged" > 
        {{mensaje.texto}} 
        </b-alert>


        <form @submit.prevent="editarUsuario(userEditar)" v-if="editar">
            <h3>Editar Usuario</h3>

            <input type="text" class="form-control my-2" placeholder="Nombre" v-model="userEditar.name">
            <input type="email" class="form-control my-2" placeholder="Email" v-model="userEditar.email">
            <!-- <input type="password" class="form-control my-2" placeholder="Contraseña" v-model="userEditar.password"> -->
            <b-button class="btn-success my-2 mx-2" type="submit">Editar</b-button>
            <b-button class=" my-2" type="submit" @click="editar=false">Cancelar</b-button>

        </form>
       

    <!-- consultas -->
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Contraseña</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in users" :key="index">
                    <th scope="row">{{item._id}}</th>
                    <td>{{item.name}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.password}}</td>
                    <td>
                        <b-button class="btn-danger mx-2" @click="eliminarUsuario(item._id)">Eliminar</b-button>
                        <b-button class="btn-warning mx-2" @click="activarEdicion(item._id)">Editar</b-button>
                    </td>
                </tr>

            </tbody>
        </table>

    </div>
</template>

<script>
export default {

    data() {
        return {

            users: [],
            mensaje: {color: 'success', texto: ''}, 
            dismissSecs: 5, 
            dismissCountDown: 0,

            user:{name:"",email:"",password:""},
            editar:false,
            userEditar:{}

        }

    },

    created() {

        this.listarUsuarios();

    },

    methods: {

        listarUsuarios() {

            this.axios.get('/user')
                .then(res => {
                    console.log(res.data);
                    this.users = res.data;

                })
                .catch(e => {

                    console.log(e.response);

                })

        },

        eliminarUsuario(id){

            this.axios.delete(`/user/${id}`)
            .then(res=>{

                const index = this.users.findIndex(item=> item._id===res.data._id);
                this.users.splice(index, 1);
                this.mensaje.color="danger";
                this.mensaje.texto="Usuario Eliminado";
                this.showAlert();


            })
            .catch(e=>{

                  console.log(e.response);

            })
        },

        activarEdicion(id){

            this.editar=true;
            this.axios.get(`/user/${id}`)
            .then(res=>{

                this.userEditar=res.data;

            })
            .catch(e=>{

                 console.log(e.response);


            })


        },

        editarUsuario(item){
            
            this.axios.put(`/update-user/${item._id}`, item)
            .then(res=>{
                const index= this.users.findIndex(n=> n._id===res.data._id);
                this.users[index].name=res.data.name;
                this.users[index].email=res.data.email;
                // this.users[index].password=res.data.password;
                this.mensaje.color="success";
                this.mensaje.texto="Usuario Editado";
                this.showAlert();
                this.editar=false;


            })
            .catch(e=>{

                console.log(e.response);

            })



        },
        countDownChanged(dismissCountDown) { 
            this.dismissCountDown = dismissCountDown 
        }, 
        showAlert() { 
            this.dismissCountDown = this.dismissSecs 
        }

    }

}
</script>
