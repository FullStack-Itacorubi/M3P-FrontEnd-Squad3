import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import { Observable, fromEvent, zip } from 'rxjs';

import { IOptionsModal } from 'src/app/shared/interfaces/options-modal.interface';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component( {
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: [ './generic-modal.component.css' ]
} )
export class GenericModalComponent implements AfterViewInit {
  @ViewChild( 'modal' ) modal!: ElementRef<HTMLDivElement>;
  @ViewChild( 'overlay' ) overlay!: ElementRef<HTMLDivElement>;
  options!: IOptionsModal | undefined;
  modalAnimationEnd!: Observable<Event>;
  modalLeaveAnimation!: string;
  overlayLeaveAnimation!: string;
  overlayAnimationEnd!: Observable<Event>;
  modalLeaveTiming!: number;
  overlayLeaveTiming!: number;

  constructor(
    private modalService: ModalService,
    private element: ElementRef
  ) { }

  @HostListener( 'document:keydown.escape' )
  onEscape() {
    this.modalService.close();
  }

  onClose() {
    this.modalService.close();
  }

  ngAfterViewInit() {
    this.options = this.modalService.options;
    this.addOptions();
    this.addEnterAnimations();
  }

  addOptions() {
    this.modal.nativeElement.style.minWidth =
      this.options?.size?.minWidth || 'auto';
    this.modal.nativeElement.style.width = this.options?.size?.width || 'auto';
    this.modal.nativeElement.style.maxWidth =
      this.options?.size?.maxWidth || 'auto';
    this.modal.nativeElement.style.minHeight =
      this.options?.size?.minHeight || 'auto';
    this.modal.nativeElement.style.height =
      this.options?.size?.height || 'auto';
    this.modal.nativeElement.style.maxHeight =
      this.options?.size?.maxHeight || 'auto';

    this.modalLeaveAnimation = this.options?.animations?.modal?.leave || '';
    this.overlayLeaveAnimation = this.options?.animations?.overlay?.leave || '';

    this.modalAnimationEnd = this.animationendEvent( this.modal.nativeElement );
    this.overlayAnimationEnd = this.animationendEvent(
      this.overlay.nativeElement
    );

    this.modalLeaveTiming = this.getAnimationTime( this.modalLeaveAnimation );
    this.overlayLeaveTiming = this.getAnimationTime( this.overlayLeaveAnimation );
  }

  addEnterAnimations() {
    this.modal.nativeElement.style.animation =
      this.options?.animations?.modal?.enter || '';
    this.overlay.nativeElement.style.animation =
      this.options?.animations?.overlay?.enter || '';
  }

  animationendEvent( element: HTMLDivElement ) {
    return fromEvent( element, 'animationend' );
  }

  removeElementIfNoAnimation( element: HTMLDivElement, animation: string ) {
    if ( !animation ) {
      element.remove();
    }
  }

  close() {
    this.modal.nativeElement.style.animation = this.modalLeaveAnimation;
    this.overlay.nativeElement.style.animation = this.overlayLeaveAnimation;

    if (
      !this.options?.animations?.modal?.leave &&
      !this.options?.animations?.overlay?.leave
    ) {
      this.modalService.options = undefined;
      this.element.nativeElement.remove();
      return;
    }

    this.removeElementIfNoAnimation(
      this.modal.nativeElement,
      this.modalLeaveAnimation
    );
    this.removeElementIfNoAnimation(
      this.overlay.nativeElement,
      this.overlayLeaveAnimation
    );

    if ( this.modalLeaveTiming > this.overlayLeaveTiming ) {
      this.modalAnimationEnd.subscribe( () => {
        this.element.nativeElement.remove();
      } );
    } else if ( this.modalLeaveTiming < this.overlayLeaveTiming ) {
      this.overlayAnimationEnd.subscribe( () => {
        this.element.nativeElement.remove();
      } );
    } else {
      zip( this.modalAnimationEnd, this.overlayAnimationEnd ).subscribe( () => {
        this.element.nativeElement.remove();
      } );
    }

    this.modalService.options = undefined;
  }

  getAnimationTime( animation: string ) {
    let animationTime = 0;
    const splittedAnimation = animation.split( ' ' );

    for ( const expression of splittedAnimation ) {
      const currentValue = +expression.replace( /s$/, '' );

      if ( !isNaN( currentValue ) ) {
        animationTime = currentValue;
        break;
      }
    }

    return animationTime;
  }
}
