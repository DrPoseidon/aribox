const {Product, ColorModel, CommonImage, Size} = require('../db');
const uuid = require('uuid');
const {Op} = require('sequelize');

class ProductService {
  async getAllProducts() {
    try{
      return await Product.findAll({
        include: [
          {
            as: 'sizes',
            model: Size,
            required: false, // left join,
          },
          {
            as: 'colorModels',
            model: ColorModel,
            required: false,
          },
          {
            as: 'commonImages',
            model: CommonImage,
            required: false,
          }
        ],
      });
    } catch (e) {
      console.log(e)
    }
  }

  async getProductById(id) {
    try{
      return await Product.findByPk(id, {
        include: [
          {
            as: 'sizes',
            model: Size,
            required: false, // left join,
          },
          {
            as: 'colorModels',
            model: ColorModel,
            required: false,
          },
          {
            as: 'commonImages',
            model: CommonImage,
            required: false,
          }
        ],
      });
    } catch (e) {
      console.log(e)
    }
  }

  async updateProduct(id, key, value) {
    const product = await Product.findOne({where: {productid: id}});

    if(product) {
      await product.update({[key]: value});
      return {status: 200, data: {message: 'Данные обновлены'}};
    } else {
      return {status: 404, data: {message: 'Не найден товар с указанным id'}};
    }
  }

  async createProduct(name, mainimage, materials, description, price, discount) {
    const product = await Product.findOne({where: {'name': name}});

    if(!product){
      await Product.create({productid: uuid.v4(), name, mainimage, materials, description, price, discount});
      return {status: 200, data: {message: 'Товар успешно добавлен'}};
    } else{
      return {status: 400, data: {message: 'Товар с указанным названием уже существует'}};
    }
  }

  async deleteProduct(id) {
    const product = await Product.findByPk(id);

    if(product){
      await product.destroy();
      return {status: 200, data: {message: 'Товар успешно удален'}};
    } else{
      return {status: 400, data: {message: 'Не найден товар по указанному id'}};
    }
  }

  async findAdditionalInfoByProductId(id) {
    const colorModel = await ColorModel.findAll({where: {productid: id}});
    const commonImages = await CommonImage.findAll({where: {productid: id}});
    const sizes = await Size.findAll({where: {productid: id}});
    let cm = [];
    let ci = [];
    let s = [];

    if(colorModel.length) {
      cm = colorModel.reduce((acc, el) => {
        let {dataValues: {colormodelid, colorcode, image, colorname}} = el;
        acc.push({colorModelId: colormodelid, image, color: {name: colorname, code: colorcode}});

        return acc
      },[])
    }

    if(commonImages.length) {
      ci = commonImages.reduce((acc, el) => {
        let {dataValues: {commonimageid, url}} = el;
        acc.push({commonImageId: commonimageid, url});

        return acc
      },[])
    }

    if(sizes.length) {
      console.log(sizes)

      s = sizes.reduce((acc, el) => {
        let {dataValues: {sizeid, size}} = el;
        acc.push({sizeId: sizeid, value: size});

        return acc
      },[])
    }

    return {cm, ci, s}
  }
}

module.exports = new ProductService();
