export type ContentBlock = { title: string; text: string };
export type FAQ = { question: string; answer: string };

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  duration: string;
  steps: ContentBlock[];
  details: ContentBlock[];
  faq: FAQ[];
};

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  image: string;
  imageAlt: string;
  author: string;
  sections: ArticleSection[];
};

export const brand = {
  name: "AZ FACE",
  headline: "Chăm chút nét riêng của bạn.",
  description:
    "Khám phá các dịch vụ chăm sóc da, dáng mày và sắc môi tại AZ FACE. Bắt đầu bằng việc trao đổi điều bạn đang quan tâm.",
  legalName: "CÔNG TY TNHH AZ FACE",
  taxCode: "0402246363",
  address: "198 Huỳnh Tấn Phát, phường Cẩm Lệ, thành phố Đà Nẵng, Việt Nam",
  demoNotice:
    "Chăm sóc da, dáng mày và sắc môi.",
};

export const services: Service[] = [
  {
    slug: "cham-soc-da-mat",
    title: "Chăm sóc da mặt",
    shortTitle: "Chăm sóc da",
    eyebrow: "Một khoảng nghỉ cho làn da",
    summary:
      "Bắt đầu từ những bước chăm sóc cơ bản và điều bạn muốn hiểu thêm về làn da của mình.",
    description:
      "Một buổi chăm sóc không cần bắt đầu bằng thật nhiều lựa chọn. Hãy dành thời gian nói về thói quen hằng ngày, cảm giác trên da và những điều bạn còn băn khoăn. Từ đó, tìm hiểu phạm vi từng bước trước khi quyết định trải nghiệm.",
    image: "/images/service-skin.webp",
    imageAlt: "Hình ảnh người trưởng thành trong không gian chăm sóc da",
    duration: "Thời lượng được trao đổi theo nhu cầu",
    steps: [
      { title: "Trao đổi nhu cầu", text: "Chia sẻ điều bạn đang quan tâm, những sản phẩm thường dùng và câu hỏi muốn được giải thích." },
      { title: "Tìm hiểu từng bước", text: "Xem nội dung làm sạch và chăm sóc được giới thiệu; hỏi rõ sản phẩm, thao tác và phạm vi của buổi trải nghiệm." },
      { title: "Xác nhận lựa chọn", text: "Làm rõ thời lượng, chi phí và những lưu ý trước khi đồng ý. Bạn có thể hỏi thêm hoặc dành thời gian cân nhắc." },
      { title: "Ghi lại điều cần nhớ", text: "Lưu hướng dẫn đã được trao đổi và cách liên hệ khi cần làm rõ thông tin sau buổi chăm sóc." },
    ],
    details: [
      { title: "Bắt đầu từ thói quen", text: "Những điều nhỏ như cách làm sạch, sản phẩm đang dùng và thời gian dành cho chăm sóc là điểm khởi đầu hữu ích cho cuộc trò chuyện." },
      { title: "Hiểu trước khi chọn", text: "Tên gọi một buổi chăm sóc chưa nói hết nội dung. Hãy hỏi từng bước gồm những gì, bước nào là lựa chọn thêm và chi phí được tính thế nào." },
      { title: "Có khoảng trống để cân nhắc", text: "Bạn không cần quyết định mọi việc trong lần trao đổi đầu tiên. Ghi lại các câu hỏi chưa rõ để được giải thích trước khi tiếp tục." },
    ],
    faq: [
      { question: "Lần đầu tìm hiểu chăm sóc da nên chuẩn bị gì?", answer: "Bạn có thể ghi tên những sản phẩm thường dùng, điều đang quan tâm và các câu hỏi về quy trình. Không cần cung cấp ảnh cá nhân hay hồ sơ sức khỏe trong biểu mẫu." },
      { question: "Thời lượng buổi chăm sóc được xác định thế nào?", answer: "Thời lượng phụ thuộc nội dung được lựa chọn. Hãy làm rõ từng bước và thời gian dự kiến trước khi quyết định." },
      { question: "Dịch vụ có phù hợp khi da đang khó chịu không?", answer: "Trang này không xác định tình trạng da hoặc đưa ra chỉ định cá nhân. Khi da có biểu hiện bất thường, hãy tìm người có chuyên môn phù hợp trước khi lựa chọn dịch vụ." },
    ],
  },
  {
    slug: "cham-soc-da-chuyen-sau",
    title: "Chăm sóc da chuyên sâu",
    shortTitle: "Chăm sóc chuyên sâu",
    eyebrow: "Hiểu rõ từng lựa chọn",
    summary:
      "Dành thời gian tìm hiểu phạm vi, các bước và những câu hỏi cần đặt ra trước một buổi chăm sóc.",
    description:
      "Khi muốn dành thêm sự chú ý cho làn da, thông tin cụ thể quan trọng hơn một tên gọi hấp dẫn. Cùng tìm hiểu buổi chăm sóc gồm những phần nào, vì sao từng bước được đề xuất và điều gì cần làm rõ trước khi lựa chọn.",
    image: "/images/service-care.webp",
    imageAlt: "Hình ảnh chi tiết không gian và vật dụng chăm sóc da",
    duration: "Thời lượng được trao đổi theo nhu cầu",
    steps: [
      { title: "Xác định điều quan tâm", text: "Bắt đầu bằng một hoặc hai nhu cầu cụ thể, thay vì chọn nhiều hạng mục cùng lúc chỉ vì tên gọi của gói dịch vụ." },
      { title: "Đọc phạm vi chăm sóc", text: "Tìm hiểu sản phẩm, thao tác, thời lượng và những phần không nằm trong nội dung được giới thiệu." },
      { title: "Trao đổi các điều kiện", text: "Hỏi rõ người thực hiện, những lưu ý cần biết, chi phí và lựa chọn dừng hoặc điều chỉnh trước khi quyết định." },
      { title: "Lưu thông tin tiếp theo", text: "Ghi lại hướng dẫn và kênh giải đáp. Những câu hỏi về tình trạng cá nhân cần được người có chuyên môn phù hợp xem xét." },
    ],
    details: [
      { title: "Phạm vi thay cho tên gọi", text: "“Chuyên sâu” cần đi cùng mô tả cụ thể. Trang giới thiệu giúp bạn biết điều nên hỏi, không thay cho đánh giá tình trạng da hoặc chỉ định điều trị." },
      { title: "Chi phí có ngữ cảnh", text: "Một mức phí chỉ dễ so sánh khi bạn biết đơn vị tính, nội dung đã bao gồm và các khoản tùy chọn. Đừng ngại đề nghị giải thích từng phần." },
      { title: "Không chọn theo số bước", text: "Nhiều bước hơn không tự động có nghĩa là phù hợp hơn. Điều đáng quan tâm là mục đích của từng bước và thông tin được giải thích cho bạn." },
    ],
    faq: [
      { question: "Chăm sóc chuyên sâu khác chăm sóc da mặt như thế nào?", answer: "Nhóm này tập trung vào việc tìm hiểu kỹ hơn phạm vi và các lựa chọn chăm sóc. Hãy trao đổi cụ thể về từng bước, sản phẩm và những lưu ý trước khi lựa chọn." },
      { question: "Có cần chọn một gói nhiều buổi ngay không?", answer: "Bạn có thể yêu cầu giải thích nội dung từng buổi và điều kiện của gói trước khi cân nhắc. Bạn có thể dành thêm thời gian cân nhắc khi chưa đủ thông tin." },
      { question: "Có bảng giá để tham khảo không?", answer: "Website chưa công bố bảng giá hoạt động thực tế. Khi trao đổi với một cơ sở, hãy hỏi mức phí, phần bao gồm và điều kiện áp dụng thay vì chỉ so sánh giá mở đầu." },
    ],
  },
  {
    slug: "dang-may-va-sac-moi",
    title: "Dáng mày và sắc môi",
    shortTitle: "Mày và môi",
    eyebrow: "Từ sở thích đến lựa chọn",
    summary:
      "Tìm hiểu kiểu dáng, sắc độ và những điều cần trao đổi để lựa chọn theo sở thích của chính bạn.",
    description:
      "Một hình ảnh tham khảo có thể mở đầu cuộc trò chuyện, nhưng không cần trở thành khuôn mẫu phải làm theo. Hãy nói về dáng mày, màu môi bạn yêu thích, cách trang điểm thường ngày và những điều bạn muốn giữ lại trong diện mạo của mình.",
    image: "/images/service-brows.webp",
    imageAlt: "Hình ảnh cận cảnh dáng mày và sắc môi của người trưởng thành",
    duration: "Thời lượng được trao đổi theo nhu cầu",
    steps: [
      { title: "Chia sẻ sở thích", text: "Chọn vài hình tham khảo và chỉ ra chi tiết bạn thích: đường nét, độ đậm hoặc sắc độ, thay vì yêu cầu sao chép toàn bộ." },
      { title: "Tìm hiểu các lựa chọn", text: "Hỏi rõ tên gọi, cách thực hiện, người phụ trách và những giới hạn của từng phương án được giới thiệu." },
      { title: "Làm rõ trước khi chọn", text: "Trao đổi về việc xem trước kiểu dáng, phạm vi chỉnh sửa, chi phí và những lưu ý liên quan đến lựa chọn của bạn." },
      { title: "Giữ lại hướng dẫn", text: "Lưu thông tin đã được thống nhất và các câu hỏi cần giải đáp tiếp. Không thay hướng dẫn cá nhân bằng một bài viết chung." },
    ],
    details: [
      { title: "Sở thích là điểm bắt đầu", text: "Độ sắc nét, độ đậm và cách bạn thường trang điểm đều đáng được nói đến. Không có một kiểu dáng duy nhất mà mọi người cần hướng tới." },
      { title: "Ảnh tham khảo có giới hạn", text: "Ánh sáng, trang điểm, màn hình và chỉnh sửa ảnh có thể làm màu sắc khác đi. Hãy xem hình ảnh cùng thông tin cụ thể về phạm vi và giới hạn của từng lựa chọn." },
      { title: "Câu hỏi trước quyết định", text: "Tìm hiểu người thực hiện, phạm vi, lưu ý và cách trao đổi sau dịch vụ. Mọi lựa chọn cần đi cùng lời giải thích cụ thể trước khi quyết định." },
    ],
    faq: [
      { question: "Có nên mang theo hình dáng mày hoặc màu môi yêu thích?", answer: "Hình tham khảo giúp bạn diễn đạt sở thích. Hãy chỉ ra chi tiết bạn thích và hỏi về giới hạn áp dụng, thay vì mặc định kết quả sẽ giống hệt bức ảnh." },
      { question: "Màu trên màn hình có phản ánh chính xác màu thực tế không?", answer: "Màu có thể khác theo ánh sáng, màn hình, trang điểm và xử lý ảnh. Không nên dựa riêng vào ảnh trên màn hình để chọn màu chính xác." },
      { question: "Trang này có cung cấp dịch vụ phun xăm thực tế không?", answer: "Đây là danh mục trình diễn. Website không tiếp nhận lịch thực hiện, không xác nhận kỹ thuật hay phạm vi chuyên môn của cơ sở và không thu phí." },
    ],
  },
];

export const homeFAQs: FAQ[] = [
  { question: "Chưa biết chọn dịch vụ nào, tôi nên bắt đầu từ đâu?", answer: "Hãy xác định vùng trên gương mặt bạn muốn cải thiện, điều bạn muốn giữ lại và kết quả mong đợi. Bạn không cần tự chọn phương pháp. Buổi tư vấn là lúc làm rõ lựa chọn phù hợp, giới hạn và những rủi ro cần cân nhắc." },
  { question: "Tôi có cần chọn dịch vụ trước khi trao đổi không?", answer: "Không. Bạn có thể bắt đầu bằng câu hỏi về làn da hoặc đường nét gương mặt. Hãy tìm hiểu phạm vi thực hiện, chi phí và thời gian hồi phục trước khi quyết định." },
  { question: "Tôi nên chuẩn bị gì trước buổi tư vấn thẩm mỹ?", answer: "Ghi lại mong muốn, các dịch vụ đã từng thực hiện, tình trạng dị ứng và thuốc đang sử dụng để trao đổi trực tiếp với người phụ trách chuyên môn. Chuẩn bị thêm câu hỏi về phương pháp, rủi ro, chi phí và chăm sóc sau thực hiện." },
  { question: "Tôi có thể chuẩn bị nội dung trao đổi như thế nào?", answer: "Chọn nhóm nhu cầu và ghi lại câu hỏi trong mục Trao đổi nhu cầu. Bạn có thể xem và chỉnh sửa nội dung ngay trên thiết bị của mình." },
  { question: "Tôi có thể xem giá dịch vụ ở đâu?", answer: "Trước khi lựa chọn một dịch vụ, bạn nên làm rõ mức phí, nội dung đã bao gồm và điều kiện áp dụng với cơ sở cung cấp." },
];

export const posts: Post[] = [
  {
    slug: "nhung-cau-hoi-truoc-buoi-tu-van-cham-soc-da",
    title: "Trước buổi tư vấn chăm sóc da, nên hỏi những gì?",
    excerpt: "Một vài câu hỏi được chuẩn bị trước giúp cuộc trao đổi tập trung vào điều bạn cần biết: phạm vi, người thực hiện, chi phí và bước tiếp theo.",
    category: "Chuẩn bị trước khi chọn",
    readTime: "5 phút đọc",
    publishedAt: "2026-11-03",
    image: "/images/service-skin.webp",
    imageAlt: "Hình ảnh không gian chăm sóc da yên tĩnh",
    author: "Ban biên tập AZ FACE",
    sections: [
      {
        heading: "Bắt đầu bằng điều bạn muốn hiểu rõ",
        paragraphs: [
          "Bạn không cần biết tên một liệu trình để bắt đầu tìm hiểu chăm sóc da. Điều có ích hơn là nói rõ mình đang quan tâm điều gì và muốn buổi trao đổi giúp giải đáp câu hỏi nào. Có người muốn hiểu các bước chăm sóc cơ bản. Có người muốn biết một gói dịch vụ gồm những gì trước khi cân nhắc chi phí. Hai nhu cầu ấy không nhất thiết dẫn đến cùng một lựa chọn.",
          "Trước buổi trao đổi, hãy viết ra một hoặc hai câu hỏi quan trọng nhất. Chẳng hạn: tôi muốn hiểu mục đích của từng bước, hoặc tôi muốn biết phần nào thuộc gói và phần nào là lựa chọn thêm. Một danh sách ngắn sẽ dễ sử dụng hơn nhiều thông tin rời rạc được lưu từ quảng cáo.",
        ],
      },
      {
        heading: "Mang theo thông tin, không tự đưa ra kết luận",
        paragraphs: [
          "Tên sản phẩm thường dùng, thói quen chăm sóc và những điều bạn từng thấy khó chịu là thông tin có thể giúp cuộc trò chuyện cụ thể hơn. Bạn có thể ghi lại để tránh quên, nhưng không cần tự gắn nhãn tình trạng da bằng những thuật ngữ đọc được trên mạng. Việc đánh giá một vấn đề cá nhân cần người có chuyên môn phù hợp và đầy đủ thông tin.",
          "Nếu muốn đưa ảnh để giải thích, hãy hỏi cơ sở ảnh được sử dụng và lưu giữ ra sao. Đừng gửi hồ sơ hoặc hình ảnh nhạy cảm vào một kênh chưa rõ người tiếp nhận. Bạn không cần cung cấp ảnh, số điện thoại hay thông tin sức khỏe để đọc nội dung hoặc chuẩn bị câu hỏi trên website.",
        ],
      },
      {
        heading: "Hỏi về phạm vi trước tên gọi",
        paragraphs: [
          "Một tên dịch vụ ngắn thường chưa cho biết toàn bộ những gì sẽ diễn ra. Hãy đề nghị giải thích bằng ngôn ngữ thông thường: bước đó có mục đích gì, ai thực hiện, sản phẩm hoặc thao tác nào được sử dụng và nội dung nào không nằm trong buổi chăm sóc. Nếu có điều chưa hiểu, bạn có thể hỏi lại mà không cần quyết định ngay.",
        ],
        list: [
          "Buổi chăm sóc gồm những bước nào và dự kiến kéo dài bao lâu?",
          "Ai phụ trách trao đổi và ai trực tiếp thực hiện?",
          "Những lưu ý hoặc giới hạn nào cần biết trước khi lựa chọn?",
          "Chi phí đã bao gồm những phần nào, có hạng mục tùy chọn không?",
          "Nếu muốn dừng để cân nhắc thêm, tôi cần làm gì?",
        ],
      },
      {
        heading: "Ra về với thông tin có thể đối chiếu",
        paragraphs: [
          "Sau cuộc trao đổi, điều đáng giữ lại là bản mô tả phạm vi, chi phí, điều kiện áp dụng và cách liên hệ khi còn câu hỏi. Nếu lời giải thích bằng miệng khác với thông tin trên trang dịch vụ, hãy đề nghị làm rõ. Bạn cũng có thể ghi lại phần chưa có câu trả lời để trao đổi ở một thời điểm khác, thay vì tự điền bằng phỏng đoán.",
          "Bài viết giúp bạn chuẩn bị câu hỏi, không đánh giá tình trạng da hay thay thế tư vấn cá nhân. Khi có biểu hiện bất thường hoặc đang theo một hướng dẫn chuyên môn, hãy tìm người phụ trách phù hợp trước khi chọn thêm dịch vụ. Một cuộc trao đổi hữu ích có thể kết thúc bằng việc bạn hiểu rõ hơn và dành thêm thời gian suy nghĩ.",
        ],
      },
    ],
  },
  {
    slug: "doc-bang-gia-dich-vu-cham-soc",
    title: "Một bảng giá rõ ràng cần cho bạn biết điều gì?",
    excerpt: "Đừng chỉ nhìn con số đầu tiên. Đơn vị tính, nội dung bao gồm và điều kiện áp dụng mới giúp bạn so sánh các lựa chọn trên cùng một cơ sở.",
    category: "Lựa chọn có thông tin",
    readTime: "5 phút đọc",
    publishedAt: "2026-11-03",
    image: "/images/service-care.webp",
    imageAlt: "Hình ảnh vật dụng trong không gian chăm sóc",
    author: "Ban biên tập AZ FACE",
    sections: [
      {
        heading: "Con số luôn đi cùng một phạm vi",
        paragraphs: [
          "Hai dịch vụ có tên gần giống nhau chưa chắc bao gồm những phần giống nhau. Một mức giá có thể dành cho một buổi, một hạng mục hoặc một gói nhiều buổi. Nếu chỉ đặt các con số cạnh nhau, bạn có thể bỏ qua những khác biệt quyết định tổng chi phí và nội dung mình sẽ nhận được. Vì vậy, câu hỏi đầu tiên nên là mức phí này áp dụng cho chính xác phần việc nào.",
          "Khi đọc bảng giá, hãy tìm tên dịch vụ, đơn vị tính và mô tả ngắn về phạm vi. Nếu trang chỉ ghi giá “từ”, hãy hỏi những yếu tố nào làm mức phí thay đổi. Thông tin đó cần được giải thích trước khi bạn xác nhận lựa chọn, không phải sau khi đã bắt đầu trải nghiệm hoặc thanh toán một phần.",
        ],
      },
      {
        heading: "Phân biệt phần đã bao gồm và phần tùy chọn",
        paragraphs: [
          "Một bảng giá dễ hiểu cần giúp bạn nhận ra đâu là nội dung nằm trong mức phí, đâu là hạng mục có thể chọn thêm. Hãy hỏi trực tiếp về buổi trao đổi ban đầu, sản phẩm sử dụng, các bước chăm sóc và hướng dẫn sau đó. Không nên mặc định một phần đã được bao gồm chỉ vì hình ảnh quảng cáo đặt nó cạnh tên gói.",
          "Nếu có đề xuất thêm hạng mục, bạn có thể yêu cầu nêu riêng chi phí và mục đích. Việc tách rõ từng phần giúp bạn cân nhắc theo nhu cầu thay vì chỉ phản ứng với một mức chênh lệch nhỏ trong tổng gói. Đồng thời, hãy làm rõ liệu việc không chọn phần thêm có thay đổi phạm vi của lựa chọn ban đầu hay không.",
        ],
      },
      {
        heading: "Đọc điều kiện bằng cùng sự chú ý dành cho giá",
        paragraphs: [
          "Một ưu đãi thường có phạm vi và thời gian áp dụng. Trước khi so sánh, hãy kiểm tra ngày kết thúc, đối tượng áp dụng, hình thức thanh toán và điều kiện sử dụng gói. Nếu các điều kiện được trình bày ở nhiều nơi, hãy xin một bản xác nhận tập hợp thông tin để có thể đọc lại mà không cần tìm từng ảnh hoặc tin nhắn.",
        ],
        list: [
          "Giá tính cho một buổi, một hạng mục hay toàn bộ gói?",
          "Các khoản phải trả đã được thể hiện đầy đủ chưa?",
          "Ưu đãi áp dụng vào thời gian và trường hợp nào?",
          "Nếu đổi lịch hoặc chưa sử dụng hết gói, điều kiện xử lý là gì?",
          "Thông tin nào được xác nhận bằng văn bản trước thanh toán?",
        ],
      },
      {
        heading: "So sánh khi đã đủ thông tin",
        paragraphs: [
          "Bạn có thể lập một ghi chú nhỏ với các cột: phạm vi, thời lượng, người phụ trách, chi phí và điều kiện. Chỉ so sánh những gì đã được cơ sở xác nhận; để trống phần còn thiếu thay vì tự suy luận. Một lựa chọn ít thông tin chưa thể được gọi là tiết kiệm hơn chỉ vì con số mở đầu thấp hơn lựa chọn khác.",
          "Bài viết không đề xuất mức phí thị trường hoặc đánh giá chất lượng một đơn vị từ giá bán. Mục đích là giúp bạn có đủ câu hỏi để đọc một bảng giá cụ thể, hiểu mình đang cân nhắc điều gì và giữ quyền quyết định sau khi các điều kiện đã được giải thích rõ.",
        ],
      },
    ],
  },
  {
    slug: "hieu-cac-buoc-trong-buoi-cham-soc-da",
    title: "Hiểu các bước trong một buổi chăm sóc da",
    excerpt: "Số lượng bước không nói hết giá trị của một buổi chăm sóc. Điều cần biết là mục đích, phạm vi và cách từng lựa chọn được giải thích cho bạn.",
    category: "Chăm sóc da",
    readTime: "5 phút đọc",
    publishedAt: "2026-11-03",
    image: "/images/service-skin.webp",
    imageAlt: "Hình ảnh trải nghiệm chăm sóc da mặt",
    author: "Ban biên tập AZ FACE",
    sections: [
      {
        heading: "Đọc một quy trình từ mục đích của nó",
        paragraphs: [
          "Một danh sách nhiều bước dễ tạo cảm giác đầy đủ, nhưng số lượng chưa giải thích được vì sao một bước xuất hiện và phù hợp trong trường hợp nào. Khi tìm hiểu dịch vụ, hãy nhìn quy trình như một chuỗi thông tin cần làm rõ. Mỗi phần nên có tên dễ hiểu, mục đích và phạm vi, thay vì chỉ là thuật ngữ khiến bạn phải tự tìm kiếm thêm.",
          "Trang giới thiệu có thể mô tả cấu trúc chung, còn lựa chọn cho một người cụ thể cần cuộc trao đổi phù hợp. Vì thế, không nên lấy một quy trình trên mạng làm hướng dẫn tự thực hiện hoặc xem đó là danh sách bắt buộc cho mọi làn da. Những gì chưa hiểu cần được giải thích trước khi bạn đồng ý tiếp tục.",
        ],
      },
      {
        heading: "Cuộc trao đổi ban đầu cũng cần có nội dung",
        paragraphs: [
          "Trước khi nói tới sản phẩm và thao tác, bạn có thể chia sẻ điều mình muốn tìm hiểu, thói quen chăm sóc và những câu hỏi còn băn khoăn. Người tiếp nhận cần giúp bạn hiểu phạm vi buổi trải nghiệm và biết khi nào một vấn đề nằm ngoài nội dung đang được giới thiệu. Đây cũng là lúc hỏi ai sẽ phụ trách các phần khác nhau.",
          "Đừng ngại yêu cầu phân biệt giữa mô tả chăm sóc thông thường và nhận định về một tình trạng cá nhân. Một bài viết hoặc hình minh họa không đủ để kết luận bạn cần phương án nào. Nếu đang có biểu hiện bất thường hay đang làm theo hướng dẫn chuyên môn, bạn nên trao đổi với người phụ trách phù hợp trước khi bổ sung lựa chọn mới.",
        ],
      },
      {
        heading: "Những câu hỏi dành cho từng bước",
        paragraphs: [
          "Bạn không cần ghi nhớ mọi tên sản phẩm để có một cuộc trò chuyện hữu ích. Có thể bắt đầu bằng việc hỏi bước đó nhằm mục đích gì, sản phẩm được giới thiệu ra sao, thao tác dự kiến như thế nào và điều gì cần báo lại trong quá trình trải nghiệm. Nếu câu trả lời chưa rõ, hãy đề nghị diễn đạt bằng cách đơn giản hơn.",
        ],
        list: [
          "Bước này nằm trong phạm vi đã thống nhất hay là lựa chọn thêm?",
          "Tôi cần biết điều gì về sản phẩm hoặc thao tác trước khi đồng ý?",
          "Ai là người giải đáp nếu tôi có câu hỏi trong quá trình thực hiện?",
          "Nếu muốn tạm dừng, tôi có thể trao đổi bằng cách nào?",
        ],
      },
      {
        heading: "Kết thúc bằng hướng dẫn có thể đọc lại",
        paragraphs: [
          "Phần cuối buổi trải nghiệm nên giúp bạn biết những thông tin nào cần lưu, câu hỏi nào còn mở và kênh liên hệ nào được dùng khi muốn làm rõ. Hãy xin hướng dẫn bằng hình thức có thể đọc lại nếu cần. Nếu nhiều người đưa ra các hướng dẫn khác nhau, hãy đề nghị xác nhận với người phụ trách thay vì tự chọn phần mình nhớ rõ nhất.",
          "Khi xem bất kỳ quy trình nào, điều hữu ích là bạn có thể giải thích lại bằng lời của mình: mình đang chọn nội dung gì, còn điều gì chưa rõ và cần hỏi ai trước bước tiếp theo.",
        ],
      },
    ],
  },
  {
    slug: "chon-dang-may-tu-so-thich-cua-ban",
    title: "Chọn dáng mày: bắt đầu từ sở thích của bạn",
    excerpt: "Một bức ảnh có thể gợi ý đường nét bạn thích. Cuộc trao đổi cần đi xa hơn hình mẫu để làm rõ lựa chọn, giới hạn và điều bạn muốn giữ lại.",
    category: "Mày và môi",
    readTime: "4 phút đọc",
    publishedAt: "2026-11-03",
    image: "/images/service-brows.webp",
    imageAlt: "Hình ảnh đường nét chân mày của người trưởng thành",
    author: "Ban biên tập AZ FACE",
    sections: [
      {
        heading: "Nói về chi tiết bạn thích",
        paragraphs: [
          "Khi lưu một hình dáng mày, bạn thường thích một vài chi tiết cụ thể: đường nét mềm, phần đầu nhẹ hay sắc độ gần với cách trang điểm hằng ngày. Hãy thử gọi tên những chi tiết ấy. Chúng giúp cuộc trao đổi rõ hơn một yêu cầu chung như “làm giống hình này”, bởi một bức ảnh còn có ánh sáng, góc chụp và nhiều yếu tố ngoài dáng mày.",
          "Bạn có thể chọn hai hoặc ba hình tham khảo rồi ghi chú ngắn cho mỗi hình. Không cần tìm một mẫu duy nhất đại diện cho toàn bộ sở thích. Những điều bạn không muốn thay đổi cũng đáng được nói ra ngay từ đầu, để cuộc trao đổi không chỉ xoay quanh phần có thể làm khác đi.",
        ],
      },
      {
        heading: "Đặt câu hỏi về lựa chọn, không chỉ tên kỹ thuật",
        paragraphs: [
          "Các tên gọi dịch vụ có thể khác giữa những nơi cung cấp. Thay vì mặc định hai tên gần nhau có cùng nội dung, hãy hỏi cách thực hiện được mô tả thế nào, ai phụ trách và những lưu ý nào cần biết. Nếu muốn xem trước kiểu dáng, bạn có thể hỏi cơ sở sử dụng hình thức nào và phần xem trước có giới hạn gì.",
          "Một bản vẽ hoặc hình minh họa giúp trao đổi ý tưởng nhưng không phải cam kết kết quả. Bạn vẫn cần làm rõ phạm vi, điều kiện điều chỉnh, chi phí và cách liên hệ sau dịch vụ. Những câu hỏi cá nhân hoặc liên quan đến can thiệp cần được người có chuyên môn phù hợp giải đáp, không dựa vào nội dung quảng cáo chung.",
        ],
      },
      {
        heading: "Giữ một ghi chú trước khi quyết định",
        paragraphs: [
          "Ghi lại lựa chọn bạn đang cân nhắc cùng những điều chưa được trả lời. Nếu có nhiều phương án, hãy so sánh trên cùng các mục thay vì chỉ nhìn tên gọi hoặc hình minh họa. Bạn không cần lựa chọn ngay trong lần trò chuyện đầu tiên khi còn thiếu thông tin quan trọng.",
        ],
        list: [
          "Chi tiết nào trong hình tham khảo khiến tôi thích?",
          "Điều gì trong diện mạo hiện tại tôi muốn giữ lại?",
          "Phạm vi thực hiện, người phụ trách và chi phí đã rõ chưa?",
          "Tôi đã hiểu giới hạn của hình xem trước và cách trao đổi tiếp chưa?",
        ],
      },
      {
        heading: "Không cần theo một khuôn mẫu chung",
        paragraphs: [
          "Sở thích có thể thay đổi theo thời gian và cách bạn trang điểm. Không có lý do để xem một xu hướng là tiêu chuẩn mà ai cũng cần theo. Hãy dùng hình ảnh tham khảo như điểm bắt đầu cho câu hỏi, không như khuôn mẫu phải đạt được.",
        ],
      },
    ],
  },
  {
    slug: "doc-hinh-anh-lam-dep-co-ngu-canh",
    title: "Xem hình ảnh làm đẹp cùng với ngữ cảnh",
    excerpt: "Ảnh minh họa, ảnh không gian và ảnh kết quả có vai trò khác nhau. Biết mình đang xem loại ảnh nào giúp bạn đặt kỳ vọng dựa trên thông tin đầy đủ hơn.",
    category: "Lựa chọn có thông tin",
    readTime: "4 phút đọc",
    publishedAt: "2026-11-03",
    image: "/images/service-brows.webp",
    imageAlt: "Hình ảnh chân dung người trưởng thành, không phải ảnh kết quả dịch vụ",
    author: "Ban biên tập AZ FACE",
    sections: [
      {
        heading: "Hỏi bức ảnh đang minh họa điều gì",
        paragraphs: [
          "Một bức ảnh đẹp có thể cho bạn cảm nhận về màu sắc, không gian hoặc phong cách mà một thương hiệu muốn giới thiệu. Nhưng mỗi vai trò cần được phân biệt. Ảnh minh họa không chứng minh cơ sở đã thực hiện một dịch vụ. Ảnh không gian không nói lên trình độ người phụ trách. Ảnh chân dung cũng không tự xác nhận người trong hình là nhân viên hoặc khách hàng.",
          "Khi xem một trang dịch vụ, hãy đọc chú thích và đoạn nội dung đặt cạnh ảnh. Nếu vai trò của hình chưa rõ, bạn có thể hỏi nguồn và mục đích sử dụng. Việc tìm thêm ngữ cảnh giúp bạn biết bức ảnh hỗ trợ quyết định ở điểm nào và thông tin nào vẫn cần được xác nhận bằng một nguồn khác.",
        ],
      },
      {
        heading: "Màu sắc và góc chụp không đứng riêng lẻ",
        paragraphs: [
          "Ánh sáng, góc máy, biểu cảm, trang điểm và xử lý ảnh đều có thể ảnh hưởng cách bạn nhìn màu sắc hoặc đường nét. Màn hình dùng để xem cũng có thể hiển thị khác nhau. Vì vậy, một màu môi trong ảnh không nên được xem như mẫu màu chính xác, và một góc chụp ấn tượng không đủ để diễn tả mọi khía cạnh của một diện mạo.",
          "Với nội dung được giới thiệu là ảnh kết quả, cần thêm thông tin về nguồn, thời điểm và điều kiện ghi nhận. Sự khác biệt giữa hai ảnh chưa tự giải thích nguyên nhân. Bạn nên hỏi những chi tiết còn thiếu trước khi suy ra một dịch vụ chắc chắn tạo ra cùng thay đổi cho mình.",
        ],
      },
      {
        heading: "Ba câu hỏi dễ giữ lại",
        paragraphs: [
          "Không cần trở thành người phân tích hình ảnh để xem nội dung cẩn thận hơn. Một vài câu hỏi nhất quán giúp bạn tránh đặt quá nhiều kỳ vọng vào ảnh và biết khi nào cần chuyển sang đọc mô tả hoặc trao đổi với người phụ trách.",
        ],
        list: [
          "Đây là ảnh minh họa, ảnh cơ sở, chân dung hay ảnh kết quả được giới thiệu?",
          "Chú thích đã cho biết nguồn và ngữ cảnh cần thiết chưa?",
          "Điều tôi muốn biết có thực sự được bức ảnh này chứng minh không?",
        ],
      },
      {
        heading: "Đọc hình ảnh cùng thông tin đi kèm",
        paragraphs: [
          "Khi xem một hình ảnh, hãy đọc cả chú thích và thông tin liên quan. Màu sắc hay phong cách có thể gợi mở sở thích, nhưng quyết định về dịch vụ vẫn cần dựa trên phạm vi, điều kiện và lời giải thích cụ thể từ người phụ trách.",
        ],
      },
    ],
  },
  {
    slug: "luu-gi-sau-buoi-tu-van",
    title: "Sau buổi tư vấn, nên lưu lại những thông tin nào?",
    excerpt: "Một ghi chú ngắn về phạm vi, chi phí và các câu hỏi còn mở giúp bạn đọc lại cuộc trao đổi và cân nhắc lựa chọn theo nhịp của mình.",
    category: "Chuẩn bị trước khi chọn",
    readTime: "4 phút đọc",
    publishedAt: "2026-11-03",
    image: "/images/service-care.webp",
    imageAlt: "Hình ảnh góc không gian chăm sóc với ánh sáng dịu",
    author: "Ban biên tập AZ FACE",
    sections: [
      {
        heading: "Giữ phần đã thống nhất và phần còn mở",
        paragraphs: [
          "Sau một cuộc trao đổi có nhiều thông tin, bạn có thể nhớ rõ tên dịch vụ nhưng quên điều kiện áp dụng hoặc câu hỏi chưa được giải đáp. Một ghi chú ngắn giúp tách hai phần: điều đã được xác nhận và điều vẫn cần hỏi thêm. Không cần ghi lại từng câu; hãy ưu tiên thông tin có ảnh hưởng tới lựa chọn của bạn.",
          "Phạm vi dịch vụ, thời lượng dự kiến, người phụ trách và chi phí là những mục nên có ngữ cảnh cụ thể. Nếu thông tin chỉ được trao đổi bằng miệng, bạn có thể đề nghị xác nhận lại qua kênh chính thức của cơ sở. Đừng tự xem phần mình suy đoán là điều hai bên đã thống nhất.",
        ],
      },
      {
        heading: "Đặt hướng dẫn đúng chỗ của nó",
        paragraphs: [
          "Hướng dẫn dành cho một người cụ thể cần được lưu cùng người đưa ra và thời điểm trao đổi. Một bài viết phổ thông có thể giúp đặt câu hỏi nhưng không tự thay thế hướng dẫn ấy. Nếu bạn nhận nhiều nội dung khác nhau, hãy hỏi lại người phụ trách thay vì kết hợp các đoạn theo cách riêng.",
          "Bạn cũng có thể hỏi kênh nào dùng cho câu hỏi sau buổi trao đổi và khoảng thời gian cơ sở tiếp nhận. Một nút chat hoặc tài khoản mạng xã hội chưa tự có nghĩa là có người trả lời ngay. Làm rõ cách liên hệ sẽ thực tế hơn việc suy ra khả năng hỗ trợ từ giao diện của website.",
        ],
      },
      {
        heading: "Một mẫu ghi chú đủ ngắn để dùng",
        paragraphs: [
          "Bạn có thể lưu ghi chú riêng trên thiết bị của mình và chỉ chia sẻ phần cần thiết qua kênh đã xác minh. Với dữ liệu cá nhân hoặc hình ảnh nhạy cảm, hãy hỏi mục đích sử dụng và cách lưu giữ trước khi gửi. Không cần đưa mọi thông tin vào một cuộc trò chuyện chỉ để hỏi thêm về phạm vi dịch vụ.",
        ],
        list: [
          "Lựa chọn đang cân nhắc và những phần đã bao gồm.",
          "Chi phí, điều kiện áp dụng và thông tin cần xác nhận lại.",
          "Người phụ trách, kênh liên hệ và thời gian tiếp nhận được thông báo.",
          "Hướng dẫn đã nhận và câu hỏi chưa được giải đáp.",
          "Điều kiện đổi lịch hoặc thay đổi lựa chọn nếu có.",
        ],
      },
      {
        heading: "Cho mình thời gian đọc lại",
        paragraphs: [
          "Khi đọc lại ghi chú, hãy kiểm tra mình đã hiểu lựa chọn đó gồm những gì và còn thiếu thông tin nào quan trọng. Bạn có thể tiếp tục hỏi hoặc dành thêm thời gian cân nhắc. Bạn có thể xem lại nội dung đã chuẩn bị và chỉnh sửa câu hỏi trước khi tiếp tục trao đổi.",
        ],
      },
    ],
  },
];
