<script lang="ts">
  let props = $props<{
    src: string
    name: string
  }>()
  let isImage = $state(true)
  $effect(() => {
    isImage = true
    const img = new Image()
    img.onload = () => {
      isImage = true
    }
    img.onerror = () => {
      isImage = false
    }
    img.src = props.src
  })
</script>

{#if isImage}
  <img
    src={props.src}
    class="w-full h-auto border rounded border-slate-300"
    alt={props.name} />
{:else}
  <iframe
    sandbox="allow-same-origin allow-scripts allow-forms"
    class="w-full border rounded border-slate-300 bg-slate-50"
    src={props.src ||
      'data:text/html,Upload%20a%20file%20to%20preview%20its%20content.'}
    title={props.name}>
  </iframe>
{/if}
