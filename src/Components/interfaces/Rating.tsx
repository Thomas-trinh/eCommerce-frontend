export interface Rating {
    ratingid: number;
    id: number;
    commentid: number;
    rating: number;
    timedate: Date;
  }
  
  export interface CommentWithRating {
    commentid: number;
    commenttext: string;
    rating: number | null;
    timedate: Date | null;
  }
  