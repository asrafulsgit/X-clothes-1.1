
// mens categoris =>101120
//                  shirt-101,
//                  t-shirt-102,
//                  pants-103,
//                  short+pants-104,
//                  panjabi-105,
//                  jerseys-106,

//winter mens=>102130
//             sweater-120
//             hoodie-121
//             blazer-122
//             jacket-123

// womens categoris => 201230
//                     saree-201,
//                     shalwarKamiz-202,
//                     kurta-203,
//                     pants-204,
//                     hijab-205, 
//                     t-shirt-206,
//                     tops-207,
//                     three-piece-208
//                     two-piece-209,
//                     dresses-210,
//                     shrugs-211,
//                     ponchos-212,

// womens winter=>  230240                  
//                  Poncho-231,
//                  Sweater-232,
//                  Jacket-233,
//                  hoodie-234,
//                  Blazer-235,

//kids categories => boys => 301320
                      //     shirts -301
                      //     t-shirts-302
                      //     panjabi-303
                      //     pants-304

     // =>boys winter => 330340
                    //Sweater-331
                    //Hoodie-332
                    //Jacket-333

//  girls =>401420          
                     //   three-piece -401
                      //     two-piece-402
                      //     tops-403
                      //     t-shirts-404
                      //     gowns-405
                      //     frocks-406

//  girls winter => 420440
                    //Sweater-421
                    //Hoodie-422
                    //Jacket-423

export const categories = [
                         {name : 'mens', category : '101120'},
                         {name : 'Mens winter', category : '120130'},
                         {name : 'womens', category : '201230'},
                         {name : 'womens winter', category : '230240'},
                         {name : 'boys', category : '301320'},
                         {name : 'boys winter', category : '330340'},
                         {name : 'girls', category : '401420'},
                         {name : 'girls winter', category : '420440'},
                         {name : 'kids', category : '301401'},
                         {name : 'winter',category : '12233342'}
]

export const subCategories = [
                         {name : 'mens-shirt', category : '101'},
                         {name : 'mens-t-shirt', category : '102'},
                         {name : 'mens-pants', category : '103'},
                         {name : 'mens-panjabi', category : '104'},
                         {name : 'mens-short+pants', category : '105'},
                         {name : 'mens-jerseys', category : '106'},
                         {name : 'mens-winter-sweater', category : '120'},
                         {name : 'mens-winter-hoodie', category : '121'},
                         {name : 'mens-winter-blazer', category : '122'},
                         {name : 'mens-winter-jacket', category : '123'},
                         {name : 'womens-saree', category : '201'},
                         {name : 'womens-shalwarKamiz', category : '202'},
                         {name : 'womens-kurta', category : '203'},
                         {name : 'womens-pants', category : '204'},
                         {name : 'womens-hijab', category : '205'},
                         {name : 'womens-t-shirt', category : '206'},
                         {name : 'womens-three-piece', category : '208'},
                         {name : 'womens-two-piece', category : '209'},
                         {name : 'womens-dresses', category : '210'},
                         {name : 'womens-shrugs', category : '211'},
                         {name : 'womens-ponchos', category : '212'},
                         {name : 'womens-winter-Poncho', category : '231'},
                         {name : 'womens-winter-Sweater', category : '232'},
                         {name : 'womens-winter-Jacket', category : '233'},
                         {name : 'womens-winter-hoodie', category : '234'},
                         {name : 'womens-winter-Blazer', category : '235'},
                         {name : 'boys-shirts', category : '301'},
                         {name : 'boys-t-shirts', category : '302'},
                         {name : 'boys-panjabi', category : '303'},
                         {name : 'boys-pants', category : '304'},
                         {name : 'boys-winter-Sweater', category : '331'},
                         {name : 'boys-winter-Hoodie', category : '332'},
                         {name : 'boys-winter-Jacket', category : '333'},
                         {name : 'girls-three-piece', category : '401'},
                         {name : 'girls-two-piece', category : '402'},
                         {name : 'girls-tops', category : '403'},
                         {name : 'girls-t-shirts', category : '404'},
                         {name : 'girls-gowns', category : '405'},
                         {name : 'girls-frocks', category : '406'},
                         {name : 'girls-winter-Sweater', category : '421'},
                         {name : 'girls-winter-Hoodie', category : '422'},
                         {name : 'girls-winter-Jacket', category : '423'},
]

export const  navLinksData =[
    {
      name : 'Winter',
      hover : 'winter',
      path : '/winter/12233342',
      categories: ['102130','230240','330340','420440']
    },
    {
      name : `Men's`,
      hover : 'mens',
      path : '/men/101120',
      categories: ['101120']
    },
    {
      name : `Women's`,
      hover : 'womens',
      path : '/women/201230',
      categories: ['201230']
    },
    {
      name : `Kid's`,
      hover : 'kids',
      path : '/kids/301401',
      categories: ['301320','401420']
    }
  ]

  export const winterNavData ={
     winterMens : [
               {
                 name : 'Sweater',
                 subcategory : '120',
               },
               {
                 name : 'Hoodie',
                 subcategory : '121'
               },
               {
                 name : 'Blazer',
                 subcategory : '122'
               },
               {
                 name : 'Jacket',
                 subcategory : '123'
               }
              
     ],
     winterWomens : [
             {
               name : 'Poncho',
               subcategory : '231'
             },
             {
               name : 'Sweater',
               subcategory : '232'
             },
             {
               name : 'Jacket',
               subcategory : '233'
             },
             {
               name : 'Hoodie',
               subcategory : '234'
             },
             {
               name : 'Blazer',
               subcategory : '235'
             },
     ],
     winterBoys : [
           {
             name : 'Sweater',
             subcategory : '331'
           },
           {
             name : 'Hoodie',
             subcategory : '332'
           },
           {
             name : 'Jacket',
             subcategory : '333'
           },
     ],
     winterGirls : [
           {
             name :'Sweater',
             subcategory : '421' 
           },
           {
             name :'Hoodie',
             subcategory : '422' 
           },
           {
             name :'Jacket',
             subcategory : '423' 
           }
     ]
  }

  export const womensNavData =[
     {
       subcategory : '201',
       name : 'Saree'
     },
     {
       subcategory : '202',
       name : 'Shalwar-Kamiz'
     },
     {
       subcategory : '203',
       name : 'Kurta'
     },
     {
       subcategory : '209',
       name : 'Three-Piece'
     },
     {
       subcategory : '210',
       name : 'Two-Piece'
     },
     {
       subcategory : '211',
       name : 'Dresses'
     },
     {
       subcategory : '212',
       name : 'Shrugs'
     },
     {
       subcategory : '213',
       name : 'Ponchos'
     },
     {
       subcategory : '204',
       name : 'Pants'
     },
     {
       subcategory : '205',
       name : 'Hijab'
     },
     {
       subcategory : '206',
       name : 'Hudi'
     },
     {
       subcategory : '207',
       name : 'T-Shirt'
     },
     {
       subcategory : '208',
       name : 'Tops'
     },
   ]

  export const kidsNavData = {
     boysNavData :[
          {name : 'Shirts', subcategory : '301'},
          {name : 'T-shirts', subcategory : '302'},
          {name : 'Pants', subcategory : '304'},
          {name : 'Panjabi', subcategory : '303'}
        ],
        girlsNavData :[
          {name : 'Three-piece', subcategory : '401'},
          {name : 'Two-piece', subcategory : '402'},
          {name : 'Tops', subcategory : '403'},
          {name : 'T-shirts', subcategory : '404'},
          {name : 'Gowns', subcategory : '405'},
          {name : 'Frocks', subcategory : '406'},
    ]
  }

export const   mensNavData =[
     {
       id : 101,
       name : 'Shirt',
       category : '101'
     },
     {
       id : 102,
       name : 'T-Shirt',
        category : '102'
     },
     {
       id : 106,
       name : 'Pangabi',
       category : '105'
     },
     {
       id : 103,
       name : 'Pants',
       category :'103'
     },
     {
       id : 104,
       name : 'Short-Pants',
       category : '104'
     },
     {
       id : 105,
       name : 'Jerseys',
       category : '106'
     },
   ]

export   const bangladeshZilas = [
    "Bagerhat", "Bandarban", "Barguna", "Barisal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur",
    "Chapai Nawabganj", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur",
    "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore",
    "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram",
    "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur",
    "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi",
    "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali",
    "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur",
    "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
  ];

export const bangladeshUpazila = [
    {
      zila: "Bagerhat",
      upazilas: ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sharankhola"]
    },
    {
      zila: "Bandarban",
      upazilas: ["Ali Kadam", "Bandarban Sadar", "Lama", "Naikhongchhari", "Rowangchhari", "Ruma", "Thanchi"]
    },
    {
      zila: "Barguna",
      upazilas: ["Amtali", "Bamna", "Barguna Sadar", "Betagi", "Patharghata", "Taltali"]
    },
    {
      zila: "Barisal",
      upazilas: ["Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Gaurnadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"]
    },
    {
      zila: "Bhola",
      upazilas: ["Bhola Sadar", "Borhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"]
    },
    {
      zila: "Bogura",
      upazilas: ["Adamdighi", "Bogura Sadar", "Dhunat", "Dupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Shajahanpur", "Sherpur", "Shibganj", "Sonatala"]
    },
    {
      zila: "Brahmanbaria",
      upazilas: ["Ashuganj", "Bancharampur", "Bijoynagar", "Brahmanbaria Sadar", "Kasba", "Nabinagar", "Nasirnagar", "Sarail"]
    },
    {
      zila: "Chandpur",
      upazilas: ["Chandpur Sadar", "Faridganj", "Haimchar", "Haziganj", "Kachua", "Matlab North", "Matlab South", "Shahrasti"]
    },
    {
      zila: "Chattogram",
      upazilas: ["Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari", "Hathazari", "Lohagara", "Mirsharai", "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda"]
    },
    {
      zila: "Chuadanga",
      upazilas: ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"]
    },
    {
      zila: "Cox's Bazar",
      upazilas: ["Chakaria", "Cox's Bazar Sadar", "Kutubdia", "Maheshkhali", "Pekua", "Ramu", "Teknaf", "Ukhia"]
    },
    {
      zila: "Cumilla",
      upazilas: ["Barura", "Brahmanpara", "Burichang", "Cumilla Sadar", "Cumilla Sadar Dakshin", "Daudkandi", "Debidwar", "Homna", "Laksam", "Meghna", "Monohorgonj", "Muradnagar", "Nangalkot", "Titas"]
    },
    {
      zila: "Dhaka",
      upazilas: ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar"]
    },
    {
      zila: "Dinajpur",
      upazilas: ["Birampur", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Dinajpur Sadar", "Fulbari", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur"]
    },
    {
      zila: "Faridpur",
      upazilas: ["Alfadanga", "Bhanga", "Boalmari", "Charbhadrasan", "Faridpur Sadar", "Madhukhali", "Nagarkanda", "Sadarpur", "Saltha"]
    },
    {
      zila: "Feni",
      upazilas: ["Chhagalnaiya", "Daganbhuiyan", "Feni Sadar", "Parshuram", "Sonagazi"]
    },
    {
      zila: "Gazipur",
      upazilas: ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"]
    },
    {
      zila: "Gopalganj",
      upazilas: ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"]
    },
    {
      zila: "Habiganj",
      upazilas: ["Ajmiriganj", "Bahubal", "Baniachong", "Chunarughat", "Habiganj Sadar", "Lakhai", "Madhabpur", "Nabiganj", "Shaistaganj"]
    },
    {
      zila: "Jamalpur",
      upazilas: ["Bakshiganj", "Dewanganj", "Islampur", "Jamalpur Sadar", "Madarganj", "Melandaha", "Sarishabari"]
    },
    {
      zila: "Jashore",
      upazilas: ["Abhaynagar", "Bagherpara", "Chaugachha", "Jashore Sadar", "Jhikargachha", "Keshabpur", "Manirampur", "Sharsha"]
    },
    {
      zila: "Khulna",
      upazilas: ["Batiaghata", "Dacope", "Dighalia", "Dumuria", "Koyra", "Paikgachha", "Phultala", "Rupsa", "Terokhada"]
    },
    {
      zila: "Mymensingh",
      upazilas: ["Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Mymensingh Sadar", "Nandail", "Phulpur", "Trishal"]
    },
    {
      zila: "Rangpur",
      upazilas: ["Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgacha", "Pirganj", "Rangpur Sadar", "Taraganj"]
    },
    {
      zila: "Sylhet",
      upazilas: ["Balaganj", "Beanibazar", "Bishwanath", "Companiganj", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Zakiganj"]
    },
    {
      zila: "Thakurgaon",
      upazilas: ["Baliadangi", "Haripur", "Pirganj", "Ranisankail", "Thakurgaon Sadar"]
    }
  ];
  
  
  
export const divisions = ["Barisal", "Chittagong", "Dhaka", "Khulna", "Mymensingh", "Rajshahi", "Rangpur", "Sylhet"];

