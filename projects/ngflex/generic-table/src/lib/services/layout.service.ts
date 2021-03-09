import { ApplicationRef, Injectable, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'any',
})
export class LayoutService implements OnDestroy {
  private desktopQueryList: MediaQueryList;
  private tabletQueryList: MediaQueryList;
  private mobileQueryList: MediaQueryList;

  private desktopQueryListener: () => void;
  private tabletQueryListener: () => void;
  private mobileQueryListener: () => void;

  public constructor(
    private appRef: ApplicationRef,
    private media: MediaMatcher,
  ) {
    this.desktopQueryList = this.media.matchMedia('(min-width: 1024px)');
    this.tabletQueryList = this.media.matchMedia('(max-width: 1023px)');
    this.mobileQueryList = this.media.matchMedia('(max-width: 600px)');

    this.desktopQueryListener = () => {
      this.appRef.tick();
    };

    this.mobileQueryListener = () => {
      this.appRef.tick();
    };

    this.tabletQueryListener = () => {
      this.appRef.tick();
    };

    this.desktopQueryList.addEventListener('change', this.desktopQueryListener);
    this.tabletQueryList.addEventListener('change', this.tabletQueryListener);
    this.mobileQueryList.addEventListener('change', this.mobileQueryListener);
  }

  public get desktopQuery(): MediaQueryList {
    return this.mobileQueryList;
  }

  public get tabletQuery(): MediaQueryList {
    return this.tabletQueryList;
  }

  public get mobileQuery(): MediaQueryList {
    return this.mobileQueryList;
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.desktopQueryListener);
    this.tabletQuery.removeEventListener('change', this.tabletQueryListener);
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}
