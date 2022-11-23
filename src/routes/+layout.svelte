<script lang="ts">
  import "../app.css";

  export let data;

  function toggleNavMobile(): any {
    let doc = document.getElementById("nav-mobile");
    if (!doc) return;
    let isHidden = doc.classList.contains("hidden");
    isHidden ? doc.classList.remove("hidden") : doc.classList.add("hidden");
  }

  function toggleUserMenu(): any {
    let doc = document.getElementById("user-menu-other");
    if (!doc) return;
    let isHidden = doc.classList.contains("hidden");
    isHidden ? doc.classList.remove("hidden") : doc.classList.add("hidden");
  }
</script>

<div class="mt-[10px]">
  <nav class="bg-white rounded-md px-2 py-2 z-[1000]">
    <div class="flex justify-between items-center text-center">
      <h1 class="text-xl font-semibold">
        <a href="/" class="hover:underline">OujaSkins</a>
      </h1>
      <div class="lg:hidden inline mr-[40px]">
        <div class="z-[1000] text-center justify-center items-center flex">
          {#if data.user}
            <div
              class="hidden absolute right-[-97px] top-[5px] bg-white rounded w-[200px] px-4 py-4 border-2 border-gray-200 "
              id="modal-other-mobile"
            >
              <div>
                <a
                  class="hover:underline font-semibold"
                  href="/user/{data.user.username}">@{data.user.username}</a
                >
              </div>
              <hr class="mt-[5px] mb-[5px]" />
              <div>
                <a class="hover:underline" href="/upload">Upload a skin</a>
              </div>
              <hr class="mt-[5px] mb-[5px]" />
              <div>
                <a class="hover:underline" href="/dashboard">Dashboard</a>
                <br />
                <a class="hover:underline" href="/dashboard/notifications"
                  >Notifications</a
                >
                <br />
                <a class="hover:underline" href="/following">Following</a>
              </div>
              <hr class="mt-[5px] mb-[5px]" />
              <div>
                <a class="hover:underline" href="/logout">Logout</a>
              </div>
            </div>
          {:else}
            <div class="float-right relative">
              <a
                href="/login"
                class="px-6 py-2 rounded bg-[#233D4D] text-white font-semibold hover:underline"
                >Login</a
              >
            </div>
          {/if}
        </div>
      </div>
      <ul class="hidden lg:flex text-xl">
        <li class="mr-3">
          <a href="/skins" class="hover:underline">Skins</a>
        </li>
        <li class="mr-3">
          <a href="/top" class="hover:underline">Top</a>
        </li>
        <li class="mr-3">
          <a href="/trending" class="hover:underline">Trending</a>
        </li>
        <li class="mr-3">
          <a href="/recent" class="hover:underline">Recent</a>
        </li>
      </ul>
      <div class="hidden lg:flex z-[1000]">
        {#if data.user}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <img
            on:click={toggleUserMenu}
            class="rounded-full border-4 hover:border-[#B8B8FF] hover:transition hover:duration-150 hover:cursor-pointer w-[48px] h-[48px]"
            src={data.user.profile_pic ??
              "https://assets.livzmc.net/skin/head/steve.png"}
            alt=""
          />
          <div class="float-right relative">
            <div
              class="hidden absolute right-[-10px] top-[50px] bg-white rounded w-[200px] px-4 py-4 border-2 border-gray-200 "
              id="user-menu-other"
            >
              <div>
                <a
                  class="hover:underline font-semibold"
                  href="/user/{data.user.username}">@{data.user.username}</a
                >
              </div>
              <hr class="mt-[5px] mb-[5px]" />
              <div>
                <a class="hover:underline" href="/upload">Upload a skin</a>
              </div>
              <hr class="mt-[5px] mb-[5px]" />
              <div>
                <a class="hover:underline" href="/dashboard">Dashboard</a>
                <br />
                <a class="hover:underline" href="/dashboard/notifications"
                  >Notifications</a
                >
                <br />
                <a class="hover:underline" href="/following">Following</a>
              </div>
              <hr class="mt-[5px] mb-[5px]" />
              <div>
                <a class="hover:underline" href="/logout">Logout</a>
              </div>
            </div>
          </div>
        {:else}
          <a
            href="/login"
            class="px-6 py-2 rounded bg-[#233D4D] text-white font-semibold hover:underline"
            >Login</a
          >
        {/if}
      </div>
      <div class="flex lg:hidden">
        <button
          on:click={toggleNavMobile}
          class="rounded bg-gray-200 px-1 py-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
          >
            <path
              d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="hidden lg:hidden" id="nav-mobile">
      <div class="mt-[10px]">
        <ul class="text-xl">
          <li class="mr-3">
            <a href="/skins" class="hover:underline">Skins</a>
          </li>
          <li class="mr-3">
            <a href="/top" class="hover:underline">Top</a>
          </li>
          <li class="mr-3">
            <a href="/trending" class="hover:underline">Trending</a>
          </li>
          <li class="mr-3">
            <a href="/recent" class="hover:underline">Recent</a>
          </li>
        </ul>
        <div class="mt-[20px] text-center">
          <form action="/search" method="post">
            <input
              type="text"
              name="search"
              id=""
              class="bg-gray-200 px-1 py-1 rounded"
              placeholder="Search"
            />
            <button
              type="submit"
              class="bg-[#0DAB76] px-1 py-1 rounded text-white font-semibold hover:underline"
              >Search</button
            >
          </form>
        </div>
      </div>
    </div>
  </nav>
</div>

<slot />
