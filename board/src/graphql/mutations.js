/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = `mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    content
    price
    rating
  }
}
`;
export const updatePost = `mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    id
    title
    content
    price
    rating
  }
}
`;
export const deletePost = `mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    id
    title
    content
    price
    rating
  }
}
`;
export const createTodo = `mutation CreateTodo($input: CreateTodoInput!) {
  createTodo(input: $input) {
    id
    title
    content
  }
}
`;
export const updateTodo = `mutation UpdateTodo($input: UpdateTodoInput!) {
  updateTodo(input: $input) {
    id
    title
    content
  }
}
`;
export const deleteTodo = `mutation DeleteTodo($input: DeleteTodoInput!) {
  deleteTodo(input: $input) {
    id
    title
    content
  }
}
`;
