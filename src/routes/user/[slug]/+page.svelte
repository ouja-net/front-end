<script>
  /** @type {import('./$types').PageData} */
  export let data;

  import { env } from "$env/dynamic/public";
  import { marked } from "marked";
  const API = env.PUBLIC_API_URL;

  function openSettings() {
    let info = document.getElementById("info");
    let edit = document.getElementById("edit");
    let button = document.getElementById("settings-button-container");
    let username = document.getElementById("edit-name-container");
    let isInfoHidden = info.classList.contains("hidden");
    let isEditHidden = edit.classList.contains("hidden");
    let isButtonHidden = button.classList.contains("hidden");
    let isUsernameHidden = username.classList.contains("hidden");
    isInfoHidden
      ? info.classList.remove("hidden")
      : info.classList.add("hidden");
    isEditHidden
      ? edit.classList.remove("hidden")
      : edit.classList.add("hidden");
    isButtonHidden
      ? button.classList.remove("hidden")
      : button.classList.add("hidden");
    if (isUsernameHidden) {
      username.classList.remove("hidden");
      document.getElementById("username").classList.add("hidden");
    } else {
      username.classList.add("hidden");
      document.getElementById("username").classList.remove("hidden");
    }

    if (isInfoHidden) {
      document.getElementById("profile-description").value =
        data.account.about_me;
      document.getElementById("profile-username").value = data.account.username;
    }
  }

  let new_user = {
    username: data.user ? data.user.username : "",
    about_me: data.user && data.user.about_me ? data.user.about_me : "",
  };

  function updateUser() {
    if (data.user) {
      let body = new URLSearchParams(new FormData());
      body.append("username", new_user.username);
      body.append("about_me", new_user.about_me);
      fetch(API + "/account", {
        method: "PATCH",
        body,
        headers: {
          "x-session": data.user.session,
        },
      })
        .then((r) => r.json())
        .then((b) => {
          let error = document.getElementById("error");
          let error_container = document.getElementById("error-container");
          error.innerText = "";
          error_container.classList.add("hidden");
          if (b.success) {
            data.account.username = b.account.username;
            data.account.about_me = b.account.about_me;
            window.history.pushState(
              [],
              null,
              `/user/${data.account.username}`
            );
            openSettings();
          } else {
            error.innerText = b.error;
            error_container.classList.remove("hidden");
          }
        })
        .catch((e) => console.error(e));
    }
  }
</script>

<svelte:head>
  <title>OujaSkins | {data.account.username} | Profile</title>
</svelte:head>

<div class="grid grid-cols-1 min-[1250px]:grid-cols-3 gap-1">
  <div />
  <div class="flex justify-center items-center">
    <div class="mt-[80px] bg-white rounded-md py-4 w-[25rem] h-[10rem]">
      <div class="relative">
        <div class="absolute bottom-[-10px] left-[5px]">
          <img
            class="rounded-full"
            width="84"
            src={data.account.profile_pic ??
              "https://assets.livzmc.net/skin/head/steve.png"}
            alt=""
          />
        </div>
      </div>
      <div class="relative">
        <div class="absolute bottom-[20px] left-[95px]">
          <h1 class="text-2xl font-semibold" id="username">
            {data.account.username}
          </h1>
          <div class="hidden" id="edit-name-container">
            <input
              type="text"
              name="username"
              id="profile-username"
              bind:value={new_user.username}
              class="bg-gray-300 px-1 py-1 rounded"
              maxlength="16"
            />
          </div>
        </div>
      </div>
      <div id="info">
        <div class="relative">
          <div class="absolute top-[35px] left-[15px]">0 Followers</div>
        </div>
        <div class="relative">
          <div class="absolute top-[55px] left-[15px]">0 Likes</div>
        </div>
        <div class="relative">
          <div class="absolute top-[75px] left-[15px]">0 Skins</div>
        </div>
      </div>
      {#if data.user && data.user.id == data.account.id}
        <div class="hidden" id="edit">
          <form on:submit|preventDefault={updateUser}>
            <input type="text" name="type" value="description" hidden />
            <div class="relative">
              <div
                id="error-container"
                class="hidden absolute top-[-8px] left-[90px]"
              >
                <!-- Form error -->
                <p id="error" class="text-red-500 font-semibold" />
              </div>
            </div>
            <div class="relative">
              <div class="absolute top-[30px] left-[15px]">
                <textarea
                  name="description"
                  id="profile-description"
                  placeholder="Description"
                  bind:value={new_user.about_me}
                  class="bg-gray-200 rounded px-1 py-1 w-[380px]"
                  maxlength="256"
                />
              </div>
            </div>
            <div class="relative">
              <div class="absolute top-[109px] left-[15px]">
                <button
                  type="submit"
                  class="bg-[#0DAB76] px-1 py-1 rounded text-white font-semibold hover:underline"
                  >Save</button
                >
              </div>
            </div>
          </form>
          <div class="relative">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              on:click={openSettings}
              class="absolute top-[109px] left-[60px]"
            >
              <button
                class="bg-[#E83151] px-1 py-1 rounded text-white font-semibold hover:underline"
                >Cancel</button
              >
            </div>
          </div>
        </div>
      {/if}
      <div class="relative">
        <div class="w-full absolute top-[25px]">
          <hr />
        </div>
      </div>
      {#if data.user && data.user.id == data.account.id}
        <div id="settings-button-container" class="relative">
          <div
            class="absolute top-[-12px] min-[400px]:left-[310px] min-[380px]:left-[300px] left-[270px]"
          >
            <div
              class="transition-colors bg-gray-200 rounded px-1 py-1 font-semibold hover:bg-gray-300"
            >
              <button on:click={openSettings}>Edit Profile</button>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
  {#if data.account.about_me}
    <div id="about-me-container" class="flex justify-center items-center">
      <div class="mt-[50px] py-4 w-[25rem] h-[10rem]">
        <div class="relative">
          <div class="absolute bottom-[10px] left-[10px]">
            <h1 class="text-2xl font-semibold">About Me</h1>
            <hr class="border-gray-900" />
          </div>
          <div class="absolute">
            <div
              class="bg-white rounded-md py-2 px-2"
              id="about_me"
              style="width: 400px; height: 160px; white-space: pre-wrap; overflow-y: scroll;"
            >
              {@html marked(data.account.about_me)}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
{#if data.account.skins && data.account.skins.length > 0}
  <div class="flex justify-center items-center">
    <div class="skins mt-[30px]">
      <div class="relative">
        <div class="absolute top-[-5px] left-[10px]">
          <h1 class="text-2xl font-semibold">Skins</h1>
          <hr class="border-gray-900" />
        </div>
      </div>
      <!-- <div class="mt-[40px]" />
    <div class="grid grid-cols-1 min-[1250px]:grid-cols-3 gap-1">
      <div class="bg-white rounded-md py-4 w-[25rem] h-[10rem]">
        <div class="text-left ml-[15px]">
          <div class="inline-flex">
            <a
              class="hover:cursor-pointer"
              onclick="location.assign(`/user/${user.username}/iris-purple`)"
            >
              <img
                style="height: 128px;"
                src="/api/skin/full/6997a88fe9ea47a18b6e4951242f985f.png"
                alt="not found"
              />
            </a>
            <div class="ml-[5px]">
              <h1 class="text-3xl font-semibold">
                <a
                  class="hover:underline hover:cursor-pointer"
                  onclick="location.assign(`/user/${user.username}/iris-purple`)"
                  >Iris Purple</a
                >
              </h1>
              <div class="flex">
                <div class="mt-[3px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                    />
                  </svg>
                </div>
                <div class="block">
                  <span class="ml-[5px] font-semibold">0</span>
                </div>
                <div class="ml-[5px] mt-[5px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                    />
                  </svg>
                </div>
                <div class="block">
                  <span class="ml-[3px] font-semibold">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    </div>
  </div>
{/if}
