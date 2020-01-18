<template>
  <v-card>
    <div class="preview">
      <div class="preview__label preview__label--compressed">
        Compressed
      </div>
      <div class="preview__label preview__label--original">
        Original
      </div>
      <comparify class="bg-white h-64 w-full">
        <template slot="first">
          <div
            class="preview__image "
            :style="{
              backgroundImage: 'url(' + file.compressed.dataURL + ')',
              transform: 'scale(' + scale + ')'
            }"
          ></div>
        </template>
        <template slot="second">
          <div
            class="preview__image"
            :style="{
              backgroundImage: 'url(' + file.original.dataURL + ')',
              transform: 'scale(' + scale + ')'
            }"
          ></div>
        </template>
      </comparify>
    </div>
    <v-card-actions class="preview__zoom">
      <v-btn fab small @click="zoomIn">
        <v-icon dark>mdi-magnify-plus-outline</v-icon>
      </v-btn>
      <v-btn fab small @click="zoomOut">
        <v-icon dark>mdi-magnify-minus-outline</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-subtitle class="pb-0">File size</v-card-subtitle>

    <v-card-text class="text--primary">
      <div><strong>Original: </strong>{{ file.original.size / 1000 }}kb</div>
      <div>
        <strong>Compressed: </strong>{{ file.compressed.size / 1000 }}kb (-{{
          percent
        }}%)
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn dark color="red" @click="remove">
        <v-icon dark>mdi-delete</v-icon>
      </v-btn>
      <v-btn dark color="primary" @click="download">
        <v-icon dark>mdi-download</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import Comparify from "./Comparify";
import saveAs from "file-saver";

export default {
  components: {
    Comparify
  },
  props: { file: { required: true } },
  computed: {
    // un accesseur (getter) calculé
    percent: function() {
      // `this` pointe sur l'instance vm
      const unrounded =
        100 - (this.file.compressed.size / this.file.original.size) * 100;
      return Math.floor(unrounded);
    }
  },
  data: () => ({
    scale: 1
  }),
  methods: {
    zoomIn() {
      this.scale += 0.3;
    },
    zoomOut() {
      this.scale -= 0.3;
    },
    remove() {
      this.$emit("remove", this.file);
    },
    download() {
      saveAs(this.file.compressed, this.file.compressed.name);
    }
  }
};
</script>
<style lang="scss">
.preview {
  overflow: hidden;
  &__label {
    position: absolute;
    top: 5px;
    z-index: 2;
    text-shadow: 0px 0px 2px #000;
    color: white;
    small {
      display: block;
    }
    &--original {
      left: 10px;
    }
    &--compressed {
      right: 10px;
    }
  }
  &__zoom {
    margin-top: -30px;
    position: relative;
    z-index: 10;
  }
  &__image {
    background-size: cover;
    background-position: center center;
    width: 100%;
    padding-bottom: 40%;
  }
}
</style>
