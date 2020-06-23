<template>
  <div class="products">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Products</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident quaerat esse dicta ut nihil eligendi, exercitationem labore illo minima assumenda eos ab eum nisi ipsam neque odio molestiae aperiam. Cumque?</p>
          </div>
          <div class="col-md-6">
            <img src="/img/svg/products.svg" alt class="img-fluid" />
          </div>
        </div>
      </div>
      <hr />
      <h3>Basic Crud</h3>
      <div class="product-test">
        <form>
          <div class="form-group">
            <input
              type="text"
              placeholder="Product Name"
              v-model="product.name"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <input type="text" placeholder="Price" v-model="product.price" class="form-control" />
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-primary" @click="saveData">Save Data</button>
          </div>
        </form>
        <hr />
        <h3>Product List</h3>
        <table class="table table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product,index) in products" :key="index">
              <th scope="row">{{index}}</th>
              <td>{{product.name}}</td>
              <td>{{product.price}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
var db = firebase.firestore();

export default {
  name: "AdminProducts",
  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null
      }
    };
  },
  methods: {
    readData() {
      db.collection("products")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.products.push(doc.data());
            // console.log(`${doc.id} => ${doc.data()}`);
          });
        });
    },
    saveData() {
      // Add a second document with a generated ID.
      db.collection("products")
        .add(this.product)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          this.readData();
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    }
    // resetData() {
    //   // Object.assign(this.$data, this.$options.data.apply(this));
    // }
  },
  created() {
    this.readData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
</style>
