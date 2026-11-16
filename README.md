# B1 – TTTM Management Data Entry Portal

**Independent technical prototype — cổng nhập liệu minh họa cho nghiệp vụ quản lý trung tâm thương mại**

> Đây là prototype kỹ thuật độc lập, không phải sản phẩm chính thức, không đại diện cho tổ chức nào và chưa được tổ chức nào phê duyệt. Bản mẫu chạy cục bộ bằng dữ liệu giả lập, chưa tích hợp hệ thống nghiệp vụ thật.

## Tổng quan

Dự án thử nghiệm giao diện và một phần luồng nhập liệu minh họa cho Ban Quản lý Trung tâm Thương mại (TTTM). Người dùng có thể tạo báo cáo vận hành định kỳ hoặc đề xuất xử lý vấn đề, lưu bản nháp, kiểm tra dữ liệu và gửi bản ghi vào trạng thái chờ duyệt trong phiên demo.

> Bản mẫu không có đăng nhập, phân quyền thực, máy chủ, cơ sở dữ liệu hay kết nối hệ thống nghiệp vụ. Bộ chọn vai trò chỉ để minh họa; dữ liệu trong bộ nhớ có thể mất khi tải lại trang.

## Tính năng và trạng thái

### Đã triển khai trong prototype

- Tạo, sửa bản nháp và gửi biểu mẫu báo cáo vận hành định kỳ.
- Tạo, sửa bản nháp và gửi đề xuất xử lý vấn đề.
- Kiểm tra trường bắt buộc, số lượng không âm, số hoàn thành không vượt số cần làm, bản báo cáo trùng và ngày mong muốn xử lý.
- Hiển thị danh sách bản ghi cùng trạng thái demo; dữ liệu mẫu được gắn nhãn giả lập.
- Xem trước ảnh đính kèm cục bộ trong biểu mẫu đề xuất. Tệp không được tải lên máy chủ.

### Chưa hoàn thiện

- Luồng phê duyệt, trả lại để chỉnh sửa và gửi lại.
- Khóa bản ghi sau khi duyệt.
- Dashboard động và trang chi tiết bản ghi.
- Đăng nhập, phân quyền, lưu trữ bền vững và tích hợp backend.

Các mục trên là giới hạn hiện tại hoặc hướng phát triển; không phải tính năng đã hoàn thành.

## Công nghệ

- React 19 và React DOM
- TypeScript 7
- Vite 8
- Vitest, React Testing Library và jsdom cho kiểm thử biểu mẫu

## Cấu trúc dự án

```text
.
├── .agents/skills/  # Hướng dẫn workflow hỗ trợ phát triển
├── .specify/        # Cấu hình, mẫu và script Spec Kit
├── specs/           # Đặc tả, kế hoạch và hợp đồng giao diện
├── evidence/        # Báo cáo kiểm chứng
├── src/
│   ├── app/         # Điều hướng và khung ứng dụng
│   ├── components/  # Thành phần giao diện dùng chung
│   ├── data/        # Dữ liệu seed giả lập
│   ├── domain/      # Kiểu dữ liệu và kiểm tra đầu vào
│   ├── features/    # Danh sách và biểu mẫu
│   ├── state/       # Trạng thái demo trong bộ nhớ
│   └── styles/      # CSS giao diện
├── tests/           # Kiểm thử tự động cho biểu mẫu
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```


## Cài đặt và chạy cục bộ

Cần có Node.js và npm tương thích với phiên bản Vite được khóa trong `package-lock.json`.

```powershell
npm.cmd ci
npm.cmd run dev
```

Vite hiển thị địa chỉ phát triển trong terminal sau khi khởi động.

## Kiểm tra chất lượng

```powershell
npm.cmd run test -- --run
npm.cmd run typecheck
npm.cmd run build
```

Kết quả lần kiểm tra gần nhất trong workspace:

| Kiểm tra | Kết quả |
|---|---|
| Kiểm thử biểu mẫu | PASS — 2 file, 10 test |
| TypeScript | PASS — `tsc --noEmit` |
| Build | PASS — Vite tạo bản build production |

> Các kiểm tra trên chưa bao gồm kiểm thử trình duyệt đầu-cuối, nghiệm thu nghiệp vụ hoặc xác minh các luồng phê duyệt và dashboard.

## Giao diện minh họa

Workspace hiện chưa có ảnh chụp giao diện. Có thể bổ sung ảnh chụp thật sau khi chạy ứng dụng và xác nhận nội dung an toàn để chia sẻ.

## Tiến độ phát triển

| Giai đoạn | Trạng thái | Ghi chú |
|---|---|---|
| Giai đoạn 1 | Hoàn thành | Khởi tạo ứng dụng và app shell. |
| Giai đoạn 2 | Hoàn thành trong phạm vi prototype hiện tại | Hai biểu mẫu demo, lưu/gửi trong phiên và kiểm tra dữ liệu. |
| Giai đoạn 3 | Chưa bắt đầu | Workflow nghiệp vụ tiếp theo chưa được triển khai. |

Dự án chưa phải MVP hoàn chỉnh. Trạng thái này không xác nhận quy trình nghiệp vụ chính thức.

## Hướng phát triển

1. Hoàn thiện và kiểm chứng luồng phê duyệt, trả lại, gửi lại và khóa bản ghi.
2. Bổ sung dashboard động và chi tiết bản ghi.
3. Mở rộng kiểm thử đầu-cuối trước khi xem xét tích hợp dữ liệu hoặc hệ thống thật.

## Lưu ý sử dụng

- Đây là prototype thử nghiệm, không dùng để vận hành nghiệp vụ thật.
- Dữ liệu seed và dữ liệu nhập trong phiên chỉ phục vụ minh họa.
- Vai trò trong giao diện không thay thế cơ chế xác thực hoặc phân quyền.
- Mọi quy trình chính thức và việc tích hợp cần được đơn vị phụ trách xác nhận.
