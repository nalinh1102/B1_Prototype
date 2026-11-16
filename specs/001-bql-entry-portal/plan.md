# Implementation Plan: B1 – Prototype cổng nhập liệu Ban quản lý TTTM – Mốc 13/11/2026

**Branch**: Không sử dụng — kế hoạch cục bộ; 001-bql-entry-portal là mã thư mục, không phải nhánh | **Date**: 2026-11-13 | **Spec**: [spec.md](./spec.md)

**Input**: Đặc tả từ specs/001-bql-entry-portal/spec.md; Constitution 1.1.0; checklist yêu cầu đã tạo.

## Summary

Đề xuất React + Vite + TypeScript phù hợp cho prototype SPA tương tác, chạy cục bộ trên Windows. React tách giao diện thành các trang/khối nhỏ; TypeScript mô hình hóa trạng thái và dữ liệu biểu mẫu; Vite cung cấp máy chủ phát triển cục bộ và bản dựng tĩnh. CSS thuần giữ giao diện đơn giản.

Dữ liệu giả được giữ trong state của phiên trình duyệt. Không có backend, database, API, đăng nhập thật hoặc tích hợp VCR. Dashboard suy ra trạng thái và bộ đếm từ danh sách TTTM cùng các báo cáo vận hành của kỳ đang chọn. Trước khi triển khai cần xác nhận phiên bản Node.js cục bộ; Node.js 22.12+ là mức chung phù hợp với tài liệu Vite/Vitest hiện hành.

P0 hướng đến bản demo mốc 13/11: hai biểu mẫu, quy tắc nhập, luồng duyệt/trả lại/khóa bản ghi, dashboard, TC01–TC10, hướng dẫn chạy và bằng chứng chỉnh sửa bằng Codex. P1 chỉ hoàn thiện độ rõ ràng và kiểm thử lại trong cùng phạm vi, không thêm chức năng.

## Technical Context

**Language/Version**: TypeScript; Node.js 22.12+ được đề xuất để đáp ứng đồng thời yêu cầu hiện hành của Vite và Vitest. Xác minh môi trường trước khi triển khai; chưa kiểm tra hoặc cài đặt trong bước lập kế hoạch.

**Primary Dependencies**: React, React DOM, Vite, TypeScript; Vitest, React Testing Library và jsdom cho kiểm thử giao diện. CSS thuần, không thêm thư viện giao diện hoặc quản lý trạng thái bên ngoài.

**Storage**: State trong bộ nhớ phiên trình duyệt. Không dùng backend, database, localStorage hoặc lưu dữ liệu qua lần khởi chạy lại. Ảnh chỉ có xem trước tạm thời.

**Testing**: Vitest + React Testing Library + jsdom cho TC01–TC10; chạy kiểm tra kiểu TypeScript riêng vì Vitest chuyển đổi TypeScript nhưng không tự type-check. Bổ sung một lượt smoke test thủ công trên laptop Windows.

**Target Platform**: Windows laptop và trình duyệt hiện đại; phiên bản Windows/trình duyệt cụ thể chưa được nêu.

**Project Type**: Ứng dụng web một trang chạy cục bộ, chỉ phía trình duyệt.

**Performance Goals**: Không đặt chỉ tiêu hiệu năng định lượng. Bộ dữ liệu demo chỉ có ba TTTM và số bản ghi nhỏ; thao tác nhập, duyệt và xem bộ đếm phải phản hồi trong cùng lượt tương tác.

**Constraints**: Chỉ dùng dữ liệu giả, kèm nhãn “Giả định phục vụ demo, chờ VCR xác nhận”. Không kết nối hệ thống VCR, không gọi API, không đăng nhập thật, không khóa kỳ báo cáo. Không dùng Git/GitHub hoặc tạo repository/branch/commit/remote. Giữ dữ liệu trong phiên.

**Scale/Scope**: Hai biểu mẫu, ba vai trò demo, ba TTTM giả lập, một kỳ mặc định 11/2026, tối đa một báo cáo cho mỗi TTTM/tháng/hạng mục, năm màn hình, mười kiểm thử bắt buộc. Không có chức năng ngoài đặc tả.

### Đánh giá đề xuất kỹ thuật

React + Vite + TypeScript được chấp nhận cho phạm vi này. Không cần framework full-stack vì không có server, API hay dữ liệu thật. CSS thuần và một reducer/context cục bộ đủ cho số màn hình, vai trò và chuyển trạng thái trong demo. TypeScript giúp kiểm soát các loại trạng thái, nhưng mọi quy tắc nhập vẫn phải được kiểm tra lúc chạy.

Điều kiện cần xác nhận trước triển khai là Node.js 22.12+ và quyền cài package từ registry phù hợp. Nếu môi trường Windows hiện tại không đáp ứng, phải chọn phiên bản tương thích trước khi cài dependency; không cài đặt trong bước Plan.

## Constitution Check

### Gate trước Phase 0

- **Codex và Spec Kit, không phát triển Agent mới**: PASS. Dùng Codex/Spec Kit để chuẩn bị và thay đổi prototype; không tạo Agent mới.
- **Specification-first, demo-first**: PASS. Đặc tả và checklist hiện có làm đầu vào; P0 bám mốc 13/11, không tuyên bố hoàn thành MVP 27/11.
- **Ưu tiên tiếng Việt, luồng theo vai trò**: PASS. Năm trang, ba vai trò demo, hai biểu mẫu và luồng duyệt/trả lại/khóa bản ghi được giữ trong phạm vi.
- **Dữ liệu giả lập và tuyên bố có bằng chứng**: PASS. Không tích hợp VCR hoặc dùng dữ liệu thật; mọi seed mang nhãn giả định.
- **Thay đổi kiểm thử được, bằng chứng bàn giao**: PASS. TC01–TC10, smoke test Windows, hướng dẫn bàn giao và log bằng chứng prompt được đưa vào P0.
- **Ràng buộc thao tác**: PASS. Kế hoạch không yêu cầu thao tác Git/GitHub hoặc tạo branch; không tạo code, plan này không tạo tasks.

### Gate sau Phase 1

PASS. Mô hình, hợp đồng UI và quickstart giữ nguyên phạm vi cục bộ, chỉ dùng dữ liệu giả. Dashboard không lưu trạng thái “Chưa gửi” như bản ghi; khóa kỳ báo cáo không được triển khai. Quy tắc tổng hợp dashboard khi có nhiều hạng mục được đánh dấu là quyết định cần người dùng xác nhận trước Tasks.

## Project Structure

### Documentation (this feature)

~~~text
specs/001-bql-entry-portal/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-contract.md
├── checklists/
│   └── requirements.md
└── tasks.md                 # Chưa tạo; dành cho $speckit-tasks sau khi người dùng duyệt Plan
~~~

### Source Code (repository root; đề xuất, chưa tạo)

~~~text
src/
├── app/
│   └── App.tsx
├── components/
│   ├── AppShell.tsx
│   ├── DemoRoleSelector.tsx
│   └── StatusBadge.tsx
├── domain/
│   ├── types.ts
│   ├── validation.ts
│   ├── workflow.ts
│   └── dashboardSummary.ts
├── features/
│   ├── dashboard/
│   ├── operational-reports/
│   ├── issue-proposals/
│   └── approvals/
├── state/
│   └── DemoStateContext.tsx
├── data/
│   └── seed.ts
└── styles/
    └── global.css

tests/
├── domain/
├── forms/
└── workflows/
~~~

**Structure Decision**: Dùng một ứng dụng frontend trong src/ và một bộ tests/. Các view chia theo tính năng; quy tắc nghiệp vụ thuần nằm trong domain/ để có thể kiểm tra độc lập. Một state store trong phiên cấp dữ liệu cho form, quy trình và dashboard. Không tạo backend/, API/, services/ bên ngoài hoặc thư viện quản lý state vì chúng không phục vụ phạm vi đã chốt.

## Architecture Overview

- **Presentation**: App shell và năm view: Tổng quan, Danh sách biểu mẫu, Nhập/sửa biểu mẫu, Chờ duyệt, Chi tiết bản ghi. Bộ chọn vai trò chỉ thay đổi trải nghiệm demo.
- **Domain**: Kiểu dữ liệu, validation và chuyển trạng thái là các hàm tách biệt. Chặn gửi khi dữ liệu chưa hợp lệ; cho phép lưu nháp chưa hoàn chỉnh.
- **State**: Một nguồn state trong bộ nhớ giữ TTTM, báo cáo vận hành, đề xuất, vai trò hiện chọn và kỳ báo cáo. Không lưu số đếm đã tính.
- **Seed**: Tạo Mẫu A với báo cáo Đã duyệt, Mẫu B với báo cáo Chờ duyệt, Mẫu C không có báo cáo trong tháng 11/2026. Seed và mọi bản ghi demo có nhãn giả định.
- **Dashboard**: Lọc báo cáo vận hành theo tháng và TTTM rồi tính trạng thái/bộ đếm từ dữ liệu hiện tại. Đề xuất xử lý vấn đề không tham gia bộ đếm.
- **Ảnh**: Giữ tham chiếu xem trước tạm thời trong phiên; không tải lên dịch vụ hoặc lưu qua lần chạy lại.
- **UI contract**: Hợp đồng màn hình và tương tác nằm trong contracts/ui-contract.md. Không có API contract vì không có giao tiếp hệ thống bên ngoài.

### Luồng trạng thái

- Nháp → Chờ duyệt: nhân viên gửi khi dữ liệu hợp lệ.
- Chờ duyệt → Cần sửa: người duyệt trả lại và nhập lý do.
- Cần sửa → Chờ duyệt: nhân viên sửa và gửi lại hợp lệ.
- Chờ duyệt → Đã duyệt: người duyệt chấp thuận; bản ghi thành chỉ đọc.
- Đã duyệt là trạng thái kết thúc trong demo; không cho sửa hoặc chuyển trạng thái.
- Chưa gửi là trạng thái suy ra từ TTTM/kỳ không có báo cáo đã gửi; không phải bản ghi.
- Khóa bản ghi không khóa kỳ báo cáo.

## Delivery Priorities

### P0 — Bản demo mốc 13/11

1. Xác minh Node.js/npm cục bộ và chuẩn bị khởi chạy frontend React/Vite/TypeScript.
2. Tạo app shell tiếng Việt, điều hướng năm trang và bộ chọn ba vai trò demo.
3. Tạo kiểu dữ liệu, state trong phiên và seed A/B/C với nhãn giả định.
4. Hoàn thiện hai biểu mẫu, lưu nháp, validation lúc gửi, ngày gửi, xem trước ảnh tạm thời.
5. Hoàn thiện duyệt/trả lại kèm lý do, gửi lại và khóa bản ghi đã duyệt.
6. Hoàn thiện dashboard tháng 11/2026, trạng thái TTTM và bộ đếm được tính từ dữ liệu.
7. Viết và chạy TC01–TC10; chạy type-check riêng; thực hiện smoke test trên Windows.
8. Ghi nhận trạng thái baseline, thử ba yêu cầu Codex bằng tiếng Việt và lưu bằng chứng trước/sau. Nếu nhãn đã là “Gửi duyệt”, dùng yêu cầu đổi nhãn có thay đổi thật.
9. Hoàn thiện hướng dẫn chạy, demo theo vai trò, reset bằng cách khởi tạo lại phiên và nêu rõ giới hạn/giả định.

**Exit criteria**: TC01–TC10 đạt; trạng thái/bộ đếm ban đầu đúng; bản ghi duyệt không sửa được; mọi dữ liệu giả có nhãn; bằng chứng chỉnh sửa và hướng dẫn bàn giao có thể xem lại. Nếu còn lỗi, báo cáo đúng phần chưa đạt, không tuyên bố nghiệm thu hoặc đo hiệu quả.

### P1 — Ổn định trong cùng phạm vi

1. Rà soát hiển thị lỗi, bàn phím, nhãn và độ rõ ràng của năm trang với người dùng demo.
2. Xác nhận quy tắc dashboard khi một TTTM có nhiều hạng mục cùng kỳ và trường hợp chỉ có bản nháp.
3. Bổ sung kiểm tra trùng khóa TTTM/tháng/hạng mục và các edge case có liên quan sau khi được người dùng xác nhận.
4. Chạy lại toàn bộ TC01–TC10 sau chỉnh sửa và cập nhật evidence/hướng dẫn.
5. Chỉ sửa lỗi hoặc làm rõ trải nghiệm trong scope hiện tại; không thêm tích hợp, đăng nhập, lưu trữ bền vững, khóa kỳ hoặc chức năng mới.

## Risks and Assumptions

- **Phiên bản Node chưa biết**: kiểm tra trước triển khai; Vite/Vitest hiện hành yêu cầu Node phù hợp. Nếu không đáp ứng, cần chốt phiên bản package trước khi cài.
- **Tổng hợp nhiều hạng mục**: uniqueness cho phép nhiều hạng mục trong một TTTM/tháng, trong khi dashboard hiển thị theo TTTM/kỳ. Plan đề xuất một trạng thái tổng hợp và hiển thị chi tiết theo hạng mục; cần xác nhận trước Tasks để tránh hiểu “Đã duyệt” là đủ mọi hạng mục.
- **Chỉ có bản nháp**: đề xuất tiếp tục hiển thị Chưa gửi vì chưa có báo cáo nào được gửi; cần xác nhận nếu dashboard phải có nhãn Nháp riêng.
- **Dữ liệu trong phiên**: tải lại/trình duyệt đóng sẽ khởi tạo lại seed; không phải yêu cầu lưu bền.
- **Danh mục báo cáo/vấn đề**: dùng trường nhập demo theo spec hiện tại; danh mục chính thức, người duyệt và SLA chưa được xác nhận.
- **Ảnh đính kèm**: chỉ xem trước; không lưu server. Định dạng/giới hạn file chưa đặt.
- **Bằng chứng chỉnh sửa Codex**: chụp/ghi baseline trước khi thử nghiệm; không tạo thay đổi hoặc bằng chứng giả.

## Complexity Tracking

Không có vi phạm Constitution hoặc thành phần kiến trúc bổ sung cần biện minh.