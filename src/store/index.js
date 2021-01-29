import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: [
      {
        article_id: "11",
        status: "Published",
        author: {
          name: "Tim Cook",
          email: "",
          about: ""
        },
        content: {
          title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          src:
            "https://i.picsum.photos/id/1001/5616/3744.jpg?hmac=38lkvX7tHXmlNbI0HzZbtkJ6_wpWyqvkX4Ty6vYElZE",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem vero cumque perspiciatis aperiam sint, beatae ex fugit suscipit amet facere deleniti voluptates labore commodi illo culpa et, maiores, totam illum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem vero cumque perspiciatis aperiam sint, beatae ex fugit suscipit amet facere deleniti voluptates labore commodi illo culpa et, maiores, totam illum."
        },
        createdAt: new Date(),
        updatedAt: ""
      },
      {
        article_id: "241",
        status: "Published",
        author: {
          name: "Tim Cook",
          email: "",
          about: ""
        },
        content: {
          title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          src:
            "https://i.picsum.photos/id/1076/4835/3223.jpg?hmac=sw_W2oBUV1Pp_QwMbkODYHgWlX-SOkVRatS_UErh64Q",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem vero cumque perspiciatis aperiam sint, beatae ex fugit suscipit amet facere deleniti voluptates labore commodi illo culpa et, maiores, totam illum."
        },
        createdAt: new Date(),
        updatedAt: ""
      },
      {
        article_id: "39",
        status: "Draft",
        author: {
          name: "Tim Cook",
          email: "",
          about: ""
        },
        content: {
          title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          src:
            "https://i.picsum.photos/id/1076/4835/3223.jpg?hmac=sw_W2oBUV1Pp_QwMbkODYHgWlX-SOkVRatS_UErh64Q",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem vero cumque perspiciatis aperiam sint, beatae ex fugit suscipit amet facere deleniti voluptates labore commodi illo culpa et, maiores, totam illum."
        },
        createdAt: new Date(),
        updatedAt: ""
      }
    ],
    selected: {},
    loading: false,
    isLogged: false
  },
  actions: {
    // save article
    savearticle({ commit }, value) {
      commit("updatearticle", value);
    },
  },
  getters: {
    published: state => {
      return state.articles.filter(e => e.status === "Published");
    }
  },
  mutations: {
    // update article
    updatearticle(state, value) {
      state.articles = value;
    },
    // update selected
    updateselected(state, value) {
      state.selected = value;
    },
  }
});
