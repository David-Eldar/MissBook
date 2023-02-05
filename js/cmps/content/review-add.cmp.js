import { bookService } from '../../services/book-service.js'
import { eventBus } from '../../services/eventBus-service.js'; 
import reviewList from '../content/review-list.cmp.js'

export default {
 template: `
 <section class="reviews">


 <section v-if="book" >
         BOOK REVIEWS:
        <ul v-if="book.reviews" class="review-list">
            <li v-for="review in book.reviews"  class="review-preview">
                <button @click="remove(review.id)">Delete review</button>
                <h1 >By: {{review.fullName}} </h1>
                <h1>Rate: <span class="star">{{review.rate}}</span></h1>
                <h1>Read at: {{review.readingDate}}</h1>
                <h1>description: {{review.bookReview}}</h1>
            </li>
</section>



<form @submit.prevent="addRev" class="review-form">
    <h1>Add review for this book</h1>
    <div class=rev-inputs>
    <input ref="input" type="text" v-model="review.fullName" placeholder="Your name" requierd>
    <span v-for="num in 5" :class="{star: num <= review.rate}" @click="setRating(num)" class="starRate">★</span>
    <input v-model="review.readingDate" type="date" name="ReadingDate" id="ReadingDate" required/>
    <textarea v-model="review.bookReview" id="bookReview" name="bookReview" rows="4" cols="50" required></textarea>
    </div>
    <button>ADD REVIEW</button>
 </form>


 <!-- <button>SEE BOOK REVIEWS</button>
 <review-list /> -->
 </section>

`,
 components:{
    reviewList,
 },
data() {
return {
    book: null,
    review:{
        fullName:'',
        rate: '',
        readingDate:'',
        bookReview:''
    }
};
},
created() {
    const { bookId } = this.$route.params
    bookService.get(bookId)
        .then(book => this.book = book)
},
mounted() {
    
    this.$refs.input.focus()
},
methods: {
    setRating(val) {
        this.review.rate = val
    },
    addRev(){
        // console.log(this.review);
        bookService.addReview(this.book.id, this.review)
        .then(book => {
            this.book = book;
            this.review = bookService.getEmptyReview()
            eventBus.emit('show-msg', { txt: `A review on book ${this.book.title} was successfully added`, type: 'success' });
        })
    },
    remove(reviewId) {
        bookService.removeReview(this.book.id, reviewId)
            .then(book => {
                this.book = book;
                eventBus.emit('show-msg', { txt: `A review on book ${this.book.title} was successfully removed`, type: 'success' });
            })
    }
},
computed: {},
unmounted() {},
};