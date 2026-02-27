import { Video } from '@/types/video';

export const videos: Video[] = [
    // РАЗДЕЛ: макияж с основ
    {
        id: 1,
        title: 'О себе',
        description: 'В данном видео рассказываю немного о себе;\nО моем отношении к макияжу, ведь он создан для всех.\nМоя задача — делиться с вами о тонкостях искусства макияжа.',
        videoUrl: 'https://www.dropbox.com/scl/fi/h52nl6v8hcvt7mcf4acfi/1.mp4?rlkey=nidvd3d6mxbfqrnma902f6ecf&st=73diud3v&raw=1', 
        category: 'basics',
        duration: '00:45',
        thumbnail: '/videos/thumbnails/1.jpg'
    },
    {
        id: 2,
        title: 'Лайфхак: контуринг',
        description: 'Контуринг — один из важных этапов макияжа.\nНо необязательно делать его классическим образом.\nВ видео я показываю легкий лайфхак с применением\nобычного коричневого карандаша для губ.',
        videoUrl: 'https://www.dropbox.com/scl/fi/relcylxqma3savxk6ifs6/2.mp4?rlkey=zhzbyt14c0p9wqx6sm52tf1ye&st=t43j5qn4&raw=1',
        category: 'basics',
        duration: '01:30',
        thumbnail: '/videos/thumbnails/2.jpg'
    },
    {
        id: 3,
        title: 'Прокрашивание слизистой',
        description: 'Многие думают, что карандаш для слизистой —\nопасная часть для макияжа, особенно для начинающих.\nНа самом деле — если соблюдать ряд правил, то лайнер\nвыглядит гармонично и не стирается в течении дня.\nВ этом видео я описала базовые правила\nдля аккуратной подводки слизистой глаза.',
        videoUrl: 'https://www.dropbox.com/scl/fi/th6ud1at5anctrrwesunp/3.mp4?rlkey=rf4sjavyxhtd7k4lt44gql3ik&st=sn6hzpna&raw=1',
        category: 'basics',
        duration: '02:15',
        thumbnail: '/videos/thumbnails/3.jpg'
    },
    {
        id: 4,
        title: 'Базовый макияж',
        description: 'Есть определенный продукты и простые техники,\nс помощью которых легко научится делать\nповседневный макияж. В этом видео собраны продукты\nдля базового макияжа.',
        videoUrl: 'https://www.dropbox.com/scl/fi/z7n1gy3cueb7sakri109h/4.mp4?rlkey=umds3n91a9l3whln3vv6fnf5x&st=hsukshkm&raw=1',
        category: 'basics',
        duration: '03:00',
        thumbnail: '/videos/thumbnails/4.jpg'
    },
    
    // РАЗДЕЛ: ТЕМАТИЧЕСКИЙ МАКИЯЖ
    {
        id: 5,
        title: 'Femme fatale',
        description: 'Сейчас довольно популярен макияж — femme fatale.\nКак правило, это макияж роковой девушки\nс акцентом на глаза. Он может быть интерпретирован\nсовершенно по разному. Я показываю один из вариантов.',
        videoUrl: 'https://www.dropbox.com/scl/fi/mg8xfnps4sr86zcan8iua/5.mp4?rlkey=tffzofqsnvdhqrrez8if9eamv&st=b9nd93up&raw=1',
        category: 'thematic',
        duration: '02:30'
    },
    {
        id: 6,
        title: 'Nina Park makeup',
        description: 'Один из самых нашумевших макияжей этого года.\nНина Парк — голивудский визажист, создавшая\nуниверсальный сияющий макияж,\nкоторый она использует на всех звездах.\nВ их числе: Маргарет Куоли, Эмма Стоун и другие.',
        videoUrl: 'https://www.dropbox.com/scl/fi/thehmt9m4bbav7ahk1nx3/6.mp4?rlkey=s9z1xjky7sje8vo2k194mczlk&st=1yqbch8w&raw=1',
        category: 'thematic',
        duration: '03:15'
    },
    {
        id: 7,
        title: 'Inspired by Crystle Castles',
        description: 'Очень простой акцентный макияж с акцентом на глаза.\nВсе, что понадобиться: сияющая база и тени.\nВы можете выбрать любой цвет, который понравится,\nа подводка слизистой карандашом создаст томный взгляд.',
        videoUrl: 'https://www.dropbox.com/scl/fi/rsqyaqs7vss14uxl6tc99/7.mp4?rlkey=x0yaq2b1zn1aeud1xkrb7cje5&st=7n85c4aj&raw=1',
        category: 'thematic',
        duration: '01:45'
    },
    {
        id: 8,
        title: 'California girl',
        description: 'California girl makeup — распространенный макияж на западе.\nКак правило, акцент идет не только на сияющую кожу,\nно и на сияющие тени для глаз. Легкая стрелка\nотлично дополняет образ.',
        videoUrl: 'https://www.dropbox.com/scl/fi/ggtsbklm3c1qzzs62n9ho/8.mp4?rlkey=vrkcr8ivcam0n8lvjhcqraquq&st=mboahfv5&raw=1',
        category: 'thematic',
        duration: '02:00'
    },
    {
        id: 9,
        title: 'French girl makeup',
        description: 'Французский макияж довольно романтичен.\nВ нем используется минимум продуктов для того,\nчтобы подчеркнуть естественную красоту.\nРанее, было принято считать, что француженки всегда\nиспользуют ярко-красные губы в макияже, но сейчас\nих можно сделать акцентными с менее контрастными цветами.',
        videoUrl: 'https://www.dropbox.com/scl/fi/sjsdfhnv31nv9hjq4s73o/9.mp4?rlkey=w1i36099a3jc12cy2l9hkn62l&st=12ffj2ze&raw=1',
        category: 'thematic',
        duration: '02:45'
    },
    {
        id: 10,
        title: 'VS model makeup',
        description: 'В этом году прошло одно из самых грандиозных шоу Victoria\'s Secret.\nВизажист моделей разработал макияж, который универсально подходит к любому типажу внешности и разной расовой принадлежности. Показываю свою вариацию легендарного макияжа.',
        videoUrl: 'https://www.dropbox.com/scl/fi/ezqzaljap952ocyxb3s6s/10.mp4?rlkey=yqn798lynuwuqsriaf1f3mzu3&st=6m7bm74u&raw=1',
        category: 'thematic',
        duration: '03:30'
    },
    {
        id: 11,
        title: 'Autumn vibe',
        description: 'Этой осенью популярны кофточки в стиле «Сумерки»\nи «Дневники вампира». Я вдохновилась эстетикой\nи записала об атмосферном макияже на осень в холодных тонах.',
        videoUrl: 'https://www.dropbox.com/scl/fi/8i1gsrnofagiwiwotxsjn/11.mp4?rlkey=7d7hetn9uybo611oojx05pwev&st=vud00jsi&raw=1',
        category: 'thematic',
        duration: '02:20'
    },
    {
        id: 12,
        title: 'Female gaze makeup',
        description: 'Существует два макияжа — Female gaze и male gaze.\nПервый вариант — то, что стереотипно считают наиболее привлекательным в макияже сами девушки. Как правило,\nэто — акцентные томные глаза. Наглядный разбор макияжа.',
        videoUrl: 'https://www.dropbox.com/scl/fi/7m69qkze9ume20ziqfi00/12.mp4?rlkey=qe4onzwrjp87tu5e3r5w6kxlk&st=ktqhdnds&raw=1',
        category: 'thematic',
        duration: '02:50'
    },
    
    // РАЗДЕЛ: ТЕСТИРУЕМ НАХОДКИ
    {
        id: 13,
        title: 'Monochrome eyeliner',
        description: 'Сейчас очень популярны голографические лайнеры.\nЭто простой способ привнести в повседневный макияж\nизюминку или дополнить вечерний макияж.',
        videoUrl: 'https://www.dropbox.com/scl/fi/7k2idj0h7xtw9cxu227v1/13.mp4?rlkey=iw2byq4l98m6678uj5962hqaq&st=mey9tl4h&raw=1',
        category: 'reviews',
        duration: '01:30'
    },
    {
        id: 14,
        title: 'Аналог Pat McGrath',
        description: 'Pat McGrath — визажист моделей Victoria\'s Secret.\nВ последнем шоу она наносила сияющий\nголографический блеск всем моделям.\nОн полюбился очень многим, но на российском\nрынке достаточно трудно его достать.\nБыл найден идентичный блеск от Catrice.',
        videoUrl: 'https://www.dropbox.com/scl/fi/t92b8jak5ebanc8r3zkrl/14.mp4?rlkey=jl2dd5v5sb077hpkvmq0753n4&st=njvg7xr8&raw=1',
        category: 'reviews',
        duration: '02:10'
    },
    {
        id: 15,
        title: 'L\'Oreal Paris Lumi',
        description: 'Аналоги жидких румян от Charlotte Tilbury.\nЧестно рассказываю о недостатках и преимуществах продуктов.',
        videoUrl: 'https://www.dropbox.com/scl/fi/hgqfp8fy9lp8xtualghmm/15.mp4?rlkey=mnmi66g08jpz40ofb765ffirh&st=q9d11qut&raw=1',
        category: 'reviews',
        duration: '02:40'
    },
    {
        id: 16,
        title: 'Vivienne Sabo contour&blush',
        description: 'Тестируем аналоги Charlotte Tilbury.\nVivienne Sabo запустили бюджетные аналоги легендарных\nбронзера и румян. Отличный вариант для повседневного макияжа.',
        videoUrl: 'https://www.dropbox.com/scl/fi/4zh5wtxwhpssks538quem/16.mp4?rlkey=omvrb5niiww1w6iy4p50yoau2&st=9q3wpfdp&raw=1',
        category: 'reviews',
        duration: '01:55'
    }
];

export const videoCategories = [
    {
        id: 'basics',
        name: 'МАКИЯЖ С ОСНОВ',
        videos: videos.filter(v => v.category === 'basics')
    },
    {
        id: 'thematic',
        name: 'ТЕМАТИЧЕСКИЙ МАКИЯЖ',
        videos: videos.filter(v => v.category === 'thematic')
    },
    {
        id: 'reviews',
        name: 'ТЕСТИРУЕМ НАХОДКИ',
        videos: videos.filter(v => v.category === 'reviews')
    }
];
