function getAge(ngay, thang, nam) {
  // Lấy ngày hiện tại
  var ngayHienTai = new Date();

  // Tạo đối tượng Date từ thông tin ngày sinh
  var ngaySinh = new Date(nam, thang - 1, ngay);

  // Tính toán số tuổi
  var soTuoi = ngayHienTai.getFullYear() - ngaySinh.getFullYear();

  // Kiểm tra xem đã qua sinh nhật chưa trong năm nay
  if (
    ngayHienTai.getMonth() < ngaySinh.getMonth() ||
    (ngayHienTai.getMonth() === ngaySinh.getMonth() &&
      ngayHienTai.getDate() < ngaySinh.getDate())
  ) {
    soTuoi--;
  }

  return soTuoi;
}

module.exports = { getAge };
