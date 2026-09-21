export type Category =
  | 'ALL'
  | 'OBJECTS'
  | 'PLACES'
  | 'ARCHITECTURE'
  | 'FILMS'
  | 'BOOKS'
  | 'MUSIC'
  | 'IDEAS'

export interface Collection {
  id: string
  number: string
  title: string
  titleEn?: string
  category: Exclude<Category, 'ALL'>
  date: string
  location: string
  description: string
  image: string
  images?: string[]
  relatedIds?: string[]
}

export const CATEGORIES: Category[] = [
  'ALL',
  'OBJECTS',
  'PLACES',
  'ARCHITECTURE',
  'FILMS',
  'BOOKS',
  'MUSIC',
  'IDEAS',
]

export const COLLECTIONS: Collection[] = [
  {
    id: '01',
    number: '01',
    title: '消失在森林里的房子',
    titleEn: 'THE HOUSE THAT DISAPPEARS INTO THE FOREST',
    category: 'ARCHITECTURE',
    date: '2026 / 06',
    location: 'Nagano, Japan',
    description:
      '轻井泽山间的一座木造住宅，屋顶缓缓延伸至地面，像是从泥土里生长出来的。建筑师说，他希望房子在四季里慢慢被植被覆盖，最后只留下一条缝隙。',
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimalist%20japanese%20wooden%20house%20in%20forest%20nagano%20soft%20light%20moody%20architecture%20photography%20editorial%20style&image_size=landscape_4_3',
    images: [
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=japanese%20forest%20house%20interior%20wood%20minimal%20warm%20light%20editorial%20photography&image_size=landscape_16_9',
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=forest%20house%20roof%20detail%20rain%20moody%20japan%20architecture%20closeup&image_size=portrait_4_3',
    ],
    relatedIds: ['05', '08'],
  },
  {
    id: '02',
    number: '02',
    title: '红色椅子',
    titleEn: 'THE RED CHAIR',
    category: 'OBJECTS',
    date: '2026 / 03',
    location: 'Tokyo',
    description:
      '一把让「什么都不做」看起来也很有意义的椅子。坐上去的瞬间，时间好像慢了下来。绒面布料的褶皱里藏着光。',
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=single%20vintage%20red%20velvet%20chair%20minimal%20ivory%20background%20editorial%20object%20photography%20soft%20shadows&image_size=portrait_4_3',
    images: [
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=red%20velvet%20chair%20fabric%20texture%20close%20up%20macro%20editorial&image_size=square_hd',
    ],
    relatedIds: ['06', '04'],
  },
  {
    id: '03',
    number: '03',
    title: '雨后的京都小巷',
    titleEn: 'KYOTO ALLEY AFTER RAIN',
    category: 'PLACES',
    date: '2026 / 05',
    location: 'Kyoto',
    description:
      '石板路还湿着，屋檐在滴水。没有游客，只有一家开了四十年的老书店，玻璃门后是暖黄的灯。',
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=kyoto%20narrow%20alley%20after%20rain%20wet%20stone%20pavement%20lanterns%20no%20people%20moody%20cinematic%20photography&image_size=landscape_16_9',
    relatedIds: ['09'],
  },
  {
    id: '04',
    number: '04',
    title: '静止的光',
    titleEn: 'STILL LIGHT',
    category: 'IDEAS',
    date: '2026 / 07',
    location: 'Notebook',
    description:
      '下午四点，阳光穿过百叶窗，在墙上画了十七条平行线。我盯着它们看了很久，觉得这大概就是幸福——没有发生任何事，但一切都很好。',
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=afternoon%20sunlight%20through%20blinds%20casting%20stripes%20on%20wall%20minimal%20interior%20soft%20light%20cinematic&image_size=landscape_4_3',
    relatedIds: ['08'],
  },
  {
    id: '05',
    number: '05',
    title: '海边的混凝土美术馆',
    titleEn: 'CONCRETE MUSEUM BY THE SEA',
    category: 'ARCHITECTURE',
    date: '2026 / 02',
    location: 'Naoshima',
    description:
      '安藤忠雄的清水混凝土，遇上濑户内海的落日。建筑像一块被海水打磨过的石头，所有的情绪都藏在几何里。',
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimal%20concrete%20museum%20building%20by%20sea%20japan%20sunset%20architectural%20photography%20moody&image_size=landscape_16_9',
    relatedIds: ['01', '08'],
  },
  {
    id: '06',
    number: '06',
    title: '一只温润的陶杯',
    titleEn: 'A WARM POTTERY CUP',
    category: 'OBJECTS',
    date: '2026 / 04',
    location: 'Mashiko',
    description:
      '益子町的一位老人做的。他说陶土在他手里转了五十年，他还是不知道杯子什么时候「对了」，只是感觉。',
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=handmade%20ceramic%20cup%20earth%20tone%20minimal%20wooden%20table%20soft%20natural%20light%20editorial%20object&image_size=square_hd',
    relatedIds: ['02'],
  },
  {
    id: '07',
    number: '07',
    title: '一部关于雪的慢电影',
    titleEn: 'A SLOW FILM ABOUT SNOW',
    category: 'FILMS',
    date: '2026 / 01',
    location: 'Home Cinema',
    description:
      '两个小时，只是看着一个人在雪里走。没有对话，没有剧情。看完之后我给很久没联系的朋友发了一条消息。',
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cinematic%20scene%20person%20walking%20alone%20in%20heavy%20snow%20black%20and%20white%20film%20still%20minimal&image_size=landscape_16_9',
    relatedIds: ['10'],
  },
  {
    id: '08',
    number: '08',
    title: '阴翳礼赞',
    titleEn: 'IN PRAISE OF SHADOWS',
    category: 'BOOKS',
    date: '2026 / 03',
    location: 'Nightstand',
    description:
      '谷崎润一郎说，美不在物体，而在物体与物体之间的阴翳。关灯之后，我摸了摸床头柜的木纹。',
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=old%20japanese%20book%20on%20wooden%20nightstand%20dim%20lamp%20light%20shadows%20moody%20interior%20photography&image_size=portrait_4_3',
    relatedIds: ['04', '05'],
  },
  {
    id: '09',
    number: '09',
    title: '凌晨四点的爵士',
    titleEn: 'JAZZ AT FOUR AM',
    category: 'MUSIC',
    date: '2026 / 05',
    location: 'Headphones',
    description:
      'Bill Evans 的钢琴，像手指轻轻划过结冰的湖面。外面的城市还在睡，我好像拥有了所有的安静。',
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=vinyl%20record%20turntable%20close%20up%20dim%20room%20blue%20hour%20light%20soft%20focus%20editorial&image_size=landscape_4_3',
    relatedIds: ['03', '10'],
  },
  {
    id: '10',
    number: '10',
    title: '留白',
    titleEn: 'BLANK SPACE',
    category: 'IDEAS',
    date: '2026 / 08',
    location: 'Everywhere',
    description:
      '设计里最难的，不是放什么，而是不放什么。生活也是。',
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=blank%20ivory%20paper%20on%20wooden%20desk%20single%20pencil%20minimal%20soft%20morning%20light%20editorial&image_size=landscape_4_3',
    relatedIds: ['04', '08'],
  },
  {
    id: '11',
    number: '11',
    title: '冰岛的黑沙滩',
    titleEn: 'BLACK SAND BEACH, ICELAND',
    category: 'PLACES',
    date: '2025 / 10',
    location: 'Reynisfjara',
    description:
      '玄武岩柱像风琴管一样排列在海边，浪砸过来的时候，世界只剩下一个声音。',
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=iceland%20black%20sand%20beach%20basalt%20columns%20dramatic%20waves%20moody%20landscape%20cinematic%20photography&image_size=landscape_16_9',
    relatedIds: ['03'],
  },
  {
    id: '12',
    number: '12',
    title: '黄铜台灯',
    titleEn: 'BRASS DESK LAMP',
    category: 'OBJECTS',
    date: '2026 / 02',
    location: 'Studio',
    description:
      '一九六零年代丹麦的老灯。每次拧开开关，都像在打开一小段黄昏。',
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=vintage%20brass%20desk%20lamp%20warm%20glow%20minimal%20studio%20desk%20soft%20editorial%20photography&image_size=portrait_4_3',
    relatedIds: ['02', '06'],
  },
]
