import {
  headerMenu,
  headerButton,
  headerTop
} from "../constants/DOMelements";
export class Header {
  constructor(api) {
    this.api = api;
    this.articleLink = document.querySelector(".menu__li_save");
    this.buttonExit = document.querySelector(".menu__button_exit");
    this.buttonAuth = document.querySelector(".menu__button_auth");
    this.headerLogo = document.querySelector(".header__logo");
    this.close = document.querySelector(".header__button_close");
    this.open = document.querySelector(".header__button_sandwich");
    this.headerButton = headerButton;
    this.headerMenu = headerMenu;
    this.headerTop = headerTop;
  }

  render() {
    this.api
      .getUser()
      .then((res) => {
        if (res === undefined) {
          this.buttonAuth.classList.remove("hidden");
          this.articleLink.classList.add("menu__li_unlogin");
          this.buttonExit.classList.add("hidden");
        } else {
          this.buttonAuth.classList.add("hidden");
          this.articleLink.classList.remove("menu__li_unlogin");
          this.buttonExit.textContent = res.name;
          this.buttonExit.classList.remove("hidden");
        }
      })
      .catch((err) => console.log(err));
  }
  

  // renderSave() {
  //   this.api
  //     .getUser()
  //     .then((res) => {
  //       if (res === undefined) {
  //         this.buttonAuth.classList.remove("hidden");
  //         this.buttonExit.classList.add("hidden");

  //       } else {
  //         this.buttonAuth.classList.add("hidden");

  //       }
  //     })
  // }

  openMenu() {
    while (this.headerButton.classList.contains("header__button_sandwich")) {
      this.headerButton.classList.add("header__button_close");
      this.headerButton.classList.remove("header__button_sandwich");
      this.headerTop.classList.add("header__top_mobile");
      this.headerMenu.classList.add("header__menu_mobile");
      this.headerMenu.style.display = "block";
      document.querySelector(".body").classList.add("body_OvHidden");
    }
    document
      .querySelector(".header__button_close")
      .addEventListener("click", () => this.closeMenu());
  }

  closeMenu() {
    while (this.headerButton.classList.contains("header__button_close")) {
      this.headerButton.classList.remove("header__button_close");
      this.headerButton.classList.add("header__button_sandwich");
      this.headerTop.classList.remove("header__top_mobile");
      this.headerMenu.classList.remove("header__menu_mobile");
      document.querySelector(".body").classList.remove("body_OvHidden");
      this.headerMenu.style.display = "";
    }
    document
      .querySelector(".header__button_sandwich")
      .addEventListener("click", () => this.openMenu());
  }
}
