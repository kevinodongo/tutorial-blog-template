<template>
  <div class="home">
    <Header />
    <v-sheet class="mt-10">
      <v-row justify="center">
        <v-col cols="11" md="9">
          <v-carousel height="450" hide-delimiters>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <v-row justify="center" align="center" class="fill-height">
                <v-col cols="8">
                  <h1 v-text="item.title" class="carousel_title"></h1>
                  <div class="text-center carousel_text">
                    November 6th 2020 - Tim Cook
                  </div>
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
          <!--Content-->
          <v-row style="margin-bottom: 10rem;">
            <v-col cols="12" md="8">
              <v-sheet
                style="margin-top: 5rem"
                v-for="(item, index) in published"
                :key="index"
              >
                <v-sheet height="400" v-if="JSON.parse(item.content).src">
                  <v-img
                    :src="JSON.parse(item.content).src"
                    height="400"
                  ></v-img>
                </v-sheet>
                <div style="margin-top: -40px;">
                  <v-btn color="white" large fab>
                    <v-icon small>mdi-heart</v-icon>
                    <div>48</div>
                  </v-btn>
                </div>
                <h1
                  class="content_title"
                  v-text="JSON.parse(item.content).title"
                ></h1>
                <div class="mb-5 mt-5">
                  <v-avatar>
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="Tim"
                    />
                  </v-avatar>
                  <span
                    class="author_section"
                    v-text="JSON.parse(item.author).name"
                  ></span>
                  <span class="ml-3 mr-2"><v-icon>mdi-minus</v-icon></span>
                  <span class="author_section" v-text="item.createdAt"></span>
                </div>
                <div
                  class="content_text_truncated"
                  v-text="JSON.parse(item.content).text"
                ></div>
                <v-card-actions class="mt-5">
                  <v-row align="center">
                    <v-btn
                      v-for="icon in icons"
                      :key="icon"
                      icon
                      class="mx-1"
                      small
                    >
                      <v-icon color="black" size="17px">
                        {{ icon }}
                      </v-icon>
                    </v-btn>
                    <div
                      class="ml-5"
                      style="border-top: 2px dashed #BDBDBD; width: 150px"
                    ></div>
                  </v-row>
                  <v-spacer></v-spacer>
                  <v-btn color="black" text @click="readarticle(item)">
                    <span style="text-transform: capitalize">read</span>
                    <span style="text-transform: lowercase" class="ml-1"
                      >more</span
                    >
                  </v-btn>
                </v-card-actions>
              </v-sheet>
              <div class="text-center" style="margin-top: 4rem">
                <v-btn color="pink" dark tile class="mr-2" width="150">
                  <div style="text-transform: capitalize">Previous</div>
                </v-btn>
                <v-btn color="pink" dark tile width="150">
                  <div style="text-transform: capitalize">Next</div>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <v-sheet style="margin-top: 5rem">
                <v-text-field
                  name="email"
                  label="Email"
                  outlined
                  dense
                  hide-details=""
                  single-line
                ></v-text-field>
                <v-btn color="pink" class="mt-2" tile block dark large>
                  <span style="text-transform: capitalize">Subscribe</span>
                </v-btn>
              </v-sheet>
              <v-card flat tile height="500" style="margin-top: 1rem">
                <v-toolbar flat>
                  <div class="font-weight-light">TRENDING</div>
                </v-toolbar>
                <v-divider></v-divider>
              </v-card>
              <v-card flat tile height="500" style="margin-top: 1rem">
                <v-toolbar flat>
                  <div class="font-weight-light">NEWS</div>
                </v-toolbar>
                <v-divider></v-divider>
              </v-card>
            </v-col>
          </v-row>
          <!--/end-->
        </v-col>
      </v-row>
    </v-sheet>
    <Footer />
  </div>
</template>

<script>
import { retriveallblog } from "../components/mongo-express-script";
import Footer from "../components/parts/Footer";
import Header from "../components/parts/Header";
export default {
  name: "Home",
  components: { Footer, Header },
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
      items: [
        {
          title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          src:
            "https://i.picsum.photos/id/1060/5598/3732.jpg?hmac=31kU0jp5ejnPTdEt-8tAXU5sE-buU-y1W1qk_BsiUC8"
        },
        {
          title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          src:
            "https://i.picsum.photos/id/1026/4621/3070.jpg?hmac=OJ880cIneqAKIwHbYgkRZxQcuMgFZ4IZKJasZ5c5Wcw"
        }
      ]
    };
  },
  // computed
  computed: {
    published() {
      return this.$store.getters.published;
    }
  },
  // mounted
  async mounted() {
    const response = await retriveallblog();
    this.$store.commit("updatearticle", response.data);
  },
  // methods
  methods: {
    // read article
    readarticle(item) {
      let data = {
        _id: item._id,
        author: Object.assign({}, JSON.parse(item.author)),
        content: Object.assign({}, JSON.parse(item.content)),
        published: item.published,
        createdAt: item.createdAt
      };
      this.$store.commit("updateselected", data);
      let route = `/read/${item._id}`;
      this.$router.push(route);
    }
  }
};
</script>

<style scooped lang="css">
.carousel_title {
  font-family: "Montserrat", sans-serif;
  font-size: 1.65em;
  color: white;
  text-align: center;
}
.carousel_text {
  font-family: "Montserrat", sans-serif;
  font-size: 1.25em;
  margin-top: 10px;
  color: #616161;
}
.content_title {
  font-family: "Montserrat", sans-serif;
  font-size: 1.5em;
  margin-top: 1.5rem;
  color: black;
}
.content_text_truncated {
  font-size: 1.1em;
  color: #757575;
  font-family: "Montserrat", sans-serif;
  --lh: 1.4rem;
  line-height: var(--lh);
  --max-lines: 3;
  max-height: calc(var(--lh) * var(--max-lines));
  overflow: hidden;
}
.author_section {
  font-family: "Montserrat", sans-serif;
  margin-left: 10px;
  color: #757575;
}
</style>
