# fonts/

Đặt các file font `.ttf` (hoặc `.otf`) của bạn vào thư mục này.

Tên file phải trùng với trường `"file"` trong `../fonts.json`.

Ví dụ:

```
fonts/
  RobotoMono-Regular.ttf
  Montserrat-Bold.ttf
  Poppins-SemiBold.ttf
```

Sau khi thêm font, chạy `node generate-manifest.mjs` ở thư mục gốc để cập nhật `fonts.json` tự động.
