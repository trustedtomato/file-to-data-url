<script lang="ts">
  import { LoaderCircle } from '@lucide/svelte'
  import classNames from 'classnames'
  import CopyToClipboard from './lib/CopyToClipboard.svelte'
  import { formatByte } from './lib/format-byte'
  import { loadingState } from './lib/loading-state.svelte'
  import Preview from './lib/Preview.svelte'

  let fileInput: HTMLInputElement | null = null
  let base64Output = $state('')
  let fileName = $state('')
  let fileType = $state('')
  let fileSize = $state(0)
  // All of the characters are 1 byte in UTF-8
  let base64Size = $derived(formatByte(base64Output.length))

  const onFileChange = (file: File) => {
    fileName = `${file.name}${file.type ? ` (${file.type})` : ''}`
    fileType = file.type
    fileSize = file.size
    loadingState.value = true

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      base64Output = result
    }
    reader.readAsDataURL(file)
  }

  let isDocumentDragover = $state(false)
  let isDragover = $state(false)
</script>

<svelte:document
  ondragover={(e) => {
    for (const item of e.dataTransfer?.items || []) {
      if (item.kind === 'file') {
        e.preventDefault()
        isDocumentDragover = true
      }
    }
  }}
  ondragleave={(e) => {
    e.preventDefault()
    isDocumentDragover = false
  }}
  ondrop={(e) => {
    e.preventDefault()
    isDocumentDragover = false
  }} />

<div class="min-h-screen bg-slate-100 px-4 py-16">
  <main
    class="mx-auto grid max-w-sm gap-16 text-slate-950 lg:max-w-3xl lg:grid-cols-2">
    <div class="flex flex-col gap-16">
      <div>
        <input
          type="file"
          class="hidden"
          onchange={(e) => {
            const file = e.currentTarget.files?.[0]
            if (!file) return
            onFileChange(file)
          }}
          bind:this={fileInput} />
        <button
          class={classNames('w-full rounded border p-8 shadow-lg', {
            'border-slate-300 bg-slate-50 ': !isDragover && !isDocumentDragover,
            'border-slate-500 bg-slate-100': isDocumentDragover,
            'border-slate-500 bg-slate-200': isDragover
          })}
          onclick={() => fileInput?.click()}
          ondragover={(e) => {
            e.preventDefault()
            isDragover = true
            if (e.dataTransfer) {
              e.dataTransfer.dropEffect = 'copy'
            }
          }}
          ondrop={(e) => {
            e.preventDefault()
            isDragover = false
            if (!fileInput) return

            const items = e.dataTransfer?.items
            if (!items) return

            for (const item of items) {
              if (item.kind === 'file') {
                const file = item.getAsFile()
                if (!file) continue
                onFileChange(file)
              }
            }
            const event = new Event('change')
            fileInput.dispatchEvent(event)
          }}
          ondragleave={(e) => {
            e.preventDefault()
            isDragover = false
            if (e.dataTransfer) {
              e.dataTransfer.dropEffect = 'none'
            }
          }}>
          <div class="flex items-center justify-center gap-2 text-2xl">
            upload
            {#if loadingState.value}
              <LoaderCircle class="animate-spin" />
            {/if}
          </div>
          <div>click or drag & drop</div>
        </button>
        <div class="mt-2 text-sm text-slate-500">
          <div>{fileName || 'No file selected yet.'}</div>
          <div>
            {formatByte(fileSize)}
          </div>
        </div>
      </div>

      <div>
        <div class="mb-2">base64 output</div>
        <div class="relative">
          <input
            value={base64Output}
            class="w-full rounded border border-slate-300 bg-slate-50 p-6 py-4"
            readonly />
          <div class="absolute right-2 top-1/2 -translate-y-1/2">
            <CopyToClipboard text={base64Output} />
          </div>
        </div>
        <div class="mt-2 text-sm text-slate-500">
          {base64Size}
        </div>
      </div>
    </div>

    <div>
      <div class="mb-2 lg:-mt-8">preview</div>
      <Preview src={base64Output} name={fileName} />
    </div>
  </main>
</div>
