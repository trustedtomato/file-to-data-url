<script lang="ts">
  import CopyToClipboard from './lib/CopyToClipboard.svelte'
  import { formatByte } from './lib/format-byte'
  import Preview from './lib/Preview.svelte'

  let fileInput: HTMLInputElement | null = null
  let base64Output = $state('')
  let fileName = $state('')
  let fileType = $state('')
  let fileSize = $state(0)
  // All of the characters are 1 byte in UTF-8
  let base64Size = $derived(formatByte(base64Output.length))

  $effect(() => {
    if (!fileInput) return
    fileInput.onchange = async () => {
      if (!fileInput) return

      const file = fileInput.files?.[0]
      if (!file) return

      fileName = `${file.name}${file.type ? ` (${file.type})` : ''}`
      fileType = file.type
      fileSize = file.size

      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        base64Output = result
      }
      reader.readAsDataURL(file)
    }
  })
</script>

<div class="w-full h-full bg-slate-100 py-16 px-4">
  <main class="max-w-sm mx-auto text-slate-950">
    <input type="file" class="hidden" bind:this={fileInput} />
    <button
      class="w-full p-8 border rounded border-slate-300 shadow-lg bg-slate-50"
      onclick={() => fileInput?.click()}
      ondragover={(e) => {
        e.preventDefault()
      }}>
      <div class="text-2xl">upload</div>
      <div>click or drag & drop</div>
    </button>
    <div class="mt-2 text-sm text-slate-500">
      <div>{fileName || 'No file selected yet.'}</div>
      <div>
        {formatByte(fileSize)}
      </div>
    </div>

    <div class="mt-16 mb-2">base64 output</div>
    <div class="relative">
      <input
        value={base64Output}
        class="w-full p-6 py-4 border rounded border-slate-300 bg-slate-50"
        readonly />
      <div class="right-2 top-1/2 -translate-y-1/2 absolute">
        <CopyToClipboard text={base64Output} />
      </div>
    </div>
    <div class="mt-2 text-sm text-slate-500">
      {base64Size}
    </div>

    <div class="mt-16 mb-2">preview</div>
    <Preview src={base64Output} name={fileName} />
  </main>
</div>
