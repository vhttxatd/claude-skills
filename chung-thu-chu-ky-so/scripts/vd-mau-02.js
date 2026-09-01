/**
 * scripts/vd-mau-02.js
 * VÍ DỤ HOÀN CHỈNH — Mẫu 02: cấp mới chứng thư chữ ký số chuyên dùng công vụ
 * CHO ĐƠN VỊ (Nhóm A — UBND xã An Thới Đông đăng ký lần đầu).
 *
 * Copy pattern này, đổi trichYeu/noiDung/nguoiKy theo Mẫu 01/04/05/06
 * (xem SKILL.md + data/mau-bieu-goc.md) khi soạn Nhóm B.
 */

const { mauCongVan } = require('/mnt/skills/user/the-thuc-van-ban/templates/templates/all');
const { taoBangDanhSach } = require('./tao-bang');
const { Packer } = require('docx');
const fs = require('fs');

const bangDanhSach = taoBangDanhSach(
  ['STT', 'Tên cơ quan, tổ chức', 'Địa chỉ', 'Mã số thuế', 'Mã quan hệ ngân sách', 'Tỉnh/Thành phố', 'Địa chỉ thư điện tử công vụ'],
  [
    [
      '01',
      'Ủy ban nhân dân xã An Thới Đông',
      '[cần bổ sung: địa chỉ trụ sở]',
      '[cần bổ sung]',
      '[cần bổ sung]',
      'Thành phố Hồ Chí Minh',
      '[cần bổ sung: email công vụ đơn vị]',
    ],
  ],
);

const doc = mauCongVan({
  trichYeu: 'đề nghị cấp chứng thư chữ ký số chuyên dùng công vụ cho cơ quan, tổ chức',
  kinhGui: ['Cục Chứng thực số và Bảo mật thông tin, Ban Cơ yếu Chính phủ'],
  noiDung: [
    '1. Thông tin người tiếp nhận thiết bị lưu khóa bí mật:',
    '- Họ và tên: Phan Trung Hiếu; Số định danh cá nhân: [cần bổ sung]; Ngày cấp: [cần bổ sung]; Nơi cấp: [cần bổ sung].',
    '- Chức vụ: Chuyên viên phụ trách KH&CN - CĐS; Số điện thoại di động: 0978 184 475; Địa chỉ thư điện tử công vụ: pthieu.atdong@tphcm.gov.vn.',
    '- Địa chỉ tiếp nhận: Trụ sở Ủy ban nhân dân xã An Thới Đông, [cần bổ sung địa chỉ cụ thể].',
    '2. Số lượng và danh sách đăng ký: 01 (một) cơ quan, tổ chức, gồm:',
    bangDanhSach,
    'Ủy ban nhân dân xã An Thới Đông kính đề nghị Cục Chứng thực số và Bảo mật thông tin xem xét, cấp chứng thư chữ ký số chuyên dùng công vụ cho cơ quan, tổ chức theo danh sách nêu trên.',
    'Trân trọng./.',
  ],
  nguoiKy: 'chuTich',
  tenDonViSoan: 'VHXH',
  noiNhan: [
    '- Như trên;',
    '- Lưu: VT, VHXH.',
  ],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('/mnt/user-data/outputs/CV-de-nghi-cap-moi-chungthu-donvi-UBNDxaAnThoiDong.docx', buf);
  console.log('Đã xuất file.');
});
