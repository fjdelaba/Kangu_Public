<template>
  <v-container>
    <div v-if="$store.state.app.permisosUsuario.pedido">
      <div>
        <h2>Consultar Pedido</h2>
      </div></div>
      <div v-else>
      <div class="text-jsutify w-full error-page pa-1">
        <div class="error_img"><v-img src="../../../assets/images/error.png" max-height="220" contain  /></div>
  
         <div class="error_permisos" ><center><h1>OOPS!!!</h1></center> <br>
     <h3>No tienes permisos para ver está página. </h3> <br><h3>Contacta al administrador de Kangusoft si necesitas tener habilitada esta página.</h3> <br><br> </div>
     
      <v-btn to="/" color="primary">Notificar al administrador</v-btn>
      </div>
    </div>
  </v-container>
</template>
<script>
export default {
}
</script>
<style>
.error_permisos h1
{
	font-family: 'Noto Sans', sans-serif;
	font-size:40pt;
	margin:0;
	color:#3b8ac9;
}
h3{
  color: #3b8ac9;
}
</style>