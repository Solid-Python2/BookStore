import ajax from "./ajax";

const BASE_URL = 'http://localhost:8080/topic'



export const reqGetTopicList = (page,pageSize)=>ajax(BASE_URL+'/getTopicList/',{page, pageSize})

export const reqGetTopic = (id) => ajax(BASE_URL+"/getTopic/",{id})

export const reqAddTopic = (bookTopic,headers) => ajax(BASE_URL+'/addTopic/', bookTopic, 'POST',headers)
export const reqModifyTopic = (bookTopic,headers) => ajax(BASE_URL+'/modifyTopic/', bookTopic, 'PUT',headers)

export const reqModifyRank = (id,rank) => ajax(BASE_URL+"/modifyTopicRank/",{id,rank},'PUT')
export const reqModifyPut = (id,put) => ajax(BASE_URL+"/modifyTopicPut/",{id,put},'PUT')

export const reqDelTopic = (id) => ajax(BASE_URL+"/delTopic/",{id},'DELETE')
export const reqDelTopicImg = (id,url)=>ajax(BASE_URL+'/delTopicImg/',{id,url})

//得到所有未添加到书单的图书
export const reqGetNoAddBookList = (topicId,page,pageSize)=>ajax(BASE_URL+'/getNoAddBookList/',{topicId,page, pageSize})



export const reqAddSubTopic = (topicId,bookId)=>ajax(BASE_URL+'/addSubTopic/',{topicId,bookId},'POST')
export const reqDelSubTopic = (id,bookId)=>ajax(BASE_URL+'/delSubTopic/',{id,bookId},'DELETE')
export const reqModifySubTopic = (bookId,recReason)=>ajax(BASE_URL+'/modifySubTopic/',{bookId,recReason},'PUT')
export const reqAddReason = (bookId,reason)=>ajax(BASE_URL+'/addReason/',{bookId,reason},'POST')
export const reqGetSubTopicList = (id,page,pageSize)=>ajax(BASE_URL+'/getSubTopicList/',{id,page, pageSize})
export const reqGetReason = (topicId,bookId)=>ajax(BASE_URL+'/getReason/',{topicId,bookId})
export const reqGetTopicBookList = (id)=>ajax(BASE_URL+'/getTopicBookList/',{id})

//getReason
