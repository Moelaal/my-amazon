import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'abdelaal',
      email: 'mo@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'said',
      email: 'ss@gmail.com',
      password: bcrypt.hashSync('12345678'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'grey shirt',
      image:
        'https://simages.ericdress.com/Upload/Image/2016/08/watermark/aeee01ce-578c-43cd-9dc4-b7512edadd11.jpg',
      slug: 'rtx',
      price: 700,
      countInStock: 45,
      brand: 'Nike',
      rating: 4.2,
      numReviews: 75,
      description: 'Good product to use',
    },
    {
      // _id: '2',
      name: 'nice shirt',
      image:
        'https://i.pinimg.com/736x/d4/a7/9e/d4a79e9ddb2ff7920ad72944b892ad08--cheap-mens-shirts-shirts-for-men.jpg',
      slug: 'gucci',
      price: 250,
      countInStock: 11,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 34,
      description: 'Good product to use',
    },
    {
      // _id: '3',
      name: 'red shirt',
      image:
        'https://www-s.mlo.me/upen/v/2017/201708/20170825/201708251341544703432.jpg',
      slug: 'mrx',
      price: 300,
      countInStock: 0,
      brand: 'Adidas',
      rating: 3.2,
      numReviews: 15,
      description: 'not good product to use',
    },
    {
      // _id: '4',
      name: 'shirt polo',
      image:
        'https://avatars.mds.yandex.net/i?id=2a0000017a066df5c8960ff31fc6bc4d394b-2462069-images-thumbs&n=13&exp=1',
      slug: 'adidas',
      price: 120,
      countInStock: 45,
      brand: 'Nike',
      rating: 4.9,
      numReviews: 80,
      description: 'excellent product to use',
    },
  ],
};

export default data;
