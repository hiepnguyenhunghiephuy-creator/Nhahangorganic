# Nhà hàng Organic — Quản lý vận hành (Web app demo)

Web app quản lý nhà hàng khách tour: booking đoàn → đơn đoàn tự tính cost →
kế hoạch nguyên liệu → nhập kho → bếp (KDS) → thu tiền → kiểm kê → báo cáo
food cost. SPA tĩnh, không build step, không dependency, không framework.

## Chạy local

```bash
cd nhahang-organic-web
python3 -m http.server 8000
```

Mở trình duyệt: http://localhost:8000

Dữ liệu lưu trong `localStorage` của trình duyệt. Nút **↺ Đặt lại dữ liệu mẫu**
khôi phục dữ liệu demo ban đầu.

## Deploy lên Vercel

1. Push thư mục này lên GitHub (repo riêng).
2. Trên Vercel: **Add New → Project → Import** repo đó.
3. Framework Preset: **Other** (không cần build). Output Directory: để mặc định
   (thư mục gốc). Không cần biến môi trường.
4. Deploy. Vercel tự cấp domain `*.vercel.app`; có thể gán domain riêng
   (ví dụ `nhahangorganic.vercel.app`) trong phần Domains của Project.

> Lưu ý: đây là bản demo — dữ liệu chỉ lưu trên trình duyệt từng người dùng,
> chưa có backend / đăng nhập. Mọi số liệu trong app đều là **SỐ LIỆU MẪU —
> cần thay bằng số thật của quán**.

## Cấu trúc

```
index.html      Khung trang: sidebar, topbar, vùng hiển thị, modal
css/app.css     Toàn bộ giao diện (premium: emerald + vàng đồng + trung tính ấm)
js/app.js       Dữ liệu mẫu + tính toán (BOM, cost, food cost) + render + sự kiện
```

## Tính năng chính

- **Tổng quan:** khách, doanh thu dự kiến, food cost, cảnh báo tồn thấp.
- **Booking đoàn:** tạo/sửa/xóa, quản lý cọc (đã cọc / còn thiếu).
- **Đơn đoàn:** đổi số khách → định mức BOM, chi phí, doanh thu, food cost,
  lợi nhuận tính lại ngay lập tức.
- **Kế hoạch mua:** cộng dồn nhu cầu tất cả đoàn, trừ tồn kho, tách theo NCC,
  cộng 15% dự phòng cho rau/mỳ lẩu gọi thêm miễn phí.
- **Nhập kho:** phiếu nhập theo NCC, giá từng lần nhập, tồn kho tự cộng.
- **Bếp (KDS):** thẻ món theo đoàn, Chờ nấu / Đang nấu / Đã xong, 1 chạm.
- **Thu tiền:** chốt đơn, đối soát tiền mặt / chuyển khoản trừ cọc.
- **Kiểm kê:** nhập tồn thực tế, chênh lệch vs tồn lý thuyết hiện ngay.
- **Báo cáo:** food cost theo đoàn / set / khách, thực tế vs định mức,
  nhập–xuất–tồn, top hao hụt, biến động giá theo NCC.
- **Danh mục:** món, BOM, nguyên liệu, NCC, bàn — thêm/sửa/xóa trong app.
- **Phân quyền xem thử:** Chủ quán / Quản lý / Kho / Bếp (menu rút gọn).
