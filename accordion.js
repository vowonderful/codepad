class ItcAccordion {
  constructor(target, config) {
    this._el = typeof target === 'string' ? document.querySelector(target) : target;
    const defaultConfig = {
      alwaysOpen: true,
      duration: 350,
      tag: 'accordion'
    };
    this._config = Object.assign(defaultConfig, config);
    this.tag = this._config.tag + '';
    this._tag = '.' + this.tag;
    this.addEventListener();
  }
  addEventListener() {
    this._el.addEventListener('click', (e) => {
      const elHeader = e.target.closest(this._tag + '__header');
      if (!elHeader) {
        return;
      }
      if (!this._config.alwaysOpen) {
        const elOpenItem = this._el.querySelector(this._tag + '__item_show');
        if (elOpenItem) {
          elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null;
        }
      }
      this.toggle(elHeader.parentElement);
    });
  }
  show(el) {
    const elBody = el.querySelector(this._tag + '__body');
    if (elBody.classList.contains('collapsing') || el.classList.contains(this.tag + '__item_show')) {
      return;
    }
    elBody.style.display = 'block';
    const height = elBody.offsetHeight;
    elBody.style.height = 0;
    elBody.style.overflow = 'hidden';
    elBody.style.transition = `height ${this._config.duration}ms ease`;
    elBody.classList.add('collapsing');
    el.classList.add(this.tag + '__item_slidedown');
    elBody.offsetHeight;
    elBody.style.height = `${height}px`;
    window.setTimeout(() => {
      elBody.classList.remove('collapsing');
      el.classList.remove(this.tag + '__item_slidedown');
      elBody.classList.add('collapse');
      el.classList.add(this.tag + '__item_show');
      elBody.style.display = '';
      elBody.style.height = '';
      elBody.style.transition = '';
      elBody.style.overflow = '';
    }, this._config.duration);
  }
  hide(el) {
    const elBody = el.querySelector(this._tag + '__body');
    if (elBody.classList.contains('collapsing') || !el.classList.contains(this.tag + '__item_show')) {
      return;
    }
    elBody.style.height = `${elBody.offsetHeight}px`;
    elBody.offsetHeight;
    elBody.style.display = 'block';
    elBody.style.height = 0;
    elBody.style.overflow = 'hidden';
    elBody.style.transition = `height ${this._config.duration}ms ease`;
    elBody.classList.remove('collapse');
    el.classList.remove(this.tag + '__item_show');
    elBody.classList.add('collapsing');
    window.setTimeout(() => {
      elBody.classList.remove('collapsing');
      elBody.classList.add('collapse');
      elBody.style.display = '';
      elBody.style.height = '';
      elBody.style.transition = '';
      elBody.style.overflow = '';
    }, this._config.duration);
  }
  toggle(el) {
    el.classList.contains(this.tag + '__item_show') ? this.hide(el) : this.show(el);
  }
}


new ItcAccordion('#accordion', {
    alwaysOpen: false,
    duration: 350,
    tag: 'accordion',
});



/** HTML structure example:
<div class="accordion" id="accordion">
  <div class="accordion__item accordion__item_show">
    <div class="accordion__header">
      Question 1
    </div>
    <div class="accordion__body">
      Answer 1
    </div>
  </div>
  <div class="accordion__item">
    <div class="accordion__header">
      Question 2
    </div>
    <div class="accordion__body">
    Answer 2
    </div>
  </div>
  ...
</div>
*/

/** CSS:
.accordion__item:not(.accordion__item_show) .accordion__body {
  display: none;
}
*/
