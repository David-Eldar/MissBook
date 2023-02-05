import bookPreview from "./book-preview.cmps.js"

export default {
 template: `
 <section class="list-container">
    <h1>OUR BOOKS:</h1>
    <ul class="book-list">
      <li v-for="book in books" key="book.id" class="book-card">
         <book-preview :book="book" @imgSelected="select(book)"/>
         <div class="actions">
            <router-link :to="'/book/'+book.id"><button>Details</button></router-link>
            <!-- <button @click="select(book)">Details</button> -->

            
         </div>
      </li>
    </ul>
 </section>
`,
 props:['books'],

 components:{
   bookPreview,
},
 data() {
 return {};
},
 created() {},
 methods: {
   select(book){
      // console.log('book:',book)
      this.$emit("selected",book)

   }
 },
 computed: {},
 unmounted() {},
};