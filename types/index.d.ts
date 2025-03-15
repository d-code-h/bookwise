export interface Book {
  key?: string;
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt: Date | null;
  isLoanedBook: boolean | null;
}

export interface TableBook {
  key?: string;
  id: string;
  info: {
    title: string;
    coverColor: string;
    coverUrl: string;
  };
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

export interface User {
  fullName: string;
  email: string;
  universityId: number;
  universityCard: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | null;
  role: 'USER' | 'ADMIN' | null;
}
