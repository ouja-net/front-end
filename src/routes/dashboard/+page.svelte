<script>
  export let data;
</script>

<svelte:head>
  <title>OujaSkins | Dashboard</title>
</svelte:head>

<main class="mt-[10px] bg-white rounded-md py-10">
  <div class="text-center">
    <h1 class="text-2xl font-semibold">Account Information</h1>
    <div class="mt-[10px]" />
    <div class="form-group mb-6">
      <div id="error-container" class="hidden mb-[5px]">
        <p id="error" class="text-red-500 font-semibold" />
      </div>
      <form onsubmit="updateAccount(event)">
        <input type="text" name="type" value="email" hidden />
        <label for="change-email" class="form-label">Account Email:</label>
        <input
          type="text"
          name="email"
          id="change-email"
          class="bg-gray-200 rounded px-1 py-1"
          value={data.user.email}
        />
        <button
          class="bg-[#0DAB76] px-1 py-1 rounded text-white font-semibold hover:underline"
          >Submit</button
        >
      </form>
    </div>
    <div class="form-group mb-6">
      <label for="id" class="form-label">Created On:</label>
      <input
        type="text"
        name="id"
        id="id"
        class="bg-gray-200 rounded px-1 py-1 disabled:bg-gray-300"
        value={new Date(data.user.date).toLocaleString()}
        disabled
      />
    </div>
  </div>
</main>
<div class="mt-[10px] bg-white rounded-md py-10">
  <div class="text-center">
    <h1 class="text-2xl font-semibold">Delete Account</h1>
    <div class="mt-[5px]" />
    <p class="font-semibold">
      Deleting an account is permanent, and will delete all data excluding skin
      textures from our database.
    </p>
    <small class="font-bold"
      >All skin textures will no longer be "owned" by you once an account is
      deleted.</small
    >
    <div class="mt-[5px]" />
    <div class="form-group mb-6">
      <form action="/dashboard" method="post">
        <input type="text" name="type" value="delete-account" hidden />
        <button
          type="submit"
          class="bg-[#E83151] px-1 py-1 rounded text-white font-semibold hover:underline"
          >Delete Account</button
        >
      </form>
    </div>
  </div>
</div>
