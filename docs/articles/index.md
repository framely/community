---
aside: false
layout: home
---
<script setup>
  import Article from './../components/blog/Article.vue';
</script>

<Article :articles="{
  items: [{
    info: {
      title:'Table reservation CUI design',
      description: ['The high-level design of a conversational user interface (CUI) for table reservation. It includes detailed descriptions of each functionality, providing a shared understanding among stakeholders.'],
      image: './../images/blog/banner/tutorial_reservation_cui.png',
      author: 'Sunny May',
      date: '4/19/2023'
    },
    path:'./reservation-cui-design.html'
},{
    info: {
      title:'Reuse reservation module to build chatbot',
      description: ['Reuse a pre-defined module to build a table reservation chatbot and manage resources in Google Calendar and Google Admin, allowing for quick integration of reservation functionality into your chatbot.'],
      image: './../images/blog/banner/tutorial_reservation_chatbot.png',
      author: 'Sunny May',
      date: '4/27/2023'
    },
    path:'./reuse-reservation-module.html'
},{
    info: {
      title:'From schema to snippets: a blueprint for chatbot',
      description: ['Create powerful custom chatbots with schema-driven development. Define interaction logic by starting from a schema, and then use contextual snippets to describe conversational behavior.'],
      image: './../images/blog/banner/from-schema-to-snippets.png',
      author: 'Bird Zeng',
      date: '2/25/2023'
    },
    path:'./from-schema-to-snippets.html'
},{
    info: {
      title:'Chatbot development with OpenCUI',
      description: ['Revolutionize chatbot development with open-source CUI framework. Streamline the process with a three-layer approach and necessary adaptations for CUI-based nature to deliver business results.'],
      image: './../images/blog/banner/chatbot_development_with_opencui.png',
      author: 'Sean Wu',
      date: '1/3/2023'
    },
    path:'./chatbot-development-with-opencui.html'
}]
}" />
