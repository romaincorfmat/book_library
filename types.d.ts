export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  video?: string;
  summary: string;
  isLoanedBook?: boolean;
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

// export interface User {
//   id: string;
//   fullName: string;
//   email: string;
//   universityId: string;
//   universityCard: string;
//   status: "PENDING" | "APPROVED" | "REJECTED" | null;
//   role: "USER" | "ADMIN" | null;
//   lastActivityDate: string | null;
//   createdAt: Date | null;
// }
