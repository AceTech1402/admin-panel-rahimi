export interface CategoriesType {
  categories__id: string;
  name: string;
}
export interface CategoriesTableType {
  type: string;
  name: string;
}

export interface VideoItems {
  title: string;
  description: string;
  owner: string;
  duration: string;
  cover: string;
  link: string;
}

export interface VideoPost {
  title: string;
  description: string;
  link: string;
  cover: string | null;
  duration: string;
  categories__id?: string;
}
export interface BlogPost {
  title: string;
  summary: string;
  body: string;
  cover: string | null;
  author: string;
  categories__id?: string;
  read_time: string;
}
export interface BookPost {
  title: string;
  description: string;
  cover: string | null;
  author: string;
  categories__id?: string;
}
export interface BookletPost {
  title: string;
  description: string;
  cover: string | null;
  author: string;
  categories__id?: string;
  link: string | null;
}