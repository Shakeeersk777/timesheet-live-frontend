// select-dropdown.component.ts
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [NgSelectModule, ReactiveFormsModule, FormsModule],
  templateUrl: './select-dropdown.component.html',
  styleUrl: './select-dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectDropdownComponent),
      multi: true,
    },
  ],
})
export class SelectDropdownComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() multiple: boolean = false;
  @Input() searchable: boolean = false;
  @Input() items: any[] = [];
  @Input() bindLabel: string = 'label';
  @Input() bindValue: string = 'value';
  @Input() placeholder: string = 'Select';

  value: any;
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(val: any): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue(val: any): void {
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }
}
