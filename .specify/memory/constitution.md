<!--
Sync Impact Report
Version change: 1.0.0 -> 1.1.0 (MINOR: materially expanded project-specific B1 governance)
Modified principles:
- I. Prototype Scope and Simplicity -> I. Dùng Codex và Spec Kit, không phát triển Agent mới
- II. Reproducible Behavior and Documentation -> II. Đặc tả trước, demo trước
- III. Data Stewardship and Security -> III. Ưu tiên tiếng Việt, luồng theo vai trò
- IV. Verification at Contracts -> IV. Dữ liệu giả lập và tuyên bố có bằng chứng
- V. Maintainability and Explicit Dependencies -> V. Thay đổi kiểm thử được, bằng chứng bàn giao
Added sections:
- Phạm vi demo và ràng buộc
- Quy trình phát triển và bằng chứng
Removed sections:
- Technical Constraints and Data Boundaries (replaced)
- Development Workflow and Quality Gates (replaced)
Follow-up TODOs:
- Confirm the original ratification date; it is not recorded in the current project file.
- Confirm demo role permissions, form fields, validation rules, and approval details with VCR/BO.
- The V-Assistant Mini Apps image referenced by the source document was not found at its linked path.
-->
# B1 TTTM Prototype Constitution

## Core Principles

### I. Dùng Codex và Spec Kit, không phát triển Agent mới
Cán bộ nghiệp vụ MUST có thể yêu cầu Codex bằng tiếng Việt để tạo hoặc chỉnh sửa
prototype và biểu mẫu trong VS Code. Spec Kit MUST được dùng để quản lý đặc tả và
quy trình phát triển. Dự án MUST NOT xây dựng một AI Agent mới hoặc cài lại Spec Kit.
Rationale: B1 đánh giá cách dùng Codex để tạo bản mẫu, không xây một nền tảng agent khác.

### II. Đặc tả trước, demo trước
Trước khi viết hoặc sửa code tính năng, MUST có đặc tả nêu người dùng, luồng, tiêu chí
chấp nhận và giới hạn kiểm thử. Ưu tiên bản mẫu nhỏ, chạy được và kiểm thử được cho báo
cáo ngày 13/11/2026. Mốc này MUST NOT được mô tả là hoàn thành MVP ngày 27/11/2026.
Tính năng ngoài phạm vi báo cáo MUST được ghi nhận cho giai đoạn sau.
Rationale: đặc tả và mốc riêng giúp giữ bản báo cáo khả thi mà không phóng đại mức hoàn thiện.

### III. Ưu tiên tiếng Việt, luồng theo vai trò
Giao diện demo MUST dùng tiếng Việt, đơn giản và chạy cục bộ trên Windows. Phạm vi gồm
Báo cáo vận hành định kỳ và Đề xuất xử lý vấn đề; luồng nhập liệu, gửi duyệt, duyệt hoặc
trả lại để sửa, và khóa bản ghi sau khi duyệt. MUST phân biệt khóa bản ghi với khóa kỳ
báo cáo. Dashboard MUST theo dõi tình trạng nộp theo TTTM.
Rationale: người dùng nghiệp vụ cần thử luồng thực tế trên bản mẫu dễ thao tác.

### IV. Dữ liệu giả lập và tuyên bố có bằng chứng
Bản mẫu MUST NOT kết nối hệ thống VCR hoặc dùng dữ liệu vận hành thật. Dữ liệu giả lập
MUST mang nhãn “Giả định phục vụ demo, chờ VCR xác nhận”. Giả định demo MUST được tách
rõ khỏi quy trình được VCR xác nhận. Không được tuyên bố BO đã nghiệm thu hoặc hiệu quả
đã được đo nếu chưa có bằng chứng ghi nhận cho tuyên bố đó.
Rationale: dữ liệu và kết quả giả lập không chứng minh quy trình thật đã được phê duyệt
hay hiệu quả đã được kiểm chứng.

### V. Thay đổi kiểm thử được, bằng chứng bàn giao
Mỗi thay đổi code MUST có kiểm thử phù hợp và bằng chứng có thể xem lại. Mỗi lần chỉnh
prototype bằng yêu cầu tiếng Việt MUST ghi nhận nội dung yêu cầu, kết quả thay đổi và
bằng chứng kiểm tra. Hướng dẫn bàn giao MUST nêu cách chạy cục bộ, thao tác các vai trò,
luồng biểu mẫu, cách kiểm thử và giới hạn đã biết. Khi không thể tự động kiểm thử, MUST
ghi lại bước kiểm tra thủ công và kết quả.
Rationale: bằng chứng giúp người hướng dẫn và cán bộ nghiệp vụ đánh giá đúng phạm vi bản mẫu.

## Phạm vi demo và ràng buộc

- Hai biểu mẫu demo là Báo cáo vận hành định kỳ và Đề xuất xử lý vấn đề. Không tự thêm
  biểu mẫu hoặc chức năng ngoài phạm vi báo cáo 13/11/2026.
- Ba vai trò demo là nhân viên TTTM, người duyệt và người theo dõi. Quyền giả định cho
  demo: nhân viên nhập/sửa/gửi; người duyệt duyệt hoặc trả lại; người theo dõi chỉ xem.
  Quyền này MUST mang nhãn giả định đến khi VCR xác nhận.
- Dữ liệu minh họa MUST dùng ba TTTM giả lập: Mẫu A đã duyệt, Mẫu B chờ duyệt, Mẫu C
  chưa gửi. Mỗi dữ liệu phải mang nhãn “Giả định phục vụ demo, chờ VCR xác nhận”.
- Khi duyệt, bản ghi MUST chuyển sang trạng thái khóa và không cho sửa trong demo.
  Khóa bản ghi không đồng nghĩa với khóa kỳ báo cáo; khóa kỳ báo cáo nằm ngoài phạm vi
  trừ khi được xác nhận riêng.
- Mọi thao tác đọc/ghi MUST giới hạn trong thư mục B1_TTTM_Prototype. Tài liệu đầu vào
  bên ngoài chỉ được đọc theo chỉ định và MUST NOT bị sửa, xóa hoặc ghi đè.
- Công việc B1 MUST NOT dùng Git hoặc GitHub, chạy lệnh Git, tạo repository, branch,
  commit hoặc remote. Cấu hình Spec Kit hiện có MUST được giữ nguyên.

## Quy trình phát triển và bằng chứng

- Specification-first áp dụng cho mọi công việc tính năng sau bước Constitution này.
  Đặc tả MUST phân biệt yêu cầu đã xác nhận với giả định; mỗi giả định chưa xác nhận
  MUST giữ nhãn “Giả định phục vụ demo, chờ VCR xác nhận”.
- Kiểm thử MUST bao phủ các trạng thái biểu mẫu, quyền demo, thao tác duyệt/trả lại,
  khóa bản ghi và trạng thái dashboard A/B/C. Kết quả MUST được lưu cùng bằng chứng.
- Với mỗi yêu cầu tiếng Việt dùng để chỉnh prototype, hồ sơ bằng chứng MUST ghi yêu cầu,
  ngày thực hiện, hành vi trước/sau và kết quả kiểm thử hoặc ảnh chụp phù hợp. Bằng chứng
  MUST chỉ dùng dữ liệu giả lập.
- Tài liệu bàn giao MUST hướng dẫn khởi chạy trên Windows, dữ liệu giả lập, các bước thử
  từng vai trò và cách khôi phục trạng thái demo. MUST nêu rõ phần nào chưa xác nhận.
- Tài liệu nguồn B1_B2_2026.md và ảnh đầu vào là nguồn chỉ đọc. Ảnh image.png được
  xem như tham khảo yêu cầu; không được xem là bằng chứng prototype đã chạy hay được duyệt.

## Governance

Hiến chương này áp dụng cho công việc B1 trong repository. Mọi sửa đổi MUST có lý do,
phạm vi ảnh hưởng và nội dung cập nhật; người duy trì dự án MUST rà soát và chấp thuận
trước khi nguyên tắc mới có hiệu lực. Thay đổi có ảnh hưởng tương thích MUST nêu cách
xử lý các bản mẫu hoặc tài liệu hiện có.

Version tuân theo semantic versioning: MAJOR cho thay đổi phá vỡ hoặc định nghĩa lại
nguyên tắc; MINOR cho nguyên tắc mới hoặc mở rộng đáng kể; PATCH cho làm rõ và sửa câu
chữ không đổi nghĩa. Mỗi sửa đổi được chấp thuận MUST cập nhật version và ngày sửa đổi.

Việc tuân thủ MUST được rà soát khi đặc tả, kiểm tra thay đổi và bàn giao. Rà soát MUST
kiểm tra phạm vi, dữ liệu giả, giả định, kết quả kiểm thử và bằng chứng. Mọi tuyên bố
về nghiệm thu hoặc hiệu quả MUST dẫn tới bằng chứng tương ứng; nếu chưa có, phải ghi là
chưa xác nhận.

**Version**: 1.1.0 | **Ratified**: TODO(RATIFICATION_DATE): ngày phê chuẩn ban đầu chưa có trong hồ sơ; xác nhận khi biết | **Last Amended**: 2026-11-13
