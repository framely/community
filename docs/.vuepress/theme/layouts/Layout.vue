<script setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
</script>

<template>
  <ParentLayout>
 
    <template #page-bottom>
      <div class="footer">
        <div class="links">
          <div class="company">
            <p>Company</p>
            <div class="links-col">
              <a href="#">Blog</a>
              <a href="#">Open Source</a>
              <a href="#">Human.txt</a>
              <a href="#">Lawyers.txt</a>
            </div>
          </div>
          <div class="Resources">
              <p>Resources</p>
              <div class="links-col">
                  <a href="#">Brand Assets</a>
                  <a href="#">Docs</a>
                  <a href="#">Pricing</a>
                  <a href="#">Support</a>
                  <a href="#">System Status</a>
              </div>
          </div>
          <div class="community">
              <p>Community</p>
              <div class="links-col">
                  <a href="#">Github</a>
                  <a href="#">Twitter</a>
                  <a href="#">DevTo</a>
                  <a href="#">RSS</a>
                  <a href="#">Discord</a>
              </div>
          </div>
          <div class="beta">
              <p>beta</p>
              <div class="links-col">
                    <a href="#">Join our beta</a>
              </div>
          </div>
        </div>
        <hr>
        <div class="copyright">
            <p style="text-align:center;">copyright &copy; framely {{new Date().getFullYear()}} </p>
        </div>
      </div>
    </template>
  </ParentLayout>
</template>

<style scoped>
.links{
    display: flex;
    justify-content: space-evenly;
}
.links-col{
    display: flex;
    flex-direction: column;

}
a{
     color: #4e6e8e;
    margin: 5px;
}
@media (max-width: 768px) {
    .links{
        flex-direction: column;
        padding-left: 20px;
    }
}
    


</style>