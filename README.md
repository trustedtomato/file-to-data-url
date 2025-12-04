# File to Data URL

![Svelte](https://img.shields.io/badge/Built_with-Svelte-FF3E00?style=flat-square&logo=svelte)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

A lightweight Svelte utility that instantly converts local files into Base64 Data URLs. It handles the conversion, calculates the size overhead, and provides a one-click copy solution for your development workflow.

---

### 🚀 Live Demo

**Try it out on: [https://tamashalasi.com/file-to-data-url/](https://tamashalasi.com/file-to-data-url/)**

---

## ✨ Key Features

- **📤 Drag & Drop:** Intuitive interface—click to upload or simply drop your files directly onto the dropzone.
- **👁️ Instant Preview:** automatically renders previews for common media types (Images, Audio, Video, PDF).
- **📋 One-Click Copy:** Copy the entire Base64 string to your clipboard instantly.
- **📊 Size Analysis:** Real-time comparison between the **Original File Size** and the **Base64 Payload Size** (visualizing the ~33% overhead).
- **🔒 Privacy First:** All processing happens client-side in the browser. Your files are never uploaded to a server.

## 💡 Use Cases

Why convert files to Base64 strings? Here are a few common scenarios:

1.  **Single-File HTML Distribution:**
    Embed images and scripts directly into an HTML file so you can share a standalone document (e.g., email templates, offline reports) without needing a folder of assets.

2.  **Performance Optimization (Small Assets):**
    Reduce HTTP requests by embedding tiny icons, logos, or noise textures directly into your CSS or HTML.

    ```css
    .icon {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ...');
    }
    ```

## 🛠️ Development

If you want to run this project locally or contribute:

1.  **Clone the repository**
2.  **Install dependencies**

    ```bash
    pnpm install
    ```

3.  **Start the development server**
    ```bash
    pnpm run dev
    ```
