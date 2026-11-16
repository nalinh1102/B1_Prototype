# Tasks: B1 – Prototype cổng nhập liệu Ban quản lý TTTM – Mốc 13/11/2026

**Đầu vào**: `specs/001-bql-entry-portal/` (spec.md, plan.md, research.md, data-model.md, contracts/ui-contract.md, quickstart.md)

**Điều kiện tiên quyết**: plan.md và spec.md; research.md, data-model.md, contracts/ui-contract.md và quickstart.md đã được đọc.

**Phạm vi bàn giao**: P0 là bản demo phục vụ báo cáo tiến độ ngày 13/11/2026, không phải MVP ngày 27/11/2026. P1 là phần ổn định sau P0 và không bắt buộc để trình diễn P0.

**Quy ước**:

- `[P]` đánh dấu các task có thể thực hiện song song vì tách biệt file và không phụ thuộc nhau.
- `[US1]`–`[US4]` liên kết task với user story trong `spec.md`. Mức ưu tiên giao hàng P0/P1 bên dưới được phân biệt với mức Priority trong spec: US1–US3 là P1 trong spec; US4 là P2 trong spec nhưng các thử nghiệm chỉnh sửa được yêu cầu cho báo cáo 13/11 nên được đưa vào P0 của kế hoạch này.
- Mọi dữ liệu mẫu phải hiển thị nguyên văn nhãn `Giả định phục vụ demo, chờ VCR xác nhận`.
- Không dùng Git/GitHub, không kết nối hệ thống VCR, không dùng dữ liệu vận hành thật; không tạo đăng nhập thật, backend, database hoặc khóa kỳ báo cáo.
- Các đường dẫn `src/`, `tests/` và `evidence/` dưới đây là đường dẫn tương đối từ thư mục B1. Khi khởi tạo Vite, chỉ tạo/cập nhật các file ứng dụng cần thiết, tuyệt đối giữ nguyên `.specify/`, `.agents/` và `specs/`.

## Phase 1: Setup – P0

**Mục đích**: Xác nhận môi trường và dựng nền ứng dụng trong workspace B1 hiện có.

- [X] T001 Kiểm tra phiên bản Node.js/npm và khả năng truy cập package registry; ghi kết quả, phiên bản và trở ngại (nếu có) vào `specs/001-bql-entry-portal/quickstart.md` trước khi cài package.
- [X] T002 Khởi tạo React + Vite + TypeScript trong workspace B1 hiện có bằng cách chỉ tạo/ghép các file ứng dụng cần thiết như `package.json`, `index.html`, `vite.config.ts`, `tsconfig*.json`, `src/main.tsx`; bảo toàn nguyên trạng `.specify/`, `.agents/` và `specs/`, không ghi đè tài liệu hiện có.
- [ ] T003 Cấu hình Vitest, React Testing Library, jsdom và các script `test`, `typecheck`, `build` trong `package.json`, `vite.config.ts` và cấu hình TypeScript tương ứng; chỉ cài dependency sau khi T001 xác nhận môi trường phù hợp.

## Phase 2: Foundational – P0

**Mục đích**: Tạo kiểu dữ liệu dùng chung, state giả lập theo phiên và khung giao diện tiếng Việt trước khi triển khai các luồng người dùng.

- [ ] T004 Tạo kiểu miền cho TTTM, vai trò demo, báo cáo vận hành, đề xuất xử lý vấn đề và trạng thái bản ghi trong `src/domain/types.ts`; phân biệt rõ trạng thái bản ghi với trạng thái theo dõi `Chưa gửi`.
- [ ] T005 Khởi tạo seed ba TTTM Mẫu A/B/C và state trong bộ nhớ phiên trong `src/data/seed.ts` và `src/state/DemoStateContext.tsx`: A có một báo cáo tháng 11/2026 đã duyệt, B có một báo cáo đang chờ duyệt, C không có báo cáo; gắn nhãn giả định lên dữ liệu demo, không tạo bản ghi cho C.
- [X] T006 Tạo app shell và điều hướng năm view theo `contracts/ui-contract.md` trong `src/app/App.tsx`, `src/components/AppShell.tsx`, `src/components/DemoRoleSelector.tsx` và `src/styles/global.css`; giao diện tiếng Việt, có bộ chọn ba vai trò demo và thông báo dữ liệu giả định, không mô tả bộ chọn là xác thực/phân quyền thật.

## Phase 3: User Story 1 – Nhân viên nhập và gửi biểu mẫu – Giao hàng P0 (Priority P1 trong spec)

**Mục tiêu**: Nhân viên tạo/lưu nháp/gửi hai biểu mẫu; kiểm tra dữ liệu khi gửi và ghi nhận ngày gửi đúng thời điểm.

**Kiểm thử độc lập**: Hoàn tất TC01–TC05 và kiểm tra bổ sung quy tắc duy nhất được yêu cầu cho demo; biểu mẫu hợp lệ chuyển sang `Chờ duyệt`, nháp chưa đủ dữ liệu vẫn lưu được.

### Kiểm thử cho User Story 1

- [ ] T007 [P] [US1] Viết kiểm thử biểu mẫu báo cáo vận hành cho TC01, TC02, TC03, TC04 và quy tắc bổ sung `TC-DUP` trong `tests/forms/operational-report-form.test.tsx`; kiểm tra bắt buộc TTTM/tháng/hạng mục, số nguyên không âm, số hoàn thành không vượt số cần làm, nháp thiếu dữ liệu được lưu và không cho trùng khóa TTTM/tháng/hạng mục khi các thành phần khóa đã có đủ (cho phép sửa chính bản ghi đó); chạy kiểm thử để xác nhận các hành vi chưa triển khai thất bại trước khi viết phần triển khai.
- [ ] T008 [P] [US1] Viết kiểm thử biểu mẫu đề xuất xử lý vấn đề cho TC01, TC02 và TC05 trong `tests/forms/issue-proposal-form.test.tsx`; kiểm tra lỗi tiếng Việt, mức ưu tiên hợp lệ và ngày mong muốn bằng ngày gửi được chấp nhận; chạy kiểm thử để xác nhận các hành vi chưa triển khai thất bại trước khi viết phần triển khai.

### Triển khai User Story 1

- [x] T009 [US1] Triển khai kiểm tra dữ liệu báo cáo vận hành/đề xuất trong `src/domain/validation.ts` và thực thi khóa duy nhất `centerId + reportMonth + category` khi lưu/gửi trong `src/state/DemoStateContext.tsx`; chỉ kiểm tra khóa khi đủ ba thành phần, loại trừ chính bản ghi đang sửa, vẫn cho lưu nháp thiếu trường và giới hạn ảnh ở chọn/xem trước trong trình duyệt demo.
- [x] T010 [P] [US1] Tạo form Báo cáo vận hành định kỳ trong `src/features/operational-reports/OperationalReportForm.tsx` với đủ trường theo spec, lỗi tiếng Việt tại trường và hỗ trợ lưu nháp chưa hoàn chỉnh.
- [x] T011 [P] [US1] Tạo form Đề xuất xử lý vấn đề trong `src/features/issue-proposals/IssueProposalForm.tsx` với đủ trường theo spec, lỗi tiếng Việt, chọn/xem trước ảnh phía trình duyệt và không tải ảnh lên server.
- [ ] T012 [US1] Tạo trang danh sách/chọn hai biểu mẫu và nối việc tạo, mở, lưu nháp, gửi duyệt vào state phiên trong `src/features/forms/FormsListPage.tsx`, `src/state/DemoStateContext.tsx` và `src/app/App.tsx`; khi gửi hoặc gửi lại mới ghi ngày gửi và chuyển sang `Chờ duyệt`.
- [x] T013 [US1] Chạy kiểm thử của User Story 1, xác nhận TC01–TC05 và `TC-DUP` đạt; ghi lỗi còn tồn tại thay vì đánh dấu đạt nếu có case chưa qua.

## Phase 4: User Story 2 – Người duyệt xử lý và khóa bản ghi – Giao hàng P0 (Priority P1 trong spec)

**Mục tiêu**: Người duyệt xử lý bản ghi chờ duyệt; trả lại phải có lý do; nhân viên sửa/gửi lại bản ghi bị trả; bản ghi đã duyệt chỉ đọc.

**Kiểm thử độc lập**: TC06, TC07 và TC10 đạt; chỉ bản ghi ở trạng thái hợp lệ mới được chuyển trạng thái theo luồng.

### Kiểm thử cho User Story 2

- [ ] T014 [US2] Viết kiểm thử luồng duyệt/trả lại/khóa cho TC06, TC07 và TC10 trong `tests/workflows/approval-workflow.test.tsx`, gồm trường hợp thiếu lý do trả lại, sửa/gửi lại bản ghi `Cần sửa` và thử sửa bản ghi `Đã duyệt`; chạy kiểm thử để xác nhận các hành vi chưa triển khai thất bại trước khi viết phần triển khai.

### Triển khai User Story 2

- [ ] T015 [US2] Triển khai điều kiện chuyển trạng thái và hành động duyệt/trả lại trong `src/domain/workflow.ts` và `src/state/DemoStateContext.tsx`; yêu cầu lý do khi trả lại, cho phép sửa/gửi lại `Cần sửa`, và chặn mọi cập nhật bản ghi `Đã duyệt`.
- [ ] T016 [P] [US2] Tạo trang danh sách bản ghi chờ duyệt trong `src/features/approvals/ApprovalQueuePage.tsx`, hiển thị TTTM, loại biểu mẫu, kỳ/ngày gửi và trạng thái bằng tiếng Việt.
- [ ] T017 [P] [US2] Tạo trang chi tiết bản ghi và thao tác Duyệt/Trả lại kèm nhập lý do trong `src/features/approvals/ApprovalDetailPage.tsx`; chỉ cho thao tác trên bản ghi `Chờ duyệt`.
- [ ] T018 [US2] Nối trang sửa cho bản ghi `Nháp`/`Cần sửa` và trang chỉ đọc cho bản ghi `Đã duyệt` vào `src/app/App.tsx`, `src/features/forms/FormsListPage.tsx` và các form tương ứng; hiển thị lý do trả lại cho nhân viên.
- [ ] T019 [US2] Chạy kiểm thử User Story 2, xác nhận TC06, TC07 và TC10; ghi lại kết quả duyệt, trả lại, sửa/gửi lại và khóa chỉnh sửa.

## Phase 5: User Story 3 – Người theo dõi xem tình trạng nộp – Giao hàng P0 (Priority P1 trong spec)

**Mục tiêu**: Dashboard hiển thị tình trạng và bộ đếm được suy ra từ báo cáo vận hành hiện có theo kỳ; không tạo bản ghi `Chưa gửi` và không cộng đề xuất xử lý vấn đề.

**Kiểm thử độc lập**: TC08 và TC09 đạt với seed ban đầu và khi thay đổi trạng thái báo cáo. P0 chỉ dùng một hạng mục trên mỗi TTTM trong seed để không tự đặt quy tắc tổng hợp nhiều hạng mục.

### Kiểm thử cho User Story 3

- [ ] T020 [US3] Viết kiểm thử phép chiếu dashboard trong `tests/domain/dashboard-summary.test.ts` cho TC08 và TC09: ban đầu A/B/C lần lượt `Đã duyệt`/`Chờ duyệt`/`Chưa gửi` với bộ đếm 1/1/1 và `Cần sửa` = 0; C không có báo cáo; thay đổi trạng thái làm bộ đếm tính lại; đề xuất xử lý vấn đề không ảnh hưởng bộ đếm vận hành; chạy kiểm thử để xác nhận các hành vi chưa triển khai thất bại trước khi viết phần triển khai.

### Triển khai User Story 3

- [ ] T021 [US3] Tạo phép tính dashboard trong `src/domain/dashboardSummary.ts`, suy ra trạng thái/bộ đếm từ danh sách TTTM, kỳ đang chọn và báo cáo vận hành hiện tại; không hardcode số đếm, không tạo record `Chưa gửi`, loại trừ đề xuất xử lý vấn đề.
- [ ] T022 [US3] Tạo trang tổng quan trong `src/features/dashboard/DashboardPage.tsx` và badge trạng thái trong `src/components/StatusBadge.tsx`; hiển thị kỳ báo cáo, A/B/C, trạng thái và bộ đếm động bằng tiếng Việt, mọi dữ liệu mẫu có nhãn giả định.
- [ ] T023 [US3] Nối dashboard với state phiên và vai trò Người theo dõi trong `src/app/App.tsx` và `src/state/DemoStateContext.tsx`; kiểm tra dashboard thay đổi sau khi báo cáo được gửi, trả lại hoặc duyệt.
- [ ] T024 [US3] Chạy kiểm thử User Story 3, xác nhận TC08 và TC09; đối chiếu seed, bộ đếm động, trường hợp TTTM chưa có record và việc loại trừ đề xuất.

## Phase 6: User Story 4 – Cán bộ nghiệp vụ yêu cầu Codex chỉnh prototype – Giao hàng P0 theo yêu cầu báo cáo (Priority P2 trong spec)

**Mục tiêu**: Sau khi hoàn thành các luồng P0, chứng minh các yêu cầu tiếng Việt có thể tạo ra thay đổi thật trên prototype và lưu được bằng chứng trước/sau. Không tạo bằng chứng giả.

**Kiểm thử độc lập**: Có trạng thái nền trước thử nghiệm, lưu nguyên văn prompt, ảnh trước/sau và mô tả file/thay đổi thực tế cho từng lượt.

- [ ] T025 [US4] Ghi nhận baseline chạy được trước các thử nghiệm trong `evidence/codex-edits/00-baseline/` và mở sổ theo dõi tại `evidence/codex-edits/experiment-log.md`; chụp các view liên quan, ghi trạng thái ứng dụng và xác nhận seed giả.
- [ ] T026 [US4] Thực hiện yêu cầu Codex tiếng Việt `Thêm ô Người phụ trách.` trên prototype và lưu prompt nguyên văn, ảnh trước/sau, file thực sự thay đổi và kết quả kiểm tra vào `evidence/codex-edits/01-nguoi-phu-trach/` cùng `evidence/codex-edits/experiment-log.md`.
- [ ] T027 [US4] Thực hiện yêu cầu Codex tiếng Việt `Thêm bộ lọc theo TTTM.` trên view phù hợp của prototype và lưu prompt nguyên văn, ảnh trước/sau, file thực sự thay đổi và kết quả kiểm tra vào `evidence/codex-edits/02-bo-loc-tttm/` cùng `evidence/codex-edits/experiment-log.md`.
- [ ] T028 [US4] Thực hiện yêu cầu Codex tiếng Việt `Đổi nút Gửi thành Gửi duyệt.` và lưu prompt nguyên văn, ảnh trước/sau, file thực sự thay đổi và kết quả kiểm tra vào `evidence/codex-edits/03-nhan-nut/` cùng `evidence/codex-edits/experiment-log.md`; nếu nhãn ban đầu đã là `Gửi duyệt`, chọn một thay đổi nhãn thật trên nút hiện có và ghi rõ prompt thay thế, không tạo diff/bằng chứng giả.
- [ ] T029 [US4] Rà soát sổ thử nghiệm tại `evidence/codex-edits/experiment-log.md` để bảo đảm từng thay đổi có baseline trước đó, kết quả sau đó, prompt nguyên văn và mô tả trung thực; nêu rõ đây là thử nghiệm prototype, không tuyên bố BO đã đánh giá.

## Phase 7: P0 – Kiểm chứng, smoke test và bàn giao

**Mục đích**: Xác minh bản demo sau cả ba thử nghiệm Codex, ghi kết quả và chuẩn bị tài liệu báo cáo tiến độ; không tuyên bố nghiệm thu hoặc hiệu quả chưa đo.

- [ ] T030 Chạy toàn bộ TC01–TC10 sau các chỉnh sửa Codex, cùng `typecheck` và `build`; lưu kết quả từng case, lệnh đã chạy và lỗi còn mở trong `evidence/p0-verification.md`.
- [ ] T031 Thực hiện smoke test thủ công trên laptop Windows theo `specs/001-bql-entry-portal/quickstart.md` (khởi chạy, điều hướng năm view, đổi vai trò demo, nhập/gửi/duyệt/trả lại, xem dashboard); ghi kết quả và ảnh minh chứng vào `evidence/windows-smoke.md`.
- [ ] T032 Cập nhật `specs/001-bql-entry-portal/quickstart.md` với điều kiện Node/npm, lệnh cài/chạy/test/typecheck/build đã xác nhận, cách chọn vai trò, luồng demo, cách khởi tạo lại seed trong phiên và các giới hạn/giả định.
- [ ] T033 Chuẩn bị báo cáo tiến độ ngày 13/11/2026 tại `specs/001-bql-entry-portal/progress-report-13-11.md`, nêu phạm vi P0, kết quả TC01–TC10 và smoke test thực tế, liên kết bằng chứng, điểm chưa làm/chưa xác nhận; không ghi đã nghiệm thu, BO đánh giá hoặc tiết kiệm thời gian nếu chưa có chứng cứ.
- [ ] T034 Rà soát điều kiện sẵn sàng demo tại `evidence/p0-verification.md` và `specs/001-bql-entry-portal/progress-report-13-11.md`: mọi dữ liệu giả có nhãn, không có kết nối/dữ liệu VCR thật, bản ghi đã duyệt bị khóa, không có khóa kỳ, không còn tuyên bố vượt bằng chứng; ghi rõ mọi mục chưa đạt.

## Phase 8: P1 – Ổn định sau bản demo (không chặn trình diễn P0)

**Mục đích**: Chỉ sửa độ rõ ràng và lỗi trong phạm vi đã chốt; không thêm tính năng mới.

- [ ] T035 Rà soát năm view với người dùng demo về nhãn, thông báo lỗi, thao tác bàn phím và khả năng đọc trên laptop Windows; ghi vấn đề và mức ảnh hưởng trong `evidence/p1-usability-review.md`.
- [ ] T036 Sửa các lỗi/điểm chưa rõ được ghi nhận ở T035 trong các file UI liên quan dưới `src/`; không thêm biểu mẫu, tích hợp, đăng nhập, lưu trữ bền vững, khóa kỳ hoặc chức năng ngoài spec.
- [ ] T037 Chạy lại TC01–TC10, `typecheck` và `build` sau các chỉnh sửa P1; cập nhật kết quả tại `evidence/p0-verification.md` và hướng dẫn bàn giao tại `specs/001-bql-entry-portal/quickstart.md`.
- [ ] T038 Chờ người dùng chốt cách tổng hợp dashboard khi một TTTM/kỳ có nhiều hạng mục trước khi hỗ trợ dữ liệu dạng này; chỉ sau xác nhận mới cập nhật `specs/001-bql-entry-portal/spec.md`, `specs/001-bql-entry-portal/data-model.md`, `specs/001-bql-entry-portal/contracts/ui-contract.md` và kiểm thử liên quan. Nếu chưa xác nhận, giữ điểm này là giới hạn/giả định, không tự áp dụng quy tắc tổng hợp trong code.

## Phụ thuộc và thứ tự thực hiện

### Phụ thuộc theo phase

- **Setup (T001–T003)**: bắt đầu ngay trong workspace B1; T002 phụ thuộc kết quả tương thích môi trường ở T001; T003 phụ thuộc scaffold T002.
- **Foundational (T004–T006)**: sau T002–T003; hoàn tất trước các user story.
- **US1 (T007–T013)**: sau nền tảng; viết kiểm thử trước validation/form; hoàn tất trước tích hợp các thao tác duyệt.
- **US2 (T014–T019)**: sau US1 vì cần bản ghi đã gửi và form sửa/gửi lại.
- **US3 (T020–T024)**: sau nền tảng dữ liệu và tích hợp state của US1–US2 để kiểm thử các lần chuyển trạng thái.
- **US4 (T025–T029)**: chỉ sau khi các view/luồng P0 đã chạy được; thứ tự baseline → thử nghiệm 1 → 2 → 3 → rà soát bằng chứng.
- **P0 kiểm chứng (T030–T034)**: sau US1–US4; smoke test trên bản cuối sau thử nghiệm Codex.
- **P1 (T035–T038)**: tùy chọn sau P0, không phải điều kiện để trình diễn mốc 13/11. T038 là cổng quyết định; không tự triển khai tổng hợp nhiều hạng mục khi chưa có xác nhận.

### Cơ hội thực hiện song song

- Sau T006, có thể viết T007 và T008 song song vì dùng hai file kiểm thử riêng.
- Sau khi các kiểm thử tương ứng đã được viết, T010 và T011 có thể triển khai song song vì là hai form ở hai file riêng; T009 phải sẵn sàng trước khi tích hợp form.
- Trong US2, T016 và T017 có thể làm song song sau T015 vì là hai view riêng; T018 nối các view sau đó.
- Không chạy song song các task cùng sửa `src/state/DemoStateContext.tsx`, `src/app/App.tsx` hoặc cùng một file test.

## Chiến lược giao hàng

1. Hoàn thành T001–T006 để có app cục bộ tối thiểu và state demo.
2. Hoàn thành US1 rồi US2 và US3; tại mỗi checkpoint chạy bộ kiểm thử user story tương ứng trước khi đi tiếp.
3. Khi luồng P0 chạy được, chụp baseline rồi thực hiện ba thử nghiệm Codex bằng tiếng Việt và giữ bằng chứng thật.
4. Hoàn thành T030–T034 để xác minh bản demo sau chỉnh sửa, smoke test Windows và chuẩn bị báo cáo 13/11.
5. Chỉ thực hiện P1 sau khi P0 đủ điều kiện trình diễn; P1 không phải cổng bắt buộc cho mốc 13/11.

## Giả định, rủi ro và điểm chờ xác nhận

- Node.js 22.12+ và quyền truy cập package registry là điều kiện đề xuất trong plan, chưa được xác minh; cần ghi kết quả ở T001 và chọn phiên bản tương thích trước khi cài dependency.
- Tên Mẫu A/B/C, vai trò và quyền demo, tháng 11/2026, dữ liệu khởi tạo và toàn bộ quy tắc biểu mẫu là giả định phục vụ demo, chờ VCR xác nhận; không đại diện quy trình vận hành chính thức.
- Quy tắc một báo cáo tối đa cho mỗi TTTM/tháng/hạng mục được giữ như giả định demo trong yêu cầu hiện tại; `TC-DUP` là kiểm thử bổ sung của yêu cầu này, không phải test case VCR đã xác nhận.
- P0 seed có một hạng mục cho mỗi TTTM. Cách tổng hợp nhiều hạng mục cùng TTTM/kỳ chưa được quyết định; không áp dụng quy tắc precedence trong data-model/UI-contract hiện có nếu chưa được người dùng xác nhận.
- State chỉ tồn tại trong phiên trình duyệt; làm mới/đóng trang có thể khởi tạo lại seed. Đây không phải lưu trữ bền vững.
- Bộ chọn vai trò chỉ minh họa hành vi giao diện. Không có đăng nhập hay phân quyền production.
- Không coi kết quả test hoặc ảnh demo là bằng chứng BO nghiệm thu hay bằng chứng tiết kiệm thời gian; chỉ báo cáo kết quả đã quan sát được.

## Đối chiếu phạm vi

- **User Story 1**: FR-001–FR-011; TC01–TC05 và kiểm thử bổ sung `TC-DUP` theo ràng buộc demo hiện tại.
- **User Story 2**: FR-012–FR-016; TC06, TC07, TC10.
- **User Story 3**: FR-017–FR-020; TC08, TC09.
- **User Story 4**: FR-022–FR-023; baseline và ba thử nghiệm yêu cầu Codex tiếng Việt.
- **Bàn giao/giới hạn**: FR-021, FR-024, FR-025; hướng dẫn chạy, bằng chứng, smoke test, báo cáo tiến độ và ghi rõ ngoài phạm vi.
- P0 không bao gồm tích hợp VCR, dữ liệu thật, đăng nhập thật, backend/database, khóa kỳ báo cáo hoặc quy tắc tổng hợp nhiều hạng mục chưa được xác nhận.
