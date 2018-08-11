const locations = [
  {
    id: 1,
    shortName: 'Angelus Oaks',
    slug: 'angelus-oaks-california',
    bgImg: 'https://nciw.s3.amazonaws.com/discovernci_media/AngelusOaksBg.jpg'
  },
  {
    id: 2,
    shortName: 'Ben Lomond',
    slug: 'ben-lomond-california',
    bgImg: 'https://nciw.s3.amazonaws.com/discovernci_media/NapaCaliforniaBg3.jpg'
  },
  {
    id: 3,
    shortName: 'Bruceville',
    slug: 'bruceville-texas',
    bgImg: 'https://nciw.s3.amazonaws.com/discovernci_media/BrucevilleTexasBg.jpg'
  },
  {
    id: 4,
    shortName: 'New Ulm',
    slug: 'new-ulm-texas',
    bgImg: 'https://nciw.s3.amazonaws.com/discovernci_media/newulm-bg.jpg'
  },
  {
    id: 5,
    shortName: 'Lake Geneva',
    slug: 'lake-geneva-wisconsin',
    bgImg: 'https://nciw.s3.amazonaws.com/discovernci_media/bg3.jpg'
  },
  {
    id: 6,
    shortName: 'Mukwonago Montessori',
    slug: 'mukwonago-wisconsin-montessori',
    bgImg: 'https://nciw.s3.amazonaws.com/discovernci_media/bg3.jpg'
  }
];

const facultyStaffList = [
  { id: 1,
    name: 'Jennifer Braun',
    image: '//nciw.s3.amazonaws.com/discovernci_media/JenniferBraun.jpg',
    locations: [5, 6],
    rank: 2,
    primaryContactFor: [5, 6],
    slug: 'jennifer-braun'
  },
  { id: 2,
    name: 'Austin Wood',
    title: 'Returning Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/AustinWood.jpg',
    slug: 'austin-wood',
    locations: [1, 2, 3, 4],
    rank: 4,
    bio: 'Austin comes to us from Plymouth, England. This is his second year with us at NCI. He will be the one singing the camp songs! He strives to ensure every attendee has as much fun as possible, while learning of course.'
  },
  { id: 3,
    name: 'Joseph (Joe) Alvarado',
    title: 'Environmental Instructors',
    image: '//nciw.s3.amazonaws.com/discovernci_media/JosephAlvarado.jpg',
    slug: 'joseph-alvarado',
    locations: [1, 2, 3, 4],
    rank: 4,
    bio: "Hi my name is Joe and  this will be my first year at NC. I am from Kentucky (GO CATS) where I graduated from Lindsey Wilson College with Bachelor of Arts in history. My life motto is: When you're having a bad day, just eat a S'more, they fix everything. This year is going to be fantastic and I cannot wait to begin my new journey with NC."
  },
  { id: 4,
    name: 'Jordan Kendall',
    title: 'Environmental Instructors',
    image: '//nciw.s3.amazonaws.com/discovernci_media/JordanKendall.jpg',
    slug: 'jordan-kendall',
    locations: [1, 2, 3, 4],
    rank: 7,
    bio: 'My name is Jordan Kendall I graduated from Lindsey Wilson college in Kentucky where I played soccer for 4 years with my bachelors in business administration. I am now currently taking online courses at the same school to attain my Masters in business admin. I love sports and superheroes. Especially batman.'
  },
  { id: 5,
    name: 'Louise Twomey',
    title: 'Environmental Instructors',
    image: '//nciw.s3.amazonaws.com/discovernci_media/LouiseTwomey.jpg',
    slug: 'louise-twomey',
    locations: [1, 2, 3, 4],
    rank: 7,
    bio: "I'm Louise from Plymouth, UK! I have a background in Psychology, graduating from Keele University in 2015 with a Psychology with Criminology degree and since then I've taught and mentored in various places including England, Sri Lanka and most recently at a kindergarten in China. I love anything outdoors, especially if it has water involved. My favorite sports include kayaking, skiing and taking long hikes to places I've never been before. I love teaching in warmer climates and that's how I've ended up in sunny Texas."
  },
  { id: 6,
    name: 'Geoffrey E. Bishop',
    title: 'Executive Director',
    image: '//nciw.s3.amazonaws.com/discovernci_media/GeoffreyBishop.jpg',
    slug: 'geoffrey-bishop',
    locations: [1, 2, 3, 4, 5, 6],
    rank: 0,
    primaryContactFor: [],
    bio: "Geoffrey E. Bishop, hails from the bush in North West NSW, Australia. After his childhood spent on his family's sheep station he went to an agricultural boarding school for five years, and then to University in both Sydney and Melbourne where he studied Horticulture and Landscape Architecture. <br /><br /> For the next 10 years he traveled the world, visiting over 80 countries, where he spent most of his time trekking in rural areas, learning cultures and understanding his place in the world.<br /><br /> In 1996 Geoffrey started Nature&apos;s Classroom Institute of Wisconsin, Inc. NCI is a residential environmental education program serving schools throughout the Midwest. The Nature&apos;s Classroom Institute program helps students understand the natural environment, participate in ecosystem exploration and study, and work together with their peers and teachers as a community. The program includes activities such as confidence-building, group challenges, historical simulations, scientific explorations, and many more hands-on academic lessons. <br /><br /> After developing a strong academic and environmental outdoor based curriculum, he formed Nature&apos;s Classroom Montessori School that blends the core philosophy of Montessori with his environmental principles. The past Board Chair of the Wisconsin Association of Environmental Education (WAEE), he has been honored by WAEE as Wisconsin Non-Formal Educator of the Year. <br /><br /> Nature&apos;s Classroom is on 400 acres in the small rural community of Mukwonago, Wisconsin.  Geoffrey's passionate and sustained focus over the past 15 years has been on organics and sustainability in schools while promoting getting children back outdoors and helping adults understand the importance of instinctive play in the natural world."
  },
  { id: 7,
    name: 'Mirko Sever',
    title: 'Director of Outreach',
    image: '//nciw.s3.amazonaws.com/discovernci_media/MirkoSever.jpg',
    slug: 'mirko-sever',
    locations: [1, 2, 3, 4],
    primaryContactFor: [1, 2, 3, 4],
    rank: 1,
    bio: 'Mirko Sever is the Director of Outreach - California for Nature&apos;s Classroom Institute. Mirko will be leading the sales, marketing, and development of the EE program in California. Mirko grew up in a Serbian family and  received a Master’s degree in Accounting and Finance from  University of Wisconsin - Milwaukee. In his free time Mirko works with a number of nonprofits and volunteers with a local hospice organization visiting patients. Mirko is excited to take on the adventure and expand NCI&apos;s teachings and values to students in California.'
  },
  { id: 17,
    locations: [1, 2, 3, 4],
    name: 'Britta Casey',
    title: 'Education Director',
    image: '//nciw.s3.amazonaws.com/discovernci_media/BrittaCasey.jpeg',
    slug: 'britta-casey',
    rank: 3,
    bio: 'Although my passion for nature began as a child, I started my career in the environmental field after graduating with a degree in Environmental Sustainability. My love of the outdoors, education and adventure has led me to take jobs in Australia, Europe and back in my home state of Texas. If I had a spare moment you would find me camping, road tripping, or attempting to play the banjo. I love to discover, whether it be through mountain trails or between the pages of a book.'
  },
  { id: 8,
    locations: [5],
    name: 'Kristen Mehl',
    title: 'Director of Education',
    image: '//nciw.s3.amazonaws.com/discovernci_media/KristenMehl.jpeg',
    slug: 'kristen-mehl',
    rank: 3,
    bio: "Kristen Mehl hails from the great mitten state of Michigan where she grew up running around outdoors with her father and brother. She was inspired to become a teacher as an elementary student, and even studied early childhood education in college at the University of Michigan. After taking a leap a leap of faith and packing up three months worth of belongings, she moved to North Carolina to start a series of internships that would lead her to Nature's Classroom. She started as an instructor for the 2015-2016 school year, returned last season to help transplant NCI from Mukwonago to Lake Geneva as co-director, and is happily returning as director of education. She was inspired by children from all over the country to continue her work as an environmental educator after watching many become so enthralled with the world around them. This summer, Kristen spent a month traveling the country and is excited to bring back some of her knowledge in the form of Stump the Staff questions. When she's not working, she can be found calling for owls in Big Foot Beach State Park, watercolor painting, singing along to the musical Hamilton or watching Harry Potter."
  },
  {
    id: 9,
    locations: [5],
    name: 'Hayley Trzinkski',
    title: 'Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/HayleyTrzinkski.jpg',
    slug: 'hayley-trzinkski',
    rank: 10,
    bio: 'Hayley is originally from Wisconsin Rapids, Wisconsin where she graduated from the University of Wisconsin, Stevens Point with degrees in Wildlife Ecology and Biology. This summer she worked at Upham Woods Outdoor Learning Center as a teaching naturalist and is excited to continue teaching environmental education at NCI as a newcomer on staff this season. Hayley likes to go on adventures, sing, and do art projects in her spare time.'
  },
  {
    id: 10,
    locations: [5],
    name: 'Corie Walton',
    title: 'Returning Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/CorieWalton.jpg',
    slug: 'corie-walton',
    rank: 11,
    bio: "Corie grew up in Indianapolis, Indiana and graduated in 2016 from a small school south of Indy called Franklin College. She has a Biology degree and a Spanish minor and dreams of a day when she can teach the natural sciences in Spanish. Corie joined the Nature's Classroom family in the Spring of 2017 and had an unforgettable experience teaching for the first time so she decided to come back this fall. Corie loves Lake Geneva, Wisconsin so much that she spent her summer working for Lake Geneva Youth Camp; the Christian summer camp that NCI rents during the school year. Her enthusiastic attitude makes her a perfect fit for inspiring kids to care about and become more aware of the world around them.  Corie is most at home surrounded by a group of people she loves, but you can also find her playing golf, watching Disney movies, or enjoying a hot beverage while under a blanket."
  },
  {
    id: 11,
    name: 'Chelsea Jandreau',
    title: 'Assistant Director of Education',
    image: '//nciw.s3.amazonaws.com/discovernci_media/ChelseaJandreau.jpg',
    slug: 'chelsea-jandreau',
    locations: [5],
    rank: 4,
    bio: "Chelsea comes from the small town of Potsdam at the top of New York State near the Canadian border. After graduating from Cornell University as an Animal Science and Biology major, she began traveling around the country working at farms and greenhouses along with building trails in State and National Parks. She finally found her first environmental education position in Louisiana and was hooked. She was an Instructor at Nature's Classroom during the 2015-16 year. This year she will be returning as the Assistant Director after a year in California as a Naturalist at Foothill Horizons Outdoor School followed by spending her summer travelling across the country to some amazing National Parks. She is excited to continue helping students find something that connects them to nature and really learn to explore the outdoors. Chelsea also enjoys baking, knitting, and spending time outdoors hiking, snowshoeing and getting left behind on the trail as she is distracted by wildflowers."
  },
  {
    id: 12,
    name: 'Vicki Agee',
    title: 'Returning Environmental Educator',
    image: '//nciw.s3.amazonaws.com/discovernci_media/VickiAgee.jpg',
    slug: 'vicki-agee',
    locations: [5],
    rank: 13,
    bio: 'Vicki Agee grew up in northwestern Indiana where she spent most of her time reading books or spending time with her best friend. Once graduated from high school, Vicki attending Indiana University Bloomington where she majored in environmental management. After college, Vicki discovered the joys of teaching and spent 4 years working various education jobs. Currently, Vicki is spending the summer as a head counselor at a farm camp frolicking with children and animals. This fall, Vicki is exciting to be returning back to Nature’s Classroom after her two year absence. She began working at NCI straight out of college and fell in love with it. Vicki loves sharing her passion for exploring and learning new things with students from so many different places.  When not working with children Vicki can usually be found reading a book, watching a Sherlock marathon, or hanging out with friends.'
  },
  {
    id: 13,
    name: 'Gabe Imler',
    title: 'Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/GabeImler.jpg',
    slug: 'gabe-imler',
    locations: [5],
    rank: 14,
    bio: 'Gabe was born and raised in Hollidaysburg, PA where he enjoyed bird watching and exploring the nearby woods of Rothrock State Forest. He graduated this past May from Penn State Erie, the Behrend College with a degree in Biology. Gabe spent the last summer counseling at Camp Blue Diamond in Petersburg, PA, and is now looking forward to furthering his Environmental Education Experience at NCI this coming season. When not working, Gabe can usually be found with a guitar in hand, bird watching, or looking for a good movie.'
  },
  {
    id: 8,
    name: 'David Janusz',
    title: 'Assistant Teacher',
    image: '//nciw.s3.amazonaws.com/discovernci_media/DavidJanusz.jpg',
    slug: 'david-janusz',
    locations: [6],
    rank: 9,
    bio: "Known to most of you as Will, Kendal and Everett's dad (CH students) and the Earth Day after school activities in charge person - will be assisting in the Upper Elementary and Adolescent classrooms. David  is a former high school chemistry and physics teacher who retired six years ago to stay home and care for his children. In addition to this, David has spent the last two years building his dog training business. David's passions include hunting, training dogs, golfing, soccer and anything outdoors."
  },
  {
    id: 16,
    name: 'Eric Ottmann',
    title: 'Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/EricOttmann.jpg',
    slug: 'eric-ottmann',
    locations: [5],
    rank: 17,
    bio: "Eric was born in Raleigh, NC but spent a majority of his growing years in Kenosha County, WI. He attended University of Wisconsin-Madison and graduated with a double degree in Geological Science and History. He recently graduated this past May and spent this past summer as an Adventure Trip Guide for McGaw YMCA Camp Echo. He has been a lifeguard for 6 years and am currently WFR certified. Eric has always loved the outdoors and can't wait to teach kids about nature in its truest environment. In his free time he often plays tennis and soccer with old friends or goes out sailing."
  },
  {
    id: 18,
    name: 'Marina Theisen',
    title: 'Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/MarinaTheisen.jpg',
    slug: 'marina-theisen',
    locations: [5],
    rank: 18,
    bio: '<p>Marina is originally from Bartlett, IL. She attended Illinois State University graduating with a bachelors degree in Biology. Marina hopes to attend graduate school for Behavioral Ecology. In the last year, Marina traveled to Costa Rica for a research project and has also worked in safe pesticide development for mosquitoes. Marina was inspired by her father who took her on outdoor expeditions at a young age. She hopes to have a similar impact on the children attending Natures Classroom. She loves hiking, conservation, and has a passion for bugs! In her free time, she enjoys watching sunsets, hanging out with friends, and watching movies. Each week she can’t wait to teach everything she knows about ecology and the environment!</p>'
  },

  {
    id: 20,
    name: 'Sherry Mathews',
    title: 'Administrative Assistant',
    image: '//nciw.s3.amazonaws.com/discovernci_media/SherryMathews.jpg',
    slug: 'sherry-mathews',
    locations: [6],
    rank: 2,
    bio: '<p>Sherry Mathews has been our Administrative Assistant since January of 2007. Previously she was a secretary for the New Berlin Public School System. Sherry is married and has 3 sons and 1 daughter and currently lives in Sugar Creek...just north of Elkhorn. She is an avid gardener and volunteer for the Walworth County Master Gardener Association so really enjoys what Nature’s Classroom offers students.</p>'
  },

  {
    id: 29,
    name: 'Carrie Benzinger',
    title: 'Administrative Assistant',
    image: '//nciw.s3.amazonaws.com/discovernci_media/CarrieBenzinger.jpg',
    slug: 'carrie-benzinger',
    locations: [6],
    rank: 1,
    bio: "<p>Carrie Benzinger joined Nature's Classroom Institute Montessori as our Administrative Assistant in February of 2018. Previously she worked with client data providing service to both employer and customer in the Customs trade compliance and transportation payment industries. Carrie grew up in the Milwaukee area, is married, has 3 sons, and currently lives in the Town of Vernon, east of Mukwonago. She enjoys cooking, baking, spending time with her family dog (Chili) and is a dedicated library patron and fan of the many resources it has available to all. Carrie is interested in what Nature’s Classroom Institute and Montessori school offers students and is eager to learn much more about it.</p>"
  },

  {
    id: 21,
    name: 'Ms. Deepa',
    title: "Directress - Children's House Classroom",
    image: '//nciw.s3.amazonaws.com/discovernci_media/DeepaShreekumar.jpg',
    slug: 'deepa-shreekumar',
    locations: [6],
    rank: 2,
    bio: "<p>Deepa Shreekumar grew up having a diplomat father enabling her to experience varied countries and cultures. Just when she thought life was settling down, her husband, Rajesh's job began to take them to many different countries and they moved to Milwaukee over a decade ago. Deepa has a Masters Degree in Mass Communication and Journalism from India and has worked in radio, made documentary films and taught film making before arriving at teaching. Her interest in Montessori began with her mother's teaching experience and resurfaced when her older son, Advik, now in the work force, attended a Montessori school. When her younger son, Arjun now in high school, started at a Children's House, her fascination with the Montessori philosophy peaked. She completed her Early Childhood training from Seton Montessori Institute, in 2006 and began working at Nature&apos;s Classroom Institute Montessori the same year. Deepa enjoys meeting people, cooking, reading and listening to music. She greatly appreciates a sense of humor and friendship especially when made in lands far away from her own.</p>"
  },

  {
    id: 22,
    name: 'Ms. Wilma',
    title: "Directress - Children's House Classroom",
    image: '//nciw.s3.amazonaws.com/discovernci_media/WilmaMurphy.jpg',
    slug: 'wilma-murphy',
    locations: [6],
    rank: 3,
    bio: "<p>Wilma Murphy married 20 years ago and moved from México to Wisconsin. She learned English as a second language. Wilma and her husband, John, have 2 children, Jenny and Tony. In 2005 she started a new experience working at Nature&apos;s Classroom, teaching Spanish part time. Currently she is working full time in the Children's House classroom as an assistant and teaching Spanish as well. In 2011 she took her Montessori Teacher Training at Seton Montessori Institute as a Children’s House Directress. She really enjoys teaching her culture and language to the children and also takes pleasure in learning new experiences each day.</p>"
  },

  {
    id: 24,
    name: 'Ms. Satira',
    title: 'Directress - Lower Elementary Classroom',
    image: '//nciw.s3.amazonaws.com/discovernci_media/SatiraLord.jpg',
    slug: 'satira-lord',
    locations: [6],
    rank: 5,
    bio: '<p>Satira Lord graduated from Green Mountain College with a degree in Psychology. From 2010 to 2013 she worked for Nature’s Classroom Institute and helped establish the NCI program in Texas. After NCI, she worked at Ithaca Montessori School in Ithaca, NY as the Education Director of the Youth Farm Project. She most recently ran a food pantry, as well as, worked with children in foster care. One of the highlights from her recent international travels was working at an agricultural museum in Dorf Tirol, Italy. She befriended a donkey named Ginna. She is excited to return to Nature&apos;s Classroom Montessori and cannot wait to teach your children.</p>'
  },

  {
    id: 25,
    name: 'Ms. Briana',
    title: 'Directress - Upper Elementary Classroom',
    image: '//nciw.s3.amazonaws.com/discovernci_media/BrianaKyle.jpg',
    slug: 'briana',
    locations: [6],
    rank: 6,
    bio: '<p>Ms. Briana has always had a mind rooted in science and nature. In her youth she was active in 4-H, hiking, and had an inquisitive mind. Briana graduated from UW- Madison in 2010 with a B.S. in Biological Aspects of Conservation. After graduating she soon found Nature’s Classroom Institute in 2010. In 2014 Briana hiked the entire Ice Age Trail. The following year she worked at the Urban Ecology Center. Since joining NCI in 2010 she has worked in every aspect of the organization from Environmental Educator, Assistant Directress, and now Head Upper Elementary Teacher.</p>'
  },

  {
    id: 26,
    name: 'Ms. Katelyn',
    title: 'Directress - Adolescent Classroom',
    image: '//nciw.s3.amazonaws.com/discovernci_media/KatelynBratz.jpg',
    slug: 'katelyn',
    locations: [6],
    rank: 7,
    bio: '<p>Katelyn Bratz graduated in 2008 with a Bachelor of the Arts degree in History, as well as certificates in Classical History and European History from the University of Wisconsin-Madison. Katelyn began her career working with students through environmental education. She came to Nature’s Classroom Institute and Montessori in 2008. Since then she has taken on various roles: environmental educator, environmental Education Director, history teacher, elementary assistant and currently our Adolescent Directress. It is during her work in our environmental program that Katelyn came to appreciate and understand the Montessori Method. Katelyn completed the AMI Montessori Orientation to Adolescent Studies in 2012. Since then Katelyn has worked to progress and expand our Adolescent program. She can be found regularly hiking and working at Nature’s Classroom property with her dog, Audi and the school dog, Pinto, gardening, or tending to the farm. All of which continue to be hobbies for Katelyn and a strong connection to her environmental background.</p>'
  },

  {
    id: 27,
    name: 'Lucas Marin',
    title: 'Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/LucasMarin.jpg',
    slug: 'lucas-marin',
    locations: [5],
    rank: 20,
    bio: "<p>Lucas was born and raised in Portland, Oregon where his love of the outdoors spread from summers of outdoor camps and excursions. He graduated from Western Washington University's Huxley College of the Environment with a degree in Environmental Studies and a minor in Environmental Education. After graduating, he became a Science Educator for the Mount St. Helens Institute in Washington State, where he taught children about the wonders of the outdoors with a focus on volcanic landscapes. Lucas loves sharing his enthusiasm for exploration and looks forward to continuing to share at NCI. When he isn't working with children you can find him spending time outside hiking, camping, backpacking, fishing and birding. </p>"
  },

  {
    id: 28,
    name: 'James Gorsline',
    title: 'Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/JamesGorsline.jpg',
    slug: 'james-gorsline',
    locations: [5],
    rank: 21,
    bio: "<p>James comes from Wheatland, WI in Kenosha County, and he graduated Carthage College with an Environmental Science major with a concentration in Conservation and Ecology, along with a Geography and Earth Science minor. Before joining Nature's Classroom Institute, he spent last fall and summer traveling the country through Utah, Tennessee and Illinois surveying road conditions for the Department of Transportation. James came to NCI because he loves sharing his appreciation for the natural world with others, and is passionate about showing others how the world can inspire them. In his free time, he enjoys travelling, photography, video games, running, reading and anything he can do outdoors.</p>"
  },
  {
    id: 30,
    name: 'Ms. Adriana',
    title: 'Directress - Lower Elementary Classroom',
    image: '//nciw.s3.amazonaws.com/discovernci_media/adriana.jpg',
    slug: 'adriana-haslam',
    locations: [6],
    rank: 5,
    bio: '<p>Teaching children has always been a passion of mine, as is spending time in nature and learning from my surroundings. Nature’s Classroom offers the unique opportunity for me to be able to have both daily. I have had the privilege of living all across the United States from Alaska to New York, and many places in between. I have walked inside of glaciers, tiptoed around snakes in the desert, looked down from the top of massive skyscrapers, and sat wide-eyed through stories told by tribe elders. Each community has helped shape who I am today as an educator and the rich cultures of those people influence what I bring to the classroom. I received my Bachelors degree in Sociology and Psychology with an emphasis on the sociology of education and learning and cognition from the University of Alaska. I received my Montessori education in Lower and Upper Elementary from Seton Montessori Institute.</p>'
  }
];


exports.locations = locations;
exports.facultyStaffList = facultyStaffList;
