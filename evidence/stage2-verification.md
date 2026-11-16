# Bằng chứng kiểm chứng – Implement đợt 2

Ngày: 13/11/2026
Phạm vi: User Story 1, T007–T013. Không triển khai luồng duyệt/trả lại, dashboard hoặc P1.

## Lệnh và kết quả

- npm.cmd run typecheck — PASS, mã thoát 0.
- npm.cmd run build — PASS, Vite chuyển đổi 26 module. Build phát sinh output trong dist/.
- npm.cmd test -- --run — PASS, 2 file test, 10 test PASS, 0 FAIL.
- Không cài package và không thay đổi cấu hình Windows.

## Kết quả theo case

- TC01: Cả hai biểu mẫu gửi hợp lệ; state và danh sách hiển thị Chờ duyệt cùng ngày gửi.
- TC02: Báo cáo vận hành xóa giá trị tháng mặc định 2026-11 trước khi gửi để kiểm tra trường tháng bắt buộc. Hai biểu mẫu báo lỗi tiếng Việt, không gửi bản ghi thiếu; vẫn lưu nháp và không ghi ngày gửi.
- TC03: Số âm bị từ chối; danh sách không tăng số bản ghi.
- TC04: Số hoàn thành vượt số cần làm bị từ chối; danh sách không tăng số bản ghi.
- TC05: Ngày trước ngày gửi bị từ chối và không tạo bản ghi; ngày cùng ngày được gửi, ghi ngày gửi và xuất hiện trong danh sách.
- TC-DUP: Trùng TTTM/tháng/hạng mục bị chặn khi lưu nháp và gửi; cập nhật bản nháp của chính nó không tạo thêm bản ghi. Kiểm thử cũng xác nhận bỏ qua chính record đang sửa.
- Xem trước ảnh cục bộ: PASS; test xác nhận ảnh được xem trước qua blob URL.

## Phạm vi task

- T009, T010, T011 và T013 đáp ứng tiêu chí đã kiểm tra và được đánh dấu hoàn thành trong tasks.md.
- T007 và T008 có file test và các case hiện chạy PASS. Chưa có bằng chứng ghi lại lần test đỏ trước khi triển khai; hai task vẫn để mở để không khẳng định bước lịch sử chưa xác minh.
- T012 vẫn để mở. Tạo/chọn biểu mẫu, lưu/gửi và hiển thị bản ghi đã có; chưa có kiểm thử đầu-cuối qua App cho điều hướng Tạo/Mở bản nháp. Gửi lại bản ghi Cần sửa phụ thuộc workflow của US2, đặc biệt T015 và T018. Không triển khai phần phụ thuộc này trong đợt 2.

## Giới hạn

Đây là kiểm chứng tự động cho các test hiện có, không phải smoke test thủ công trên trình duyệt. Không kiểm tra TC06–TC10, không kết nối hệ thống VCR và không dùng dữ liệu vận hành thật. Kết quả không phải nghiệm thu của BO/VCR.
