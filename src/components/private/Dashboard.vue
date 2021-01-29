<template>
  <div class="dashboard">
    <v-app-bar color="white" flat>
      <div class="dashboard_title">Tim Cook</div>
      <v-spacer></v-spacer>
      <v-avatar>
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>
    <v-progress-linear
      indeterminate
      color="primary"
      v-if="loading"
    ></v-progress-linear>
    <v-row justify="center" style="margin-top: 2rem">
      <v-col cols="11" md="10">
        <v-row justify="center">
          <v-col cols="12" md="8">
            <Form
              @saveupload="saveupload"
              :item="item"
              @removeupload="removeupload"
              @createnewpost="createnewpost"
              @previewitem="previewitem"
              @publishitem="publishitem"
              @savedraft="savedraft"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-list two-line>
              <v-subheader>ARTICLES</v-subheader>
              <v-list-item-group v-model="selected" active-class="pink--text">
                <template v-for="(item, index) in items">
                  <v-list-item :key="item.id" @click="edititem(item)">
                    <template v-slot:default="{ active }">
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.content.title"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          v-text="item.content.text"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text>{{
                          formatDate(item.createdAt)
                        }}</v-list-item-action-text>

                        <v-icon v-if="!active" color="grey lighten-1">
                          mdi-star-outline
                        </v-icon>

                        <v-icon v-else color="yellow darken-3">
                          mdi-star
                        </v-icon>
                      </v-list-item-action>
                    </template>
                  </v-list-item>

                  <v-divider
                    v-if="index < items.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from "moment";
import Form from "./Form";
var randomize = require("randomatic");
export default {
  name: "Dashboard",
  components: { Form },
  data() {
    return {
      selected: [],
      loading: false,
      item: {
        article_id: randomize("Aa0", 10),
        status: "",
        author: {
          name: "",
          email: "",
          about: ""
        },
        content: {
          title: "",
          src: "",
          text: ""
        },
        createdAt: new Date(),
        updatedAt: ""
      },
      isEdited: false,
      file: null
    };
  },
  computed: {
    items() {
      return this.$store.state.articles;
    }
  },
  mounted() {
    const response = sessionStorage.getItem("@article_edit");
    if (response) {
      this.item = JSON.parse(response);
    }
  },
  methods: {
    // format date
    formatDate(item) {
      return moment(item).fromNow();
    },
    // log out
    logout() {
      this.$router.push("/");
    },
    // save upload
    saveupload(e) {
      this.file = e;
      this.item.content.src = URL.createObjectURL(e.target.files[0]);
    },
    // edit item
    edititem(item) {
      this.isEdited = true;
      this.item = Object.assign({}, item);
    },
    // create new post
    createnewpost() {
      this.item = {
        article_id: randomize("Aa0", 10),
        status: "",
        author: {
          name: "",
          email: "",
          about: ""
        },
        content: {
          title: "",
          src: "",
          text: ""
        },
        createdAt: new Date(),
        updatedAt: ""
      };
      this.file = "";
      this.selected = []
    },
    // remove upload
    removeupload() {
      this.item.content.src = "";
      this.file = null;
    },
    // preview item
    previewitem() {
      this.$store.commit("updateselected", this.item);
      sessionStorage.setItem("@article_edit", JSON.stringify(this.item));
      let route = `/read/${this.item.article_id}`;
      this.$router.push(route);
    },
    //save draft
    savedraft() {
      this.loading = true;
      localStorage.setItem("draft_item", JSON.stringify(this.item));
      // timeout
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    // publish
    publishitem() {
      this.loading = true;
      let data = [...this.items];
      data.push(this.item);
      // save to vuex
      this.$store.commit("updatearticle", data);
      localStorage.removeItem("draft_item");
      sessionStorage.removeItem("@article_edit");
      // save to database

      // timeout
      setTimeout(() => {
        this.loading = false;
        this.createnewpost()
      }, 1000);
    }
  }
};
</script>

<style scooped lang="css">
.dashboard {
  background-color: #eeeeee;
  min-height: 100vh;
}
.dashboard_title {
  font-family: "Montserrat", sans-serif;
  color: black;
  font-size: 1.25rem;
}
</style>
