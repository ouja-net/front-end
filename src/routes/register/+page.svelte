<script>
  export let data;

  import { env } from "$env/dynamic/public";
  const API = env.PUBLIC_API_URL;

  let form = {
    username: "",
    email: "",
    password: "",
    conf_password: "",
    agreed: false,
  };

  function handleRegister() {
    let body = new URLSearchParams(new FormData());
    for (const key in form) {
      if (Object.hasOwnProperty.call(form, key)) {
        const value = form[key];
        if (!value) {
          let err = document.getElementById("error");
          err.innerText = "Missing value for " + key;
          err.classList.remove("hidden");
          return;
        }
        body.append(key, value);
      }
    }
    fetch(API + "/account/register", { method: "PUT", body })
      .then((r) => r.json())
      .then((b) => {
        if (b.success) {
          window.location.assign("/login");
        } else {
          document.getElementById("error").innerText = b.error;
          document.getElementById("error").classList.remove("hidden");
        }
      })
      .catch((e) => console.error(e));
  }
</script>

<div class="mt-[10px] bg-white rounded-md py-10 text-center">
  <form on:submit|preventDefault={handleRegister}>
    <div class="hidden text-red-500" id="error" />
    <div>
      <input type="text" name="csrf" hidden value={data.csrf} />
      <label for="name"
        >Username <span class="text-red-500" title="Required">*</span></label
      >
      <br />
      <input
        id="name"
        type="text"
        name="name"
        class="bg-gray-200 px-1 py-1 rounded"
        bind:value={form.username}
        required
      />
    </div>
    <div>
      <label for="email"
        >Email <span class="text-red-500" title="Required">*</span></label
      >
      <br />
      <input
        id="email"
        type="email"
        name="email"
        bind:value={form.email}
        class="bg-gray-200 px-1 py-1 rounded"
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
        bind:value={form.password}
        class="bg-gray-200 px-1 py-1 rounded"
        required
      />
    </div>
    <div>
      <label for="rep-password"
        >Repeat Password <span class="text-red-500" title="Required">*</span
        ></label
      >
      <br />
      <input
        id="rep-password"
        type="password"
        name="confPassword"
        bind:value={form.conf_password}
        class="bg-gray-200 px-1 py-1 rounded"
        required
      />
    </div>
    <div class="lg:ml-[180px]">
      <input
        type="checkbox"
        name="agreed"
        id="remember"
        bind:checked={form.agreed}
      />
      <label for="agreed"
        >I agree to the Privacy Policy & Terms and Conditions</label
      >
    </div>
    <div class="mt-[10px]" />
    <button
      type="submit"
      class="bg-[#0DAB76] px-1 py-1 rounded text-white font-semibold hover:underline"
      >Register</button
    >
  </form>
  <div class="mt-[10px]">
    <a href="/login" class="underline">Have an account?</a>
  </div>
</div>
