<template>
  <div class="d-flex align-center display: inline-block mt-1 mb-1" style="width:400px">
    <!-- <span> <span style="font-size: 16px"> {{ item.mat.nombre }} - {{ item.mat.mat_uni.nombre }} </span> <br> <span style="font-size: 10px"> <em>{{ item.observacion }}</em> </span></span>  -->
    <span>{{ nombre }} - {{ unidad }}<br><em><span style="font-size: 11px">{{ observacion }}</span></em></span> 
  </div>
</template>

<script src="./NombreObsTabla.js"></script>

<style scoped src="./NombreObsTabla.css"></style>