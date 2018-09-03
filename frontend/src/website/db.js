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
    locations: [0, 1, 2, 3, 4, 5],
    rank: 7,
    bio: 'Jordan is currently in his second year with NCI and comes to us from Kentucky. He attended Lindsey Wilson College where he played soccer for four years and earned his bachelor\'s degree in business administration. He is currently taking online classes to obtain his masters and expects to have his MBA by next year. He is a high energy educator with a camp counselor background and knowledgeable about the trees and vegetation in the area. He can keep students engaged through silly games and songs while teaching them about the world around them.'
  },
  {
    id: 31,
    name: 'Brittany Sumner',
    title: 'Environmental Educator',
    image: '/discovernci_media/faculty-staff/Brittany-Sumner.jpg',
    slug: 'brittany-sumner',
    locations: [0, 1,  2, 3, 4, 5],
    rank: 8,
    bio: 'Brittany, also known as Peaches, cultivated her adventurous spirit and love for the environment as a child on her family’s farm in South Carolina. Her passion for the outdoors led her to Clemson University, where she earned a degree in Wildlife and Fisheries Biology in 2015. In 2017, she worked as a naturalist teaching people of all ages about the ever-changing natural world we live in. This past summer, she led conservation study abroad trips for high school students to Portugal and Botswana. Peaches’ love for various ecosystems has brought her to serve all over the world, from Florida’s coastal ecosystems to African deltas. Her free time is spent exploring the outdoors, photographing wildlife, tending to her garden, or with her nose in a good book.'
  },
  {
    id: 32,
    name: 'Cristina Villalobos',
    title: 'Environmental Educator',
    image: '/discovernci_media/faculty-staff/Cristina-Villalobos.jpg',
    slug: 'cristina-villalobos',
    locations: [0, 1,  2, 3, 4, 5],
    rank: 9,
    bio: 'Before joining the NCI team as an environmental educator, Cristina researched the marine environment and graduated from Western Washington University with a Master’s in marine and estuarine science. Throughout her academic career she combined her research interests with youth education and outreach opportunities. Why? Because to her, science education outside of the lab is just as important as inside the lab. She is an adventurer at heart and is always ready to go outdoors.'
  },
  {
    id: 33,
    name: 'Neil Pedersen',
    title: 'Environmental Educator',
    image: '/discovernci_media/faculty-staff/Neil-Pedersen.jpg',
    slug: 'neil-pedersen',
    locations: [0, 1,  2, 3, 4, 5],
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
    locations: [0, 1, 2, 3, 4, 5],
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
    title: 'Education Director - Wisconsin',
    image: '//nciw.s3.amazonaws.com/discovernci_media/KristenMehl.jpeg',
    slug: 'kristen-mehl',
    rank: 3,
    bio: "Kristen Mehl hails from the great mitten state of Michigan where she grew up running around outdoors with her father and brother. She was inspired to become a teacher as an elementary student, and even studied early childhood education in college at the University of Michigan. After taking a leap a leap of faith and packing up three months worth of belongings, she moved to North Carolina to start a series of internships that would lead her to Nature's Classroom. She started as an instructor for the 2015-2016 school year, returned two seasons ago to help transplant NCI from Mukwonago to Lake Geneva as Co-Director, and is happily returning as Director of Education for her second and final term. She was inspired by children from all over the country to continue her work as an environmental educator after watching many become so enthralled with the world around them. This summer, Kristen spent a few weeks traveling around Europe with Chelsea and is excited to bring back some of her knowledge in the form of Stump the Staff questions. When she's not working, she can be found calling for owls in Big Foot Beach State Park, watercolor painting, singing along to the musical Hamilton or watching Harry Potter."
  },
  {
    id: 10,
    locations: [6],
    name: 'Corie Walton',
    title: 'Senior Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/CorieWalton.jpg',
    slug: 'corie-walton',
    rank: 6,
    bio: "Corie grew up in Indianapolis, IN, but she has been living in Lake Geneva for almost 2 years and she loves it here! She studied at Franklin College and graduated with a Biology degree and a Spanish minor. After finishing out the spring with NCI, Corie worked at Lake Geneva Youth Camp as the Program Facilitator in the Nature/Handcraft Center. That allowed her to work on a farm, teach classes, and experience a new leadership role at camp. She finds so much joy from being outside and she loves teaching. Corie also loves being with people, so doing anything with her friends is fun. She especially likes to go for walks, watch Disney movies, and drink coffee. Corie is excited to be going on her second year of working as an EE instructor because she wants to use this year to teach herself new things while she is teaching the students!"
  },
  {
    id: 11,
    name: 'Chelsea Jandreau',
    title: 'Education Director - Wisconsin',
    image: '//nciw.s3.amazonaws.com/discovernci_media/ChelseaJandreau.jpg',
    slug: 'chelsea-jandreau',
    locations: [6],
    rank: 4,
    bio: "Chelsea comes from the small town of Potsdam, New York way up near the Canadian border. After graduating from Cornell University as an Animal Science and Biology major, she began traveling around the country working at farms and greenhouses, building trails, and visiting as many State and National Parks as possible. She finally found her first environmental education position in Louisiana and was hooked. She began as an instructor at Nature’s Classroom four years ago, and this will be her second year returning as the Assistant Director. She is excited to continue helping students find something that connects them to nature and really learn to explore the outdoors. Chelsea also enjoys baking, knitting, and spending time outdoors hiking, snowshoeing and getting left behind on the trail as she is distracted by wildflowers."
  },
  {
    id: 12,
    name: 'Vicki Agee',
    title: 'Senior Environmental Educator',
    image: '//nciw.s3.amazonaws.com/discovernci_media/VickiAgee.jpg',
    slug: 'vicki-agee',
    locations: [6],
    rank: 5,
    bio: 'Vicki is originally from Indiana and attended Indiana University Bloomington. She majored in Environmental Management and began working at NCI straight out of college. Vicki fell in love with Environmental Education as working at NCI afforded her the amazing opportunity to share her love of nature and the world with kids. When Vicki isn’t working, she can be either be found reading, swimming or trying to have new and exciting adventures.'
  },
  {
    id: 13,
    name: 'Gabe Imler',
    title: 'Senior Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/GabeImler.jpg',
    slug: 'gabe-imler',
    locations: [6],
    rank: 7,
    bio: 'Gabe was born and raised in Hollidaysburg, PA where he enjoyed bird watching and exploring the nearby woods of Rothrock State Forest. He graduated from Penn State Erie, the Behrend College with a degree in Biology. Gabe spent the last summer as Naturalist at Camp Blue Diamond in Petersburg, PA, and used many of the skills he learned in his first year at NCI. Gabe is now looking forward to a great second season on the NCI crew! When not working, Gabe can usually be found with a guitar in hand, bird watching, or looking for a good movie. '
  },
  {
    id: 16,
    name: 'Eric Ottmann',
    title: 'Senior Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/EricOttmann.jpg',
    slug: 'eric-ottmann',
    locations: [6],
    rank: 8,
    bio: "This will be Eric’s second year working for Nature’s Classroom. Eric is originally from North Carolina but spent most of his formative years in Kenosha County. He attended University of Wisconsin-Madison with a double major in Geological Science and History. This past summer he was an adventure trip guide for Camp Echo, a Y camp run out of Evanston IL. Eric truly enjoys working for Nature’s classroom because of the opportunity to enjoy most of his day outdoors and the freedom to teach what he is interested in. His free time in the summer is spent on the water: sailing, skiing, kayaking, etc."
  },
  {
    id: 35,
    name: 'Jeremy Aines',
    title: 'Environmental Instructor',
    image: '/discovernci_media/faculty-staff/Jeremy-Aines.jpg',
    slug: 'jeremy-aines',
    locations: [6],
    rank: 11,
    bio: "Jeremy is originally from Dallas, Texas. He went to Stephen F. Austin State University in Nacogdoches Texas. While there, he majored in Forestry and Wildlife Management and minored in Biology. Prior to NCI, Jeremy was running the wildlife division of a pest control company. When he was younger, he was a naturalist for the YMCA where he taught outdoor education. Since he really loved working with the kids and being outdoors, he decided to return to this field. For fun, Jeremy really enjoys hiking, playing sports, and just hanging out outdoors."
  },
  {
    id: 36,
    name: 'Emily Stanislawski',
    title: 'Environmental Instructor',
    image: '/discovernci_media/faculty-staff/Emily-Stanislawski.jpg',
    slug: 'emily-stanislawski',
    locations: [6],
    rank: 12,
    bio: "Emily is originally from New Berlin, WI and graduated from Lawrence University with a major in biology and a minor in psychology. While there, she did research on native pollinators in urban areas using citizen science. She also has worked at a resident camp teaching STEM. She is so excited to work with the students and help them learn through exploration of the world around them. In her free time, she loves exploring, swimming, and science- especially insect science."
  },
  {
    id: 18,
    name: 'Marina Theisen',
    title: 'Senior Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/MarinaTheisen.jpg',
    slug: 'marina-theisen',
    locations: [6],
    rank: 9,
    bio: '<p>Marina is a returning Environmental Educator that began her journey in October of 2017. She’s originally from Bartlett, IL, a small north west suburb of Chicago. Marina graduated from Illinois State University with a degree in Biology. In the Summer of 2018, Marina worked as a Naturalist in Wisconsin Dells. In her free time, Marina likes to explore nature for insects and other cool critters. This year, she is particularly excited about getting kids comfortable with insects as well as fine tuning her skills as an instructor.</p>'
  },
  {
    id: 29,
    name: 'Carrie Benzinger',
    title: 'Office Manager',
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
    title: "Assistant Directress - Children's House Classroom",
    image: '//nciw.s3.amazonaws.com/discovernci_media/WilmaMurphy.jpg',
    slug: 'wilma-murphy',
    locations: [7],
    rank: 3,
    bio: "<p>Wilma Murphy married 20 years ago and moved from México to Wisconsin. She learned English as a second language. Wilma and her husband, John, have 2 children, Jenny and Tony. In 2005 she started a new experience working at Nature&apos;s Classroom, teaching Spanish part time. Currently she is working full time in the Children's House classroom as an assistant and teaching Spanish as well. In 2011 she took her Montessori Teacher Training at Seton Montessori Institute as a Children’s House Directress. She really enjoys teaching her culture and language to the children and also takes pleasure in learning new experiences each day.</p>"
  },
  {
    id: 23,
    name: 'Ms. Kym',
    title: "Intern - Children's House Classroom",
    image: '/discovernci_media/faculty-staff/Kymberly-Smith.jpg',
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
    id: 28,
    name: 'James Gorsline',
    title: 'Senior Environmental Instructor',
    image: '//nciw.s3.amazonaws.com/discovernci_media/JamesGorsline.jpg',
    slug: 'james-gorsline',
    locations: [6],
    rank: 10,
    bio: "<p>James grew up on a small farm in southeast Wisconsin, the lovely Dairyland of America. He graduated with degrees in Conservation and Ecology, as well as Geography from Carthage College and he has been working with Nature’s Classroom since December 2017. James loves being outdoors so much that he spent the whole month of August living in a tent doing conservation work in Georgia at Kennesaw Mountain National Battlefield Park. Looking forward to an amazing year at NCI!</p>"
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
