var eventBus = new Vue()

Vue.component('product', {
    props:{
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img v-bind:src="image">
            </div>

            <div class="product-info">
                <h1> {{ title }} </h1>
                <p v-if="available">Is available</p>
                <p v-else="available">Is not available</p>
                <p v-show="onSale"> {{ 'Sale get 15% off if u buy in ' + countdown + '!'}}</p>
                <p> You are a {{ premium }} premium Member

                <div v-for="(variant, index) in variants" 
                     :key="variant.variantId"
                     class="color-box"
                     :style="{ backgroundColor: variant.variantColor }"
                     @mouseover="updateProduct(index)">
                  </div>

                <button v-on:click="addToCart"
                  :disabled="!available"
                  :class="{disabledButton: !available}">
                  Add to cart</button>
                <button v-on:click="revomeFromCart">Remove from cart</button>

            </div>

            <product-tabs :reviews="reviews"> </product-tabs>

            <span> {{ 'Today is ' + time }}</span>
            <a v-bind:href="github">Github</a>    
        </div>
        `,
    data() {
      return {
        product: 'Puppies',
        time: new Date(),
        selectedVariant: 0,
        github: 'https://github.com/',
        onSale: true,
        countdown: 'the next 5 seconds',
        animal: 'Puppy ',
        race: 'Maltese Bichon',
        variants: [
            {
                variantId: 123,
                variantColor: 'beige',
                variantImage: './public/img/dog-puppy.png',
                variantQuantity: 10,
            },
            {
                variantId: 1234,
                variantColor: 'brown',
                variantImage: './public/img/puppy-nawpic-2.jpeg',
                variantQuantity: 0,
            }
        ],
        reviews: [],
        }
    },

    methods:{
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        revomeFromCart(){
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index){
            this.selectedVariant = index
        },
    },

    computed: {
        title() {
            return this.animal + this.race
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        available(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        isOnSale(){
                return this.animal + this.race
        },
        mounted(){
            eventBus.$on('review-submitted', productReview => {
                this.reviews.push(productReview)
            })
        }
    }
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length"> 
        <b> Please correct the mistakes you have done: </b>
        <ul>
            <li v-for="error in errors"> {{error}}</li>
        </ul
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
    `,
    data(){
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit(){
            if(this.name&&this.review&&this.rating){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else{
                if(!this.name) this.errors.push("Where is your Name???")
                if(!this.review) this.errors.push("Ähm how about a Review???")
                if(!this.rating) this.errors.push("Dont forget to give a Rating???")
            }
        }
    }
})

Vue.component('product-tabs', {
    props:{
        reviews:{
        type: Array,
        required: true,
    }
    },
    template:`

<div>
    <ul>
        <span class="tab"
        :class="{activeTab: selectedTab === tab}"
        v-for="(tab, index) in tabs" 
        @click="selectedTab = tab"
        :key="index">
        {{ tab }} </span>
    </ul>
    <div v-show="selectedTab === 'Reviews'">
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul v-else>
            <li v-for="(review, index) in reviews" :key="index">
            <p>{{ review.name }}</p>
            <p>{{ review.review }}</p>
            <p>{{ 'Rating:' + review.rating }}</p>
            </li>
        </ul>
    </div>

    <div v-show="selectedTab === 'Make a Review'"> 
        <product-review></product-review>
    </div>

    <div v-show="selectedTab === 'Description'"> 
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
            <li v-for="size in sizes">{{ size }}</li>
        </ul>
    </div>
</div>
    `,
    data(){
        return {
            tabs:['Reviews', 'Make a Review', 'Description'],
            selectedTab: 'Description',
            details: ["sweet", "fluffy","cute","cozy"],
            sizes:[ 'smull', 'small', 'medium', 'big', 'huge' ],

        }
    }
})

var app = new Vue({
    el: '#app',
    data:{
        premium: true,
        cart: [],
    },
    methods:{
        updateCart(id){
            this.cart.push(id)
        },
        removeCart(id){
            this.cart.pop(id)
        },
    }

})