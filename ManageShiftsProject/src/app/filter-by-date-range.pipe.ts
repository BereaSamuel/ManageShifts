import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByDateRange'
})
export class FilterByDateRangePipe implements PipeTransform {
  transform(items: any[], field: string, start: string, end: string): any[] {
    if (!items) {
      return [];
    }

    if (!start || !end) {
      return items;
    }

    return items.filter(item => {
      const itemDate = new Date(item[field]);
      const startDate = new Date(start);
      const endDate = new Date(end);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }
}