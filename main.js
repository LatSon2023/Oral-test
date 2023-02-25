const $ = document.querySelector.bind(document)

let name = 'Vũ Ngọc Đức'
const date = new Date()

$('#heading').innerHTML = `
    <h1>Module 1 Technical Interview</h1>
    <p>Learner name: ${name}</p>
    <p>Date: ${date.getDate()}</p>
`

const URL = `https://frcz3.sse.codesandbox.io/jobs`

const getData = async (info) => {
    const getUrl = (info) => {
        if (!info) 
            return `${URL}?_page=1&_limit=10`
        if (typeof info === 'number') 
            return `${URL}?_page=${info}&_limit=10`
        if (typeof info === 'string') 
            return `${URL}?q=${info}`
    }
    try {
        const response = await fetch(getUrl(info))
            if (response.ok) {
                const data = await response.json()
                return data
            }
    } catch (error) {
        console.log(error)
        return []
    }
}

const renderData = async (info) => {
    const dataTenTitles = await getData(info)
    const renderList = (list) => {
        list.forEach((data, index) => {
            const title = document.createElement('h1')
            title.innerHTML = `
            ${index + 1}. ${data.title}
            `
            $('#container').appendChild(title)
        })
    }
    try {
        if ($('#container').innerHTML === '') {
            renderList(dataTenTitles)
        } else {
            $('#container').innerHTML = ''
            renderList(dataTenTitles)
        }
    } catch (error) {
        console.log(error)
    }
}
renderData()

let num = 1
$('.page').innerHTML = `Page: ${num}`
$('.prev-btn').addEventListener('click', () => {
    if (num > 1) 
        num--
    $('#container').style.overflowY = 'hidden'
    $('.page').innerHTML = `Page: ${num}`
    renderData(num)
})

$('.next-btn').addEventListener('click', () => {
    num++
    $('#container').style.overflowY = 'hidden'
    $('.page').innerHTML = `Page: ${num}`
    renderData(num)
})

$('.search-btn').addEventListener('click',() => {
    $('.page').innerHTML = ''
    $('#container').style.overflowY = 'scroll'
    renderData($('.input').value)
})