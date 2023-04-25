---
aside: false
layout: home
---
<script setup>
  import Article from './../components/blog/Article.vue';
  // import Footer from '../components/footer/footer.vue';
</script>

<Article :articles="{
  items: [{
    info: {
      title:'Table reservation CUI design',
      description: ['Document high-level design by contextual snippets'],
      image: './../images/blog/banner/tutorial_reservation_cui.png',
      author: 'Sunny May',
      date: '4/19/2023'
    },
    path:'./reservation-cui-design.html'
},{
    info: {
      title:'How to reuse reservation module to build chatbot',
      description: ['Reuse table reservation module to build a chatbot'],
      image: './../images/blog/banner/tutorial_reservation_chatbot.png',
      author: 'Sunny May',
      date: '4/2/2023'
    },
    path:'./reuse-reservation-module.html'
},{
    info: {
      title:'From Schema to Snippets: A Blueprint for Chatbot',
      description: ['The 3 Essential Steps Every Business Should Follow After ChatGPT'],
      image: './../images/blog/banner/from-schema-to-snippets.png',
      author: 'Bird Zeng',
      date: '2/25/2023'
    },
    path:'./from-schema-to-snippets.html'
},{
    info: {
      title:'Chatbot Development with OpenCUI',
      description: ['Reduce complexity of building functional chatbot'],
      image: './../images/blog/banner/chatbot_development_with_opencui.png',
      author: 'Sean Wu',
      date: '1/3/2023'
    },
    path:'./chatbot-development-with-opencui.html'
},{
    info: {
      title:'Set Up a Blog with VuePress v2.0.0',
      description: ['We will create a blog using vuepress2 for various use cases'],
      image: './../images/blog/banner/set_up_vuepress.png',
      author: 'karani',
      date: '4/13/2022'
    },
    path:'./set-up-vuepress-blog.html'
}]
}" />