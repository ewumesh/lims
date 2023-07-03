import {Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {CdkAccordionModule} from '@angular/cdk/accordion';

/**
 * @title Accordion overview
 */
@Component({
  selector: 'dropdown-menu',
  template: `<cdk-accordion class="example-accordion">
  <cdk-accordion-item
    *ngFor="let item of items; let index = index;"
    #accordionItem="cdkAccordionItem"
    class="example-accordion-item"
    role="button"
    tabindex="0"
    [attr.id]="'accordion-header-' + index"
    [attr.aria-expanded]="accordionItem.expanded"
    [attr.aria-controls]="'accordion-body-' + index">
    <div class="example-accordion-item-header nav-link mb-3" (click)="accordionItem.toggle()">
    <span><i class="fa fa-bars"></i>{{ item }}</span>
      <span class="example-accordion-item-description">
        Click to {{ accordionItem.expanded ? 'close' : 'open' }}
      </span>
    </div>
    <div
      class="example-accordion-item-body"
      role="region"
      [style.display]="accordionItem.expanded ? '' : 'none'"
      [attr.id]="'accordion-body-' + index"
      [attr.aria-labelledby]="'accordion-header-' + index">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis
      excepturi incidunt ipsum deleniti labore, tempore non nam doloribus blanditiis
      veritatis illo autem iure aliquid ullam rem tenetur deserunt velit culpa?
    </div>
  </cdk-accordion-item>
</cdk-accordion>`,
  styleUrls: ['../layout/layout.component.scss', './sidebar.scss'],
})
export class CdkAccordionOverviewExample {
  items = ['User Management', 'Commodities', 'Settings'];
  expandedIndex = 0;
}
