import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiURL = environment.metadataServer + '/api/category';
  categories$: Observable<{ [keys: string]: Category[] }>;

  constructor(private http: HttpClient) {
    this.categories$ = this.http.get(this.apiURL).pipe(
      map((result: Category[]) => {
        return result.reduce(
          (acc, category) => {
            return Object.assign(acc, {
              [category.Locale]: [...(acc[category.Locale] || []), category],
            });
          },
          {} as { [key: string]: Category[] },
        );
      }),
      shareReplay(),
    );
  }

  getList() {
    return this.categories$;
  }
}

export class Category {
  Locale: string;
  LocalName: string;
  Name: string;
  Active: boolean;
}
