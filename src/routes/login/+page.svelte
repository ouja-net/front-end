<script>
  import { env } from "$env/dynamic/public";
  const API = env.PUBLIC_API_URL;

  let details = {
    email: "",
    password: "",
    remember_me: false,
  };

  function handleLogin() {
    let body = new URLSearchParams(new FormData());
    body.append("email", details.email);
    body.append("password", details.password);
    body.append("remember_me", details.remember_me);
    fetch(API + "/account/login", { method: "POST", body })
      .then((r) => r.json())
      .then((b) => {
        if (b.success) {
          setCookie("session", b.ID, 3);
          window.location.assign("/dashboard");
        }
      })
      .catch((e) => console.error(e));
  }

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
</script>

<svelte:head>
  <title>OujaSkins | Login</title>
</svelte:head>

<div class="mt-[10px] bg-white rounded-md py-10 text-center">
  <form on:submit|preventDefault={handleLogin}>
    <div>
      <label for="email"
        >Email <span class="text-red-500" title="Required">*</span></label
      >
      <br />
      <input
        id="email"
        type="email"
        name="email"
        class="bg-gray-200 px-1 py-1 rounded"
        bind:value={details.email}
        required
      />
    </div>
    <div>
      <label for="password"
        >Password <span class="text-red-500" title="Required">*</span></label
      >
      <br />
      <input
        id="password"
        type="password"
        name="password"
        class="bg-gray-200 px-1 py-1 rounded"
        bind:value={details.password}
        required
      />
    </div>
    <div class="mr-[76px]">
      <input
        type="checkbox"
        name="remember"
        id="remember"
        bind:value={details.remember_me}
      />
      <label for="remember">Remember Me?</label>
    </div>
    <div class="mt-[10px]" />
    <button
      type="submit"
      class="bg-[#0DAB76] px-1 py-1 rounded text-white font-semibold hover:underline"
      >Login</button
    >
  </form>
  <div class="mt-[10px]">
    <a href="/register" class="underline">Don't have an account?</a>
  </div>
</div>
