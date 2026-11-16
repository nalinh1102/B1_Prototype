# UI Contract: B1 – Prototype cổng nhập liệu BQL TTTM

## Phạm vi giao diện

Bản mẫu có năm trang: Tổng quan, Danh sách biểu mẫu, Nhập/sửa biểu mẫu, Chờ duyệt, Chi tiết bản ghi. Mọi nhãn, nút, trạng thái và lỗi hiển thị bằng tiếng Việt. Mở ứng dụng cục bộ trên Windows; không có API, đăng nhập hoặc quyền production.

Mọi dữ liệu mẫu phải kèm nhãn “Giả định phục vụ demo, chờ VCR xác nhận”.

## Điều hướng và vai trò

- Bộ chọn vai trò gồm Nhân viên TTTM, Người duyệt và Người theo dõi.
- Nhân viên thấy luồng biểu mẫu và bản ghi Nháp/Cần sửa.
- Người duyệt thấy hàng đợi Chờ duyệt và thao tác Duyệt/Trả lại.
- Người theo dõi thấy dashboard trạng thái; không có thao tác sửa.
- Bộ chọn vai trò chỉ mô phỏng hành vi, không được mô tả là đăng nhập hoặc phân quyền thật.

## Trang Tổng quan

- Kỳ mặc định: tháng 11/2026; chọn kỳ cập nhật nội dung theo kỳ đó.
- Danh sách ba TTTM: Mẫu A, Mẫu B, Mẫu C.
- Seed ban đầu: A Đã duyệt, B Chờ duyệt, C Chưa gửi.
- Bộ đếm ban đầu: Đã duyệt 1, Chờ duyệt 1, Chưa gửi 1, Cần sửa 0.
- Bộ đếm suy ra từ báo cáo vận hành hiện tại; không lưu sẵn con số.
- C Chưa gửi không được tạo thành một bản ghi.
- Đề xuất xử lý vấn đề không được cộng vào bộ đếm báo cáo vận hành.
- Nếu một TTTM có nhiều hạng mục, hiển thị chi tiết từng hạng mục và dùng quy tắc tổng hợp trong data-model.md; quy tắc này cần xác nhận trước Tasks.

## Trang Danh sách biểu mẫu

Hiển thị đúng hai loại:
1. Báo cáo vận hành định kỳ.
2. Đề xuất xử lý vấn đề.

Danh sách bản ghi cho biết TTTM, loại biểu mẫu, kỳ/ngày gửi và trạng thái. Chưa gửi là trạng thái dashboard, không phải một dòng bản ghi biểu mẫu.

## Trang Nhập/sửa biểu mẫu

### Báo cáo vận hành định kỳ

Trường: Tên TTTM, Tháng báo cáo, Hạng mục báo cáo, Số việc cần hoàn thành, Số việc đã hoàn thành, Ghi chú, Ngày gửi.

- TTTM, tháng và hạng mục bắt buộc khi gửi.
- Số lượng là số nguyên không âm; số hoàn thành không lớn hơn số cần hoàn thành.
- Có thể lưu bản nháp chưa hoàn chỉnh.
- Ngày gửi trống ở Nháp, được ghi khi Gửi duyệt hoặc gửi lại.
- Nút hành động: Lưu nháp, Gửi duyệt.

### Đề xuất xử lý vấn đề

Trường: Tên TTTM, Ngày gửi, Loại vấn đề, Mô tả vấn đề, Mức ưu tiên, Ngày mong muốn xử lý, Ghi chú, Hình ảnh đính kèm nếu có.

- TTTM, loại vấn đề, mô tả và mức ưu tiên bắt buộc khi gửi.
- Mức ưu tiên là Thấp, Thường hoặc Cao.
- Ngày mong muốn xử lý không trước ngày gửi.
- Ảnh tùy chọn chỉ được chọn/xem trước; không upload hoặc lưu server.
- Có thể lưu bản nháp chưa hoàn chỉnh.

Lỗi validation hiển thị bằng tiếng Việt tại trường liên quan và chặn Gửi duyệt.

## Trang Chờ duyệt và Chi tiết

- Hàng đợi chỉ hiển thị bản ghi Chờ duyệt.
- Người duyệt mở chi tiết và chọn Duyệt hoặc Trả lại.
- Trả lại yêu cầu lý do; lý do được hiển thị cho nhân viên.
- Sau khi trả lại, nhân viên sửa và gửi lại.
- Duyệt chuyển bản ghi sang Đã duyệt và khóa chỉnh sửa ở mọi view demo.
- Không có thao tác khóa kỳ báo cáo.

## Tính toàn vẹn trạng thái

- Cho phép: Nháp → Chờ duyệt; Chờ duyệt → Cần sửa/Đã duyệt; Cần sửa → Chờ duyệt.
- Chặn gửi nếu thiếu trường bắt buộc hoặc vi phạm validation.
- Chặn trả lại nếu thiếu lý do.
- Chặn sửa bản ghi Đã duyệt.
- “Chưa gửi” được tính từ TTTM/kỳ; không tồn tại như record.
- Mỗi TTTM/tháng/hạng mục có tối đa một báo cáo vận hành.