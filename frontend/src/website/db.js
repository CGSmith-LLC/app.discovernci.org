const locations = [
  {
    id: 0,
    shortName: 'Angelus Oaks',
    slug: 'angelus-oaks-california',
    name: 'Angelus Oaks, California'
  },
  {
    id: 1,
    shortName: 'Ben Lomond',
    slug: 'ben-lomond-california',
    name: 'Ben Lomond, California'
  },
  {
    id: 2,
    shortName: 'Parrish',
    slug: 'parrish-florida',
    name: 'Parrish, Florida'
  },
  {
    id: 3,
    shortName: 'Brooksville',
    slug: 'brooksville-florida',
    name: 'Brooksville, Florida'
  },
  {
    id: 4,
    shortName: 'Bruceville',
    slug: 'bruceville-texas',
    name: 'Bruceville, Texas'
  },
  {
    id: 5,
    shortName: 'New Ulm',
    slug: 'new-ulm-texas',
    name: 'New Ulm, Texas'
  },
  {
    id: 6,
    shortName: 'Lake Geneva',
    slug: 'lake-geneva-wisconsin',
    name: 'Lake Geneva, Wisconsin'
  }
];

const facultyStaffList = [
    {
    id: 1,
    name: 'Jennifer Braun',
    image: '//nciw.s3.amazonaws.com/discovernci_media/JenniferBraun.jpg',
    locations: [6],
    rank: 2,
    primaryContactFor: [6],
    slug: 'jennifer-braun'
  },
  {
    id: 2,
    name: 'Austin Wood',
    title: 'Senior Environmental Instructor',
    image: '/discovernci_media/faculty-staff/Austin-Wood.jpg',
    slug: 'austin-wood',
    locations: [0, 1, 4, 5],
    rank: 4,
    bio: 'Austin has been an Environmental Educator for two years at Nature’s Classroom Institute, beginning his third year in the fall 2019. His love of the Outdoors and the natural environment has kept Austin coming back year after year. Austin enjoys writing his own curriculum and teaching about world history within the outdoor setting, a good example of this is his unique Gold Rush class, designed specifically for the California program. He has grown and developed alongside Nature’s Classroom Institute and has gained a wealth of experience that is on display for every visiting school to see.'
  },
  {
    id: 34,
    name: 'Austin Wood',
    title: 'Outreach Director',
    image: '/discovernci_media/faculty-staff/Austin-Wood2.jpg',
    slug: 'austin-wood',
    locations: [2, 3],
    rank: 4,
    bio: '<p>Austin has been an Environmental Educator with Nature’s Classroom Institute for 2 years at the Texas and California facilities. He has brought his passion for education and the outdoors to the new Florida sites and will be able to offer prospective schools a true insight into the depth of the Nature’s Classroom Institute Program. (New paragraph) Hailing from England, Austin had a long career in sales and marketing before following a dream of adventure and a vocation outdoors. While working as an Educator, Austin became enthusiastic about the values and mission of Nature’s Classroom Institute and was eager to see the program grow, leading to the opening of the two new Florida facilities.</p><p>Austin as Outreach Director is excited to meet and work with new schools and welcome them to the Nature’s Classroom Institute program.</p>'
  },
  {
    id: 4,
    name: 'Jordan Kendall',
    title: 'Senior Environmental Instructors',
    image: '/discovernci_media/faculty-staff/Jordan-Kendall.jpg',
    slug: 'jordan-kendall',
    locations: [0, 1, 4, 5],
    rank: 7,
    bio: 'Jordan is currently in his second year with NCI and comes to us from Kentucky. He attended Lindsey Wilson College where he played soccer for four years and earned his bachelor\'s degree in business administration. He is currently taking online classes to obtain his masters and expects to have his MBA by next year. He is a high energy educator with a camp counselor background and knowledgeable about the trees and vegetation in the area. He can keep students engaged through silly games and songs while teaching them about the world around them.'
  },
  {
    id: 31,
    name: 'Brittany Sumner',
    title: 'Environmental Educator',
    image: '/discovernci_media/faculty-staff/Brittany-Sumner.jpg',
    slug: 'brittany-sumner',
    locations: [0, 1, 4, 5],
    rank: 8,
    bio: 'Brittany, also known as Peaches, cultivated her adventurous spirit and love for the environment as a child on her family’s farm in South Carolina. Her passion for the outdoors led her to Clemson University, where she earned a degree in Wildlife and Fisheries Biology in 2015. In 2017, she worked as a naturalist teaching people of all ages about the ever-changing natural world we live in. This past summer, she led conservation study abroad trips for high school students to Portugal and Botswana. Peaches’ love for various ecosystems has brought her to serve all over the world, from Florida’s coastal ecosystems to African deltas. Her free time is spent exploring the outdoors, photographing wildlife, tending to her garden, or with her nose in a good book.'
  },
  {
    id: 32,
    name: 'Cristina Villalobos',
    title: 'Environmental Educator',
    image: '/discovernci_media/faculty-staff/Cristina-Villalobos.jpg',
    slug: 'cristina-villalobos',
    locations: [0, 1, 4, 5],
    rank: 9,
    bio: 'Before joining the NCI team as an environmental educator, Cristina researched the marine environment and graduated from Western Washington University with a Master’s in marine and estuarine science. Throughout her academic career she combined her research interests with youth education and outreach opportunities. Why? Because to her, science education outside of the lab is just as important as inside the lab. She is an adventurer at heart and is always ready to go outdoors.'
  },
  {
    id: 33,
    name: 'Neil Pederson',
    title: 'Environmental Educator',
    image: '/discovernci_media/faculty-staff/Neil-Pederson.jpg',
    slug: 'neil-pederson',
    locations: [0, 1, 4, 5],
    rank: 10,
    bio: 'Neil was born and raised in Clarendon Hills, Illinois and is a graduate of the University of Wisconsin-Stevens Point with a degree in communications. As a Pointer, he was a member of the cross country and track & field teams, serving as a captain of each for two years and earning All-American status. Upon graduation, he worked as an Environmental Educator at Brandywine Creek State Park in Wilmington, DE for one year. More recently, he worked on a trail crew with the US Forest Service in the Church National Forest in South-Central Alaska. He is now thrilled to teach and learn from the children of Texas and California.'
  },
  {
    id: 6,
    name: 'Geoffrey E. Bishop',
    title: 'Executive Director',
    image: '//nciw.s3.amazonaws.com/discovernci_media/GeoffreyBishop.jpg',
    slug: 'geoffrey-bishop',
    locations: [0, 1, 2, 3, 4, 5, 6, 7],
    rank: 0,
    primaryContactFor: [],
    bio: "Geoffrey E. Bishop, hails from the bush in North West NSW, Australia. After his childhood spent on his family's sheep station he went to an agricultural boarding school for five years, and then to University in both Sydney and Melbourne where he studied Horticulture and Landscape Architecture. <br /><br /> For the next 10 years he traveled the world, visiting over 80 countries, where he spent most of his time trekking in rural areas, learning cultures and understanding his place in the world.<br /><br /> In 1996 Geoffrey started Nature&apos;s Classroom Institute of Wisconsin, Inc. NCI is a residential environmental education program serving schools throughout the Midwest. The Nature&apos;s Classroom Institute program helps students understand the natural environment, participate in ecosystem exploration and study, and work together with their peers and teachers as a community. The program includes activities such as confidence-building, group challenges, historical simulations, scientific explorations, and many more hands-on academic lessons. <br /><br /> After developing a strong academic and environmental outdoor based curriculum, he formed Nature&apos;s Classroom Montessori School that blends the core philosophy of Montessori with his environmental principles. The past Board Chair of the Wisconsin Association of Environmental Education (WAEE), he has been honored by WAEE as Wisconsin Non-Formal Educator of the Year. <br /><br /> Nature&apos;s Classroom is on 400 acres in the small rural community of Mukwonago, Wisconsin.  Geoffrey's passionate and sustained focus over the past 15 years has been on organics and sustainability in schools while promoting getting children back outdoors and helping adults understand the importance of instinctive play in the natural world."
  },
  {
    id: 7,
    name: 'Mirko Sever',
    title: 'Director of Outreach',
    image: '//nciw.s3.amazonaws.com/discovernci_media/MirkoSever.jpg',
    slug: 'mirko-sever',
    locations: [0, 1, 4, 5],
    primaryContactFor: [0, 1, 4, 5],
    rank: 1,
    bio: 'Mirko Sever is the Director of Outreach - California for Nature&apos;s Classroom Institute. Mirko will be leading the sales, marketing, and development of the EE program in California. Mirko grew up in a Serbian family and  received a Master’s degree in Accounting and Finance from  University of Wisconsin - Milwaukee. In his free time Mirko works with a number of nonprofits and volunteers with a local hospice organization visiting patients. Mirko is excited to take on the adventure and expand NCI&apos;s teachings and values to students in California.'
  },
  {
    id: 17,
    locations: [1, 4],
    name: 'Britta Wood',
    title: 'Education Director - Texas, California, Florida',
    image: '/discovernci_media/faculty-staff/Britta-Wood.jpg',
    slug: 'britta-wood',
    rank: 3,
    bio: 'Britta\'s passion for the outdoors and exploring began as a child, discovering nature in the creeks and forests of her Texan hometown. She earned a degree in Environmental Sustainability and quickly found herself in the Environmental Education field. Britta has worked with children in Australia, Europe and all-over North America. She joined Nature\'s Classroom Institute as Education Director of Texas in 2015, became Education Director of California in 2017 and Education Director of Florida in 2018. Britta believes that getting children back outdoors can ignite their passion for learning and loves to have this opportunity year after year.'
  },
  {
    id: 8,
    locations: [6],
    name: 'Kristen Mehl',
    title: 'Director of Education',
    image: '//nciw.s3.amazonaws.com/discovernci_media/KristenMehl.jpeg',
    slug: 'kristen-mehl',
    rank: 3,
    bio: "Kristen Mehl hails from the great mitten state of Michigan where she grew up running around outdoors with her father and brother. She was inspired to become a teacher as an elementary student, and even studied early childhood education in college at the University of Michigan. After taking a leap a leap of faith and packing up three months worth of belongings, she moved to North Carolina to start a series of internships that would lead her to Nature's Classroom. She started as an instructor for the 2015-2016 school year, returned last season to help transplant NCI from Mukwonago to Lake Geneva as co-director, and is happily returning as director of education. She was inspired by children from all over the country to continue her work as an environmental educator after watching many become so enthralled with the world around them. This summer, Kristen spent a month traveling the country and is excited to bring back some of her knowledge in the form of Stump the Staff questions. When she's not working, she can be found calling for owls in Big Foot Beach State Park, watercolor painting, singing along to the musical Hamilton or watching Harry Potter."
  },
  {
    id: 9,
    locations: [6],
    name: 'Hayley Trzinkski',
    title: 'Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/HayleyTrzinkski.jpg',
    slug: 'hayley-trzinkski',
    rank: 10,
    bio: 'Hayley is originally from Wisconsin Rapids, Wisconsin where she graduated from the University of Wisconsin, Stevens Point with degrees in Wildlife Ecology and Biology. This summer she worked at Upham Woods Outdoor Learning Center as a teaching naturalist and is excited to continue teaching environmental education at NCI as a newcomer on staff this season. Hayley likes to go on adventures, sing, and do art projects in her spare time.'
  },
  {
    id: 10,
    locations: [6],
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
    locations: [6],
    rank: 4,
    bio: "Chelsea comes from the small town of Potsdam at the top of New York State near the Canadian border. After graduating from Cornell University as an Animal Science and Biology major, she began traveling around the country working at farms and greenhouses along with building trails in State and National Parks. She finally found her first environmental education position in Louisiana and was hooked. She was an Instructor at Nature's Classroom during the 2015-16 year. This year she will be returning as the Assistant Director after a year in California as a Naturalist at Foothill Horizons Outdoor School followed by spending her summer travelling across the country to some amazing National Parks. She is excited to continue helping students find something that connects them to nature and really learn to explore the outdoors. Chelsea also enjoys baking, knitting, and spending time outdoors hiking, snowshoeing and getting left behind on the trail as she is distracted by wildflowers."
  },
  {
    id: 12,
    name: 'Vicki Agee',
    title: 'Returning Environmental Educator',
    image: '//nciw.s3.amazonaws.com/discovernci_media/VickiAgee.jpg',
    slug: 'vicki-agee',
    locations: [6],
    rank: 13,
    bio: 'Vicki Agee grew up in northwestern Indiana where she spent most of her time reading books or spending time with her best friend. Once graduated from high school, Vicki attending Indiana University Bloomington where she majored in environmental management. After college, Vicki discovered the joys of teaching and spent 4 years working various education jobs. Currently, Vicki is spending the summer as a head counselor at a farm camp frolicking with children and animals. This fall, Vicki is exciting to be returning back to Nature’s Classroom after her two year absence. She began working at NCI straight out of college and fell in love with it. Vicki loves sharing her passion for exploring and learning new things with students from so many different places.  When not working with children Vicki can usually be found reading a book, watching a Sherlock marathon, or hanging out with friends.'
  },
  {
    id: 13,
    name: 'Gabe Imler',
    title: 'Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/GabeImler.jpg',
    slug: 'gabe-imler',
    locations: [6],
    rank: 14,
    bio: 'Gabe was born and raised in Hollidaysburg, PA where he enjoyed bird watching and exploring the nearby woods of Rothrock State Forest. He graduated this past May from Penn State Erie, the Behrend College with a degree in Biology. Gabe spent the last summer counseling at Camp Blue Diamond in Petersburg, PA, and is now looking forward to furthering his Environmental Education Experience at NCI this coming season. When not working, Gabe can usually be found with a guitar in hand, bird watching, or looking for a good movie.'
  },
  {
    id: 16,
    name: 'Eric Ottmann',
    title: 'Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/EricOttmann.jpg',
    slug: 'eric-ottmann',
    locations: [6],
    rank: 17,
    bio: "Eric was born in Raleigh, NC but spent a majority of his growing years in Kenosha County, WI. He attended University of Wisconsin-Madison and graduated with a double degree in Geological Science and History. He recently graduated this past May and spent this past summer as an Adventure Trip Guide for McGaw YMCA Camp Echo. He has been a lifeguard for 6 years and am currently WFR certified. Eric has always loved the outdoors and can't wait to teach kids about nature in its truest environment. In his free time he often plays tennis and soccer with old friends or goes out sailing."
  },
  {
    id: 18,
    name: 'Marina Theisen',
    title: 'Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/MarinaTheisen.jpg',
    slug: 'marina-theisen',
    locations: [6],
    rank: 18,
    bio: '<p>Marina is originally from Bartlett, IL. She attended Illinois State University graduating with a bachelors degree in Biology. Marina hopes to attend graduate school for Behavioral Ecology. In the last year, Marina traveled to Costa Rica for a research project and has also worked in safe pesticide development for mosquitoes. Marina was inspired by her father who took her on outdoor expeditions at a young age. She hopes to have a similar impact on the children attending Natures Classroom. She loves hiking, conservation, and has a passion for bugs! In her free time, she enjoys watching sunsets, hanging out with friends, and watching movies. Each week she can’t wait to teach everything she knows about ecology and the environment!</p>'
  },
  {
    id: 29,
    name: 'Carrie Benzinger',
    title: 'Administrative Assistant',
    image: '//nciw.s3.amazonaws.com/discovernci_media/CarrieBenzinger.jpg',
    slug: 'carrie-benzinger',
    locations: [7],
    rank: 1,
    bio: "<p>Carrie Benzinger joined Nature's Classroom Institute Montessori as our Administrative Assistant in February of 2018. Previously she worked with client data providing service to both employer and customer in the Customs trade compliance and transportation payment industries. Carrie grew up in the Milwaukee area, is married, has 3 sons, and currently lives in the Town of Vernon, east of Mukwonago. She enjoys cooking, baking, spending time with her family dog (Chili) and is a dedicated library patron and fan of the many resources it has available to all. Carrie is interested in what Nature’s Classroom Institute and Montessori school offers students and is eager to learn much more about it.</p>"
  },
  {
    id: 21,
    name: 'Ms. Deepa',
    title: "Head of School",
    image: '//nciw.s3.amazonaws.com/discovernci_media/DeepaShreekumar.jpg',
    slug: 'deepa-shreekumar',
    locations: [7],
    rank: 2,
    bio: "<h4>Directress - Children's House Classroom</h4><p>Deepa Shreekumar grew up having a diplomat father enabling her to experience varied countries and cultures. Just when she thought life was settling down, her husband, Rajesh's job began to take them to many different countries and they moved to Milwaukee over a decade ago. Deepa has a Masters Degree in Mass Communication and Journalism from India and has worked in radio, made documentary films and taught film making before arriving at teaching. Her interest in Montessori began with her mother's teaching experience and resurfaced when her older son, Advik, now in the work force, attended a Montessori school. When her younger son, Arjun now in high school, started at a Children's House, her fascination with the Montessori philosophy peaked. She completed her Early Childhood training from Seton Montessori Institute, in 2006 and began working at Nature&apos;s Classroom Institute Montessori the same year. Deepa enjoys meeting people, cooking, reading and listening to music. She greatly appreciates a sense of humor and friendship especially when made in lands far away from her own.</p>"
  },
  {
    id: 22,
    name: 'Ms. Wilma',
    title: "Directress - Children's House Classroom",
    image: '//nciw.s3.amazonaws.com/discovernci_media/WilmaMurphy.jpg',
    slug: 'wilma-murphy',
    locations: [7],
    rank: 3,
    bio: "<p>Wilma Murphy married 20 years ago and moved from México to Wisconsin. She learned English as a second language. Wilma and her husband, John, have 2 children, Jenny and Tony. In 2005 she started a new experience working at Nature&apos;s Classroom, teaching Spanish part time. Currently she is working full time in the Children's House classroom as an assistant and teaching Spanish as well. In 2011 she took her Montessori Teacher Training at Seton Montessori Institute as a Children’s House Directress. She really enjoys teaching her culture and language to the children and also takes pleasure in learning new experiences each day.</p>"
  },
  {
    id: 23,
    name: 'Ms. Kym',
    title: "Assistant Teacher - Children's House Classroom",
   // image: '/discovernci_media/KymberlySmith.jpg',
    slug: 'kymberly-smith',
    locations: [7],
    rank: 4,
    bio: "<p>Kymberly Smith received a Bachelor’s in Elementary Education with a specialization in science from the University of Iowa in 2010. As a traditional teacher, she began her career teaching in Roxbury, MA at an urban high school in one of Boston’s poorest neighborhoods. She moved back to Wisconsin to be closer to family. Her family now includes Charlotte, Henry, and Elizabeth. She continued as a traditional teacher at a choice school on the Southside of Milwaukee, teaching science to middle school students. It wasn’t until her daughter, Charlotte, became old enough to start looking at school options that her family discovered Montessori. Her family became part of the Nature’s Classroom community in 2014 when Charlotte began in Children’s House. In summer 2017, Kymberly began her training at Seton Montessori Institute. She enters the role of assistant teacher and intern to Children’s house in 2018. She loves Montessori because it meets each child as his or her own level and directs the lessons to the individual.</p>"
  },
  {
    id: 24,
    name: 'Ms. Satira',
    title: 'Directress - Lower Elementary Classroom',
    image: '//nciw.s3.amazonaws.com/discovernci_media/SatiraLord.jpg',
    slug: 'satira-lord',
    locations: [7],
    rank: 5,
    bio: '<p>Satira Lord graduated from Green Mountain College with a degree in Psychology. From 2010 to 2013 she worked for Nature’s Classroom Institute and helped establish the NCI program in Texas. After NCI, she worked at Ithaca Montessori School in Ithaca, NY as the Education Director of the Youth Farm Project. She most recently ran a food pantry, as well as, worked with children in foster care. One of the highlights from her recent international travels was working at an agricultural museum in Dorf Tirol, Italy. She befriended a donkey named Ginna. She is excited to return to Nature&apos;s Classroom Montessori and cannot wait to teach your children.</p>'
  },

  {
    id: 25,
    name: 'Ms. Briana',
    title: 'Directress - Upper Elementary Classroom',
    image: '//nciw.s3.amazonaws.com/discovernci_media/BrianaKyle.jpg',
    slug: 'briana',
    locations: [7],
    rank: 6,
    bio: '<p>Ms. Briana has always had a mind rooted in science and nature. In her youth she was active in 4-H, hiking, and had an inquisitive mind. Briana graduated from UW- Madison in 2010 with a B.S. in Biological Aspects of Conservation. After graduating she soon found Nature’s Classroom Institute in 2010. In 2014 Briana hiked the entire Ice Age Trail. The following year she worked at the Urban Ecology Center. Since joining NCI in 2010 she has worked in every aspect of the organization from Environmental Educator, Assistant Directress, and now Head Upper Elementary Teacher.</p>'
  },

  {
    id: 26,
    name: 'Ms. Katelyn',
    title: 'Directress - Adolescent Classroom',
    image: '//nciw.s3.amazonaws.com/discovernci_media/KatelynBratz.jpg',
    slug: 'katelyn',
    locations: [7],
    rank: 7,
    bio: '<p>Katelyn Bratz graduated in 2008 with a Bachelor of the Arts degree in History, as well as certificates in Classical History and European History from the University of Wisconsin-Madison. Katelyn began her career working with students through environmental education. She came to Nature’s Classroom Institute and Montessori in 2008. Since then she has taken on various roles: environmental educator, environmental Education Director, history teacher, elementary assistant and currently our Adolescent Directress. It is during her work in our environmental program that Katelyn came to appreciate and understand the Montessori Method. Katelyn completed the AMI Montessori Orientation to Adolescent Studies in 2012. Since then Katelyn has worked to progress and expand our Adolescent program. She can be found regularly hiking and working at Nature’s Classroom property with her dog, Audi and the school dog, Pinto, gardening, or tending to the farm. All of which continue to be hobbies for Katelyn and a strong connection to her environmental background.</p>'
  },

  {
    id: 27,
    name: 'Lucas Marin',
    title: 'Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/LucasMarin.jpg',
    slug: 'lucas-marin',
    locations: [6],
    rank: 20,
    bio: "<p>Lucas was born and raised in Portland, Oregon where his love of the outdoors spread from summers of outdoor camps and excursions. He graduated from Western Washington University's Huxley College of the Environment with a degree in Environmental Studies and a minor in Environmental Education. After graduating, he became a Science Educator for the Mount St. Helens Institute in Washington State, where he taught children about the wonders of the outdoors with a focus on volcanic landscapes. Lucas loves sharing his enthusiasm for exploration and looks forward to continuing to share at NCI. When he isn't working with children you can find him spending time outside hiking, camping, backpacking, fishing and birding. </p>"
  },

  {
    id: 28,
    name: 'James Gorsline',
    title: 'Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/JamesGorsline.jpg',
    slug: 'james-gorsline',
    locations: [6],
    rank: 21,
    bio: "<p>James comes from Wheatland, WI in Kenosha County, and he graduated Carthage College with an Environmental Science major with a concentration in Conservation and Ecology, along with a Geography and Earth Science minor. Before joining Nature's Classroom Institute, he spent last fall and summer traveling the country through Utah, Tennessee and Illinois surveying road conditions for the Department of Transportation. James came to NCI because he loves sharing his appreciation for the natural world with others, and is passionate about showing others how the world can inspire them. In his free time, he enjoys travelling, photography, video games, running, reading and anything he can do outdoors.</p>"
  },
  {
    id: 30,
    name: 'Ms. Adriana',
    title: 'Directress - Lower Elementary Classroom',
    image: '//nciw.s3.amazonaws.com/discovernci_media/adriana.jpg',
    slug: 'adriana-haslam',
    locations: [7],
    rank: 5,
    bio: '<p>Teaching children has always been a passion of mine, as is spending time in nature and learning from my surroundings. Nature’s Classroom offers the unique opportunity for me to be able to have both daily. I have had the privilege of living all across the United States from Alaska to New York, and many places in between. I have walked inside of glaciers, tiptoed around snakes in the desert, looked down from the top of massive skyscrapers, and sat wide-eyed through stories told by tribe elders. Each community has helped shape who I am today as an educator and the rich cultures of those people influence what I bring to the classroom. I received my Bachelors degree in Sociology and Psychology with an emphasis on the sociology of education and learning and cognition from the University of Alaska. I received my Montessori education in Lower and Upper Elementary from Seton Montessori Institute.</p>'
  }
];


exports.locations = locations;
exports.facultyStaffList = facultyStaffList;
