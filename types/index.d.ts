interface BookBase {
  key?: string;
  id: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  videoUrl: string;
  summary: string;
  createdAt: Date | null;
  isLoanedBook: boolean | null;
}
export interface Book extends BookBase {
  title: string;
  coverColor: string;
  coverUrl: string;
}

export interface TableBook extends BookBase {
  info: {
    title: string;
    coverColor: string;
    coverUrl: string;
  };
}

export interface BookListProps {
  title: string;
  books: Book[];
  containerClassName?: string;
}

export interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

export interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

export interface BorrowBookParams {
  bookId: string;
  userId: string;
}

export interface TableUser {
  id: string;
  info: {
    name: string;
    email: string;
  };
  universityId: number;
  universityCard: string;
  role: 'USER' | 'ADMIN';
  universityCard: string;
  dateJoined: Date;
  booksBorrowed: number;
}
export interface AccountRequests {
  id: string;
  info: {
    name: string;
    email: string;
  };
  universityId: number;
  universityCard: string;
  role: 'USER' | 'ADMIN';
  universityCard: string;
  dateJoined: Date;
}

export interface User {
  fullName: string;
  email: string;
  universityId: number;
  universityCard: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | null;
  role: 'USER' | 'ADMIN' | null;
}
