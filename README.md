🐱 Chiikawa Pets
A Windows desktop pet inspired by BongoCat, built with Electron + Vite + PixiJS + Live2D.
Features a self‑developed C++ global keyboard & mouse hook for ultra‑smooth real‑time interaction.

If you like this project, please consider giving it a ⭐ —
your support means a lot and helps me continue building cool stuff.

✨ Features
🐾 Real-time keyboard & mouse action sync  
Powered by a custom C++ Win32 global hook, delivering smoother performance than rdev/Tauri.

🎨 BongoCat-style UI  
UI resources referenced from the original BongoCat project, with additional customizations.

🪟 True transparent window  
Frameless, click-through, always-on-top desktop pet.

⚡ Fast & responsive  
Electron + Vite + PixiJS + Live2D for high-performance rendering.

📦 One-click build  
Powered by electron-builder.

🔒 MIT License

📸 Screenshots
Replace with your own images
![screenshot](./screenshots/demo.png)

📥 Download
👉 Check the latest releases here:
https://github.com/你的仓库/releases (github.com in Bing) (bing.com in Bing)

🛠️ Development
bash
npm install
npm run dev
📦 Build
bash
npm run build
Output:

release/ → installer

release/win-unpacked/ → unpacked version (icon not applied is normal)

📁 Project Structure
text
.
├── dist/                 # Frontend build output
├── dist-electron/        # Electron main/preload build output
├── public/               # Static assets (models, images)
├── electron/             # Main process & preload
│   ├── main.ts
│   └── preload.ts
├── src/                  # Renderer (frontend)
├── electron-builder.json5
├── LICENSE
└── README.md
🧩 Technical Notes
🔧 Custom C++ Win32 Hook
This project includes a self-written native C++ module for global keyboard & mouse events.
Compared to rdev/Tauri:

Lower latency

Higher event throughput

No stutter during fast mouse movement

Perfect for real-time animation sync

🎨 UI Attribution
This project references UI assets from the open-source BongoCat project.
All rights belong to their original creators.

💼 Looking for Opportunities
If you enjoy this project and appreciate the engineering behind it,
I’m open to job opportunities or collaboration in:

Electron / Desktop apps

C++ native modules

Frontend engineering

System-level integrations

Feel free to reach out.

📄 License
MIT License — see LICENSE for details.