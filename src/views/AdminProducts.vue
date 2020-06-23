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
              <th scope="col">Modify</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product,index) in products" :key="index">
              <th scope="row">{{index}}</th>
              <td>{{product.data().name}}</td>
              <td>{{product.data().price}}</td>
              <td>
                <button
                  @click="editProduct(product)"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#editModal"
                >Edit</button>

                <button @click="deleteProduct(product.id)" class="btn btn-danger ml-3">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#editModal"
    >Launch demo modal</button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form>
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editModalLabel">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
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
            </div>
            <div class="modal-footer">
              <button
                @click="closeModal"
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >Close</button>
              <button @click="updateProduct" type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import jQuery from "jquery";
var db = firebase.firestore();

export default {
  name: "AdminProducts",
  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null
      },
      activeItem: null
    };
  },
  methods: {
    closeModal() {
      this.resetData();
    },
    watcher() {
      db.collection("products").onSnapshot(querySnapshot => {
        this.products = [];
        querySnapshot.forEach(doc => {
          this.products.push(doc);
        });
      });
    },
    updateProduct() {
      db.collection("products")
        .doc(this.activeItem)
        .update(this.product)
        .then(() => {
          console.log("Successfully updated");
          jQuery("#editModal").modal("hide");
          this.readData();
        })
        .catch(err => {
          console.log(("deu merda: ", err));
        });
    },
    editProduct(product) {
      // jQuery("#editMoral").modal("show");
      this.product = product.data();
      this.activeItem = product.id;
      console.log(product);
    },
    deleteProduct(id) {
      console.log(id);
      if (confirm("Are yoou sure?")) {
        db.collection("products")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Document deleted Successfuly");
            // this.readData();
          })
          .catch(err => {
            console.error(" Error removieng document: ", err);
          });
      }
    },
    readData() {
      db.collection("products")
        .get()
        .then(querySnapshot => {
          this.products = [];
          querySnapshot.forEach(doc => {
            this.products.push(doc);
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
    },
    resetData() {
      this.product.name = this.product.price = this.activeItem = null;
      //   // Object.assign(this.$data, this.$options.data.apply(this));
    }
  },
  created() {
    // this.readData();
    this.watcher();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
</style>
