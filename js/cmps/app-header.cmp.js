export default {
 template: `
 <section class="app-header">
     
 <header class="header-container">
       <div class="logo">
           <h3>📚 Miss Book</h3>
          </div>
           <nav class="nav-bar">
      <router-link to="/">Home</router-link>|
      <router-link to="/book">Books</router-link>|
      <router-link to="/about">About</router-link>
    </nav>
    </header>

 </section>
`,
data() {
return {};
},
created() {},
methods: {},
computed: {},
unmounted() {},
};