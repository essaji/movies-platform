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
      avatarPath: review.author_details.avatar_path?.includes('http')
        ? review.author_details.avatar_path?.slice(
            1,
            review.author_details.avatar_path.length,
          )
        : review.author_details.avatar_path
        ? `${process.env.IMAGE_HOST_URL}/w500/${review.author_details.avatar_path}`
        : null,
    };
  }
}
