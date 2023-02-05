export default {
  template: `
  <section class="book-preview-container">
   <span v-if="book.listPrice.isOnSale" class="sale">ON SALE!</span>
   <p class="title">{{book.title}}</p>
   <p class="authors">{{...book.authors}}</p>
   <p><span :class="priceClass">{{priceToDisplay}}</span></p>
    <router-link :to="'/book/'+book.id"><img :src="book.thumbnail" alt="book-img" @click="imgSelect(book)"></router-link> 
    
    
  </section>
`,
  props: ['book'],
  data() {
    return {}
  },
  created() {},
  methods: {
    imgSelect(){
      this.$emit('imgSelected')
    }
  },
  computed: {
    priceToDisplay() {
      return new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: this.book.listPrice.currencyCode,
      }).format(this.book.listPrice.amount)
    },
    priceClass() {
      const price = this.book.listPrice.amount
      if (price > 150) return 'red'
      else if (price < 20) return 'green'
    },
  },
  unmounted() {},
}
