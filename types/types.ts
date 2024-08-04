export interface CardInterface {
    _id: string,
    author: string,
    userIds: [string | undefined],
    kanji: string,
    onyomi: string,
    kunyomi: string,
    imageUrl: string,
    prompt: string,
    keyword: string,
    rating: number,
    reviews: number,
    updatedAt: string,
}