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
            @click="openModal"
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

                <button @click="deleteProduct(product)" class="btn btn-danger ml-3">Delete</button>
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
              <button
                @click="closeModal"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
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
                <vue-editor v-model="product.description" :editorToolbar="customToolbar"></vue-editor>
              </div>
              <div class="form-group">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                    <span class="input-group-text">0.00</span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    name="price"
                    aria-label="Dollar amount (with dot and two decimal places)"
                    placeholder="Price"
                    v-model="product.price"
                  />
                </div>
                <!-- <input type="text" placeholder="Price" v-model="product.price" class="form-control" /> -->
              </div>
              <div class="form-group">
                <input
                  type="text"
                  @keyup.191="addTag"
                  placeholder="Tags"
                  v-model="tag"
                  class="form-control"
                />
                <div class="d-flex mt-3">
                  <span
                    v-for="(tag, index) in product.tags"
                    :key="index"
                    class="badge badge-pill badge-primary mr-2"
                  >{{tag}}</span>
                </div>
              </div>

              <div class="form-group">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                  </div>
                  <div class="custom-file">
                    <input
                      type="file"
                      @change="uploadImage"
                      placeholder="Images"
                      class="custom-file-input form-control"
                    />
                    <!-- <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"> -->
                    <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                  </div>
                </div>
              </div>
              <div class="form-group d-flex">
                <div v-for="(image, index) in product.images" :key="index">
                  <img :src="image" alt="sem alt" class="img-thumbnail w-25" />
                </div>
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
              <button
                @click="addProduct"
                v-if="modalType=='new'"
                type="button"
                class="btn btn-primary"
              >Save changes</button>
              <button
                @click="updateProduct"
                v-if="modalType=='edit'"
                type="button"
                class="btn btn-primary"
              >Apply changes</button>
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
import Swal from "sweetalert2";
import { VueEditor } from "vue2-editor";

var db = firebase.firestore();
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

export default {
  name: "AdminProducts",
  components: {
    VueEditor
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []
      },
      tag: null,
      activeItem: null,
      modalType: null,
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ]
    };
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    uploadImage(e) {
      if (e.target.files[0]) {
        console.log(e.target.files[0]);
        let file = e.target.files[0];
        var storageRef = firebase.storage().ref("products/" + file.name);
        let uploadTask = storageRef.put(file);
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          snapshot => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
            }
          },
          error => {
            console.log(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.product.images.push(downloadURL);
              console.log("File available at", downloadURL);
            });
          }
        );
      }

      // service firebase.storage {
      //   match /b/{bucket}/o {
      //     match /{allPaths=**} {
      //       allow read, write: if request.auth != null;
      //     }
      //   }
      // }
    },
    addTag() {
      console.log("entrou");
      if (this.tag != "") {
        this.tag.trim();
        this.product.tags.push(this.tag.slice(0, -1));
      }
      this.tag = "";
    },
    openModal() {
      this.resetData();

      this.modalType = "new";
    },
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
      this.$firestore.products.doc(this.product.id).update(this.product);

      Toast.fire({
        icon: "success",
        title: "Product updated successfully"
      });
    },
    editProduct(product) {
      this.modalType = "edit";
      this.product = product;
      // this.activeItem = product.id;
      jQuery("#productModal").modal("show");
      // console.log(product);
    },
    deleteProduct(product) {
      console.log(product.id);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$firestore.products.doc(product.id).delete();
          Toast.fire({
            icon: "success",
            title: "Deleted  successfully"
          });
        }
      });
      // if (confirm("Are yoou sure?")) {
      // this.$firestore.persons.doc(person['.key']).delete()
      // }
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

      Toast.fire({
        icon: "success",
        title: "Product created successfully"
      });
      this.resetData();
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
      this.product.id = null;
      this.product.name = null;
      this.product.description = null;
      this.product.price = null;
      this.product.tags = [];
      this.product.images = null;
      this.activeItem = this.modalType = null;
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
.ql-editor {
  min-height: 10px;
}
</style>
