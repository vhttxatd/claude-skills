/**
 * Tạo file docx "Thông báo về thời gian, địa điểm, nội dung sinh hoạt định kỳ"
 * Chi bộ Phòng Văn hóa - Xã hội, xã An Thới Đông.
 *
 * Nhân bản đúng thể thức từ file gốc 260703_TB15CBO_Thang_07-2026.docx
 * (văn bản Đảng — khác thể thức UBND: font Arial, không phải Times New Roman).
 *
 * Dùng: node generate.js '<JSON params>'
 * Hoặc require('./generate').taoThongBaoChiBo(params)
 */
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, VerticalAlign, AlignmentType, BorderStyle, HeadingLevel
} = require("docx");
const fs = require("fs");

const FONT = "Arial";

function r(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: 28, ...opts });
}

function noBorder() {
  const none = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  return { top: none, bottom: none, left: none, right: none };
}

function cell(children, widthDxa, opts = {}) {
  return new TableCell({
    width: { size: widthDxa, type: WidthType.DXA },
    verticalAlign: VerticalAlign.TOP,
    borders: noBorder(),
    children,
    ...opts,
  });
}

/**
 * params:
 *  so: "16"                       // số văn bản (không kèm "-TB/CB")
 *  ngay, thang, nam: "3","8","2026"   // ngày ban hành (An Thới Đông, ngày ... tháng ... năm ...)
 *  thangSinhHoat: "8"              // tháng ghi trong tiêu đề "định kỳ tháng X năm YYYY" (thường = thang)
 *  namSinhHoat: "2026"
 *  gio: "11", phut: "00"           // giờ họp, mặc định 11:00
 *  ngayHop, thangHop, namHop: "03","8","2026"  // ngày họp (thường = ngay/thang/nam ban hành)
 *  nguoiChuTri: "Nguyễn Văn Chính - Bí thư chi bộ"
 *  thoiSu, shtp, pheBinh: tên hiển thị đầy đủ (vd "Liên", "Kim Anh", "Thúy"...)
 *  previewNguoi: tên người dự kiến phụ trách SHTP + Phê bình kỳ họp SAU (hiển thị ở mục 11)
 *  biThu: {ho: "Nguyễn", ten: "Văn Chính"}   // người ký - mặc định Bí thư chi bộ
 */
function taoThongBaoChiBo(p) {
  const so = p.so;
  const { ngay, thang, nam } = p;
  const { ngayHop = ngay, thangHop = thang, namHop = nam } = p;
  const gio = p.gio || "11";
  const phut = p.phut || "00";
  const thangSinhHoat = p.thangSinhHoat || thangHop;
  const namSinhHoat = p.namSinhHoat || namHop;
  const thoiSu = p.thoiSu;
  const shtp = p.shtp;
  const pheBinh = p.pheBinh || shtp;
  const previewNguoi = p.previewNguoi;
  const biThuHo = (p.biThu && p.biThu.ho) || "Nguyễn";
  const biThuTen = (p.biThu && p.biThu.ten) || "Văn Chính";

  // ---- Bảng tiêu đề (quốc hiệu / cơ quan) ----
  const headerTable = new Table({
    width: { size: 10045, type: WidthType.DXA },
    columnWidths: [5068, 4977],
    borders: noBorder(),
    rows: [
      new TableRow({
        children: [
          cell([
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [r("ĐẢNG BỘ UỶ BAN NHÂN DÂN XÃ", { size: 28 })],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                r("CHI BỘ ", { bold: true, size: 26 }),
                r("PHÒNG VĂN HÓA - XÃ HỘI", { bold: true, size: 26 }),
              ],
            }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [r("*", { size: 28 })] }),
          ], 5068),
          cell([
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [r("ĐẢNG CỘNG SẢN VIỆT NAM", { bold: true, size: 28 })],
              border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000", space: 2 } },
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [r(`An Thới Đông, ngày ${ngay} tháng ${thang} năm ${nam}`, { italics: true, size: 26 })],
            }),
          ], 4977),
        ],
      }),
      new TableRow({
        children: [
          cell([
            new Paragraph({ alignment: AlignmentType.CENTER, children: [r(`Số: ${so}-TB/CB`, { size: 28 })] }),
          ], 5068),
          cell([new Paragraph({ children: [r("")] })], 4977),
        ],
      }),
    ],
  });

  // ---- Khối tiêu đề THÔNG BÁO ----
  const titleBlock = [
    new Paragraph({ children: [r("")] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [r("THÔNG BÁO", { bold: true, size: 28 })] }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        r("Về thời gian, địa điểm, nội dung sinh hoạt", { bold: true, size: 28 }),
        new TextRun({ break: 1 }),
        r(`định kỳ tháng ${thangSinhHoat} năm ${namSinhHoat}`, { bold: true, size: 28 }),
      ],
    }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [r("-----", { size: 28 })] }),
    new Paragraph({ children: [r("")] }),
  ];

  // ---- Đoạn nội dung dạng gạch đầu dòng ----
  function bullet(label, rest) {
    const children = [r("- ", {})];
    if (label) children.push(r(label, { bold: true }));
    if (rest) children.push(r(rest, {}));
    return new Paragraph({
      spacing: { before: 160, after: 160 },
      indent: { firstLine: 567 },
      alignment: AlignmentType.JUSTIFIED,
      children,
    });
  }

  function numbered(n, label, rest) {
    const children = [r(`${n}. `, { bold: true })];
    if (label) children.push(r(label, { bold: true }));
    if (rest) children.push(r(rest, {}));
    return new Paragraph({
      spacing: { before: 120, after: 120 },
      indent: { firstLine: 567 },
      alignment: AlignmentType.JUSTIFIED,
      children,
    });
  }

  function ketQuaBullet(text) {
    return new Paragraph({
      spacing: { before: 60, after: 60 },
      indent: { firstLine: 567 },
      alignment: AlignmentType.JUSTIFIED,
      children: [r(`- ${text}`, {})],
    });
  }

  function subAssignment(text, nguoi) {
    return new Paragraph({
      spacing: { before: 60, after: 60 },
      indent: { firstLine: 567 },
      alignment: AlignmentType.JUSTIFIED,
      children: [r(`+ ${text} `, {}), r(`(Đ/c ${nguoi}).`, { bold: true })],
    });
  }

  const body = [
    bullet("Thời gian: ", `${gio} giờ ${phut}, ngày ${ngayHop} tháng ${thangHop} năm ${namHop} (${thuTrongTuan(namHop, thangHop, ngayHop)}).`),
    bullet("Địa điểm: ", "Phòng họp - Phòng Văn hóa - Xã hội;"),
    new Paragraph({
      spacing: { before: 160, after: 160 },
      indent: { firstLine: 567 },
      alignment: AlignmentType.JUSTIFIED,
      children: [r("- Người chủ trì: Đồng chí ", {}), r(`${biThuHo} ${biThuTen} - Bí thư chi bộ.`, {})],
    }),
    new Paragraph({
      spacing: { before: 160, after: 160 },
      indent: { firstLine: 567 },
      alignment: AlignmentType.JUSTIFIED,
      children: [r("- Nội dung sinh hoạt, phân công thực hiện: ", {})],
    }),
    new Paragraph({ children: [r("")] }),

    numbered("1", "Thông tin tình hình thời sự: ", ""),
    subLine(`(Đ/c ${thoiSu}).`),
    numbered("2", "Phổ biến, quán triệt các văn bản ", "(Đ/c Chính)."),
    numbered("3", "Đánh giá tình hình tư tưởng của đảng viên, quần chúng thuộc phạm vi lãnh đạo của chi bộ ", "(Đ/c Chính)."),
    numbered("4", "Đánh giá kết quả thực hiện việc học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh gắn với thực hiện Kết luận số 21-KL/TW của Ban Chấp hành Trung ương Đảng khóa XIII ", "(Đ/c Kim Anh)."),
    numbered("5", "Sinh hoạt tác phẩm của Chủ tịch Hồ Chí Minh ", `(Đ/c ${shtp}).`),
    numbered("6", "Đánh giá kết quả thực hiện nhiệm vụ chính trị, công tác xây dựng chi bộ 06 tháng đầu năm " + namHop + " và phương hướng, nhiệm vụ 06 tháng cuối năm " + namHop + " ", "(Đ/c Chính)."),
    numbered("7", "Thực hiện tự phê bình và phê bình ", `(Đ/c ${pheBinh}).`),
    numbered("8", "Công tác quản lý đảng viên; ", "(Đ/c Như)."),
    numbered("9", "Giải quyết ý kiến, kiến nghị của đảng viên (nếu có) ", "(Đ/c Chính)."),
    numbered("10", "Các nội dung khác ", "(Đ/c Như)."),
    numbered("11", "Kết thúc sinh hoạt ", "(Đ/c Chính):"),
    ketQuaBullet("Đánh giá kết quả thực hiện kết luận của chi bộ tháng trước."),
    ketQuaBullet("Kết luận những nội dung trọng tâm của cuộc họp"),
    ketQuaBullet("Biểu dương, nhắc nhở, phê bình đảng viên"),
    ketQuaBullet("Phân công nhiệm vụ:"),
    subAssignment("Thực hiện tự phê bình và phê bình", previewNguoi),
    subAssignment("Sinh hoạt tác phẩm của Chủ tịch Hồ Chí Minh", previewNguoi),
    ketQuaBullet("Đánh giá chất lượng buổi sinh hoạt."),
    numbered("12", "Biểu quyết, thông qua kết luận.", ""),
    new Paragraph({ children: [r("")] }),
  ];

  function subLine(text) {
    return new Paragraph({
      spacing: { before: 0, after: 60 },
      indent: { firstLine: 567 },
      alignment: AlignmentType.JUSTIFIED,
      children: [r(text, { bold: true })],
    });
  }

  // ---- Bảng nơi nhận / chữ ký ----
  const signTable = new Table({
    width: { size: 9288, type: WidthType.DXA },
    columnWidths: [4077, 5211],
    borders: noBorder(),
    rows: [
      new TableRow({
        children: [
          cell([
            new Paragraph({ children: [r("Nơi nhận", { underline: {} }), r(":")] }),
            new Paragraph({ children: [r("- Đảng viên chi bộ,", { size: 22 })] }),
            new Paragraph({ children: [r("- Lưu.", { size: 22 })] }),
          ], 4077),
          cell([
            new Paragraph({ alignment: AlignmentType.CENTER, children: [r("T/M CHI BỘ", { bold: true, size: 28 })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [r("BÍ THƯ", { size: 28 })] }),
            new Paragraph({ children: [r("")] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [r("(Đã ký)", { size: 28 })] }),
            new Paragraph({ children: [r("")] }),
            new Paragraph({ children: [r("")] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [r(`${biThuHo} ${biThuTen}`, { bold: true, size: 28 })] }),
          ], 5211),
        ],
      }),
    ],
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: 11907, height: 16840 },
            margin: { top: 1134, bottom: 1134, left: 1701, right: 1134, header: 720, footer: 28 },
          },
        },
        children: [headerTable, ...titleBlock, ...body, signTable],
      },
    ],
  });

  return doc;
}

function thuTrongTuan(nam, thang, ngay) {
  const d = new Date(Number(nam), Number(thang) - 1, Number(ngay));
  const ten = ["chủ nhật", "thứ hai", "thứ ba", "thứ tư", "thứ năm", "thứ sáu", "thứ bảy"];
  return ten[d.getDay()];
}

module.exports = { taoThongBaoChiBo };

// Chạy trực tiếp: node generate.js params.json out.docx
if (require.main === module) {
  const paramsPath = process.argv[2];
  const outPath = process.argv[3] || "output.docx";
  const params = JSON.parse(fs.readFileSync(paramsPath, "utf-8"));
  const doc = taoThongBaoChiBo(params);
  Packer.toBuffer(doc).then((buf) => {
    fs.writeFileSync(outPath, buf);
    console.log("Đã tạo:", outPath);
  });
}
