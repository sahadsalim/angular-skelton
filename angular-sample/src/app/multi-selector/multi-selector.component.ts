import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-multi-selector',
  templateUrl: './multi-selector.component.html',
  styleUrls: ['./multi-selector.component.css'],
})
export class MultiSelectorComponent implements OnInit, AfterViewInit {
  limitToShow!: number;
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.clickedOutside({});
    }
  }
  @Input() id!: string;
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() uId: string = '';
  @Input() icon: string = '';
  @Input() placeholder = 'Search';
  @Input() inputLoader: boolean = false;
  @Input() searchLimit: any = null;
  @Input() maxLength: any = null;
  @Input() showSearch: boolean = false;
  @Input() autoComplete: boolean = false;
  @Input() defaultShowContent: any = 1;
  @ViewChild('chosenList', { static: true })
  private chosenList: ElementRef | null = null;
  @ViewChild('chosenSearch', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }
  private inputField: ElementRef | null = null;
  @ViewChild('select', { static: true }) private select: ElementRef | null =
    null;
  @ViewChild('selectView', { static: true })
  private selectView: ElementRef | null = null;
  @ViewChild('selectList', { static: true })
  private selectList: ElementRef | null = null;

  checkedValue: boolean = false;
  public activeScrollState: any = null;
  keyEventFired = false;
  _selectedOption: any;
  _selectedOptionName: any;
  _options: any;
  filteredArr: any[] = [];
  removeList: any[] = [];
  scrollOptions = {
    axis: 'y',
    theme: 'minimal-dark',
    mouseWheel: { preventDefault: true },
    keyboard: { enable: false },
    advanced: { updateOnSelectorChange: true },
  };
  duplicateData: any;
  showOptions = false;
  showAutocompleteOptions = false;
  count = 0;
  searchText: string = '';
  firstItemLabel: string = '';
  itemLabels: any[] = [];
  sucessBtnName: string = 'Apply';
  cancelBtnName: string = 'Cancel';
  @ViewChildren('result') filteredItems: any;
  @Output() selectedOutput = new EventEmitter();
  @Output() selectedObjects = new EventEmitter();
  @Output() selectedAll = new EventEmitter();

  @Input() set subtBtnName(value: string) {
    this.sucessBtnName = value;
  }
  @Input() set cancelBtn(value: string) {
    this.cancelBtnName = value;
  }
  @Input() set selectedInput(value: any[]) {
    this._selectedOption = value;
  }

  @Input() set options(value: any[] | undefined) {
    this.setSelectionOptnData(value);
  }

  ngOnChanges() {
    this.limitToShow = this.defaultShowContent;
    this.count = 0;
    if (this._selectedOption && this._selectedOption.length) {
      this.setLabel();
    } else {
      this._selectedOption = [];
    }
    if (this._options && this._options.length) {
      let tempArray: any = [];
      tempArray = this._options.filter(
        (el: any) => el[this.label] && el[this.label].toString().trim() !== ''
      );
      this._options = tempArray;
      this._options.forEach((element: any) => {
        if (this._selectedOption.indexOf(element[this.uId]) > -1) {
          element['status'] = true;
          this.count++;
        } else {
          element['status'] = false;
        }
      });
    }
    if (
      this._selectedOption &&
      this._options &&
      this._selectedOption.length === this._options.length
    ) {
      this.checkedValue = true;
    } else {
      this.checkedValue = false;
    }
  }

  constructor(private el: ElementRef, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.updateScrollView();
    this.searchLimit = this.searchLimit ? this.searchLimit : null;
    this.initChosen();
  }
  ngAfterViewInit() {
    this.selectViewContentLimit();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  initChosen() {
    if (this._options && this._options.length) {
      if (this.isObject() && this.uId) {
        this.addStatusLabel();
      } else if (!this.isObject()) {
        this.processArray();
      }
    }
  }

  isObject() {
    return typeof this._options[0] == 'object' ? true : false;
  }

  seTCount() {
    this.count = 0;
    this._options.forEach((option: any) => {
      if (option.status === true) {
        this.count++;
      }
    });
    if (this.count == 0) this.firstItemLabel = '';
  }
  openDropDown() {
    this.showOptions = !this.showOptions;
    if (this.showOptions) {
      this.duplicateData = null;
      this.duplicateData = this.deepCopy(this._selectedOption);
    }
  }

  public deepCopy(value: any) {
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (err) {
      return null;
    }
  }

  addStatusLabel() {
    this._options.forEach((option: any) => {
      if (this._selectedOption && this._selectedOption.length) {
        if (this._selectedOption.indexOf(option[this.uId]) !== -1) {
          option.status = true;
        } else {
          option.status = false;
        }
      } else {
        option.status = false;
      }
    });
    this.seTCount();
  }

  processArray() {
    const temp = this._options;
    this._options = temp.map((item: any, index: number) => {
      return {
        id: index,
        value: item,
        status:
          this._selectedOption &&
          this._selectedOption.length &&
          this._selectedOption.indexOf(item) != -1
            ? true
            : false,
      };
    });
    this.label = 'value';
    this.uId = 'value';
    this.seTCount();
  }

  changeOption(event: any, option: any) {
    option.status = !option.status;
    this.cdRef.detectChanges();
    this.filteredArr.forEach((x: any) => {
      if (option[this.uId] == x[this.uId]) {
        x.status = option.status;
      }
    });
    option.status ? this.count++ : this.count--;
    if (this.count == 0) this.firstItemLabel = '';
    if (this._selectedOption.indexOf(option[this.uId]) != -1) {
      this._selectedOption.splice(
        this._selectedOption.indexOf(option[this.uId]),
        1
      );
    } else {
      this._selectedOption.push(option[this.uId]);
    }
    this.onChange();
    this.selectedOutput.emit(this._selectedOption);
    if (
      event.target.attributes.autoCompleteState &&
      event.target.attributes.autoCompleteState.value == 'true'
    ) {
      event.stopPropagation();
    }

    for (let item of this.filteredArr) {
      if (!item.status) {
        this.checkedValue = false;
        break;
      } else {
        this.checkedValue = true;
      }
    }
    this.setLabel();
  }
  setLabel() {
    const dummyArray: any[] = [];
    if (this._selectedOption && this._selectedOption.length > 0) {
      this._selectedOption.forEach((element: number) => {
        let item = this.filteredArr.find((el: any) => {
          return el[this.uId] == element;
        });
        dummyArray.push(item);
      });
      this.itemLabels = dummyArray;
      this.selectViewContentLimit();
    } else {
      this.itemLabels = [];
    }
  }

  checkedBox(value: boolean): void {
    this.count = 0;
    this._selectedOption = [];
    if (!this.checkedValue) {
      this.filteredArr.forEach((element) => {
        element.status = false;
      });
      this.seTCount();
      this.selectedOutput.emit(null);
      this.onChange();

      this.selectedAll.emit(this.checkedValue);
    } else {
      this.filteredArr.forEach((element) => {
        element.status = true;
        this._selectedOption.push(element[this.uId]);
      });
      this.setLabel();
      this.seTCount();
      this.onChange();
      this.selectedOutput.emit(this._selectedOption);
      this.selectedAll.emit(this.checkedValue);
    }
  }
  submitSelectedValues() {
    if (!this._selectedOption.length) this.selectedOutput.emit(null);
    else this.selectedOutput.emit(this._selectedOption);
  }
  cancel() {
    this._selectedOption = this.duplicateData;
    this.showOptions = false;
    this._options.forEach((element: any) => {
      for (let item of this._selectedOption.length) {
        if (element[this.uId] !== item) {
          element['status'] = false;
        }
      }
    });
    if (this._selectedOption.length == 0) {
      this.count = 0;
      this._selectedOption = [];
      this.filteredArr.forEach((element) => {
        element.status = false;
      });
      this.checkedValue = false;
    } else {
      this.setSelectionOptnData(this._options);
    }
  }

  setSelectionOptnData(value: any) {
    this._options = value;
    if (
      this._options &&
      this._options.length > 0 &&
      this._selectedOption &&
      this._selectedOption.length &&
      this._selectedOption.length === this._options.length
    ) {
      this.checkedValue = true;
    }

    this.count = 0;
    if (this._options && this._options.length) {
      let tempArray: any = [];
      tempArray = this._options.filter(
        (el: any) => el[this.label] && el[this.label].toString().trim() !== ''
      );
      this._options = tempArray;
    }

    this.setSelectionOptnData2();

    if (!this.autoComplete) {
      this.filteredArr = this._options;
    }
    this.setLabel();
  }

  setSelectionOptnData2(): void {
    if (this._selectedOption && this._selectedOption.length) {
      this.removeList = [];
      for (let item of this._selectedOption) {
        let found = false;
        for (let item2 of this._options) {
          if (item2[this.uId] == item) {
            found = true;
            break;
          }
        }
        if (!found) {
          this.removeList.push(item);
        }
      }

      this.setSelectionOptnData3();
    }
  }

  setSelectionOptnData3() {
    this.removeList.forEach((item) => {
      let index = this._selectedOption.findIndex((el: any) => el == item);
      if (index !== -1) {
        this._selectedOption.splice(index, 1);
      }
    });

    this._options.forEach((element: any) => {
      for (let item of this._selectedOption) {
        if (element[this.uId] === item) {
          element['status'] = true;
          this.count++;
        }
      }
    });
  }

  openCloseOnEnter(e: any, index: any) {
    if (e.which === 32 && index === 99999999) {
      this.showOptions = !this.showOptions;
    }
    if (e.which === 9 && index === this.filteredArr.length - 1) {
      this.showOptions = !this.showOptions;
    }
    if (e.which === 13 && (index === 111111111 || index !== 99999999)) {
      this.showOptions = false;
    }
  }

  onSearch() {
    if (!this.autoComplete) {
      this.showOptions = true;
      this.filteredArr = this._options;
    } else {
      this.showAutocompleteOptions = true;
    }
    this.updateScrollView();
  }

  clickedOutside(event: any) {
    if (!this.keyEventFired) {
      this.keyEventFired = true;
      this.showOptions = false;
      this.showAutocompleteOptions = false;
      this.updateScrollView();
      this.searchText = '';
      if (this.autoComplete) {
        this.filteredArr = [];
      }
    }
    this.keyEventFired = false;
  }

  filter() {
    if (this.inputField) this.inputField.nativeElement.focus();
    if (this._options && this._options.length) {
      this.filteredArr = this._options.filter((item: any) => {
        const searchValue = this.searchText.toLowerCase();
        if (searchValue.trim() !== '' || !this.autoComplete) {
          return JSON.stringify(item[this.label])
            .toLowerCase()
            .includes(searchValue.trim());
        }
        return false;
      });
    } else {
      this.filteredArr = [];
    }
    this.showOptions = true;
  }

  dropdown = (e: any) => {
    if (
      (this.showOptions ||
        (this.searchText !== '' &&
          this.searchText !== null &&
          this.searchText.length &&
          this.autoComplete)) &&
      this.chosenList
    ) {
      const list = this.chosenList.nativeElement;
      const first = list.firstElementChild.firstChild.children[0].children[0];
      const maininput = this.inputField?.nativeElement;
      this.switchCase(first, maininput, e);
    }
  };

  switchCase(first: any, maininput: any, e: any) {
    switch (e.key) {
      case 'ArrowUp':
        if (document.activeElement === first) {
          this.inputField?.nativeElement.focus();
          e.preventDefault();
          break;
        } else {
          e.preventDefault();
        }
        break;
      case 'ArrowDown':
        if (document.activeElement === maininput) {
          first.focus();

          e.preventDefault();
        } else {
          e.preventDefault();
        }
        break;
      case 'Enter':
        if (!this.inputLoader && document.activeElement !== maininput) {
          if (document.activeElement) {
            const el = document.getElementById(
              'check-' + document.activeElement.id
            ) as HTMLInputElement;
            el.click();
          }
        }
        break;
      case 'Tab':
        this.showOptions = false;
        this.showAutocompleteOptions = false;
        this.updateScrollView();
        if (this.select)
          this.select.nativeElement.removeEventListener(
            'keydown',
            this.dropdown
          );
    }
  }

  clear() {
    this._selectedOption = [];
    this.count = 0;
    this.initChosen();
  }

  trackByFn(index: number, item: any) {
    if (!item) {
      return null;
    } else {
      return item[this.uId];
    }
  }

  updateScrollView() {
    const state =
      this.showOptions ||
      this.showAutocompleteOptions ||
      document.activeElement === this.inputField?.nativeElement;
    if (this.activeScrollState !== state) {
      this.activeScrollState = state;
      setTimeout(() => {
        const scrollEl: any = this.el.nativeElement.querySelector(
          '[data-element="choosen-mscrollbar"]'
        );
        if (scrollEl) {
          if (this.activeScrollState) {
            if (this.inputField) this.inputField.nativeElement.focus();
          }
        }
      }, 100);
    }
  }

  onChange() {
    let x: any = [];
    this._selectedOption.forEach((item: any) => {
      x.push(this._options.find((element: any) => element[this.uId] === item));
    });
    this.selectedObjects.emit(x);
  }

  selectViewContentLimit() {
    setTimeout(() => {
      let width1 = this.selectView?.nativeElement.offsetWidth;
      let width2 = this.selectList?.nativeElement.offsetWidth;
      if (width2 > width1 - 50) {
        this.limitToShow = this.limitToShow - 1;
      } else {
        this.limitToShow = this.defaultShowContent;
      }
    });
  }
  getItem(index:number){
    let label=this.itemLabels[index];
    return label[this.label];
  }
}
