export type domInfo = {
  stylesString:()=>string
}
export function Drag(dom:HTMLElement,parent:HTMLElement,options:any={}):domInfo {
  let isDown = false; // 是否拖拽
  let isSale = false; // 是否放大
  const _dom = dom;
  const _parent = parent;
  let _offsetX: number;
  let _offsetY: number;
  const _parentRect = getRect(_parent);
  const _parentLeft = _parentRect.left;
  const _parentTop = _parentRect.top;
  const _parentWidth = _parentRect.width;
  const _parentHeight = _parentRect.height;
  const _boxWidth = options?.boxWidth??375;
  let _stylesString = ''
  const _domInfo:domInfo = {
    stylesString(){
      return _stylesString
    }
  }
  function getRect(dom: HTMLElement) {
    return dom.getBoundingClientRect();
  }
  function saleDom(e: MouseEvent, dom: HTMLElement = _dom) {
    dom.style.width = `${e.clientX - getRect(dom).left}px`;
    boundary(e);
  }
  function boundary(e: MouseEvent) {
    if (
      e.clientX <= _parentLeft + 5 ||
      e.clientX >= _parentLeft + _parentWidth - 5 ||
      e.clientY <= _parentTop + 5 ||
      e.clientY >= _parentTop + _parentHeight - 5
    ) {
      up();
    }
  }
  function down(e: MouseEvent) {
    isDown = true;
    _offsetX = e.offsetX;
    _offsetY = e.offsetY;
    const domRect = getRect(_dom);
    if (_offsetX > domRect.width - 30 && _offsetY > domRect.height - 30) {
      isSale = true;
    }
  }
  function move(e: MouseEvent) {
    if (!isDown) return;
    if (isSale) {
      saleDom(e);
      return;
    }
    _dom.style.left = e.clientX - _offsetX - _parentLeft + 'px';
    _dom.style.top = e.clientY - _offsetY - _parentTop + 'px';
    boundary(e);
  }
  function up() {
    isDown = false;
    isSale = false;
    renderDomString();
  }
  function renderDomString(
    domRect: DOMRect = getRect(_dom),
    parentRect: DOMRect = _parentRect
  ) {
    const styles: any = {};
    styles.width = `${(
      (domRect.width / parentRect.width) *
      _boxWidth
    ).toFixed(2)}px`;
    styles.top = `${((domRect.top / parentRect.height) * 100).toFixed(2)}%`;
    if (
      domRect.left - parentRect.left <
      parentRect.width - domRect.right + parentRect.left
    ) {
      styles.left = `${(
        ((domRect.left - parentRect.left) / parentRect.width) *
        100
      ).toFixed(2)}%`;
    } else {
      styles.right = `${(
        ((parentRect.width - domRect.right + parentRect.left) /
          parentRect.width) *
        100
      ).toFixed(2)}%`;
    }
      _stylesString=styleToString(styles)
    
  }
  function styleToString(styles: any) {
    return Object.entries(styles).reduce((p, [key, value]) => {
      return (p += `${key}:${value};`);
    }, '');
  }
  _dom?.addEventListener('mousedown', down);
  _parent?.addEventListener('mousemove', move);
  _parent?.addEventListener('mouseup', up);
  return _domInfo
}