const root = document.querySelector('#root')
const heading = document.querySelector('#heading')
const container = document.querySelector('#container')
const name = 'Duc'
const date = new Date()
const url = 'https://frcz3.sse.codesandbox.io/jobs'
const limit = '?_page=1&_limit=10'
const limit2 = '?_page=2&_limit=10'
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const input = document.querySelector('.input')
const btn = document.querySelector('.search')

heading.innerHTML = `
    <h1>Module 1 Technical Interview</h1>
    <p>Learner name: ${name}</p>
    <p>Date: ${date.getDay()}</p>
`

// const getData = async () => {
//     try {
//         const response = await fetch(url)
//         if (response.ok) {
//             const data = await response.json()
//             return data
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

const getData2 = async (expand) => {
    try {
        const response = await fetch(`${url}${expand}`)
        if (response.ok) {
            const data = await response.json()
            return data
        }   
    } catch (error) {
        console.log(error)
        return []
    }
}

const renderData = async (expand) => {
    const dataTenTitles = await getData2(expand)
    try {
        dataTenTitles.forEach((data, index) => {
            const title = document.createElement('h1')
            title.innerHTML = `
            ${index + 1}. ${data.title}
            `
            container.appendChild(title)
        })
    } catch (error) {
        console.log(error)
    }
}

const renderData2 = async (expand) => {
    const dataTenTitles = await getData2(expand)
    container.innerHTML = ''
    try {
        dataTenTitles.forEach((data, index) => {
            const title = document.createElement('h1')
            title.innerHTML = `
            ${index + 1}. ${data.title}
            `
            container.appendChild(title)
        })
    } catch (error) {
        console.log(error)
    }
}
renderData(limit)

prev.addEventListener('click', () => {
    renderData2(limit)
})
next.addEventListener('click', () => {
    renderData2(limit2)
})

const handleSearch = async () => {
    const inputValue = input.value
    const expand = `?q=${inputValue}`
    try {
        const response = await fetch(`${url}${expand}`)
        container.innerHTML = ''
        if (response.ok) {
            const data = await response.json()
            data.forEach((value) => {
                const title = document.createElement('h1')
                title.innerHTML = `
                    ${index + 1}. ${data.title}
                `
            container.appendChild(title)
            })
        }
    } catch (error) {
        console.log(error)
    }
}

btn.addEventListener('click', handleSearch)