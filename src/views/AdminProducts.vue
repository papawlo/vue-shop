<template>
  <div class="products">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Products Page</h3>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident quaerat esse dicta ut nihil eligendi, exercitationem labore illo minima assumenda eos ab eum nisi ipsam neque odio molestiae aperiam. Cumque?</p>
          </div>
          <div class="col-md-6">
            <img src="/img/svg/products.svg" alt class="img-fluid" />
          </div>
        </div>
      </div>
      <!-- .intro  -->

      <div class="row">
        <div class="col">
          <h3>Product List</h3>
        </div>
        <div class="col">
          <button
            class="btn btn-primary float-right"
            data-toggle="modal"
            data-target="#productModal"
          >
            <i class="fa fa-plus mr-2"></i>Add Product
          </button>
        </div>
      </div>

      <div class="row">
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
              <td>{{product.name}}</td>
              <td>{{product.price}}</td>
              <td>
                <button
                  @click="editProduct(product)"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#productModal"
                >Edit</button>

                <button @click="deleteProduct(product.id)" class="btn btn-danger ml-3">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- end .row table-->
    </div>
    <!-- end .container-->

    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form>
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="productModalLabel">Edit Product</h5>
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
                <textarea
                  type="text"
                  placeholder="Product Description"
                  v-model="product.description"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <input type="text" placeholder="Price" v-model="product.price" class="form-control" />
              </div>
              <div class="form-group">
                <input type="text" placeholder="Tags" v-model="product.tags" class="form-control" />
              </div>
              <div class="form-group">
                <input type="file" placeholder="Images" class="form-control" />
              </div>
            </div>
            <!--modal body -->
            <div class="modal-footer">
              <button
                @click="closeModal"
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >Close</button>
              <button @click="addProduct" type="button" class="btn btn-primary">Save changes</button>
            </div>
            <!-- end modal footer -->
          </div>
          <!--end modal content -->
        </form>
      </div>
      <!-- end modal dialog -->
    </div>
    <!--end  modal fade -->
  </div>
  <!-- .products -->
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
        description: null,
        price: null,
        tags: [],
        images: null
      },
      activeItem: null
    };
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    closeModal() {
      this.resetData();
    },
    // watcher() {
    //   db.collection("products").onSnapshot(querySnapshot => {
    //     this.products = [];
    //     querySnapshot.forEach(doc => {
    //       this.products.push(doc);
    //     });
    //   });
    // },
    updateProduct() {
      // db.collection("products")
      //   .doc(this.activeItem)
      //   .update(this.product)
      //   .then(() => {
      //     console.log("Successfully updated");
      //     jQuery("#productModal").modal("hide");
      //     this.readData();
      //   })
      //   .catch(err => {
      //     console.log(("deu merda: ", err));
      //   });
    },
    // editProduct(product) {
    // jQuery("#editMoral").modal("show");
    // this.product = product.data();
    // this.activeItem = product.id;
    // console.log(product);
    // },
    deleteProduct(id) {
      console.log(id);
      // if (confirm("Are yoou sure?")) {
      //   db.collection("products")
      //     .doc(id)
      //     .delete()
      //     .then(() => {
      //       console.log("Document deleted Successfuly");
      //       // this.readData();
      //     })
      //     .catch(err => {
      //       console.error(" Error removieng document: ", err);
      //     });
      // }
    },
    // readData() {
    //   db.collection("products")
    //     .get()
    //     .then(querySnapshot => {
    //       this.products = [];
    //       querySnapshot.forEach(doc => {
    //         this.products.push(doc);
    //         // console.log(`${doc.id} => ${doc.data()}`);
    //       });
    //     });
    // },
    addProduct() {
      this.$firestore.products.add(this.product);
      jQuery("#productModal").modal("hide");
      // Add a second document with a generated ID.
      // db.collection("products")
      //   .add(this.product)
      //   .then(docRef => {
      //     console.log("Document written with ID: ", docRef.id);
      //     this.readData();
      //   })
      //   .catch(error => {
      //     console.error("Error adding document: ", error);
      //   });
    },
    resetData() {
      this.product.name = this.product.price = this.product.description = this.product.tags = this.product.image = this.activeItem = null;
    }
  },
  created() {
    // this.readData();
    // this.watcher();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
</style>
