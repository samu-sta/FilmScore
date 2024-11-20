class Review {
  constructor(author, rate, content, userFk, contentFk) {
    this.author = author;
    this.rate = rate;
    this.content = content;
    this.userFk = userFk;
    this.contentFk = contentFk;
  }
}

export default Review;