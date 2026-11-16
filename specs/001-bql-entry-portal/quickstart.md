# Quickstart Validation Guide: B1 – Prototype cổng nhập liệu BQL TTTM

**Trạng thái**: Đã kiểm tra môi trường và dựng app shell ở đợt 1; các luồng nghiệp vụ và test runner chưa triển khai.

## Kết quả kiểm tra môi trường – 13/11/2026

- Node.js: `v24.19.0` (`node --version`).
- npm: `11.17.0` (`npm.cmd --version`).
- npm registry: truy cập thành công bằng `npm.cmd ping --registry=https://registry.npmjs.org/`; nhận `PONG` sau khoảng 1,37 giây.
- Trong Windows PowerShell hiện tại, wrapper `npm.ps1` bị execution policy chặn. `npm.cmd` chạy được; không thay đổi execution policy hoặc cấu hình Windows.
- Lúc kiểm tra ban đầu chưa cài dependency; sau preflight đã cài các package tối thiểu cho app shell: React `19.3.1`, React DOM `19.3.1`, Vite `8.3.8`, TypeScript `7.0.2`, plugin React `6.3.0` và type definitions `19.3.0`.

## Điều kiện trước

- Laptop Windows có Node.js 22.12+ và npm tương thích với phiên bản Vite/Vitest được chốt khi triển khai.
- Trình duyệt hiện đại.
- Cài package từ registry được môi trường cho phép; không cần hệ thống hoặc API VCR.
- Mọi dữ liệu trong phiên demo là dữ liệu giả, có nhãn “Giả định phục vụ demo, chờ VCR xác nhận”.

Manifest và dependency tối thiểu cho React/Vite/TypeScript đã được tạo ở đợt 1. Vitest, React Testing Library và jsdom chưa được cài; `npm.cmd test` chưa sẵn sàng cho tới khi cấu hình bộ test ở giai đoạn sau.

## Khởi chạy dự kiến

Trong PowerShell, mở thư mục B1_TTTM_Prototype và chạy:

~~~powershell
npm.cmd install
npm.cmd run dev -- --host 127.0.0.1
~~~

Mở địa chỉ local do Vite hiển thị. Vite được cấu hình chỉ lắng nghe trên `127.0.0.1`.

## Kiểm tra tự động

~~~powershell
npm.cmd run typecheck
npm.cmd run build
~~~

Type-check và build đã chạy thành công ở đợt 1. Test runner Vitest/React Testing Library cho TC01–TC10 sẽ được cấu hình ở giai đoạn triển khai test; không đánh dấu test nào đạt ở đợt này.

## Kế hoạch kiểm thử TC01–TC10 (chưa chạy)

| ID | Cách kiểm tra dự kiến | Kết quả cần đạt | Kiểu kiểm tra |
| --- | --- | --- | --- |
| TC01 | Nhập dữ liệu hợp lệ cho từng biểu mẫu, lưu nháp rồi Gửi duyệt | Cả hai bản ghi chuyển sang Chờ duyệt; ngày gửi được ghi nhận lúc gửi | Vitest + Testing Library |
| TC02 | Bỏ trống từng nhóm trường bắt buộc rồi Gửi duyệt | Hiện lỗi tiếng Việt; không gửi; vẫn lưu được nháp chưa hoàn chỉnh | Vitest + Testing Library |
| TC03 | Nhập số lượng âm vào báo cáo vận hành | Không gửi; thông báo lỗi tiếng Việt tại trường số | Vitest + Testing Library |
| TC04 | Nhập số hoàn thành lớn hơn số cần hoàn thành | Không gửi; thông báo lỗi tiếng Việt | Vitest + Testing Library |
| TC05 | Nhập ngày mong muốn xử lý trước ngày gửi, sau đó thử cùng ngày | Ngày trước bị từ chối; cùng ngày được chấp nhận | Vitest + Testing Library |
| TC06 | Người duyệt chấp thuận bản ghi Chờ duyệt | Trạng thái thành Đã duyệt; bản ghi chuyển chỉ đọc | Vitest + Testing Library |
| TC07 | Trả lại không lý do, sau đó trả lại có lý do; nhân viên sửa và gửi lại | Thiếu lý do bị chặn; đủ lý do chuyển Cần sửa; gửi lại chuyển Chờ duyệt | Vitest + Testing Library |
| TC08 | Mở dashboard với seed tháng 11/2026 | A Đã duyệt = 1; B Chờ duyệt = 1; C Chưa gửi = 1; Cần sửa = 0; C không có record | Vitest + Testing Library |
| TC09 | Thay đổi trạng thái báo cáo và thay đổi trạng thái đề xuất | Bộ đếm báo cáo tính lại từ state; đề xuất không ảnh hưởng bộ đếm | Vitest + Testing Library |
| TC10 | Mở trang sửa bản ghi Đã duyệt và thử thay đổi trường | Không thể thay đổi; dữ liệu giữ nguyên và có thông báo bản ghi đã khóa | Vitest + Testing Library |

Khi test runner được cấu hình, mỗi TC sẽ chạy tự động trong môi trường DOM giả lập. Smoke test cục bộ trên Windows vẫn chưa được thực hiện.
## Smoke test thủ công trên Windows

1. Mở trang tổng quan; kiểm tra nhãn tiếng Việt và dữ liệu Mẫu A/B/C.
2. Xác nhận Đã duyệt = 1, Chờ duyệt = 1, Chưa gửi = 1, Cần sửa = 0; C không có bản ghi.
3. Chọn vai trò Nhân viên TTTM; lưu nháp và gửi từng loại biểu mẫu với dữ liệu giả.
4. Chọn Người duyệt; duyệt một bản ghi và trả lại bản ghi khác kèm lý do.
5. Chọn Nhân viên TTTM; sửa bản ghi Cần sửa và gửi lại.
6. Thử sửa bản ghi Đã duyệt; xác nhận dữ liệu không đổi.
7. Thay đổi trạng thái báo cáo; xác nhận dashboard tính lại; kiểm tra đề xuất không ảnh hưởng bộ đếm báo cáo.
8. Chọn ảnh cho đề xuất và xem trước; xác nhận không có upload server.
9. Ghi nhận yêu cầu Codex tiếng Việt và ảnh trước/sau cho ba thử nghiệm; dùng thay đổi nhãn thật nếu nút đã là Gửi duyệt.
10. Đóng/mở lại demo; xác nhận seed được khởi tạo lại và không tuyên bố dữ liệu được lưu bền.

## Kết quả mong đợi

- TC01–TC10 đạt; lưu lại kết quả từng case.
- Không có kết nối VCR hoặc dữ liệu thật.
- Bằng chứng prompt và ảnh trước/sau chỉ chứa dữ liệu giả.
- Hướng dẫn bàn giao nêu rõ reset bằng cách khởi tạo lại phiên và các giả định chưa được VCR xác nhận.
