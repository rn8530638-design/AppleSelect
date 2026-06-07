// All content extracted verbatim from AppleSelect (standalone).html.
// Russian text is preserved exactly — do not translate or alter.

export const navLinks = [
  { label: 'Айфоны', href: '#showcase' },
  { label: 'Наушники', href: '#showcase' },
  { label: 'Часы', href: '#showcase' },
]

export const hero = {
  eyebrow: 'Apple Select',
  titleTop: 'Оригинальная',
  titleDim: 'техника',
  sub: 'Продажа оригинальной техники Apple — с гарантией и честным подходом.',
  cta: 'Подробнее',
}

export const products = [
  {
    name: 'iPhone 15 Pro',
    echo: 'iPhone',
    image: '/images/iphone.jpg',
    desc: 'Титановый корпус, чип A17 Pro и система камер профессионального уровня. Самый мощный iPhone в линейке.',
    specs: [
      ['Чип', 'A17 Pro · 6 ядер'],
      ['Дисплей', '6.1" Super Retina XDR'],
      ['Камера', '48 Мп · 3× оптика'],
      ['Корпус', 'Авиационный титан'],
    ],
    price: 'от 74 490 ₽',
    ph: 'linear-gradient(150deg,#3a3f4b 0%,#1b1e26 55%,#0a0b10 100%)',
    glow: 'radial-gradient(circle at 52% 38%, rgba(120,150,255,0.28), transparent 62%)',
  },
  {
    name: 'AirPods Max',
    echo: 'AirPods',
    image: '/images/airpods.jpg',
    desc: 'Наушники полностью переосмыслены. От амбушюр до оголовья — точная посадка и полное погружение в звук.',
    specs: [
      ['Звук', 'Адаптивный EQ'],
      ['Шумоподавление', 'Активное · 2 уровня'],
      ['Автономность', 'до 20 часов'],
      ['Материал', 'Алюминий · сетка'],
    ],
    price: 'от 41 490 ₽',
    ph: 'linear-gradient(150deg,#d7e0d8 0%,#aebcae 50%,#7d8c7f 100%)',
    glow: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.4), transparent 60%)',
  },
  {
    name: 'Apple Watch Ultra',
    echo: 'Watch',
    image: '/images/watch.jpg',
    desc: 'Самые прочные и функциональные часы Apple. Титановый корпус, точный GPS и автономность до 36 часов.',
    specs: [
      ['Корпус', '49 мм · титан'],
      ['Экран', 'до 3000 нит'],
      ['Защита', 'до 100 м · WR100'],
      ['Автономность', 'до 36 часов'],
    ],
    price: 'от 66 490 ₽',
    ph: 'linear-gradient(150deg,#4a3b2c 0%,#2a2118 55%,#11100c 100%)',
    glow: 'radial-gradient(circle at 50% 40%, rgba(255,180,90,0.3), transparent 60%)',
  },
  {
    name: 'AirPods Pro 2',
    echo: 'AirPods',
    image: '/images/airpods-pro.jpg',
    desc: 'Полное погружение в звук с активным шумоподавлением нового поколения. Прозрачный режим, адаптивный звук и до 30 часов автономной работы с кейсом.',
    specs: [
      ['Чип', 'H2 · аудиопроцессор'],
      ['Шумоподавление', 'Адаптивное ANC'],
      ['Автономность', 'до 30 ч с кейсом'],
      ['Защита', 'IP54 · пыль и вода'],
    ],
    price: 'от 21 490 ₽',
    ph: 'linear-gradient(150deg,#e8e8ea 0%,#c8c8cc 50%,#a0a0a8 100%)',
    glow: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.5), transparent 60%)',
  },
  {
    name: 'MacBook Pro 14"',
    echo: 'MacBook',
    image: '/images/macbook.jpg',
    desc: 'Профессиональная мощь чипа M3 Pro и дисплей Liquid Retina XDR. Создан для самых требовательных задач — от монтажа видео до разработки.',
    specs: [
      ['Чип', 'M3 Pro · 11 ядер'],
      ['Дисплей', '14.2" Liquid Retina XDR'],
      ['Память', 'до 36 ГБ · SSD 1 ТБ'],
      ['Автономность', 'до 18 часов'],
    ],
    price: 'от 165 990 ₽',
    ph: 'linear-gradient(150deg,#3a3d44 0%,#1c1e22 55%,#0a0b0d 100%)',
    glow: 'radial-gradient(circle at 50% 40%, rgba(200,210,230,0.25), transparent 60%)',
  },
]

// stat__num is rendered as a number + a smaller unit; `u` true means the
// unit is the blue accent "+", otherwise it is a small-weight word.
export const stats = [
  { num: '500', unit: '+', accent: true, label: 'довольных клиентов' },
  { num: '3', unit: 'года', accent: false, label: 'на рынке' },
  { num: '1', unit: 'год', accent: false, label: 'официальная гарантия' },
]

export const reviews = [
  { name: 'Александр М.', date: '12 мая 2024', stars: 5,
    text: 'Заказал iPhone 15 Pro, пришёл быстро, оригинал 100%. Упаковка запечатана, всё как в официальном магазине.' },
  { name: 'Екатерина В.', date: '3 апреля 2024', stars: 5,
    text: 'Брала AirPods Max, очень довольна. Проверила серийник — всё сошлось. Поддержка отвечает быстро.' },
  { name: 'Дмитрий К.', date: '28 марта 2024', stars: 5,
    text: 'Уже второй раз покупаю здесь. Первый раз Watch Ultra, сейчас MacBook Pro. Всё оригинальное.' },
  { name: 'Мария С.', date: '15 февраля 2024', stars: 5,
    text: 'Сомневалась поначалу, но рискнула. iPhone пришёл в идеале, гарантия оформлена. Теперь только сюда.' },
  { name: 'Игорь Т.', date: '7 февраля 2024', stars: 5,
    text: 'Отличный сервис. Проконсультировали по выбору модели, помогли с доставкой. Телефон — огонь.' },
  { name: 'Анна Р.', date: '20 января 2024', stars: 5,
    text: 'Брала в подарок мужу Apple Watch Ultra 2. Он в восторге. Всё пришло быстро и красиво упаковано.' },
  { name: 'Павел Ж.', date: '11 января 2024', stars: 5,
    text: 'Честный продавец, всё как на фото. iPhone 15 Pro Max — зверь машина. Спасибо за быструю доставку!' },
  { name: 'Ольга Н.', date: '29 декабря 2023', stars: 5,
    text: 'Покупала AirPods Pro 2, полный оригинал. Цена ниже чем в магазинах, качество то же самое.' },
  { name: 'Сергей Б.', date: '18 декабря 2023', stars: 5,
    text: 'Заказывал MacBook Air M3. Пришёл запечатанный, проверил через Apple — всё чисто. Очень доволен.' },
  { name: 'Наталья П.', date: '5 декабря 2023', stars: 5,
    text: 'Отличный канал! Уже третья покупка, всегда всё отлично. Быстро, оригинально, с гарантией.' },
]

export const cta = {
  brand: '@sowil69',
  title: ['Оригинальная техника —', 'оригинальный подход'],
  text: 'Подпишитесь на канал, чтобы первыми узнавать о наличии, ценах и закрытых предложениях на технику Apple.',
  button: 'Перейти в Telegram',
  href: 'https://t.me/sowil69',
}

export const footerText =
  '© 2026 Apple Select. Не является официальным сайтом Apple Inc. Реализуем оригинальную технику Apple.'
