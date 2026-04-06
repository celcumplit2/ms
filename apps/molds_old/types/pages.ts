export type Params = Promise<{ [key: string]: string }>;

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export interface PageProps {
  params: Params;
  searchParams: SearchParams;
}
