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
- **Phân quyền xem thử:** Chủ quán / Quản lý / Kho / Bếp (menu rút gọn + chặn thao tác theo vai trò ở mức code, ẩn số tiền nhạy cảm với Kho/Bếp, nhật ký thao tác ở Tổng quan).

## Quy tắc tính toán (khóa sau đợt sửa P0, 14/10/2026)

- **Một nguồn sự thật cho cost:** tổng đoàn = tổng các dòng món (mỗi dòng làm tròn đồng chẵn rồi cộng). Không còn 2 công thức song song.
- **Giá vốn bình quân gia quyền:** nhập kho → tồn += số nhập; giá vốn = (tồn cũ × giá cũ + nhập × giá nhập) / tổng tồn. Cột "Giá mới nhất" trong báo cáo biến động = giá lần nhập gần nhất, có thể khác giá vốn bình quân.
- **Tồn lý thuyết (một định nghĩa mọi màn hình):** = Tồn hiện tại (đã gồm hàng nhập hôm nay) − Xuất (tiêu hao hôm nay). Nhu cầu vượt tồn hiện riêng ở cột "Thiếu", không hiển thị tồn âm.
- **Cọc = 30% doanh thu hiện tại**, tự tính lại khi đổi số khách / đổi set. "Còn thiếu cọc" (phần cọc chưa đủ) khác "Còn phải thu" (tiền ăn còn lại).
- **Kiểm kê:** ô tồn thực tế để trống khi chưa đếm; Lưu phiếu kiểm kê chốt tồn kho theo số đã đếm và lưu phiếu để xem lại; lưu kiểm kê KHÔNG đổi giá.
- **Thu tiền:** mỗi đoàn lưu danh sách các lần thu (ngày giờ, tiền mặt/chuyển khoản, ghi chú, người ghi); không ghi khoản 0đ; sửa/xóa có xác nhận.
- **Vai trò là công tắc demo, chưa phải tài khoản thật:** ô "Vai trò" ở topbar chỉ đổi góc nhìn trong trình duyệt này, ai cũng đổi được. Tài khoản + mật khẩu + phân quyền thật cần backend (bước tiếp theo khi đưa vào vận hành thật).

## Logo
Logo chính thức của nhà hàng (lấy từ website organicrestaurant.vn, 283×80, nền trong suốt) được nhúng trực tiếp vào `index.html` dạng data URI ở header, cùng favicon là logo trên nền xanh đậm để hiển thị rõ trên tab trình duyệt. (Không dùng file ảnh rời vì GitHub API qua công cụ này không giữ nguyên byte file nhị phân.)
