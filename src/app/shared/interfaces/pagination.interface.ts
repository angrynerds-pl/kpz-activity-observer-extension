export interface IPaginatedResponse {
  data: any[];
  totalCount: number;
}

export interface IPagination {
  isNextPage: boolean;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
