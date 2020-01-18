<template>
  <v-container class="compressor">
    <h1 class="text-center mb-10 mt-10">ZK Image Compressor</h1>
    <p class="text-center">
      Compress image directly in browser
    </p>
    <vue-dropzone
      id="drop1"
      ref="vueDropzone"
      :options="dropOptions"
      @vdropzone-files-added="added"
      @vdropzone-removed-file="removeFromDropzone"
    ></vue-dropzone>

    <div class="compressor__actions mt-10 text-center">
      <h4 class="font-weight-light">Quality:</h4>
      <input v-model="quality" class="quantity-input mt-0 pt-0" type="number" />
      <v-slider
        v-model="quality"
        class="align-center"
        :max="max"
        :min="min"
        hide-details
      >
      </v-slider>
      <div class="text-center mt-5">
        <v-btn
          color="primary"
          @click="compress"
          :disabled="
            this.originalFiles.length < 1 ||
              (disabledCompress && compressedQuality == quality)
          "
          >Compress</v-btn
        >
      </div>
      <div class="mt-10 text-center" v-if="files.length > 0">
        <v-btn color="primary" @click="downloadAsZip">
          <v-icon dark>mdi-download</v-icon>
          Download all</v-btn
        >
      </div>
    </div>

    <div class="images">
      <div
        class="images__item"
        v-for="(file, key) in files"
        :key="'file' + key"
      >
        <PreviewCard :file="file" @remove="file => remove(file.original)" />
      </div>
    </div>
  </v-container>
</template>

<script>
import PreviewCard from "./PreviewCard.vue";
import vueDropzone from "vue2-dropzone";
import Compressor from "compressorjs";
import JSZip from "jszip";
import saveAs from "file-saver";

export default {
  name: "HelloWorld",
  components: {
    vueDropzone,
    PreviewCard
  },
  data: () => ({
    msg: "s",
    files: [],
    originalFiles: [],
    quality: 65,
    compressedQuality: null,
    min: 1,
    max: 100,
    disabledCompress: false,
    dropOptions: {
      url: "https://httpbin.org/post",
      autoProcessQueue: false,
      thumbnailWidth: 100,
      thumbnailHeight: 100,
      addRemoveLinks: true
    }
  }),
  methods: {
    added(files) {
      files.forEach(file => {
        this.originalFiles.push(file);
      });
      this.disabledCompress = false;
    },
    compress() {
      this.files = [];
      this.originalFiles.forEach(file => {
        new Compressor(file, {
          quality: this.quality / 100,
          success: blob => {
            // The third parameter is required for server
            this.blobToDataURL(blob, dataURL => {
              let compressedFile = new File([blob], blob.name);
              compressedFile.dataURL = dataURL;
              this.files.push({
                original: file,
                compressed: compressedFile
              });
              this.disabledCompress = true;
              this.compressedQuality = this.quality;
            });
          },
          error(err) {
            console.error(err.message);
          }
        });
      });
    },
    remove(removedFile) {
      this.$refs.vueDropzone.removeFile(removedFile);
    },
    removeFromDropzone(removedFile) {
      this.files = this.files.filter(file => {
        return file.original.name !== removedFile.name;
      });
      this.originalFiles = this.originalFiles.filter(file => {
        return file.name !== removedFile.name;
      });
    },
    blobToDataURL(blob, callback) {
      var a = new FileReader();
      a.onload = function(e) {
        callback(e.target.result);
      };
      a.readAsDataURL(blob);
    },
    downloadAsZip() {
      const zip = new JSZip();
      const compressedFolder = zip.folder("compressor");

      this.files.forEach(file => {
        compressedFolder.file(file.compressed.name, file.compressed);
      });

      zip.generateAsync({ type: "blob" }).then(function(content) {
        // see FileSaver.js
        saveAs(content, "compressor.zip");
      });
    }
  }
};
</script>
<style lang="scss">
.compressor {
  &__actions {
    max-width: 300px;
    margin: auto;
    .quantity-input {
      font-size: 2em;
      text-align: center;
      margin-left: 0.2em;
      display: block;
      width: 100%;
    }
  }
}
img {
  width: 200px;
  height: auto;
}

.images {
  display: flex;
  flex-wrap: wrap;
  margin: 20px -10px;
  &__item {
    padding: 10px;
    width: 50%;
  }
}
.v-card {
  overflow: hidden;
}

#drop1.vue-dropzone {
  max-height: 50vh;
  overflow-y: scroll;
  > .dz-preview {
    $size: 140px;
    z-index: 0 !important;
    margin: 5px !important;
    width: $size !important;
    height: $size !important;
    .dz-image {
      width: $size !important;
      height: $size !important;
      img {
        width: 100%;
        height: auto;
      }
    }
    .dz-progress,
    .dz-filename,
    .dz-size {
      display: none !important;
    }
    .dz-remove {
      padding: 0;
      border: 0;
      margin: 0;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      bottom: unset;
      width: 100%;
    }
  }
}
</style>
