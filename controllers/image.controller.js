const Jimp = require('jimp');
const { removeVietnameseAccents } = require('../helpers/format.string');

module.exports = {
  batTu: async (req, res) => {
    const fullName = removeVietnameseAccents(req.body.fullName);

    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    // Đọc ảnh
    const buffer = Buffer.from(req.body.img, 'base64');
    const image = await Jimp.read(buffer);

    // Composite (kết hợp) lớp văn bản lên ảnh gốc
    // Tạo một lớp mới với màu nền trắng
    const textLayer = new Jimp(200, 110, 0xffffffff);
    image.composite(textLayer, 286, 10, {
      mode: Jimp.BLEND_DEST_OVER,
    });
    const textLayer2 = new Jimp(230, 25, 0xffffffff);
    image.composite(textLayer2, 180, 170, {
      mode: Jimp.BLEND_DEST_OVER,
    });
    const textLayer3 = new Jimp(1200, 35, 0xffffffff);
    image.composite(textLayer3, 20, 1210, {
      mode: Jimp.BLEND_DEST_OVER,
    });

    //đổi tên
    const textLayer4 = new Jimp(500, 35, 0xffffffff);
    textLayer4.print(font, 0, 0, fullName);
    image.composite(textLayer4, 900, 20, {
      mode: Jimp.BLEND_DEST_OVER,
    });

    // Ghi ảnh đã chỉnh sửa ra file mới
    // await image.writeAsync('xyz.png');
    // return res.send('1');
    // Chuyển đổi ảnh thành buffer
    const buffer1 = await image.getBufferAsync(Jimp.MIME_PNG);

    // Chuyển đổi buffer thành base64
    const base64Image = buffer1.toString('base64');

    // Trả về link ảnh base64
    return res.status(200).json({
      img: `data:image/png;base64,${base64Image}`,
    });
  },
  tuVi: async (req, res) => {
    const buffer = Buffer.from(req.body.img, 'base64');
    const image = await Jimp.read(buffer);
    const textLayer = new Jimp(200, 25, 0xfffefbf6);
    image.composite(textLayer, 260, 570);

    // Ghi ảnh đã chỉnh sửa ra file mới
    //   await image.writeAsync('tv2.png');
    // Chuyển đổi ảnh thành buffer
    const buffer1 = await image.getBufferAsync(Jimp.MIME_PNG);

    // Chuyển đổi buffer thành base64
    const base64Image = buffer1.toString('base64');

    // Trả về link ảnh base64
    return res.status(200).json({
      img: `data:image/png;base64,${base64Image}`,
    });
  },
};
