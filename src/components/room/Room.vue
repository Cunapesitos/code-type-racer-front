<template>
  <div>
    <h1 class="mx-auto">Game room: {{ code }}</h1>
    <div class="container">
      <div class="row">
        <div class="col-6 mx-auto">
          <div class="border rounded border-dark p-3">
            <div class="pb-3 mb-3 border-bottom border-dark">
              <div class="row g-3">
                <h3
                  v-bind:class="[
                    { 'text-success': connected },
                    { 'text-danger': !connected },
                  ]"
                >
                  Connected: {{ connected }}
                </h3>
              </div>
            </div>
            <div class="pb-3 mb-3 border-bottom border-dark">
              <div class="row g-3">
                <a class="btn btn-outline-danger" href="/"> Exit </a>
              </div>
            </div>
            <div class="mb-3">
              <div class="row g-3">
                <div class="col">
                  <input
                    readonly
                    type="text"
                    class="form-control disabled"
                    v-model="roomUrl"
                  />
                </div>
                <div class="col-4">
                  <button
                    class="btn btn-outline-dark mb-3"
                    v-clipboard:copy="roomUrl"
                  >
                    Copy url
                  </button>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row g-3">
                <div class="col">
                  <input
                    readonly
                    type="text"
                    class="form-control disabled"
                    v-model="code"
                  />
                </div>
                <div class="col-4">
                  <button
                    class="btn btn-outline-dark mb-3"
                    v-clipboard:copy="code"
                  >
                    Copy code
                  </button>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row g-3">
                <button class="btn btn-outline-warning" id="btn-send">
                  send something
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./RoomComponent.ts"></script>