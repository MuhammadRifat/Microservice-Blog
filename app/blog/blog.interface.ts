export interface IBlog {
    _id: string
    isActive: boolean
    title: string
    authorId: number
    author: IAuthor
    content: string;
    tags: string[]
    status: string
    image: string
    likes: number
    views: number
    comments: number
    createdAt: string
    updatedAt: string
}

export interface IAuthor {
    id: number
    name: string
    image: string
    _id: string
}