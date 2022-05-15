import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'landing-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],

    encapsulation: ViewEncapsulation.None,
})
export class LandingHomeComponent {
    isShow = false;
    isShowMenuHome = false;
    isShowMenuBrand = false;

    checkIsshow() {
        this.isShow = false;
    }
    toggleMenu() {
        this.isShow = !this.isShow;
    }
    checkIsshowMenuHome() {
        this.isShowMenuHome = false;
    }
    toggleMenuHome() {
        this.isShowMenuHome = !this.isShowMenuHome;
    }
    checkIsshowMenuBrand() {
        this.isShowMenuBrand = false;
    }
    toggleMenuBrand() {
        this.isShowMenuBrand = !this.isShowMenuHome;
    }
    /**
     * Constructor
     */
    constructor() {}
}
