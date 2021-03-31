<template>
  <div class="container-fluid">
    <div class="row p-1">
      <div class="col-3">
        <div class="row mb-1">
          <a class="btn btn-outline-danger" href="/"> Leave room </a>
        </div>
        <div
          v-bind:class="[
            'row border-end border-start border-bottom',
            { 'border-success': connected },
            { 'border-danger': !connected },
          ]"
        >
          <label
            v-bind:class="[
              { 'text-success': connected },
              { 'text-danger': !connected },
              'text-center h5',
            ]"
          >
            {{ connected ? "Connected" : "Disconnected" }}
          </label>
        </div>
      </div>
      <div class="col-6" v-if="joined">
        <div class="row g-3 align-items-center my-3 justify-content-center">
          <div class="col-auto">
            <label
              v-if="!editUsername"
              class="h2"
              @mouseover="hoverUsername = true"
              @mouseleave="hoverUsername = false"
            >
              {{ user.username }}
              <a
                href="#"
                class="text-dark"
                v-if="hoverUsername"
                v-on:click="changeUsername"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil"
                  viewBox="0 0 16 16"
                  data-darkreader-inline-fill=""
                  style="--darkreader-inline-fill: currentColor"
                >
                  <path
                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                  ></path>
                </svg>
              </a>
            </label>
            <div v-if="editUsername">
              <div class="row">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="basic-addon2"
                    v-model="user.username"
                  />
                  <button
                    class="btn btn-outline-success"
                    v-on:click="saveUsername"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="border rounded border-dark pt-2 px-2">
          <div class="row">
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
          <div class="row">
            <div class="col">
              <input
                readonly
                type="text"
                class="form-control disabled"
                v-model="code"
              />
            </div>
            <div class="col-4">
              <button class="btn btn-outline-dark mb-3" v-clipboard:copy="code">
                Copy code
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6" v-if="!joined">
        <div class="row g-3 align-items-center my-3 justify-content-center">
          <div class="col-auto">
            <label class="h2"> {{roomMessageState}} </label>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="row border border-dark mb-3">
          <h3 class="text-center">Players</h3>
          <button class="btn btn-dark" v-on:click="sendTestAction">
            Send test
          </button>
        </div>
        <label
          v-for="player in players"
          :key="player.id"
          class="badge rounded-pill bg-light text-dark border border-dark"
        >
          {{ player.username }}
        </label>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./RoomComponent.ts"></script>