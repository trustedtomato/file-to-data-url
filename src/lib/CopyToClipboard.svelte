<script lang="ts">
  let props = $props<{
    text: string
  }>()

  let copied = $state(false)
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(props.text)
      copied = true
      setTimeout(() => {
        copied = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }
</script>

<button
  onclick={copyToClipboard}
  class="rounded-full p-2 hover:bg-slate-200 bg-slate-50 active:bg-slate-300">
  {#if copied}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  {/if}
</button>
