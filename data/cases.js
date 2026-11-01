// Case study tình huống: doanh nghiệp hư cấu, số liệu minh hoạ. Câu hỏi giữ nguyên thứ tự.
CASES.push(
  {
    id: "case-tra-may", title: "Chuỗi trà Mây", en: "Tăng trưởng trong thị trường đồ uống bão hoà",
    models: ["SWOT/TOWS", "PESTEL", "Ansoff", "PLC", "AARRR", "Định vị"],
    context: [
      "Trà Mây là chuỗi trà sữa Việt có 120 cửa hàng ở Hà Nội và TP.HCM, khách chính 16–24 tuổi. Sau 6 năm tăng trưởng nhanh, doanh thu mỗi cửa hàng đi ngang hai năm gần đây.",
      "Thị trường trà sữa đã có hàng chục thương hiệu, một chuỗi nước ngoài vừa giảm giá 20% để giành thị phần. Người trẻ ngày càng quan tâm đồ uống ít đường. Trà Mây có hợp đồng độc quyền với hợp tác xã trà Shan tuyết ở Hà Giang."
    ],
    facts: ["Ứng dụng thành viên: 400.000 người, 60% chỉ mua đúng một lần", "Chi phí thuê mặt bằng tăng 15%/năm", "Doanh thu mỗi cửa hàng: đi ngang 2 năm"],
    questions: [
      { lv: 2, q: "Hợp đồng độc quyền với vùng trà Shan tuyết thuộc ô nào trong SWOT?", a: "Strength", w: ["Opportunity", "Weakness", "Threat"], e: "Đây là nguồn lực nội bộ, hiếm và khó bắt chước, tức điểm mạnh." },
      { lv: 2, q: "Xu hướng người trẻ chuộng đồ uống ít đường là yếu tố PESTEL nào, và thuộc ô nào trong SWOT?", a: "Social; Opportunity", w: ["Economic; Threat", "Technological; Strength", "Legal; Weakness"], e: "Thay đổi lối sống là yếu tố xã hội bên ngoài, mở ra cơ hội cho dòng sản phẩm phù hợp." },
      { lv: 2, q: "Thị trường trà sữa nơi Trà Mây hoạt động đang ở giai đoạn nào của vòng đời?", a: "Bão hoà", w: ["Giới thiệu", "Tăng trưởng", "Suy thoái"], e: "Nhiều đối thủ, cạnh tranh giá, doanh thu mỗi điểm bán đi ngang là dấu hiệu bão hoà." },
      { lv: 2, q: "Con số \"60% thành viên chỉ mua đúng một lần\" cho thấy vấn đề ở giai đoạn nào của AARRR?", a: "Retention", w: ["Acquisition", "Referral", "Revenue"], e: "Trà Mây thu hút khách tốt nhưng không giữ được họ quay lại." },
      { lv: 2, q: "Trà Mây ra dòng trà nguyên lá ít đường tại chính các cửa hàng hiện có. Theo Ansoff, đây là chiến lược nào?", a: "Phát triển sản phẩm", w: ["Thâm nhập thị trường", "Phát triển thị trường", "Đa dạng hoá"], e: "Sản phẩm mới, bán cho tập khách và kênh hiện có." },
      { lv: 2, q: "Dùng vùng trà độc quyền để làm dòng trà nguyên chất ít đường, đón xu hướng sống khoẻ. Trong TOWS, đây là chiến lược gì?", a: "SO", w: ["ST", "WO", "WT"], e: "Điểm mạnh nội bộ kết hợp cơ hội bên ngoài, là chiến lược tấn công." },
      { lv: 3, q: "Point of Difference nào mạnh nhất để Trà Mây chống lại chuỗi nước ngoài đang giảm giá?", a: "Trà nguyên lá từ vùng Shan tuyết độc quyền, ít đường", w: ["Giá rẻ hơn chuỗi nước ngoài", "Có nhiều loại trân châu", "Mở cửa đến 22 giờ"], e: "Đáp án đúng vừa liên quan đến nhu cầu mới, vừa khó bắt chước. Chạy đua giá với đối thủ nhiều vốn là thế yếu; trân châu và giờ mở cửa chỉ là điểm tương đồng (POP)." }
    ]
  },
  {
    id: "case-finapay", title: "Ví điện tử FinaPay", en: "Người đến sau trong thị trường thanh toán",
    models: ["BCG", "CLV · CAC", "PESTEL", "VRIO", "Ansoff"],
    context: [
      "FinaPay là ví điện tử do một tập đoàn bán lẻ sở hữu, ra mắt 3 năm trước. Ví có 1,5 triệu người dùng và 6% thị phần giao dịch; ví dẫn đầu chiếm 60%. Thị trường thanh toán số tăng khoảng 25% mỗi năm.",
      "Ngân hàng Nhà nước vừa siết quy định định danh khách hàng (eKYC). Tập đoàn mẹ có 300 siêu thị và cửa hàng tiện lợi trên toàn quốc, hiện chưa tích hợp FinaPay vào chương trình tích điểm."
    ],
    facts: ["CAC: 120.000đ mỗi người dùng", "Lợi nhuận gộp: 10.000đ mỗi người dùng mỗi tháng", "Churn: 5% mỗi tháng"],
    questions: [
      { lv: 2, q: "Theo ma trận BCG, FinaPay đang ở ô nào?", a: "Question mark", w: ["Star", "Cash cow", "Dog"], e: "Thị phần tương đối 6 / 60 = 0,1 (thấp) trong thị trường tăng 25%/năm (cao)." },
      { lv: 2, q: "Thời gian gắn bó trung bình và CLV đơn giản (lợi nhuận gộp, chưa chiết khấu) của một người dùng là bao nhiêu?", a: "20 tháng; 200.000đ", w: ["5 tháng; 50.000đ", "12 tháng; 120.000đ", "20 tháng; 2.400.000đ"], e: "Gắn bó ≈ 1 / 5% = 20 tháng. CLV = 10.000 × 20 = 200.000đ." },
      { lv: 3, q: "Với CLV 200.000đ và CAC 120.000đ, nhận định nào đúng nhất?", a: "LTV:CAC chỉ khoảng 1,7 : 1, thấp hơn mức 3 : 1 thường coi là lành mạnh; cần giảm CAC hoặc churn trước khi đẩy mạnh thu hút", w: ["Rất lành mạnh, nên tăng gấp đôi ngân sách quảng cáo", "Đang lỗ trên mỗi người dùng nên phải đóng cửa ví", "Không thể đánh giá vì thiếu NPS"], e: "Có lãi trên giấy, nhưng biên quá mỏng để bù chi phí vận hành và rủi ro." },
      { lv: 2, q: "Thời gian hoàn vốn CAC (CAC payback) là bao lâu?", a: "12 tháng", w: ["6 tháng", "20 tháng", "1,2 tháng"], e: "120.000 / 10.000 = 12 tháng. Khách trung bình ở 20 tháng, nên 8 tháng cuối mới là lợi nhuận." },
      { lv: 2, q: "Quy định mới về eKYC là yếu tố PESTEL nào?", a: "Legal", w: ["Social", "Technological", "Economic"], e: "Một quy định pháp lý cụ thể đã có hiệu lực. Nó làm tăng chi phí tuân thủ và cũng là rào cản gia nhập với đối thủ nhỏ." },
      { lv: 3, q: "Theo VRIO, nguồn lực nào có khả năng tạo lợi thế bền vững nhất cho FinaPay?", a: "Hệ sinh thái 300 điểm bán của tập đoàn mẹ để tích hợp thanh toán và tích điểm", w: ["Giao diện ứng dụng đẹp", "Ngân sách khuyến mãi hoàn tiền", "Tính năng chuyển tiền miễn phí"], e: "Có giá trị, hiếm, đối thủ khó sao chép một mạng lưới bán lẻ như vậy. Ba lựa chọn kia đều dễ bắt chước." },
      { lv: 3, q: "Hướng đi nào hợp lý nhất khi kết hợp BCG và Ansoff?", a: "Đầu tư có chọn lọc vào thâm nhập: tích hợp ví vào thanh toán và tích điểm tại 300 điểm bán để giảm CAC và churn", w: ["Rút khỏi thị trường vì thị phần quá nhỏ", "Đa dạng hoá sang cho vay tiêu dùng ngay", "Giảm phí giao dịch về 0 trên toàn quốc"], e: "Question mark cần đầu tư để giành thị phần, và khách mua sắm sẵn có của tập đoàn là kênh thu hút rẻ nhất. Đa dạng hoá khi nền tảng chưa vững quá rủi ro." }
    ]
  },
  {
    id: "case-lumi", title: "Mỹ phẩm Lumi Skin", en: "Thoát bẫy giảm giá để xây thương hiệu",
    models: ["CBBE", "Aaker", "JTBD", "Paid/Owned/Earned", "How Brands Grow", "Kapferer"],
    context: [
      "Lumi Skin là thương hiệu chăm sóc da 3 năm tuổi, bán chủ yếu qua TikTok Shop và sàn thương mại điện tử. Doanh số tăng nhờ livestream và khuyến mãi liên tục 30–40%.",
      "Ban giám đốc muốn nâng giá và lên phân khúc trung cao cấp. Phỏng vấn khách cho thấy họ mua để \"giữ da khoẻ trong thời tiết nóng ẩm mà không phải dùng mười bước\"."
    ],
    facts: ["Nhận biết có gợi ý (nhìn thấy logo): 45%", "Nhận biết không gợi ý: 6%", "70% review nhắc đến \"giá rẻ\"", "Doanh số rơi 50% trong tuần không có khuyến mãi"],
    questions: [
      { lv: 2, q: "Nhận biết có gợi ý 45% nhưng không gợi ý chỉ 6%. Bậc nào của CBBE đang yếu nhất?", a: "Salience (độ nổi bật)", w: ["Resonance", "Judgments", "Imagery"], e: "Khách nhận ra thương hiệu khi thấy, nhưng hiếm khi tự nghĩ đến. Đó là độ sâu của nhận biết, nằm ở bậc đáy." },
      { lv: 2, q: "Khuyến mãi liên tục và 70% review nhắc đến \"giá rẻ\" đang làm tổn hại thành phần nào trong mô hình của Aaker?", a: "Chất lượng cảm nhận (perceived quality)", w: ["Tài sản độc quyền khác", "Nhận biết thương hiệu", "Trung thành thương hiệu"], e: "Thương hiệu gắn với \"rẻ\" sẽ khó lên trung cao cấp. Doanh số rơi một nửa khi hết khuyến mãi cho thấy khách trung thành với giá, không với thương hiệu." },
      { lv: 2, q: "Câu nào là job statement tốt nhất cho Lumi Skin?", a: "Giữ da khoẻ, không bết dính trong thời tiết nóng ẩm với quy trình tối giản", w: ["Phụ nữ 20–30 tuổi sống ở thành phố", "Một bộ serum có vitamin C", "Khách thích livestream buổi tối"], e: "Công việc khách cần hoàn thành, gồm cả bối cảnh (nóng ẩm) và ràng buộc (ít bước)." },
      { lv: 2, q: "Video KOL được Lumi trả phí là loại media nào, còn video khách tự quay review là loại nào?", a: "Paid; Earned", w: ["Owned; Paid", "Earned; Owned", "Paid; Owned"], e: "Nội dung tài trợ là paid; nội dung khách tự tạo không được trả tiền là earned." },
      { lv: 3, q: "Theo Byron Sharp, cách nào giúp Lumi tăng nhận biết không gợi ý hiệu quả nhất?", a: "Gắn thương hiệu với các Category Entry Points như \"đi nắng về\", \"da đổ dầu giữa trưa\" và dùng nhất quán tài sản nhận diện", w: ["Tăng mức giảm giá lên 50%", "Chỉ nhắm quảng cáo vào khách đã mua", "Thay logo và màu sắc mỗi quý"], e: "Mental availability được xây bằng liên kết với tình huống mua và tài sản nhận diện ổn định, tiếp cận rộng người mua trong danh mục." },
      { lv: 2, q: "Lumi muốn khách cảm thấy \"mình là người chăm sóc bản thân thông minh, không chạy theo trào lưu\". Đây là mặt nào trong lăng kính Kapferer?", a: "Self-image", w: ["Reflection", "Physique", "Culture"], e: "Self-image là cách khách nghĩ về chính mình khi dùng thương hiệu." },
      { lv: 3, q: "Lộ trình nào hợp lý nhất để Lumi lên phân khúc cao hơn?", a: "Giảm dần tần suất khuyến mãi, xây bằng chứng chất lượng cho đúng công việc \"da khoẻ khí hậu nóng ẩm\", mở rộng tiếp cận ngoài livestream", w: ["Tăng giá gấp đôi ngay lập tức", "Giữ khuyến mãi 40% và thêm quà tặng", "Ngừng bán trên mọi sàn thương mại điện tử"], e: "Tăng giá đột ngột khi khách đang neo vào giá khuyến mãi sẽ làm sụt doanh số. Cần đổi lý do mua từ giá sang giá trị trước." }
    ]
  },
  {
    id: "case-fithub", title: "Chuỗi phòng tập FitHub", en: "Cạnh tranh với làn sóng gym giá rẻ",
    models: ["Five Forces", "Generic Strategies", "Blue Ocean", "NPS", "AARRR", "Tâm lý giá"],
    context: [
      "FitHub có 15 phòng tập ở TP.HCM, giá 900.000đ/tháng, gồm lớp nhóm và tư vấn huấn luyện viên. Một chuỗi gym giá rẻ mở cửa 24/7, không có huấn luyện viên, vừa vào thị trường với giá 199.000đ/tháng.",
      "Nhiều hội viên FitHub nghỉ sau 3 tháng. Khảo sát cho thấy họ đến để đạt một mục tiêu cụ thể, như giảm cân trước đám cưới, nhưng không thấy tiến bộ rõ."
    ],
    facts: ["Khảo sát NPS 300 hội viên: 90 người chấm 9–10, 120 người chấm 7–8, 90 người chấm 0–6", "Tỷ lệ nghỉ cao nhất: tháng thứ 2 và 3"],
    questions: [
      { lv: 2, q: "NPS của FitHub là bao nhiêu?", a: "0", w: ["30", "70", "−30"], e: "Promoters 90/300 = 30%; Detractors 90/300 = 30%. NPS = 30 − 30 = 0." },
      { lv: 2, q: "Chuỗi gym giá rẻ vừa vào thị trường thể hiện lực nào trong Five Forces?", a: "Đe doạ từ đối thủ mới gia nhập", w: ["Quyền thương lượng của nhà cung cấp", "Đe doạ từ sản phẩm thay thế", "Quyền thương lượng của người mua"], e: "Một doanh nghiệp mới cung cấp cùng loại dịch vụ. Tập tại nhà qua ứng dụng mới là sản phẩm thay thế." },
      { lv: 2, q: "Chuỗi gym giá rẻ 24/7 đang theo chiến lược tổng quát nào của Porter?", a: "Dẫn đầu chi phí", w: ["Khác biệt hoá", "Tập trung khác biệt", "Stuck in the middle"], e: "Cắt huấn luyện viên và dịch vụ để có chi phí thấp nhất, phục vụ số đông." },
      { lv: 3, q: "FitHub nên phản ứng thế nào theo logic của Porter?", a: "Khác biệt hoá rõ hơn bằng kết quả có huấn luyện viên đồng hành, thay vì giảm giá đua với chuỗi giá rẻ", w: ["Giảm giá xuống 199.000đ", "Vừa giảm giá vừa giữ mọi dịch vụ", "Bỏ huấn luyện viên để giảm chi phí"], e: "Đua giá với đối thủ có cấu trúc chi phí thấp hơn là thế thua; vừa giảm giá vừa giữ chi phí cao dễ bị kẹt ở giữa." },
      { lv: 2, q: "FitHub ra mắt \"Chương trình 12 tuần\" có mục tiêu cá nhân, đo chỉ số cơ thể định kỳ và huấn luyện viên theo dõi. Trong ERRC, đây là hành động nào?", a: "Create", w: ["Eliminate", "Reduce", "Raise"], e: "Một yếu tố ngành gym phổ thông chưa cung cấp: cam kết và đo lường kết quả theo mục tiêu." },
      { lv: 2, q: "Hội viên nghỉ nhiều ở tháng 2–3 vì không thấy tiến bộ. Đây là vấn đề ở giai đoạn nào của AARRR, và theo JTBD thì gốc rễ là gì?", a: "Retention; FitHub bán quyền dùng phòng tập trong khi khách \"thuê\" FitHub để đạt một kết quả cụ thể", w: ["Acquisition; quảng cáo chưa đủ nhiều", "Referral; khách không có bạn bè", "Revenue; giá quá thấp"], e: "Giữ chân phụ thuộc vào việc giúp khách hoàn thành công việc họ đến để làm, không chỉ vào cơ sở vật chất." },
      { lv: 3, q: "FitHub thiết kế ba gói: Cơ bản 400.000đ, Tiêu chuẩn 900.000đ, Cao cấp 2.000.000đ có huấn luyện viên riêng. Ngoài phục vụ khách chi nhiều, gói Cao cấp còn có vai trò gì?", a: "Làm mốc neo khiến gói Tiêu chuẩn trông hợp lý hơn", w: ["Làm giảm doanh thu trung bình", "Thu hút khách từ chuỗi giá rẻ", "Thay thế gói Cơ bản"], e: "Cấu trúc Good–Better–Best: gói cao nhất là neo giá, kéo phần đông khách về gói giữa." }
    ]
  }
);
