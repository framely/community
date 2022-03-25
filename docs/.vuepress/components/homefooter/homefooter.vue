<template>
<div class="main">
<section class="footer">
    <div class="logo-links">
        <div class="logo-socials">
            <div class="logo">
                <img src="../../public/images/logo.png" alt="logo">
            </div>
            <div class="socials">
                   

            </div>
        </div>
        <div class="links">
            <div class="product">
                <p>Product</p>
                <div class="link-col">

                <a href="#">
                    Database</a>
                <a href="#">Authentication</a>
                <a href="#">storage</a>
                <a href="#">Functions</a>
                <a href="#">Pricing</a>
                <a href="#">Beta</a>
                </div>

            </div>
            <div class="resources">
                <p>Resources</p>
            <div class="link-col">

                <a href="#">Support</a>
                <a href="#">Brand Assets/Logos</a>
                <a href="#">System status</a>
                <a href="#">Terms of service</a>
                <a href="#">Privacy Policy</a>
            </div>
            </div>


            <div class="developers">
                <p>Developers</p>
                <div class="link-col">

                <a href="#">Documentation</a>
                <a href="#">API Reference</a>
                <a href="#">Guides</a>
                </div>

            </div>
            <div class="company">
                <p>company</p>
                <div class="link-col">

                <a href="#">Blog</a>
                <a href="#">Open Source</a>
                <a href="#">careers</a>
                <a href="#">company</a>
                <a href="#">Human.txt</a>
                <a href="#">Lawyer.txt</a>
                <a href="#">Security.txt</a>
                </div>

            </div>
        </div>

    </div>
    <hr>
    <div class="copyrights">
            <p style="text-align:center;">copyright &copy; framely {{new Date().getFullYear()}} </p>

    </div>

</section>

</div>
    
</template>
<style scoped>
.main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
}
.logo-links{
    display: flex;
    align-items: center;
    justify-content: center;
}
.links>div{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.links{
    display: flex;
    width: 80%;
    justify-content: space-evenly;
    
}
.logo>img{
    width: 100px;
    height: 100px;

}
.logo-socials{
    width: 10%;
    
}
.link-col{
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 35px;
    width: fit-content;
}
a{
    color: #4e6e8e;
    margin: 5px;
}
.socials{
    display: flex;
    justify-content: space-evenly;
    margin-top: 10px;
}
.socials>img{
    width: 30px;
    height: 30px;
}

@media (max-width:768px) {
    .logo-links{
        flex-direction: column;
        align-items: center;
    }
    .links{
       display: grid;
       grid-template-columns: 1fr 1fr;
    }
    
}

</style>