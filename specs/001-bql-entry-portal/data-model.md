# Data Model: B1 – Prototype cổng nhập liệu BQL TTTM

## Nguyên tắc

- Tất cả dữ liệu là giả lập, mang nhãn “Giả định phục vụ demo, chờ VCR xác nhận”.
- State chỉ tồn tại trong phiên demo; seed khởi tạo lại khi bắt đầu phiên mới.
- “Chưa gửi” là projection tính từ TTTM và báo cáo vận hành trong kỳ, không phải bản ghi.
- Đề xuất xử lý vấn đề dùng chung quy trình duyệt nhưng không tham gia bộ đếm báo cáo vận hành.

## Entities

### TTTM giả lập

| Trường | Ý nghĩa |
| --- | --- |
| centerId | Khóa nội bộ ổn định cho dữ liệu demo |
| displayName | Mẫu A, Mẫu B hoặc Mẫu C |
| demoLabel | Nhãn giả định áp dụng cho dữ liệu mẫu |

### Vai trò demo

| Giá trị | Hành động minh họa |
| --- | --- |
| Nhân viên TTTM | Tạo/lưu nháp, sửa nháp hoặc bản ghi Cần sửa, gửi và gửi lại |
| Người duyệt | Xem hàng đợi, duyệt hoặc trả lại bản ghi Chờ duyệt |
| Người theo dõi | Xem dashboard và trạng thái theo TTTM/kỳ |

Bộ chọn chỉ đổi vai trò giao diện; không xác thực danh tính hoặc bảo vệ dữ liệu như hệ thống production.

### Báo cáo vận hành định kỳ

| Trường | Quy tắc |
| --- | --- |
| recordId | Mã bản ghi demo |
| centerId | TTTM sở hữu báo cáo |
| reportMonth | Tháng dạng YYYY-MM; mặc định 2026-11 |
| category | Hạng mục báo cáo; danh mục chính thức chưa có |
| requiredCount | Số nguyên không âm |
| completedCount | Số nguyên không âm và không lớn hơn requiredCount |
| notes | Ghi chú tùy chọn |
| submittedAt | Trống khi Nháp; ghi lúc gửi hoặc gửi lại |
| status | Nháp, Chờ duyệt, Cần sửa hoặc Đã duyệt |
| returnReason | Bắt buộc khi chuyển sang Cần sửa |
| demoLabel | Nhãn giả định hiển thị cùng dữ liệu mẫu |

**Uniqueness**: Một TTTM có tối đa một báo cáo cho cùng reportMonth và category. Khóa duy nhất dự kiến là centerId + reportMonth + category. Quy tắc áp dụng cả bản nháp để không tạo trùng; khi sửa chính bản ghi hiện có thì không tự xung đột với chính nó. Quy tắc này do người dùng bổ sung trong yêu cầu Plan và cần có kiểm tra trước khi gửi Tasks.

### Đề xuất xử lý vấn đề

| Trường | Quy tắc |
| --- | --- |
| recordId | Mã bản ghi demo |
| centerId | TTTM sở hữu đề xuất |
| submittedAt | Trống khi Nháp; ghi lúc gửi hoặc gửi lại |
| issueType | Loại vấn đề; danh mục chính thức chưa có |
| description | Mô tả bắt buộc |
| priority | Thấp, Thường hoặc Cao |
| desiredResolutionDate | Không trước submittedAt |
| notes | Ghi chú tùy chọn |
| attachmentPreview | Tên và tham chiếu xem trước tạm thời; không upload/lưu server |
| status | Nháp, Chờ duyệt, Cần sửa hoặc Đã duyệt |
| returnReason | Bắt buộc khi bị trả lại |
| demoLabel | Nhãn giả định hiển thị cùng dữ liệu mẫu |

### Kỳ báo cáo

| Trường | Ý nghĩa |
| --- | --- |
| reportMonth | Kỳ đang xem, mặc định 2026-11 |
| selectedCenterIds | TTTM có trong phạm vi demo |

Kỳ báo cáo chỉ dùng để lọc/tổng hợp; không có thuộc tính khóa kỳ chính thức.

## Initial Seed

- TTTM Mẫu A: một báo cáo tháng 11/2026 ở trạng thái Đã duyệt.
- TTTM Mẫu B: một báo cáo tháng 11/2026 ở trạng thái Chờ duyệt.
- TTTM Mẫu C: không có báo cáo vận hành tháng 11/2026; trạng thái Chưa gửi được suy ra.
- Bộ đếm ban đầu: Đã duyệt = 1, Chờ duyệt = 1, Chưa gửi = 1, Cần sửa = 0.
- Không có đề xuất xử lý vấn đề nào được cộng vào các bộ đếm trên.

## Derived Dashboard Projection

1. Lọc danh sách TTTM theo phạm vi demo và chọn reportMonth.
2. Lọc báo cáo vận hành theo centerId và reportMonth; không đọc dữ liệu đề xuất.
3. Không có báo cáo đã gửi trong kỳ: hiển thị Chưa gửi; không tạo record giả.
4. Có báo cáo: hiển thị trạng thái theo dữ liệu hiện tại; bộ đếm được tính lại sau mọi chuyển trạng thái.
5. Với nhiều category, đề xuất trạng thái tổng hợp theo mức cần xử lý: Cần sửa nếu có bản ghi Cần sửa; nếu không, Chờ duyệt nếu có bản ghi Chờ duyệt; nếu mọi báo cáo hiện có đã duyệt thì Đã duyệt. Bản nháp chưa gửi không được tính là đã nộp.

**Điểm cần xác nhận**: Quy tắc trên không biết danh sách category kỳ vọng. Vì vậy “Đã duyệt” chỉ có nghĩa mọi báo cáo hiện có đã duyệt, không khẳng định đã nộp đủ mọi hạng mục. Hiển thị category chi tiết bên dưới trạng thái tổng hợp để tránh che khuất dữ liệu; xác nhận cách tổng hợp trước khi tạo Tasks.

## State Transitions

| Trạng thái hiện tại | Hành động | Điều kiện | Trạng thái mới |
| --- | --- | --- | --- |
| Nháp | Lưu nháp | Có thể thiếu trường; chưa gửi | Nháp |
| Nháp | Gửi duyệt | Tất cả trường bắt buộc và quy tắc hợp lệ | Chờ duyệt |
| Chờ duyệt | Duyệt | Người duyệt chọn Duyệt | Đã duyệt, chỉ đọc |
| Chờ duyệt | Trả lại | Có lý do trả lại | Cần sửa |
| Cần sửa | Lưu thay đổi | Nhân viên chỉnh nội dung | Cần sửa |
| Cần sửa | Gửi lại | Dữ liệu hợp lệ | Chờ duyệt |
| Đã duyệt | Bất kỳ thao tác sửa | Không cho phép | Đã duyệt, không đổi |

Khóa là thuộc tính hành vi của bản ghi Đã duyệt; không phải trạng thái khóa kỳ báo cáo.