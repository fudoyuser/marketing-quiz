# Marketing Quiz Lab

Bộ câu đố chuyên sâu về các khái niệm và mô hình marketing: **33 chủ đề, 4 case study, 384 câu hỏi**.

Trang chạy tại: https://fudoyuser.github.io/marketing-quiz/

## Nội dung

| Nhóm | Chủ đề |
|---|---|
| Chiến lược & phân tích | 3Cs, Five Forces, PESTEL, SWOT/TOWS, Ansoff, BCG, Generic Strategies, Blue Ocean, Value Chain, VRIO, GE–McKinsey |
| Khách hàng & marketing mix | STP, 4P/7P/4C, Jobs-to-be-Done, Value Proposition Canvas, Động cơ & tâm lý người mua, Hành trình khách hàng & persona |
| Truyền thông & thương hiệu | AIDA và các mô hình phễu, CBBE & Aaker, 12 hình mẫu thương hiệu, Lăng kính Kapferer, Golden Circle, How Brands Grow |
| Digital marketing | SOSTAC & RACE, Paid/Owned/Earned & See–Think–Do–Care, SEO, Mô hình phân bổ |
| Định giá | Nghiên cứu giá (Van Westendorp, conjoint, co giãn), Tâm lý giá & mô hình định giá |
| Vòng đời & đo lường | PLC & Diffusion, NPS/CLV/CAC, ROAS/ROI/MMM, A/B testing & cohort |
| Case study | Chuỗi trà Mây, Ví FinaPay, Mỹ phẩm Lumi Skin, Phòng tập FitHub |

## Tính năng

- **Thẻ lý thuyết** cho mỗi chủ đề: tóm tắt, sơ đồ trực quan, ý chính.
- **Ba cấp độ**: Nền tảng (nguồn gốc, định nghĩa), Áp dụng (tình huống, bài tính), Phản biện (hạn chế, so sánh).
- **Ba dạng câu**: một đáp án, chọn nhiều đáp án, sắp xếp thứ tự.
- **Luyện 10 câu ngẫu nhiên** hoặc làm toàn bộ, lọc theo cấp độ.
- **Thử thách tổng hợp**: 15 câu ngẫu nhiên từ mọi chủ đề.
- **Ôn lại câu sai**: câu trả lời sai được lưu lại; trả lời đúng thì gỡ khỏi sổ.
- Kỷ lục và sổ lỗi sai lưu trên trình duyệt (localStorage).

## Cấu trúc

```
index.html        khung trang
style.css         giao diện (sáng/tối)
js/app.js         logic quiz
js/diagrams.js    sơ đồ cho thẻ lý thuyết
data/*.js         câu hỏi theo nhóm (strategy, customer, brand, digital, pricing, metric, cases)
```

## Thêm câu hỏi

Mỗi câu trong `questions` của một chủ đề:

```js
{ lv: 2, q: "Câu hỏi", a: "Đáp án đúng", w: ["Sai 1", "Sai 2", "Sai 3"], e: "Giải thích" }
{ t: "multi", lv: 2, q: "...", a: ["Đúng 1", "Đúng 2"], w: ["Sai 1", "Sai 2"], e: "..." }
{ t: "order", lv: 1, q: "...", items: ["Bước 1", "Bước 2", "Bước 3"], e: "..." }
```

`lv`: 1 = Nền tảng, 2 = Áp dụng, 3 = Phản biện. Sơ đồ (`dia`) hỗ trợ các kiểu: `matrix`, `grid3`, `pyramid`, `funnel`, `steps`, `cards`, `triangle`, `forces`, `circles`, `canvas`, `table`, `plc`, `bell`.
