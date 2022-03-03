export default class Review {
  id: string;
  author: string;
  content: string;
  avatarPath: string;
  rating: number;

  constructor(review) {
    return {
      id: review.id,
      author: review.author,
      content: review.content,
      rating:
        review.author_details.rating && (review.author_details.rating / 10) * 5,
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
