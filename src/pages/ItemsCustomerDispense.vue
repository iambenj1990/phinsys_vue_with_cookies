<template>
  <q-page>
    <div class="flex flex-center q-ma-sm">
      <q-card>
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-6">
              <q-table
            title="Items Customer Dispense"
            :rows="[]"
            :columns="[]"
            row-key="id"
            flat
            bordered
            separator="cell"
            class="my-sticky-header-table"
          >
            <template v-slot:top-right>
              <q-btn color="primary" label="Add New" />
            </template>
          </q-table>
            </div>
            <div class="col-6">
              <q-table
            title="Items Customer Dispense"
            :rows="[]"
            :columns="[]"
            row-key="id"
            flat
            bordered
            separator="cell"
            class="my-sticky-header-table"
          >
            <template v-slot:top-right>
              <q-btn color="primary" label="Add New" />
            </template>
          </q-table>
            </div>
          </div>

        </q-card-section>
        <q-card-section>
          <q-table
            title="Items Customer Dispense"
            :rows="[]"
            :columns="[]"
            row-key="id"
            flat
            bordered
            separator="cell"
            class="my-sticky-header-table"
          >
            <template v-slot:top-right>
              <q-btn color="primary" label="Add New" />
            </template>
          </q-table>
        </q-card-section>
        <q-card-action>
        </q-card-action>
      </q-card>
    </div>
  </q-page>
</template>

<script>
</script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 610px


  thead tr th
    /* bg color is important for th; just specify one */
    background-color: #008000

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 100px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 50px
</style>
