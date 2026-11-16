# Feature Specification: B1 – Prototype cổng nhập liệu Ban quản lý TTTM – Mốc 13/11/2026

**Feature Branch**: Không áp dụng — đặc tả cục bộ; không tạo branch hoặc thao tác Git/GitHub

**Created**: 2026-11-13

**Status**: Draft — chờ người dùng kiểm tra

**Input**: Yêu cầu B1 do người dùng cung cấp trong cuộc trò chuyện; bản mẫu giả lập phục vụ báo cáo tiến độ, không phải hệ thống chính thức của Vincom Retail.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Nhân viên nhập và gửi biểu mẫu (Priority: P1)

Là nhân viên TTTM, tôi muốn chọn một trong hai biểu mẫu, nhập dữ liệu, lưu nháp và gửi duyệt để báo cáo hoặc đề xuất được chuyển tới người duyệt.

**Why this priority**: Nhập và gửi là luồng nghiệp vụ cốt lõi để kiểm tra hai biểu mẫu và trạng thái nộp.

**Independent Test**: Chọn vai trò nhân viên demo, hoàn thành một báo cáo vận hành hợp lệ và một đề xuất hợp lệ; xác nhận mỗi biểu mẫu lưu được, gửi được, chuyển sang Chờ duyệt và ngày gửi được ghi nhận.

**Acceptance Scenarios**:

1. **Given** vai trò Nhân viên TTTM và một biểu mẫu mới, **When** nhập dữ liệu hợp lệ và chọn Lưu nháp, **Then** bản ghi có trạng thái Nháp và chưa có ngày gửi.
2. **Given** một bản nháp hợp lệ, **When** chọn Gửi duyệt, **Then** bản ghi chuyển sang Chờ duyệt và ngày gửi được ghi nhận.
3. **Given** biểu mẫu thiếu trường bắt buộc hoặc vi phạm quy tắc, **When** nhân viên chọn Gửi duyệt, **Then** thông báo tiếng Việt nêu lỗi và không gửi bản ghi. **When** nhân viên chọn Lưu nháp, **Then** bản ghi vẫn được lưu ở trạng thái Nháp để bổ sung sau.
4. **Given** một đề xuất có ảnh tùy chọn, **When** chọn ảnh, **Then** người dùng xem trước được ảnh trong demo mà không gửi ảnh lên máy chủ thật.

---

### User Story 2 - Người duyệt xử lý và khóa bản ghi (Priority: P1)

Là người duyệt, tôi muốn xem bản ghi chờ duyệt, duyệt hoặc trả lại kèm lý do để nhân viên biết cách sửa.

**Why this priority**: Luồng duyệt và trạng thái khóa là tiêu chí bắt buộc để trình diễn quy trình nhập liệu hoàn chỉnh.

**Independent Test**: Dùng một bản ghi đang Chờ duyệt; thử cả nhánh duyệt và nhánh trả lại, gồm sửa và gửi lại sau khi trả.

**Acceptance Scenarios**:

1. **Given** bản ghi Chờ duyệt, **When** người duyệt chọn Duyệt, **Then** trạng thái chuyển thành Đã duyệt và bản ghi không thể sửa.
2. **Given** bản ghi Chờ duyệt, **When** người duyệt chọn Trả lại mà chưa nhập lý do, **Then** thao tác bị từ chối và giao diện yêu cầu lý do.
3. **Given** bản ghi Chờ duyệt, **When** người duyệt trả lại kèm lý do, **Then** trạng thái chuyển thành Cần sửa, lý do hiển thị cho nhân viên và nhân viên được sửa bản ghi.
4. **Given** bản ghi Cần sửa đã được cập nhật hợp lệ, **When** nhân viên chọn Gửi duyệt, **Then** trạng thái trở lại Chờ duyệt và ngày gửi được cập nhật theo lần gửi mới nhất.
5. **Given** bản ghi Đã duyệt, **When** bất kỳ vai trò demo nào thử chỉnh sửa, **Then** dữ liệu không thay đổi và giao diện thể hiện bản ghi đã khóa.

---

### User Story 3 - Người theo dõi xem tình trạng nộp (Priority: P1)

Là người theo dõi, tôi muốn biết tình trạng báo cáo của từng TTTM trong tháng để nhận ra nơi đã nộp, đang chờ duyệt hoặc chưa gửi.

**Why this priority**: Dashboard tình trạng nộp là một trong các giao phẩm chính của bản mẫu.

**Independent Test**: Mở dashboard với dữ liệu giả lập tháng 11/2026; xác nhận ba trạng thái ban đầu, sau đó thay đổi một trạng thái báo cáo và xác nhận bộ đếm được tính lại.

**Acceptance Scenarios**:

1. **Given** dữ liệu ban đầu, **When** mở dashboard, **Then** Mẫu A là Đã duyệt, Mẫu B là Chờ duyệt, Mẫu C là Chưa gửi; các bộ đếm lần lượt là 1, 1 và 1.
2. **Given** Mẫu C chưa có bản ghi báo cáo, **When** xem dashboard, **Then** C vẫn được tính là Chưa gửi nhưng không xuất hiện như một bản ghi đã tạo.
3. **Given** trạng thái báo cáo thay đổi, **When** xem lại dashboard, **Then** bộ đếm phản ánh dữ liệu hiện tại thay vì giữ số cố định.
4. **Given** có đề xuất xử lý vấn đề, **When** xem bộ đếm báo cáo vận hành, **Then** đề xuất đó không làm thay đổi bộ đếm.

---

### User Story 4 - Cán bộ nghiệp vụ yêu cầu Codex chỉnh prototype (Priority: P2)

Là cán bộ nghiệp vụ, tôi muốn đưa yêu cầu chỉnh sửa bằng tiếng Việt cho Codex để quan sát prototype được thay đổi và lưu bằng chứng trước/sau.

**Why this priority**: Khả năng chỉnh prototype bằng ngôn ngữ tự nhiên là mục tiêu của B1, nhưng phải được chứng minh trên bản mẫu nền đã hoàn thành trước.

**Independent Test**: Ghi lại trạng thái prototype nền, lần lượt thử ba yêu cầu tiếng Việt được nêu trong đặc tả và lưu yêu cầu cùng bằng chứng trước/sau cho từng thay đổi thực sự.

**Acceptance Scenarios**:

1. **Given** prototype nền đã được ghi nhận, **When** yêu cầu Codex “Thêm ô Người phụ trách.”, **Then** trường mới hiển thị trong biểu mẫu phù hợp và có bằng chứng trước/sau.
2. **Given** prototype nền đã được ghi nhận, **When** yêu cầu Codex “Thêm bộ lọc theo TTTM.”, **Then** bộ lọc hoạt động trên danh sách phù hợp và có bằng chứng trước/sau.
3. **Given** nút gửi trên prototype, **When** yêu cầu Codex “Đổi nút Gửi thành Gửi duyệt.”, **Then** nhãn nút thay đổi thật và có bằng chứng. Nếu nhãn hiện tại đã là Gửi duyệt, dùng yêu cầu đổi nhãn có ý nghĩa, ví dụ “Đổi nút Gửi duyệt thành Gửi để phê duyệt.”; không ghi nhận một thay đổi không xảy ra.
4. **Given** một yêu cầu chỉnh sửa, **When** lưu hồ sơ bằng chứng, **Then** hồ sơ có nội dung yêu cầu, ngày thực hiện, hành vi trước/sau và kết quả kiểm thử hoặc ảnh chụp phù hợp.

---

### Edge Cases

- Biểu mẫu thiếu trường bắt buộc không được gửi và phải hiển thị lỗi tiếng Việt; nhân viên vẫn có thể lưu nháp để bổ sung sau.
- Số lượng âm, số thập phân, hoặc số việc hoàn thành lớn hơn số việc cần hoàn thành; từ chối dữ liệu không hợp lệ. Giá trị 0 được chấp nhận.
- Ngày gửi của bản nháp còn trống; ngày gửi được ghi nhận khi gửi duyệt.
- Ngày mong muốn xử lý trước ngày gửi bị từ chối; cùng ngày được chấp nhận.
- Trả lại nhưng không có lý do; người duyệt không thể hoàn tất thao tác.
- Nhân viên thử sửa bản ghi Chờ duyệt hoặc Đã duyệt; chỉ bản ghi Nháp hoặc Cần sửa được phép chỉnh.
- TTTM Chưa gửi không có bản ghi nhưng vẫn được tính trong dashboard.
- Trạng thái báo cáo vận hành thay đổi; bộ đếm cập nhật đúng, không âm và không tính đề xuất xử lý vấn đề.
- Ảnh không được chọn; biểu mẫu đề xuất vẫn có thể gửi vì ảnh là tùy chọn.
- Người dùng mở/đóng xem trước ảnh; demo không tuyên bố đã lưu ảnh lên hệ thống thật.
- Lặp lại thao tác duyệt hoặc gửi trên bản ghi đã ở trạng thái khác; thao tác không làm sai trạng thái hoặc tạo số đếm trùng.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Bản mẫu MUST cung cấp bộ chọn ba vai trò demo: Nhân viên TTTM, Người duyệt và Người theo dõi; không yêu cầu đăng nhập thật.
- **FR-002**: Giao diện, trạng thái, nút và thông báo kiểm tra dữ liệu MUST hiển thị hoàn toàn bằng tiếng Việt và dễ thao tác trên laptop Windows.
- **FR-003**: Bản mẫu MUST có trang tổng quan, trang danh sách biểu mẫu, trang nhập/sửa biểu mẫu, trang chờ duyệt, và trang chi tiết với thao tác duyệt/trả lại.
- **FR-004**: Nhân viên MUST tạo và lưu nháp hai loại biểu mẫu: Báo cáo vận hành định kỳ và Đề xuất xử lý vấn đề.
- **FR-005**: Báo cáo vận hành MUST có các trường Tên TTTM, Tháng báo cáo, Hạng mục báo cáo, Số việc cần hoàn thành, Số việc đã hoàn thành, Ghi chú và Ngày gửi.
- **FR-006**: Khi Gửi duyệt, báo cáo vận hành MUST có TTTM, tháng và hạng mục; hai số lượng MUST là số nguyên không âm; số việc đã hoàn thành MUST không lớn hơn số việc cần hoàn thành. Lưu nháp được phép thiếu hoặc chứa giá trị cần sửa.
- **FR-007**: Ngày gửi của báo cáo vận hành MUST được ghi nhận khi người dùng chọn Gửi duyệt, không phải khi tạo bản nháp.
- **FR-008**: Đề xuất xử lý vấn đề MUST có các trường Tên TTTM, Ngày gửi, Loại vấn đề, Mô tả vấn đề, Mức ưu tiên, Ngày mong muốn xử lý, Ghi chú và Hình ảnh đính kèm nếu có.
- **FR-009**: Khi Gửi duyệt, đề xuất MUST có TTTM, loại vấn đề, mô tả và mức ưu tiên; mức ưu tiên MUST chọn một trong Thấp, Thường hoặc Cao. Lưu nháp được phép thiếu hoặc chứa giá trị cần sửa.
- **FR-010**: Ngày mong muốn xử lý MUST không trước ngày gửi. Ngày gửi MUST được ghi nhận lúc gửi duyệt; ngày mong muốn bằng ngày gửi được chấp nhận.
- **FR-011**: Ảnh đính kèm MUST chỉ cần được chọn và xem trước trong demo; bản mẫu MUST NOT tải ảnh lên máy chủ thật.
- **FR-012**: Trạng thái bản ghi MUST là Nháp, Chờ duyệt, Cần sửa hoặc Đã duyệt. “Chưa gửi” MUST là trạng thái theo dõi của TTTM trong kỳ, không phải bản ghi.
- **FR-013**: Người duyệt MUST có thể duyệt hoặc trả lại bản ghi Chờ duyệt. Trả lại MUST yêu cầu lý do và hiển thị lý do cho nhân viên.
- **FR-014**: Nhân viên MUST được sửa bản ghi Nháp hoặc Cần sửa và gửi lại bản ghi Cần sửa.
- **FR-015**: Khi được duyệt, bản ghi MUST chuyển thành chỉ đọc và không thể sửa từ các trang demo.
- **FR-016**: Khóa bản ghi sau duyệt MUST được phân biệt với khóa kỳ báo cáo. Bản mẫu MUST NOT triển khai hoặc giả lập quy định khóa kỳ thật.
- **FR-017**: Dashboard báo cáo vận hành tháng 11/2026 MUST khởi tạo Mẫu A là Đã duyệt, Mẫu B là Chờ duyệt, Mẫu C là Chưa gửi; ban đầu hiển thị lần lượt 1, 1, 1. Bộ đếm Cần sửa MUST bắt đầu từ 0 và tính theo bản ghi hiện tại.
- **FR-018**: Bộ đếm dashboard cho Đã duyệt, Chờ duyệt, Cần sửa và Chưa gửi MUST được tính từ trạng thái dữ liệu hiện tại và cập nhật sau khi trạng thái báo cáo thay đổi; không được cố định số đếm.
- **FR-019**: Dashboard MUST không tạo bản ghi cho TTTM Chưa gửi và MUST không gộp đề xuất xử lý vấn đề vào bộ đếm báo cáo vận hành.
- **FR-020**: Mọi dữ liệu giả MUST hiển thị nguyên văn nhãn “Giả định phục vụ demo, chờ VCR xác nhận”.
- **FR-021**: Bản mẫu MUST chạy cục bộ, MUST NOT kết nối hệ thống VCR hoặc sử dụng dữ liệu vận hành thật.
- **FR-022**: B1 MUST dùng Codex để hỗ trợ chỉnh prototype bằng yêu cầu tiếng Việt và MUST NOT xây dựng AI Agent mới.
- **FR-023**: Sau khi ghi nhận prototype nền, MUST thử ba yêu cầu chỉnh sửa Codex được nêu trong User Story 4; mỗi thay đổi thật MUST có bằng chứng trước/sau. Nếu thao tác không tạo ra thay đổi, MUST chọn tình huống chỉnh nhãn phù hợp thay vì tạo bằng chứng giả.
- **FR-024**: Bản bàn giao MUST có hướng dẫn chạy cục bộ, chọn vai trò demo, nhập/gửi/duyệt/trả lại biểu mẫu, kiểm tra dashboard và các giới hạn chưa xác nhận.
- **FR-025**: Phạm vi báo cáo 13/11 MUST tập trung vào các luồng và kiểm thử trong đặc tả này; tính năng khác thuộc giai đoạn sau, không phải tiêu chí hoàn thành mốc này.

### Acceptance Test Cases

| ID | Tình huống | Kết quả chấp nhận |
| --- | --- | --- |
| TC01 | Nhập hợp lệ và gửi thành công trên từng loại biểu mẫu | Biểu mẫu lưu được, gửi được, chuyển sang Chờ duyệt; ngày gửi được ghi nhận lúc gửi. |
| TC02 | Bỏ trống trường bắt buộc rồi chọn Gửi duyệt | Có thông báo tiếng Việt tại trường lỗi; biểu mẫu không được gửi. Bản ghi chưa đủ dữ liệu vẫn có thể lưu nháp. |
| TC03 | Nhập số âm vào trường số lượng | Giá trị bị từ chối; không gửi được. |
| TC04 | Số việc đã hoàn thành lớn hơn số việc cần hoàn thành | Giá trị bị từ chối; không gửi được. |
| TC05 | Ngày mong muốn xử lý trước ngày gửi | Giá trị bị từ chối; ngày cùng ngày được chấp nhận. |
| TC06 | Người duyệt duyệt bản ghi Chờ duyệt | Trạng thái thành Đã duyệt; bản ghi chuyển sang chỉ đọc. |
| TC07 | Người duyệt trả lại, nhân viên sửa và gửi lại | Lý do bắt buộc; bản ghi sang Cần sửa, sửa được, gửi lại thành Chờ duyệt. |
| TC08 | Mở dashboard với dữ liệu mẫu ban đầu | A Đã duyệt = 1; B Chờ duyệt = 1; C Chưa gửi = 1; Cần sửa = 0; C không có bản ghi. |
| TC09 | Thay đổi trạng thái báo cáo vận hành, gồm chuyển sang Cần sửa | Các bộ đếm liên quan tính lại từ dữ liệu hiện tại; đề xuất xử lý vấn đề không ảnh hưởng bộ đếm. |
| TC10 | Thử sửa bản ghi Đã duyệt | Không trường nào có thể thay đổi; giao diện thông báo bản ghi đã khóa. |

### Constraints

- Báo cáo mốc 13/11/2026 là bản mẫu giả lập; không phải nghiệm thu, go-live hoặc hoàn thành MVP ngày 27/11/2026.
- Không kết nối VCR, không sử dụng dữ liệu vận hành thật, không tạo đăng nhập/phân quyền production.
- Chỉ dùng Codex và Spec Kit đã có; không xây Agent mới, cài lại Spec Kit hoặc dùng Git/GitHub.
- Tài liệu đầu vào ngoài workspace chỉ được đọc; không sửa, xóa hoặc ghi đè.
- Các thử nghiệm thay đổi bằng Codex được thực hiện sau khi chụp/ghi lại trạng thái prototype nền; kết quả thử nghiệm không được nhầm là phạm vi baseline.

### Key Entities *(include if data involved)*

- **Biểu mẫu**: Một trong hai loại biểu mẫu demo, gồm tên trường và quy tắc nhập liệu.
- **Bản ghi biểu mẫu**: Dữ liệu của một lần điền, thuộc một TTTM và loại biểu mẫu; có trạng thái, thời điểm gửi và lý do trả lại nếu có.
- **Tình trạng nộp theo TTTM/kỳ**: Trạng thái theo dõi báo cáo của một TTTM trong tháng; có thể là Chưa gửi mà không có bản ghi.
- **Vai trò demo**: Nhân viên TTTM, Người duyệt hoặc Người theo dõi; bộ chọn vai trò không phải xác thực danh tính.
- **Bằng chứng chỉnh sửa**: Yêu cầu tiếng Việt đưa cho Codex, thời điểm, trạng thái trước/sau và kết quả kiểm tra hoặc ảnh chụp.
- **Dữ liệu mẫu**: Dữ liệu giả cho Mẫu A/B/C, luôn mang nhãn giả định; không đại diện vận hành thực tế.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Cả 10 kiểm thử TC01–TC10 đều có thể chạy trên bản mẫu; mọi kết quả mong đợi trong bảng kiểm thử đều đạt.
- **SC-002**: Hai biểu mẫu hiển thị đủ trường đã nêu; mọi trường bắt buộc và quy tắc nhập liệu được kiểm tra bằng các tình huống hợp lệ/không hợp lệ tương ứng.
- **SC-003**: Với dữ liệu ban đầu, dashboard hiển thị 1 Đã duyệt, 1 Chờ duyệt, 1 Chưa gửi và 0 Cần sửa; sau khi thay đổi dữ liệu, các số đếm được tính lại chính xác.
- **SC-004**: Một người thử có thể hoàn tất luồng Nháp → Chờ duyệt → Cần sửa → Chờ duyệt → Đã duyệt bằng vai trò demo; bản ghi Đã duyệt không sửa được.
- **SC-005**: Cả ba yêu cầu chỉnh prototype bằng tiếng Việt có hồ sơ bằng chứng trước/sau; không ghi nhận thay đổi không xảy ra.
- **SC-006**: Người nhận bàn giao có thể làm theo hướng dẫn để mở demo cục bộ trên Windows, chọn vai trò và chạy ít nhất một luồng biểu mẫu từ đầu đến cuối.
- **SC-007**: Toàn bộ dữ liệu mẫu có nhãn giả định; không có kết nối VCR hoặc dữ liệu vận hành thật trong phạm vi demo.
- **SC-008**: Báo cáo 13/11 nêu rõ giới hạn và điểm chờ xác nhận, không tuyên bố BO nghiệm thu hoặc đã đo hiệu quả.

## Assumptions

- Mẫu A, Mẫu B và Mẫu C là tên giả lập, không ánh xạ tới TTTM thật. Dữ liệu khởi tạo chỉ là hai bản ghi báo cáo và một trạng thái theo dõi Chưa gửi; bộ đếm Cần sửa ban đầu bằng 0.
- Quyền demo mặc định: nhân viên tạo/sửa/gửi; người duyệt duyệt/trả lại; người theo dõi chỉ xem. Quyền này mang nhãn “Giả định phục vụ demo, chờ VCR xác nhận”.
- Mỗi TTTM có một trạng thái theo dõi báo cáo vận hành cho tháng 11/2026; quy tắc xử lý nhiều báo cáo cùng TTTM/tháng chưa được yêu cầu.
- Hạng mục báo cáo và loại vấn đề được nhập tự do vì chưa có danh mục được xác nhận.
- Ngày gửi của cả hai biểu mẫu được ghi nhận tại thời điểm gửi duyệt; khi gửi lại, ngày gửi phản ánh lần gửi gần nhất.
- Ngày mong muốn xử lý bằng ngày gửi được chấp nhận vì quy tắc chỉ cấm ngày trước ngày gửi.
- Ảnh xem trước chỉ tồn tại trong phiên demo; không có cam kết lưu trữ sau khi đóng hoặc tải lại bản mẫu.
- Ba yêu cầu Codex là thử nghiệm khả năng chỉnh sửa sau khi đã ghi nhận prototype nền; quyết định giữ các thay đổi đó trong bản bàn giao cuối cùng được để lại cho người dùng rà soát.
- Tên trường, danh mục giá trị, biểu thức kiểm tra ngoài quy tắc đã nêu, SLA, người có thẩm quyền duyệt và quy trình chính thức còn chờ VCR/BO xác nhận.
- Không có chỉ tiêu thời gian tiết kiệm hoặc kết quả nghiệm thu giả định; chỉ báo cáo nếu có phương pháp đo và bằng chứng được ghi nhận.
- Dữ liệu nháp và trạng thái demo được giữ trong phiên đang chạy; lưu giữ sau khi đóng hoặc khởi chạy lại chưa phải yêu cầu.

## Out of Scope

- Kết nối hệ thống VCR, tích hợp vận hành thật hoặc dùng dữ liệu thật.
- Đăng nhập, xác thực danh tính và phân quyền production.
- Khóa kỳ báo cáo theo quy định thực tế.
- Lưu ảnh lên máy chủ hoặc dịch vụ bên ngoài.
- Tích hợp V-Assistant Mini Apps khi chưa có điều kiện truy cập.
- Phân tích nâng cao, nhắc hạn tự động, thông báo ngoài prototype hoặc chức năng không nêu trong đặc tả.
- Tuyên bố BO đã nghiệm thu hoặc tuyên bố hiệu quả đã được đo khi chưa có bằng chứng.
