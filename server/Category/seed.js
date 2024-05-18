const Category = require('./Category')
const data = [
    'Прогнозы в IT',
    'Веб-разработка',
    'Мобильная разработка',
    'Фриланс',
    'Алгоритмы',
    'Тестирование IT систем',
    'Разработка игр',
    'Дизайн и юзабилити',
    'Искуственный интелект',
    'Машинное обучение',
]

async function writeDataCategory (){
    const length = await Category.countDocuments();
    if(length == 0){
        data.map((item, index)=>{
            new Category({
                name: item,
                key: index
            }).save() 
        })
    }
    console.log('Category length: ', length);
}

module.exports = writeDataCategory