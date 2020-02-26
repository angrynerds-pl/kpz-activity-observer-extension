import {IPagination} from '@app/shared/interfaces';

export class Pagination implements IPagination {
  isNextPage: boolean;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  offset: number;

  constructor(pageSize: number = 10) {
    this.isNextPage = true;
    this.pageNumber = 0;
    this.pageSize = pageSize;
    this.offset = this.pageNumber * this.pageSize;
  }

  nextPage() {
    if (!this.isNextPage) return;
    this.pageNumber++;
  }

  prevPage() {
    if (this.pageNumber === 0) return;
    this.pageNumber--;
  }
}
