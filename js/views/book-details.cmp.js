import { bookService } from '../services/book-service.js'
import longText from '../cmps/content/long-text.cmp.js'
import reviewAdd from '../cmps/content/review-add.cmp.js'

export default {
  // props: ['book'],
  components: {
    longText,
    reviewAdd
  },

  template: `
 <section v-if="book" class="product-details-container app-main">
   
 <!-- <div class="product-details-container"> -->
  <!-- <button @click="goBack">Go Back</button> -->
  <router-link to="/book"><button>Go Back</button></router-link>

  
    <div class="details-header">
     <img :src="book.thumbnail" alt="">
    <div class="text-details">
     <h2>{{book.title}}</h2>
     <h3>{{book.subtitle}}</h3>
     <p>By:
                <span v-for="author in book.authors">
                  <a href="#">{{author}} </a> (Author) 
                </span>
            </p>
            <div class="description">
    <h3>Description:</h3>
    <long-text :text="book.description"/>
    </div>
    <p> Price: <span :class="priceClass">{{priceToDisplay}}</span><span v-if="book.listPrice.isOnSale" class="sale">ON SALE!</span></p>
    <div class="dry-details">
      <h4>Publish Date: {{book.publishedDate}} - <span>{{publishDateMsg}}</span>,</h4>
      <h4>Page count: {{book.pageCount}} - <span>{{pageCountMsg}}</span>,</h4>
      <h4>Language: {{book.language}}</h4>
    </div>

             <div class="categories-modal">Categories: 
              <a  v-for="categorie in book.categories">
              {{categorie}} </a>
            </div>
    
        <section class="review-container">
          <review-add></review-add>
        </section>
    
    </div>
    </div>
    <!-- </div> -->


    
 </section>
`,
  data() {
    return {
      book: null,
    } 
  },
  created() {
    const id = this.$route.params.bookId
    bookService.get(id).then((book) => (this.book = book))
  },
  methods: {
    goBack() {
      this.$emit('closeDetails')
    },
  },
  computed: {
    priceToDisplay() {
      return new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: this.book.listPrice.currencyCode,
      }).format(this.book.listPrice.amount)
    },
    publishDateMsg() {
      const publishDate = this.book.publishedDate
      const currYear = new Date().getFullYear()
      const diff = currYear - publishDate
      if (diff > 10) return ' Veteran book'
      else if (diff < 1) return ' New book!'
    },
    pageCountMsg() {
      const pageCount = this.book.pageCount
      if (pageCount > 500) return ' Long reading'
      else if (pageCount > 200) return ' Decent reading'
      else if (pageCount < 100) return ' Light reading'
    },
    priceClass() {
      const price = this.book.listPrice.amount
      if (price > 150) return 'red'
      else if (price < 20) return 'green'
    },
  },
  unmounted() {},
}
