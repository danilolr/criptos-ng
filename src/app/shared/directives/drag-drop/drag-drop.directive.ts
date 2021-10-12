
import { Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';


@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  @Input() appDragDrop: string;

  @Output() onFileOver = new EventEmitter<void>();
  @Output() onFileLeave = new EventEmitter<void>(); 
  @Output() onFileDropped = new EventEmitter<any>();

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.onFileOver.emit();
  }


  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.onFileLeave.emit();
  }


  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    let files = Array.from(evt.dataTransfer.files) as File[];
    const mimes = this.appDragDrop.split('|');
    if (files.length > 0) {
      files = files.filter(f => mimes.includes(f.type) || mimes.includes(f.type.split('/')[0]+ '/*'));
      if (files.length > 0) {
        this.onFileDropped.emit(files)
      } else {

      }
    }
  }

}
