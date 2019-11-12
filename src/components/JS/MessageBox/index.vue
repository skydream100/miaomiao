<template>
  <div class="meaageBox">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
    <div>
      <div @touchstart="handleCancel">{{ cancel }}</div>
      <div @touchstart="handleOk">{{ ok }}</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.meaageBox{ position: absolute; left: 50%; top:50%; margin: -60px 0 0 -100px; width:200px; height: 120px; border: 1px solid #ccc; border-radius: 4px; background: white; box-shadow: 3px 3px 3px 3px #ccc}
.meaageBox h2{ text-align: center; line-height: 40px; font-size: 18px;}
.meaageBox p{text-align: center; line-height: 40px}
.meaageBox > div{display: flex; position: absolute; bottom: 0; width: 100%; border-top: 1px solid #ccc;}
.meaageBox > div div{flex:1; text-align: center; line-height: 30px; border-right: 1px solid #ccc;}
.meaageBox > div div:last-child{border-right: none;}
</style>