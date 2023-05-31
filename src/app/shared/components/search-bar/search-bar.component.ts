import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs';
import {MotorcycleshopService} from '../../../api/service/motorcycleshop.service';
import {Router} from '@angular/router';
import {RoutesConfig} from '../../../app-routing.module';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {


  searchInput = new FormControl('');

  constructor(private service: MotorcycleshopService, private router: Router) {
  }

  ngOnInit() {
    this.searchInput.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.router.navigateByUrl(RoutesConfig.productsPage);
      this.service.updateSearchInput(this.searchInput.value)
      this.service.searchProducts();
    });
  }

  onReset() {
    this.searchInput.setValue('');
    this.service.resetProductsSearch();
  }
}
