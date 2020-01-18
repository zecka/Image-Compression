<template>
  <v-app>
    <v-content>
      <ImageCompressor />
    </v-content>
  </v-app>
</template>

<script>
import ImageCompressor from "./components/ImageCompressor";

export default {
  name: "App",

  components: {
    ImageCompressor
  },

  data: () => ({
    //
  })
};
</script>
