<template>
  <b-navbar toggleable="lg" type="dark" variant="primary" fixed="top">
    <b-navbar-brand href="#">Yaad</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!--<b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>-->

      <!-- Right aligned nav items -->
      <b-navbar-nav class="w-100">
        <b-nav-item class="flex-grow-1 search-container">
          <b-form-input class="search-input" placeholder="Search"
                        ref="searchInput"
                        id="searchInput"
                        v-model="term"
                        @keydown.up="changeItemSelection(-1)"
                        autocomplete="off"
                        @keydown.down="changeItemSelection(1)"
                        @keydown.enter="addToCart(selectedItem)"
                        @input="searchItems" />
          <div class="autocomplete-container" v-if="$route.path === '/sales' && this.filteredItems.length && this.term.length">
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between"
                                 v-for="(item, key) in filteredItems"
                                 :key="key"
                                 :active="key === selectedItem"
                                 @click="addToCart(key)">
                <span v-text="item[1]"></span>
                <span v-text="item[9]"></span>
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-nav-item>
        <!--<b-nav-dd variant="transparent" right>
          <template #button-content>
            <feather-icon size="1x" icon="UserIcon"/>
            John Doe
          </template>
          <b-dropdown-item href="#">
            <feather-icon size="1x" icon="SettingsIcon"/>
            Settings
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="#">
            <feather-icon size="1x" icon="BellIcon"/>
            Notification
            <b-badge variant="info" pill>14</b-badge>
          </b-dropdown-item>
          <b-dropdown-item href="#">
            <feather-icon size="1x" icon="MessageSquareIcon"/>
            Message
            <b-badge variant="info" pill>6</b-badge>
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="#">
            <feather-icon size="1x" icon="LogOutIcon"/>
            Logout
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="#">
            <feather-icon size="1x" icon="LockIcon"/>
            Lock
          </b-dropdown-item>
        </b-nav-dd>-->
        <b-nav-item>
                   <b-btn variant="primary"><feather-icon icon="PowerIcon" size="1x" class="custom-class" /> Sign out</b-btn>
        </b-nav-item>
        <!--<b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          &lt;!&ndash; Using 'button-content' slot &ndash;&gt;
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>-->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import search from '../store/search';
import inventory from '@/assets/data/inventory.json';
import FeatherIcon from '@/components/FeatherIcon';
import cart from '@/store/cart';
export default {
  name: 'TopNavbar',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    FeatherIcon
  },
  data: () => ({
    filteredItems: [],
    selectedItem: 0
  }),
  watch: {
    '$route.path': {
      handler (val) {
        if (val === '/sales') {
          this.filteredItems = [];
        }
      }
    }
  },
  computed: {
    term: {
      get: function () {
        return search.term;
      },
      set: function (val) {
        search.term = val;
      }
    }
  },
  methods: {
    changeItemSelection (value) {
      if (this.selectedItem + value < 0) {
        this.selectedItem = this.filteredItems.length - 1;
      } else if (this.selectedItem + value > this.filteredItems.length - 1) {
        this.selectedItem = 0;
      } else {
        this.selectedItem = this.selectedItem + value;
      }
    },
    searchItems (term) {
      if (term.length > 2) {
        this.filteredItems = inventory.data.filter(item => item[1].toLowerCase().indexOf(term.toLowerCase().trim()) > -1);
      }
    },
    addToCart (key) {
      const item = this.filteredItems[key];
      // map your item
      const cartItem = cart.items.find(ci => ci.id === item[0]);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cart.items.push({
          id: item[0],
          name: item[1],
          price: item[9],
          quantity: 1,
          get extPrice () {
            return this.price * this.quantity;
          }
        });
      }
      this.term = '';
      this.filteredItems = [];
      this.$refs.searchInput.focus();
    }
  }
};
</script>
<style scoped lang="scss">
.navbar-brand {
  width: 195px;
}
.navbar-dark .navbar-nav .nav-link {
  color: #18bc9c;
}
.navbar {
  height: 60px;
  .form-control {
    background-color: transparent;
    border-color: transparent;
    transition: background-color .2s ease-out;
    &:hover, &:focus {
      background-color: rgb(255, 255, 255);
    }
  }
  .search-input, .btn {
    margin-top: -.375rem;
    margin-bottom: -.375rem;
  }
}
.autocomplete-container {
  position: absolute;
  top: 100%;
  background-color: white;
  border: 1px solid rgb(248, 243, 243);
  width: calc(100% - 15px);
  display: none;
}
.search-container {
  position: relative;
  :hover {
    .autocomplete-container {
      display: block;
    }
  }
}
.search-input {
  &:focus, &:hover {
    + .autocomplete-container {
      display: block;
    }
  }
}

</style>
