import ajax from "./ajax";

const BASE_URL = 'http://127.0.0.1:8080/book'

//添加出版社newProduct: true,
//                 recommend
// export const reqAddBook = (book,headers) => ajax(BASE_URL+'/addBook/', {
//   author: book.author,
//   isbn: book.isbn,
//   publish: book.publish,
//   birthday: book.birthday,
//   marketPrice: book.marketPrice,
//   price: book.price,
//   stock: book.stock,
//   description: book.description,
//   put: book.put,
//   bookName: book.bookName,
//   rank: book.rank,
//   newProduct: book.newProduct,
//   recommend: book.recommend,
//   bookSort: book.bookSort[1],
//   imgSrc:book.imgSrc,
// }, 'POST',headers)
export const reqAddBook = (book,headers) => ajax(BASE_URL+'/addBook/', book, 'POST',headers)
export const reqModifyBook = (book,headers) => ajax(BASE_URL+'/modifyBook/', book, 'PUT',headers)
// export const reqModifyBook = (book,headers) => ajax(BASE_URL+'/modifyBook/', {
//   author: book.author,
//   isbn: book.isbn,
//   publish: book.publish,
//   birthday: book.birthday,
//   marketPrice: book.marketPrice,
//   price: book.price,
//   stock: book.stock,
//   description: book.description,
//   put: book.put,
//   bookName: book.bookName,
//   rank: book.rank,
//   newProduct: book.newProduct,
//   recommend: book.recommend,
//   bookSort: book.bookSort[1],
//   imgSrc:book.imgSrc,
//   id: book.id
// }, 'PUT',headers)


export const reqGetBookList = (page,pageSize)=>ajax(BASE_URL+'/getBookList/',{page, pageSize})
export const reqGetSearchBookList = (data)=>ajax(BASE_URL+'/getSearchBookList/',data)
export const reqGetBook = (id)=>ajax(BASE_URL+'/getBook/',{id})

export const reqGetRecBookList = (sort)=>ajax(BASE_URL+'/getRecBookList/',{sort})



//删除
export const reqDelBook = (bookId)=>ajax(BASE_URL+'/delBook/',{bookId},'DELETE')
export const reqDelBookImg = (bookId,url)=>ajax(BASE_URL+'/delOneImg/',{bookId,url})


export const reqGetBookImgPathList = (isbn)=>ajax(BASE_URL+'/getImgPaths/',{isbn})


export const reqModifyPut = (bookId,put)=>ajax(BASE_URL+'/modifyPut/',{bookId,put},'PUT')
export const reqModifyRec = (bookId,recommend)=>ajax(BASE_URL+'/modifyRec/',{bookId,recommend},'PUT')
export const reqModifyNew = (bookId,newProduct)=>ajax(BASE_URL+'/modifyNew/',{bookId,newProduct},'PUT')

export const reqBatchModifyPut = (data)=>ajax(BASE_URL+'/batchModifyPut/',data,'PUT')
export const reqBatchModifyPutOff = (data)=>ajax(BASE_URL+'/batchModifyPutOff/',data,'PUT')
export const reqBatchModifyRec = (data)=>ajax(BASE_URL+'/batchModifyRec/',data,'PUT')
export const reqBatchModifyRecOff = (data)=>ajax(BASE_URL+'/batchModifyRecOff/',data,'PUT')
export const reqBatchModifyNew = (data)=>ajax(BASE_URL+'/batchModifyNew/',data,'PUT')
export const reqBatchModifyNewOff = (data)=>ajax(BASE_URL+'/batchModifyNewOff/',data,'PUT')
//getSortBookList
export const reqGetSortBookList = (sortId)=>ajax(BASE_URL+'/getSortBookList/',{sortId})

//getSortBookListBySort
export const reqGetBookListBySort = (sortId,page,pageSize)=>ajax(BASE_URL+'/getBookListBySort/',{sortId,page, pageSize})
