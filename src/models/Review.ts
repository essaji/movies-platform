export default class Review {
  id: string;
  author: string;
  content: string;
  avatarPath: string;

  constructor(review) {
    return {
      id: review.id,
      author: review.author,
      content: review.content,
      avatarPath: review.author_details.avatar_path?.slice(
        1,
        review.author_details.avatar_path.length,
      ),
    };
  }
}
