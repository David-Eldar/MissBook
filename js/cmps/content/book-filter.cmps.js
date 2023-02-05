export default {

    props:['books'],

  template: `
 <section >
  <form class="book-filter">
  <input type="text" v-model=filterBy.title @input="filter"placeholder="search book by name...">
  <div class="price-range-container"></div>
  <h1>Search by price Range: {{filterBy.price}}</h1>
  <input type="range" v-model="filterBy.price" @input="filter" :min="minPrice" :max="maxPrice"  v-model.number="filterBy.price">
   
  </form>
 </section>
`,
  data() {
    return {
      filterBy: {
        title: '',
        price:''

      },
    }
  },
  created() {
    this.filterBy.price = this.minPrice
  },
  methods: {
    filter(){
        this.$emit('filterd',this.filterBy)
    }
  },
  computed: {
    minPrice() {
        return Math.min(...this.books.map((book) => book.listPrice.amount))
    },
    maxPrice() {
        return Math.max(...this.books.map((book) => book.listPrice.amount))
    },
  },
  unmounted() {},
}
