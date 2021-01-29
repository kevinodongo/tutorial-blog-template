<template>
  <div class="form">
    <v-card-actions class="mx-auto pa-0">
      <v-btn color="primary" text @click="createnewpost">
        <div class="form_title">Write an article</div>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="black" text @click="previewitem">
        <span style="text-transform: capitalize">Preview</span>
      </v-btn>
    </v-card-actions>
    <v-card
      min-height="600"
      max-height="600"
      style="overflow-y: auto; overflow-x: auto"
    >
      <v-card-text>
        <v-sheet width="100" v-if="item.content.src">
          <v-icon @click="removeupload">mdi-close</v-icon>
          <img :src="item.content.src" alt="article image" height="100" />
        </v-sheet>
        <v-textarea
          class="form_content_title"
          auto-grow
          flat
          solo
          name="input-7-4"
          rows="3"
          v-model="item.content.title"
        >
          <template v-slot:label>
            <h1 class="form_content_title">
              New title
            </h1>
          </template>
        </v-textarea>
        <v-sheet color="#eeeeee">
          <v-card-text>
            <input
              type="file"
              name="file_input"
              id="file_input"
              @input="uploadimage"
            />
          </v-card-text>
        </v-sheet>
        <v-textarea
          auto-grow
          solo
          label="Write an article...."
          name="input-7-4"
          rows="12"
          flat
          class="form_content_text"
          v-model="item.content.text"
        ></v-textarea>
      </v-card-text>
    </v-card>
    <div class="mt-5">
      <v-btn dark color="pink" large @click="publishitem">
        <span style="text-transform: capitalize">Publish</span>
      </v-btn>
      <v-btn color="#e0e0e0" class="ml-2" large @click="savedraft">
        <span style="text-transform: capitalize">Save</span>
        <span style="text-transform: lowercase" class="ml-1">draft</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Form",
  props: ["item"],
  data() {
    return {
      url: null
    };
  },
  // methods
  methods: {
    // upload image
    uploadimage(e) {
      this.$emit("saveupload", e.target.files[0]);
    },
    // remove upload
    removeupload() {
      this.$emit("removeupload");
    },
    // create new post
    createnewpost() {
      this.$emit("createnewpost");
    },
    // preview item
    previewitem() {
      this.$emit("previewitem");
    },
    // save item
    savedraft() {
      this.$emit("savedraft");
    },
    // publish item
    publishitem() {
      this.$emit("publishitem");
    }
  }
};
</script>

<style scooped lang="css">
.form_title {
  font-family: "Montserrat", sans-serif;
  text-transform: capitalize;
}
.form_content_title {
  font-family: "Montserrat", sans-serif;
  color: #616161;
  font-size: 1.5rem;
}
.form_content_text {
  font-family: "Montserrat", sans-serif;
  color: #616161;
  font-size: 1.25rem;
}
</style>
