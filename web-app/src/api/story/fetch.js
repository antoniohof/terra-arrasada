
/*
const fetch = url =>
  services(url)
    .get()
    .then(response => response.data)
*/

// fake API

const fetch = () =>
  new Promise((resolve) =>
    resolve({
      status: 200,
      detail: {
        'stories': [
          {
            id: 0,
            title: 'Story 1',
            description: 'Lorem ipsum dolor sit amet.',
            date: 1545096864,
            thumbnail: '',
            author: 'Samantha',
            lat: -22.913731,
            lng: -43.182279,
            chapters: {
              id: 0,
              url: '',
              name: 'Chapter 1',
              photos: [
                {
                  url: ''
                },
                {
                  url: ''
                },
                {
                  url: ''
                }
              ]
            }
          },
          {
            id: 1,
            title: 'Story 2',
            description: 'Lorem ipsum dolor sit amet.',
            date: 1545096864,
            thumbnail: '',
            author: 'Daniel',
            lat: -22.929967,
            lng: -43.270760,
            chapters: {
              id: 0,
              url: '',
              name: 'Chapter 1',
              photos: [
                {
                  url: ''
                },
                {
                  url: ''
                },
                {
                  url: ''
                }
              ]
            }
          }
        ]
      }
    }))

export default fetch
