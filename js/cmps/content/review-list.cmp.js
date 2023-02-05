export default {
 template: `
 <section  >
         BOOK REVIEWS:
        <!-- <ul v-if="book.reviews" class="review-list">
            <li v-for="review in book.reviews"  class="review-preview">
                <button @click="remove(review.id)">Delete review</button>
                <h1 >By: {{review.fullName}} </h1>
                <h1>Rate: {{review.rate}}</h1>
                <h1>Read at: {{review.readingDate}}</h1>
                <h1>description: {{review.bookReview}}</h1>
            </li>
        </ul> -->
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