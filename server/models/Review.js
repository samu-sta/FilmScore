class Review {
  constructor(id, author, rate, content, userFk, contentFk) {
    this.id = id;
    this.author = author;
    this.rate = rate;
    this.content = content;
    this.userFk = userFk;
    this.contentFk = contentFk;
  }
}

export default Review;