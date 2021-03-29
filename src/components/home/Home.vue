<template>
  <div>
    <h1>Welcome to Code Type Racer !!!</h1>
    <div class="container">
      <div class="row">
        <div class="col-6 mx-auto">
          <div class="border rounded border-dark p-3">
            <div class="pb-3 mb-3 border-bottom border-dark">
              <div class="row">
                <div class="col">
                  <button class="btn btn-outline-success" v-on:click="create">
                    Create new game
                  </button>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <form action="/game" method="post" class="row g-3">
                <div class="col">
                  <input
                    type="text"
                    name="gameCode"
                    class="form-control"
                    placeholder="Game code"
                    v-model="codeToJoin"
                  />
                </div>
                <div class="col-4">
                  <a
                    type="submit"
                    class="btn btn-outline-dark mb-3"
                    :href="urlToJoin"
                  >
                    Join to game
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.MyShowModal {
  padding-right: 14px !important;
  display: block !important;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
<script lang="ts" src="./HomeComponent.ts"></script>