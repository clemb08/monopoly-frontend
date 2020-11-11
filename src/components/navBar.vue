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
        <div class="px-3 py-2">
          <!-- NAV -->
          <ul class="main-nav navbar-nav">
            <li>Home</li>
            <li>Games</li>
          </ul>
          <!-- /NAV -->
        </div>
      </b-sidebar>
      <!-- /responsive-nav -->
    </div>
    <!-- /container -->
  </nav>
  <!-- /NAVIGATION -->
</template>
