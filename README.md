# FontVault — Roblox Custom Font Library

Website thư viện font cho Roblox với giao diện glass morphism. Bấm vào font để tự động copy script Lua dùng `writefile()`, `getcustomasset()`, `readfile()`.

## Cấu trúc

```
fontvault-project/
  index.html            # Toàn bộ website (self-contained)
  fonts.json            # Danh sách font (manifest)
  fonts/                # Đặt file .ttf / .otf tại đây
  generate-manifest.mjs # Script tự sinh fonts.json từ thư mục fonts/
```

## Chạy thử nhanh (local)

Chỉ cần mở `index.html` bằng trình duyệt. Khi mở trực tiếp bằng `file://`, web dùng danh sách font mặc định nhúng sẵn.

Để test đầy đủ (đọc `fonts.json`), chạy một server tĩnh:

```bash
cd fontvault-project
python3 -m http.server 8080
# mở http://localhost:8080
```

## Deploy lên GitHub + jsDelivr

1. Tạo repo GitHub, ví dụ `your-username/roblox-fonts`.
2. Copy font `.ttf` vào thư mục `fonts/`.
3. Chạy `node generate-manifest.mjs` để cập nhật `fonts.json`.
4. Sửa biến `REPO` ở đầu phần `<script>` trong `index.html`:
   ```js
   const REPO = { user: "your-username", repo: "roblox-fonts", branch: "main", dir: "fonts" };
   ```
5. Push lên GitHub. Bật **GitHub Pages** (Settings → Pages → branch `main`) để host website.
6. Font sẽ được phân phối qua jsDelivr CDN:
   `https://cdn.jsdelivr.net/gh/your-username/roblox-fonts@main/fonts/<file>.ttf`

## Cách script Lua hoạt động

Mỗi font sinh ra một đoạn script:

1. `game:HttpGet(url)` tải font từ jsDelivr.
2. `writefile(path, data)` ghi font ra file trong workspace.
3. `readfile(path)` đọc lại để kiểm tra.
4. `getcustomasset(path)` trả về `rbxasset://...` để gán cho `Font.new(...)`.
5. Gán `TextLabel.FontFace = customFont`.

> Chỉ dùng cho mục đích tùy biến giao diện cá nhân.
