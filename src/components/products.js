const products = [
  {
    id: 1,
    name: 'Blue Cinderella costume',
    price: 30.99,
    seller: 'Marita',
    quantity: 10,
    // description: 'Please provide Height, Bust, and Waist measurements here.',
    imageUrl:
      'https://i.etsystatic.com/35921629/r/il/8a99f2/4076594148/il_fullxfull.4076594148_flf7.jpg',
  },
  {
    id: 2,
    name: 'School BackPacks',
    price: 15.99,
    seller: 'Dalton',
    quantity: 1,
    // description: 'Aursear School Bags for Girls, Children School Backpacks Girls Bookbag Gifts, Pink',
    imageUrl:
      'https://i5.walmartimages.com/asr/3620cdc6-f47b-4261-ae39-46a323ab6f3b.928c8b9779af0a69bd2fa3de6181ee2a.jpeg?odnHeight=784&odnWidth=580&odnBg=FFFFFF',
  },

  {
    id: 3,
    name: 'Nike Air Jordan Shoes',
    price: 20.99,
    seller: 'Edwin',

    quantity: 15,
    // description: 'Nike Air Jordan Shoes, Model Number: NAJ13, Size: 7-10',
    imageUrl:
      'https://ae01.alicdn.com/kf/HTB19tBuXPgy_uJjSZKzq6z_jXXa2/HOT-Fashion-Women-Girls-Loose-Solid-Jumpsuit-Strap-Dungaree-Harem-Trousers-Ladies-Overall-Pants-Casual-Playsuits.jpg_Q90.jpg_.webp',
  },
  {
    id: 4,
    name: 'Girls Loose Solid Jumpsuit Strap Dungaree',
    price: 15.5,
    seller: 'Valentin',
    quantity: 30,
    // description: 'This is an elegant classic color fabric with fashion design jumpsuit. A wonderful loose jumpsuit  Very suitable for daily wearing and any other casual occasions or party.',
    imageUrl:
      'https://5.imimg.com/data5/EQ/VC/YE/SELLER-17552598/adidas-future-craft-500x500.jpeg',
  },
  {
    id: 5,
    name: 'Apple Mac Book Air',
    price: 8500.99,
    seller: 'Zeden',
    quantity: 100,
    // description: ' A 13-inch MacBook Air with Apple’s M1 processor. It is fast enough for the things most people use a computer for—web browsing, working on documents, coding, and light photo and video editing',
    imageUrl:
      'https://kenyaprice.com/wp-content/uploads/2017/07/Apple-MacBook-Prices-List-in-Kenya-.jpg',
  },
  {
    id: 6,
    name: 'Apple iPhone 14 Pro max',
    price: 2000.5,
    seller: 'Olivier',
    quantity: 50,
    // description: 'iPhone 14 Pro Max features a screen display of 6.7 inches LTPO Super Retina XDR OLED, screen, and 1290 x 2796 pixels resolution.',
    imageUrl:
      'data:image/jpeg;base64,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',
  },
  {
    id: 7,
    name: 'Kitenge Design',
    price: 14.99,
    seller: 'Benja',
    quantity: 40,
    // description: 'African Kitenge dress designs and Kitenge fashion for men and women',
    imageUrl:
      'https://image.winudf.com/v2/image1/Y29tLmxhdGVzdC5raXRlbmdlLmZhc2hpb25fc2NyZWVuXzZfMTYxNzMxMDE0Ml8wMjM/screen-6.jpg?fakeurl=1&type=.jpg',
  },
  {
    id: 8,
    name: 'Men official Suits',
    price: 150.99,
    seller: 'Patience',
    quantity: 60,
    // description: 'well-designed and tailored suit for men not only makes them feel comfortable but also looks more confident',
    imageUrl:
      'https://m.economictimes.com/thumb/msid-95280107,width-1280,height-720,resizemode-4,imgsize-84720/maxresdefault.jpg',
  },
];

export default products;
