import { Component, AfterContentChecked, AfterViewChecked, AfterViewInit, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as $ from 'jquery';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    private router: Router,

  ) { }
  routerSubscription: any;
  ngOnInit(): void {

    setTimeout(() => {
      (function ($) {
        "use strict";

        var path = window.location.href;

        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function () {

          if (this.getAttribute('href') == path) {
            $(this).addClass("active");

          }
        });


        $("#sidebarToggle").on("click", function (e) {
          e.preventDefault()
          $("body").toggleClass("sb-sidenav-toggled");
        });
      })(jQuery);
    }, 1)


  }
}
