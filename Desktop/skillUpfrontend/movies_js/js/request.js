//CRUD
// CREATE - POST,
// READ - GET,
// UPDATE - PUT / PATCH,
// DELETE - DELETE
//GET чтение данных с сервера
// async function getData(url) {
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   if (!response.ok) throw Error (response.status);
//   return response.json();
// }
//getData('https://jsonplaceholder.typicode.com/posts/1')
//getData('https://jsonplaceholder.typicode.com/post/1/comments')
//getData('https://jsonplaceholder.typicode.com/comments?postId=1')
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
//POST создание нового
// async function postData(url, data) {
//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });
//   if (!response.ok) throw Error (response.status);
//   return response.json();
// }
// postData('https://jsonplaceholder.typicode.com/posts', {
// title: 'Title Text'
// })
// postData('https://jsonplaceholder.typicode.com/post/1/comments')
// postData('https://jsonplaceholder.typicode.com/comments?postId=1')
// .then((res) => console.log(res))
// .catch((err) => console.log(err));
//PUT полное обновление
// async function putData(url, data) {
//   const response = await fetch(url, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });
//   if (!response.ok) throw Error (response.status);
//   return response.json();
//   }
//   putData('https://jsonplaceholder.typicode.com/posts/10', {

//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
//PATCH частичное обновление
// async function patchData(url, data) {
//   const response = await fetch(url, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });
//   if (!response.ok) throw Error (response.status);
//   return response.json();
//   }
//   patchData('https://jsonplaceholder.typicode.com/posts/10', {

//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
//DELETE удаление данных
// async function deleteData(url) {
//   const response = await fetch(url, {
//     method: 'DELETE',
//   });
//   if (!response.ok) throw Error (response.status);
//   return true;
//   }
//   deleteData('https://jsonplaceholder.typicode.com/posts/10', {
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
