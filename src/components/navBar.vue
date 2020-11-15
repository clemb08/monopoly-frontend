<template>
  <!-- NAVIGATION -->
  <nav id="navigation" class="navbar navbar-expand-lg">
    <!-- container -->
    <div class="container">
      <b-button v-b-toggle.my-sidebar>
        &#9776;
        <span>Monopoly Menu</span>
      </b-button>
      <!-- responsive-nav -->
      <b-sidebar
        id="my-sidebar"
        title="Monopoly"
        bg-variant="dark"
        text-variant="light"
        sidebar-class="border-right border-danger"
        shadow
      >

          <!-- NAV -->
          <ul class="main-nav">
            <li class="col-10"><router-link to="/">Home</router-link></li>
            <li class="col-10"><router-link to="/games">Games</router-link></li>
          </ul>
          <!-- /NAV -->

      </b-sidebar>
      <!-- /responsive-nav -->
    </div>
    <!-- /container -->
  </nav>
  <!-- /NAVIGATION -->
</template>
