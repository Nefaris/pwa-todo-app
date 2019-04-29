<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Todo list</div>
    </v-ons-toolbar>

    <div class="searchField">
      <v-ons-search-input
        class="searchInput"
        placeholder="Search something"
        v-model="filter"
      ></v-ons-search-input>
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
          :class="{ done: item.done, hidden: !item.name.includes(filter) }"
        >
          <div class="itemText" @click="scratchItem(index)">{{ item.name }}</div>
          <div class="deleteButton" @click="removeItem(index)">Delete</div>
        </v-ons-list-item>
      </transition-group>
    </v-ons-list>

    <v-ons-fab @click="addItem" position="bottom right">
      <i class="fa-plus"></i>
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
      this.$ons.notification.prompt('Enter task here', { title: 'Add item' })
        .then((response) => {
          this.items.push({ id: this.id, name: response, done: false });
          this.id += 1;
        });
    },
    removeItem(id) {
      this.items.splice(id, 1);
    },
    scratchItem(id) {
      if (!this.items[id].done) this.items[id].done = true;
      else this.items[id].done = false;
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

.searchInput {
  margin-bottom: 10px;
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

.deleteButton {
  display: flex;
  width: 70px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  background: #f00;
  color: #fff;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  font-size: .8em;
  border-top: solid 1px #ccc;
  border-bottom: solid 1px #ccc;
}
</style>
