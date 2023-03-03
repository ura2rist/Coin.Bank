export default class Tools {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  clearRoot() {
    this.root.innerHTML = '';

    this.loaderRoot();
  }

  loaderRoot() {
    this.root.innerHTML =
      '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
  }
}
