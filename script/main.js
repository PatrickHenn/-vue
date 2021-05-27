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
                <p> User is premuim:{{ premium }}
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                    <li v-for="size in sizes">{{ size }}</li>
                </ul>

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
                  <div class="cart">
                    <p>Cart({{ cart }})</p>
                  </div>

            </div>

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
        details: ["sweet", "fluffy","cute","cosy"],
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
        sizes:[ 'smull', 'small', 'medium', 'big', 'huge' ],
        cart: 1,
        }
    },

    methods:{
        addToCart(){
            this.cart += 1
        },
        revomeFromCart(){
            this.cart-= 1
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
        }
    }
})

var app = new Vue({
    el: '#app',
    data:{
        premium: true,
    }
})