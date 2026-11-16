# Bằng chứng kiểm chứng – Đợt 1

**Ngày**: 13/11/2026  
**Phạm vi**: Kiểm tra môi trường, khởi tạo React + Vite + TypeScript và app shell. Chưa triển khai luồng nghiệp vụ.

## Môi trường

- Node.js: `v24.19.0` (`node --version`).
- npm: `11.17.0` (`npm.cmd --version`).
- Registry: `npm.cmd ping --registry=https://registry.npmjs.org/` trả `PONG` sau khoảng 1,37 giây.
- PowerShell chặn wrapper `npm.ps1` theo execution policy. Dùng `npm.cmd` thành công; không thay đổi chính sách hoặc cấu hình Windows.
- Không kết nối VCR, không dùng dữ liệu vận hành thật.

## Dependency ứng dụng

Đã cài các package cần cho shell/build; chưa cài Vitest, React Testing Library hoặc jsdom.

- `react@19.3.1`
- `react-dom@19.3.1`
- `vite@8.3.8`
- `typescript@7.0.2`
- `@vitejs/plugin-react@6.3.0`
- `@types/react@19.3.0`
- `@types/react-dom@19.3.0`

## Kết quả kiểm tra

- `npm.cmd run typecheck` — đạt, mã thoát `0`.
- `npm.cmd run build` — đạt, mã thoát `0`; Vite build 18 module và tạo `dist/`.
- Chưa chạy TC01–TC10 hoặc smoke test trình duyệt. Các màn hình nghiệp vụ hiện là placeholder, không có dữ liệu, form, duyệt/trả lại hay dashboard nghiệp vụ.

## Giới hạn xác nhận

Kết quả trên chỉ xác nhận môi trường cài package được và app shell biên dịch/build được. Không phải nghiệm thu, không phải xác nhận của BO/VCR và không phải kết quả đo hiệu quả.
