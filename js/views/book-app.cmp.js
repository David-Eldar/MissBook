import { bookService } from '../services/book-service.js'
import bookFilter from '../cmps/content/book-filter.cmps.js'
import bookList from '../cmps/content/book-list.cmps.js'
// import bookDetails from './book-details.cmp.js'

export default {
  template: `
  <div  class = "screen" :class="{selected:selectedBook}"></div>
 <section class="main-app app-main">
     <book-filter @filterd="filterBook" :books="books"/>
     <book-list :books="booksToShow" class="list-cmp"/>
     <!-- <book-list @selected="showBookDetails" :books="booksToShow" class="list-cmp"/> -->
     <!-- <book-details v-if="selectedBook" @closeDetails="selectedBook = null" :book="selectedBook"/> -->
     
 </section>
`,

  components: {
    bookFilter,
    bookList,
    // bookDetails,
  },
  data() {
    return {
      books: null,
      selectedBook: null,
      filterBy:null
    }
  },
  created() {
    bookService.query().then(books => this.books = books)
  },
  methods: {
    showBookDetails(book) {
      this.selectedBook = book
    },
    filterBook(filterBy){
      this.filterBy = filterBy
      // console.log('this.filterBy:',this.filterBy)
    }
  },
  computed: {
    booksToShow() {
			if (!this.filterBy) return this.books
			const regex = new RegExp(this.filterBy.title, 'i')
			return this.books.filter((book) => regex.test(book.title) && book.listPrice.amount >= this.filterBy.price)
		},
  },
  unmounted() {},
}
