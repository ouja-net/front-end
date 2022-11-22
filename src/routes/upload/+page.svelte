<script>
  import { env } from "$env/dynamic/public";
  const API = env.PUBLIC_API_URL;

  let error = null;

  let data = {
    file: null,
    description: "Describe your skin here!",
  };

  function handleSubmit() {
    let body = new FormData();
    body.append("skin", data.file[0]);
    body.append("description", data.description);

    fetch(API + "/skins/upload", {
      method: "PUT",
      body,
    })
      .then((r) => r.json())
      .then((b) => {
        if (!b.success) {
          error = b.error;
        } else {
          error = null;
        }
      })
      .catch((e) => console.error(e));
  }
</script>

<div class="mt-[10px] bg-white rounded-md py-4 text-center">
  <h1 class="text-xl font-semibold">Upload a skin!</h1>
  <div class="mt-[5px]" />
  <div id="error-container">
    {#if error}
      <h2 id="error" class="text-red-500 font-semibold text-xl">{error}</h2>
    {/if}
  </div>
  <div class="mb-[5px]" />
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <input
        type="file"
        name="image"
        id="skin_file"
        bind:files={data.file}
        class="bg-gray-200 px-1 py-1 rounded"
      />
    </div>
    <div class="mt-[5px]">
      <input
        type="text"
        name="title"
        class="px-1 py-1 rounded bg-gray-200"
        placeholder="Title"
      />
    </div>
    <div class="mt-[5px]">
      <textarea
        name="description"
        cols="30"
        rows="10"
        bind:value={data.description}
        class="px-1 py-1 rounded bg-gray-200 h-[160px]"
      />
    </div>
    <div class="mt-[5px]" />
    <button
      type="submit"
      class="bg-[#0DAB76] px-1 py-1 rounded text-white font-semibold hover:underline"
      >Upload</button
    >
  </form>
</div>
