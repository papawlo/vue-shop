<template>
  <div
    class="page-wrapper default-theme border-radius-on"
    :class="{'toggled':isOpen, '':!isOpen, 'pinned':isPinned, '':!isPinned}"
  >
    <a href="#" id="show-sidebar" class="btn btn-sm bt-dark" @click="toggle">
      <font-awesome-icon icon="bars" />
    </a>
    <nav id="sidebar" class="sidebar-wrapper">
      <div class="sidebar-content">
        <!-- sidebar-brand  -->
        <div class="sidebar-item sidebar-brand">
          <a href="#">pro sidebar</a>
          <div id="close-sidebar">
            <font-awesome-icon icon="times" @click="toggle" />
          </div>
          <div id="pin-sidebar">
            <font-awesome-icon icon="thumbtack" @click="pin" />
          </div>
        </div>
        <!-- sidebar-header  -->
        <div class="sidebar-item sidebar-header d-flex flex-nowrap">
          <div class="user-pic">
            <img class="img-responsive img-rounded" src="/img/user.jpg" alt="User picture" />
          </div>
          <div class="user-info">
            <span class="user-name">
              {{name}}
              <strong>Smith</strong>
            </span>
            <span class="user-role">{{email}}</span>
            <span class="user-status">
              <font-awesome-icon icon="circle" />

              <span>Online</span>
            </span>
          </div>
        </div>
        <!-- sidebar-search  -->
        <div class="sidebar-item sidebar-search">
          <div>
            <div class="input-group">
              <input type="text" class="form-control search-menu" placeholder="Search..." />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fa fa-search" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- sidebar-menu  -->
        <div class="sidebar-item sidebar-menu">
          <ul>
            <li class="header-menu">
              <span>Menu</span>
            </li>
            <li>
              <router-link to="/admin/overview">
                <i class="fa fa-chart-line"></i>
                <span>Overview</span>
              </router-link>
            </li>
            <li>
              <router-link to="/admin/products">
                <i class="fab fa-amazon"></i>
                <span>Products</span>
              </router-link>
            </li>
            <li>
              <router-link to="/admin/orders">
                <i class="fa fa-shopping-cart"></i>
                <span>Orders</span>
              </router-link>
            </li>

            <li>
              <router-link to="/admin/profile">
                <i>
                  <font-awesome-icon icon="user" />
                </i>
                <span class="menu-text">Profile</span>
              </router-link>
            </li>

            <li>
              <button type="button" @click="logout">
                <i>
                  <font-awesome-icon icon="power-off" />
                </i>
                <span class="menu-text">Logout</span>
              </button>
            </li>
          </ul>
        </div>
        <!-- sidebar-menu  -->
      </div>
      <!-- sidebar-footer  -->
      <div class="sidebar-footer">
        <div class="dropdown">
          <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-bell"></i>
            <span class="badge badge-pill badge-warning notification">3</span>
          </a>
          <div class="dropdown-menu notifications" aria-labelledby="dropdownMenuMessage">
            <div class="notifications-header">
              <i class="fa fa-bell"></i>
              Notifications
            </div>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              <div class="notification-content">
                <div class="icon">
                  <i class="fas fa-check text-success border border-success"></i>
                </div>
                <div class="content">
                  <div class="notification-detail">
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. In totam explicabo
                  </div>
                  <div class="notification-time">6 minutes ago</div>
                </div>
              </div>
            </a>
            <a class="dropdown-item" href="#">
              <div class="notification-content">
                <div class="icon">
                  <i class="fas fa-exclamation text-info border border-info"></i>
                </div>
                <div class="content">
                  <div class="notification-detail">
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. In totam explicabo
                  </div>
                  <div class="notification-time">Today</div>
                </div>
              </div>
            </a>
            <a class="dropdown-item" href="#">
              <div class="notification-content">
                <div class="icon">
                  <i class="fas fa-exclamation-triangle text-warning border border-warning"></i>
                </div>
                <div class="content">
                  <div class="notification-detail">
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. In totam explicabo
                  </div>
                  <div class="notification-time">Yesterday</div>
                </div>
              </div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item text-center" href="#">View all notifications</a>
          </div>
        </div>
        <div class="dropdown">
          <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-envelope"></i>
            <span class="badge badge-pill badge-success notification">7</span>
          </a>
          <div class="dropdown-menu messages" aria-labelledby="dropdownMenuMessage">
            <div class="messages-header">
              <i class="fa fa-envelope"></i>
              Messages
            </div>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              <div class="message-content">
                <div class="pic">
                  <img src="img/user.jpg" alt />
                </div>
                <div class="content">
                  <div class="message-title">
                    <strong>Jhon doe</strong>
                  </div>
                  <div class="message-detail">
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. In totam explicabo
                  </div>
                </div>
              </div>
            </a>
            <a class="dropdown-item" href="#">
              <div class="message-content">
                <div class="pic">
                  <img src="img/user.jpg" alt />
                </div>
                <div class="content">
                  <div class="message-title">
                    <strong>Jhon doe</strong>
                  </div>
                  <div class="message-detail">
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. In totam explicabo
                  </div>
                </div>
              </div>
            </a>
            <a class="dropdown-item" href="#">
              <div class="message-content">
                <div class="pic">
                  <img src="img/user.jpg" alt />
                </div>
                <div class="content">
                  <div class="message-title">
                    <strong>Jhon doe</strong>
                  </div>
                  <div class="message-detail">
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. In totam explicabo
                  </div>
                </div>
              </div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item text-center" href="#">View all messages</a>
          </div>
        </div>
        <div class="dropdown">
          <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-cog"></i>
            <span class="badge-sonar"></span>
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuMessage">
            <a class="dropdown-item" href="#">My profile</a>
            <a class="dropdown-item" href="#">Help</a>
            <a class="dropdown-item" href="#">Setting</a>
          </div>
        </div>
        <div>
          <a href="#">
            <i class="fa fa-power-off"></i>
          </a>
        </div>
        <div class="pinned-footer">
          <a href="#">
            <i class="fas fa-ellipsis-h"></i>
          </a>
        </div>
      </div>
    </nav>
    <!-- page-content  -->
    <main class="page-content">
      <router-view />
    </main>
    <!-- page-content" -->
  </div>
  <!-- page-wrapper -->
</template>

<script>
// import FontAwesomeIcon from "@fortawesome/vue-fontawesome";

// Vue.component("font-awesome-icon", FontAwesomeIcon);

// @ is an alias to /src
// import Hero from "@/components/Hero.vue";
// import Products from "@/sections/Products.vue";
// import Login from "@/components/Login.vue";

// import firebase from "@/firebase";
import { auth } from "../firebase";
export default {
  name: "admin",
  components: {
    // FontAwesomeIcon
  },
  data() {
    return {
      isOpen: true,
      isPinned: false,
      name: null,
      email: null,
      photoUrl: null,
      uid: null,
      emailVerified: null
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    pin() {
      this.isPinned = !this.isPinned;
    },
    logout() {
      auth
        .signOut()
        .then(() => {
          this.$router.replace("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    let user = auth.currentUser;

    if (user != null) {
      this.name = user.displayName;
      this.email = user.email;
      this.photoUrl = user.photoURL;
      this.emailVerified = user.emailVerified;
      this.uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    }
  }
};
</script>

<style>
</style>
