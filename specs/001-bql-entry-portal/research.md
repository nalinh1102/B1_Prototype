# Research: B1 – Prototype cổng nhập liệu BQL TTTM

**Ngày rà soát tài liệu**: 2026-11-13  
**Phạm vi**: Đánh giá stack cục bộ và phương án kiểm thử; không cài package, không sửa code.

## Quyết định: React + Vite + TypeScript

**Decision**: Chấp nhận đề xuất cho một SPA demo nhỏ chạy cục bộ trên Windows.

**Rationale**:
- Vite có template React + TypeScript và cung cấp máy chủ phát triển cùng quy trình build cho frontend.
- React phù hợp với năm view, biểu mẫu tương tác, chuyển trạng thái và dashboard cần tính lại từ state.
- TypeScript giúp mô tả rõ các biến thể trạng thái và cấu trúc hai biểu mẫu; nó không thay thế kiểm tra dữ liệu khi người dùng nhập.
- CSS thuần đáp ứng yêu cầu giao diện đơn giản, tiếng Việt, không cần component library.
- Không cần backend, API, database, đăng nhập thật hoặc integration layer trong phạm vi demo.

**Alternatives considered**:
- Vanilla TypeScript: ít dependency hơn, nhưng lặp lại nhiều hơn khi chia sẻ shell, biểu mẫu, role selector và trạng thái dashboard.
- Framework full-stack hoặc backend riêng: bị loại vì đặc tả không yêu cầu server, API, tài khoản hoặc dữ liệu dùng chung.
- Thư viện state ngoài: chưa cần cho một state store trong phiên; thêm dependency không tạo giá trị cần thiết cho ba TTTM.
- Thư viện UI/CSS framework: chưa cần cho giao diện nhỏ; CSS thuần dễ điều chỉnh theo tiếng Việt.
- Playwright: không đưa vào P0 vì cần cài browser binaries và thêm setup. Kiểm thử DOM cùng smoke test thủ công đáp ứng phạm vi ban đầu; xem xét sau nếu cần tự động hóa trình duyệt thật.

## Quyết định: State trong bộ nhớ phiên

**Decision**: Dùng một nguồn state trong phiên trình duyệt; tính dashboard từ dữ liệu hiện tại; khởi chạy lại phiên sẽ khởi tạo seed.

**Rationale**: Phù hợp với dữ liệu giả, không server và demo cục bộ. Không tạo localStorage hoặc persistence ngoài phạm vi đã đề xuất.

**Alternatives considered**:
- localStorage: tạo cảm giác lưu bền qua lần chạy lại, trong khi yêu cầu nói rõ lưu trong bộ nhớ phiên.
- API/database: thêm vận hành và rủi ro kết nối, không cần cho bản mẫu.

## Quyết định: Kiểm thử giao diện

**Decision**: Dùng Vitest + React Testing Library + jsdom cho TC01–TC10; chạy kiểm tra kiểu riêng; thêm smoke test thủ công trên Windows.

**Rationale**:
- Vitest chạy trên Vite và hỗ trợ test TypeScript; tài liệu lưu ý chuyển đổi TypeScript không đồng nghĩa type-check.
- React Testing Library kiểm tra tương tác qua nhãn, nút và nội dung hiển thị như người dùng thực hiện.
- jsdom đủ cho các luồng DOM cục bộ; smoke test thật xác nhận chạy trên Windows/browser.
- Không cần tự động hóa browser ở P0 để kiểm tra các quy tắc và trạng thái đã nêu.

**Alternatives considered**:
- Chỉ test hàm domain: nhanh nhưng không kiểm tra được thông báo, thao tác nút và cập nhật giao diện.
- Chỉ kiểm thử thủ công: dễ làm nhưng khó lặp lại 10 trường hợp.
- Playwright: mạnh cho browser thật nhưng tăng thời gian cài và bảo trì; để ngoài P0.

## Quyết định: Node.js baseline

**Decision**: Lấy Node.js 22.12+ làm điều kiện lập kế hoạch nếu dùng phiên bản Vite/Vitest hiện hành; xác nhận môi trường trước khi triển khai và chọn phiên bản package tương thích.

**Rationale**: Tài liệu Vite hiện hành nêu Node 20.19+ hoặc 22.12+; tài liệu Vitest hiện hành nêu baseline Node 22.12+ cho bản mới. Chọn 22.12+ tạo một mức giao nhau dễ kiểm tra. Chưa kiểm tra máy người dùng và không cài đặt trong bước Plan.

## Contracts

Không có API hoặc hệ thống bên ngoài cần contract. Tạo contracts/ui-contract.md để thống nhất hành vi năm màn hình, vai trò demo, trạng thái, lỗi và nội dung tiếng Việt.

## Sources

- [Vite – Getting Started](https://vite.dev/guide/) — template React + TypeScript, máy chủ phát triển và yêu cầu Node.js.
- [React – Adding Interactivity](https://react.dev/learn/adding-interactivity) — cập nhật giao diện theo hành động người dùng.
- [React – Managing State](https://react.dev/learn/managing-state) — tổ chức state cho giao diện.
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html) — vai trò type-checking.
- [Vitest – Guide](https://vitest.dev/guide/) — cấu hình test dựa trên Vite và điều kiện runtime.
- [Vitest – Environments](https://vitest.dev/guide/environment) — môi trường DOM giả lập.
- [Vitest – Writing Tests](https://vitest.dev/guide/learn/writing-tests.html) — test TypeScript và lưu ý type-check riêng.
- [React Testing Library – Introduction](https://testing-library.com/docs/react-testing-library/intro/) — kiểm thử qua hành vi người dùng.
- [Playwright – Introduction](https://playwright.dev/docs/intro) — cân nhắc cho browser automation giai đoạn sau.