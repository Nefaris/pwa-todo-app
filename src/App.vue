<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Todo list</div>
    </v-ons-toolbar>

    <div class="searchField">
      <div class="searchControls">
        <div class="clearSearch" @click="clearSearch">Clear</div>
        <v-ons-search-input
          class="searchInput"
          placeholder="Search something"
          v-model="filter"
        ></v-ons-search-input>
      </div>
      <div v-if="filter">Filter: {{ filter || 'none' }}</div>
    </div>

    <v-ons-list>
      <transition-group
        enter-active-class="animated bounceIn"
        leave-active-class="animated bounceOut fast"
        tag="div"
      >
        <v-ons-list-item
          class="list-item"
          tappable v-for="(item, index) in items"
          :key="item.id"
          :class="{
            done: item.done,
            hidden: !item.name.toLowerCase().includes(filter.toLowerCase())
          }"
        >
          <div class="itemText" @click="scratchItem(index)">{{ item.name }}</div>
          <div class="editButton" @click="editItem(index, item.name)">Edit</div>
          <div class="deleteButton" @click="removeItem(index)">Delete</div>
        </v-ons-list-item>
      </transition-group>
    </v-ons-list>

    <v-ons-fab @click="addItem" position="bottom right">
      <!-- <i class="fa-plus"></i> -->
      +
    </v-ons-fab>

  </v-ons-page>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      items: [],
      id: 0,
      filter: '',
    };
  },
  methods: {
    addItem() {
      this.$ons.notification.prompt('Enter task here', {
        title: 'Add item', cancelable: true, autofocus: true, submitOnEnter: true, buttonLabels: 'Add',
      })
        .then((response) => {
          if (response.length > 0 && response != null) {
            this.items.push({
              id: this.id, name: response.trim(), done: false,
            });
            this.id += 1;
            // hide keyboard
            document.getElementsByTagName('body')[0].focus();
          }
        });
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    scratchItem(index) {
      if (!this.items[index].done) this.items[index].done = true;
      else this.items[index].done = false;
    },
    editItem(index, name) {
      this.$ons.notification.prompt(name, {
        title: 'Edit item', cancelable: true, defaultValue: name, autofocus: true, submitOnEnter: true, buttonLabels: 'Save',
      })
        .then((response) => {
          if (response.length > 0 && response != null) {
            this.items[index].name = response.trim();
          }
        });
    },
    clearSearch() {
      this.filter = '';
    },
  },
};
</script>

<style>
@import url('https://use.fontawesome.com/releases/v5.8.1/css/all.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css');

*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: 'SF Pro Display', sans-serif;
}

body {
  margin: 0;
  padding: 0;
}

.searchField {
  margin: 15px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.searchControls {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.searchInput {
  font-size: 16px;
}

.clearSearch {
  color: #0076ff;
  padding: 5px 15px;
  font-size: 1.15em;
}

.done {
  font-style: italic;
  color: rgba(0, 0, 0, .5);
  text-decoration: line-through;
}

.hidden {
  display: none !important;
}

.list-item {
  display: flex;
  justify-content: space-between;
  padding-right: 14px;
}

.itemText {
  width: calc(100% - 70px);
}

.deleteButton,
.editButton {
  display: flex;
  width: 70px;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
  color: #fff;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  font-size: .8em;
  border-top: solid 1px #ccc;
  border-bottom: solid 1px #ccc;
}

.deleteButton {
  background: #f00;
  right: 0;
}

.editButton {
  background: orangered;
  right: 70px;
}
</style>
